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
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/contexta-social-share.jpg`,
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
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/contexta-social-share.jpg`],
  },
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
