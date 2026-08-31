import type { Metadata } from "next";

import { company } from "@/lib/company";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/politique-confidentialite" }, robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <article className="container-shell max-w-4xl py-20 sm:py-28">
      <p className="eyebrow">Protection des données</p>
      <h1 className="mt-7 font-display text-5xl tracking-tight sm:text-6xl">Politique de confidentialité</h1>
      <p className="mt-6 text-sm text-muted">Dernière mise à jour : 31 août 2026 · Document de démonstration à faire valider avant mise en production.</p>
      <div className="legal-content mt-12">
        <section><h2>Responsable du traitement</h2><p>{company.legalName}, {company.address}. Contact du référent à la protection des données : <a href={`mailto:${company.dpoEmail}`}>{company.dpoEmail}</a>.</p></section>
        <section><h2>Données collectées</h2><p>Le formulaire de réservation peut recueillir votre nom, votre adresse électronique professionnelle, votre téléphone facultatif, le nom et la taille de votre organisation, l’URL de votre service, vos besoins, votre contexte et vos créneaux préférés.</p></section>
        <section><h2>Finalités et base légale</h2><p>Ces données sont utilisées pour répondre à votre demande, qualifier le besoin et organiser un rendez-vous. Le traitement repose sur votre consentement et, lorsque les échanges précontractuels commencent, sur l’exécution de mesures prises à votre demande.</p></section>
        <section><h2>Destinataires et sous-traitants</h2><p>Les données sont accessibles uniquement aux personnes habilitées d’EcoDigital Consulting. Elles sont stockées dans Supabase. Si vous choisissez de charger l’agenda, Cal.com reçoit les informations nécessaires à la réservation selon sa propre politique de confidentialité.</p><p>L’agenda Cal.com n’est jamais chargé automatiquement : un clic explicite est requis avant toute connexion à ce service tiers.</p></section>
        <section><h2>Durée de conservation</h2><p>Les demandes sans suite sont supprimées au plus tard 12 mois après le dernier contact. Les données nécessaires à une relation contractuelle peuvent être conservées pendant les durées légales applicables.</p></section>
        <section><h2>Vos droits</h2><p>Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données, et retirer votre consentement, en écrivant à <a href={`mailto:${company.dpoEmail}`}>{company.dpoEmail}</a>. Vous pouvez également introduire une réclamation auprès de la CNIL.</p></section>
        <section><h2>Cookies et stockage local</h2><p>Le site n’emploie aucun outil publicitaire ou de mesure d’audience. Il mémorise uniquement votre préférence de thème sur votre appareil. Un service tiers de calendrier n’est contacté qu’après votre action explicite.</p></section>
        <section><h2>Sécurité</h2><p>Les envois sont validés côté serveur, limités en fréquence et transmis via HTTPS en production. La base de données interdit les accès directs anonymes ; les secrets techniques restent exclusivement côté serveur.</p></section>
      </div>
    </article>
  );
}
