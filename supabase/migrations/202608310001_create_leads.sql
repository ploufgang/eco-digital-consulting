create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  contact_name text not null check (char_length(contact_name) between 2 and 100),
  email text not null check (char_length(email) <= 160),
  phone text,
  company_name text not null check (char_length(company_name) between 2 and 120),
  company_size text not null check (company_size in ('tpe', 'pme', 'eti', 'collectivite', 'autre')),
  service_needs text[] not null check (cardinality(service_needs) between 1 and 4),
  website_url text,
  project_context text not null check (char_length(project_context) between 20 and 2000),
  booking_mode text not null check (booking_mode in ('calendar', 'callback')),
  preferred_slots timestamptz[] not null default '{}',
  consent_at timestamptz not null,
  consent_version text not null,
  source text not null default 'website'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (lower(email));

alter table public.leads enable row level security;
revoke all on table public.leads from anon, authenticated;

comment on table public.leads is 'Demandes de diagnostic. Les enregistrements sans suite sont à supprimer après 12 mois.';
