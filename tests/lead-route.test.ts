import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/leads/route";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

vi.mock("@/lib/supabase-admin", () => ({ getSupabaseAdmin: vi.fn() }));

const validPayload = {
  contactName: "Alex Martin",
  email: "alex@example.com",
  phone: "",
  companyName: "Atelier Exemple",
  companySize: "pme",
  serviceNeeds: ["audit"],
  websiteUrl: "https://example.com",
  context: "Nous préparons une refonte et voulons établir un point de départ mesurable.",
  bookingMode: "calendar",
  preferredSlots: [],
  privacyAccepted: true,
  startedAt: String(Date.now() - 5_000),
  websiteConfirmation: "",
};

function request(payload: unknown, ip: string) {
  return new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:3000", "x-forwarded-for": ip },
    body: JSON.stringify(payload),
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.mocked(getSupabaseAdmin).mockReset();
});

describe("POST /api/leads", () => {
  it("renvoie une réponse neutre au honeypot sans appeler le stockage", async () => {
    const result = await POST(request({ websiteConfirmation: "robot" }, "10.0.0.1"));
    expect(result.status).toBe(201);
    expect(await result.json()).toMatchObject({ ok: true, calendarEnabled: false });
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("signale un stockage non configuré", async () => {
    vi.mocked(getSupabaseAdmin).mockReturnValue(null);
    const result = await POST(request(validPayload, "10.0.0.2"));
    expect(result.status).toBe(503);
    expect(await result.json()).toMatchObject({ ok: false, error: { code: "STORAGE_UNAVAILABLE" } });
  });

  it("enregistre une demande valide et annonce la disponibilité du calendrier", async () => {
    vi.stubEnv("NEXT_PUBLIC_CALCOM_URL", "https://cal.com/demo/diagnostic");
    const single = vi.fn().mockResolvedValue({ data: { id: "a4e6b0aa-89b9-4cf2-86eb-3ca513780147" }, error: null });
    const select = vi.fn(() => ({ single }));
    const insert = vi.fn(() => ({ select }));
    const from = vi.fn(() => ({ insert }));
    vi.mocked(getSupabaseAdmin).mockReturnValue({ from } as unknown as NonNullable<ReturnType<typeof getSupabaseAdmin>>);

    const result = await POST(request(validPayload, "10.0.0.3"));
    expect(result.status).toBe(201);
    expect(await result.json()).toEqual({ ok: true, leadId: "a4e6b0aa-89b9-4cf2-86eb-3ca513780147", calendarEnabled: true });
    expect(insert).toHaveBeenCalledOnce();
  });
});
