import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { company } from "@/lib/company";

import "./globals.css";

const manrope = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });
const newsreader = localFont({ src: "./fonts/newsreader-latin-wght-normal.woff2", variable: "--font-newsreader", display: "swap", weight: "200 800" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || company.siteUrl || "http://localhost:3000"),
  title: { default: `${company.name} | Numérique responsable`, template: `%s | ${company.name}` },
  description: "Conseil en Green IT, éco-conception logicielle et optimisation d’infrastructures pour réduire coûts et empreinte environnementale.",
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  openGraph: {
    type: "website", locale: "fr_FR", url: "/", siteName: company.name,
    title: "EcoDigital Consulting | Numérique responsable",
    description: "Un numérique plus sobre. Des systèmes plus efficaces.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "EcoDigital Consulting — Un numérique plus sobre. Des systèmes plus efficaces." }],
  },
  twitter: { card: "summary_large_image", title: "EcoDigital Consulting | Numérique responsable", description: "Un numérique plus sobre. Des systèmes plus efficaces.", images: ["/og.png"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  description: "Conseil en Green IT, éco-conception logicielle et optimisation d’infrastructures.",
  url: company.siteUrl,
  email: company.email,
  telephone: company.phone,
  areaServed: "France",
  address: { "@type": "PostalAddress", streetAddress: "27 rue des Canuts", postalCode: "69004", addressLocality: "Lyon", addressCountry: "FR" },
  serviceType: ["Audit numérique responsable", "Éco-conception logicielle", "Optimisation Cloud", "Formation Green IT"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${manrope.variable} ${newsreader.variable} min-h-svh antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#contenu">Aller au contenu</a>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
          <div className="flex min-h-svh flex-col"><Header /><main className="flex-1" id="contenu">{children}</main><Footer /></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
