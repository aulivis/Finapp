'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { HISTORICAL_M2_GROWTH, HISTORICAL_INFLATION } from '@/lib/data/economic-data'
import { TrendingUp, BarChart3, TrendingDown } from 'lucide-react'

interface M2SectionProps {
  startYear?: number
  endYear?: number
}

export default function M2Section({ startYear = 2015, endYear = 2025 }: M2SectionProps) {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [hoveredChart, setHoveredChart] = useState(false)

  // Filter M2 data based on year range
  const m2Data = useMemo(() => {
    return HISTORICAL_M2_GROWTH
      .filter(d => d.year >= startYear && d.year <= endYear)
      .map(d => ({
        year: d.year,
        growth: d.m2Growth
      }))
  }, [startYear, endYear])

  // Calculate stats for the selected year range
  const stats = useMemo(() => {
    const validM2Data = m2Data.filter(d => d.growth !== null) as Array<{ year: number; growth: number }>
    
    if (validM2Data.length === 0) {
      return {
        avgM2Growth: null,
        totalM2Growth: null,
        totalInflation: null
      }
    }

    // Average M2 growth
    const avgM2Growth = validM2Data.reduce((sum, d) => sum + d.growth, 0) / validM2Data.length

    // Total M2 growth (cumulative) for the range
    let cumulativeM2Growth = 1
    validM2Data.forEach(d => {
      cumulativeM2Growth *= (1 + d.growth / 100)
    })
    const totalM2Growth = (cumulativeM2Growth - 1) * 100 // Convert to percentage

    // Total inflation (cumulative) for the range
    const inflationData = HISTORICAL_INFLATION.filter(d => d.year >= startYear && d.year <= endYear)
    let cumulativeInflation = 1
    inflationData.forEach(d => {
      cumulativeInflation *= (1 + d.inflationRate / 100)
    })
    const totalInflation = (cumulativeInflation - 1) * 100 // Convert to percentage

    return {
      avgM2Growth,
      totalM2Growth,
      totalInflation
    }
  }, [m2Data, startYear, endYear])

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

    // Use a base width for calculations, but make it responsive via CSS
    const baseWidth = 800
    const height = isMobile ? 140 : 160
    const padding = 20

    const minGrowth = Math.min(...validData.map(d => d.growth))
    const maxGrowth = Math.max(...validData.map(d => d.growth))
    const range = maxGrowth - minGrowth || 1

    const points = validData.map((d, index) => {
      const x = padding + (index / (validData.length - 1)) * (baseWidth - padding * 2)
      const y = height - padding - ((d.growth - minGrowth) / range) * (height - padding * 2)
      return { x, y, year: d.year, growth: d.growth }
    })

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')

    return {
      width: baseWidth,
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
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative',
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
        transition: prefersReducedMotion ? 'none' : `opacity ${transitions.slow}, transform ${transitions.slow}`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing['2xl'],
            marginTop: spacing['2xl']
          }}>
            {/* Sparkline Chart */}
            {sparklineData && (
              <div 
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: spacing.sm,
                  width: '100%',
                  maxWidth: isMobile ? '100%' : '800px'
                }}
                onMouseEnter={() => setHoveredChart(true)}
                onMouseLeave={() => setHoveredChart(false)}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: `${sparklineData.height}px`,
                  backgroundColor: colors.gray[50],
                  borderRadius: borderRadius.md,
                  border: `1px solid ${colors.gray[200]}`,
                  padding: spacing.md,
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : transitions.all
                }}>
                  <svg
                    width="100%"
                    height={sparklineData.height}
                    viewBox={`0 0 ${sparklineData.width} ${sparklineData.height}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ overflow: 'visible' }}
                  >
                    {/* Grid lines */}
                    <line
                      x1={20}
                      y1={sparklineData.height / 2}
                      x2={sparklineData.width - 20}
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
                  M2 pénzkínálat növekedés ({startYear}-{endYear})
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

            {/* Stat Cards */}
            {stats.avgM2Growth !== null && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? spacing['3xl'] : spacing.xl,
                width: '100%',
                maxWidth: isMobile ? '100%' : '900px',
                marginTop: spacing['2xl']
              }}>
                {/* Average M2 Growth Card */}
                <div style={{
                  padding: isMobile ? `${spacing['2xl']} ${spacing.lg}` : spacing['2xl'],
                  paddingTop: isMobile ? spacing['2xl'] : spacing['2xl'],
                  background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.4) 100%)`,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.gray[200]}`,
                  boxShadow: shadows.sm,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                  position: 'relative',
                  overflow: 'visible',
                  transition: prefersReducedMotion ? 'none' : transitions.all
                }}>
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
                      <TrendingUp size={42} strokeWidth={2} />
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                      marginBottom: spacing.md,
                      width: '100%'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56px',
                        height: '56px',
                        borderRadius: borderRadius.full,
                        backgroundColor: colors.primary,
                        color: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        <TrendingUp size={28} strokeWidth={2.5} />
                      </div>
                      <div style={{
                        fontSize: typography.fontSize.sm,
                        color: colors.text.muted,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        Átlagos M2 növekedés
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0, width: '100%', position: 'relative' }}>
                    {isMobile && (
                      <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: spacing.md
                      }}>
                        <div style={{
                          fontSize: typography.fontSize.lg,
                          color: colors.text.muted,
                          fontWeight: typography.fontWeight.medium
                        }}>
                          Átlagos M2 növekedés
                        </div>
                      </div>
                    )}
                    <div style={{
                      fontSize: typography.fontSize['4xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.2,
                      marginBottom: isMobile ? spacing.lg : spacing.md,
                      textAlign: isMobile ? 'center' : 'left'
                    }} className="tabular-nums">
                      {stats.avgM2Growth > 0 ? '+' : ''}{stats.avgM2Growth.toFixed(1)}%
                    </div>
                    <div style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.normal,
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      {startYear}-{endYear} időszak átlaga
                    </div>
                  </div>
                </div>

                {/* Total M2 Growth Card */}
                <div style={{
                  padding: isMobile ? `${spacing['2xl']} ${spacing.lg}` : spacing['2xl'],
                  paddingTop: isMobile ? spacing['2xl'] : spacing['2xl'],
                  background: `linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(255, 247, 237, 0.2) 100%)`,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.gray[200]}`,
                  boxShadow: shadows.sm,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                  position: 'relative',
                  overflow: 'visible',
                  transition: prefersReducedMotion ? 'none' : transitions.all
                }}>
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
                      background: `linear-gradient(135deg, rgba(254, 243, 199, 0.6) 0%, rgba(255, 247, 237, 0.4) 100%)`,
                      color: colors.warning,
                      flexShrink: 0,
                      border: `1px solid ${colors.warningLight}`,
                      boxShadow: shadows.md
                    }}>
                      <BarChart3 size={42} strokeWidth={2} />
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                      marginBottom: spacing.md,
                      width: '100%'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56px',
                        height: '56px',
                        borderRadius: borderRadius.full,
                        backgroundColor: colors.warning,
                        color: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        <BarChart3 size={28} strokeWidth={2.5} />
                      </div>
                      <div style={{
                        fontSize: typography.fontSize.sm,
                        color: colors.text.muted,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        Összes M2 növekedés
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0, width: '100%', position: 'relative' }}>
                    {isMobile && (
                      <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: spacing.md
                      }}>
                        <div style={{
                          fontSize: typography.fontSize.lg,
                          color: colors.text.muted,
                          fontWeight: typography.fontWeight.medium
                        }}>
                          Összes M2 növekedés
                        </div>
                      </div>
                    )}
                    <div style={{
                      fontSize: typography.fontSize['4xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.2,
                      marginBottom: isMobile ? spacing.lg : spacing.md,
                      textAlign: isMobile ? 'center' : 'left'
                    }} className="tabular-nums">
                      {stats.totalM2Growth !== null && stats.totalM2Growth > 0 ? '+' : ''}{stats.totalM2Growth !== null ? stats.totalM2Growth.toFixed(1) : 'N/A'}%
                    </div>
                    <div style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.normal,
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      {startYear}-{endYear} kumulatív
                    </div>
                  </div>
                </div>

                {/* Total Inflation Card */}
                <div style={{
                  padding: isMobile ? `${spacing['2xl']} ${spacing.lg}` : spacing['2xl'],
                  paddingTop: isMobile ? spacing['2xl'] : spacing['2xl'],
                  background: `linear-gradient(135deg, ${colors.errorLight} 0%, rgba(254, 226, 226, 0.4) 100%)`,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.gray[200]}`,
                  boxShadow: shadows.sm,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                  position: 'relative',
                  overflow: 'visible',
                  transition: prefersReducedMotion ? 'none' : transitions.all
                }}>
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
                      background: `linear-gradient(135deg, ${colors.errorLight} 0%, rgba(254, 226, 226, 0.6) 100%)`,
                      color: colors.error,
                      flexShrink: 0,
                      border: `1px solid ${colors.error}`,
                      boxShadow: shadows.md
                    }}>
                      <TrendingDown size={42} strokeWidth={2} />
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                      marginBottom: spacing.md,
                      width: '100%'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56px',
                        height: '56px',
                        borderRadius: borderRadius.full,
                        backgroundColor: colors.error,
                        color: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        <TrendingDown size={28} strokeWidth={2.5} />
                      </div>
                      <div style={{
                        fontSize: typography.fontSize.sm,
                        color: colors.text.muted,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        Összes infláció
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0, width: '100%', position: 'relative' }}>
                    {isMobile && (
                      <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: spacing.md
                      }}>
                        <div style={{
                          fontSize: typography.fontSize.lg,
                          color: colors.text.muted,
                          fontWeight: typography.fontWeight.medium
                        }}>
                          Összes infláció
                        </div>
                      </div>
                    )}
                    <div style={{
                      fontSize: typography.fontSize['4xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: colors.error,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.2,
                      marginBottom: isMobile ? spacing.lg : spacing.md,
                      textAlign: isMobile ? 'center' : 'left'
                    }} className="tabular-nums">
                      {stats.totalInflation !== null ? `+${stats.totalInflation.toFixed(1)}%` : 'N/A'}
                    </div>
                    <div style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.normal,
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      {startYear}-{endYear} kumulatív
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
      </div>
    </section>
  )
}
