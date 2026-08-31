"use client";

import { ArrowDownRight, Database } from "lucide-react";
import { useState } from "react";

export function calculateImpact(visits: number, pageWeightMb: number, reductionPercent: number) {
  const monthlyGb = (visits * pageWeightMb) / 1024;
  const savedMonthlyGb = monthlyGb * (reductionPercent / 100);
  return { monthlyGb, savedMonthlyGb, savedAnnualGb: savedMonthlyGb * 12 };
}

const format = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export function ImpactCalculator() {
  const [visits, setVisits] = useState(25000);
  const [pageWeight, setPageWeight] = useState(2.4);
  const [reduction, setReduction] = useState(50);
  const result = calculateImpact(visits, pageWeight, reduction);

  return (
    <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-xl shadow-ink/5 sm:p-9">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="grid gap-3 text-sm font-bold">Pages vues par mois<input className="h-12 rounded-xl border border-border bg-background px-4 text-base font-normal" inputMode="numeric" max={10000000} min={100} onChange={(event) => setVisits(Number(event.target.value))} type="number" value={visits} /></label>
        <label className="grid gap-3 text-sm font-bold">Poids moyen d’une page (Mo)<input className="h-12 rounded-xl border border-border bg-background px-4 text-base font-normal" inputMode="decimal" max={50} min={0.1} onChange={(event) => setPageWeight(Number(event.target.value))} step={0.1} type="number" value={pageWeight} /></label>
      </div>
      <label className="mt-8 block text-sm font-bold" htmlFor="reduction">Objectif de réduction <output className="float-right font-mono text-accent-strong" htmlFor="reduction">{reduction} %</output></label>
      <input aria-label="Objectif de réduction" className="mt-4 w-full accent-[var(--accent-strong)]" id="reduction" max={80} min={10} onChange={(event) => setReduction(Number(event.target.value))} step={5} type="range" value={reduction} />
      <div aria-live="polite" className="mt-9 grid gap-3 rounded-2xl bg-ink p-6 text-cream sm:grid-cols-2">
        <div><p className="flex items-center gap-2 text-xs uppercase tracking-wider text-cream/60"><Database aria-hidden="true" className="size-4" />Trafic actuel estimé</p><p className="mt-2 text-3xl font-semibold">{format.format(result.monthlyGb)} Go<span className="text-sm font-normal text-cream/60"> / mois</span></p></div>
        <div><p className="flex items-center gap-2 text-xs uppercase tracking-wider text-mint"><ArrowDownRight aria-hidden="true" className="size-4" />Données potentiellement évitées</p><p className="mt-2 text-3xl font-semibold text-mint">{format.format(result.savedAnnualGb)} Go<span className="text-sm font-normal text-cream/60"> / an</span></p></div>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">Estimation pédagogique fondée uniquement sur le poids des pages et leur fréquentation. Elle n’intègre pas les rebonds, le cache ni le cycle de vie des équipements.</p>
    </div>
  );
}
