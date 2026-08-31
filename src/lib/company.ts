export const company = {
  name: "EcoDigital Consulting", legalName: "EcoDigital Consulting SAS",
  tagline: "La performance numérique, avec moins de ressources.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "bonjour@ecodigital-consulting.example", dpoEmail: "dpo@ecodigital-consulting.example",
  phone: "+33 4 00 00 00 00", address: "27 rue des Canuts, 69004 Lyon, France",
  siren: "000 000 000 — donnée de démonstration",
} as const;
