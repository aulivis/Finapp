'use client'

import React, { useState, useMemo } from 'react'
import { calculatePurchasingPower, historicalInflation } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'

const INITIAL_AMOUNT = 1000000 // 1,000,000 HUF
const START_YEAR = 2014
const MIN_YEAR = 2014
const MAX_YEAR = 2024

export default function DemoCalculator() {
  const [selectedEndYear, setSelectedEndYear] = useState(MAX_YEAR)

  const data = useMemo(() => {
    return calculatePurchasingPower(INITIAL_AMOUNT, START_YEAR, selectedEndYear)
  }, [selectedEndYear])

  const finalNominal = data[data.length - 1]?.nominal || INITIAL_AMOUNT
  const finalReal = data[data.length - 1]?.real || INITIAL_AMOUNT
  const loss = finalNominal - finalReal
  const lossPercentage = ((loss / finalNominal) * 100).toFixed(1)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }


  // Generate available years
  const availableYears = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i)

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '32px',
      backgroundColor: '#FFFFFF',
      borderRadius: '2px',
      border: '1px solid #E5E7EB'
    }}>
      {/* Title */}
      <h2 style={{
        marginBottom: '8px',
        fontSize: '20px',
        fontWeight: '400',
        color: '#111827'
      }}>
        Általános példa számítás
      </h2>

      {/* Label */}
      <p style={{
        marginBottom: '24px',
        fontSize: '13px',
        color: '#4B5563',
        fontStyle: 'italic'
      }}>
        Ez egy általános példa, nem személyre szabott számítás.
      </p>

      {/* Fixed Parameters Display */}
      <div style={{
        marginBottom: '24px',
        padding: '20px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>
              Kezdeti összeg
            </div>
            <div style={{ fontSize: '18px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
              {formatCurrency(INITIAL_AMOUNT)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>
              Kezdő év
            </div>
            <div style={{ fontSize: '18px', fontWeight: '400', color: '#212529' }}>
              {START_YEAR}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>
              Végződő év
            </div>
            <select
              value={selectedEndYear}
              onChange={(e) => setSelectedEndYear(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                cursor: 'pointer'
              }}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '400',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Eredmények ({selectedEndYear})
        </h3>

        {/* Main Human-Readable Message */}
        <div style={{
          padding: '20px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#111827',
            margin: '0',
            fontWeight: '400'
          }}>
            Ugyanaz az összeg <strong>{lossPercentage}%-kal kevesebb</strong> vásárlóerővel rendelkezik 
            a(z) {START_YEAR} évhez képest ({START_YEAR} → {selectedEndYear}).
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
              Névleges érték ({START_YEAR} → {selectedEndYear})
            </div>
            <div style={{ fontSize: '24px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
              {formatCurrency(finalNominal)}
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
              Inflációval korrigált érték ({START_YEAR} → {selectedEndYear})
            </div>
            <div style={{ fontSize: '24px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
              {formatCurrency(finalReal)}
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
              Vásárlóerő veszteség ({START_YEAR} → {selectedEndYear})
            </div>
            <div style={{ fontSize: '24px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
              -{formatCurrency(loss)}
            </div>
            <div style={{ fontSize: '14px', color: '#495057', marginTop: '4px' }}>
              ({lossPercentage}%)
            </div>
          </div>
        </div>

        {/* Simple Visual Comparison */}
        <div style={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#4B5563',
            marginBottom: '12px'
          }}>
            Összehasonlítás
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                height: '8px',
                backgroundColor: '#4B5563',
                borderRadius: '2px',
                width: '100%'
              }} />
              <div style={{
                fontSize: '12px',
                color: '#4B5563',
                marginTop: '4px'
              }}>
                Névleges érték
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                height: '8px',
                backgroundColor: '#4B5563',
                borderRadius: '2px',
                width: `${(finalReal / finalNominal) * 100}%`
              }} />
              <div style={{
                fontSize: '12px',
                color: '#4B5563',
                marginTop: '4px'
              }}>
                Inflációval korrigált érték
              </div>
            </div>
          </div>
          <p style={{
            fontSize: '13px',
            color: '#4B5563',
            margin: '0',
            lineHeight: '1.6'
          }}>
            A névleges érték változatlan marad ({formatCurrency(INITIAL_AMOUNT)}), 
            azonban az inflációval korrigált érték {lossPercentage}%-kal alacsonyabb 
            ({formatCurrency(finalReal)}).
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '400',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Vásárlóerő alakulása
        </h3>
        <ModernLineChart
          data={data}
          formatCurrency={formatCurrency}
          height={400}
        />
      </div>

      {/* Explanation */}
      <div style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '2px',
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#4B5563'
      }}>
        <p style={{ margin: '0 0 12px 0', fontWeight: '400', color: '#212529' }}>
          A számítás magyarázata
        </p>
        <p style={{ margin: '0 0 12px 0' }}>
          A számítás bemutatja, hogyan változott {formatCurrency(INITIAL_AMOUNT)} vásárlóereje 
          {START_YEAR} és {selectedEndYear} között. A névleges érték változatlan marad, 
          azonban az infláció hatására a reál vásárlóerő csökken.
        </p>
        <p style={{ margin: '0 0 16px 0' }}>
          A számítás a KSH által közzétett éves inflációs adatokon alapul. 
          Ez egy általános példa, nem személyre szabott számítás.
        </p>
        <p style={{
          margin: '16px 0 0 0',
          padding: '12px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '2px',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#4B5563'
        }}>
          <strong>Az itt megjelenített adatok múltbeli, aggregált mutatókon alapulnak. Nem előrejelzések, és nem minősülnek pénzügyi tanácsnak.</strong>
        </p>
      </div>
    </div>
  )
}
