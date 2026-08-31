import type { Metadata } from "next";

import { company } from "@/lib/company";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" }, robots: { index: false, follow: true } };

export default function LegalNoticePage() {
  return (
    <article className="container-shell max-w-4xl py-20 sm:py-28">
      <p className="eyebrow">Informations légales</p>
      <h1 className="mt-7 font-display text-5xl tracking-tight sm:text-6xl">Mentions légales</h1>
      <div className="mt-8 rounded-2xl border border-accent bg-accent-soft p-5 text-sm leading-6 text-accent-strong"><strong>Site de démonstration.</strong> L’identité, l’immatriculation et les coordonnées présentées sur cette page sont fictives et doivent être remplacées avant toute mise en production.</div>
      <div className="legal-content mt-12">
        <section><h2>Éditeur du site</h2><p>{company.legalName}, société par actions simplifiée fictive au capital social de 10 000 €.</p><p>Siège social : {company.address}<br />SIREN : {company.siren}<br />RCS Lyon — numéro de démonstration<br />TVA intracommunautaire : FR00 000000000</p><p>Direction de la publication : Camille Verdier, Présidente — identité de démonstration.</p><p>Contact : <a href={`mailto:${company.email}`}>{company.email}</a> · {company.phone}</p></section>
        <section><h2>Hébergement</h2><p>Les informations de l’hébergeur devront être renseignées selon le prestataire retenu lors de la mise en production : raison sociale, adresse et téléphone.</p></section>
        <section><h2>Propriété intellectuelle</h2><p>Les contenus, textes, éléments graphiques et composants de ce site sont protégés par les règles applicables à la propriété intellectuelle. Toute reproduction substantielle nécessite l’autorisation écrite préalable de l’éditeur, hors exceptions prévues par la loi.</p></section>
        <section><h2>Responsabilité</h2><p>Les informations publiées ont un caractère général et pédagogique. Elles ne constituent ni un audit environnemental certifié, ni un conseil juridique. L’éditeur s’efforce d’en assurer l’exactitude mais ne garantit pas l’absence d’erreur ou d’interruption.</p></section>
        <section><h2>Droit applicable</h2><p>Le site est soumis au droit français. En cas de différend, une résolution amiable sera recherchée avant toute action contentieuse.</p></section>
      </div>
    </article>
  );
}
