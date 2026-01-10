/**
 * Historical inflation data for Hungary (annual inflation rates)
 * Source: Based on Hungarian Central Statistical Office (KSH) data
 * Format: { year: number, inflationRate: number } (inflationRate as percentage, e.g., 15.6 means 15.6%)
 */
export const historicalInflation: Array<{ year: number; inflationRate: number }> = [
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
 * Conservative interest rate assumptions by holding type
 * These are conservative estimates based on typical Hungarian savings products
 */
export const HOLDING_TYPE_INTEREST_RATES = {
  cash: 0, // No yield for cash
  'low-interest-savings': 2.0, // Conservative estimate for low-interest savings accounts (annual %)
  'no-yield': 0, // Explicitly no yield
} as const

export type HoldingType = keyof typeof HOLDING_TYPE_INTEREST_RATES

/**
 * Calculate purchasing power over time
 * @param initialAmount - Starting amount in HUF
 * @param startYear - Starting year
 * @param endYear - Ending year
 * @returns Array of { year, nominal, real } values
 */
export function calculatePurchasingPower(
  initialAmount: number,
  startYear: number,
  endYear: number
): Array<{ year: number; nominal: number; real: number }> {
  const results: Array<{ year: number; nominal: number; real: number }> = []
  
  // Validate inputs
  if (!isFinite(initialAmount) || initialAmount < 0) {
    return results
  }
  
  if (!isFinite(startYear) || startYear < 2014 || startYear > new Date().getFullYear()) {
    return results
  }
  
  if (!isFinite(endYear) || endYear < startYear || endYear > new Date().getFullYear() + 10) {
    return results
  }
  
  // Find starting index
  const startIndex = historicalInflation.findIndex(d => d.year === startYear)
  if (startIndex === -1) {
    return results
  }

  // Add starting point first - in the starting year, real = nominal (no inflation applied yet)
  results.push({
    year: startYear,
    nominal: Math.round(initialAmount),
    real: Math.round(initialAmount),
  })

  // Now apply inflation for subsequent years
  let cumulativeInflation = 1

  for (let i = startIndex; i < historicalInflation.length && historicalInflation[i].year <= endYear; i++) {
    const { year, inflationRate } = historicalInflation[i]
    
    // Skip the starting year as we already added it
    if (year === startYear) {
      continue
    }
    
    // Apply inflation (convert percentage to multiplier)
    cumulativeInflation *= (1 + inflationRate / 100)
    
    // Nominal stays the same (no interest, just tracking inflation impact)
    const nominal = initialAmount
    
    // Real purchasing power decreases with inflation
    const real = initialAmount / cumulativeInflation
    
    results.push({
      year,
      nominal: Math.round(nominal),
      real: Math.round(real),
    })
  }

  return results
}

/**
 * Calculate personal inflation impact with holding type
 * @param initialAmount - Starting amount in HUF
 * @param startYear - Starting year
 * @param endYear - Ending year (default: 2024)
 * @param holdingType - Type of holding (cash, low-interest-savings, no-yield)
 * @returns Object with calculation results
 */
export function calculatePersonalInflationImpact(
  initialAmount: number,
  startYear: number,
  endYear: number = 2024,
  holdingType: HoldingType = 'cash'
): {
  initialAmount: number
  finalNominalValue: number
  finalRealValue: number
  purchasingPowerLoss: number
  purchasingPowerLossPercentage: number
  dataPoints: Array<{ year: number; nominal: number; real: number }>
} {
  // Validate inputs
  if (!isFinite(initialAmount) || initialAmount < 0) {
    throw new Error('Initial amount must be a non-negative number')
  }
  
  if (!isFinite(startYear) || startYear < 2014 || startYear > new Date().getFullYear()) {
    throw new Error(`Invalid start year: ${startYear}. Must be between 2014 and ${new Date().getFullYear()}`)
  }
  
  if (!isFinite(endYear) || endYear < startYear || endYear > new Date().getFullYear() + 10) {
    throw new Error(`Invalid end year: ${endYear}. Must be >= start year and <= ${new Date().getFullYear() + 10}`)
  }

  const startIndex = historicalInflation.findIndex(d => d.year === startYear)
  if (startIndex === -1) {
    throw new Error(`Invalid start year: ${startYear}. No data available for this year.`)
  }

  const interestRate = HOLDING_TYPE_INTEREST_RATES[holdingType] / 100 // Convert to decimal
  let currentNominal = initialAmount
  let cumulativeInflation = 1
  const dataPoints: Array<{ year: number; nominal: number; real: number }> = []

  // Add starting point first - in the starting year, real = nominal (no inflation or interest applied yet)
  dataPoints.push({
    year: startYear,
    nominal: Math.round(initialAmount),
    real: Math.round(initialAmount),
  })

  for (let i = startIndex; i < historicalInflation.length && historicalInflation[i].year <= endYear; i++) {
    const { year, inflationRate } = historicalInflation[i]
    
    // Skip the starting year as we already added it
    if (year === startYear) {
      continue
    }
    
    // Apply interest (if any) - compound annually
    currentNominal = currentNominal * (1 + interestRate)
    
    // Apply inflation (convert percentage to multiplier)
    cumulativeInflation *= (1 + inflationRate / 100)
    
    // Real purchasing power = nominal value adjusted for inflation
    const real = currentNominal / cumulativeInflation
    
    dataPoints.push({
      year,
      nominal: Math.round(currentNominal),
      real: Math.round(real),
    })
  }

  const finalNominalValue = dataPoints[dataPoints.length - 1]?.nominal || initialAmount
  const finalRealValue = dataPoints[dataPoints.length - 1]?.real || initialAmount
  const purchasingPowerLoss = finalNominalValue - finalRealValue
  const purchasingPowerLossPercentage = (purchasingPowerLoss / finalNominalValue) * 100

  return {
    initialAmount,
    finalNominalValue,
    finalRealValue,
    purchasingPowerLoss,
    purchasingPowerLossPercentage,
    dataPoints,
  }
}
