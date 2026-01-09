'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import DemoCalculator from '@/components/DemoCalculator'
import HeroVisualAnchor from '@/components/HeroVisualAnchor'
import ContextaWordmark from '@/components/ContextaWordmark'
import { MacroData } from '@/lib/types/database'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

interface LandingPageClientProps {
  macroData?: MacroData[]
}

const START_YEAR = 2015
const INITIAL_AMOUNT = 1000000
const INITIAL_YEARS = 11
const MAX_YEAR = 2025

export default function LandingPageClient({ macroData = [] }: LandingPageClientProps) {
  const [calculatorAmount, setCalculatorAmount] = useState(INITIAL_AMOUNT)
  const [calculatorYears, setCalculatorYears] = useState(INITIAL_YEARS)
  // When years change, keep endYear at MAX_YEAR and adjust startYear
  const calculatorEndYear = MAX_YEAR
  const calculatorStartYear = Math.max(START_YEAR, calculatorEndYear - calculatorYears + 1)
  const isMobile = useIsMobile(768)

  return (
    <>
      {/* Hero Section - Two columns */}
      <header className="hero-section" style={{
        backgroundColor: '#F9FAFB',
        padding: isMobile ? '48px 0 56px 0' : '96px 0 112px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 24px'
        }}>
          {/* Wordmark */}
          <div style={{
            marginBottom: isMobile ? '32px' : '64px'
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
                Mennyit ér valójában a pénzed?
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
                onAmountChange={setCalculatorAmount}
                onYearsChange={setCalculatorYears}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Calculator - Directly below hero */}
      <div style={{
        backgroundColor: '#F1F5F9',
        padding: isMobile ? '32px 0 40px 0' : '64px 0'
      }}>
        <DemoCalculator 
          macroData={macroData}
          initialAmount={calculatorAmount}
          initialYears={calculatorYears}
        />
      </div>
    </>
  )
}