'use client'

import React, { useMemo } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, PieChart, Pie, Cell } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface GDPGrowthChartProps {
  height?: number
}

/**
 * Chart showing GDP growth decomposition (2024-2025)
 * Features:
 * - Seven columns showing quarterly GDP growth with component breakdown
 * - Q3 2025 highlighted with pie chart inset
 * - Green for household consumption, gray for investments/exports
 * - Mobile-optimized layout
 */
export default function GDPGrowthChart({ height = 500 }: GDPGrowthChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Quarterly GDP growth data
  // For Q3 2025: consumption +1.8, investments -0.7, exports -0.5, total = +0.6
  // For other quarters: we only have total, so show as "other" (gray)
  const gdpData = useMemo(() => [
    { quarter: 'Q1 2024', total: -0.2, consumption: 0, other: -0.2 },
    { quarter: 'Q2 2024', total: 0.1, consumption: 0, other: 0.1 },
    { quarter: 'Q3 2024', total: 0.5, consumption: 0, other: 0.5 },
    { quarter: 'Q4 2024', total: 0.4, consumption: 0, other: 0.4 },
    { quarter: 'Q1 2025', total: -0.2, consumption: 0, other: -0.2 },
    { quarter: 'Q2 2025', total: 0.1, consumption: 0, other: 0.1 },
    { quarter: 'Q3 2025', total: 0.6, consumption: 1.8, other: -1.2 }, // -1.2 = -0.7 (investments) + -0.5 (exports)
  ], [])

  // Q3 2025 component breakdown for pie chart
  const q3Breakdown = useMemo(() => [
    { name: 'Háztartási fogyasztás', value: 1.8, percentage: 300 }, // 1.8 / 0.6 * 100 = 300%
    { name: 'Beruházások', value: -0.7, percentage: -116.67 }, // -0.7 / 0.6 * 100 = -116.67%
    { name: 'Nettó export', value: -0.5, percentage: -83.33 }, // -0.5 / 0.6 * 100 = -83.33%
  ], [])

  // Calculate absolute values for pie chart (showing contribution magnitude)
  const pieChartData = useMemo(() => [
    { name: 'Háztartási fogyasztás', value: 1.8, sign: 'positive' },
    { name: 'Beruházások', value: 0.7, sign: 'negative' },
    { name: 'Nettó export', value: 0.5, sign: 'negative' },
  ], [])

  // Color scheme
  const chartColors = {
    consumption: '#10B981',        // Green for household consumption
    other: '#9CA3AF',               // Gray for investments + exports
    investment: '#6B7280',          // Darker gray for investments
    export: '#D1D5DB',              // Light gray for exports
    highlight: '#3B82F6',           // Blue for Q3 2025 highlight
    grid: '#E5E7EB',
    text: '#4B5563',
    textMobile: '#6B7280',
    background: '#F9FAFB',
  }

  // Custom tooltip for bar chart
  const BarChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload as typeof gdpData[0]
    const isQ3 = data.quarter === 'Q3 2025'

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
          minWidth: '160px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: colors.text.primary }}>
          {data.quarter}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#374151', fontSize: '12px' }}>GDP növekedés: </span>
          <span style={{ fontWeight: '600', color: '#111827' }}>
            {data.total > 0 ? '+' : ''}{data.total.toFixed(1)}%
          </span>
        </div>
        {isQ3 && (
          <>
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: '#374151', fontSize: '12px' }}>Háztartási fogyasztás: </span>
                <span style={{ fontWeight: '600', color: '#059669' }}> {/* Darker green for contrast */}
                  +1.8 pp
                </span>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: '#374151', fontSize: '12px' }}>Beruházások: </span>
                <span style={{ fontWeight: '600', color: '#4B5563' }}> {/* Darker gray for contrast */}
                  -0.7 pp
                </span>
              </div>
              <div>
                <span style={{ color: '#374151', fontSize: '12px' }}>Nettó export: </span>
                <span style={{ fontWeight: '600', color: '#4B5563' }}>
                  -0.5 pp
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Find Q3 2025 index for highlighting
  const q3Index = gdpData.findIndex(d => d.quarter === 'Q3 2025')

  return (
    <div
      role="img"
      aria-label="GDP növekedés dekompozíció grafikon"
      aria-describedby="gdp-chart-description gdp-chart-data-source"
      style={{
        width: '100%',
        minWidth: '320px',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: isMobile ? spacing.md : spacing.xl,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Hidden description for screen readers */}
      <div id="gdp-chart-description" className="sr-only">
        Grafikon a GDP növekedés összetevőiről 2024 első negyedévétől 2025 harmadik negyedévéig.
        A harmadik negyedévben a GDP 0,6%-kal nőtt. A háztartási fogyasztás 1,8 százalékponttal járult hozzá,
        míg a beruházások mínusz 0,7, a nettó export pedig mínusz 0,5 százalékponttal.
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827', // 4.5:1 contrast
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        Who&apos;s Driving Hungary&apos;s 0.6% Growth?
      </h3>

      {/* Main Chart Container */}
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={gdpData}
            margin={isMobile ? { top: 60, right: 8, left: 8, bottom: 40 } : { top: 80, right: 16, left: 16, bottom: 50 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="quarter"
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
              height={isMobile ? 60 : 50}
            />
            <YAxis
              domain={[-0.5, 1]}
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              tickFormatter={(value) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`}
              width={isMobile ? 50 : 60}
              label={{
                value: 'GDP növekedés (%)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: chartColors.text, fontSize: isMobile ? '10px' : '11px' },
              }}
            />
            <Tooltip
              content={<BarChartTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            
            {/* Stacked bars: consumption (green) at bottom, other (gray) on top */}
            {/* For Q3 2025, consumption is +1.8, other is -1.2 (which makes total +0.6) */}
            {/* For other quarters, we show total as "other" since we don't have breakdown */}
            <Bar
              dataKey="consumption"
              stackId="gdp"
              fill={chartColors.consumption}
              radius={[0, 0, 0, 0]}
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            >
              {gdpData.map((entry, index) => {
                // Only Q3 2025 has consumption data, others are 0
                if (entry.quarter === 'Q3 2025') {
                  return (
                    <Cell
                      key={`consumption-${index}`}
                      fill={chartColors.consumption}
                    />
                  )
                }
                return (
                  <Cell
                    key={`consumption-${index}`}
                    fill="transparent"
                  />
                )
              })}
            </Bar>
            <Bar
              dataKey="other"
              stackId="gdp"
              fill={chartColors.other}
              radius={[0, 0, 0, 0]}
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            >
              {gdpData.map((entry, index) => {
                // Highlight Q3 2025 with border effect
                if (entry.quarter === 'Q3 2025') {
                  return (
                    <Cell
                      key={`other-${index}`}
                      fill={chartColors.other}
                      stroke={chartColors.highlight}
                      strokeWidth={2}
                    />
                  )
                }
                return (
                  <Cell
                    key={`other-${index}`}
                    fill={chartColors.other}
                  />
                )
              })}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>

        {/* Pie Chart Inset for Q3 2025 */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '20px' : '30px',
          right: isMobile ? '8px' : '16px',
          width: isMobile ? '120px' : '140px',
          height: isMobile ? '120px' : '140px',
          backgroundColor: '#FFFFFF',
          borderRadius: borderRadius.lg,
          border: `1px solid ${chartColors.grid}`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: spacing.md,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: isMobile ? '10px' : '11px',
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: spacing.xs,
            textAlign: 'center',
          }}>
            Q3 2025
          </div>
          <ResponsiveContainer width="100%" height={isMobile ? '80px' : '100px'}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 20 : 25}
                outerRadius={isMobile ? 35 : 40}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={!prefersReducedMotion}
                animationDuration={prefersReducedMotion ? 0 : 600}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`pie-cell-${index}`}
                    fill={
                      entry.sign === 'positive'
                        ? chartColors.consumption
                        : entry.name === 'Beruházások'
                        ? chartColors.investment
                        : chartColors.export
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => {
                  const entry = pieChartData.find(d => d.name === name)
                  if (entry?.sign === 'positive') {
                    return [`+${value.toFixed(1)} pp`, name]
                  }
                  return [`-${value.toFixed(1)} pp`, name]
                }}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: borderRadius.md,
                  fontSize: isMobile ? '11px' : '12px',
                  padding: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            fontSize: isMobile ? '9px' : '10px',
            color: colors.text.muted,
            textAlign: 'center',
            marginTop: spacing.xs,
            lineHeight: 1.3,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: chartColors.consumption, borderRadius: '2px' }} />
              <span>+1.8 pp</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: chartColors.investment, borderRadius: '2px' }} />
              <span>-0.7 pp</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: chartColors.export, borderRadius: '2px' }} />
              <span>-0.5 pp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '16px' : '24px',
        marginTop: spacing.lg,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: isMobile ? 16 : 20,
            height: isMobile ? 12 : 16,
            backgroundColor: chartColors.consumption,
            borderRadius: '2px',
          }} />
          <span style={{
            color: '#374151', // 4.5:1 contrast
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: '500',
          }}>
            Háztartási fogyasztás
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: isMobile ? 16 : 20,
            height: isMobile ? 12 : 16,
            backgroundColor: chartColors.other,
            borderRadius: '2px',
          }} />
          <span style={{
            color: '#374151', // 4.5:1 contrast
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: '500',
          }}>
            Beruházások + Export
          </span>
        </div>
      </div>

      {/* Data Source Credit */}
      <div
        id="gdp-chart-data-source"
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
