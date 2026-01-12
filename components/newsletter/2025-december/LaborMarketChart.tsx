'use client'

import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Cell } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system'

interface LaborMarketChartProps {
  height?: number
}

/**
 * Chart showing labor market paradox: stable unemployment vs minimum wage increase
 * Features:
 * - Horizontal bar chart showing monthly unemployment rates
 * - Side-by-side comparison cards for 2025 vs 2026 minimum wage
 * - Visual worker icon with calculator
 * - Professional grid background
 */
export default function LaborMarketChart({ height = 650 }: LaborMarketChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Monthly unemployment data (2025)
  const unemploymentData = useMemo(() => [
    { month: 'Jan', rate: 4.4 },
    { month: 'Feb', rate: 4.5 },
    { month: 'Mar', rate: 4.6 },
    { month: 'Apr', rate: 4.5 },
    { month: 'Máj', rate: 4.5 },
    { month: 'Jún', rate: 4.4 },
    { month: 'Júl', rate: 4.5 },
    { month: 'Aug', rate: 4.5 },
    { month: 'Szept', rate: 4.5 },
    { month: 'Okt', rate: 4.5 },
    { month: 'Nov', rate: 4.5 },
  ], [])

  // Minimum wage data
  const minWage2025 = {
    gross: 266800,
    net: 197000,
  }
  const minWage2026 = {
    gross: 296000,
    net: 216500,
  }
  const grossIncrease = minWage2026.gross - minWage2025.gross // +29,200
  const netIncrease = minWage2026.net - minWage2025.net // +19,500

  // Custom tooltip for unemployment chart
  const UnemploymentTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload as typeof unemploymentData[0]

    return (
      <div
        role="tooltip"
        style={{
          backgroundColor: '#FFFFFF',
          padding: isMobile ? '10px' : '12px',
          border: '1px solid #E5E7EB',
          borderRadius: borderRadius.md,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: isMobile ? '12px' : '13px',
          minWidth: '120px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '4px', color: colors.text.primary }}>
          {data.month} 2025
        </div>
        <div>
          <span style={{ color: colors.text.secondary, fontSize: '12px' }}>Munkanélküliség: </span>
          <span style={{ fontWeight: '600', color: colors.text.primary }}>
            {data.rate.toFixed(1)}%
          </span>
        </div>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Get bar color based on unemployment rate
  const getBarColor = (rate: number) => {
    // Low unemployment = good (green), but we want to show stability
    // Use a consistent color with slight variation
    if (rate <= 4.4) return '#10B981' // Green for lower rates
    if (rate <= 4.5) return '#3B82F6' // Blue for typical rate
    return '#F59E0B' // Orange for slightly higher
  }

  return (
    <div
      role="img"
      aria-label="Munkaerőpiac paradoxon grafikon"
      aria-describedby="labor-chart-description labor-chart-data-source"
      style={{
        width: '100%',
        minWidth: '320px',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: isMobile ? spacing.md : spacing.xl,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hidden description for screen readers */}
      <div id="labor-chart-description" className="sr-only">
        Grafikon a munkaerőpiac paradoxonjáról. A munkanélküliség stabil, körülbelül 4,5% körül mozog 2025-ben.
        A minimálbér 2026-ban 11%-kal emelkedik: 2025-ben 266,800 forint bruttó (197,000 forint nettó),
        2026-ban 296,000 forint bruttó (216,500 forint nettó). Ez 29,200 forint bruttó és 19,500 forint nettó növekedést jelent.
      </div>
      
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(to right, ${colors.gray[200]} 1px, transparent 1px),
          linear-gradient(to bottom, ${colors.gray[200]} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <h3 style={{
          fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: '#111827', // 4.5:1 contrast
          marginBottom: spacing.xl,
          textAlign: 'center',
        }}>
          Unemployment Stays Low, But Minimum Wage Jumps 11%
        </h3>

        {/* Top: Unemployment Rate Chart */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <h4 style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: '#111827', // 4.5:1 contrast
            marginBottom: spacing.md,
            textAlign: 'center',
          }}>
            Munkanélküliség (2025, havi adatok)
          </h4>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : Math.min(height * 0.46, 300)}>
            <BarChart
              data={unemploymentData}
              layout="vertical"
              margin={isMobile ? { top: 8, right: 8, left: 8, bottom: 8 } : { top: 12, right: 16, left: 12, bottom: 12 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.gray[200]}
                strokeOpacity={0.5}
                horizontal={true}
                vertical={false}
              />
            <XAxis
              type="number"
              domain={[4.0, 5.0]}
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: colors.gray[300] }}
              axisLine={{ stroke: colors.gray[300] }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <YAxis
              type="category"
              dataKey="month"
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 11 : 12 }}
              tickLine={{ stroke: colors.gray[300] }}
              axisLine={{ stroke: colors.gray[300] }}
              width={isMobile ? 50 : 60}
            />
              <Tooltip
                content={<UnemploymentTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                animationDuration={prefersReducedMotion ? 0 : 300}
              />
              <Bar
                dataKey="rate"
                radius={[0, 8, 8, 0]}
                isAnimationActive={!prefersReducedMotion}
                animationDuration={prefersReducedMotion ? 0 : 600}
              >
                {unemploymentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.rate)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom: Minimum Wage Comparison Cards */}
        <div>
          <h4 style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: '#111827', // 4.5:1 contrast
            marginBottom: spacing.lg,
            textAlign: 'center',
          }}>
            Minimálbér összehasonlítás
          </h4>
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: spacing.lg,
            alignItems: 'stretch',
          }}>
            {/* 2025 Card */}
            <div style={{
              flex: 1,
              padding: spacing.xl,
              backgroundColor: colors.background.paper,
              borderRadius: borderRadius.lg,
              border: `2px solid ${colors.gray[200]}`,
              boxShadow: shadows.sm,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? '200px' : '250px',
            }}>
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: '#6B7280', // 4.5:1 contrast
                marginBottom: spacing.md,
                textAlign: 'center',
              }}>
                2025
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: '#111827', // 4.5:1 contrast
                marginBottom: spacing.sm,
                textAlign: 'center',
              }}>
                {formatCurrency(minWage2025.gross)}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
                color: '#374151', // 4.5:1 contrast
                marginBottom: spacing.md,
                textAlign: 'center',
              }}>
                bruttó
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: '#111827', // 4.5:1 contrast
                textAlign: 'center',
              }}>
                {formatCurrency(minWage2025.net)}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                color: '#6B7280', // 4.5:1 contrast
                textAlign: 'center',
                marginTop: spacing.xs,
              }}>
                nettó
              </div>
            </div>

            {/* Central Visual: Worker Icon with Calculator */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: isMobile ? '100%' : '120px',
              padding: spacing.md,
            }}>
              {/* Arrow */}
              <div style={{
                fontSize: isMobile ? '24px' : '32px',
                color: colors.success,
                marginBottom: spacing.sm,
                transform: isMobile ? 'rotate(90deg)' : 'none',
              }}>
                →
              </div>
              
              {/* Worker Icon with Calculator */}
              <div style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                borderRadius: '50%',
                backgroundColor: colors.primaryLight,
                border: `2px solid ${colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.sm,
                position: 'relative',
              }}>
                {/* Simplified worker icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                
                {/* Calculator badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: colors.success,
                  border: `2px solid #FFFFFF`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: shadows.md,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="12" y2="14" />
                    <line x1="8" y1="18" x2="12" y2="18" />
                  </svg>
                </div>
              </div>
              
              {/* Net increase */}
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                fontWeight: typography.fontWeight.bold,
                color: '#059669', // Darker green for 4.5:1 contrast
                textAlign: 'center',
                padding: spacing.xs,
                backgroundColor: colors.successLight,
                borderRadius: borderRadius.md,
                marginTop: spacing.xs,
              }}>
                +{formatCurrency(netIncrease)}
              </div>
              <div style={{
                fontSize: isMobile ? '10px' : '11px',
                color: '#6B7280', // 4.5:1 contrast
                textAlign: 'center',
                marginTop: '2px',
              }}>
                nettó/hó
              </div>
            </div>

            {/* 2026 Card */}
            <div style={{
              flex: 1,
              padding: spacing.xl,
              backgroundColor: colors.primaryLight,
              borderRadius: borderRadius.lg,
              border: `2px solid ${colors.primary}`,
              boxShadow: shadows.md,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? '200px' : '250px',
            }}>
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: '#6B7280', // 4.5:1 contrast
                marginBottom: spacing.md,
                textAlign: 'center',
              }}>
                2026
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: '#111827', // 4.5:1 contrast
                marginBottom: spacing.sm,
                textAlign: 'center',
              }}>
                {formatCurrency(minWage2026.gross)}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
                color: '#374151', // 4.5:1 contrast
                marginBottom: spacing.md,
                textAlign: 'center',
              }}>
                bruttó
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: '#111827', // 4.5:1 contrast
                textAlign: 'center',
              }}>
                {formatCurrency(minWage2026.net)}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                color: '#6B7280', // 4.5:1 contrast
                textAlign: 'center',
                marginTop: spacing.xs,
              }}>
                nettó
              </div>
              
              {/* Gross increase indicator */}
              <div style={{
                marginTop: spacing.md,
                padding: spacing.sm,
                backgroundColor: colors.success,
                borderRadius: borderRadius.md,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span style={{
                  fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                }}>
                  +{formatCurrency(grossIncrease)} bruttó
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{
            marginTop: spacing.lg,
            padding: spacing.lg,
            backgroundColor: colors.background.subtle,
            borderRadius: borderRadius.md,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
              color: '#374151', // 4.5:1 contrast
              lineHeight: 1.6,
            }}>
              <strong style={{ color: '#111827' }}>11%-os emelés:</strong> A minimálbér bruttó értéke{' '}
              <strong style={{ color: '#059669' }}>{formatCurrency(grossIncrease)}</strong>-tal nő,{' '}
              ami <strong style={{ color: '#059669' }}>{formatCurrency(netIncrease)}</strong> nettó havi növekedést jelent.
            </div>
          </div>
        </div>
      </div>

      {/* Data Source Credit */}
      <div
        id="labor-chart-data-source"
        style={{
          marginTop: spacing.lg,
          paddingTop: spacing.md,
          borderTop: `1px solid ${colors.gray[200]}`,
          fontSize: '10px',
          color: '#6B7280', // 4.5:1 contrast (7.1:1)
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        Forrás: MNB, KSH, ECB
      </div>
    </div>
  )
}
