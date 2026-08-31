# EcoDigital Consulting

Site vitrine et parcours de prise de rendez-vous pour une activité de conseil en numérique responsable. Le projet utilise Next.js App Router, React 19, TypeScript strict et Tailwind CSS.

## Démarrage

```bash
npm install
copy .env.example .env.local
npm run dev
```

Le site est ensuite disponible sur `http://localhost:3000`.

Sans configuration Supabase, toutes les pages et le formulaire restent consultables, mais l’envoi affiche proprement l’indisponibilité du stockage. Sans URL Cal.com, le parcours sélectionne automatiquement la demande de rappel.

## Configuration

| Variable | Usage |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origine publique utilisée par les metadata, le sitemap et le contrôle d’origine |
| `NEXT_PUBLIC_CALCOM_URL` | URL complète de l’événement Cal.com ; facultative |
| `SUPABASE_URL` | URL du projet Supabase, côté serveur uniquement |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé de service Supabase, jamais exposée au navigateur |

Appliquer `supabase/migrations/202608310001_create_leads.sql` avec la CLI Supabase ou l’éditeur SQL du projet. La table active RLS et ne définit aucune politique pour les rôles publics ; les insertions passent exclusivement par `POST /api/leads`.

Les demandes sans suite doivent être supprimées au plus tard 12 mois après le dernier contact. Cette rétention est une procédure métier à automatiser dans l’environnement Supabase de production.

## Commandes de contrôle

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Les tests unitaires couvrent le calculateur, le schéma partagé, les étapes du formulaire et le Route Handler. Les scénarios Playwright existent pour desktop et mobile ; ils nécessitent un navigateur Playwright disponible.

## Principes d’éco-conception

- Server Components par défaut et frontières client limitées au thème, au calculateur, au menu mobile et au formulaire.
- Aucun analytics, vidéo, carrousel ou bibliothèque d’animation.
- Agenda tiers chargé uniquement après un clic explicite.
- Typographies auto-hébergées par `next/font` et aucune image décorative chargée dans les pages.
- Budgets cibles sur les pages marketing : 300 Ko transférés, 25 requêtes et 500 nœuds DOM avant interaction.
- Objectifs après déploiement : Lighthouse ≥ 95 et classe EcoIndex A, à mesurer sur l’hébergement final.

## Avant mise en production

Remplacer toutes les données marquées comme fictives : société, SIREN, direction de publication, coordonnées, hébergeur et adresses `.example`. Faire valider les pages légales, définir la procédure d’exercice des droits RGPD, configurer les secrets et tester le chargement Cal.com avec sa politique de confidentialité effective.
