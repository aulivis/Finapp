import { NextRequest } from 'next/server'
import { getHistoricalInflationData, getProjectedInflationRate, getDataSources, getMacroData } from '@/lib/data/macro-data'
import { createSuccessResponse, ApiErrors } from '@/lib/utils/api-response'

/**
 * API route to fetch macroeconomic data
 * This is called server-side during page rendering, not from client
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  let country = searchParams.get('country') || 'HU'

  // Validate country parameter (basic validation)
  if (typeof country !== 'string' || country.length === 0 || country.length > 10) {
    country = 'HU' // Default to HU if invalid
  }

  // Sanitize country (only allow alphanumeric and underscore)
  country = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  try {
    const [historicalData, projectedRate, sources, macroData] = await Promise.all([
      getHistoricalInflationData(country),
      getProjectedInflationRate(country),
      getDataSources(country),
      getMacroData(country),
    ])

    // Calculate M2 growth data
    const currentYear = new Date().getFullYear()
    const currentYearM2Data = macroData
      .filter(d => d.year === currentYear && d.m2_growth !== null)
      .map(d => Number(d.m2_growth))
    const averageM2Growth = currentYearM2Data.length > 0
      ? currentYearM2Data.reduce((sum, val) => sum + val, 0) / currentYearM2Data.length
      : null

    const previousYearM2Data = macroData
      .filter(d => d.year === currentYear - 1 && d.m2_growth !== null)
      .map(d => Number(d.m2_growth))
    const averageM2GrowthPrevious = previousYearM2Data.length > 0
      ? previousYearM2Data.reduce((sum, val) => sum + val, 0) / previousYearM2Data.length
      : null

    return createSuccessResponse({
      historical: historicalData,
      projectedInflation: projectedRate,
      sources,
      country,
      m2: {
        currentYear,
        averageM2Growth,
        averageM2GrowthPrevious,
      },
    })
  } catch (error: any) {
    console.error('Error fetching macro data:', error)
    return ApiErrors.internalServerError('Az adatok jelenleg nem elérhetők.')
  }
}
