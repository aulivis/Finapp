'use client'

import React, { useMemo, useState } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'
import ModernBarChart from '@/components/ModernBarChart'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import { MacroData } from '@/lib/types/database'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { Maximize2 } from 'lucide-react'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import ChartOverlay from '@/components/ui/ChartOverlay'

const START_YEAR = 2015
const MAX_YEAR = 2025

interface DemoCalculatorProps {
  macroData?: MacroData[]
  initialAmount?: number
  initialYears?: number
}

export default function DemoCalculator({ 
  macroData = [], 
  initialAmount = 1000000,
  initialYears = 11
}: DemoCalculatorProps) {
  const amount = initialAmount
  const years = initialYears
  const isMobile = useIsMobile(768)
  const [expandedChart, setExpandedChart] = useState<'line' | 'bar' | null>(null)
  
  // When years change, keep endYear at MAX_YEAR and adjust startYear
  const endYear = MAX_YEAR
  const startYear = Math.max(START_YEAR, endYear - years + 1)

  const data = useMemo(() => {
    return calculatePurchasingPower(amount, startYear, endYear)
  }, [amount, startYear, endYear])

  const finalNominal = data[data.length - 1]?.nominal || amount
  const finalReal = data[data.length - 1]?.real || amount
  const loss = finalNominal - finalReal
  const lossPercentage = ((loss / finalNominal) * 100).toFixed(1)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        {/* Detailed Breakdown */}
        <Card style={{ marginBottom: isMobile ? spacing.xl : spacing['2xl'] }}>
          <h3 style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.xl,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            Eredmények
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing.xl,
            marginBottom: spacing.xl
          }}>
            <StatCard
              label="Névleges érték"
              value={finalNominal}
              formatter={formatCurrency}
            />
            <StatCard
              label="Inflációval korrigált érték"
              value={finalReal}
              formatter={formatCurrency}
            />
            <StatCard
              label="Vásárlóerő veszteség"
              value={loss}
              formatter={(v) => `-${formatCurrency(v)}`}
              subtitle={`(${lossPercentage}%)`}
            />
          </div>

          {/* Bar Chart Comparison - Mobile: scrollable/expandable */}
          <div style={{
            padding: isMobile ? spacing.lg : spacing.xl,
            backgroundColor: colors.primaryLight,
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.primaryBorder}`,
            position: 'relative'
          }}>
            <div style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              marginBottom: spacing.lg,
              fontWeight: typography.fontWeight.medium
            }}>
              Összehasonlítás
            </div>
            <div 
              style={isMobile ? {
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                minWidth: 'min-content',
                margin: `0 -${spacing.xs}`,
                padding: `0 ${spacing.xs}`,
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              } : undefined}
              onClick={isMobile ? () => setExpandedChart('bar') : undefined}
              role={isMobile ? 'button' : undefined}
              tabIndex={isMobile ? 0 : undefined}
              onKeyDown={isMobile ? (e) => e.key === 'Enter' && setExpandedChart('bar') : undefined}
              aria-label={isMobile ? 'Érdemes megnyitás a nagyobb nézethez' : undefined}
              onTouchStart={(e) => {
                if (isMobile) {
                  const touch = e.touches[0]
                  const target = e.currentTarget
                  const startX = touch.clientX
                  const startScroll = target.scrollLeft
                  
                  const handleMove = (moveEvent: TouchEvent) => {
                    const deltaX = moveEvent.touches[0].clientX - startX
                    target.scrollLeft = startScroll - deltaX
                  }
                  
                  const handleEnd = () => {
                    document.removeEventListener('touchmove', handleMove)
                    document.removeEventListener('touchend', handleEnd)
                  }
                  
                  document.addEventListener('touchmove', handleMove, { passive: true })
                  document.addEventListener('touchend', handleEnd)
                }
              }}
            >
              <div style={{ minWidth: isMobile ? 320 : undefined }}>
                <ModernBarChart
                  nominalValue={finalNominal}
                  realValue={finalReal}
                  formatCurrency={formatCurrency}
                  height={isMobile ? 220 : 250}
                />
              </div>
              {isMobile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.xs,
                  marginTop: spacing.md,
                  fontSize: typography.fontSize.xs,
                  color: colors.text.muted
                }}>
                  <Maximize2 size={14} />
                  Érintse meg a nagyításért
                </div>
              )}
            </div>
          </div>

          {/* Output Section - Plain Language Result */}
          <div style={{
            padding: spacing['2xl'],
            backgroundColor: colors.primaryLight,
            borderRadius: borderRadius.lg,
            boxShadow: shadows.md,
            border: `2px solid ${colors.primaryBorder}`,
            textAlign: 'center',
            marginTop: spacing.xl,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`
            }} />
            <p style={{
              fontSize: typography.fontSize['2xl'],
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.primary,
              margin: '0',
              fontWeight: typography.fontWeight.normal
            }}>
              Ugyanaz az összeg <strong>{lossPercentage}%-kal kevesebb</strong> vásárlóerővel rendelkezik, mint {startYear}-ben ({startYear}–{endYear}).
            </p>
          </div>
        </Card>

        {/* Chart and Explanation in same card */}
        <Card style={{ marginBottom: isMobile ? spacing.xl : spacing['2xl'] }}>
          <h3 style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.xl,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            Vásárlóerő alakulása
          </h3>
          <div 
            style={isMobile ? {
              overflowX: 'auto',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              margin: `0 -${spacing.xs}`,
              padding: `0 ${spacing.xs}`,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            } : undefined}
            onClick={isMobile ? () => setExpandedChart('line') : undefined}
            role={isMobile ? 'button' : undefined}
            tabIndex={isMobile ? 0 : undefined}
            onKeyDown={isMobile ? (e) => e.key === 'Enter' && setExpandedChart('line') : undefined}
            aria-label={isMobile ? 'Érdemes megnyitás a nagyobb nézethez' : undefined}
            onTouchStart={(e) => {
              if (isMobile) {
                const touch = e.touches[0]
                const target = e.currentTarget
                const startX = touch.clientX
                const startScroll = target.scrollLeft
                
                const handleMove = (moveEvent: TouchEvent) => {
                  const deltaX = moveEvent.touches[0].clientX - startX
                  target.scrollLeft = startScroll - deltaX
                }
                
                const handleEnd = () => {
                  document.removeEventListener('touchmove', handleMove)
                  document.removeEventListener('touchend', handleEnd)
                }
                
                document.addEventListener('touchmove', handleMove, { passive: true })
                document.addEventListener('touchend', handleEnd)
              }
            }}
          >
            <div style={{ minWidth: isMobile ? 500 : undefined }}>
              <ModernLineChart
                data={data}
                formatCurrency={formatCurrency}
                height={isMobile ? 320 : 400}
                isMobile={isMobile}
              />
            </div>
            {isMobile && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                marginTop: spacing.md,
                marginBottom: spacing.xs,
                fontSize: typography.fontSize.xs,
                color: colors.text.muted
              }}>
                <Maximize2 size={14} />
                Érintse meg vagy görgessen a teljes ábra megtekintéséhez
              </div>
            )}
          </div>

        {/* M2 Contextual Indicator */}
        {(() => {
          // Calculate cumulative M2 growth from startYear to endYear
          // M2 growth is annual percentage, so cumulative = (1 + g1/100) * (1 + g2/100) * ... - 1
          const periodM2Data = macroData
            .filter(d => d.year >= startYear && d.year <= endYear && d.m2_growth !== null && d.m2_growth !== undefined)
            .sort((a, b) => a.year - b.year)
            .map(d => Number(d.m2_growth))
            .filter(growth => isFinite(growth))
          
          if (periodM2Data.length === 0) return null
          
          // Calculate cumulative growth: multiply (1 + growth/100) for each year
          const cumulativeMultiplier = periodM2Data.reduce((acc, growth) => acc * (1 + growth / 100), 1)
          const cumulativeGrowth = (cumulativeMultiplier - 1) * 100
          
          return (
            <div style={{
              marginTop: '32px'
            }}>
              <M2ContextualIndicatorClient 
                year={endYear}
                m2Growth={cumulativeGrowth}
                periodStartYear={startYear}
                periodEndYear={endYear}
                isCumulative={true}
              />
            </div>
          )
        })()}

          {/* Explanation - No border/line between M2 card and this section */}
          <div style={{
            marginTop: spacing['2xl'],
            fontSize: typography.fontSize.md,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            fontWeight: typography.fontWeight.normal
          }}>
            <p style={{ margin: `0 0 ${spacing.lg} 0`, fontWeight: typography.fontWeight.semibold, color: colors.text.primary, fontSize: typography.fontSize.xl }}>
              A számítás magyarázata
            </p>
            <p style={{ margin: `0 0 ${spacing.lg} 0` }}>
              Ez az ábra azt mutatja meg, hogyan változott <strong>{formatCurrency(amount)} vásárlóereje {startYear} és {endYear} között</strong> az infláció hatására.
              A pénz <strong>névleges értéke változatlan</strong>, miközben a <strong>valós vásárlóerő fokozatosan csökken</strong>.
            </p>
            <p style={{ margin: `0 0 ${spacing.lg} 0` }}>
              A bemutatott eredmény <strong>egy általános példa</strong>. Fix összeget és időszakot használ, és kizárólag azt szemlélteti, hogyan hat az infláció a pénz értékére hosszabb távon.
            </p>
            <p style={{ margin: `0 0 ${spacing.lg} 0` }}>
              A számítás <strong>nem személyre szabott</strong>. Nem veszi figyelembe az egyéni megtakarításokat, jövedelmet vagy befektetési döntéseket. Célja a mechanizmus bemutatása, nem pénzügyi tanácsadás.
            </p>
            <p style={{ margin: `0 0 ${spacing.xl} 0` }}>
              Az adatok forrása a <strong>KSH hivatalos éves inflációs statisztikái</strong>.
              A múltbeli adatok nem jelentenek garanciát a jövőbeli értékekre.
            </p>
            <p style={{
              margin: `${spacing.xl} 0 0 0`,
              padding: spacing.lg,
              backgroundColor: colors.background.subtle,
              borderRadius: borderRadius.md,
              fontSize: typography.fontSize.base,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.secondary,
              fontWeight: typography.fontWeight.normal
            }}>
              <strong style={{ fontWeight: typography.fontWeight.semibold }}>Az itt megjelenített adatok múltbeli, aggregált mutatókon alapulnak. Nem előrejelzések, és nem minősülnek pénzügyi tanácsnak.</strong>
            </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '0',
            paddingTop: '0'
          }}>
            <img 
              src="/mi-tortenik.png" 
              alt="Mi történik"
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>

          </div>
        </Card>
      </div>

      {/* Mobile: Expanded chart overlay */}
      <ChartOverlay
        isOpen={isMobile && expandedChart === 'line'}
        onClose={() => setExpandedChart(null)}
        title="Vásárlóerő alakulása"
      >
        <div style={{ width: '100%', minWidth: 450 }}>
          <ModernLineChart
            data={data}
            formatCurrency={formatCurrency}
            height={350}
            isMobile={false}
          />
        </div>
      </ChartOverlay>

      <ChartOverlay
        isOpen={isMobile && expandedChart === 'bar'}
        onClose={() => setExpandedChart(null)}
        title="Összehasonlítás"
      >
        <div style={{ width: '100%', minWidth: 320 }}>
          <ModernBarChart
            nominalValue={finalNominal}
            realValue={finalReal}
            formatCurrency={formatCurrency}
            height={280}
          />
        </div>
      </ChartOverlay>
    </>
  )
}
