type Entry = { count: number; resetAt: number };
const entries = new Map<string, Entry>();

export async function fingerprint(value: string) {
  const bytes = new TextEncoder().encode(value || "unknown");
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).slice(0, 12).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function checkRateLimit(key: string, limit = 4, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  if (entries.size > 1000) for (const [entryKey, entry] of entries) if (entry.resetAt <= now) entries.delete(entryKey);
  const current = entries.get(key);
  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= limit) return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}
