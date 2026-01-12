import type { Metadata } from 'next'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import { calculatePurchasingPower } from '@/lib/data/inflation'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'

// Force dynamic rendering to ensure searchParams are available in generateMetadata
export const dynamic = 'force-dynamic'

const DEFAULT_AMOUNT = 1000000
const DEFAULT_START_YEAR = 2015
const DEFAULT_END_YEAR = 2025

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const amountParam = params.amount
  const startYearParam = params.startYear
  const endYearParam = params.endYear

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
      
      // Use absolute URL for OG image
      const ogImageUrl = `${appUrl}/og?amount=${amount}&startYear=${startYear}&endYear=${endYear}`
      const shareUrl = `${appUrl}/?amount=${amount}&startYear=${startYear}&endYear=${endYear}`

      return {
        title: `${dynamicTitle} | Contexta`,
        description: dynamicDescription,
        openGraph: {
          title: dynamicTitle,
          description: dynamicDescription,
          type: 'website',
          locale: 'hu_HU',
          url: shareUrl,
          siteName: 'Contexta',
          images: [
            {
              url: ogImageUrl,
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
          images: [ogImageUrl],
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
