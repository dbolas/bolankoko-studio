// Coordonnées et métadonnées du studio, réutilisées dans la nav, le footer,
// le formulaire et le JSON-LD. Valeurs PLACEHOLDER à remplacer par les vraies
// avant mise en ligne (téléphone, email, domaine, réseaux).
export const site = {
  name: "Bobelow Studio",
  founder: "Belondjo Bolankoko",
  role: "Product builder fullstack · UI/UX, développement & automatisation",
  // Téléphone : format affiché + format tel: (E.164, sans espaces).
  phoneDisplay: "06 00 00 00 00",
  phoneHref: "tel:+33600000000",
  email: "contact@bobelow.studio",
  city: "Strasbourg",
  region: "Bas-Rhin · Eurométropole",
  url: "https://bobelow.studio",
  description:
    "Studio web à Strasbourg : sites, référencement local et avis clients pour les peintres et artisans du bâtiment. Pas une vitrine de plus — des demandes de devis.",
} as const;
