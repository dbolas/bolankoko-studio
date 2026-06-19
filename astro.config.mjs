// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  adapter: vercel(),
  // Derrière le proxy Vercel, le Host interne ne matche pas l'Origin public :
  // la protection CSRF d'Astro rejette alors les soumissions légitimes du
  // formulaire. /api/audit ne fait que relayer un formulaire de contact public
  // (anti-spam assuré par le honeypot côté API + n8n), on désactive donc le check.
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
