import type { Metadata } from "next";
import { ArrowRight, Check, CloudCog, Code2, Gauge, GraduationCap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: "Audit numérique responsable, éco-conception logicielle, optimisation Cloud et formation des équipes.",
  alternates: { canonical: "/services" },
};

const offers = [
  {
    icon: Gauge,
    eyebrow: "Mesurer avant d’agir",
    title: "Audit d’empreinte numérique",
    intro: "Une photographie utile de vos impacts pour sortir des intuitions et arbitrer avec des données.",
    problems: ["Manque de visibilité sur les principaux postes d’impact", "Indicateurs RSE déconnectés des décisions IT", "Difficulté à prioriser une feuille de route réaliste"],
    deliverables: ["Périmètre et unité fonctionnelle", "Analyse technique et RGESN", "Cartographie des impacts", "Plan d’action priorisé à 12 mois"],
  },
  {
    icon: Code2,
    eyebrow: "Concevoir juste",
    title: "Éco-conception Web & App",
    intro: "Des parcours plus rapides, plus accessibles et moins gourmands, dès le cadrage ou sur un produit existant.",
    problems: ["Pages lentes ou lourdes sur mobile", "Fonctionnalités peu utilisées mais coûteuses", "Dette technique qui freine chaque évolution"],
    deliverables: ["Revue UX et architecture", "Budgets de performance", "Backlog d’optimisation", "Déclaration d’éco-conception"],
  },
  {
    icon: CloudCog,
    eyebrow: "Exploiter mieux",
    title: "Optimisation Cloud & Serveurs",
    intro: "Une démarche GreenOps et FinOps commune pour réduire la facture et les ressources mobilisées.",
    problems: ["Surdimensionnement permanent", "Environnements inactifs laissés allumés", "Coûts cloud difficiles à attribuer"],
    deliverables: ["Inventaire des workloads", "Scénarios de rightsizing", "Règles d’extinction et d’élasticité", "Tableau de pilotage coûts / ressources"],
  },
  {
    icon: GraduationCap,
    eyebrow: "Faire monter les équipes",
    title: "Sensibilisation & formation",
    intro: "Des formats concrets pour que produit, design, développement et infrastructure partagent les mêmes réflexes.",
    problems: ["Sujet perçu comme abstrait ou culpabilisant", "Bonnes pratiques isolées", "Absence de critères communs entre métiers"],
    deliverables: ["Atelier de sensibilisation", "Formation métier sur mesure", "Checklist contextualisée", "Plan de progression collectif"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-28"><div className="container-shell max-w-5xl"><p className="eyebrow">Nos prestations</p><h1 className="mt-7 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">Transformer vos impacts en décisions concrètes.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Des missions modulaires, de deux semaines à plusieurs mois, adaptées à votre maturité et à vos contraintes opérationnelles.</p></div></section>
      <section className="py-20 sm:py-28"><div className="container-shell grid gap-5">
        {offers.map(({ icon: Icon, eyebrow, title, intro, problems, deliverables }, index) => <article className="grid overflow-hidden rounded-[2rem] border border-border bg-surface lg:grid-cols-[0.95fr_1.05fr]" key={title}><div className="p-7 sm:p-10"><div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-strong"><Icon aria-hidden="true" className="size-5" /></span><span className="font-mono text-sm text-muted">0{index + 1}</span></div><p className="mt-10 text-xs font-bold uppercase tracking-[.12em] text-accent-strong">{eyebrow}</p><h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{title}</h2><p className="mt-5 max-w-xl leading-7 text-muted">{intro}</p><h3 className="mt-8 text-sm font-bold">Quand nous appeler</h3><ul className="mt-3 grid gap-2 text-sm text-muted">{problems.map((problem) => <li className="flex gap-2" key={problem}><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{problem}</li>)}</ul></div><div className="border-t border-border bg-background p-7 sm:p-10 lg:border-l lg:border-t-0"><h3 className="font-display text-2xl">Ce que vous obtenez</h3><ul className="mt-7 grid gap-4">{deliverables.map((item) => <li className="flex items-center gap-3" key={item}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong"><Check aria-hidden="true" className="size-4" /></span><span>{item}</span></li>)}</ul></div></article>)}
      </div></section>
      <section className="container-shell pb-24"><div className="rounded-[2rem] bg-ink p-8 text-cream sm:p-12"><p className="text-sm font-bold uppercase tracking-wider text-mint">Un besoin transversal ?</p><div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><h2 className="max-w-3xl font-display text-4xl tracking-tight">Composons un accompagnement à votre mesure.</h2><p className="mt-4 max-w-2xl text-cream/70">Le premier échange sert à préciser le périmètre utile, sans pousser une offre standard.</p></div><Button asChild className="bg-mint text-ink hover:bg-white hover:text-ink" size="lg"><Link href="/reserver">Cadrer votre besoin<ArrowRight aria-hidden="true" /></Link></Button></div></div></section>
    </>
  );
}
