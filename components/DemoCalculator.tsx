'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'
import ModernBarChart from '@/components/ModernBarChart'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import { MacroData } from '@/lib/types/database'
import { Calculator, Calendar } from 'lucide-react'

const INITIAL_AMOUNT = 1000000 // 1,000,000 HUF
const START_YEAR = 2015
const INITIAL_YEARS = 11
const MAX_YEAR = 2025

interface DemoCalculatorProps {
  macroData?: MacroData[]
  onValuesChange?: (amount: number, startYear: number, endYear: number) => void
}

export default function DemoCalculator({ macroData = [], onValuesChange }: DemoCalculatorProps) {
  const [amount, setAmount] = useState(INITIAL_AMOUNT)
  const [years, setYears] = useState(INITIAL_YEARS)
  
  const startYear = START_YEAR
  const endYear = Math.min(startYear + years - 1, MAX_YEAR)

  // Notify parent of value changes (including on mount)
  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(amount, startYear, endYear)
    }
  }, [amount, startYear, endYear, onValuesChange])

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
      padding: '0 24px'
    }}>
      {/* Simple Inputs Card */}
      <div style={{
        padding: '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#1F2937',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              <Calculator size={16} style={{ color: '#6B7280' }} />
              Összeg
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              min="0"
              step="10000"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontFamily: 'inherit',
                fontWeight: '400'
              }}
              className="tabular-nums"
            />
          </div>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#1F2937',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              <Calendar size={16} style={{ color: '#6B7280' }} />
              Évek száma
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Math.max(1, Math.min(Number(e.target.value) || 1, MAX_YEAR - startYear + 1)))}
              min="1"
              max={MAX_YEAR - startYear + 1}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontFamily: 'inherit',
                fontWeight: '400'
              }}
              className="tabular-nums"
            />
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div style={{
        marginBottom: '32px',
        padding: '32px',
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
          Eredmények ({endYear})
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

        {/* Bar Chart Comparison */}
        <div style={{
          padding: '24px',
          backgroundColor: '#F0FDFA',
          borderRadius: '8px',
          border: '1px solid rgba(45, 212, 191, 0.2)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#1F2937',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Összehasonlítás
          </div>
          <ModernBarChart
            nominalValue={finalNominal}
            realValue={finalReal}
            formatCurrency={formatCurrency}
            height={250}
          />
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
        marginBottom: '32px',
        padding: '32px',
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
        <ModernLineChart
          data={data}
          formatCurrency={formatCurrency}
          height={400}
        />

        {/* M2 Contextual Indicator */}
        {(() => {
          // Try to find M2 data for the end year first, then fall back to latest available year in the period
          let m2Growth: number | null = null
          let m2Year = endYear
          
          const endYearData = macroData.find(d => d.year === endYear)
          if (endYearData?.m2_growth !== null && endYearData?.m2_growth !== undefined) {
            const growth = Number(endYearData.m2_growth)
            if (isFinite(growth)) {
              m2Growth = growth
              m2Year = endYear
            }
          }
          
          // If no M2 data for end year, try to find latest available in the period
          if (m2Growth === null) {
            const periodData = macroData
              .filter(d => d.year >= startYear && d.year <= endYear && d.m2_growth !== null && d.m2_growth !== undefined)
              .sort((a, b) => b.year - a.year)
            
            if (periodData.length > 0) {
              const latestData = periodData[0]
              const growth = Number(latestData.m2_growth)
              if (isFinite(growth)) {
                m2Growth = growth
                m2Year = latestData.year
              }
            }
          }
          
          if (m2Growth === null) return null
          
          return (
            <div style={{
              marginTop: '32px',
              paddingTop: '32px',
              borderTop: '1px solid #E5E7EB'
            }}>
              <M2ContextualIndicatorClient 
                year={m2Year}
                m2Growth={m2Growth}
                periodStartYear={startYear}
                periodEndYear={endYear}
              />
            </div>
          )
        })()}

        {/* Explanation */}
        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: '1px solid #E5E7EB',
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
        </div>
      </div>

    </div>
  )
}
