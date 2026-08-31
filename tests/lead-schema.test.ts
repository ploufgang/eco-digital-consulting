import { describe, expect, it } from "vitest";

import { leadSubmissionSchema } from "@/lib/lead-schema";

const validLead = {
  contactName: "Alex Martin",
  email: "alex@example.com",
  phone: "",
  companyName: "Atelier Exemple",
  companySize: "pme" as const,
  serviceNeeds: ["audit"] as const,
  websiteUrl: "https://example.com",
  context: "Nous préparons une refonte et voulons établir un point de départ mesurable.",
  bookingMode: "calendar" as const,
  preferredSlots: [],
  privacyAccepted: true,
  startedAt: "1756650000000",
  websiteConfirmation: "",
};

describe("leadSubmissionSchema", () => {
  it("accepte une demande calendrier complète", () => {
    expect(leadSubmissionSchema.safeParse(validLead).success).toBe(true);
  });

  it("exige deux créneaux pour une demande de rappel", () => {
    const result = leadSubmissionSchema.safeParse({ ...validLead, bookingMode: "callback", preferredSlots: ["2026-09-10T10:00"] });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.preferredSlots).toContain("Proposez au moins deux créneaux");
  });

  it("refuse un contexte trop court et l’absence de consentement", () => {
    const result = leadSubmissionSchema.safeParse({ ...validLead, context: "Trop court", privacyAccepted: false });
    expect(result.success).toBe(false);
  });
});
