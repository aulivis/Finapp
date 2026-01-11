# Contexta

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

## Adatfájl frissítése

Az alkalmazás központi adatfájlja a `lib/data/economic-data.ts`, amely tartalmazza az összes hardcoded gazdasági adatot. Ez a fájl az alkalmazás egészén keresztül használt adatok központi forrása.

### Mi található ebben a fájlban?

1. **Történelmi inflációs adatok** (`HISTORICAL_INFLATION`)
   - Éves inflációs ráták Magyarországra
   - Forrás: KSH (Központi Statisztikai Hivatal)
   - Formátum: `{ year: number, inflationRate: number }[]`

2. **Kamatlábak** (`HOLDING_TYPE_INTEREST_RATES`)
   - Konzervatív kamatláb becslések megtakarítási típusokra
   - Formátum: objektum, ahol a kulcs a megtakarítás típusa, az érték az éves százalék

3. **Összehasonlítási árak** (`HISTORICAL_PRICES`)
   - Big Mac ára (HUF)
   - 60 m² belvárosi lakás ára (HUF)
   - Arany árfolyam (HUF/uncia)
   - S&P 500 index érték (USD)
   - Bitcoin ár (USD)

4. **M2 pénzmennyiség növekedés** (`HISTORICAL_M2_GROWTH`)
   - Éves M2 pénzmennyiség növekedési ráták
   - Forrás: MNB (Magyar Nemzeti Bank) - amikor elérhető

5. **Nyugdíj korhatár** (`RETIREMENT_AGE`)
   - Konstans érték (jelenleg: 65)

### Hogyan frissítsd az adatokat?

1. **Nyisd meg a fájlt**: `lib/data/economic-data.ts`

2. **Frissítsd a megfelelő adatszerkezetet**:
   - **Inflációs adatok**: Frissítsd az `HISTORICAL_INFLATION` tömböt újabb évek adataival
   - **Árak**: Frissítsd a `HISTORICAL_PRICES` objektumban a megfelelő kategóriát (bigMac, apartment60sqm, gold, sp500, bitcoin)
   - **M2 adatok**: Frissítsd az `HISTORICAL_M2_GROWTH` tömböt, ha elérhetőek újabb adatok

3. **Figyelj a formátumra**:
   - Az inflációs ráták és kamatlábak százalékban vannak (pl. `15.6` = 15.6%)
   - Az árak a megfelelő pénznemben (HUF vagy USD)
   - Minden évet numerikus kulcsként add meg (pl. `2024: 1500`)

4. **Példa - Új év inflációs adatának hozzáadása**:
   ```typescript
   export const HISTORICAL_INFLATION: Array<{ year: number; inflationRate: number }> = [
     // ... meglévő adatok ...
     { year: 2024, inflationRate: 3.7 },
     { year: 2025, inflationRate: 4.2 }, // Új adat
   ]
   ```

5. **Példa - Új év árának hozzáadása**:
   ```typescript
   export const HISTORICAL_PRICES = {
     bigMac: {
       // ... meglévő adatok ...
       2024: 1500,
       2025: 1550, // Új adat
     },
     // ... többi kategória ...
   }
   ```

6. **Vizsgáld meg a változásokat**:
   - Futtasd le a type-checket: `npm run type-check`
   - Teszteld az alkalmazást fejlesztői módban: `npm run dev`
   - Ellenőrizd, hogy a változások megfelelően jelennek meg az összehasonlítási kártyákon

### Fontos megjegyzések

- **Adatforrások**: Mindig jelöld meg az adatforrást (pl. KSH, MNB) a fájlban lévő kommentekben
- **Becsült értékek**: Ha az adatok becslések, jelöld meg a kommentekben (pl. `// Estimated`)
- **TypeScript típusok**: A fájl típusokkal védett, ezért a formátum betartása kötelező
- **Backward compatibility**: Néhány régi export továbbra is elérhető backward compatibility miatt, de az új kód a `economic-data.ts`-ből importáljon

### Adatstruktúrák részletes dokumentációja

A fájlban részletes JSDoc kommentek találhatók minden adatszerkezethez, amelyek részletesebben elmagyarázzák az egyes mezők jelentését és formátumát.
