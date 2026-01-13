'use client'

import React, { useMemo } from 'react'
import { ComposedChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Cell, ReferenceLine } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface InflationInterestChartProps {
  height?: number
}

/**
 * Chart showing inflation and interest rates (2022-2025) with monthly food cost growth
 * Redesigned for clarity: 
 * - Single focused inflation trend with clear visual story
 * - Simplified food cost comparison with real-world context
 * - Plain language explanations
 * - Clear "what this means for you" messaging
 */
export default function InflationInterestChart({ height = 600 }: InflationInterestChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Data for line chart: Quarterly data points
  const lineChartData = useMemo(() => [
    { period: 'Q4 2022', inflation: 24.5, interestRate: 13.0 },
    { period: 'Q1 2023', inflation: 24.0, interestRate: 13.0 },
    { period: 'Q2 2023', inflation: 20.0, interestRate: 12.0 },
    { period: 'Q3 2023', inflation: 18.0, interestRate: 11.0 },
    { period: 'Q4 2023', inflation: 17.0, interestRate: 10.5 },
    { period: 'Q1 2024', inflation: 15.0, interestRate: 9.5 },
    { period: 'Q2 2024', inflation: 12.0, interestRate: 8.5 },
    { period: 'Q3 2024', inflation: 9.0, interestRate: 8.0 },
    { period: 'Q4 2024', inflation: 7.0, interestRate: 7.5 },
    { period: 'Q1 2025', inflation: 6.0, interestRate: 7.0 },
    { period: 'Q2 2025', inflation: 5.0, interestRate: 6.75 },
    { period: 'Q3 2025', inflation: 4.2, interestRate: 6.5 },
    { period: 'Q4 2025', inflation: 3.8, interestRate: 6.5 },
  ], [])

  // Data for bar chart: Monthly food cost growth with context
  const barChartData = useMemo(() => [
    { year: '2023', cost: 8200, label: '2023 vs 2022', description: 'Magas infláció' },
    { year: '2024', cost: 3100, label: '2024 vs 2023', description: 'Lassulás' },
    { year: '2025', cost: 1400, label: '2025 vs 2024', description: 'Közel normál' },
  ], [])

  // Calculate chart heights: 55% for line chart, 45% for bar chart
  const lineChartHeight = useMemo(() => Math.floor(height * 0.55), [height])
  const barChartHeight = useMemo(() => Math.floor(height * 0.45), [height])
  
  // MNB target zone (2-4%)
  const targetZoneMin = 2
  const targetZoneMax = 4

  // Custom tooltip for line chart - simplified for inflation only
  const LineChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload as typeof lineChartData[0]
    const inflationValue = data.inflation

    return (
      <div
        role="tooltip"
        style={{
          backgroundColor: '#FFFFFF',
          padding: isMobile ? '12px' : '14px',
          border: '2px solid #E5E7EB',
          borderRadius: borderRadius.md,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: isMobile ? '13px' : '14px',
          minWidth: '180px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '10px', color: colors.text.primary, fontSize: isMobile ? '13px' : '14px' }}>
          {data.period}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '16px',
              height: '4px',
              backgroundColor: chartColors.inflation,
              borderRadius: '2px',
            }}
            aria-hidden="true"
          />
          <span style={{ color: '#374151', fontSize: isMobile ? '12px' : '13px' }}>
            Infláció:
          </span>
          <span style={{ fontWeight: '700', color: '#111827', marginLeft: 'auto', fontSize: isMobile ? '14px' : '16px' }}>
            {inflationValue.toFixed(1)}%
          </span>
        </div>
        {inflationValue <= targetZoneMax && (
          <div style={{
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #E5E7EB',
            fontSize: isMobile ? '11px' : '12px',
            color: colors.success,
            fontWeight: '500',
          }}>
            ✓ Célzónában
          </div>
        )}
      </div>
    )
  }

  // Custom tooltip for bar chart
  const BarChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload as typeof barChartData[0]

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
          {data.label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: payload[0].color || '#111827',
              borderRadius: '2px',
            }}
            aria-hidden="true"
          />
          <span style={{ color: '#374151', fontSize: '12px' }}> {/* 4.5:1 contrast */}
            Extra havi költség:
          </span>
          <span style={{ fontWeight: '600', color: '#111827', marginLeft: 'auto' }}> {/* 4.5:1 contrast */}
            +{data.cost.toLocaleString('hu-HU')} Ft
          </span>
        </div>
      </div>
    )
  }

  // Color scheme
  const chartColors = {
    inflation: '#EF4444',        // Red for inflation
    interestRate: '#3B82F6',      // Blue for interest rate
    bar2023: '#DC2626',           // Dark red for 2023
    bar2024: '#F97316',           // Orange for 2024
    bar2025: '#10B981',           // Light green for 2025
    grid: '#E5E7EB',
    text: '#4B5563',
    textMobile: '#6B7280',
  }

  // Get bar color based on year
  const getBarColor = (year: string) => {
    switch (year) {
      case '2023': return chartColors.bar2023
      case '2024': return chartColors.bar2024
      case '2025': return chartColors.bar2025
      default: return chartColors.bar2023
    }
  }

  return (
    <div
      role="img"
      aria-label="Infláció és kamatláb grafikon 2022-2025"
      aria-describedby="inflation-chart-description inflation-chart-data-source"
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
      <div id="inflation-chart-description" className="sr-only">
        Grafikon az infláció és a jegybanki alapkamat változásáról 2022 negyedik negyedévétől 2025 negyedik negyedévig.
        Az infláció 24,5%-ról 3,8%-ra csökkent. A jegybanki alapkamat 13%-ról 6,5%-ra csökkent.
        Az alsó rész mutatja az élelmiszer vásárlás havi extra költségét: 2023-ban 8,200 forint, 2024-ben 3,100 forint, 2025-ben 1,400 forint.
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827',
        marginBottom: spacing.md,
        textAlign: 'center',
      }}>
        Az infláció csökkenése: Mit jelent ez neked?
      </h3>
      
      {/* Key Insight Box */}
      <div style={{
        marginBottom: spacing.xl,
        padding: spacing.md,
        backgroundColor: colors.successLight,
        borderRadius: borderRadius.md,
        border: `1px solid ${colors.success}`,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          marginBottom: spacing.xs,
        }}>
          3,8% - a jegybank célzónájában vagyunk
        </div>
        <div style={{
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
        }}>
          2022-ben még 25% volt – az árak nagyon gyorsan nőttek
        </div>
      </div>

      {/* Line Chart - Inflation Focus */}
      <div style={{ marginBottom: spacing['2xl'] }}>
        <ResponsiveContainer width="100%" height={lineChartHeight}>
          <ComposedChart
            data={lineChartData}
            margin={isMobile ? { top: 20, right: 16, left: 8, bottom: 40 } : { top: 24, right: 24, left: 16, bottom: 50 }}
          >
            <defs>
              <linearGradient id="targetZoneGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.success} stopOpacity={0.15} />
                <stop offset="100%" stopColor={colors.success} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              strokeOpacity={0.5}
              vertical={false}
            />
            {/* Target zone background (2-4%) */}
            <ReferenceLine 
              y={targetZoneMax} 
              stroke={colors.success} 
              strokeDasharray="5 5" 
              strokeOpacity={0.5}
            />
            <ReferenceLine 
              y={targetZoneMin} 
              stroke={colors.success} 
              strokeDasharray="5 5" 
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="period"
              stroke="#4B5563"
              tick={{ fill: '#4B5563', fontSize: isMobile ? 9 : 10 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              interval={isMobile ? 2 : 0}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
              height={isMobile ? 60 : 50}
            />
            <YAxis
              domain={[0, 28]}
              stroke={chartColors.inflation}
              tick={{ fill: chartColors.inflation, fontSize: isMobile ? 10 : 11, fontWeight: '500' }}
              tickLine={{ stroke: chartColors.inflation }}
              axisLine={{ stroke: chartColors.inflation }}
              tickFormatter={(value) => `${value}%`}
              width={isMobile ? 50 : 55}
              label={{
                value: 'Inflációs ráta',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: chartColors.inflation, fontSize: isMobile ? '11px' : '12px', fontWeight: '600' },
              }}
            />
            <Tooltip
              content={<LineChartTooltip />}
              cursor={{ stroke: chartColors.inflation, strokeWidth: 2, strokeDasharray: '5 5', opacity: 0.5 }}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            <Line
              type="monotone"
              dataKey="inflation"
              stroke={chartColors.inflation}
              strokeWidth={isMobile ? 3 : 3.5}
              dot={{ r: isMobile ? 4 : 5, fill: chartColors.inflation, strokeWidth: 2.5, stroke: '#FFFFFF' }}
              activeDot={{ r: isMobile ? 7 : 8, stroke: chartColors.inflation, strokeWidth: 3, fill: '#FFFFFF' }}
              name="Infláció"
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 800}
            />
            {/* Highlight current value - note: ReferenceLine x-axis labels need to match dataKey format */}
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Simple explanation */}
        <div style={{
          marginTop: spacing.md,
          padding: spacing.md,
          backgroundColor: colors.background.subtle,
          borderRadius: borderRadius.md,
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
          textAlign: 'center',
          lineHeight: typography.lineHeight.relaxed,
        }}>
          Az árak most <strong style={{ color: colors.text.primary }}>lassabban nőnek</strong>, mint 2022-2023-ban. 
          Ez azt jelenti, hogy a bevásárlásod <strong style={{ color: colors.text.primary }}>nem drágul annyira gyorsan</strong>, mint korábban.
        </div>
      </div>

      {/* Bar Chart - Food Cost Comparison */}
      <div>
        <h4 style={{
          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: '#111827',
          marginBottom: spacing.sm,
          textAlign: 'center',
        }}>
          Mennyivel többet költesz az élelmiszerre?
        </h4>
        <p style={{
          fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
          color: colors.text.muted,
          marginBottom: spacing.md,
          textAlign: 'center',
        }}>
          Havi extra költség az előző évhez képest (átlagos család)
        </p>
        <ResponsiveContainer width="100%" height={barChartHeight}>
          <BarChart
            data={barChartData}
            layout="vertical"
            margin={isMobile ? { top: 8, right: 16, left: 8, bottom: 8 } : { top: 12, right: 24, left: 16, bottom: 12 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              strokeOpacity={0.5}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 9000]}
              stroke="#4B5563"
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              tickFormatter={(value) => `+${value.toLocaleString('hu-HU')} Ft`}
            />
            <YAxis
              type="category"
              dataKey="year"
              stroke="#4B5563"
              tick={{ fill: '#4B5563', fontSize: isMobile ? 12 : 13, fontWeight: '600' }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              width={isMobile ? 50 : 60}
            />
            <Tooltip
              content={<BarChartTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            <Bar
              dataKey="cost"
              radius={[0, 8, 8, 0]}
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            >
              {barChartData.map((entry) => (
                <Cell
                  key={`cell-${entry.year}`}
                  fill={getBarColor(entry.year)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Real-world context */}
        <div style={{
          marginTop: spacing.md,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: spacing.sm,
        }}>
          {barChartData.map((item) => (
            <div
              key={item.year}
              style={{
                padding: spacing.sm,
                backgroundColor: item.year === '2025' ? colors.successLight : colors.background.paper,
                borderRadius: borderRadius.md,
                border: `1px solid ${item.year === '2025' ? colors.success : colors.gray[200]}`,
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}>
                +{item.cost.toLocaleString('hu-HU')} Ft
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
                color: colors.text.secondary,
                fontWeight: typography.fontWeight.medium,
              }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          marginTop: spacing.md,
          padding: spacing.md,
          backgroundColor: colors.infoLight,
          borderRadius: borderRadius.md,
          borderLeft: `4px solid ${colors.info}`,
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.relaxed,
        }}>
          <strong style={{ color: colors.text.primary }}>Példa:</strong> Ha egy család havi 100 000 forintot költ élelmiszerre, 
          {barChartData[2].cost.toLocaleString('hu-HU')} forinttal többet kell fizetnie, mint tavaly ugyanerre a kosárra. 
          Ez jóval kevesebb, mint a {barChartData[0].cost.toLocaleString('hu-HU')} forintos különbség 2023-ban.
        </div>
      </div>

      {/* Data Source Credit */}
      <div
        id="inflation-chart-data-source"
        style={{
          marginTop: spacing.lg,
          paddingTop: spacing.md,
          borderTop: `1px solid ${colors.gray[200]}`,
          fontSize: '10px',
          color: '#6B7280', // 4.5:1 contrast on white (7.1:1)
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        Forrás: MNB, KSH, ECB
      </div>
    </div>
  )
}
