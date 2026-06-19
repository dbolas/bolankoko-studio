export { renderers } from '../../renderers.mjs';

const prerender = false;
const N8N_WEBHOOK_URL = "https://n8n.srv1224401.hstgr.cloud/webhook/audit-peintre";
const N8N_WEBHOOK_TOKEN = undefined                                 ;
const POST = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const formData = await request.formData();
    const honeypot = formData.get("website_url");
    if (honeypot) {
      console.warn("Honeypot triggered — spam attempt blocked");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const entreprise = String(formData.get("entreprise") || "").trim();
    const ville = String(formData.get("ville") || "").trim();
    const telephone = String(formData.get("telephone") || "").trim();
    const siteActuel = String(formData.get("site_actuel") || "").trim();
    if (!entreprise || !ville || !telephone) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!/^[0-9\s\-+()]{8,}$/.test(telephone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (siteActuel) {
      try {
        new URL(siteActuel);
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid URL for site_actuel" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    const payload = {
      entreprise,
      ville,
      telephone,
      site_actuel: siteActuel || null,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      user_agent: request.headers.get("user-agent")
    };
    const headers = {
      "Content-Type": "application/json"
    };
    if (N8N_WEBHOOK_TOKEN) ;
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
    if (!n8nResponse.ok) {
      console.error(
        `n8n webhook error: ${n8nResponse.status} ${n8nResponse.statusText}`
      );
      return new Response(
        JSON.stringify({ error: "Submission failed. Please try again later." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Audit form error:", err);
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
