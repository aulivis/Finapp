import type { Metadata } from 'next'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'

export const metadata: Metadata = {
  title: 'Contexta — Vásárlóerő változása az infláció miatt',
  description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
  openGraph: {
    title: 'Contexta — Vásárlóerő változása az infláció miatt',
    description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
  },
  twitter: {
    title: 'Contexta — Vásárlóerő változása az infláció miatt',
    description: 'Nézd meg, hogyan csökkent a pénz vásárlóereje idővel — egyszerű inflációs kalkulátor és valós összehasonlítások.',
  },
}

export default async function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #F9FAFB 0%, #F3F4F6 100%)',
      padding: '0'
    }}>
      {/* Hero and Calculator sections - Client component for state management */}
      <LandingPageClient />

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
