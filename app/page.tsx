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
            <strong>Mit jelent ez a számodra</strong>?
          </h3>
          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#1F2937',
            marginBottom: '24px',
            fontWeight: '400'
          }}>
            <p style={{ marginBottom: '16px' }}>
              A fenti számítás egy általános példa.
            </p>
            <p style={{ marginBottom: '16px' }}>
              A fizetős hozzáféréssel a <strong>saját pénzedre és időtávodra</strong> számolunk.
            </p>
            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              <strong>Mit kapsz a hozzáféréssel?</strong>
            </p>
            <ul style={{
              margin: '0 0 16px 0',
              paddingLeft: '24px',
              listStyle: 'disc'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Személyre szabott inflációs számítás</strong><br />
                Saját összeggel és időszakkal, valós adatok alapján.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>&quot;Semmit sem csinálok&quot; forgatókönyv</strong><br />
                Megmutatja, hogyan alakul a megtakarításod vásárlóereje nyugdíjkorhatárig, ha nem hozol döntést.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Egyszerű, jelszómentes hozzáférés</strong><br />
                Fizetés után emailben küldjük a személyes hozzáférési linkedet.
              </li>
            </ul>
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
              👉 Személyre szabott számítás megnyitása
            </Link>
          </div>
        </section>
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
