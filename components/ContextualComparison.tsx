'use client'

import React, { useMemo, useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { Hamburger, Home, Cuboid, TrendingUp, Bitcoin, Info } from 'lucide-react'
import {
  HISTORICAL_PRICES,
  getPriceForYear,
  calculatePercentageChange,
} from '@/lib/data/economic-data'

interface ContextualComparisonProps {
  startYear: number
  endYear: number
  userAmount?: number
}

export default function ContextualComparison({ startYear, endYear, userAmount = 1000000 }: ContextualComparisonProps) {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
        icon: Hamburger,
        label: 'Big Mac ára',
        change: bigMacChange,
        explanation: 'A Big Mac Index egy gazdasági mutató, amely a hamburger árát használja az infláció mérésére. Ez az összehasonlítás mutatja, hogyan változott a Big Mac ára ugyanabban az időszakban, amely segít megérteni az általános árbeváltozásokat.',
      },
      {
        icon: Home,
        label: 'Ingatlan értéke',
        change: apartmentChange,
        explanation: 'Ez az összehasonlítás egy 60 négyzetméteres Budapest belvárosi lakás átlagos árának változását mutatja. A lakásárak gyakran más ütemben változnak, mint az általános infláció, és fontos mutatót adnak a reálvagyon változásáról.',
      },
      {
        icon: Cuboid,
        label: 'Arany árfolyama',
        change: goldChange,
        explanation: 'Az arany hagyományosan értékmegőrző eszköznek számít. Ez az összehasonlítás mutatja, hogyan változott az arany árfolyama, amely segít megérteni, hogyan teljesítettek volna más eszközök ugyanabban az időszakban.',
      },
      {
        icon: TrendingUp,
        label: 'S&P 500 index',
        change: sp500Change,
        explanation: 'Az S&P 500 az Amerikai tőzsdén jegyzett 500 legnagyobb vállalat részvényeinek indexe, amely a részvénypiac teljesítményét méri. Ez az összehasonlítás mutatja, hogyan teljesítettek volna ezek a részvények ugyanabban az időszakban.',
      },
      {
        icon: Bitcoin,
        label: 'Bitcoin ára',
        change: bitcoinChange,
        explanation: 'A Bitcoin egy digitális kriptovaluta, amely gyakran jelentős árfolyamingadozásokkal jár. Ez az összehasonlítás mutatja, hogyan változott a Bitcoin ára, bár a kriptovaluták rendkívül volatilisek, és nagy kockázattal járnak.',
      },
    ]
  }, [startYear, endYear])

  const formatPercentage = (value: number | null): string => {
    if (value === null) return 'N/A'
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const calculateAssetValue = (percentageChange: number | null): number | null => {
    if (percentageChange === null) return null
    return userAmount * (1 + percentageChange / 100)
  }

  // Get pale gradient background for each card based on asset type
  const getCardBackground = (label: string): string => {
    const backgrounds: { [key: string]: string } = {
      'Big Mac ára': 'linear-gradient(135deg, rgba(254, 243, 199, 0.12) 0%, rgba(255, 247, 237, 0.08) 100%)', // Pale orange/red for burger
      'Ingatlan értéke': 'linear-gradient(135deg, rgba(219, 234, 254, 0.12) 0%, rgba(239, 246, 255, 0.08) 100%)', // Pale blue for home
      'Arany árfolyama': 'linear-gradient(135deg, rgba(254, 252, 232, 0.15) 0%, rgba(255, 253, 245, 0.1) 100%)', // Pale gold/yellow for gold
      'S&P 500 index': 'linear-gradient(135deg, rgba(236, 253, 245, 0.12) 0%, rgba(240, 253, 250, 0.08) 100%)', // Pale green for stocks
      'Bitcoin ára': 'linear-gradient(135deg, rgba(255, 237, 213, 0.12) 0%, rgba(255, 247, 237, 0.08) 100%)', // Pale amber/orange for bitcoin
    }
    return backgrounds[label] || 'linear-gradient(135deg, rgba(249, 250, 251, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)'
  }

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? spacing['3xl'] : spacing['3xl'],
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

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? spacing.md : spacing.xl
          }}>
            <p style={{
              fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0
            }}>
              Ugyanabban az időszakban, amikor a pénzed vásárlóereje csökkent, ezeknek az eszközöknek az ára így változott.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.xs,
              padding: `${spacing.sm} ${spacing.lg}`,
              backgroundColor: colors.background.paper,
              borderRadius: borderRadius.full,
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              fontWeight: typography.fontWeight.semibold,
              border: `1px solid ${colors.gray[300]}`,
              boxShadow: shadows.sm
            }}>
              <span>📅</span>
              <span>{startYear} → {endYear}</span>
            </div>
          </div>
        </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? spacing['3xl'] : spacing.lg,
            marginBottom: isMobile ? spacing.xl : spacing['3xl'],
            position: 'relative'
          }}>
            {comparisons.map((item, index) => {
              const Icon = item.icon
              const change = item.change
              const hasData = change !== null
              const isExpanded = expandedIndex === index
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: `${spacing['2xl']} ${spacing.lg}`,
                    paddingTop: isMobile ? spacing['2xl'] : spacing['2xl'],
                    background: `${getCardBackground(item.label)}, ${colors.background.paper}`,
                    backgroundColor: colors.background.paper,
                    borderRadius: borderRadius.lg,
                    border: `1px solid ${colors.gray[200]}`,
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  {isMobile ? (
                    <div style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '64px',
                      borderRadius: borderRadius.full,
                      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.6) 100%)`,
                      color: colors.primary,
                      flexShrink: 0,
                      border: `1px solid ${colors.primaryBorder}`,
                      boxShadow: shadows.md
                    }}>
                      <Icon size={42} strokeWidth={2} />
                    </div>
                  ) : (
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
                      <Icon size={34} strokeWidth={2} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0, width: '100%', position: 'relative' }}>
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.md
                    }}>
                      <div style={{
                        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.base,
                        color: colors.text.muted,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        {item.label}
                      </div>
                      {/* Info Icon */}
                      <div style={{ 
                        position: 'absolute',
                        right: 0,
                        display: 'inline-flex'
                      }}>
                        <button
                          onClick={() => {
                            if (isMobile) {
                              setExpandedIndex(isExpanded ? null : index)
                            }
                          }}
                          onMouseEnter={() => {
                            if (!isMobile) {
                              setHoveredIndex(index)
                            }
                          }}
                          onMouseLeave={() => {
                            if (!isMobile) {
                              setHoveredIndex(null)
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: isMobile ? '44px' : '20px',
                            height: isMobile ? '44px' : '20px',
                            padding: 0,
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: colors.text.muted,
                            transition: prefersReducedMotion ? 'none' : transitions.all,
                            flexShrink: 0,
                            minWidth: isMobile ? '44px' : '20px',
                            minHeight: isMobile ? '44px' : '20px'
                          }}
                          aria-label="További információk"
                        >
                          <Info 
                            size={isMobile ? 20 : 16}
                          />
                        </button>
                        {/* Desktop Tooltip */}
                        {!isMobile && isHovered && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 'calc(100% + 8px)',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              padding: spacing.md,
                              backgroundColor: colors.gray[900],
                              color: colors.background.paper,
                              borderRadius: borderRadius.md,
                              fontSize: typography.fontSize.sm,
                              lineHeight: typography.lineHeight.normal,
                              maxWidth: '280px',
                              width: 'max-content',
                              zIndex: 10000,
                              boxShadow: shadows.xl,
                              pointerEvents: 'none',
                              whiteSpace: 'normal'
                            }}
                          >
                            {item.explanation}
                            {/* Tooltip Arrow */}
                            <div
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: `6px solid ${colors.gray[900]}`
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{
                      fontSize: isMobile ? typography.fontSize['4xl'] : typography.fontSize['4xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: hasData
                        ? colors.text.primary
                        : colors.text.muted,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.2,
                      marginBottom: isMobile ? spacing.lg : spacing.md
                    }} className="tabular-nums">
                      {formatPercentage(item.change)}
                    </div>
                    {hasData && calculateAssetValue(item.change) !== null && (
                      <div style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.text.secondary,
                        lineHeight: typography.lineHeight.normal,
                        marginTop: spacing.xs
                      }}>
                        Az általad megadott összeg ma <strong style={{ fontWeight: typography.fontWeight.semibold }}>{formatCurrency(calculateAssetValue(item.change)!)}</strong>-nak felel meg.
                      </div>
                    )}
                    {/* Mobile Expanded Explanation */}
                    {isMobile && isExpanded && (
                      <div
                        style={{
                          marginTop: spacing.lg,
                          padding: spacing.md,
                          backgroundColor: colors.gray[50],
                          borderRadius: borderRadius.md,
                          border: `1px solid ${colors.gray[200]}`,
                          fontSize: typography.fontSize.sm,
                          lineHeight: typography.lineHeight.relaxed,
                          color: colors.text.secondary,
                          textAlign: 'justify'
                        }}
                      >
                        {item.explanation}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Disclaimer */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.md,
            padding: spacing.xl,
            backgroundColor: colors.infoLight,
            borderRadius: borderRadius.lg,
            border: `1px solid ${colors.info}`,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              flexShrink: 0,
              marginTop: '2px'
            }}>
              <Info size={20} color={colors.info} />
            </div>
            <div style={{
              flex: 1,
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed
            }}>
              <p style={{ margin: '0' }}>
                Ez az összehasonlítás{' '}
                <strong>csak történelmi adatokat</strong> mutat be, és <strong>nem minősül pénzügyi tanácsnak vagy ajánlásnak</strong>.
                A múltbeli teljesítmény nem garantálja a jövőbeli eredményeket.
              </p>
            </div>
          </div>
      </div>
    </section>
  )
}
