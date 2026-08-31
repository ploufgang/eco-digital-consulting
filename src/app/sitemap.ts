import type { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/a-propos", "/reserver", "/mentions-legales", "/politique-confidentialite"];
  return routes.map((route, index) => ({
    url: `${company.siteUrl}${route}`,
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : route === "/reserver" ? 0.9 : 0.7,
  }));
}
