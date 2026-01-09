import { getProjectedInflationRate, getMacroData, getDataSources } from '@/lib/data/macro-data'
import { hasAccess } from '@/lib/utils/access'
import { isValidEmail } from '@/lib/utils/email'
import DoNothingCalculatorClient from './client'
import AccessGate from '@/components/AccessGate'

interface PageProps {
  searchParams: { email?: string }
}

export default async function DoNothingCalculator({ searchParams }: PageProps) {
  const email = searchParams.email

  // Validate email parameter
  if (!email || typeof email !== 'string') {
    return <AccessGate calculatorName='"Semmit sem csinálok" forgatókönyv' />
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return <AccessGate calculatorName='"Semmit sem csinálok" forgatókönyv' />
  }

  const hasValidAccess = await hasAccess(email)

  if (!hasValidAccess) {
    return <AccessGate calculatorName='"Semmit sem csinálok" forgatókönyv' />
  }

  // Fetch projected inflation rate server-side
  let projectedInflation
  try {
    projectedInflation = await getProjectedInflationRate('HU')
  } catch (error) {
    console.error('Error fetching projected inflation:', error)
    projectedInflation = 4.0 // Default fallback
  }

  // Get current year's M2 data for contextual indicator
  const currentYear = new Date().getFullYear()
  const macroData = await getMacroData('HU')
  const currentYearData = macroData.find(d => d.year === currentYear)
  const m2Data = currentYearData ? {
    inflationRate: Number(currentYearData.inflation_rate),
    m2Growth: currentYearData.m2_growth ? Number(currentYearData.m2_growth) : null
  } : null

  // Get data sources
  const dataSources = await getDataSources('HU')

  return <DoNothingCalculatorClient 
    initialProjectedInflation={projectedInflation}
    m2Data={m2Data}
    currentYear={currentYear}
    email={email}
    dataSources={dataSources}
  />
}
