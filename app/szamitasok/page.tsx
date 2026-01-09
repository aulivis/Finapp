import React from 'react'
import { hasAccess } from '@/lib/utils/access'
import { getHistoricalInflationData, getProjectedInflationRate, getMacroData, getDataSources } from '@/lib/data/macro-data'
import { getLatestQuarterlySummary } from '@/lib/email/quarterly-summary'
import { isValidEmail } from '@/lib/utils/email'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import AccessGate from '@/components/AccessGate'
import AccessLayout from '@/components/AccessLayout'
import CalculatorsClient from './calculators-client'
import QuarterlyUpdateSummary from '@/components/QuarterlyUpdateSummary'

interface PageProps {
  searchParams: { email?: string }
}

export default async function CalculatorsPage({ searchParams }: PageProps) {
  const email = searchParams.email

  // Validate email parameter
  if (!email || typeof email !== 'string') {
    return <AccessGate />
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return <AccessGate />
  }

  const hasValidAccess = await hasAccess(email)

  if (!hasValidAccess) {
    return <AccessGate />
  }

  // Fetch data server-side for both calculators
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
  const macroData = await getMacroData('HU')
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
    <AccessLayout email={email}>
      {quarterlySummary && (
        <QuarterlyUpdateSummary 
          quarterName={quarterlySummary.quarterName}
          summaryPoints={quarterlySummary.summaryPoints}
        />
      )}
      <CalculatorsClient
        historicalData={historicalData}
        latestYear={latestYear}
        inflationM2Data={inflationM2Data}
        projectedInflation={projectedInflation}
        currentYear={currentYear}
        doNothingM2Data={doNothingM2Data}
        dataSources={dataSources}
      />
      <FooterDisclaimer />
    </AccessLayout>
  )
}
