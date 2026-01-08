'use client'

import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculatePurchasingPower, historicalInflation } from '@/lib/data/inflation'

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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '12px',
          border: '1px solid #E5E7EB',
          borderRadius: '2px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '400', color: '#111827' }}>
            {payload[0].payload.year}
          </p>
          <p style={{ margin: '4px 0', color: '#4B5563', fontSize: '13px' }}>
            Névleges: <span className="tabular-nums">{formatCurrency(payload[0].value)}</span>
          </p>
          <p style={{ margin: '4px 0', color: '#4B5563', fontSize: '13px' }}>
            Inflációval korrigált: <span className="tabular-nums">{formatCurrency(payload[1].value)}</span>
          </p>
        </div>
      )
    }
    return null
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
                backgroundColor: '#FFFFFF',
                color: '#111827'
                borderRadius: '2px',
                backgroundColor: '#ffffff',
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
              Névleges érték
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
              Inflációval korrigált érték
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
              Vásárlóerő veszteség
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
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="year" 
                stroke="#111827"
                label={{ value: 'Év', position: 'insideBottom', offset: -5, style: { fill: '#4B5563' } }}
              />
              <YAxis 
                stroke="#111827"
                label={{ value: 'Forint', angle: -90, position: 'insideLeft', style: { fill: '#4B5563' } }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="nominal" 
                stroke="#111827" 
                strokeWidth={1.5}
                name="Névleges érték"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="real" 
                stroke="#6B7280" 
                strokeWidth={1.5}
                name="Inflációval korrigált érték"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
        <p style={{ margin: '0' }}>
          A számítás a KSH által közzétett éves inflációs adatokon alapul. 
          Ez egy általános példa, nem személyre szabott számítás.
        </p>
      </div>
    </div>
  )
}
