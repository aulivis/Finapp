/**
 * Server-side functions for inflation data from Supabase
 * These functions fetch data from the database
 */

import { getHistoricalInflationData, getProjectedInflationRate } from './macro-data'
import { HISTORICAL_INFLATION, DEFAULT_PROJECTED_INFLATION } from './economic-data'

/**
 * Get historical inflation data from Supabase
 * Falls back to hardcoded data if database is unavailable
 */
export async function getHistoricalInflation() {
  try {
    const data = await getHistoricalInflationData('HU')
    if (data.length > 0) {
      return data
    }
  } catch (error) {
    console.error('Error fetching historical inflation from database:', error)
  }

  // Fallback to hardcoded data from centralized file
  return HISTORICAL_INFLATION
}

/**
 * Get projected inflation rate from Supabase
 * Falls back to default if unavailable
 */
export async function getProjectedInflation() {
  try {
    return await getProjectedInflationRate('HU')
  } catch (error) {
    console.error('Error fetching projected inflation from database:', error)
    return DEFAULT_PROJECTED_INFLATION // Default fallback from centralized file
  }
}
