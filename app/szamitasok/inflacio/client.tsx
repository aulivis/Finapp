'use client'

import { useState, useMemo } from 'react'
import { HoldingType, historicalInflation as fallbackData } from '@/lib/data/inflation'
import DataSourceDisclosureClient from '@/components/DataSourceDisclosureClient'
import M2ContextualIndicatorClient from '@/components/M2ContextualIndicatorClient'
import ModernLineChart from '@/components/ModernLineChart'

interface PersonalInflationCalculatorClientProps {
  initialData: Array<{ year: number; inflationRate: number }>
  m2Data: { inflationRate: number; m2Growth: number | null } | null
  latestYear: number
  email: string
  dataSources: string[]
}

export default function PersonalInflationCalculatorClient({
  initialData,
  m2Data,
  latestYear,
  email,
  dataSources
}: PersonalInflationCalculatorClientProps) {
  const [amount, setAmount] = useState(1000000)
  const [startYear, setStartYear] = useState(2014)
  const [holdingType, setHoldingType] = useState<HoldingType>('cash')

  const historicalInflation = initialData.length > 0 ? initialData : fallbackData
  const endYear = Math.max(...historicalInflation.map(d => d.year))
  const availableYears = historicalInflation.map(d => d.year).filter(y => y <= endYear)

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getHoldingTypeDescription = (type: HoldingType): string => {
    switch (type) {
      case 'cash':
        return 'Készpénz formában tartva, nincs kamatbevétel.';
      case 'low-interest-savings':
        return 'Alacsony kamatozású megtakarítási számla, éves 2% kamattal számolva (konzervatív becslés).';
      case 'no-yield':
        return 'Nincs hozam, csak az infláció hatása számít.';
      default:
        return '';
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
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
              color: '#111827',
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
              color: '#111827',
              maxWidth: '200px'
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
              color: '#111827',
              maxWidth: '400px'
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
      </div>

      {/* Chart */}
      {inflationCalculation.dataPoints.length > 0 && (
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

      <DataSourceDisclosureClient sources={dataSources} />

      {m2Data && m2Data.m2Growth !== null && (
        <M2ContextualIndicatorClient 
          year={latestYear}
          m2Growth={m2Data.m2Growth}
          periodStartYear={startYear}
          periodEndYear={endYear}
        />
      )}
    </div>
  );
}
