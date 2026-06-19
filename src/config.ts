// Coordonnées et métadonnées du studio, réutilisées dans la nav, le footer,
// le formulaire et le JSON-LD. Valeurs PLACEHOLDER à remplacer par les vraies
// avant mise en ligne (téléphone, email, domaine, réseaux).
export const site = {
  name: "Bobelow Studio",
  founder: "Belondjo Bolankoko",
  role: "Product builder fullstack",
  // Téléphone : format affiché + format tel: (E.164, sans espaces).
  phoneDisplay: "07 68 63 87 05",
  phoneHref: "tel:+33768638705",
  email: "contact@bobelow.studio",
  city: "Strasbourg",
  region: "Bas-Rhin · Eurométropole",
  url: "https://bobelow.studio",
  description:
    "Studio web à Strasbourg : sites, référencement local et avis clients pour les peintres et artisans du bâtiment. Pas une vitrine de plus — des demandes de devis.",
} as const;
