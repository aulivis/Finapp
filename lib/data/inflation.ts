/**
 * Historical inflation data and interest rates
 * Imported from centralized economic data file
 */
import {
  HISTORICAL_INFLATION,
  HOLDING_TYPE_INTEREST_RATES,
  type HoldingType,
} from './economic-data'

/**
 * @deprecated Use HISTORICAL_INFLATION from './economic-data' instead
 * Kept for backward compatibility
 */
export const historicalInflation = HISTORICAL_INFLATION

/**
 * @deprecated Use HOLDING_TYPE_INTEREST_RATES from './economic-data' instead
 * Kept for backward compatibility
 */
export { HOLDING_TYPE_INTEREST_RATES, type HoldingType }

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
  const startIndex = HISTORICAL_INFLATION.findIndex(d => d.year === startYear)
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

  for (let i = startIndex; i < HISTORICAL_INFLATION.length && HISTORICAL_INFLATION[i].year <= endYear; i++) {
    const { year, inflationRate } = HISTORICAL_INFLATION[i]
    
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

  const startIndex = HISTORICAL_INFLATION.findIndex(d => d.year === startYear)
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

  for (let i = startIndex; i < HISTORICAL_INFLATION.length && HISTORICAL_INFLATION[i].year <= endYear; i++) {
    const { year, inflationRate } = HISTORICAL_INFLATION[i]
    
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
