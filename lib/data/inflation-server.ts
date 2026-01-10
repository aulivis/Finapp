/**
 * Server-side functions for inflation data from Supabase
 * These functions fetch data from the database
 */

import { getHistoricalInflationData, getProjectedInflationRate } from './macro-data'

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

  // Fallback to hardcoded data
  return [
    { year: 2014, inflationRate: -0.2 },
    { year: 2015, inflationRate: 0.1 },
    { year: 2016, inflationRate: 0.4 },
    { year: 2017, inflationRate: 2.4 },
    { year: 2018, inflationRate: 2.8 },
    { year: 2019, inflationRate: 3.4 },
    { year: 2020, inflationRate: 3.3 },
    { year: 2021, inflationRate: 5.1 },
    { year: 2022, inflationRate: 14.5 },
    { year: 2023, inflationRate: 17.6 },
    { year: 2024, inflationRate: 3.7 },
    { year: 2025, inflationRate: 3.7 }, // Estimated - using same as 2024 for projection
  ]
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
    return 4.0 // Default fallback
  }
}
