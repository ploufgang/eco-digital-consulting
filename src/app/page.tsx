import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CloudCog,
  Code2,
  Gauge,
  Leaf,
  SearchCheck,
  Server,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ImpactCalculator } from "@/components/impact-calculator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const pillars = [
  { icon: Gauge, label: "Audit & mesure", text: "Un diagnostic factuel pour décider où agir en priorité." },
  { icon: Leaf, label: "Éco-conception", text: "Des services plus sobres, rapides et accessibles." },
  { icon: Server, label: "Cloud & serveurs", text: "La juste capacité, au juste coût, sans ressources dormantes." },
];

const services = [
  { icon: SearchCheck, number: "01", title: "Audit d’empreinte numérique", text: "Mesurez les postes qui pèsent vraiment : terminaux, réseau, hébergement, architecture et usages.", tags: ["ACV simplifiée", "EcoIndex", "RGESN"] },
  { icon: Code2, number: "02", title: "Éco-conception Web & App", text: "Réduisez le poids, la complexité et les traitements de vos parcours sans dégrader l’expérience.", tags: ["UX sobre", "Performance", "Accessibilité"] },
  { icon: CloudCog, number: "03", title: "Optimisation Cloud & Serveurs", text: "Supprimez les ressources dormantes, redimensionnez les workloads et pilotez coûts et émissions.", tags: ["FinOps", "GreenOps", "Architecture"] },
  { icon: Users, number: "04", title: "Sensibilisation & formation", text: "Donnez aux équipes produit, design et IT des pratiques concrètes, adaptées à leur quotidien.", tags: ["Ateliers", "Formation", "Feuille de route"] },
];

const method = [
  ["Cadrer", "Objectifs, périmètre, contraintes et indicateurs utiles."],
  ["Mesurer", "Données réelles, analyse technique et entretiens ciblés."],
  ["Prioriser", "Leviers classés par impact, effort, coût et dépendances."],
  ["Transformer", "Accompagnement des équipes et mesure des progrès."],
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-50" />
        <div className="container-shell relative grid min-h-[calc(100svh-5rem)] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7"><span className="size-2 rounded-full bg-accent" />Conseil en numérique responsable</p>
            <h1 className="font-display text-5xl leading-[0.98] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.4rem]">Un numérique plus sobre. Des systèmes plus efficaces.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">Nous aidons les PME, ETI et collectivités à réduire leurs coûts d’infrastructure et l’empreinte environnementale de leurs services numériques — sans sacrifier la performance.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/reserver">Réserver un diagnostic de 30 min<ArrowRight aria-hidden="true" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/services">Découvrir nos expertises</Link></Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {["Premier échange sans engagement", "Approche RGESN", "Livrables actionnables"].map((item) => <li className="flex items-center gap-2" key={item}><CheckCircle2 aria-hidden="true" className="size-4 text-accent" />{item}</li>)}
            </ul>
          </div>
          <div className="relative lg:justify-self-end">
            <div aria-hidden="true" className="orbit absolute -inset-10" />
            <div className="relative grid max-w-xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border shadow-2xl shadow-ink/5">
              {pillars.map(({ icon: Icon, label, text }, index) => (
                <article className="bg-surface p-7 sm:p-8" key={label}><div className="flex items-start gap-5"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-strong"><Icon aria-hidden="true" className="size-5" /></span><div><p className="mb-1 font-mono text-xs text-muted">0{index + 1}</p><h2 className="font-display text-2xl tracking-tight">{label}</h2><p className="mt-2 leading-7 text-muted">{text}</p></div></div></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Chiffres clés" className="border-b border-border bg-ink py-8 text-cream">
        <div className="container-shell grid gap-7 sm:grid-cols-3">
          <p><strong className="block text-3xl text-mint">4,4 %</strong><span className="text-sm text-cream/70">de l’empreinte carbone de la France</span></p>
          <p><strong className="block text-3xl text-mint">51,5 TWh</strong><span className="text-sm text-cream/70">d’électricité consommée par le numérique</span></p>
          <p><strong className="block text-3xl text-mint">29,5 Mt CO₂e</strong><span className="text-sm text-cream/70">d’empreinte carbone annuelle estimée</span></p>
        </div>
        <div className="container-shell mt-5"><a className="text-xs text-cream/60 underline underline-offset-4 hover:text-cream" href="https://www.ademe.fr/presse/communique-national/numerique-environnement-entre-opportunites-et-necessaire-sobriete/" rel="noreferrer" target="_blank">Source : ADEME, janvier 2025</a></div>
      </section>

      <section className="py-24 sm:py-32" id="expertises">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div><p className="eyebrow">Nos expertises</p><h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Agir là où l’impact est mesurable.</h2><p className="mt-5 leading-8 text-muted">Chaque mission relie performance environnementale, maîtrise des coûts et qualité de service.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map(({ icon: Icon, number, title, text, tags }) => <article className="rounded-[1.75rem] border border-border bg-surface p-7" key={number}><div className="flex items-center justify-between"><Icon aria-hidden="true" className="size-6 text-accent" /><span className="font-mono text-xs text-muted">{number}</span></div><h3 className="mt-10 font-display text-2xl tracking-tight">{title}</h3><p className="mt-3 leading-7 text-muted">{text}</p><ul className="mt-6 flex flex-wrap gap-2">{tags.map((tag) => <li className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong" key={tag}>{tag}</li>)}</ul></article>)}
            </div>
          </div>
          <Button asChild className="mt-10 lg:ml-[calc(37.5%+5rem)]" variant="outline"><Link href="/services">Voir le détail des prestations<ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 sm:py-32">
        <div className="container-shell">
          <div className="max-w-2xl"><p className="eyebrow">Une méthode lisible</p><h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">De la donnée à la décision.</h2><p className="mt-5 leading-8 text-muted">Pas de score décoratif : une trajectoire réaliste, des responsables identifiés et des résultats suivis.</p></div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border md:grid-cols-4">{method.map(([title, text], index) => <li className="bg-background p-7" key={title}><span className="font-mono text-sm text-accent">0{index + 1}</span><h3 className="mt-10 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></li>)}</ol>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="impact">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><p className="eyebrow">Estimation rapide</p><h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Combien de données pourriez-vous éviter ?</h2><p className="mt-5 leading-8 text-muted">Testez un scénario de réduction du poids moyen de vos pages. Le résultat exprime un volume de données évité, pas un bilan carbone.</p><div className="mt-8 flex items-start gap-3 rounded-2xl border border-border p-4 text-sm text-muted"><BarChart3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" /><p>Pour une mesure complète, nous intégrons aussi l’hébergement, les terminaux, les usages et la durée de vie des équipements.</p></div></div>
          <ImpactCalculator />
        </div>
      </section>

      <section className="container-shell pb-24 sm:pb-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-cream sm:px-12 lg:px-16">
          <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-20" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-sm font-bold uppercase tracking-[.12em] text-mint">Votre prochain pas</p><h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">30 minutes pour identifier vos leviers prioritaires.</h2><p className="mt-5 max-w-2xl leading-7 text-cream/70">Parlons de votre contexte, de vos contraintes et d’un premier périmètre utile — sans engagement commercial.</p></div><Button asChild className="bg-mint text-ink hover:bg-white hover:text-ink" size="lg"><Link href="/reserver">Choisir un créneau<ArrowRight aria-hidden="true" /></Link></Button></div>
        </div>
      </section>
    </>
  );
}
