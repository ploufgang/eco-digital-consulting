import type { Metadata } from "next";
import { CheckCircle2, Clock3, LockKeyhole } from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { normalizeHttpUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Réserver un diagnostic",
  description: "Qualifiez votre besoin et réservez un échange de 30 minutes sur votre transition numérique responsable.",
  alternates: { canonical: "/reserver" },
};

export default function BookingPage() {
  const calUrl = normalizeHttpUrl(process.env.NEXT_PUBLIC_CALCOM_URL);
  return (
    <section className="py-16 sm:py-24"><div className="container-shell grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><aside className="lg:sticky lg:top-28"><p className="eyebrow">Diagnostic préalable</p><h1 className="mt-7 font-display text-5xl leading-[1.03] tracking-tight sm:text-6xl">Parlons de votre contexte.</h1><p className="mt-6 text-lg leading-8 text-muted">Quelques informations suffisent pour préparer un échange utile, sans présentation commerciale générique.</p><ul className="mt-9 grid gap-5 text-sm"><li className="flex gap-3"><Clock3 aria-hidden="true" className="size-5 shrink-0 text-accent" /><span><strong className="block">30 minutes</strong><span className="text-muted">En visioconférence, sans engagement.</span></span></li><li className="flex gap-3"><CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-accent" /><span><strong className="block">Un premier cadrage</strong><span className="text-muted">Périmètre, irritants et leviers possibles.</span></span></li><li className="flex gap-3"><LockKeyhole aria-hidden="true" className="size-5 shrink-0 text-accent" /><span><strong className="block">Vos données protégées</strong><span className="text-muted">Conservation maximale annoncée de 12 mois.</span></span></li></ul></aside><BookingForm calUrl={calUrl} /></div></section>
  );
}
