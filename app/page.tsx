import React from 'react'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import Link from 'next/link'
import { getMacroData } from '@/lib/data/macro-data'

export default async function Home() {
  // Fetch M2 data for the calculator
  const macroData = await getMacroData('HU')
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: '0'
    }}>
      {/* Hero and Calculator sections - Client component for state management */}
      <LandingPageClient macroData={macroData} />

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>

        {/* Section 3 - Access Explanation */}
        <section style={{
          marginBottom: '64px',
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#111827',
            lineHeight: '1.3'
          }}>
            Személyre szabott számítások
          </h3>
          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#1F2937',
            marginBottom: '24px',
            fontWeight: '400'
          }}>
            <p style={{ marginBottom: '16px' }}>
              A fizetős hozzáférés személyre szabott számításokat tartalmaz.
            </p>
            <p style={{ marginBottom: '16px' }}>
              A hozzáférés tartalma:
            </p>
            <ul style={{
              margin: '0 0 16px 0',
              paddingLeft: '24px',
              listStyle: 'disc'
            }}>
              <li style={{ marginBottom: '8px' }}>
                Személyre szabott inflációs számítás: saját összeg és időszak alapján
              </li>
              <li style={{ marginBottom: '8px' }}>
                &quot;Semmit sem csinálok&quot; forgatókönyv: megtakarítások vásárlóerejének 
                számítása nyugdíjkorhatárig
              </li>
            </ul>
            <p style={{ margin: '0' }}>
              A hozzáférés email-cím alapján működik, jelszó nélkül. A fizetés 
              után emailben küldjük a hozzáférési linket.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/fizetes" style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#2DD4BF',
              color: '#FFFFFF',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.15s ease'
            }}>
              Hozzáférés vásárlása
            </Link>
          </div>
        </section>
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
