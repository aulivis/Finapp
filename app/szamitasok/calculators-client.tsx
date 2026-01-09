'use client'

import { useState, useMemo } from 'react'
import { calculatePersonalInflationImpact, HoldingType, historicalInflation as fallbackData } from '@/lib/data/inflation'
import { calculateDoNothingScenario, RETIREMENT_AGE, DEFAULT_PROJECTED_ANNUAL_INFLATION } from '@/lib/data/retirement'
import DataSourceDisclosure from '@/components/DataSourceDisclosure'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import ModernLineChart from '@/components/ModernLineChart'

interface CalculatorsClientProps {
  email: string
  historicalData: Array<{ year: number; inflationRate: number }>
  latestYear: number
  inflationM2Data: { inflationRate: number; m2Growth: number | null } | null
  projectedInflation: number
  currentYear: number
  doNothingM2Data: { inflationRate: number; m2Growth: number | null } | null
}

export default function CalculatorsClient({
  email,
  historicalData,
  latestYear,
  inflationM2Data,
  projectedInflation,
  currentYear,
  doNothingM2Data
}: CalculatorsClientProps) {
  // Inflation calculator state
  const [amount, setAmount] = useState(1000000)
  const [startYear, setStartYear] = useState(2014)
  const [holdingType, setHoldingType] = useState<HoldingType>('cash')

  // Do-nothing calculator state
  const [currentAge, setCurrentAge] = useState(30)
  const [currentSavings, setCurrentSavings] = useState(5000000)
  const [monthlySavings, setMonthlySavings] = useState(50000)

  // Use fetched data or fallback to hardcoded
  const historicalInflation = historicalData.length > 0 ? historicalData : fallbackData
  const endYear = Math.max(...historicalInflation.map(d => d.year))
  const availableYears = historicalInflation.map(d => d.year).filter(y => y <= endYear)

  // Inflation calculation
  const inflationCalculation = useMemo(() => {
    const startIndex = historicalInflation.findIndex(d => d.year === startYear)
    if (startIndex === -1) {
      return {
        initialAmount: amount,
        finalNominalValue: amount,
        finalRealValue: amount,
        purchasingPowerLoss: 0,
        purchasingPowerLossPercentage: 0,
        dataPoints: [],
      }
    }

    const HOLDING_TYPE_INTEREST_RATES = {
      cash: 0,
      'low-interest-savings': 2.0,
      'no-yield': 0,
    } as const

    const interestRate = HOLDING_TYPE_INTEREST_RATES[holdingType] / 100
    let currentNominal = amount
    let cumulativeInflation = 1
    const dataPoints: Array<{ year: number; nominal: number; real: number }> = []

    for (let i = startIndex; i < historicalInflation.length && historicalInflation[i].year <= endYear; i++) {
      const { year, inflationRate } = historicalInflation[i]
      
      currentNominal = currentNominal * (1 + interestRate)
      cumulativeInflation *= (1 + inflationRate / 100)
      const real = currentNominal / cumulativeInflation
      
      dataPoints.push({
        year,
        nominal: Math.round(currentNominal),
        real: Math.round(real),
      })
    }

    const finalNominalValue = dataPoints[dataPoints.length - 1]?.nominal || amount
    const finalRealValue = dataPoints[dataPoints.length - 1]?.real || amount
    const purchasingPowerLoss = finalNominalValue - finalRealValue
    const purchasingPowerLossPercentage = (purchasingPowerLoss / finalNominalValue) * 100

    return {
      initialAmount: amount,
      finalNominalValue,
      finalRealValue,
      purchasingPowerLoss,
      purchasingPowerLossPercentage,
      dataPoints,
    }
  }, [amount, startYear, holdingType, historicalInflation, endYear])

  // Do-nothing calculation
  const doNothingCalculation = useMemo(() => {
    const projected = projectedInflation || DEFAULT_PROJECTED_ANNUAL_INFLATION
    return calculateDoNothingScenario(currentAge, currentSavings, monthlySavings, projected)
  }, [currentAge, currentSavings, monthlySavings, projectedInflation])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const formatPercentageWithSign = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const getHoldingTypeDescription = (type: HoldingType): string => {
    switch (type) {
      case 'cash':
        return 'Készpénz formában tartva, nincs kamatbevétel.'
      case 'low-interest-savings':
        return 'Alacsony kamatozású megtakarítási számla, éves 2% kamattal számolva (konzervatív becslés).'
      case 'no-yield':
        return 'Nincs hozam, csak az infláció hatása számít.'
      default:
        return ''
    }
  }


  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Inflation Calculator */}
      <div style={{ marginBottom: '64px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '400',
          marginBottom: '12px',
          color: '#111827'
        }}>
          Személyre szabott inflációs számítás
        </h1>

        <p style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#4B5563',
          marginBottom: '32px'
        }}>
          A számítás mutatja, hogyan változott a pénz vásárlóereje a kiválasztott időszakban. 
          Az infláció és az esetleges kamatbevétel hatása látható.
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
              Kezdeti összeg (HUF)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              min="0"
              step="10000"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
                color: '#111827'
                maxWidth: '300px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '400',
              fontSize: '14px',
              color: '#111827'
            }}>
              Kezdő év
            </label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
                color: '#111827'
                maxWidth: '200px',
                backgroundColor: '#FFFFFF'
              }}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '0' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '400',
              fontSize: '14px',
              color: '#111827'
            }}>
              Tartási forma
            </label>
            <select
              value={holdingType}
              onChange={(e) => setHoldingType(e.target.value as HoldingType)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
                color: '#111827'
                maxWidth: '400px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="cash">Készpénz</option>
              <option value="low-interest-savings">Alacsony kamatozású megtakarítás</option>
              <option value="no-yield">Nincs hozam</option>
            </select>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              marginTop: '8px',
              lineHeight: '1.5'
            }}>
              {getHoldingTypeDescription(holdingType)}
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
              Ugyanaz az összeg <strong>{formatPercentage(inflationCalculation.purchasingPowerLossPercentage)}-kal kevesebb</strong> vásárlóerővel rendelkezik 
              a(z) {startYear} évhez képest ({startYear} → {endYear}).
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '2px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
                Kezdeti összeg ({startYear})
              </div>
              <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                {formatCurrency(inflationCalculation.initialAmount)}
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '2px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
                Névleges érték ({startYear} → {endYear})
              </div>
              <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                {formatCurrency(inflationCalculation.finalNominalValue)}
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '2px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
                Reál érték ({startYear} → {endYear})
              </div>
              <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                {formatCurrency(inflationCalculation.finalRealValue)}
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '2px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
                Vásárlóerő veszteség ({startYear} → {endYear})
              </div>
              <div style={{ fontSize: '22px', fontWeight: '400', color: '#111827' }} className="tabular-nums">
                -{formatCurrency(inflationCalculation.purchasingPowerLoss)}
              </div>
              <div style={{ fontSize: '14px', color: '#4B5563', marginTop: '4px' }}>
                ({formatPercentage(inflationCalculation.purchasingPowerLossPercentage)})
              </div>
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            borderLeft: '3px solid #4B5563',
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#4B5563'
          }}>
            <p style={{ margin: '0 0 12px 0 }}>
              A <strong>névleges érték</strong> az összeg aktuális forintban kifejezett értéke (kamatbevétellel együtt, ha van). 
              A <strong>reál érték</strong> azt mutatja, hogy mennyi vásárlóerőt képvisel ez az összeg az infláció figyelembevételével. 
              A <strong>vásárlóerő veszteség</strong> a névleges és reál érték közötti különbség, amely az infláció hatását mutatja.
            </p>
            <p style={{ margin: '12px 0 0 0 }}>
              A számítás konzervatív feltételezéseken alapul, és csak az infláció és az esetleges alacsony kamatbevétel hatását veszi figyelembe.
            </p>
          </div>
        </div>

        {/* Chart */}
        {inflationCalculation.dataPoints.length > 0 ? (
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
              data={inflationCalculation.dataPoints}
              formatCurrency={formatCurrency}
              height={400}
            />
          </div>
        )}

        {/* Contextual Explanation */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          fontSize: '14px',
          lineHeight: '1.7',
          color: '#495057'
        }}>
            <p style={{ margin: '0 0 12px 0 }}>
              A számítás a KSH által közzétett éves inflációs adatokon alapul. Az infláció hatása kumulatív: 
              minél hosszabb időtartam alatt tartja a pénzt, annál nagyobb a vásárlóerő veszteség. 
              Ez egy matematikai tény, nem vélemény vagy ajánlás.
            </p>
            <p style={{ margin: '12px 0 0 0 }}>
              A múltbeli adatok nem garantálják a jövőbeli eredményeket. A számítás nem veszi figyelembe 
              az egyéni körülményeket, adózási tényezőket vagy piaci kockázatokat.
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

        {/* Data Source Disclosure */}
        <DataSourceDisclosure country="HU" />

        {/* M2 Contextual Indicator */}
        {inflationM2Data && inflationM2Data.m2Growth !== null && (
          <M2ContextualIndicatorClient 
            year={latestYear}
            m2Growth={inflationM2Data.m2Growth}
            periodStartYear={startYear}
            periodEndYear={endYear}
          />
        )}
      </div>

      {/* Do-Nothing Calculator */}
      <div style={{ marginBottom: '32px', paddingTop: '48px', borderTop: '1px solid #E5E7EB' }}>
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
                color: '#111827'
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
                color: '#111827'
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
                color: '#111827'
                maxWidth: '300px'
              }}
            />
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              marginTop: '8px'
            }}>
              A számítás feltételezi, hogy ezt az összeget minden hónapban félreteszi, kamat nélkül. 
              Az infláció számítása az elmúlt évek átlagos inflációs adatain alapul: {(projectedInflation || DEFAULT_PROJECTED_ANNUAL_INFLATION).toFixed(1)}% évente (történelmi átlag).
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

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '2px',
                borderLeft: '3px solid #4B5563',
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#4B5563'
              }}>
                <p style={{ margin: '0 0 12px 0 }}>
                  A <strong>névleges érték</strong> a megtakarítások és havi hozzájárulások összege a nyugdíjkorhatár eléréséig. 
                  A <strong>reál vásárlóerő</strong> azt mutatja, hogy mennyi vásárlóerőt képvisel ez az összeg az infláció figyelembevételével. 
                  A <strong>vásárlóerő változás</strong> azt mutatja, hogy a jelenlegi megtakarítások vásárlóerejéhez képest mennyi változás következik be.
                </p>
                <p style={{ margin: '12px 0 0 0 }}>
                  A számítás feltételezi, hogy a megtakarításokat készpénzben vagy kamatmentes számlán tartja, 
                  és nincs kamatbevétel vagy hozam. Az infláció számítása az elmúlt évek történelmi átlagos inflációs adatain alapul: {(projectedInflation || DEFAULT_PROJECTED_ANNUAL_INFLATION).toFixed(1)}% évente.
                </p>
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
        </div>

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

        {/* Contextual Explanation */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#F9FAFB',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          fontSize: '14px',
          lineHeight: '1.7',
          color: '#495057'
        }}>
            <p style={{ margin: '0 0 12px 0 }}>
              Ez a számítás bemutatja, hogyan változna a megtakarítások vásárlóereje, ha rendszeresen félretesz pénzt, de azt nem fekteti be, 
              hanem készpénzben vagy kamatmentes számlán tartja. Az infláció folyamatosan csökkenti a pénz vásárlóerejét, 
              ami azt jelenti, hogy ugyanaz az összeg egyre kevesebbet ér. A számítás történelmi inflációs adatok átlagán alapul.
            </p>
            <p style={{ margin: '12px 0 0 0 }}>
              Az infláció hatása kumulatív: minél hosszabb időtartam alatt tartja a pénzt kamat nélkül, 
              annál nagyobb a vásárlóerő veszteség. Ez egy matematikai tény, nem vélemény vagy ajánlás.
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

        {/* Data Source Disclosure */}
        <DataSourceDisclosure country="HU" />

        {/* M2 Contextual Indicator */}
        {doNothingM2Data && doNothingM2Data.m2Growth !== null && (
          <M2ContextualIndicatorClient 
            year={currentYear}
            m2Growth={doNothingM2Data.m2Growth}
          />
        )}
      </div>
    </div>
  )
}
