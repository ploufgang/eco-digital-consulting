import { createClient } from "@supabase/supabase-js";
import { normalizeHttpUrl } from "@/lib/site-url";

export function getSupabaseAdmin() {
  const url = normalizeHttpUrl(process.env.SUPABASE_URL, true);
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
