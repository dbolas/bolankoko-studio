# CLAUDE.md — bolankoko-studio

## Stack & versions

- Astro **5.x** · TypeScript strict (`astro/tsconfigs/strict`)
- Tailwind CSS **v4** via `@tailwindcss/vite` — **pas de `tailwind.config.*`**
- Adaptateur `@astrojs/node` (standalone) pour `/api/audit`
- Fontes auto-hébergées : `@fontsource-variable/fraunces`, `@fontsource-variable/manrope`, `@fontsource/fragment-mono`
- Env : Node 24 · npm 11 · WSL2

## Commandes

```bash
npm run dev       # dev server → http://localhost:4321
npm run build     # build statique dans dist/
npm run preview   # prévisualise le build (lance l'adaptateur Node)
npm run start     # production : node ./dist/server/entry.mjs
```

Pas de lint ni de test scripts configurés.

## Architecture

```
src/
  config.ts          ← source de vérité : nom, tel, email, URL, ville
  styles/global.css  ← @theme {} tokens Tailwind + classes utilitaires globales
  layouts/Base.astro ← HTML, polices, SEO, JSON-LD, script IntersectionObserver
  components/        ← Nav, Hero, SectionXxx, AuditForm, Footer
  pages/
    index.astro      ← assemble les composants
    merci.astro      ← page post-soumission sans JS
    api/audit.ts     ← endpoint POST SSR → webhook n8n
public/images/       ← PNG des visuels Figma (hero, portrait, projet-1/2/3)
.env                 ← jamais commité (voir .env.example)
```

## Tailwind v4 — pièges critiques

**Ne pas** utiliser `tailwind.config.js/ts`. Les tokens sont dans `src/styles/global.css` :

```css
@theme {
  --color-paper: #f4f1ea;
  --color-ink: #1a1714;
  --color-terracotta: #c2453c;
  --font-display: "Fraunces Variable", Georgia, serif;
  --font-body: "Manrope Variable", system-ui, sans-serif;
  --font-mono: "Fragment Mono", ui-monospace, monospace;
}
```

Utiliser les classes Tailwind générées : `bg-paper`, `text-ink`, `bg-terracotta`,
`font-display`, `font-body`, `font-mono`. Ne pas écrire `#c2453c` en dur dans les
composants.

## Conventions de nommage

- Composants Astro : `PascalCase.astro` — ex. `SectionOffer.astro`, `AuditForm.astro`
- Classes utilitaires globales : définies dans `global.css`, jamais dans `<style>` de composant
- Variables d'env : `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_TOKEN` (lire via `import.meta.env`)

## Design tokens & DA

Palette fixe (extraite de la maquette Figma) :
- Fond : `bg-paper` (`#f4f1ea`)
- Texte principal : `text-ink` (`#1a1714`)
- Accent / CTA : `bg-terracotta` / `text-terracotta` (`#c2453c`)

Typographie :
- Display (titres) : `font-display` — Fraunces Variable, axes `"SOFT" 0, "WONK" 1`
- Corps : `font-body` — Manrope Variable
- Labels de section (`01 ——`) : classe utilitaire `section-label` (Fragment Mono)

**Ne pas** introduire d'autres couleurs ni fontes sans valider avec le designer.

## Animations de défilement

Ajouter `class="reveal"` sur chaque élément à animer.
`data-delay="120"` (ms) pour le stagger. L'IntersectionObserver dans `Base.astro`
ajoute `is-visible` automatiquement. `prefers-reduced-motion` est géré en CSS.

## Endpoint API `/api/audit`

- Seule route SSR du projet — `output: "static"` + adaptateur Node gère cette route.
- Lit `N8N_WEBHOOK_URL` via `import.meta.env` — jamais exposer cette URL au client.
- Honeypot : champ `website_url` — si rempli, retourner 200 (spoofing) sans relayer.
- Retourne toujours `application/json`.

## Interdits

- Ne pas utiliser `bg-[#c2453c]` ou valeurs arbitraires — utiliser les tokens.
- Ne pas installer `shadcn/ui`, `daisyui` ou toute lib de composants UI.
- Ne pas installer Tailwind v3 — le projet est sur v4.
- Ne pas commiter `.env`.
- Ne pas exposer `N8N_WEBHOOK_URL` dans le code client (front matter ou `<script>`).
- Ne pas modifier `src/config.ts` pour ajouter des données statiques de section.
- Ne pas ajouter d'images hors de `public/images/` en format autre que PNG.

## Avant mise en prod

Remplacer dans `src/config.ts` : `phoneDisplay`, `phoneHref`, `email`, `url`
(marquées PLACEHOLDER). Renseigner `.env` avec la vraie URL n8n.
