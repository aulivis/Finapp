'use client'

import { useState, useMemo } from 'react'
import { calculateDoNothingScenario, RETIREMENT_AGE, DEFAULT_PROJECTED_ANNUAL_INFLATION } from '@/lib/data/retirement'
import DataSourceDisclosureClient from '@/components/DataSourceDisclosureClient'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import ModernLineChart from '@/components/ModernLineChart'

interface DoNothingCalculatorClientProps {
  initialProjectedInflation: number
  m2Data: { inflationRate: number; m2Growth: number | null } | null
  currentYear: number
  email: string
  dataSources: string[]
}

export default function DoNothingCalculatorClient({
  initialProjectedInflation,
  m2Data,
  currentYear,
  email,
  dataSources
}: DoNothingCalculatorClientProps) {
  const [currentAge, setCurrentAge] = useState(30)
  const [currentSavings, setCurrentSavings] = useState(5000000)
  const [monthlySavings, setMonthlySavings] = useState(50000)

  const projectedInflation = initialProjectedInflation || DEFAULT_PROJECTED_ANNUAL_INFLATION

  const doNothingCalculation = useMemo(() => {
    return calculateDoNothingScenario(currentAge, currentSavings, monthlySavings, projectedInflation)
  }, [currentAge, currentSavings, monthlySavings, projectedInflation])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentageWithSign = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: '400',
        marginBottom: '12px',
        color: '#111827'
      }}>
        "Semmit sem csinálok" forgatókönyv
      </h1>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#4B5563',
        marginBottom: '32px'
      }}>
        A számítás bemutatja, hogyan változna a megtakarítások vásárlóereje, ha csak félretesz, de nem fektet be.
        Az infláció hatása látható a nyugdíjkorhatárig tartó időszakban történelmi adatok alapján.
      </p>

      {/* Input Section */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        border: '1px solid #E5E7EB'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '400',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Számítási paraméterek
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '400',
            fontSize: '14px',
            color: '#111827'
          }}>
            Jelenlegi életkor
          </label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Math.max(18, Math.min(100, Number(e.target.value))))}
            min="18"
            max="100"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '2px',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              maxWidth: '200px'
            }}
          />
          <p style={{
            fontSize: '13px',
            color: '#4B5563',
            marginTop: '8px'
          }}>
            A nyugdíjkorhatár {RETIREMENT_AGE} év.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '400',
            fontSize: '14px',
            color: '#111827'
          }}>
            Jelenlegi megtakarítás (HUF)
          </label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
            min="0"
            step="10000"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '2px',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              maxWidth: '300px'
            }}
          />
        </div>

        <div style={{ marginBottom: '0' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '400',
            fontSize: '14px',
            color: '#111827'
          }}>
            Havi megtakarítás (HUF)
          </label>
          <input
            type="number"
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(Math.max(0, Number(e.target.value)))}
            min="0"
            step="1000"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '2px',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              maxWidth: '300px'
            }}
          />
          <p style={{
            fontSize: '13px',
            color: '#4B5563',
            marginTop: '8px'
          }}>
            A számítás feltételezi, hogy ezt az összeget minden hónapban félreteszi, kamat nélkül.
            Az infláció számítása az elmúlt évek átlagos inflációs adatain alapul: {projectedInflation.toFixed(1)}% évente (történelmi átlag).
          </p>
        </div>
      </div>

      {/* Output Section */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        border: '1px solid #E5E7EB'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '400',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Eredmények
        </h2>

        {doNothingCalculation.yearsToRetirement > 0 ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '2px',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
                  Hátralévő évek ({currentYear} → {doNothingCalculation.retirementAge} éves kor)
                </div>
                <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                  {doNothingCalculation.yearsToRetirement} év
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '2px',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
                  Névleges érték ({currentYear} → {doNothingCalculation.retirementAge} éves kor)
                </div>
                <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                  {formatCurrency(doNothingCalculation.nominalValueAtRetirement)}
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '2px',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
                  Reál vásárlóerő ({currentYear} → {doNothingCalculation.retirementAge} éves kor)
                </div>
                <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                  {formatCurrency(doNothingCalculation.realValueAtRetirement)}
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '2px',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
                  Vásárlóerő változás ({currentYear} → {doNothingCalculation.retirementAge} éves kor)
                </div>
                <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                  {formatPercentageWithSign(doNothingCalculation.purchasingPowerChangePercentage)}
                </div>
                <div style={{ fontSize: '14px', color: '#4B5563', marginTop: '4px' }} className="tabular-nums">
                  {formatCurrency(doNothingCalculation.purchasingPowerChange)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <p style={{ color: '#495057', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
              A megadott életkor elérte vagy meghaladta a nyugdíjkorhatárt ({RETIREMENT_AGE} év).
              A számítás csak a nyugdíjkorhatár eléréséig mutatja az eredményeket.
            </p>
          </div>
        )}

        {/* Chart */}
        {doNothingCalculation.yearsToRetirement > 0 && (
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '400',
              marginBottom: '20px',
              color: '#111827'
            }}>
              Vásárlóerő alakulása
            </h2>
            <ModernLineChart
              data={doNothingCalculation.monthlyBreakdown}
              formatCurrency={formatCurrency}
              showAge={true}
              height={400}
            />
          </div>
        )}
      </div>

      <DataSourceDisclosureClient sources={dataSources} />

      {m2Data && m2Data.m2Growth !== null && (
        <M2ContextualIndicatorClient 
          year={currentYear}
          m2Growth={m2Data.m2Growth}
        />
      )}
    </div>
  )
}
