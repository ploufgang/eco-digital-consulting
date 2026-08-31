"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, ExternalLink, Loader2, PhoneCall } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { type FieldPath, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  companySizeLabels,
  companySizes,
  leadSubmissionSchema,
  serviceNeedLabels,
  serviceNeeds,
  type LeadResponse,
  type LeadSubmission,
} from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

const stepFields: Record<number, FieldPath<LeadSubmission>[]> = {
  1: ["contactName", "email", "phone", "companyName", "companySize"],
  2: ["serviceNeeds", "websiteUrl", "context"],
  3: ["bookingMode", "preferredSlots", "privacyAccepted"],
};

const inputClass = "h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted/70 disabled:opacity-60";
const errorClass = "mt-2 text-sm font-semibold text-red-700 dark:text-red-300";

type BookingFormProps = { calUrl: string | null };

export function BookingForm({ calUrl }: BookingFormProps) {
  const calendarConfigured = Boolean(calUrl);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<LeadResponse | null>(null);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [serverError, setServerError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<LeadSubmission>({
    resolver: zodResolver(leadSubmissionSchema),
    mode: "onBlur",
    defaultValues: {
      contactName: "", email: "", phone: "", companyName: "", companySize: undefined,
      serviceNeeds: [], websiteUrl: "", context: "", bookingMode: calendarConfigured ? "calendar" : "callback",
      preferredSlots: ["", ""], privacyAccepted: false, startedAt: "", websiteConfirmation: "",
    },
  });

  const bookingMode = useWatch({ control: form.control, name: "bookingMode" });
  useEffect(() => { form.setValue("startedAt", String(Date.now())); }, [form]);
  useEffect(() => { titleRef.current?.focus(); }, [step]);

  async function nextStep() {
    const valid = await form.trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(3, current + 1));
  }

  async function submit(values: LeadSubmission) {
    setServerError("");
    try {
      const result = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = (await result.json()) as LeadResponse;
      if (!result.ok || !payload.ok) {
        setServerError(payload.ok ? "Une erreur inattendue est survenue." : payload.error.message);
        return;
      }
      setSubmitted(payload);
    } catch {
      setServerError("La connexion a échoué. Vérifiez votre réseau ou écrivez-nous directement.");
    }
  }

  const calendarUrl = useMemo(() => {
    if (!calUrl) return null;
    const separator = calUrl.includes("?") ? "&" : "?";
    return `${calUrl}${separator}name=${encodeURIComponent(form.getValues("contactName"))}&email=${encodeURIComponent(form.getValues("email"))}&embed=true`;
  }, [calUrl, form]);

  if (submitted?.ok) {
    const choseCalendar = form.getValues("bookingMode") === "calendar";
    return (
      <section aria-live="polite" className="rounded-[2rem] border border-border bg-surface p-7 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent-strong"><Check aria-hidden="true" className="size-7" /></span>
        <p className="mt-8 text-sm font-bold uppercase tracking-wider text-accent-strong">Demande enregistrée</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight">Merci, {form.getValues("contactName").split(" ")[0]}.</h2>
        {choseCalendar && submitted.calendarEnabled && calendarUrl ? (
          <>
            <p className="mt-4 max-w-2xl leading-7 text-muted">Votre besoin est bien enregistré. L’agenda externe n’est chargé qu’à votre demande ; Cal.com recevra alors votre nom et votre e-mail pour préremplir la réservation.</p>
            {!calendarLoaded ? <Button className="mt-7" onClick={() => setCalendarLoaded(true)} size="lg"><CalendarDays aria-hidden="true" />Charger l’agenda Cal.com</Button> : <div className="mt-8"><iframe className="h-[720px] w-full rounded-2xl border border-border bg-white" loading="lazy" sandbox="allow-forms allow-same-origin allow-scripts allow-popups" src={calendarUrl} title="Agenda de réservation Cal.com" /><a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-strong underline underline-offset-4" href={calendarUrl} rel="noreferrer" target="_blank">Ouvrir l’agenda dans un nouvel onglet<ExternalLink aria-hidden="true" className="size-4" /></a></div>}
          </>
        ) : (
          <p className="mt-4 max-w-2xl leading-7 text-muted">Nous revenons vers vous par e-mail pour confirmer l’un des créneaux proposés. Aucun agenda tiers n’a été chargé.</p>
        )}
      </section>
    );
  }

  return (
    <form className="rounded-[2rem] border border-border bg-surface p-6 shadow-xl shadow-ink/5 sm:p-10" noValidate onSubmit={form.handleSubmit(submit)}>
      <div className="mb-9 flex items-center gap-3" role="progressbar" aria-label="Progression du formulaire" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
        {[1, 2, 3].map((item) => <div className="flex flex-1 items-center gap-3" key={item}><span className={cn("grid size-8 shrink-0 place-items-center rounded-full border text-xs font-bold", item <= step ? "border-accent-strong bg-accent-strong text-white" : "border-border text-muted")}>{item < step ? <Check aria-hidden="true" className="size-4" /> : item}</span>{item < 3 && <span aria-hidden="true" className={cn("h-px flex-1", item < step ? "bg-accent" : "bg-border")} />}</div>)}
      </div>

      <input aria-hidden="true" autoComplete="off" className="absolute -left-[9999px]" tabIndex={-1} {...form.register("websiteConfirmation")} />

      {step === 1 && <fieldset><legend className="sr-only">Vous et votre organisation</legend><p className="text-xs font-bold uppercase tracking-wider text-accent-strong">Étape 1 sur 3</p><h2 className="mt-2 font-display text-3xl tracking-tight" ref={titleRef} tabIndex={-1}>Faisons connaissance.</h2><p className="mt-3 text-sm leading-6 text-muted">Les champs marqués d’un astérisque sont obligatoires.</p><div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Votre nom *" error={form.formState.errors.contactName?.message}><input autoComplete="name" className={inputClass} {...form.register("contactName")} /></Field>
        <Field label="E-mail professionnel *" error={form.formState.errors.email?.message}><input autoComplete="email" className={inputClass} inputMode="email" type="email" {...form.register("email")} /></Field>
        <Field label="Organisation *" error={form.formState.errors.companyName?.message}><input autoComplete="organization" className={inputClass} {...form.register("companyName")} /></Field>
        <Field label="Téléphone — facultatif" error={form.formState.errors.phone?.message}><input autoComplete="tel" className={inputClass} inputMode="tel" type="tel" {...form.register("phone")} /></Field>
        <Field className="sm:col-span-2" label="Taille de l’organisation *" error={form.formState.errors.companySize?.message}><select className={inputClass} defaultValue="" {...form.register("companySize")}><option disabled value="">Sélectionner</option>{companySizes.map((size) => <option key={size} value={size}>{companySizeLabels[size]}</option>)}</select></Field>
      </div></fieldset>}

      {step === 2 && <fieldset><legend className="sr-only">Votre besoin</legend><p className="text-xs font-bold uppercase tracking-wider text-accent-strong">Étape 2 sur 3</p><h2 className="mt-2 font-display text-3xl tracking-tight" ref={titleRef} tabIndex={-1}>Que souhaitez-vous améliorer ?</h2><p className="mt-3 text-sm leading-6 text-muted">Vous pouvez sélectionner plusieurs sujets.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{serviceNeeds.map((need) => <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4 has-checked:border-accent has-checked:bg-accent-soft" key={need}><input className="mt-1 size-4 accent-[var(--accent-strong)]" type="checkbox" value={need} {...form.register("serviceNeeds")} /><span className="font-semibold">{serviceNeedLabels[need]}</span></label>)}</div>{form.formState.errors.serviceNeeds?.message && <p className={errorClass}>{form.formState.errors.serviceNeeds.message}</p>}<div className="mt-6 grid gap-6">
        <Field label="URL du service — facultatif" error={form.formState.errors.websiteUrl?.message}><input className={inputClass} inputMode="url" placeholder="https://exemple.fr" type="url" {...form.register("websiteUrl")} /></Field>
        <Field label="Votre contexte et votre principal enjeu *" error={form.formState.errors.context?.message}><textarea className="min-h-36 w-full resize-y rounded-xl border border-border bg-background p-4 text-base" maxLength={2000} placeholder="Ex. : refonte prévue, facture cloud en hausse, objectif RSE…" {...form.register("context")} /></Field>
      </div></fieldset>}

      {step === 3 && <fieldset><legend className="sr-only">Votre préférence de rendez-vous</legend><p className="text-xs font-bold uppercase tracking-wider text-accent-strong">Étape 3 sur 3</p><h2 className="mt-2 font-display text-3xl tracking-tight" ref={titleRef} tabIndex={-1}>Comment souhaitez-vous échanger ?</h2><div className="mt-8 grid gap-3">
        <label className={cn("flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-background p-5 has-checked:border-accent has-checked:bg-accent-soft", !calendarConfigured && "cursor-not-allowed opacity-55")}><input className="mt-1 size-4 accent-[var(--accent-strong)]" disabled={!calendarConfigured} type="radio" value="calendar" {...form.register("bookingMode")} /><CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" /><span><strong className="block">Choisir directement dans l’agenda</strong><span className="mt-1 block text-sm leading-6 text-muted">Cal.com sera chargé seulement après l’enregistrement de votre demande.{!calendarConfigured && " Agenda non configuré sur cette instance."}</span></span></label>
        <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-background p-5 has-checked:border-accent has-checked:bg-accent-soft"><input className="mt-1 size-4 accent-[var(--accent-strong)]" type="radio" value="callback" {...form.register("bookingMode")} /><PhoneCall aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" /><span><strong className="block">Être recontacté·e</strong><span className="mt-1 block text-sm leading-6 text-muted">Proposez deux créneaux ; nous confirmerons par e-mail.</span></span></label>
      </div>
      {bookingMode === "callback" && <div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="Premier créneau *"><input className={inputClass} type="datetime-local" {...form.register("preferredSlots.0")} /></Field><Field label="Second créneau *"><input className={inputClass} type="datetime-local" {...form.register("preferredSlots.1")} /></Field>{form.formState.errors.preferredSlots?.message && <p className={cn(errorClass, "sm:col-span-2")}>{form.formState.errors.preferredSlots.message}</p>}</div>}
      <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-muted"><input className="mt-1 size-4 shrink-0 accent-[var(--accent-strong)]" type="checkbox" {...form.register("privacyAccepted")} /><span>J’accepte que mes données soient utilisées pour répondre à cette demande, conformément à la <a className="font-bold text-accent-strong underline underline-offset-4" href="/politique-confidentialite" target="_blank">politique de confidentialité</a>. *</span></label>{form.formState.errors.privacyAccepted?.message && <p className={errorClass}>{form.formState.errors.privacyAccepted.message}</p>}
      </fieldset>}

      {serverError && <div className="mt-7 rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200" role="alert">{serverError}</div>}
      <div className="mt-9 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        {step > 1 ? <Button onClick={() => { setServerError(""); setStep((current) => current - 1); }} type="button" variant="ghost"><ArrowLeft aria-hidden="true" />Retour</Button> : <span />}
        {step < 3 ? <Button onClick={nextStep} type="button">Continuer<ArrowRight aria-hidden="true" /></Button> : <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? <><Loader2 aria-hidden="true" className="animate-spin" />Enregistrement…</> : <><Clock3 aria-hidden="true" />Envoyer ma demande</>}</Button>}
      </div>
    </form>
  );
}

function Field({ children, className, error, label }: { children: React.ReactNode; className?: string; error?: string; label: string }) {
  return <label className={cn("grid gap-2 text-sm font-bold", className)}>{label}{children}{error && <span className={errorClass}>{error}</span>}</label>;
}
