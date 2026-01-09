'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts'
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
  height = 400
}: ModernLineChartProps) {
  const prefersReducedMotion = useReducedMotion()

  // Memoize chart configuration for performance
  const chartConfig = useMemo(() => ({
    animationDuration: prefersReducedMotion ? 0 : 800,
    animationEasing: 'ease-out' as const,
    margin: { top: 16, right: 24, left: 24, bottom: 16 }
  }), [prefersReducedMotion])

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
          {payload.map((entry, index) => {
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
                    {entry.name || (isNominal ? 'Névleges érték' : 'Reál vásárlóerő')}:
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

  // Modern color scheme with better contrast
  const colors = {
    nominal: '#111827', // Dark gray for nominal
    real: '#6B7280',    // Medium gray for real
    grid: '#E5E7EB',    // Light gray for grid
    text: '#4B5563'     // Medium gray for text
  }

  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={chartConfig.margin}
        >
          <defs>
            {/* Gradient for nominal line */}
            <linearGradient id="nominalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.nominal} stopOpacity={0.1} />
              <stop offset="95%" stopColor={colors.nominal} stopOpacity={0} />
            </linearGradient>
            {/* Gradient for real line */}
            <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.real} stopOpacity={0.1} />
              <stop offset="95%" stopColor={colors.real} stopOpacity={0} />
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
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            label={{
              value: 'Év',
              position: 'insideBottom',
              offset: -8,
              style: { fill: colors.text, fontSize: 12 }
            }}
            aria-label="Évek"
          />
          <YAxis
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            label={{
              value: 'Forint',
              angle: -90,
              position: 'insideLeft',
              style: { fill: colors.text, fontSize: 12 }
            }}
            aria-label="Forint értékek"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: colors.nominal,
              strokeWidth: 1,
              strokeDasharray: '5 5',
              opacity: 0.3
            }}
            animationDuration={chartConfig.animationDuration}
          />
          <Legend
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="line"
            formatter={(value) => (
              <span style={{ color: colors.text, fontSize: '13px' }}>{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="nominal"
            stroke={colors.nominal}
            strokeWidth={2}
            name="Névleges érték"
            dot={{ r: 4, fill: colors.nominal, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, stroke: colors.nominal, strokeWidth: 2 }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Névleges érték vonal"
          />
          <Line
            type="monotone"
            dataKey="real"
            stroke={colors.real}
            strokeWidth={2}
            name="Reál vásárlóerő"
            dot={{ r: 4, fill: colors.real, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, stroke: colors.real, strokeWidth: 2 }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Reál vásárlóerő vonal"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
