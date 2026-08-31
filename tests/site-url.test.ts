import { describe, expect, it } from "vitest";

import { DEFAULT_SITE_URL, normalizeHttpUrl, resolveSiteUrl, safeHttpUrl } from "@/lib/site-url";

describe("site URL helpers", () => {
  it("ignore les valeurs absentes ou composées d’espaces", () => {
    expect(normalizeHttpUrl("")).toBeNull();
    expect(normalizeHttpUrl("   ")).toBeNull();
    expect(resolveSiteUrl("", "   ")).toBe(DEFAULT_SITE_URL);
  });

  it("ajoute HTTPS à un domaine sans protocole et supprime les espaces", () => {
    expect(resolveSiteUrl("  eco-digital-consulting.vercel.app  ")).toBe("https://eco-digital-consulting.vercel.app");
  });

  it("n’accepte que HTTP et HTTPS", () => {
    expect(normalizeHttpUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeHttpUrl("ftp://example.com")).toBeNull();
  });

  it("préserve le chemin d’une URL externe valide", () => {
    expect(normalizeHttpUrl(" https://cal.com/demo/diagnostic?layout=month ")).toBe("https://cal.com/demo/diagnostic?layout=month");
  });

  it("fournit toujours une URL valide au constructeur", () => {
    expect(safeHttpUrl(" ").origin).toBe(new URL(DEFAULT_SITE_URL).origin);
  });
});
