'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import DemoCalculator from '@/components/DemoCalculator'
import HeroVisualAnchor from '@/components/HeroVisualAnchor'
import ContextaWordmark from '@/components/ContextaWordmark'
import { MacroData } from '@/lib/types/database'

interface LandingPageClientProps {
  macroData?: MacroData[]
}

export default function LandingPageClient({ macroData = [] }: LandingPageClientProps) {
  const [calculatorAmount, setCalculatorAmount] = useState(1000000)
  const [calculatorStartYear, setCalculatorStartYear] = useState(2015)
  const [calculatorEndYear, setCalculatorEndYear] = useState(2025)

  return (
    <>
      {/* Hero Section - Two columns */}
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
          <div className="hero-grid" style={{
            alignItems: 'center'
          }}>
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

            {/* Right: Visual anchor - Reactive card */}
            <div>
              <HeroVisualAnchor 
                initialAmount={calculatorAmount}
                startYear={calculatorStartYear}
                endYear={calculatorEndYear}
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
        <DemoCalculator 
          macroData={macroData}
          onValuesChange={(amount, startYear, endYear) => {
            setCalculatorAmount(amount)
            setCalculatorStartYear(startYear)
            setCalculatorEndYear(endYear)
          }}
        />
      </div>
    </>
  )
}