import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "EcoDigital Consulting", short_name: "EcoDigital", description: "Conseil en numérique responsable", start_url: "/", display: "standalone", background_color: "#f5f2e9", theme_color: "#10231d", lang: "fr" };
}
