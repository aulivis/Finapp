import React from 'react'
import DemoCalculator from '@/components/DemoCalculator'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import ContextaWordmark from '@/components/ContextaWordmark'
import HeroVisualAnchor from '@/components/HeroVisualAnchor'
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
      {/* Section 1 - Above the Fold Hero */}
      <header style={{
        backgroundColor: '#F9FAFB',
        padding: '96px 0 112px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Wordmark */}
          <div style={{
            marginBottom: '64px'
          }}>
            <ContextaWordmark />
          </div>

          {/* Two-column hero layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center'
          }} className="hero-grid">
            {/* Left: Text content */}
            <div>
              {/* H1 */}
              <h1 className="hero-h1" style={{
                fontSize: '36px',
                fontWeight: '600',
                margin: '0 0 24px 0',
                color: '#111827',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}>
                Mennyit ér valójában a pénzed idővel?
              </h1>

              {/* Subheadline */}
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#1F2937',
                margin: '0 0 48px 0',
                fontWeight: '400'
              }}>
                Az infláció önmagában nem ad teljes képet.<br />
                Nézd meg, hogyan változott a vásárlóerőd az elmúlt években.
              </p>

              {/* Primary CTA */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <Link href="/fizetes" style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  backgroundColor: '#2DD4BF',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'background-color 0.15s ease',
                  width: 'fit-content'
                }}>
                  Személyre szabott számítás
                </Link>
                <p style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  margin: '0',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
                  Nincs regisztráció. Nincs előrejelzés. Csak múltbeli adatok.
                </p>
              </div>
            </div>

            {/* Right: Visual anchor */}
            <div>
              <HeroVisualAnchor 
                initialAmount={1000000}
                startYear={2015}
                endYear={2025}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Calculator - Directly below hero */}
      <div style={{
        backgroundColor: '#F1F5F9',
        padding: '64px 0'
      }}>
        <DemoCalculator macroData={macroData} />
      </div>

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
