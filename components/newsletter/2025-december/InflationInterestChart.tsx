'use client'

import React, { useMemo } from 'react'
import { ComposedChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps, Cell } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface InflationInterestChartProps {
  height?: number
}

/**
 * Chart showing inflation and interest rates (2022-2025) with monthly food cost growth
 * Features:
 * - Dual Y-axis line chart for inflation (red) and interest rates (blue)
 * - Horizontal bar chart for monthly food cost growth
 * - Mobile-optimized layout (9:16 ratio)
 * - Clean, accessible design
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

  // Data for bar chart: Monthly food cost growth
  const barChartData = useMemo(() => [
    { year: '2023', cost: 8200, label: '2023 vs 2022' },
    { year: '2024', cost: 3100, label: '2024 vs 2023' },
    { year: '2025', cost: 1400, label: '2025 vs 2024' },
  ], [])

  // Calculate chart heights: 60% for line chart, 40% for bar chart
  const lineChartHeight = useMemo(() => Math.floor(height * 0.6), [height])
  const barChartHeight = useMemo(() => Math.floor(height * 0.4), [height])

  // Custom tooltip for line chart
  const LineChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload as typeof lineChartData[0]

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
          {data.period}
        </div>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div
              style={{
                width: '12px',
                height: '3px',
                backgroundColor: entry.color || '#111827',
                borderRadius: '2px',
              }}
              aria-hidden="true"
            />
            <span style={{ color: '#374151', fontSize: '12px' }}> {/* 4.5:1 contrast (8.6:1) */}
              {entry.name === 'inflation' ? 'Infláció' : 'MNB alapkamat'}:
            </span>
            <span style={{ fontWeight: '600', color: '#111827', marginLeft: 'auto' }}> {/* 4.5:1 contrast (16.6:1) */}
              {entry.value?.toFixed(1)}%
            </span>
          </div>
        ))}
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
        color: '#111827', // Ensure 4.5:1 contrast (16.6:1 on white)
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        From 25% to 3.8%: The Inflation Slowdown
      </h3>

      {/* Line Chart - Top 60% */}
      <div style={{ marginBottom: spacing['2xl'] }}>
        <ResponsiveContainer width="100%" height={lineChartHeight}>
          <ComposedChart
            data={lineChartData}
            margin={isMobile ? { top: 8, right: 8, left: 8, bottom: 8 } : { top: 12, right: 12, left: 12, bottom: 12 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="period"
              stroke="#4B5563" // 4.5:1 contrast (7.1:1)
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              interval={isMobile ? 2 : 0}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
              height={isMobile ? 60 : 40}
            />
            {/* Left Y-axis for inflation (0-30%) */}
            <YAxis
              yAxisId="left"
              domain={[0, 30]}
              stroke={chartColors.inflation}
              tick={{ fill: chartColors.inflation, fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.inflation }}
              axisLine={{ stroke: chartColors.inflation }}
              tickFormatter={(value) => `${value}%`}
              width={isMobile ? 45 : 50}
              label={{
                value: 'Infláció (%)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: chartColors.inflation, fontSize: isMobile ? '10px' : '11px' },
              }}
            />
            {/* Right Y-axis for interest rate (0-15%) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 15]}
              stroke={chartColors.interestRate}
              tick={{ fill: chartColors.interestRate, fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.interestRate }}
              axisLine={{ stroke: chartColors.interestRate }}
              tickFormatter={(value) => `${value}%`}
              width={isMobile ? 45 : 50}
              label={{
                value: 'MNB alapkamat (%)',
                angle: 90,
                position: 'insideRight',
                style: { textAnchor: 'middle', fill: chartColors.interestRate, fontSize: isMobile ? '10px' : '11px' },
              }}
            />
            <Tooltip
              content={<LineChartTooltip />}
              cursor={{ stroke: chartColors.grid, strokeWidth: 1, strokeDasharray: '3 3' }}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            <Legend
              wrapperStyle={{ paddingTop: '8px', paddingBottom: '8px' }}
              iconType="line"
              content={({ payload }) => {
                const filteredPayload = payload?.filter(entry => 
                  entry.dataKey === 'inflation' || entry.dataKey === 'interestRate'
                ) || []
                return (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: isMobile ? '16px' : '24px',
                    flexWrap: 'wrap',
                  }}>
                    {filteredPayload.map((entry, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          width: 20,
                          height: 3,
                          backgroundColor: entry.color || '#111827',
                          borderRadius: 1,
                        }} />
                        <span style={{
                          color: '#374151', // 4.5:1 contrast (8.6:1)
                          fontSize: isMobile ? '11px' : '12px',
                          fontWeight: '500',
                        }}>
                          {entry.dataKey === 'inflation' ? 'Infláció' : 'MNB alapkamat'}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="inflation"
              stroke={chartColors.inflation}
              strokeWidth={isMobile ? 2.5 : 3}
              dot={{ r: isMobile ? 3 : 4, fill: chartColors.inflation, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: isMobile ? 6 : 7, stroke: chartColors.inflation, strokeWidth: 2, fill: '#FFFFFF' }}
              name="Infláció"
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="interestRate"
              stroke={chartColors.interestRate}
              strokeWidth={isMobile ? 2.5 : 3}
              dot={{ r: isMobile ? 3 : 4, fill: chartColors.interestRate, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: isMobile ? 6 : 7, stroke: chartColors.interestRate, strokeWidth: 2, fill: '#FFFFFF' }}
              name="MNB alapkamat"
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Bottom 40% */}
      <div>
        <h4 style={{
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          color: '#111827', // 4.5:1 contrast
          marginBottom: spacing.md,
          textAlign: 'center',
        }}>
          Extra havi költség az előző évhez képest
        </h4>
        <ResponsiveContainer width="100%" height={barChartHeight}>
          <BarChart
            data={barChartData}
            layout="vertical"
            margin={isMobile ? { top: 8, right: 8, left: 8, bottom: 8 } : { top: 12, right: 12, left: 12, bottom: 12 }}
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
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 10 : 11 }}
              tickLine={{ stroke: chartColors.grid }}
              axisLine={{ stroke: chartColors.grid }}
              tickFormatter={(value) => `+${value.toLocaleString('hu-HU')} Ft`}
            />
            <YAxis
              type="category"
              dataKey="year"
              stroke="#4B5563" // 4.5:1 contrast
              tick={{ fill: '#4B5563', fontSize: isMobile ? 11 : 12 }}
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
              radius={[0, borderRadius.md, borderRadius.md, 0]}
              isAnimationActive={!prefersReducedMotion}
              animationDuration={prefersReducedMotion ? 0 : 600}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.year)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
