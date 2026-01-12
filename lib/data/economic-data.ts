/**
 * Centralized Economic Data File
 * 
 * This file contains all hardcoded economic data used throughout the application.
 * Update this file to keep all economic data in sync.
 * 
 * Last updated: 2026.01.12.
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
  { year: 2015, inflationRate: -0.06 },
  { year: 2016, inflationRate: 0.39 },
  { year: 2017, inflationRate: 2.35 },
  { year: 2018, inflationRate: 2.85 },
  { year: 2019, inflationRate: 3.34 },
  { year: 2020, inflationRate: 3.33 },
  { year: 2021, inflationRate: 5.11 },
  { year: 2022, inflationRate: 14.61 },
  { year: 2023, inflationRate: 17.12 },
  { year: 2024, inflationRate: 3.7 }, 
  { year: 2025, inflationRate: 3.8 }, // Estimated 
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
    2015: 880,
    2016: 900,
    2017: 880,
    2018: 860,
    2019: 875,
    2020: 900,
    2021: 910,
    2022: 1000,
    2023: 1375,
    2024: 1410,
    2025: 1420,
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
    2022: 53000000,
    2023: 53000000,
    2024: 55000000,
    2025: 72000000,
  },
  
  /**
   * Gold price per ounce (USD)
   */
  gold: {
    2015: 1061,
    2016: 1152,
    2017: 1295,
    2018: 1283,
    2019: 1542,
    2020: 1896,
    2021: 1828,
    2022: 1812,
    2023: 2062,
    2024: 2624,
    2025: 4570,
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
    2024: 5882,
    2025: 6606,
  },
  
  /**
   * Bitcoin price in USD
   */
  bitcoin: {
    2015: 431,
    2016: 964,
    2017: 14156,
    2018: 3743,
    2019: 7194,
    2020: 29001,
    2021: 46306,
    2022: 16548,
    2023: 42265,
    2024: 93429,
    2025: 87509,
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
  { year: 2015, m2Growth: 5.7 },
  { year: 2016, m2Growth: 6.93 },
  { year: 2017, m2Growth: 4.9 },
  { year: 2018, m2Growth: 3.67 },
  { year: 2019, m2Growth: 6.71 },
  { year: 2020, m2Growth: 24.66 },
  { year: 2021, m2Growth: -1.17 },
  { year: 2022, m2Growth: -2.44 },
  { year: 2023, m2Growth: 3.49 },
  { year: 2024, m2Growth: 4.19 }, 
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
