'use client'

import React, { useMemo } from 'react'
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface DataPoint {
  year: number
  nominal: number
  real: number
  age?: number
}

interface ModernLineChartProps {
  data: DataPoint[]
  formatCurrency: (value: number) => string
  formatYear?: (year: number) => string
  showAge?: boolean
  height?: number
  /** Enable responsive/mobile-optimized layout */
  isMobile?: boolean
}

/**
 * Modern, accessible line chart component following 2026 best practices
 * Features:
 * - Smooth animations with reduced motion support
 * - Enhanced tooltips with modern design
 * - Accessibility improvements (ARIA labels, keyboard navigation)
 * - Performance optimizations
 * - Modern color scheme with gradients
 */
export default function ModernLineChart({
  data,
  formatCurrency,
  formatYear = (year) => year.toString(),
  showAge = false,
  height = 400,
  isMobile = false
}: ModernLineChartProps) {
  const prefersReducedMotion = useReducedMotion()

  // Extend data with purchasing power loss (gap between nominal and real) for area fill
  const chartData = useMemo(() => 
    data.map(d => ({
      ...d,
      purchasingPowerLoss: Math.max(0, d.nominal - d.real)
    })),
    [data]
  )

  // Memoize chart configuration for performance - adjust for mobile
  const chartConfig = useMemo(() => ({
    animationDuration: prefersReducedMotion ? 0 : 800,
    animationEasing: 'ease-out' as const,
    margin: isMobile 
      ? { top: 12, right: 8, left: 8, bottom: 8 } 
      : { top: 16, right: 24, left: 24, bottom: 16 },
    chartHeight: isMobile ? 280 : height
  }), [prefersReducedMotion, isMobile, height])

  // Enhanced tooltip with modern design
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const dataPoint = payload[0].payload as DataPoint

    return (
      <div
        role="tooltip"
        aria-label={`Év: ${dataPoint.year}${showAge && dataPoint.age ? `, életkor: ${dataPoint.age}` : ''}`}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '16px',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          fontSize: '14px',
          lineHeight: '1.5',
          minWidth: '200px'
        }}
      >
        <div style={{
          fontWeight: '500',
          color: '#111827',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          {formatYear(dataPoint.year)}
          {showAge && dataPoint.age !== undefined && (
            <span style={{ color: '#6B7280', fontWeight: '400', marginLeft: '8px' }}>
              (életkor: {dataPoint.age})
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {payload
            .filter((entry) => entry.dataKey === 'nominal' || entry.dataKey === 'real')
            .map((entry, index) => {
              const isNominal = entry.dataKey === 'nominal'
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        backgroundColor: entry.color || '#111827',
                        flexShrink: 0
                      }}
                      aria-hidden="true"
                    />
                    <span style={{ color: '#4B5563', fontSize: '13px' }}>
                      {isNominal ? 'Névleges érték' : 'Reál'}:
                    </span>
                  </div>
                  <span
                    className="tabular-nums"
                    style={{
                      fontWeight: '500',
                      color: '#111827',
                      fontSize: '14px'
                    }}
                  >
                    {formatCurrency(entry.value as number)}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  // Modern color scheme - distinct colors to emphasize the gap between nominal and real values
  // The area between the lines (purchasing power loss) uses amber to highlight the difference
  const colors = {
    nominal: '#06B6D4',   // Cyan for nominal - stands out
    real: '#10B981',      // Emerald for real purchasing power
    gap: '#F59E0B',       // Amber for the gap/loss area between lines - emphasizes the difference
    gapFill: 'rgba(245, 158, 11, 0.35)', // Semi-transparent amber for area fill
    grid: '#E5E7EB',      // Light gray for grid
    text: '#4B5563',      // Medium gray for text
    textMobile: '#6B7280', // Lighter text for mobile
    background: '#F0FDFA' // Light teal background
  }

  return (
    <div style={{ width: '100%', height: `${chartConfig.chartHeight}px`, minHeight: isMobile ? 260 : 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={chartConfig.margin}
        >
          <defs>
            {/* Gradient for the gap area (purchasing power loss between nominal and real) */}
            <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.gap} stopOpacity={0.5} />
              <stop offset="100%" stopColor={colors.gap} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="year"
            stroke={isMobile ? colors.textMobile : colors.text}
            tick={{ fill: isMobile ? colors.textMobile : colors.text, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            label={!isMobile ? {
              value: 'Év',
              position: 'insideBottom',
              offset: -8,
              style: { fill: colors.text, fontSize: 12 }
            } : undefined}
            aria-label="Évek"
            domain={['dataMin', 'dataMax']}
            type="number"
            scale="linear"
            tickCount={data.length > 0 ? Math.min(data.length, isMobile ? 6 : 15) : 5}
          />
          <YAxis
            stroke={isMobile ? colors.textMobile : colors.text}
            tick={{ fill: isMobile ? colors.textMobile : colors.text, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(isMobile ? 0 : 1)}M` : `${(value / 1000).toFixed(0)}K`}
            width={isMobile ? 36 : 60}
            label={!isMobile ? {
              value: 'Forint',
              angle: -90,
              position: 'insideLeft',
              style: { fill: colors.text, fontSize: 12 }
            } : undefined}
            aria-label="Forint értékek"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: colors.nominal,
              strokeWidth: 2,
              strokeDasharray: '5 5',
              opacity: 0.4
            }}
            animationDuration={chartConfig.animationDuration}
          />
          <Legend
            wrapperStyle={{ paddingTop: isMobile ? '12px' : '16px' }}
            // Only show the two Hungarian labels (Névleges érték, Valódi vásárlóérő) - exclude Area components and use explicit Hungarian names
            content={({ payload }) => {
              // Filter to only include Line components (nominal, real) - excludes Area/purchasingPowerLoss
              // Map to explicit Hungarian labels (entry.value from Recharts may show dataKey like "real")
              const lineEntries = payload?.filter((entry) => 
                entry.dataKey === 'nominal' || entry.dataKey === 'real'
              ) || []
              const labels: { dataKey: string; label: string; color: string }[] = lineEntries.map(entry => ({
                dataKey: String(entry.dataKey ?? ''),
                label: entry.dataKey === 'nominal' ? 'Névleges érték' : 'Valódi vásárlóérő',
                color: entry.color || colors.text
              }))
              return (
                <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '16px' : '24px', flexWrap: 'wrap' }}>
                  {labels.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ 
                        width: isMobile ? 10 : 14, 
                        height: 3, 
                        backgroundColor: item.color, 
                        borderRadius: 1 
                      }} />
                      <span style={{ 
                        color: isMobile ? colors.textMobile : colors.text, 
                        fontSize: isMobile ? '12px' : '13px', 
                        fontWeight: '500' 
                      }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          {/* Stacked areas: real (base) + purchasingPowerLoss (gap between lines) */}
          {/* Area 1: Real purchasing power - fills from baseline to real value */}
          <Area
            type="monotone"
            dataKey="real"
            stackId="purchasingPower"
            fill={colors.real}
            fillOpacity={0.25}
            stroke="none"
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            legendType="none"
          />
          {/* Area 2: The gap between nominal and real - emphasizes the purchasing power loss */}
          <Area
            type="monotone"
            dataKey="purchasingPowerLoss"
            stackId="purchasingPower"
            fill="url(#gapGradient)"
            stroke="none"
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            legendType="none"
          />
          <Line
            type="monotone"
            dataKey="nominal"
            stroke={colors.nominal}
            strokeWidth={isMobile ? 2.5 : 3}
            name="Névleges érték"
            dot={{ r: isMobile ? 3 : 5, fill: colors.nominal, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: isMobile ? 5 : 7, stroke: colors.nominal, strokeWidth: 2, fill: '#FFFFFF' }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Névleges érték vonal"
          />
          <Line
            type="monotone"
            dataKey="real"
            stroke={colors.real}
            strokeWidth={isMobile ? 2.5 : 3}
            name="Valódi vásárlóérő"
            dot={{ r: isMobile ? 3 : 5, fill: colors.real, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: isMobile ? 5 : 7, stroke: colors.real, strokeWidth: 2, fill: '#FFFFFF' }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Valódi vásárlóérő vonal"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
