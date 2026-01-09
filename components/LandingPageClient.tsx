'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import DemoCalculator from '@/components/DemoCalculator'
import HeroVisualAnchor from '@/components/HeroVisualAnchor'
import ContextaWordmark from '@/components/ContextaWordmark'
import { MacroData } from '@/lib/types/database'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'

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
        backgroundColor: colors.background.default,
        padding: isMobile ? `${spacing['3xl']} 0 ${spacing['4xl']} 0` : `${spacing['5xl']} 0 ${spacing['4xl']} 0`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
        }}>
          {/* Wordmark */}
          <div style={{
            marginBottom: isMobile ? spacing['2xl'] : spacing['4xl']
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
                fontSize: isMobile ? typography.fontSize['5xl'] : typography.fontSize['6xl'],
                fontWeight: typography.fontWeight.semibold,
                margin: `0 0 ${spacing.xl} 0`,
                color: colors.text.primary,
                lineHeight: typography.lineHeight.tight,
                letterSpacing: '-0.02em'
              }}>
                Mennyit ér valójában a pénzed?
              </h1>

              {/* Subheadline */}
              <p style={{
                fontSize: typography.fontSize.xl,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.text.secondary,
                margin: `0 0 ${spacing['3xl']} 0`,
                fontWeight: typography.fontWeight.normal
              }}>
                Az infláció önmagában nem ad teljes képet.<br />
                Nézd meg, hogyan változott a vásárlóerőd az elmúlt években.
              </p>

              {/* Primary CTA */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.md,
                marginBottom: spacing.xl
              }}>
                <Link href="/fizetes">
                  <Button variant="primary" size="lg" style={{ width: 'fit-content' }}>
                    Személyre szabott számítás
                  </Button>
                </Link>
                <p style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.muted,
                  margin: '0',
                  lineHeight: typography.lineHeight.normal,
                  fontWeight: typography.fontWeight.normal
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
        backgroundColor: colors.gray[50],
        padding: isMobile ? `${spacing['2xl']} 0 ${spacing['3xl']} 0` : `${spacing['4xl']} 0`
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