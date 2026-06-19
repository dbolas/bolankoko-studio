import type { APIRoute } from "astro";

// Route SSR : doit être servie à la demande (fonction serverless), pas pré-rendue.
// En output:"static", sans ce flag l'endpoint POST n'est pas déployé → 404.
export const prerender = false;

const N8N_WEBHOOK_URL = import.meta.env.N8N_WEBHOOK_URL;
const N8N_WEBHOOK_TOKEN = import.meta.env.N8N_WEBHOOK_TOKEN;

// Endpoint POST qui reçoit la soumission du formulaire d'audit,
// valide les données et relaie vers le webhook n8n.
// L'URL n8n reste secrète côté serveur — jamais exposée au navigateur.
export const POST: APIRoute = async ({ request }) => {
  // Seules les soumissions POST sont autorisées.
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Vérifier que l'URL n8n est configurée.
  if (!N8N_WEBHOOK_URL) {
    console.error("N8N_WEBHOOK_URL not configured in environment");
    return new Response(
      JSON.stringify({
        error: "Configuration error. Please contact the administrator.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const formData = await request.formData();

    // Valider le honeypot : le champ caché ne doit pas être rempli.
    const honeypot = formData.get("website_url");
    if (honeypot) {
      console.warn("Honeypot triggered — spam attempt blocked");
      // Retourner succès (spoofing du succès pour ne pas révéler le honeypot).
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extraire et valider les champs requis.
    const entreprise = String(formData.get("entreprise") || "").trim();
    const ville = String(formData.get("ville") || "").trim();
    const telephone = String(formData.get("telephone") || "").trim();
    const siteActuel = String(formData.get("site_actuel") || "").trim();

    // Validation basique côté serveur (la validation côté client du navigateur suffit généralement,
    // mais on reproduit ici par prudence).
    if (!entreprise || !ville || !telephone) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validation du format téléphone simple (au moins 8 caractères, chiffres + espaces/tirets).
    if (!/^[0-9\s\-+()]{8,}$/.test(telephone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validation du site actuel s'il est fourni.
    if (siteActuel) {
      try {
        new URL(siteActuel);
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid URL for site_actuel" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    // Préparer les données pour n8n.
    const payload = {
      entreprise,
      ville,
      telephone,
      site_actuel: siteActuel || null,
      timestamp: new Date().toISOString(),
      user_agent: request.headers.get("user-agent"),
    };

    // Relayer vers le webhook n8n.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Si un jeton est configuré, l'envoyer en header (optionnel, côté n8n).
    if (N8N_WEBHOOK_TOKEN) {
      headers["X-Form-Token"] = N8N_WEBHOOK_TOKEN;
    }

    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    // Vérifier la réponse de n8n.
    if (!n8nResponse.ok) {
      console.error(
        `n8n webhook error: ${n8nResponse.status} ${n8nResponse.statusText}`,
      );
      // Ne pas révéler les détails de l'erreur au client.
      return new Response(
        JSON.stringify({ error: "Submission failed. Please try again later." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Audit form error:", err);
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
