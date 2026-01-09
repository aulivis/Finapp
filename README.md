# Finapp

Minimális web-alapú pénzügyi tudatossági eszköz.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) - Vercel-en telepítve
- **Backend/DB**: Supabase (PostgreSQL)
- **Fizetés**: Stripe Checkout + webhooks
- **Email**: Postmark vagy MailerLite
- **AI**: OpenAI API (csak batch használat)

## Funkciók és Biztonsági Javítások

Ez az alkalmazás az ipari best practice-eket követi:

### Biztonság
- ✅ Security headers (HSTS, CSP, X-Frame-Options, stb.)
- ✅ Content Security Policy (CSP) konfigurálva
- ✅ Rate limiting API végpontokon
- ✅ Környezeti változók validálása
- ✅ Webhook signature verification (Stripe)
- ✅ Cron endpoint védelme (Vercel cron + CRON_SECRET)
- ✅ Middleware a biztonsági ellenőrzésekhez

### Teljesítmény és SEO
- ✅ Robots.txt és sitemap.xml generálás
- ✅ Open Graph és Twitter Card meta tagek
- ✅ Optimalizált TypeScript konfiguráció
- ✅ Error boundary komponens
- ✅ Health check endpoint (`/api/health`)

### Kódminőség
- ✅ Stricter TypeScript beállítások
- ✅ Központosított error handling
- ✅ Standardizált API válaszok
- ✅ Környezeti változók validálási script

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

## Scripts

- `npm run dev` - Fejlesztői szerver indítása
- `npm run build` - Production build készítése
- `npm run start` - Production szerver indítása
- `npm run lint` - ESLint futtatása
- `npm run type-check` - TypeScript típusellenőrzés
- `npm run validate-env` - Környezeti változók validálása
- `npm run update-macro-data` - Makro adatok frissítése
- `npm run send-quarterly-email` - Negyedéves email küldése (manuálisan)
- `npm run generate-quarterly-ai-content` - AI tartalom generálása

## Build

```bash
npm run build
npm start
```

### Környezeti változók ellenőrzése

A deployment előtt ellenőrizd a környezeti változókat:

```bash
npm run validate-env
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

### Monitoring

- **Health Check**: `GET /api/health` - Alkalmazás állapot ellenőrzése
- **Cron Jobs**: A `vercel.json` fájlban konfigurálva, automatikusan futnak

## Best Practices

### Security
- Minden API végpont rate limiting-gel védett
- Webhook végpontok signature verification-tel védettek
- Cron végpontok Vercel cron header + CRON_SECRET kombinációval védettek
- Security headers minden kérésre alkalmazva
- CSP (Content Security Policy) konfigurálva

### Error Handling
- Standardizált error responses (`lib/utils/api-response.ts`)
- Error boundary komponens a frontend-en
- Központosított error logging

### Environment Variables
- Központosított validáció (`lib/utils/env.ts`)
- Validációs script (`npm run validate-env`)
- Tiszta hibaüzenetek hiányzó változók esetén
