'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { Coins, TrendingUp, Info } from 'lucide-react'
import { HISTORICAL_M2_GROWTH } from '@/lib/data/economic-data'

export default function M2Section() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [hoveredChart, setHoveredChart] = useState(false)

  // Filter M2 data for 2015-2025
  const m2Data = useMemo(() => {
    return HISTORICAL_M2_GROWTH
      .filter(d => d.year >= 2015 && d.year <= 2025)
      .map(d => ({
        year: d.year,
        growth: d.m2Growth
      }))
  }, [])

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
    } else if (sectionRef.current) {
      setShowContent(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShowContent(true)
    }
  }, [prefersReducedMotion])

  // Calculate sparkline dimensions and path
  const sparklineData = useMemo(() => {
    const validData = m2Data.filter(d => d.growth !== null) as Array<{ year: number; growth: number }>
    if (validData.length === 0) return null

    const width = isMobile ? 200 : 280
    const height = isMobile ? 60 : 80
    const padding = 8

    const minGrowth = Math.min(...validData.map(d => d.growth))
    const maxGrowth = Math.max(...validData.map(d => d.growth))
    const range = maxGrowth - minGrowth || 1

    const points = validData.map((d, index) => {
      const x = padding + (index / (validData.length - 1)) * (width - padding * 2)
      const y = height - padding - ((d.growth - minGrowth) / range) * (height - padding * 2)
      return { x, y, year: d.year, growth: d.growth }
    })

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')

    return {
      width,
      height,
      pathData,
      points,
      minGrowth,
      maxGrowth
    }
  }, [m2Data, isMobile])

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#F9FAFB',
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`
      }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.xl,
          border: `1px solid ${colors.gray[200]}`,
          padding: isMobile ? spacing['2xl'] : spacing['3xl'],
          boxShadow: shadows.md,
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: prefersReducedMotion ? 'none' : `opacity ${transitions.slow}, transform ${transitions.slow}`
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? spacing['2xl'] : spacing['3xl']
          }}>
            <h2 style={{
              fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing.lg,
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
              letterSpacing: '-0.02em'
            }}>
              Mi történik, ha több pénz kerül a rendszerbe?
            </h2>
            <p style={{
              fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: spacing.xl
            }}>
              A globális pénzkínálat (M2) növekedése azt jelenti, hogy összességében több pénz van a gazdaságban a kormányok által történő pénznyomtatások hatására. Ha ez gyorsabban nő, mint a termékek és szolgáltatások mennyisége, a pénz fokozatosan veszít értékéből.
            </p>
          </div>

          {/* Visual Content */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? spacing['2xl'] : spacing['3xl'],
            marginTop: spacing['2xl']
          }}>
            {/* Icon Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.md,
              flexShrink: 0
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '80px' : '96px',
                height: isMobile ? '80px' : '96px',
                borderRadius: borderRadius.full,
                background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.6) 100%)`,
                border: `2px solid ${colors.primaryBorder}`,
                position: 'relative',
                boxShadow: shadows.md
              }}>
                <Coins size={isMobile ? 40 : 48} color={colors.primary} strokeWidth={2} />
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '32px' : '36px',
                  height: isMobile ? '32px' : '36px',
                  borderRadius: borderRadius.full,
                  backgroundColor: colors.success,
                  border: `2px solid ${colors.background.paper}`,
                  boxShadow: shadows.sm
                }}>
                  <TrendingUp size={isMobile ? 18 : 20} color="#FFFFFF" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Sparkline Chart */}
            {sparklineData && (
              <div 
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: spacing.sm,
                  flex: 1,
                  minWidth: 0,
                  maxWidth: isMobile ? '100%' : '400px'
                }}
                onMouseEnter={() => setHoveredChart(true)}
                onMouseLeave={() => setHoveredChart(false)}
              >
                <div style={{
                  position: 'relative',
                  width: `${sparklineData.width}px`,
                  height: `${sparklineData.height}px`,
                  backgroundColor: colors.gray[50],
                  borderRadius: borderRadius.md,
                  border: `1px solid ${colors.gray[200]}`,
                  padding: spacing.xs,
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : transitions.all
                }}>
                  <svg
                    width={sparklineData.width}
                    height={sparklineData.height}
                    style={{ overflow: 'visible' }}
                  >
                    {/* Grid lines */}
                    <line
                      x1={8}
                      y1={sparklineData.height / 2}
                      x2={sparklineData.width - 8}
                      y2={sparklineData.height / 2}
                      stroke={colors.gray[300]}
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      opacity={0.5}
                    />
                    {/* Sparkline path */}
                    <path
                      d={sparklineData.pathData}
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth={isMobile ? 2.5 : 3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data points */}
                    {sparklineData.points.map((point, index) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={hoveredChart ? 4 : 3}
                        fill={colors.primary}
                        stroke={colors.background.paper}
                        strokeWidth={1.5}
                        style={{
                          transition: prefersReducedMotion ? 'none' : transitions.fast,
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </svg>
                </div>
                {/* Chart Label */}
                <div style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.muted,
                  fontWeight: typography.fontWeight.medium,
                  textAlign: 'center'
                }}>
                  M2 pénzkínálat növekedés (2015-2025)
                </div>
                {/* Tooltip */}
                {hoveredChart && !isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 12px)',
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
                      whiteSpace: 'normal',
                      textAlign: 'center'
                    }}
                  >
                    Kumulatív M2 pénzkínálat változás – az infláció mellett kontextust ad
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
            )}

            {/* Stats Summary */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: spacing.md,
              flexShrink: 0,
              minWidth: isMobile ? '100%' : '200px'
            }}>
              {(() => {
                const validData = m2Data.filter(d => d.growth !== null) as Array<{ year: number; growth: number }>
                if (validData.length === 0) return null

                const avgGrowth = validData.reduce((sum, d) => sum + d.growth, 0) / validData.length
                const maxGrowth = Math.max(...validData.map(d => d.growth))
                const maxYear = validData.find(d => d.growth === maxGrowth)?.year

                return (
                  <>
                    <div style={{
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      <div style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.text.muted,
                        marginBottom: spacing.xs
                      }}>
                        Átlagos éves növekedés
                      </div>
                      <div style={{
                        fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                        fontWeight: typography.fontWeight.bold,
                        color: colors.text.primary,
                        fontVariantNumeric: 'tabular-nums'
                      }} className="tabular-nums">
                        {avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)}%
                      </div>
                    </div>
                    {maxYear && (
                      <div style={{
                        textAlign: isMobile ? 'center' : 'left'
                      }}>
                        <div style={{
                          fontSize: typography.fontSize.xs,
                          color: colors.text.muted,
                          marginBottom: spacing.xs
                        }}>
                          Legnagyobb növekedés
                        </div>
                        <div style={{
                          fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
                          fontWeight: typography.fontWeight.semibold,
                          color: colors.error,
                          fontVariantNumeric: 'tabular-nums'
                        }} className="tabular-nums">
                          {maxYear}: {maxGrowth > 0 ? '+' : ''}{maxGrowth.toFixed(1)}%
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>

          {/* Mobile Tooltip Info */}
          {isMobile && (
            <div style={{
              marginTop: spacing['2xl'],
              padding: spacing.md,
              backgroundColor: colors.infoLight,
              borderRadius: borderRadius.md,
              border: `1px solid ${colors.info}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.md
            }}>
              <Info size={20} color={colors.info} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.relaxed
              }}>
                Kumulatív M2 pénzkínálat változás – az infláció mellett kontextust ad
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
