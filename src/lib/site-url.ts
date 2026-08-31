export const DEFAULT_SITE_URL = "https://eco-digital-consulting.vercel.app";

const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

function addProtocol(value: string) {
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) return value;
  const protocol = /^(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(value) ? "http" : "https";
  return `${protocol}://${value}`;
}

/** Returns a validated HTTP(S) URL or null for empty and malformed input. */
export function normalizeHttpUrl(value: string | null | undefined, originOnly = false) {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(addProtocol(trimmed));
    if (!HTTP_PROTOCOLS.has(parsed.protocol) || !parsed.hostname) return null;
    parsed.hash = "";
    return originOnly ? parsed.origin : parsed.toString();
  } catch {
    return null;
  }
}

export function resolveSiteUrl(...candidates: Array<string | null | undefined>) {
  for (const candidate of candidates) {
    const normalized = normalizeHttpUrl(candidate, true);
    if (normalized) return normalized;
  }
  return DEFAULT_SITE_URL;
}

export const siteUrl = resolveSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
);

// siteUrl is guaranteed to be a non-empty, validated absolute HTTP(S) origin.
export const siteUrlObject = new URL(siteUrl);

export function absoluteSiteUrl(path = "/") {
  const normalizedPath = path.trim() || "/";
  return new URL(normalizedPath, `${siteUrl}/`).toString();
}

export function safeHttpUrl(value: string | null | undefined) {
  const normalized = normalizeHttpUrl(value);
  return normalized ? new URL(normalized) : new URL(siteUrl);
}
