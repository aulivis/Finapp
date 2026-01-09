# Finapp

Minimális web-alapú pénzügyi tudatossági eszköz.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) - Vercel-en telepítve
- **Backend/DB**: Supabase (PostgreSQL)
- **Fizetés**: Stripe Checkout + webhooks
- **Email**: Postmark vagy MailerLite
- **AI**: OpenAI API (csak batch használat)

## Környezeti változók

Másold a `env.example` fájlt `.env.local` névre és töltsd ki a szükséges értékeket:

```bash
cp env.example .env.local
```

## Telepítés

```bash
npm install
```

## Fejlesztés

```bash
npm run dev
```

Nyisd meg a [http://localhost:3000](http://localhost:3000) címet a böngészőben.

## Build

```bash
npm run build
npm start
```

## Vercel Deployment

### Environment Variables

A Vercel deployment előtt állítsd be az alábbi környezeti változókat a Vercel dashboard-ban vagy CLI-vel:

**Kötelező változók:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `NEXT_PUBLIC_APP_URL` (production URL, pl: `https://yourdomain.com`)
- `POSTMARK_API_KEY` vagy `MAILERLITE_API_KEY`
- `POSTMARK_FROM_EMAIL` (ha Postmark-ot használsz)

**Opcionális változók:**
- `OPENAI_API_KEY` (ha AI tartalom generálást használsz)
- `OPENAI_MODEL` (default: `gpt-4o-mini`)
- `CRON_SECRET` (cron végpontok védelméhez)

### Cron Jobs

A `vercel.json` fájl tartalmazza a quarterly email cron job konfigurációt, amely negyedévente fut (január 1., április 1., július 1., október 1., 10:00 UTC).

### Deploy

```bash
vercel --prod
```

vagy push a main branch-re, ha Vercel GitHub integrációval van beállítva.
