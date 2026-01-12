import { MacroData } from '@/lib/types/database'
import {
  HISTORICAL_INFLATION,
  HISTORICAL_M2_GROWTH,
  DEFAULT_PROJECTED_INFLATION,
} from './economic-data'

const DEFAULT_COUNTRY = 'HU'
const DEFAULT_SOURCE = 'KSH/MNB'

/**
 * Get all macroeconomic data for a country, sorted by year
 * Reads from static data files instead of database
 */
export async function getMacroData(country: string = DEFAULT_COUNTRY): Promise<MacroData[]> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country (only allow alphanumeric and underscore)
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now (data is Hungary-specific)
  if (sanitizedCountry !== 'HU') {
    return []
  }

  // Combine inflation and M2 data
  const m2Map = new Map(HISTORICAL_M2_GROWTH.map(d => [d.year, d.m2Growth]))

  const macroData: MacroData[] = HISTORICAL_INFLATION.map(({ year, inflationRate }) => {
    const m2Growth = m2Map.get(year) ?? null
    
    return {
      id: `macro-${year}`, // Generate a consistent ID
      country: sanitizedCountry,
      year,
      inflation_rate: inflationRate,
      interest_rate: null, // Not available in static data
      m2_growth: m2Growth,
      source: DEFAULT_SOURCE,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  })

  return macroData.sort((a, b) => a.year - b.year)
}

/**
 * Get latest available year of data
 */
export async function getLatestMacroDataYear(country: string = DEFAULT_COUNTRY): Promise<number | null> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country (only allow alphanumeric and underscore)
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now
  if (sanitizedCountry !== 'HU') {
    return null
  }

  if (HISTORICAL_INFLATION.length === 0) {
    return null
  }

  // Get the latest year from historical inflation data
  const latestYear = Math.max(...HISTORICAL_INFLATION.map(d => d.year))
  return isFinite(latestYear) && latestYear > 0 ? latestYear : null
}

/**
 * Get inflation rate for a specific year
 */
export async function getInflationRateForYear(
  year: number,
  country: string = DEFAULT_COUNTRY
): Promise<number | null> {
  // Validate year parameter
  if (!isFinite(year) || year < 1900 || year > new Date().getFullYear() + 10) {
    return null
  }

  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country (only allow alphanumeric and underscore)
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now
  if (sanitizedCountry !== 'HU') {
    return null
  }

  const yearInt = Math.floor(year)
  const dataPoint = HISTORICAL_INFLATION.find(d => d.year === yearInt)
  
  if (!dataPoint) {
    return null
  }

  const rate = dataPoint.inflationRate
  return isFinite(rate) ? rate : null
}

/**
 * Get historical average inflation rate (average of recent years or default)
 * Note: This is NOT a prediction/forecast, but a historical average used for illustrative calculations
 */
export async function getProjectedInflationRate(country: string = DEFAULT_COUNTRY): Promise<number> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    return DEFAULT_PROJECTED_INFLATION
  }

  // Sanitize country
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now
  if (sanitizedCountry !== 'HU') {
    return DEFAULT_PROJECTED_INFLATION
  }

  // Get last 5 years of data to calculate average
  const recentData = [...HISTORICAL_INFLATION]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5)

  if (recentData.length === 0) {
    return DEFAULT_PROJECTED_INFLATION
  }

  // Calculate average with proper number validation
  const validRates = recentData
    .map(d => d.inflationRate)
    .filter(rate => !isNaN(rate) && isFinite(rate))

  if (validRates.length === 0) {
    return DEFAULT_PROJECTED_INFLATION
  }

  const sum = validRates.reduce((acc, rate) => acc + rate, 0)
  const average = sum / validRates.length

  // Return average, but use default if average is too low or too high (sanity check)
  if (average < 0 || average > 20 || !isFinite(average)) {
    return DEFAULT_PROJECTED_INFLATION
  }

  return average
}

/**
 * Get data source information
 */
export async function getDataSources(country: string = DEFAULT_COUNTRY): Promise<string[]> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country (only allow alphanumeric and underscore)
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now
  if (sanitizedCountry !== 'HU') {
    return []
  }

  // Return default source
  return [DEFAULT_SOURCE]
}

/**
 * Get historical inflation data formatted for calculators
 */
export async function getHistoricalInflationData(
  country: string = DEFAULT_COUNTRY
): Promise<Array<{ year: number; inflationRate: number }>> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  // Only support HU for now
  if (sanitizedCountry !== 'HU') {
    return []
  }

  // Return historical inflation data directly
  return HISTORICAL_INFLATION.map(({ year, inflationRate }) => ({
    year,
    inflationRate,
  }))
}
