'use client'

import React from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system'

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
  const isMobile = useIsMobile()

  const revenueGrowth = 6.3
  const expenditureGrowth = 6.8
  const deficitQ1Q3 = 1.9
  const deficitQ3 = 4.2

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
        marginBottom: spacing['2xl'],
        textAlign: 'center',
      }}>
        Államháztartás: Többet költ, mint amennyit keres
      </h3>

      {/* Revenue vs Expenditure Comparison */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: spacing.xl,
        marginBottom: spacing['2xl'],
      }}>
        {/* Revenue Card */}
        <div style={{
          flex: 1,
          padding: spacing['2xl'],
          backgroundColor: colors.infoLight,
          borderRadius: borderRadius.xl,
          border: `2px solid ${colors.info}`,
          boxShadow: shadows.md,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative background pattern */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: colors.info,
            opacity: 0.1,
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: colors.info,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                💰
              </div>
              <div>
                <div style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.muted,
                  marginBottom: spacing.xs,
                }}>
                  Bevétel
                </div>
                <div style={{
                  fontSize: typography.fontSize['3xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.primary,
                }}>
                  +{revenueGrowth}%
                </div>
              </div>
            </div>
            
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              A bevételek növekedése 2024-hez képest
            </div>
          </div>
        </div>

        {/* Expenditure Card */}
        <div style={{
          flex: 1,
          padding: spacing['2xl'],
          backgroundColor: colors.errorLight,
          borderRadius: borderRadius.xl,
          border: `2px solid ${colors.error}`,
          boxShadow: shadows.md,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative background pattern */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: colors.error,
            opacity: 0.1,
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: colors.error,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                📊
              </div>
              <div>
                <div style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.muted,
                  marginBottom: spacing.xs,
                }}>
                  Kiadás
                </div>
                <div style={{
                  fontSize: typography.fontSize['3xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.primary,
                }}>
                  +{expenditureGrowth}%
                </div>
              </div>
            </div>
            
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              A kiadások növekedése 2024-hez képest
            </div>
          </div>
        </div>
      </div>

      {/* Deficit Indicator */}
      <div style={{
        marginBottom: spacing['2xl'],
        padding: spacing.xl,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.xl,
        border: `2px dashed ${colors.error}40`,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.muted,
          marginBottom: spacing.sm,
        }}>
          Különbség
        </div>
        <div style={{
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.error,
          marginBottom: spacing.xs,
        }}>
          +{expenditureGrowth - revenueGrowth}%
        </div>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.secondary,
        }}>
          A kiadások {expenditureGrowth - revenueGrowth} százalékponttal gyorsabban nőnek
        </div>
      </div>

      {/* Deficit Data Boxes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: spacing.xl,
        marginBottom: spacing['2xl'],
      }}>
        {/* Q1-Q3 Deficit Box */}
        <div style={{
          padding: spacing['2xl'],
          background: `linear-gradient(135deg, ${colors.gray[50]} 0%, ${colors.background.paper} 100%)`,
          borderRadius: borderRadius.xl,
          border: `2px solid ${colors.gray[200]}`,
          boxShadow: shadows.md,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(to right, ${colors.gray[400]}, ${colors.gray[300]})`,
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              marginBottom: spacing.sm,
              fontWeight: typography.fontWeight.medium,
            }}>
              Jan-Sep 2025
            </div>
            <div style={{
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.xs,
              lineHeight: 1,
            }}>
              {deficitQ1Q3}%
            </div>
            <div style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              fontWeight: typography.fontWeight.medium,
            }}>
              hiány a GDP-hez képest
            </div>
          </div>
        </div>

        {/* Q3 Alone Deficit Box */}
        <div style={{
          padding: spacing['2xl'],
          background: `linear-gradient(135deg, ${colors.errorLight} 0%, ${colors.background.paper} 100%)`,
          borderRadius: borderRadius.xl,
          border: `2px solid ${colors.error}`,
          boxShadow: shadows.lg,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(to right, ${colors.error}, ${colors.error}dd)`,
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              marginBottom: spacing.sm,
              fontWeight: typography.fontWeight.medium,
            }}>
              Q3 2025 egyedül
            </div>
            <div style={{
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.error,
              marginBottom: spacing.xs,
              lineHeight: 1,
            }}>
              {deficitQ3}%
            </div>
            <div style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              fontWeight: typography.fontWeight.medium,
            }}>
              hiány a GDP-hez képest
            </div>
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
