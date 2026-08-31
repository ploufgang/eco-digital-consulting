import { z } from "zod";

export const companySizes = ["tpe", "pme", "eti", "collectivite", "autre"] as const;
export const serviceNeeds = ["audit", "eco-conception", "cloud", "formation"] as const;
export const bookingModes = ["calendar", "callback"] as const;

export type CompanySize = (typeof companySizes)[number];
export type ServiceNeed = (typeof serviceNeeds)[number];
export type BookingMode = (typeof bookingModes)[number];

export const companySizeLabels: Record<CompanySize, string> = {
  tpe: "TPE — moins de 10 personnes",
  pme: "PME — 10 à 249 personnes",
  eti: "ETI — 250 à 4 999 personnes",
  collectivite: "Collectivité / organisme public",
  autre: "Autre organisation",
};

export const serviceNeedLabels: Record<ServiceNeed, string> = {
  audit: "Audit & mesure",
  "eco-conception": "Éco-conception Web / App",
  cloud: "Cloud & infrastructures",
  formation: "Sensibilisation / formation",
};

const optionalUrl = z.string().trim().max(300, "URL trop longue").refine(
  (value) => value === "" || /^https?:\/\//i.test(value),
  "Ajoutez une URL complète commençant par http:// ou https://",
);

export const leadSubmissionSchema = z.object({
  contactName: z.string().trim().min(2, "Indiquez votre nom").max(100, "Nom trop long"),
  email: z.string().trim().email("Adresse e-mail invalide").max(160, "E-mail trop long"),
  phone: z.string().trim().max(30, "Téléphone trop long"),
  companyName: z.string().trim().min(2, "Indiquez votre organisation").max(120, "Nom trop long"),
  companySize: z.enum(companySizes, { error: "Sélectionnez une taille d’organisation" }),
  serviceNeeds: z.array(z.enum(serviceNeeds)).min(1, "Sélectionnez au moins un besoin").max(4),
  websiteUrl: optionalUrl,
  context: z.string().trim().min(20, "Décrivez votre contexte en quelques mots (20 caractères minimum)").max(2000, "Contexte trop long"),
  bookingMode: z.enum(bookingModes),
  preferredSlots: z.array(z.string().max(40)).max(3),
  privacyAccepted: z.boolean().refine(Boolean, "Votre accord est nécessaire pour traiter la demande"),
  startedAt: z.string().regex(/^\d{10,16}$/),
  websiteConfirmation: z.string().max(200),
}).superRefine((data, ctx) => {
  if (data.bookingMode === "callback") {
    const validSlots = data.preferredSlots.filter((slot) => slot && !Number.isNaN(Date.parse(slot)));
    if (validSlots.length < 2) ctx.addIssue({ code: "custom", path: ["preferredSlots"], message: "Proposez au moins deux créneaux" });
  }
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export type LeadResponse =
  | { ok: true; leadId: string; calendarEnabled: boolean }
  | { ok: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } };
