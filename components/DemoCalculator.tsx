'use client'

import React, { useMemo, useState } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'
import ModernBarChart from '@/components/ModernBarChart'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import { MacroData } from '@/lib/types/database'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { Maximize2, X } from 'lucide-react'

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
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: isMobile ? '0 16px' : '0 24px'
    }}>
      {/* Detailed Breakdown */}
      <div style={{
        marginBottom: isMobile ? '24px' : '32px',
        padding: isMobile ? '20px' : '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '24px',
          color: '#111827',
          lineHeight: '1.3'
        }}>
          Eredmények
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: '400' }}>
              Névleges érték
            </div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: '#111827' }} className="tabular-nums">
              {formatCurrency(finalNominal)}
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: '400' }}>
              Inflációval korrigált érték
            </div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: '#111827' }} className="tabular-nums">
              {formatCurrency(finalReal)}
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: '400' }}>
              Vásárlóerő veszteség
            </div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: '#111827' }} className="tabular-nums">
              -{formatCurrency(loss)}
            </div>
            <div style={{ fontSize: '14px', color: '#1F2937', marginTop: '4px', fontWeight: '400' }}>
              ({lossPercentage}%)
            </div>
          </div>
        </div>

        {/* Bar Chart Comparison - Mobile: scrollable/expandable */}
        <div style={{
          padding: isMobile ? '16px' : '24px',
          backgroundColor: '#F0FDFA',
          borderRadius: '8px',
          border: '1px solid rgba(45, 212, 191, 0.2)',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#1F2937',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Összehasonlítás
          </div>
          <div 
            style={isMobile ? {
              overflowX: 'auto',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              minWidth: 'min-content',
              margin: '0 -8px',
              padding: '0 8px',
              cursor: 'pointer'
            } : undefined}
            onClick={isMobile ? () => setExpandedChart('bar') : undefined}
            role={isMobile ? 'button' : undefined}
            tabIndex={isMobile ? 0 : undefined}
            onKeyDown={isMobile ? (e) => e.key === 'Enter' && setExpandedChart('bar') : undefined}
            aria-label={isMobile ? 'Érdemes megnyitás a nagyobb nézethez' : undefined}
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
                gap: '6px',
                marginTop: '12px',
                fontSize: '12px',
                color: '#6B7280'
              }}>
                <Maximize2 size={14} />
                Érintse meg a nagyításért
              </div>
            )}
          </div>
        </div>

        {/* Output Section - Plain Language Result */}
        <div style={{
          padding: '32px',
          backgroundColor: '#F0FDFA',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '2px solid rgba(45, 212, 191, 0.3)',
          textAlign: 'center',
          marginTop: '24px',
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
            background: 'linear-gradient(90deg, #2DD4BF 0%, #14B8A6 100%)'
          }} />
          <p style={{
            fontSize: '20px',
            lineHeight: '1.7',
            color: '#111827',
            margin: '0',
            fontWeight: '400'
          }}>
            Ugyanaz az összeg <strong>{lossPercentage}%-kal kevesebb</strong> vásárlóerővel rendelkezik, mint {startYear}-ben ({startYear}–{endYear}).
          </p>
        </div>
      </div>

      {/* Chart and Explanation in same card */}
      <div style={{
        marginBottom: isMobile ? '24px' : '32px',
        padding: isMobile ? '20px' : '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '24px',
          color: '#111827',
          lineHeight: '1.3'
        }}>
          Vásárlóerő alakulása
        </h3>
        <div 
          style={isMobile ? {
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            margin: '0 -8px',
            padding: '0 8px',
            cursor: 'pointer'
          } : undefined}
          onClick={isMobile ? () => setExpandedChart('line') : undefined}
          role={isMobile ? 'button' : undefined}
          tabIndex={isMobile ? 0 : undefined}
          onKeyDown={isMobile ? (e) => e.key === 'Enter' && setExpandedChart('line') : undefined}
          aria-label={isMobile ? 'Érdemes megnyitás a nagyobb nézethez' : undefined}
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
              gap: '6px',
              marginTop: '12px',
              marginBottom: '8px',
              fontSize: '12px',
              color: '#6B7280'
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
          marginTop: '32px',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#1F2937',
          fontWeight: '400'
        }}>
          <p style={{ margin: '0 0 16px 0', fontWeight: '600', color: '#111827', fontSize: '16px' }}>
            A számítás magyarázata
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            Ez az ábra azt mutatja meg, hogyan változott <strong>{formatCurrency(amount)} vásárlóereje {startYear} és {endYear} között</strong> az infláció hatására.
            A pénz <strong>névleges értéke változatlan</strong>, miközben a <strong>valós vásárlóerő fokozatosan csökken</strong>.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            A bemutatott eredmény <strong>egy általános példa</strong>. Fix összeget és időszakot használ, és kizárólag azt szemlélteti, hogyan hat az infláció a pénz értékére hosszabb távon.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            A számítás <strong>nem személyre szabott</strong>. Nem veszi figyelembe az egyéni megtakarításokat, jövedelmet vagy befektetési döntéseket. Célja a mechanizmus bemutatása, nem pénzügyi tanácsadás.
          </p>
          <p style={{ margin: '0 0 20px 0' }}>
            Az adatok forrása a <strong>KSH hivatalos éves inflációs statisztikái</strong>.
            A múltbeli adatok nem jelentenek garanciát a jövőbeli értékekre.
          </p>
          <p style={{
            margin: '20px 0 0 0',
            padding: '16px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#1F2937',
            fontWeight: '400'
          }}>
            <strong style={{ fontWeight: '600' }}>Az itt megjelenített adatok múltbeli, aggregált mutatókon alapulnak. Nem előrejelzések, és nem minősülnek pénzügyi tanácsnak.</strong>
          </p>
          <img 
            src="/mi-tortenik.png" 
            alt="Mi történik"
            style={{
              width: '100%',
              height: 'auto',
              marginTop: '24px'
            }}
          />
        </div>
      </div>

      {/* Mobile: Expanded chart overlay */}
      {isMobile && expandedChart && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setExpandedChart(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setExpandedChart(null)}
          aria-label="Bezárás"
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '20px',
              maxWidth: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedChart(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Bezárás"
            >
              <X size={20} />
            </button>
            <div style={{ paddingRight: '40px' }}>
              {expandedChart === 'line' && (
                <>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                    Vásárlóerő alakulása
                  </h4>
                  <div style={{ width: '100%', minWidth: 450 }}>
                    <ModernLineChart
                      data={data}
                      formatCurrency={formatCurrency}
                      height={350}
                      isMobile={false}
                    />
                  </div>
                </>
              )}
              {expandedChart === 'bar' && (
                <>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                    Összehasonlítás
                  </h4>
                  <div style={{ width: '100%', minWidth: 320 }}>
                    <ModernBarChart
                      nominalValue={finalNominal}
                      realValue={finalReal}
                      formatCurrency={formatCurrency}
                      height={280}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
