import type { Metadata } from 'next'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'

export const metadata: Metadata = {
  title: 'Contexta — Vásárlóerő változása az infláció miatt',
  description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
  openGraph: {
    title: 'Contexta — Vásárlóerő változása az infláció miatt',
    description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
    type: 'website',
    locale: 'hu_HU',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu',
    siteName: 'Contexta',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/mi-tortenik.png`,
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
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/mi-tortenik.png`],
  },
}

export default async function Home() {
  return (
    <main id="main-content" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0FDFA 0%, #EFF6FF 25%, #FFFFFF 50%, #F3E8FF 75%, #F9FAFB 100%)',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements - more colorful */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(45, 212, 191, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(45, 212, 191, 0.06) 50%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%)',
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
