// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

// Site statique par défaut : toutes les pages sont pré-rendues.
// Seule la route /api/audit est servie à la demande (prerender = false)
// afin de relayer la soumission vers le webhook n8n sans exposer son URL.
// L'adaptateur Node permet de lancer ce endpoint en local (npm run preview / start).
// Pour un déploiement cloud, remplacer "@astrojs/node" par l'adaptateur de l'hôte
// (Netlify, Vercel, Cloudflare). Voir README.
export default defineConfig({
  output: "static",
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
