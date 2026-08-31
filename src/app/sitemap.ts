import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/a-propos", "/reserver", "/mentions-legales", "/politique-confidentialite"];
  return routes.map((route, index) => ({
    url: absoluteSiteUrl(route),
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : route === "/reserver" ? 0.9 : 0.7,
  }));
}
