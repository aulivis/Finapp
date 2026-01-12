'use client'

import React, { useMemo } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface ConsumerConfidenceChartProps {
  height?: number
}

/**
 * Chart showing Hungary's consumer confidence ranking (29th out of 30)
 * Features:
 * - Semicircle gauge showing Hungary's score (-24.3)
 * - Bottom 6 countries ranking list
 * - Small world map visualization
 * - Traffic light color scheme (red/yellow/green)
 * - Mobile-optimized vertical layout
 */
export default function ConsumerConfidenceChart({ height = 700 }: ConsumerConfidenceChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Data: Bottom 6 countries (positions 25-30)
  const rankingData = useMemo(() => [
    { position: 25, country: 'Romania', score: -15.2, code: 'RO' },
    { position: 26, country: 'Slovakia', score: -18.5, code: 'SK' },
    { position: 27, country: 'Croatia', score: -20.1, code: 'HR' },
    { position: 28, country: 'Bulgaria', score: -22.8, code: 'BG' },
    { position: 29, country: 'Hungary', score: -24.3, code: 'HU', isHungary: true },
    { position: 30, country: 'Turkey', score: -34.9, code: 'TR' },
  ], [])

  const hungaryScore = -24.3
  const minScore = -40
  const maxScore = 80
  const euAverage = 45
  const highestScore = 63.4 // Indonesia

  // Calculate gauge angle (semicircle: 0° to 180°)
  // Map score from -40 to 80 to angle from 0° to 180°
  const calculateAngle = (score: number) => {
    const normalized = (score - minScore) / (maxScore - minScore)
    return normalized * 180 // 0° = left (min), 180° = right (max)
  }

  const hungaryAngle = calculateAngle(hungaryScore)

  // Color zones
  const colorZones = {
    red: { min: -40, max: -10, color: '#EF4444' },
    yellow: { min: -10, max: 20, color: '#F59E0B' },
    green: { min: 20, max: 80, color: '#10B981' },
  }

  // Get color for a score
  const getScoreColor = (score: number) => {
    if (score >= colorZones.green.min) return colorZones.green.color
    if (score >= colorZones.yellow.min) return colorZones.yellow.color
    return colorZones.red.color
  }

  // Generate gauge arc path
  const generateGaugeArc = (startAngle: number, endAngle: number, radius: number, innerRadius: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    
    const x1 = 200 + radius * Math.cos(startRad)
    const y1 = 200 + radius * Math.sin(startRad)
    const x2 = 200 + radius * Math.cos(endRad)
    const y2 = 200 + radius * Math.sin(endRad)
    
    const x3 = 200 + innerRadius * Math.cos(endRad)
    const y3 = 200 + innerRadius * Math.sin(endRad)
    const x4 = 200 + innerRadius * Math.cos(startRad)
    const y4 = 200 + innerRadius * Math.sin(startRad)
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`
  }

  const gaugeRadius = isMobile ? 120 : 140
  const gaugeInnerRadius = isMobile ? 80 : 100

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
        -24,3 ponttal. Csak Törökország előzi meg minket a lista alján. A grafikon egy félkörös mérőt mutat,
        amely a pesszimista zónában (-40-től -10-ig piros) mutatja Magyarországot.
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827', // 4.5:1 contrast
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        Hungary's Consumer Mood: 29th out of 30
      </h3>

      {/* World Map Visualization (Simplified) */}
      <div style={{
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          padding: spacing.md,
          backgroundColor: colors.background.subtle,
          borderRadius: borderRadius.md,
        }}>
          <div style={{
            fontSize: isMobile ? '10px' : '11px',
            color: colors.text.muted,
            marginBottom: spacing.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            Global Ranking
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.sm,
            flexWrap: 'wrap',
          }}>
            {/* Simplified map representation */}
            <div style={{
              width: isMobile ? '200px' : '250px',
              height: isMobile ? '100px' : '120px',
              position: 'relative',
              backgroundColor: colors.background.subtle,
              borderRadius: borderRadius.md,
              border: `2px solid ${colors.gray[300]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Simplified country shapes */}
              <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ opacity: 0.3 }}>
                {/* Simplified Europe shape */}
                <path
                  d="M 30 40 Q 50 30 70 40 Q 90 35 110 40 Q 130 45 150 40 Q 170 35 180 40 L 180 60 Q 170 65 150 60 Q 130 65 110 60 Q 90 65 70 60 Q 50 70 30 60 Z"
                  fill={colors.gray[300]}
                  stroke={colors.gray[400]}
                  strokeWidth="1"
                />
              </svg>
              {/* Hungary highlight */}
              <div style={{
                position: 'absolute',
                left: '45%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                backgroundColor: '#EF4444',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }} />
              <div style={{
                position: 'absolute',
                left: '45%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '25px',
                fontSize: '10px',
                fontWeight: '600',
                color: '#EF4444',
                whiteSpace: 'nowrap',
              }}>
                HU
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Gauge and Ranking */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: spacing.xl,
        alignItems: isMobile ? 'center' : 'flex-start',
      }}>
        {/* Left: Semicircle Gauge */}
        <div style={{
          flex: isMobile ? '1' : '1',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
            <div style={{
              fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: '#111827', // 4.5:1 contrast
              marginBottom: spacing.md,
              textAlign: 'center',
            }}>
              Magyarország: -24.3 pont
            </div>
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <svg
              width="100%"
              height={isMobile ? '200px' : '240px'}
              viewBox="0 0 400 200"
              style={{ overflow: 'visible' }}
            >
              {/* Background arc (full semicircle) */}
              <path
                d={generateGaugeArc(0, 180, gaugeRadius, gaugeInnerRadius)}
                fill={colors.gray[200]}
                opacity={0.3}
              />
              
              {/* Red zone (-40 to -10) */}
              <path
                d={generateGaugeArc(0, 54, gaugeRadius, gaugeInnerRadius)}
                fill={colorZones.red.color}
                opacity={0.6}
              />
              
              {/* Yellow zone (-10 to 20) */}
              <path
                d={generateGaugeArc(54, 108, gaugeRadius, gaugeInnerRadius)}
                fill={colorZones.yellow.color}
                opacity={0.6}
              />
              
              {/* Green zone (20 to 80) */}
              <path
                d={generateGaugeArc(108, 180, gaugeRadius, gaugeInnerRadius)}
                fill={colorZones.green.color}
                opacity={0.6}
              />
              
              {/* Score markers */}
              {[-40, -20, 0, 20, 40, 60, 80].map((score, index) => {
                const angle = calculateAngle(score)
                const rad = ((angle - 90) * Math.PI) / 180
                const x = 200 + (gaugeRadius + 15) * Math.cos(rad)
                const y = 200 + (gaugeRadius + 15) * Math.sin(rad)
                
                return (
                  <g key={index}>
                    <line
                      x1={200 + gaugeRadius * Math.cos(rad)}
                      y1={200 + gaugeRadius * Math.sin(rad)}
                      x2={200 + (gaugeRadius + 10) * Math.cos(rad)}
                      y2={200 + (gaugeRadius + 10) * Math.sin(rad)}
                      stroke={colors.gray[400]}
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fill={colors.text.secondary}
                      fontWeight="500"
                    >
                      {score}
                    </text>
                  </g>
                )
              })}
              
              {/* Hungary pointer */}
              <g>
                <line
                  x1="200"
                  y1="200"
                  x2={200 + gaugeRadius * Math.cos(((hungaryAngle - 90) * Math.PI) / 180)}
                  y2={200 + gaugeRadius * Math.sin(((hungaryAngle - 90) * Math.PI) / 180)}
                  stroke={colorZones.red.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx={200 + gaugeRadius * Math.cos(((hungaryAngle - 90) * Math.PI) / 180)}
                  cy={200 + gaugeRadius * Math.sin(((hungaryAngle - 90) * Math.PI) / 180)}
                  r="6"
                  fill={colorZones.red.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
              
              {/* Center dot */}
              <circle cx="200" cy="200" r="4" fill={colors.gray[600]} />
            </svg>
            
            {/* Reference points */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: spacing.md,
              fontSize: isMobile ? '10px' : '11px',
              color: colors.text.muted,
            }}>
              <div>
                <span style={{ color: colorZones.red.color, fontWeight: '600' }}>●</span> Pesszimista
              </div>
              <div>
                <span style={{ color: colorZones.yellow.color, fontWeight: '600' }}>●</span> Semleges
              </div>
              <div>
                <span style={{ color: colorZones.green.color, fontWeight: '600' }}>●</span> Optimista
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ranking List */}
        <div style={{
          flex: isMobile ? '1' : '1',
          width: '100%',
        }}>
          <div style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: '#111827', // 4.5:1 contrast
            marginBottom: spacing.md,
            textAlign: 'center',
          }}>
            Alulról 6. hely (25-30)
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.sm,
          }}>
            {rankingData.map((item, index) => (
              <div
                key={item.position}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  padding: spacing.md,
                  backgroundColor: item.isHungary ? '#FEE2E2' : colors.background.subtle,
                  borderRadius: borderRadius.md,
                  border: item.isHungary ? `2px solid ${colorZones.red.color}` : `1px solid ${colors.gray[200]}`,
                  transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  borderRadius: '50%',
                  backgroundColor: item.isHungary ? colorZones.red.color : colors.gray[400],
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: typography.fontWeight.bold,
                  flexShrink: 0,
                }}>
                  {item.position}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                    fontWeight: item.isHungary ? typography.fontWeight.bold : typography.fontWeight.medium,
                    color: item.isHungary ? '#DC2626' : '#111827', // Darker red and black for 4.5:1 contrast
                    marginBottom: '2px',
                  }}>
                    {item.country}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '11px' : '12px',
                    color: '#6B7280', // 4.5:1 contrast
                  }}>
                    {item.code}
                  </div>
                </div>
                <div style={{
                  fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                  fontWeight: typography.fontWeight.bold,
                  color: getScoreColor(item.score) === colorZones.green.color ? '#059669' : 
                         getScoreColor(item.score) === colorZones.yellow.color ? '#D97706' : '#DC2626', // Darker colors for contrast
                  minWidth: isMobile ? '50px' : '60px',
                  textAlign: 'right',
                }}>
                  {item.score > 0 ? '+' : ''}{item.score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Context info */}
          <div style={{
            marginTop: spacing.lg,
            padding: spacing.md,
            backgroundColor: colors.background.subtle,
            borderRadius: borderRadius.md,
            fontSize: isMobile ? '11px' : '12px',
            color: colors.text.secondary,
            lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: spacing.xs }}>
              <strong>EU átlag:</strong> ~{euAverage} pont
            </div>
            <div>
              <strong>Legmagasabb:</strong> Indonézia {highestScore} pont
            </div>
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
