'use client'

import React, { useMemo, useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions } from '@/lib/design-system'
import Card from '@/components/ui/Card'
import { UtensilsCrossed, Home, Coins, TrendingUp, Bitcoin } from 'lucide-react'

interface ContextualComparisonProps {
  startYear: number
  endYear: number
}

// Historical price data estimates for Hungary (HUF)
// These are approximate values based on historical trends
const HISTORICAL_PRICES = {
  bigMac: {
    2015: 850,
    2016: 870,
    2017: 890,
    2018: 920,
    2019: 950,
    2020: 980,
    2021: 1050,
    2022: 1200,
    2023: 1450,
    2024: 1500,
    2025: 1550,
  },
  apartment60sqm: {
    2015: 25000000, // 25M HUF
    2016: 26000000,
    2017: 28000000,
    2018: 32000000,
    2019: 36000000,
    2020: 38000000,
    2021: 42000000,
    2022: 50000000,
    2023: 58000000,
    2024: 62000000,
    2025: 65000000,
  },
  gold: {
    2015: 125000, // per ounce in HUF (approximate)
    2016: 135000,
    2017: 140000,
    2018: 145000,
    2019: 155000,
    2020: 180000,
    2021: 195000,
    2022: 220000,
    2023: 250000,
    2024: 260000,
    2025: 270000,
  },
  sp500: {
    2015: 2044, // USD index value
    2016: 2239,
    2017: 2674,
    2018: 2507,
    2019: 3231,
    2020: 3756,
    2021: 4766,
    2022: 3839,
    2023: 4769,
    2024: 5473,
    2025: 5800, // Estimated
  },
  bitcoin: {
    2015: 430, // USD
    2016: 960,
    2017: 13800,
    2018: 3800,
    2019: 7200,
    2020: 29000,
    2021: 47000,
    2022: 16500,
    2023: 42000,
    2024: 63000,
    2025: 75000, // Estimated
  },
}

function getPriceForYear(priceData: Record<number, number>, year: number): number | null {
  // Get the closest available year
  const availableYears = Object.keys(priceData).map(Number).sort((a, b) => a - b)
  const closestYear = availableYears.reduce((prev, curr) => {
    return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  })
  
  if (Math.abs(closestYear - year) <= 1) {
    return priceData[closestYear]
  }
  return null
}

function calculatePercentageChange(startPrice: number | null, endPrice: number | null): number | null {
  if (!startPrice || !endPrice || startPrice === 0) {
    return null
  }
  return ((endPrice - startPrice) / startPrice) * 100
}

export default function ContextualComparison({ startYear, endYear }: ContextualComparisonProps) {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Add fade-in animation on mount
  useEffect(() => {
    if (sectionRef.current && !prefersReducedMotion) {
      sectionRef.current.style.opacity = '0'
      sectionRef.current.style.transform = 'translateY(20px)'
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = `opacity ${transitions.slow}, transform ${transitions.slow}`
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  const comparisons = useMemo(() => {
    const startBigMac = getPriceForYear(HISTORICAL_PRICES.bigMac, startYear)
    const endBigMac = getPriceForYear(HISTORICAL_PRICES.bigMac, endYear)
    const bigMacChange = calculatePercentageChange(startBigMac, endBigMac)

    const startApartment = getPriceForYear(HISTORICAL_PRICES.apartment60sqm, startYear)
    const endApartment = getPriceForYear(HISTORICAL_PRICES.apartment60sqm, endYear)
    const apartmentChange = calculatePercentageChange(startApartment, endApartment)

    const startGold = getPriceForYear(HISTORICAL_PRICES.gold, startYear)
    const endGold = getPriceForYear(HISTORICAL_PRICES.gold, endYear)
    const goldChange = calculatePercentageChange(startGold, endGold)

    const startSP500 = getPriceForYear(HISTORICAL_PRICES.sp500, startYear)
    const endSP500 = getPriceForYear(HISTORICAL_PRICES.sp500, endYear)
    const sp500Change = calculatePercentageChange(startSP500, endSP500)

    const startBitcoin = getPriceForYear(HISTORICAL_PRICES.bitcoin, startYear)
    const endBitcoin = getPriceForYear(HISTORICAL_PRICES.bitcoin, endYear)
    const bitcoinChange = calculatePercentageChange(startBitcoin, endBitcoin)

    return [
      {
        icon: UtensilsCrossed,
        label: 'Big Mac ára',
        change: bigMacChange,
      },
      {
        icon: Home,
        label: '60 m² belvárosi lakás ára',
        change: apartmentChange,
      },
      {
        icon: Coins,
        label: 'Arany árfolyama',
        change: goldChange,
      },
      {
        icon: TrendingUp,
        label: 'S&P 500 index',
        change: sp500Change,
      },
      {
        icon: Bitcoin,
        label: 'Bitcoin ára',
        change: bitcoinChange,
      },
    ]
  }, [startYear, endYear])

  const formatPercentage = (value: number | null): string => {
    if (value === null) return 'N/A'
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: colors.background.paper,
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['4xl']} 0`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        <Card>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            Összehasonlítás más eszközökkel
          </h2>

          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            marginBottom: spacing['2xl'],
            lineHeight: typography.lineHeight.relaxed
          }}>
            Az alábbi összehasonlítás mutatja, hogyan változtak más eszközök árai ugyanabban az időszakban ({startYear}–{endYear}).
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: spacing.lg,
            marginBottom: spacing['2xl']
          }}>
            {comparisons.map((item, index) => {
              const Icon = item.icon
              const hasData = item.change !== null
              const isPositive = hasData && item.change > 0
              const isNegative = hasData && item.change < 0

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.lg,
                    padding: spacing.lg,
                    backgroundColor: colors.background.subtle,
                    borderRadius: borderRadius.md,
                    border: `1px solid ${colors.gray[200]}`,
                    transition: prefersReducedMotion ? 'none' : transitions.all,
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = shadows.md
                      e.currentTarget.style.borderColor = colors.gray[300]
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = colors.gray[200]
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.primaryLight,
                    color: colors.primary,
                    flexShrink: 0
                  }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.muted,
                      marginBottom: spacing.xs,
                      fontWeight: typography.fontWeight.normal
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.semibold,
                      color: hasData
                        ? isPositive
                          ? colors.text.primary // Neutral color - positive doesn't mean "good" vs inflation
                          : isNegative
                          ? colors.text.primary // Neutral color - negative doesn't mean "bad" vs inflation
                          : colors.text.primary
                        : colors.text.muted,
                      fontVariantNumeric: 'tabular-nums'
                    }} className="tabular-nums">
                      {formatPercentage(item.change)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: spacing.lg,
            backgroundColor: colors.background.subtle,
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.gray[200]}`,
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            lineHeight: typography.lineHeight.relaxed
          }}>
            <p style={{ margin: '0' }}>
              <strong style={{ color: colors.text.secondary }}>Fontos:</strong> Ez az összehasonlítás{' '}
              <strong>csak történelmi adatokat</strong> mutat be, és <strong>nem minősül pénzügyi tanácsnak vagy ajánlásnak</strong>.
              A múltbeli teljesítmény nem garantálja a jövőbeli eredményeket.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
