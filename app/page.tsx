import type { Metadata } from 'next'
import { headers } from 'next/headers'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import { calculatePurchasingPower } from '@/lib/data/inflation'

// Use www subdomain to match Facebook's redirect chain and avoid redirects
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.contexta.hu'

// Force dynamic rendering to ensure searchParams are available in generateMetadata
// Note: This disables static generation, which is expected since we need dynamic metadata based on URL params
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  let amountParam = params.amount
  let startYearParam = params.startYear
  let endYearParam = params.endYear

  // Fallback: If query params are missing (due to Vercel redirects), try to read from original URL header
  // This happens when Vercel's infrastructure redirects strip query parameters before Next.js processes them
  if (!amountParam || !startYearParam || !endYearParam) {
    try {
      const headersList = headers()
      const originalUrl = headersList.get('x-original-url')
      const originalQuery = headersList.get('x-original-query')
      
      if (originalUrl || originalQuery) {
        const queryString = originalQuery || (originalUrl ? new URL(originalUrl).search : '')
        if (queryString) {
          const urlParams = new URLSearchParams(queryString)
          amountParam = amountParam || urlParams.get('amount') || undefined
          startYearParam = startYearParam || urlParams.get('startYear') || undefined
          endYearParam = endYearParam || urlParams.get('endYear') || undefined
        }
      }
    } catch (error) {
      // Headers might not be available in all contexts, fall through to use searchParams
      console.error('Error reading original URL from headers:', error)
    }
  }

  // Debug logging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('generateMetadata called with:', { amountParam, startYearParam, endYearParam })
  }

  // Note: Middleware handles canonical domain redirects (non-www to www) while preserving query parameters

  // If we have all required params, generate dynamic metadata
  if (amountParam && startYearParam && endYearParam) {
    try {
      const amount = parseFloat(String(amountParam))
      const startYear = parseInt(String(startYearParam))
      const endYear = parseInt(String(endYearParam))

      // Validate inputs
      if (isNaN(amount) || isNaN(startYear) || isNaN(endYear) || amount <= 0) {
        throw new Error('Invalid parameters')
      }

      // Calculate purchasing power loss
      const dataPoints = calculatePurchasingPower(amount, startYear, endYear)
      
      if (dataPoints.length === 0) {
        throw new Error('No data points calculated')
      }

      const finalNominal = dataPoints[dataPoints.length - 1]?.nominal || amount
      const finalReal = dataPoints[dataPoints.length - 1]?.real || amount
      const loss = finalNominal - finalReal
      const lossPercentage = (loss / finalNominal) * 100

      // Format currency
      const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('hu-HU', {
          style: 'currency',
          currency: 'HUF',
          maximumFractionDigits: 0,
        }).format(value)
      }

      const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`
      }

      const dynamicTitle = `A ${formatCurrency(amount)} vásárlóereje ${formatPercentage(lossPercentage)}-kal csökkent ${startYear} és ${endYear} között`
      const dynamicDescription = `Számítsd ki a saját adataidat is! A ${formatCurrency(amount)} valódi vásárlóereje ma ${formatCurrency(finalReal)}.`
      
      // Version parameter for cache-busting when we update the image design
      // Increment this (e.g., v2, v3) when you change the OG image design
      // Same parameters will generate same image, but version change forces Facebook to re-fetch
      // IMPORTANT: When incrementing version, use Facebook Sharing Debugger to clear cache for existing shares
      const imageVersion = 'v3'
      
      // Use absolute URL for OG image with version for cache-busting
      // Ensure URLs are properly encoded and explicitly use https://www.contexta.hu
      // This ensures Facebook sees the correct URL even if redirects happen
      const baseUrl = appUrl.startsWith('http') ? appUrl : `https://${appUrl}`
      // Ensure we always use www and https
      const canonicalBaseUrl = baseUrl.replace(/^https?:\/\/(www\.)?/, 'https://www.')
      const ogImageUrl = `${canonicalBaseUrl}/og?amount=${encodeURIComponent(amount)}&startYear=${encodeURIComponent(startYear)}&endYear=${encodeURIComponent(endYear)}&v=${imageVersion}`
      const shareUrl = `${canonicalBaseUrl}/?amount=${encodeURIComponent(amount)}&startYear=${encodeURIComponent(startYear)}&endYear=${encodeURIComponent(endYear)}`

      // Debug: Log the generated metadata URLs
      if (process.env.NODE_ENV === 'development') {
        console.log('Generated OG Image URL:', ogImageUrl)
        console.log('Generated Share URL:', shareUrl)
      }

      // Return complete metadata that fully overrides layout metadata
      // IMPORTANT: All URLs must be absolute to override metadataBase correctly
      return {
        title: `${dynamicTitle} | Contexta`,
        description: dynamicDescription,
        // Override metadataBase to ensure absolute URLs resolve correctly
        metadataBase: new URL(canonicalBaseUrl),
        // Override canonical URL to include query parameters
        alternates: {
          canonical: shareUrl,
        },
        openGraph: {
          title: dynamicTitle,
          description: dynamicDescription,
          type: 'website',
          locale: 'hu_HU',
          // Use absolute URL with query parameters - must be absolute to override metadataBase
          url: shareUrl,
          siteName: 'Contexta',
          // Explicitly set images array to override layout defaults - must be absolute URLs
          images: [
            {
              url: ogImageUrl, // Already absolute
              width: 1200,
              height: 630,
              alt: `Vásárlóerő veszteség: ${formatPercentage(lossPercentage)}`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: dynamicTitle,
          description: dynamicDescription,
          images: [ogImageUrl], // Already absolute
        },
      }
    } catch (error) {
      // Fall through to default metadata if calculation fails
      console.error('Error generating dynamic metadata:', error)
    }
  }

  // Default metadata (fallback)
  return {
    title: 'Contexta — Vásárlóerő változása az infláció miatt',
    description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
    openGraph: {
      title: 'Contexta — Vásárlóerő változása az infláció miatt',
      description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
      type: 'website',
      locale: 'hu_HU',
      url: appUrl,
      siteName: 'Contexta',
      images: [
        {
          url: `${appUrl}/contexta-social-share.jpg`,
          width: 1200,
          height: 630,
          alt: 'Contexta - Inflációs kalkulátor',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contexta — Vásárlóerő változása az infláció miatt',
      description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
      images: [`${appUrl}/contexta-social-share.jpg`],
    },
  }
}

export default async function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAFDFC 0%, #FAFBFF 25%, #FFFFFF 50%, #FCFAFF 75%, #FAFAFA 100%)',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements - more pale */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(45, 212, 191, 0.04) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(45, 212, 191, 0.02) 50%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 60%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      {/* Hero and Calculator sections - Client component for state management */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <LandingPageClient />
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
