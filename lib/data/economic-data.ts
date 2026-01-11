/**
 * Centralized Economic Data File
 * 
 * This file contains all hardcoded economic data used throughout the application.
 * Update this file to keep all economic data in sync.
 * 
 * Last updated: 2024
 * 
 * Data sources:
 * - Inflation: KSH (Központi Statisztikai Hivatal)
 * - Prices: Historical estimates and market data
 * - M2: MNB (Magyar Nemzeti Bank) - when available
 */

// ============================================================================
// INFLATION DATA
// ============================================================================

/**
 * Historical inflation data for Hungary (annual inflation rates)
 * Format: { year: number, inflationRate: number }
 * inflationRate is a percentage (e.g., 15.6 means 15.6%)
 * 
 * Source: Based on Hungarian Central Statistical Office (KSH) data
 */
export const HISTORICAL_INFLATION: Array<{ year: number; inflationRate: number }> = [
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
  { year: 2024, inflationRate: 3.7 }, // Estimated/partial year
  { year: 2025, inflationRate: 3.7 }, // Estimated - using same as 2024 for projection
]

/**
 * Default projected annual inflation rate (fallback)
 * Used when database data is unavailable
 * Based on historical average of recent years
 */
export const DEFAULT_PROJECTED_INFLATION = 4.0 // Percentage

// ============================================================================
// INTEREST RATES
// ============================================================================

/**
 * Conservative interest rate assumptions by holding type
 * These are conservative estimates based on typical Hungarian savings products
 * Format: annual percentage (e.g., 2.0 means 2.0% per year)
 */
export const HOLDING_TYPE_INTEREST_RATES = {
  cash: 0, // No yield for cash
  'low-interest-savings': 2.0, // Conservative estimate for low-interest savings accounts
  'no-yield': 0, // Explicitly no yield
} as const

export type HoldingType = keyof typeof HOLDING_TYPE_INTEREST_RATES

// ============================================================================
// COMPARISON PRICES (Historical price data for contextual comparisons)
// ============================================================================

/**
 * Historical price data estimates for Hungary (HUF)
 * These are approximate values based on historical trends
 * Used for contextual comparisons in the calculator
 */
export const HISTORICAL_PRICES = {
  /**
   * Big Mac price in HUF
   */
  bigMac: {
    2015: 850,
    2016: 870,
    2017: 890,
    2018: 920,
    2019: 950,
    2020: 980,
    2021: 1050,
    2022: 1200,
    2023: 1450,
    2024: 1500,
    2025: 1550, // Estimated
  },
  
  /**
   * 60 m² apartment price in Budapest city center (HUF)
   */
  apartment60sqm: {
    2015: 25000000, // 25M HUF
    2016: 26000000,
    2017: 28000000,
    2018: 32000000,
    2019: 36000000,
    2020: 38000000,
    2021: 42000000,
    2022: 50000000,
    2023: 58000000,
    2024: 62000000,
    2025: 65000000, // Estimated
  },
  
  /**
   * Gold price per ounce in HUF (approximate)
   */
  gold: {
    2015: 125000,
    2016: 135000,
    2017: 140000,
    2018: 145000,
    2019: 155000,
    2020: 180000,
    2021: 195000,
    2022: 220000,
    2023: 250000,
    2024: 260000,
    2025: 270000, // Estimated
  },
  
  /**
   * S&P 500 index value (USD)
   */
  sp500: {
    2015: 2044,
    2016: 2239,
    2017: 2674,
    2018: 2507,
    2019: 3231,
    2020: 3756,
    2021: 4766,
    2022: 3839,
    2023: 4769,
    2024: 5473,
    2025: 5800, // Estimated
  },
  
  /**
   * Bitcoin price in USD
   */
  bitcoin: {
    2015: 430,
    2016: 960,
    2017: 13800,
    2018: 3800,
    2019: 7200,
    2020: 29000,
    2021: 47000,
    2022: 16500,
    2023: 42000,
    2024: 63000,
    2025: 75000, // Estimated
  },
} as const

// ============================================================================
// M2 MONEY SUPPLY DATA (Fallback - when API data unavailable)
// ============================================================================

/**
 * Historical M2 money supply growth rates (annual %)
 * Source: MNB (Magyar Nemzeti Bank) when available
 * Format: { year: number, m2Growth: number | null }
 * 
 * Note: This is contextual data only, not used in calculations
 * Primary source should be the database via API
 */
export const HISTORICAL_M2_GROWTH: Array<{ year: number; m2Growth: number | null }> = [
  // Add M2 data here when available
  // Example format:
  // { year: 2020, m2Growth: 12.5 },
  // { year: 2021, m2Growth: 15.2 },
  // { year: 2022, m2Growth: 18.3 },
  // { year: 2023, m2Growth: 10.5 },
  // { year: 2024, m2Growth: null }, // Not yet available
]

// ============================================================================
// RETIREMENT DATA
// ============================================================================

/**
 * Retirement age constant (Hungary)
 */
export const RETIREMENT_AGE = 65

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get price for a specific year from price data
 * Returns the closest available year's price if exact match not found
 */
export function getPriceForYear(
  priceData: Record<number, number>,
  year: number
): number | null {
  const availableYears = Object.keys(priceData).map(Number).sort((a, b) => a - b)
  const closestYear = availableYears.reduce((prev, curr) => {
    return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  })
  
  if (Math.abs(closestYear - year) <= 1) {
    return priceData[closestYear]
  }
  return null
}

/**
 * Calculate percentage change between two prices
 */
export function calculatePercentageChange(
  startPrice: number | null,
  endPrice: number | null
): number | null {
  if (!startPrice || !endPrice || startPrice === 0) {
    return null
  }
  return ((endPrice - startPrice) / startPrice) * 100
}
