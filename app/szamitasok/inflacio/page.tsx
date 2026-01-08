import { getHistoricalInflationData, getMacroData } from '@/lib/data/macro-data'
import { hasAccess } from '@/lib/utils/access'
import { isValidEmail } from '@/lib/utils/email'
import PersonalInflationCalculatorClient from './client'
import AccessGate from '@/components/AccessGate'

interface PageProps {
  searchParams: { email?: string }
}

export default async function PersonalInflationCalculator({ searchParams }: PageProps) {
  const email = searchParams.email

  // Validate email parameter
  if (!email || typeof email !== 'string') {
    return <AccessGate calculatorName="Személyre szabott inflációs számítás" />
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return <AccessGate calculatorName="Személyre szabott inflációs számítás" />
  }

  const hasValidAccess = await hasAccess(email)

  if (!hasValidAccess) {
    return <AccessGate calculatorName="Személyre szabott inflációs számítás" />
  }

  // Fetch data server-side
  let historicalData
  try {
    historicalData = await getHistoricalInflationData('HU')
  } catch (error) {
    console.error('Error fetching inflation data:', error)
    historicalData = []
  }

  // Get latest year's M2 data for contextual indicator
  const macroData = await getMacroData('HU')
  const latestYear = historicalData.length > 0
    ? Math.max(...historicalData.map(d => d.year), new Date().getFullYear())
    : new Date().getFullYear()
  const latestYearData = macroData.find(d => d.year === latestYear)
  const m2Data = latestYearData ? {
    inflationRate: isFinite(Number(latestYearData.inflation_rate)) ? Number(latestYearData.inflation_rate) : null,
    m2Growth: latestYearData.m2_growth && isFinite(Number(latestYearData.m2_growth)) ? Number(latestYearData.m2_growth) : null
  } : null

  return <PersonalInflationCalculatorClient 
    initialData={historicalData} 
    m2Data={m2Data}
    latestYear={latestYear}
    email={email}
  />
}
