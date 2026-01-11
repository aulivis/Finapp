'use client'

import React, { useMemo, useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { UtensilsCrossed, Home, Coins, TrendingUp, Bitcoin } from 'lucide-react'
import {
  HISTORICAL_PRICES,
  getPriceForYear,
  calculatePercentageChange,
} from '@/lib/data/economic-data'

interface ContextualComparisonProps {
  startYear: number
  endYear: number
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
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['4xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: spacing['4xl'],
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Összehasonlítás más eszközökkel
          </h2>

          <p style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            margin: 0
          }}>
            Az alábbi összehasonlítás mutatja, hogyan változtak más eszközök árai ugyanabban az időszakban ({startYear}–{endYear}).
          </p>
        </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing.lg,
            marginBottom: spacing['3xl']
          }}>
            {comparisons.map((item, index) => {
              const Icon = item.icon
              const change = item.change
              const hasData = change !== null

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: spacing['2xl'],
                    backgroundColor: colors.background.paper,
                    borderRadius: borderRadius.lg,
                    border: `1px solid ${colors.gray[200]}`,
                    transition: prefersReducedMotion ? 'none' : transitions.all,
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = shadows.lg
                      e.currentTarget.style.borderColor = colors.primaryBorder
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
                    width: '64px',
                    height: '64px',
                    borderRadius: borderRadius.full,
                    background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.6) 100%)`,
                    color: colors.primary,
                    flexShrink: 0,
                    marginBottom: spacing.lg,
                    border: `1px solid ${colors.primaryBorder}`
                  }}>
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                    <div style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.muted,
                      marginBottom: spacing.md,
                      fontWeight: typography.fontWeight.medium
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: typography.fontSize['3xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: hasData
                        ? colors.text.primary
                        : colors.text.muted,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.2
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
            padding: spacing.xl,
            backgroundColor: colors.gray[50],
            borderRadius: borderRadius.lg,
            border: `1px solid ${colors.gray[200]}`,
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            lineHeight: typography.lineHeight.relaxed,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <p style={{ margin: '0' }}>
              <strong style={{ color: colors.text.secondary }}>Fontos:</strong> Ez az összehasonlítás{' '}
              <strong>csak történelmi adatokat</strong> mutat be, és <strong>nem minősül pénzügyi tanácsnak vagy ajánlásnak</strong>.
              A múltbeli teljesítmény nem garantálja a jövőbeli eredményeket.
            </p>
          </div>
      </div>
    </section>
  )
}
