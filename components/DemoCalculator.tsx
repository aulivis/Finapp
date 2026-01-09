'use client'

import React, { useState, useMemo } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import { MacroData } from '@/lib/types/database'
import { Calculator, Calendar } from 'lucide-react'

const INITIAL_AMOUNT = 1000000 // 1,000,000 HUF
const START_YEAR = 2014
const INITIAL_YEARS = 10
const MAX_YEAR = 2024

interface DemoCalculatorProps {
  macroData?: MacroData[]
}

export default function DemoCalculator({ macroData = [] }: DemoCalculatorProps) {
  const [amount, setAmount] = useState(INITIAL_AMOUNT)
  const [years, setYears] = useState(INITIAL_YEARS)
  
  const startYear = START_YEAR
  const endYear = Math.min(startYear + years - 1, MAX_YEAR)

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

      {/* Output Section - Plain Language Result */}
      <div style={{
        padding: '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
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
              Névleges érték ({startYear} → {endYear})
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
              Inflációval korrigált érték ({startYear} → {endYear})
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
              Vásárlóerő veszteség ({startYear} → {endYear})
            </div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: '#111827' }} className="tabular-nums">
              -{formatCurrency(loss)}
            </div>
            <div style={{ fontSize: '14px', color: '#1F2937', marginTop: '4px', fontWeight: '400' }}>
              ({lossPercentage}%)
            </div>
          </div>
        </div>

        {/* Simple Visual Comparison */}
        <div style={{
          padding: '24px',
          backgroundColor: '#F9FAFB',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#1F2937',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Összehasonlítás
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                height: '8px',
                backgroundColor: '#1F2937',
                borderRadius: '4px',
                width: '100%'
              }} />
              <div style={{
                fontSize: '13px',
                color: '#1F2937',
                marginTop: '6px',
                fontWeight: '400'
              }}>
                Névleges érték
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                height: '8px',
                backgroundColor: '#1F2937',
                borderRadius: '4px',
                width: `${(finalReal / finalNominal) * 100}%`
              }} />
              <div style={{
                fontSize: '13px',
                color: '#1F2937',
                marginTop: '6px',
                fontWeight: '400'
              }}>
                Inflációval korrigált érték
              </div>
            </div>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#1F2937',
            margin: '0',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            A névleges érték változatlan marad ({formatCurrency(amount)}), 
            azonban az inflációval korrigált érték {lossPercentage}%-kal alacsonyabb 
            ({formatCurrency(finalReal)}).
          </p>
        </div>
      </div>

      {/* Chart */}
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
      </div>

      {/* M2 Contextual Indicator */}
      {(() => {
        const endYearData = macroData.find(d => d.year === endYear)
        const m2Growth = endYearData?.m2_growth !== null && endYearData?.m2_growth !== undefined 
          ? Number(endYearData.m2_growth) 
          : null
        
        if (m2Growth === null) return null
        
        return (
          <div style={{
            marginBottom: '32px'
          }}>
            <M2ContextualIndicatorClient 
              year={endYear}
              m2Growth={m2Growth}
              periodStartYear={startYear}
              periodEndYear={endYear}
            />
          </div>
        )
      })()}

      {/* Explanation */}
      <div style={{
        padding: '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#1F2937',
        fontWeight: '400'
      }}>
        <p style={{ margin: '0 0 16px 0', fontWeight: '600', color: '#111827', fontSize: '16px' }}>
          A számítás magyarázata
        </p>
        <p style={{ margin: '0 0 16px 0' }}>
          A számítás bemutatja, hogyan változott {formatCurrency(amount)} vásárlóereje 
          {startYear} és {endYear} között. A névleges érték változatlan marad, 
          azonban az infláció hatására a reál vásárlóerő csökken.
        </p>
        <p style={{ margin: '0 0 20px 0' }}>
          A számítás a KSH által közzétett éves inflációs adatokon alapul. 
          Ez egy általános példa, nem személyre szabott számítás.
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
  )
}
