import { leadSubmissionSchema, type LeadResponse } from "@/lib/lead-schema";
import { checkRateLimit, fingerprint } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_BODY_BYTES = 16_384;

function response(body: LeadResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return response({ ok: false, error: { code: "PAYLOAD_TOO_LARGE", message: "La demande est trop volumineuse." } }, 422);

  const requestUrl = new URL(request.url);
  const configuredOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? requestUrl.origin).origin;
  const allowedOrigins = new Set([requestUrl.origin, configuredOrigin]);
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.has(origin)) return response({ ok: false, error: { code: "INVALID_ORIGIN", message: "Origine de la requête refusée." } }, 422);

  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return response({ ok: false, error: { code: "PAYLOAD_TOO_LARGE", message: "La demande est trop volumineuse." } }, 422);
    raw = JSON.parse(body);
  } catch { return response({ ok: false, error: { code: "INVALID_JSON", message: "Le contenu de la demande est invalide." } }, 422); }

  if (raw && typeof raw === "object" && "websiteConfirmation" in raw && Boolean(raw.websiteConfirmation)) {
    return response({ ok: true, leadId: crypto.randomUUID(), calendarEnabled: false }, 201);
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  const rate = checkRateLimit(await fingerprint(forwarded));
  if (!rate.allowed) return response({ ok: false, error: { code: "RATE_LIMITED", message: "Trop de demandes ont été envoyées. Réessayez dans quelques minutes." } }, 429, { "Retry-After": String(rate.retryAfter) });

  const parsed = leadSubmissionSchema.safeParse(raw);
  if (!parsed.success) return response({ ok: false, error: { code: "VALIDATION_ERROR", message: "Certains champs doivent être corrigés.", fieldErrors: parsed.error.flatten().fieldErrors } }, 422);

  if (Date.now() - Number(parsed.data.startedAt) < 1500) return response({ ok: true, leadId: crypto.randomUUID(), calendarEnabled: false }, 201);

  const supabase = getSupabaseAdmin();
  if (!supabase) return response({ ok: false, error: { code: "STORAGE_UNAVAILABLE", message: "La réservation est temporairement indisponible. Vous pouvez nous écrire par e-mail." } }, 503);

  const { data, error } = await supabase.from("leads").insert({
    contact_name: parsed.data.contactName,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone || null,
    company_name: parsed.data.companyName,
    company_size: parsed.data.companySize,
    service_needs: parsed.data.serviceNeeds,
    website_url: parsed.data.websiteUrl || null,
    project_context: parsed.data.context,
    booking_mode: parsed.data.bookingMode,
    preferred_slots: parsed.data.bookingMode === "callback" ? parsed.data.preferredSlots.filter(Boolean).map((slot) => new Date(slot).toISOString()) : [],
    consent_at: new Date().toISOString(),
    consent_version: "2026-08-31",
    source: "website",
  }).select("id").single();

  if (error || !data) {
    console.error("Lead insertion failed", { code: error?.code });
    return response({ ok: false, error: { code: "STORAGE_ERROR", message: "Nous n’avons pas pu enregistrer la demande. Réessayez ou contactez-nous par e-mail." } }, 503);
  }

  return response({ ok: true, leadId: data.id, calendarEnabled: Boolean(process.env.NEXT_PUBLIC_CALCOM_URL) }, 201);
}
