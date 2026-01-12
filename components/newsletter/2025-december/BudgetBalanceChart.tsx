'use client'

import React from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius } from '@/lib/design-system'

interface BudgetBalanceChartProps {
  height?: number
}

/**
 * Chart showing state budget balance with scale metaphor
 * Features:
 * - Balance scale illustration with revenue vs expenditure
 * - Visual icons representing different budget components
 * - Deficit data boxes
 * - Infographic style design
 */
export default function BudgetBalanceChart({ height = 600 }: BudgetBalanceChartProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const revenueGrowth = 6.3
  const expenditureGrowth = 6.8
  const deficitQ1Q3 = 1.9
  const deficitQ3 = 4.2

  // Calculate scale tilt (expenditure is heavier, so right side is lower)
  const scaleTilt = 8 // degrees tilt to the right

  return (
    <div
      role="img"
      aria-label="Államháztartás mérleg grafikon"
      aria-describedby="budget-chart-description budget-chart-data-source"
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
      <div id="budget-chart-description" className="sr-only">
        Infografika az államháztartás mérlegéről. A mérleg bal oldala a bevételeket mutatja (+6,3% növekedés),
        a jobb oldala a kiadásokat (+6,8% növekedés). A jobb oldal lejjebb van, mert a kiadások gyorsabban nőnek.
        Az első 9 hónapban a hiány 1,9% a GDP-hez képest, a harmadik negyedévben egyedül 4,2%.
      </div>
      
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#111827', // 4.5:1 contrast
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}>
        State Budget: Spending More Than It Earns
      </h3>

      {/* Balance Scale Illustration */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '400px' : `${Math.min(height * 0.75, 450)}px`,
        marginBottom: spacing['2xl'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 450"
          style={{ overflow: 'visible' }}
        >
          {/* Scale base/stand */}
          <g>
            {/* Base triangle */}
            <path
              d="M 280 420 L 320 420 L 300 380 Z"
              fill={colors.gray[400]}
              stroke={colors.gray[500]}
              strokeWidth="2"
            />
            {/* Vertical pole */}
            <line
              x1="300"
              y1="380"
              x2="300"
              y2="200"
              stroke={colors.gray[500]}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Horizontal beam (tilted) */}
            <g transform={`translate(300, 200) rotate(${scaleTilt})`}>
              <line
                x1="-200"
                y1="0"
                x2="200"
                y2="0"
                stroke={colors.gray[600]}
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Center pivot */}
              <circle cx="0" cy="0" r="8" fill={colors.gray[600]} />
            </g>
          </g>

          {/* Left Pan (Revenue) - Higher */}
          <g transform={`translate(300, 200) rotate(${scaleTilt}) translate(-200, 0)`}>
            {/* Pan chain/rope */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="80"
              stroke={colors.gray[500]}
              strokeWidth="3"
            />
            {/* Pan */}
            <g transform="translate(0, 80)">
              <ellipse
                cx="0"
                cy="0"
                rx="90"
                ry="20"
                fill={colors.info}
                stroke={colors.info}
                strokeWidth="2"
                opacity="0.9"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="85"
                ry="18"
                fill="#DBEAFE"
                stroke={colors.info}
                strokeWidth="1"
              />
              
              {/* Revenue Icons */}
              {/* Tax form icon */}
              <g transform="translate(-50, -5)">
                <rect x="-8" y="-8" width="16" height="20" rx="2" fill={colors.info} opacity="0.8" />
                <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="-4" y1="0" x2="2" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="-4" y1="4" x2="3" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
              
              {/* VAT symbol */}
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="6" fill={colors.info} opacity="0.8" />
                <text x="0" y="2" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="bold">ÁFA</text>
              </g>
              
              {/* Corporate tax building */}
              <g transform="translate(50, -5)">
                <rect x="-6" y="2" width="12" height="10" fill={colors.info} opacity="0.8" />
                <polygon points="-6,2 0,-4 6,2" fill={colors.info} opacity="0.8" />
                <rect x="-3" y="5" width="6" height="7" fill="#FFFFFF" opacity="0.6" />
              </g>
              
              {/* Label */}
              <text
                x="0"
                y="25"
                textAnchor="middle"
                fontSize={isMobile ? "12" : "14"}
                fontWeight="bold"
                fill={colors.info}
              >
                Bevétel
              </text>
              <text
                x="0"
                y="38"
                textAnchor="middle"
                fontSize={isMobile ? "11" : "13"}
                fontWeight="600"
                fill={colors.text.primary}
              >
                +{revenueGrowth}%
              </text>
              {/* Upward arrow */}
              <g transform="translate(0, 45)">
                <polygon
                  points="0,-4 -4,2 4,2"
                  fill={colors.success}
                />
              </g>
            </g>
          </g>

          {/* Right Pan (Expenditure) - Lower (heavier) */}
          <g transform={`translate(300, 200) rotate(${-scaleTilt}) translate(200, 0)`}>
            {/* Pan chain/rope */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100"
              stroke={colors.gray[500]}
              strokeWidth="3"
            />
            {/* Pan */}
            <g transform="translate(0, 100)">
              <ellipse
                cx="0"
                cy="0"
                rx="100"
                ry="22"
                fill={colors.error}
                stroke={colors.error}
                strokeWidth="2"
                opacity="0.9"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="95"
                ry="20"
                fill="#FEE2E2"
                stroke={colors.error}
                strokeWidth="1"
              />
              
              {/* Expenditure Icons */}
              {/* Hospital */}
              <g transform="translate(-55, -8)">
                <rect x="-8" y="0" width="16" height="12" rx="1" fill={colors.error} opacity="0.8" />
                <line x1="0" y1="0" x2="0" y2="-6" stroke={colors.error} strokeWidth="2" />
                <circle cx="0" cy="-4" r="2" fill={colors.error} opacity="0.8" />
              </g>
              
              {/* School */}
              <g transform="translate(-15, -8)">
                <rect x="-6" y="2" width="12" height="10" fill={colors.error} opacity="0.8" />
                <polygon points="-6,2 0,-4 6,2" fill={colors.error} opacity="0.8" />
                <line x1="-3" y1="5" x2="3" y2="5" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="-3" y1="8" x2="3" y2="8" stroke="#FFFFFF" strokeWidth="1" />
              </g>
              
              {/* Pension */}
              <g transform="translate(25, -8)">
                <circle cx="0" cy="0" r="6" fill={colors.error} opacity="0.8" />
                <text x="0" y="2" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="bold">Ny</text>
              </g>
              
              {/* Infrastructure */}
              <g transform="translate(60, -8)">
                <rect x="-5" y="2" width="10" height="8" fill={colors.error} opacity="0.8" />
                <line x1="-5" y1="2" x2="0" y2="-3" stroke={colors.error} strokeWidth="1.5" />
                <line x1="5" y1="2" x2="0" y2="-3" stroke={colors.error} strokeWidth="1.5" />
                <line x1="-5" y1="10" x2="5" y2="10" stroke={colors.error} strokeWidth="1.5" />
              </g>
              
              {/* Label */}
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fontSize={isMobile ? "12" : "14"}
                fontWeight="bold"
                fill={colors.error}
              >
                Kiadás
              </text>
              <text
                x="0"
                y="41"
                textAnchor="middle"
                fontSize={isMobile ? "11" : "13"}
                fontWeight="600"
                fill={colors.text.primary}
              >
                +{expenditureGrowth}%
              </text>
              {/* Upward arrow */}
              <g transform="translate(0, 48)">
                <polygon
                  points="0,-4 -4,2 4,2"
                  fill={colors.error}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Deficit Data Boxes */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: spacing.lg,
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        {/* Q1-Q3 Deficit Box */}
        <div style={{
          flex: 1,
          padding: spacing.xl,
          backgroundColor: colors.gray[100],
          borderRadius: borderRadius.lg,
          border: `2px solid ${colors.gray[300]}`,
          textAlign: 'center',
          minHeight: isMobile ? '120px' : '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: '#6B7280', // 4.5:1 contrast
            marginBottom: spacing.sm,
          }}>
            Jan-Sep 2025
          </div>
          <div style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: '#111827', // 4.5:1 contrast
            marginBottom: spacing.xs,
          }}>
            {deficitQ1Q3}%
          </div>
          <div style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            color: '#374151', // 4.5:1 contrast
            fontWeight: typography.fontWeight.medium,
          }}>
            hiány a GDP-hez képest
          </div>
        </div>

        {/* Q3 Alone Deficit Box */}
        <div style={{
          flex: 1,
          padding: spacing.xl,
          backgroundColor: colors.errorLight,
          borderRadius: borderRadius.lg,
          border: `2px solid ${colors.error}`,
          textAlign: 'center',
          minHeight: isMobile ? '120px' : '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: '#6B7280', // 4.5:1 contrast
            marginBottom: spacing.sm,
          }}>
            Q3 2025 egyedül
          </div>
          <div style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: '#DC2626', // Darker red for 4.5:1 contrast
            marginBottom: spacing.xs,
          }}>
            {deficitQ3}%
          </div>
          <div style={{
            fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
            color: '#374151', // 4.5:1 contrast
            fontWeight: typography.fontWeight.medium,
          }}>
            hiány a GDP-hez képest
          </div>
        </div>
      </div>

      {/* Context Information */}
      <div style={{
        marginTop: spacing.xl,
        padding: spacing.lg,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.md,
        fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
        color: '#374151', // 4.5:1 contrast
        lineHeight: 1.6,
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: spacing.xs }}>
          <strong style={{ color: '#111827' }}>Bevétel növekedés:</strong> +{revenueGrowth}% (2024-hez képest)
        </div>
        <div>
          <strong style={{ color: '#111827' }}>Kiadás növekedés:</strong> +{expenditureGrowth}% (2024-hez képest)
        </div>
        <div style={{
          marginTop: spacing.sm,
          paddingTop: spacing.sm,
          borderTop: `1px solid ${colors.gray[300]}`,
          fontSize: isMobile ? '11px' : '12px',
          color: '#6B7280', // 4.5:1 contrast
        }}>
          A kiadások gyorsabban nőnek, mint a bevételek, ami a költségvetési hiány növekedéséhez vezet.
        </div>
      </div>

      {/* Data Source Credit */}
      <div
        id="budget-chart-data-source"
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
