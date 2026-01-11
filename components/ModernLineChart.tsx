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

  // Calculate max value and extend domain to add one more level above
  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 1000000
    const maxNominal = Math.max(...chartData.map(d => d.nominal))
    const maxReal = Math.max(...chartData.map(d => d.real))
    return Math.max(maxNominal, maxReal)
  }, [chartData])

  // Calculate domain with one extra tick level (25% more) above max value
  // Round to nearest 250K increment to ensure clean tick marks
  const yAxisDomain = useMemo(() => {
    const targetUpper = maxValue * 1.25
    // Round up to nearest 250K increment
    const roundedUpper = Math.ceil(targetUpper / 250000) * 250000
    // Ensure we have at least one level above (minimum 250K increment)
    return [0, Math.max(roundedUpper, maxValue + 250000)]
  }, [maxValue])

  // Calculate which years to show on mobile (first, last, and every second year)
  const mobileTicksArray = useMemo(() => {
    if (!isMobile || data.length === 0) return undefined
    const years = data.map(d => d.year)
    const firstYear = years[0]
    const lastYear = years[years.length - 1]
    const ticksArray: number[] = [firstYear]
    
    // Add every second year (skip first and last)
    for (let i = 1; i < years.length - 1; i += 2) {
      ticksArray.push(years[i])
    }
    
    // Always include last year
    if (lastYear !== firstYear) {
      ticksArray.push(lastYear)
    }
    
    return ticksArray
  }, [isMobile, data])

  // Memoize chart configuration for performance - adjust for mobile
  const chartConfig = useMemo(() => ({
    animationDuration: prefersReducedMotion ? 0 : (isMobile ? 500 : 800),
    animationEasing: 'ease-out' as const,
    margin: isMobile 
      ? { top: 12, right: 16, left: 8, bottom: 12 } 
      : { top: 8, right: 8, left: 8, bottom: 8 },
    chartHeight: isMobile ? Math.max(360, height - 30) : height
  }), [prefersReducedMotion, isMobile, height])

  // Enhanced tooltip with modern design and viewport-aware positioning
  const CustomTooltip = ({ active, payload, coordinate, viewBox }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const dataPoint = payload[0].payload as DataPoint
    
    // Calculate safe position using coordinate and viewBox (works for both mobile and desktop)
    let tooltipStyle: React.CSSProperties = {
      backgroundColor: '#FFFFFF',
      padding: isMobile ? '10px' : '16px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      fontSize: isMobile ? '13px' : '14px',
      lineHeight: '1.5',
      minWidth: isMobile ? '180px' : '200px',
      maxWidth: isMobile ? 'calc(100vw - 24px)' : '320px',
      position: 'relative',
      zIndex: 1000,
    }

    // Apply positioning logic for both mobile and desktop to prevent viewport cutoff
    // Note: Coordinate values are in SVG space, so we use a simple heuristic
    // The main fix (overflow: visible) allows tooltips to escape the container
    if (coordinate && coordinate.x !== undefined && coordinate.y !== undefined && viewBox) {
      // Get chart dimensions from viewBox
      const chartWidth = viewBox.width || 800
      const chartHeight = viewBox.height || 400
      
      // Estimate if tooltip is near edges (using coordinate as percentage of chart size)
      // This is a heuristic - not perfect but helps in many cases
      const xRatio = coordinate.x / chartWidth
      const yRatio = coordinate.y / chartHeight
      
      const transforms: string[] = []
      
      // If tooltip is in the right portion of the chart and might overflow viewport, flip left
      if (xRatio > 0.7) {
        transforms.push('translateX(calc(-100% - 8px))')
      }
      
      // If tooltip is in the bottom portion of the chart and might overflow viewport, flip up
      if (yRatio > 0.7) {
        transforms.push('translateY(calc(-100% - 8px))')
      }
      
      if (transforms.length > 0) {
        tooltipStyle.transform = transforms.join(' ')
      }
    }

    return (
      <div
        role="tooltip"
        aria-label={`Év: ${dataPoint.year}${showAge && dataPoint.age ? `, életkor: ${dataPoint.age}` : ''}`}
        style={tooltipStyle}
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
          {(() => {
            // Filter to only Line components (nominal, real) and deduplicate by dataKey
            // Both Area and Line components can have the same dataKey, so we deduplicate
            const seen = new Set<string>()
            const filteredPayload = payload
              .filter((entry) => {
                const dataKey = entry.dataKey as string
                if ((dataKey === 'nominal' || dataKey === 'real') && !seen.has(dataKey) && entry.value !== undefined && entry.value !== null) {
                  seen.add(dataKey)
                  return true
                }
                return false
              })

            return filteredPayload.map((entry, index) => {
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
                      {isNominal ? 'Névleges érték' : 'Valódi vásárlóérő'}:
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
            })
          })()}
        </div>
      </div>
    )
  }

  // Modern color scheme - intuitive colors to emphasize the purchasing power loss
  // Blue for nominal (neutral, unchanged value), Green for real purchasing power (positive), Red/Amber for loss (negative)
  const colors = {
    nominal: '#3B82F6',   // Blue for nominal - neutral, represents unchanged amount
    real: '#10B981',      // Green for real purchasing power - positive framing
    gap: '#EF4444',       // Red for the gap/loss area - clearly shows negative impact
    gapFill: 'rgba(239, 68, 68, 0.25)', // Semi-transparent red for area fill
    grid: '#E5E7EB',      // Light gray for grid
    text: '#4B5563',      // Medium gray for text
    textMobile: '#6B7280', // Lighter text for mobile
    background: '#F9FAFB' // Light gray background
  }

  return (
    <div style={{ 
      width: '100%', 
      height: `${chartConfig.chartHeight}px`, 
      minHeight: isMobile ? 360 : 350,
      position: 'relative',
      touchAction: 'pan-y pinch-zoom',
      overflow: 'visible'
    }}>
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
            tick={isMobile && mobileTicksArray 
              ? ({ x, y, payload }) => {
                  const value = payload.value as number
                  const years = data.map(d => d.year)
                  const firstYear = years[0]
                  const lastYear = years[years.length - 1]
                  const isFirst = value === firstYear
                  const isLast = value === lastYear
                  const textAnchor = isFirst ? 'start' : isLast ? 'end' : 'middle'
                  const dx = isFirst ? 8 : isLast ? -8 : 0
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={16}
                      dx={dx}
                      textAnchor={textAnchor}
                      fill={colors.textMobile}
                      fontSize={12}
                    >
                      {formatYear(value)}
                    </text>
                  )
                }
              : { fill: isMobile ? colors.textMobile : colors.text, fontSize: isMobile ? 12 : 12 }
            }
            ticks={mobileTicksArray}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            aria-label="Évek"
            domain={['dataMin', 'dataMax']}
            type="number"
            scale="linear"
            tickCount={isMobile && mobileTicksArray ? undefined : (data.length > 0 ? Math.min(data.length, 15) : 5)}
            interval={isMobile ? undefined : 0}
          />
          <YAxis
            domain={yAxisDomain}
            stroke={isMobile ? colors.textMobile : colors.text}
            tick={{ fill: isMobile ? colors.textMobile : colors.text, fontSize: isMobile ? 12 : 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(isMobile ? 0 : 1)}M` : `${(value / 1000).toFixed(0)}K`}
            width={isMobile ? 55 : 60}
            aria-label="Forint értékek"
            tickCount={6}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: colors.nominal,
              strokeWidth: isMobile ? 1.5 : 2,
              strokeDasharray: '5 5',
              opacity: 0.4
            }}
            animationDuration={chartConfig.animationDuration}
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={isMobile ? {
              maxWidth: 'calc(100vw - 24px)',
              pointerEvents: 'none'
            } : undefined}
          />
          <Legend
            wrapperStyle={{ paddingTop: isMobile ? '12px' : '16px', paddingBottom: isMobile ? '8px' : '0' }}
            // Only show the two Hungarian labels (Névleges érték, Valódi vásárlóérő) - exclude Area components and use explicit Hungarian names
            content={({ payload }) => {
              // Filter to only include Line components (nominal, real) - excludes Area/purchasingPowerLoss
              // Map to explicit Hungarian labels (entry.value from Recharts may show dataKey like "real")
              // Deduplicate by dataKey to prevent duplicates
              const seen = new Set<string>()
              const lineEntries = payload?.filter((entry) => {
                const dataKey = entry.dataKey as string
                if ((dataKey === 'nominal' || dataKey === 'real') && !seen.has(dataKey)) {
                  seen.add(dataKey)
                  return true
                }
                return false
              }) || []
              const labels: { dataKey: string; label: string; color: string }[] = lineEntries.map(entry => ({
                dataKey: String(entry.dataKey ?? ''),
                label: entry.dataKey === 'nominal' ? 'Névleges érték' : 'Valódi vásárlóérő',
                color: entry.color || colors.text
              }))
              return (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: isMobile ? '16px' : '24px', 
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  paddingLeft: isMobile ? '8px' : '0',
                  paddingRight: isMobile ? '8px' : '0'
                }}>
                  {labels.map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: isMobile ? '6px' : '6px',
                      minHeight: isMobile ? '24px' : 'auto'
                    }}>
                      <span style={{ 
                        width: isMobile ? 14 : 14, 
                        height: isMobile ? 3 : 3, 
                        backgroundColor: item.color, 
                        borderRadius: 1,
                        flexShrink: 0
                      }} />
                      <span style={{ 
                        color: isMobile ? colors.textMobile : colors.text, 
                        fontSize: isMobile ? '12px' : '13px', 
                        fontWeight: '500',
                        lineHeight: 1.2
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
            activeDot={{ r: isMobile ? 8 : 7, stroke: colors.nominal, strokeWidth: 2, fill: '#FFFFFF' }}
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
            activeDot={{ r: isMobile ? 8 : 7, stroke: colors.real, strokeWidth: 2, fill: '#FFFFFF' }}
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
