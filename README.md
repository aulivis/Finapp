# Finapp

Minimális web-alapú pénzügyi tudatossági eszköz.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) - Vercel-en telepítve
- **Backend/DB**: Supabase (PostgreSQL)
- **Fizetés**: Stripe Checkout + webhooks
- **Email**: Postmark vagy MailerLite
- **AI**: OpenAI API (csak batch használat)

## Környezeti változók

Másold a `.env.local.example` fájlt `.env.local` névre és töltsd ki a szükséges értékeket:

```bash
cp .env.local.example .env.local
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
