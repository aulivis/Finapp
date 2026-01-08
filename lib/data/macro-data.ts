import { supabaseAdmin } from '@/lib/supabase/server'
import { MacroData } from '@/lib/types/database'

const DEFAULT_COUNTRY = 'HU'
const DEFAULT_PROJECTED_INFLATION = 4.0 // Fallback if no data available

/**
 * Get all macroeconomic data for a country, sorted by year
 */
export async function getMacroData(country: string = DEFAULT_COUNTRY): Promise<MacroData[]> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    country = DEFAULT_COUNTRY
  }

  // Sanitize country (only allow alphanumeric and underscore)
  const sanitizedCountry = country.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()

  const { data, error } = await supabaseAdmin
    .from('macro_data')
    .select('*')
    .eq('country', sanitizedCountry)
    .order('year', { ascending: true })

  if (error) {
    console.error('Error fetching macro data:', error)
    return []
  }

  return data || []
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

  const { data, error } = await supabaseAdmin
    .from('macro_data')
    .select('year')
    .eq('country', sanitizedCountry)
    .order('year', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return null
  }

  const year = Number(data.year)
  return isFinite(year) && year > 0 ? year : null
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

  const { data, error } = await supabaseAdmin
    .from('macro_data')
    .select('inflation_rate')
    .eq('country', sanitizedCountry)
    .eq('year', Math.floor(year))
    .single()

  if (error || !data) {
    return null
  }

  const rate = Number(data.inflation_rate)
  return isFinite(rate) ? rate : null
}

/**
 * Get projected inflation rate (average of recent years or default)
 */
export async function getProjectedInflationRate(country: string = DEFAULT_COUNTRY): Promise<number> {
  // Validate country parameter
  if (!country || typeof country !== 'string' || country.length === 0) {
    return DEFAULT_PROJECTED_INFLATION
  }

  // Get last 5 years of data to calculate average
  const { data, error } = await supabaseAdmin
    .from('macro_data')
    .select('inflation_rate')
    .eq('country', country)
    .order('year', { ascending: false })
    .limit(5)

  if (error || !data || data.length === 0) {
    return DEFAULT_PROJECTED_INFLATION
  }

  // Calculate average with proper number validation
  const validRates = data
    .map(row => Number(row.inflation_rate))
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

  const { data, error } = await supabaseAdmin
    .from('macro_data')
    .select('source')
    .eq('country', sanitizedCountry)

  if (error || !data) {
    return []
  }

  // Get unique sources and filter out invalid values
  const sources = [...new Set(data
    .map(row => row.source)
    .filter((source): source is string => typeof source === 'string' && source.length > 0)
  )]
  return sources
}

/**
 * Get historical inflation data formatted for calculators
 */
export async function getHistoricalInflationData(
  country: string = DEFAULT_COUNTRY
): Promise<Array<{ year: number; inflationRate: number }>> {
  const data = await getMacroData(country)
  
  return data
    .map(row => {
      const year = Number(row.year)
      const inflationRate = Number(row.inflation_rate)
      
      // Validate both values are finite numbers
      if (!isFinite(year) || !isFinite(inflationRate)) {
        return null
      }
      
      return {
        year: Math.floor(year),
        inflationRate,
      }
    })
    .filter((item): item is { year: number; inflationRate: number } => item !== null)
}
