'use client'

import React, { useMemo } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface ConsumerConfidenceChartProps {
  height?: number
}

/**
 * Simple horizontal bar chart showing Hungary's consumer confidence ranking
 * Features:
 * - Bottom 6 countries (positions 25-30)
 * - Hungarian country names
 * - Clear visualization of Hungary's position (29th out of 30)
 * - Simple, readable design
 */
export default function ConsumerConfidenceChart({ height = 600 }: ConsumerConfidenceChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Country names in Hungarian
  const countryNames: Record<string, string> = {
    'RO': 'Románia',
    'SK': 'Szlovákia',
    'HR': 'Horvátország',
    'BG': 'Bulgária',
    'HU': 'Magyarország',
    'TR': 'Törökország',
  }

  // Data: Bottom 6 countries (positions 25-30)
  const rankingData = useMemo(() => [
    { position: 25, country: 'Románia', score: -15.2, code: 'RO' },
    { position: 26, country: 'Szlovákia', score: -18.5, code: 'SK' },
    { position: 27, country: 'Horvátország', score: -20.1, code: 'HR' },
    { position: 28, country: 'Bulgária', score: -22.8, code: 'BG' },
    { position: 29, country: 'Magyarország', score: -24.3, code: 'HU', isHungary: true },
    { position: 30, country: 'Törökország', score: -34.9, code: 'TR' },
  ], [])

  const hungaryScore = -24.3
  const minScore = -40
  const maxScore = 0

  // Calculate bar width as percentage
  const calculateBarWidth = (score: number) => {
    return ((score - minScore) / (maxScore - minScore)) * 100
  }

  // Get color for a score
  const getScoreColor = (score: number) => {
    if (score >= -10) return '#F59E0B' // Yellow
    return '#EF4444' // Red
  }

  const chartHeight = rankingData.length * (isMobile ? 50 : 60)
  const barMaxWidth = isMobile ? 250 : 350

  return (
    <div
      role="img"
      aria-label="Magyarország fogyasztói bizalom rangsor grafikon"
      aria-describedby="confidence-chart-description confidence-chart-data-source"
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
      <div id="confidence-chart-description" className="sr-only">
        Grafikon Magyarország fogyasztói bizalom rangsoráról. Magyarország a 29. helyen áll 30 ország közül,
        -24,3 ponttal. Csak Törökország előzi meg minket a lista alján.
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827',
        marginBottom: spacing.lg,
        textAlign: 'center',
      }}>
        Magyarország: 29. hely 30-ból
      </h3>

      {/* Subtitle */}
      <p style={{
        fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
        color: colors.text.secondary,
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        Fogyasztói bizalom: a legrosszabb 6 ország (30-ból)
      </p>

      {/* Chart */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${barMaxWidth + 120} ${chartHeight}`}
          style={{ overflow: 'visible' }}
        >
          {/* Grid lines */}
          {[-40, -30, -20, -10, 0].map((score, index) => {
            const x = (calculateBarWidth(score) / 100) * barMaxWidth
            return (
              <g key={index}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={chartHeight}
                  stroke={colors.gray[200]}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              </g>
            )
          })}

          {/* Bars */}
          {rankingData.map((item, index) => {
            const barWidth = calculateBarWidth(item.score)
            const barHeight = isMobile ? 40 : 50
            const y = index * (isMobile ? 50 : 60) + 5
            const x = 0
            const color = getScoreColor(item.score)
            const isHungary = item.isHungary || false

            return (
              <g key={item.position}>
                {/* Bar background (full width) */}
                <rect
                  x={x}
                  y={y}
                  width={barMaxWidth}
                  height={barHeight}
                  fill={colors.gray[100]}
                  rx={4}
                />
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={(barWidth / 100) * barMaxWidth}
                  height={barHeight}
                  fill={isHungary ? color : color}
                  fillOpacity={isHungary ? 1 : 0.7}
                  rx={4}
                />
                {/* Bar border for Hungary */}
                {isHungary && (
                  <rect
                    x={x}
                    y={y}
                    width={(barWidth / 100) * barMaxWidth}
                    height={barHeight}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    rx={4}
                  />
                )}
                {/* Country name */}
                <text
                  x={x + 8}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  fontSize={isMobile ? 13 : 14}
                  fontWeight={isHungary ? typography.fontWeight.bold : typography.fontWeight.medium}
                  fill={isHungary ? '#111827' : '#374151'}
                >
                  {item.country}
                </text>
                {/* Score */}
                <text
                  x={(barWidth / 100) * barMaxWidth - 8}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={isMobile ? 13 : 14}
                  fontWeight={typography.fontWeight.bold}
                  fill={isHungary ? '#111827' : '#374151'}
                >
                  {item.score.toFixed(1)}
                </text>
                {/* Position badge */}
                <rect
                  x={barMaxWidth + 16}
                  y={y + barHeight / 2 - 12}
                  width={24}
                  height={24}
                  fill={isHungary ? color : colors.gray[400]}
                  rx={12}
                />
                <text
                  x={barMaxWidth + 28}
                  y={y + barHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isMobile ? 11 : 12}
                  fontWeight={typography.fontWeight.bold}
                  fill="#FFFFFF"
                >
                  {item.position}
                </text>
              </g>
            )
          })}
        </svg>

        {/* X-axis labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: spacing.md,
          paddingLeft: 0,
          paddingRight: 0,
          fontSize: isMobile ? '11px' : '12px',
          color: colors.text.muted,
          maxWidth: `${barMaxWidth}px`,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <span>-40</span>
          <span>-30</span>
          <span>-20</span>
          <span>-10</span>
          <span>0</span>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.background.subtle,
          borderRadius: borderRadius.md,
          fontSize: isMobile ? '12px' : '13px',
          color: colors.text.secondary,
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: spacing.xs }}>
            <strong>EU átlag:</strong> ~45 pont | <strong>Legmagasabb:</strong> Indonézia 63,4 pont
          </div>
          <div style={{ fontSize: isMobile ? '11px' : '12px', color: colors.text.muted }}>
            Minél alacsonyabb a pontszám, annál pesszimistábbak a fogyasztók
          </div>
        </div>
      </div>

      {/* Data Source Credit */}
      <div
        id="confidence-chart-data-source"
        style={{
          marginTop: spacing.lg,
          paddingTop: spacing.md,
          borderTop: `1px solid ${colors.gray[200]}`,
          fontSize: '10px',
          color: '#6B7280',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        Forrás: MNB, KSH, ECB
      </div>
    </div>
  )
}
