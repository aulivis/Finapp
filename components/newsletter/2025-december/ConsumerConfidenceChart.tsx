'use client'

import React, { useMemo } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface ConsumerConfidenceChartProps {
  height?: number
}

/**
 * Completely redesigned consumer confidence chart
 * Features:
 * - Modern timeline visualization showing Hungary's position over time
 * - Clear comparison with EU average and top/bottom countries
 * - Visual story of decline and stagnation
 * - Interactive elements with better data presentation
 * - Focus on actionable insights
 */
export default function ConsumerConfidenceChart({ height = 700 }: ConsumerConfidenceChartProps) {
  const isMobile = useIsMobile()

  // Historical data showing Hungary's consumer confidence trend
  const historicalData = useMemo(() => [
    { year: 2022, quarter: 'Q1', score: -18.5, euAverage: 42.3 },
    { year: 2022, quarter: 'Q2', score: -22.1, euAverage: 38.7 },
    { year: 2022, quarter: 'Q3', score: -25.3, euAverage: 35.2 },
    { year: 2022, quarter: 'Q4', score: -26.8, euAverage: 32.1 },
    { year: 2023, quarter: 'Q1', score: -27.2, euAverage: 30.5 },
    { year: 2023, quarter: 'Q2', score: -28.1, euAverage: 28.9 },
    { year: 2023, quarter: 'Q3', score: -28.5, euAverage: 27.4 },
    { year: 2023, quarter: 'Q4', score: -28.9, euAverage: 26.8 },
    { year: 2024, quarter: 'Q1', score: -27.8, euAverage: 28.2 },
    { year: 2024, quarter: 'Q2', score: -26.5, euAverage: 30.1 },
    { year: 2024, quarter: 'Q3', score: -25.1, euAverage: 32.5 },
    { year: 2024, quarter: 'Q4', score: -24.8, euAverage: 35.8 },
    { year: 2025, quarter: 'Q1', score: -25.2, euAverage: 38.2 },
    { year: 2025, quarter: 'Q2', score: -24.9, euAverage: 40.1 },
    { year: 2025, quarter: 'Q3', score: -24.5, euAverage: 41.8 },
    { year: 2025, quarter: 'Q4', score: -24.3, euAverage: 43.2 },
  ], [])

  // Current ranking data (bottom 6 countries)
  const rankingData = useMemo(() => [
    { position: 25, country: 'Románia', score: -15.2, code: 'RO' },
    { position: 26, country: 'Szlovákia', score: -18.5, code: 'SK' },
    { position: 27, country: 'Horvátország', score: -20.1, code: 'HR' },
    { position: 28, country: 'Bulgária', score: -22.8, code: 'BG' },
    { position: 29, country: 'Magyarország', score: -24.3, code: 'HU', isHungary: true },
    { position: 30, country: 'Törökország', score: -34.9, code: 'TR' },
  ], [])

  // Chart dimensions - use height prop
  const chartWidth = isMobile ? 320 : 600
  const timelineHeight = isMobile ? 200 : Math.floor(height * 0.4)
  const rankingHeight = isMobile ? 300 : Math.floor(height * 0.5)

  // Calculate positions for timeline
  const timelinePoints = useMemo(() => {
    const minScore = -35
    const maxScore = 50
    const range = maxScore - minScore
    
    return historicalData.map((point, index) => {
      const x = (index / (historicalData.length - 1)) * (chartWidth - 80)
      const y = timelineHeight - 40 - ((point.score - minScore) / range) * (timelineHeight - 80)
      const euY = timelineHeight - 40 - ((point.euAverage - minScore) / range) * (timelineHeight - 80)
      return { ...point, x, y, euY, index }
    })
  }, [historicalData, chartWidth, timelineHeight])

  return (
    <div
      role="img"
      aria-label="Magyarország fogyasztói bizalom grafikon"
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
        Grafikon Magyarország fogyasztói bizalom változásáról 2022-től 2025-ig.
        Magyarország a 29. helyen áll 30 ország közül, -24,3 ponttal. Csak Törökország előzi meg minket a lista alján.
      </div>
      
      {/* Main Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827',
        marginBottom: spacing.md,
        textAlign: 'center',
      }}>
        Fogyasztói bizalom: 29. hely 30 ország közül
      </h3>

      {/* Key Insight Box - Redesigned */}
      <div style={{
        marginBottom: spacing.xl,
        padding: spacing.lg,
        background: `linear-gradient(135deg, ${colors.errorLight} 0%, rgba(254, 242, 242, 0.6) 100%)`,
        borderRadius: borderRadius.lg,
        border: `2px solid ${colors.error}`,
        textAlign: 'center',
        boxShadow: `0 4px 6px -1px rgba(239, 68, 68, 0.1)`,
      }}>
        <div style={{
          fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.error,
          marginBottom: spacing.xs,
        }}>
          -24,3 pont
        </div>
        <div style={{
          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          marginBottom: spacing.xs,
        }}>
          A fogyasztók pesszimisták
        </div>
        <div style={{
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
        }}>
          Ez azt jelenti, hogy többen félnek a jövőtől, mint akik optimisták
        </div>
      </div>

      {/* Timeline Chart - New Design */}
      <div style={{ marginBottom: spacing['2xl'] }}>
        <h4 style={{
          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: '#111827',
          marginBottom: spacing.sm,
          textAlign: 'center',
        }}>
          Változás 2022 óta
        </h4>
        <p style={{
          fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
          color: colors.text.muted,
          marginBottom: spacing.md,
          textAlign: 'center',
        }}>
          Magyarország vs. EU átlag
        </p>
        
        <div style={{
          width: '100%',
          maxWidth: `${chartWidth}px`,
          margin: '0 auto',
          position: 'relative',
        }}>
          <svg
            width="100%"
            height={timelineHeight}
            viewBox={`0 0 ${chartWidth} ${timelineHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            {/* Grid lines */}
            {[-30, -20, -10, 0, 10, 20, 30, 40].map((score) => {
              const minScore = -35
              const maxScore = 50
              const range = maxScore - minScore
              const y = timelineHeight - 40 - ((score - minScore) / range) * (timelineHeight - 80)
              return (
                <line
                  key={score}
                  x1={40}
                  y1={y}
                  x2={chartWidth - 40}
                  y2={y}
                  stroke={colors.gray[200]}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={0.4}
                />
              )
            })}

            {/* Zero line (neutral confidence) */}
            <line
              x1={40}
              y1={timelineHeight - 40 - ((0 - (-35)) / (50 - (-35))) * (timelineHeight - 80)}
              x2={chartWidth - 40}
              y2={timelineHeight - 40 - ((0 - (-35)) / (50 - (-35))) * (timelineHeight - 80)}
              stroke={colors.gray[400]}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity={0.6}
            />

            {/* EU Average line */}
            <path
              d={`M ${timelinePoints.map(p => `${p.x + 40},${p.euY}`).join(' L ')}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth={isMobile ? 2 : 2.5}
              strokeDasharray="6 4"
              opacity={0.6}
            />

            {/* Hungary line */}
            <path
              d={`M ${timelinePoints.map(p => `${p.x + 40},${p.y}`).join(' L ')}`}
              fill="none"
              stroke={colors.error}
              strokeWidth={isMobile ? 3 : 3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {timelinePoints.map((point, index) => {
              // Show every 4th point or last point
              if (index % 4 !== 0 && index !== timelinePoints.length - 1) return null
              
              return (
                <g key={`point-${index}`}>
                  <circle
                    cx={point.x + 40}
                    cy={point.y}
                    r={isMobile ? 4 : 5}
                    fill={colors.error}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  />
                  {/* Label for key points */}
                  {(index === 0 || index === timelinePoints.length - 1) && (
                    <text
                      x={point.x + 40}
                      y={point.y - 12}
                      textAnchor="middle"
                      fontSize={isMobile ? 10 : 11}
                      fontWeight={typography.fontWeight.bold}
                      fill={colors.error}
                    >
                      {point.score.toFixed(1)}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Y-axis labels */}
            {[-30, -20, -10, 0, 10, 20, 30, 40].map((score) => {
              const minScore = -35
              const maxScore = 50
              const range = maxScore - minScore
              const y = timelineHeight - 40 - ((score - minScore) / range) * (timelineHeight - 80)
              return (
                <text
                  key={`y-label-${score}`}
                  x={35}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={isMobile ? 9 : 10}
                  fill={colors.text.muted}
                >
                  {score}
                </text>
              )
            })}

            {/* X-axis labels (years) */}
            {[0, 4, 8, 12, 15].map((index) => {
              if (index >= timelinePoints.length) return null
              const point = timelinePoints[index]
              return (
                <text
                  key={`x-label-${index}`}
                  x={point.x + 40}
                  y={timelineHeight - 15}
                  textAnchor="middle"
                  fontSize={isMobile ? 9 : 10}
                  fill={colors.text.muted}
                >
                  {point.year} {point.quarter}
                </text>
              )
            })}
          </svg>

          {/* Legend */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: spacing.lg,
            marginTop: spacing.md,
            fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <div style={{
                width: '20px',
                height: '3px',
                backgroundColor: colors.error,
                borderRadius: '2px',
              }} />
              <span style={{ color: colors.text.secondary }}>Magyarország</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <div style={{
                width: '20px',
                height: '3px',
                backgroundColor: colors.primary,
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: colors.primary,
                borderRadius: '2px',
              }} />
              <span style={{ color: colors.text.secondary }}>EU átlag</span>
            </div>
          </div>
        </div>

        {/* Insight Box */}
        <div style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.infoLight,
          borderRadius: borderRadius.md,
          borderLeft: `4px solid ${colors.info}`,
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.relaxed,
        }}>
          <strong style={{ color: colors.text.primary }}>Mit mutat a grafikon?</strong> 
          {' '}Magyarország fogyasztói bizalma 2022 óta mélyen a negatív tartományban van, 
          és bár 2024 végén enyhén javult, továbbra is jelentősen az EU átlaga alatt marad. 
          A különbség 2025-ben is több mint 65 pont.
        </div>
      </div>

      {/* Ranking Chart - Redesigned */}
      <div>
        <h4 style={{
          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: '#111827',
          marginBottom: spacing.sm,
          textAlign: 'center',
        }}>
          Nemzetközi rangsor: A legrosszabb 6 ország
        </h4>
        <p style={{
          fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
          color: colors.text.muted,
          marginBottom: spacing.md,
          textAlign: 'center',
        }}>
          30 ország közül (2025. november)
        </p>

        <div style={{
          width: '100%',
          maxWidth: `${chartWidth}px`,
          margin: '0 auto',
        }}>
          <svg
            width="100%"
            height={rankingHeight}
            viewBox={`0 0 ${chartWidth} ${rankingHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >

            {/* Bars */}
            {rankingData.map((item, index) => {
              const minScore = -40
              const maxScore = 0
              const range = maxScore - minScore
              const barWidth = ((item.score - minScore) / range) * (chartWidth - 120)
              const barHeight = isMobile ? 45 : 50
              const y = 20 + index * (isMobile ? 50 : 55)
              const isHungary = item.isHungary || false

              return (
                <g key={item.position}>
                  {/* Bar background */}
                  <rect
                    x={isMobile ? 40 : 60}
                    y={y}
                    width={chartWidth - (isMobile ? 80 : 120)}
                    height={barHeight}
                    fill={colors.gray[100]}
                    rx={6}
                  />
                  {/* Bar */}
                  <rect
                    x={isMobile ? 40 : 60}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={isHungary ? colors.error : colors.warning}
                    fillOpacity={isHungary ? 1 : 0.7}
                    rx={6}
                  />
                  {/* Bar border for Hungary */}
                  {isHungary && (
                    <rect
                      x={isMobile ? 40 : 60}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill="none"
                      stroke={colors.error}
                      strokeWidth="3"
                      rx={6}
                    />
                  )}
                  {/* Country name */}
                  <text
                    x={isMobile ? 45 : 65}
                    y={y + barHeight / 2}
                    dominantBaseline="middle"
                    fontSize={isMobile ? 13 : 14}
                    fontWeight={isHungary ? typography.fontWeight.bold : typography.fontWeight.medium}
                    fill={isHungary ? '#111827' : '#374151'}
                  >
                    {item.country}
                  </text>
                  {/* Position badge */}
                  <circle
                    cx={chartWidth - (isMobile ? 20 : 35)}
                    cy={y + barHeight / 2}
                    r={isMobile ? 14 : 16}
                    fill={isHungary ? colors.error : colors.gray[400]}
                  />
                  <text
                    x={chartWidth - (isMobile ? 20 : 35)}
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
        </div>

        {/* Explanation Box */}
        <div style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.background.subtle,
          borderRadius: borderRadius.md,
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.relaxed,
        }}>
          <div style={{ marginBottom: spacing.xs }}>
            <strong>Pozitív pontszám</strong> = Az emberek optimisták a jövővel kapcsolatban
          </div>
          <div style={{ marginBottom: spacing.xs }}>
            <strong>Negatív pontszám</strong> = Az emberek félnek a jövőtől
          </div>
          <div style={{ 
            marginTop: spacing.sm, 
            paddingTop: spacing.sm, 
            borderTop: `1px solid ${colors.gray[300]}`,
            fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
            color: colors.text.muted 
          }}>
            EU átlag: ~43 pont | Legmagasabb: Indonézia 63,4 pont | Legalacsonyabb: Törökország -34,9 pont
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
        Forrás: MNB, KSH, ECB, Ipsos
      </div>
    </div>
  )
}
