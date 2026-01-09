'use client'

import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface BarChartData {
  name: string
  nominal: number
  real: number
}

interface ModernBarChartProps {
  nominalValue: number
  realValue: number
  formatCurrency: (value: number) => string
  height?: number
}

/**
 * Modern, accessible bar chart component for comparing nominal and real values
 * Features:
 * - Smooth animations with reduced motion support
 * - Enhanced tooltips with modern design
 * - Accessibility improvements (ARIA labels)
 * - Performance optimizations
 * - Modern color scheme
 */
export default function ModernBarChart({
  nominalValue,
  realValue,
  formatCurrency,
  height = 300
}: ModernBarChartProps) {
  const prefersReducedMotion = useReducedMotion()

  // Prepare data for the chart
  const chartData: BarChartData[] = useMemo(() => [
    {
      name: 'Névleges érték',
      nominal: nominalValue,
      real: 0
    },
    {
      name: 'Inflációval korrigált érték',
      nominal: 0,
      real: realValue
    }
  ], [nominalValue, realValue])

  // Memoize chart configuration for performance
  const chartConfig = useMemo(() => ({
    animationDuration: prefersReducedMotion ? 0 : 800,
    animationEasing: 'ease-out' as const,
    margin: { top: 16, right: 24, left: 24, bottom: 16 }
  }), [prefersReducedMotion])

  // Enhanced tooltip with modern design
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null

    const dataPoint = payload[0].payload as BarChartData
    const value = payload[0].value as number

    if (value === 0) return null

    return (
      <div
        role="tooltip"
        aria-label={`${dataPoint.name}: ${formatCurrency(value)}`}
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
          marginBottom: '8px'
        }}>
          {dataPoint.name}
        </div>
        <div style={{
          fontWeight: '600',
          color: '#111827',
          fontSize: '16px'
        }} className="tabular-nums">
          {formatCurrency(value)}
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
        <BarChart
          data={chartData}
          margin={chartConfig.margin}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={{ stroke: colors.grid }}
            axisLine={{ stroke: colors.grid }}
            aria-label="Érték típusok"
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
            animationDuration={chartConfig.animationDuration}
          />
          <Legend
            wrapperStyle={{ paddingTop: '16px' }}
            formatter={(value) => (
              <span style={{ color: colors.text, fontSize: '13px' }}>{value}</span>
            )}
          />
          <Bar
            dataKey="nominal"
            fill={colors.nominal}
            name="Névleges érték"
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Névleges érték oszlop"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="real"
            fill={colors.real}
            name="Inflációval korrigált érték"
            isAnimationActive={!prefersReducedMotion}
            animationDuration={chartConfig.animationDuration}
            animationEasing={chartConfig.animationEasing}
            aria-label="Inflációval korrigált érték oszlop"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
