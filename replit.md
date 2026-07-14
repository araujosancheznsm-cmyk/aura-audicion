# Hearing Aid Catalog App

A Spanish-language hearing aid catalog and e-commerce site built with TanStack Start, React, Supabase, and shadcn/ui. Originally created with [Lovable](https://lovable.dev).

## Stack

- **Framework**: TanStack Start (SSR React) + TanStack Router
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Backend**: Supabase (auth + database)
- **Build**: Vite + Bun

## Running the app

```bash
bun install       # install dependencies
bun run dev       # start dev server on port 5000
```

The dev server runs on `http://localhost:5000`.

## Project structure

- `src/routes/` — file-based routes (TanStack Router)
- `src/components/site/` — public-facing UI components
- `src/components/admin/` — admin panel components
- `src/integrations/supabase/` — Supabase client and types
- `supabase/` — Supabase project config

## Routes

- `/` — homepage
- `/catalogo` — product catalog
- `/accesorios` — accessories
- `/marcas` — brands
- `/nosotros` — about
- `/servicios` — services
- `/blog` — blog
- `/contacto` — contact
- `/faq` — FAQ
- `/auth` — authentication
- `/admin/catalogo` — admin catalog management (authenticated)

## Environment

Supabase credentials are stored in `.env`. The Supabase project ID is `hbfgetyqrqpjwntvwxsi`.

## User preferences

<!-- Add user preferences here -->
