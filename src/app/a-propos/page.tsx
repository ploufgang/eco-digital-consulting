import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Eye, Scale, ShieldCheck, Waypoints } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "À propos",
  description: "Notre vision d’un numérique responsable, mesurable et utile, fondée sur l’ingénierie et la coopération.",
  alternates: { canonical: "/a-propos" },
};

const values = [
  { icon: Eye, title: "Transparence", text: "Nos hypothèses, limites et méthodes sont documentées. Pas de promesse environnementale sans preuve." },
  { icon: Scale, title: "Juste mesure", text: "Nous cherchons l’effort proportionné et l’utilité réelle, pas l’optimisation cosmétique." },
  { icon: Waypoints, title: "Vision systémique", text: "Logiciel, matériel, réseau, usages et organisation sont traités comme un même système." },
  { icon: ShieldCheck, title: "Éthique", text: "Sobriété éditoriale, accessibilité, vie privée et absence de mécanismes captifs guident nos choix." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-20 sm:py-28"><div aria-hidden="true" className="hero-grid absolute inset-0 opacity-40" /><div className="container-shell relative grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"><div><p className="eyebrow">À propos</p><h1 className="mt-7 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">Le numérique responsable est d’abord une discipline d’ingénierie.</h1></div><p className="text-lg leading-8 text-muted">Nous rapprochons expertise technique, objectifs métiers et enjeux environnementaux pour rendre la transition praticable — pas seulement désirable.</p></div></section>
      <section className="py-24 sm:py-32"><div className="container-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20"><div><p className="eyebrow">Notre conviction</p><h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Moins, mais mieux.</h2></div><div className="space-y-6 text-lg leading-8 text-muted"><p>L’allongement de la durée de vie des équipements, la réduction des traitements inutiles et la maîtrise des infrastructures comptent davantage qu’un simple badge affiché en bas de page.</p><p>Notre rôle est de rendre ces arbitrages lisibles pour les directions, actionnables pour les équipes et mesurables dans le temps.</p><p>La démarche s’appuie notamment sur les 78 critères du Référentiel général d’écoconception de services numériques 2024.</p><a className="inline-flex items-center gap-2 text-sm font-bold text-accent-strong underline underline-offset-4" href="https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/" rel="noreferrer" target="_blank">Consulter le RGESN 2024<ArrowRight aria-hidden="true" className="size-4" /></a></div></div></section>
      <section className="border-y border-border bg-surface py-24"><div className="container-shell"><div className="max-w-2xl"><p className="eyebrow">Nos principes</p><h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Une pratique exigeante et pragmatique.</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2">{values.map(({ icon: Icon, title, text }) => <article className="rounded-[1.75rem] border border-border bg-background p-7 sm:p-9" key={title}><Icon aria-hidden="true" className="size-6 text-accent" /><h3 className="mt-8 font-display text-2xl">{title}</h3><p className="mt-3 leading-7 text-muted">{text}</p></article>)}</div></div></section>
      <section className="py-24"><div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow">Compétences mobilisées</p><h2 className="mt-6 font-display text-4xl tracking-tight">Du code au comité de direction.</h2></div><ul className="grid gap-4 sm:grid-cols-2">{["Architecture Web & Cloud", "Performance et qualité logicielle", "GreenOps et FinOps", "RGESN et accessibilité", "Mesure et indicateurs", "Facilitation et formation"].map((skill) => <li className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4" key={skill}><CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-accent" />{skill}</li>)}</ul></div></section>
      <section className="container-shell pb-24"><div className="flex flex-col justify-between gap-8 rounded-[2rem] bg-accent-soft p-8 sm:p-12 lg:flex-row lg:items-end"><div><p className="text-sm font-bold uppercase tracking-wider text-accent-strong">Faisons connaissance</p><h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight">Parlons de votre système, pas d’une solution toute faite.</h2></div><Button asChild size="lg"><Link href="/reserver">Réserver 30 minutes<ArrowRight aria-hidden="true" /></Link></Button></div></section>
    </>
  );
}
