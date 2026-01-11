import React from 'react'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import CalculatorsWrapper from '@/components/CalculatorsWrapper'
import { getMacroData } from '@/lib/data/macro-data'
import { getHistoricalInflationData, getProjectedInflationRate, getDataSources } from '@/lib/data/macro-data'
import { getLatestQuarterlySummary } from '@/lib/email/quarterly-summary'

export default async function Home() {
  // Fetch M2 data for the calculator
  const macroData = await getMacroData('HU')
  
  // Fetch data server-side for calculators
  let historicalData: Array<{ year: number; inflationRate: number }>
  try {
    historicalData = await getHistoricalInflationData('HU')
  } catch (error) {
    console.error('Error fetching inflation data:', error)
    historicalData = []
  }

  let projectedInflation
  try {
    projectedInflation = await getProjectedInflationRate('HU')
  } catch (error) {
    console.error('Error fetching projected inflation:', error)
    projectedInflation = 4.0 // Default fallback
  }

  // Get M2 data for contextual indicators
  const latestYear = historicalData.length > 0 
    ? Math.max(...historicalData.map(d => d.year), new Date().getFullYear())
    : new Date().getFullYear()
  const currentYear = new Date().getFullYear()
  const latestYearData = macroData.find(d => d.year === latestYear)
  const currentYearData = macroData.find(d => d.year === currentYear)
  
  const latestInflationRate = latestYearData?.inflation_rate && isFinite(Number(latestYearData.inflation_rate))
    ? Number(latestYearData.inflation_rate)
    : null
  const latestM2Growth = latestYearData?.m2_growth && isFinite(Number(latestYearData.m2_growth))
    ? Number(latestYearData.m2_growth)
    : null
  const inflationM2Data = latestYearData && latestInflationRate !== null ? {
    inflationRate: latestInflationRate,
    m2Growth: latestM2Growth
  } : null

  const currentInflationRate = currentYearData?.inflation_rate && isFinite(Number(currentYearData.inflation_rate))
    ? Number(currentYearData.inflation_rate)
    : null
  const currentM2Growth = currentYearData?.m2_growth && isFinite(Number(currentYearData.m2_growth))
    ? Number(currentYearData.m2_growth)
    : null
  const doNothingM2Data = currentYearData && currentInflationRate !== null ? {
    inflationRate: currentInflationRate,
    m2Growth: currentM2Growth
  } : null

  // Get latest quarterly summary
  const quarterlySummary = await getLatestQuarterlySummary()

  // Get data sources
  const dataSources = await getDataSources('HU')

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #F9FAFB 0%, #F3F4F6 100%)',
      padding: '0'
    }}>
      {/* Hero and Calculator sections - Client component for state management */}
      <LandingPageClient macroData={macroData} />

      {/* Calculators Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '64px 0'
      }}>
        {quarterlySummary && (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px 32px 24px'
          }}>
            <CalculatorsWrapper
              historicalData={historicalData}
              latestYear={latestYear}
              inflationM2Data={inflationM2Data}
              projectedInflation={projectedInflation}
              currentYear={currentYear}
              doNothingM2Data={doNothingM2Data}
              dataSources={dataSources}
              quarterlySummary={quarterlySummary}
            />
          </div>
        )}
        {!quarterlySummary && (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <CalculatorsWrapper
              historicalData={historicalData}
              latestYear={latestYear}
              inflationM2Data={inflationM2Data}
              projectedInflation={projectedInflation}
              currentYear={currentYear}
              doNothingM2Data={doNothingM2Data}
              dataSources={dataSources}
            />
          </div>
        )}
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
