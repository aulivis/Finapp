import { NextRequest } from 'next/server'
import { getHistoricalInflationData, getProjectedInflationRate, getDataSources } from '@/lib/data/macro-data'
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
    const [historicalData, projectedRate, sources] = await Promise.all([
      getHistoricalInflationData(country),
      getProjectedInflationRate(country),
      getDataSources(country),
    ])

    return createSuccessResponse({
      historical: historicalData,
      projectedInflation: projectedRate,
      sources,
      country,
    })
  } catch (error: any) {
    console.error('Error fetching macro data:', error)
    return ApiErrors.internalServerError('Az adatok jelenleg nem elérhetők.')
  }
}
