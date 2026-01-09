/**
 * Retirement age constant (Hungary)
 */
export const RETIREMENT_AGE = 65

/**
 * Historical average inflation rate (based on recent years' data)
 * This should be fetched from Supabase, but we provide a default for client-side calculations
 * Server-side functions should use getProjectedInflationRate() from macro-data.ts
 * Note: This is NOT a prediction, but a historical average used for illustrative calculations
 */
export const DEFAULT_PROJECTED_ANNUAL_INFLATION = 4.0 // Default fallback (historical average)

/**
 * Calculate "do nothing" scenario - savings without investment
 * @param currentAge - Current age
 * @param currentSavings - Current savings in HUF
 * @param monthlySavings - Monthly savings amount in HUF
 * @param projectedInflation - Historical average annual inflation rate (default: 4.0%, based on recent years' data)
 * @returns Calculation results
 */
export function calculateDoNothingScenario(
  currentAge: number,
  currentSavings: number,
  monthlySavings: number,
  projectedInflation: number = DEFAULT_PROJECTED_ANNUAL_INFLATION
): {
  yearsToRetirement: number
  retirementAge: number
  nominalValueAtRetirement: number
  realValueAtRetirement: number
  purchasingPowerChange: number
  purchasingPowerChangePercentage: number
  isPurchasingPowerDeclining: boolean
  monthlyBreakdown: Array<{
    year: number
    age: number
    nominal: number
    real: number
  }>
} {
  const yearsToRetirement = Math.max(0, RETIREMENT_AGE - currentAge)
  const retirementAge = currentAge + yearsToRetirement

  if (yearsToRetirement <= 0) {
    // Already at or past retirement age
    return {
      yearsToRetirement: 0,
      retirementAge: currentAge,
      nominalValueAtRetirement: currentSavings,
      realValueAtRetirement: currentSavings,
      purchasingPowerChange: 0,
      purchasingPowerChangePercentage: 0,
      isPurchasingPowerDeclining: false,
      monthlyBreakdown: [{
        year: new Date().getFullYear(),
        age: currentAge,
        nominal: currentSavings,
        real: currentSavings,
      }],
    }
  }

  // Calculate monthly contributions over the period
  let currentNominal = currentSavings
  const monthlyBreakdown: Array<{
    year: number
    age: number
    nominal: number
    real: number
  }> = []

  const currentYear = new Date().getFullYear()

  // Add initial state
  monthlyBreakdown.push({
    year: currentYear,
    age: currentAge,
    nominal: currentNominal,
    real: currentNominal,
  })

  // Calculate year by year
  for (let year = 1; year <= yearsToRetirement; year++) {
    // Add 12 months of savings (no interest, just accumulation)
    currentNominal += monthlySavings * 12

    // Calculate cumulative inflation
    const cumulativeInflation = Math.pow(1 + projectedInflation / 100, year)
    const realValue = currentNominal / cumulativeInflation

    monthlyBreakdown.push({
      year: currentYear + year,
      age: currentAge + year,
      nominal: Math.round(currentNominal),
      real: Math.round(realValue),
    })
  }

  const finalNominal = monthlyBreakdown[monthlyBreakdown.length - 1]?.nominal || currentNominal
  const finalReal = monthlyBreakdown[monthlyBreakdown.length - 1]?.real || currentNominal

  // Calculate purchasing power change
  // Compare final real value (in today's purchasing power) to initial savings (in today's purchasing power)
  // This shows whether the total savings grew in real terms
  const purchasingPowerChange = finalReal - currentSavings
  const purchasingPowerChangePercentage = (purchasingPowerChange / currentSavings) * 100

  // Purchasing power is declining if real value is less than initial savings
  // (meaning the savings didn't keep up with inflation despite contributions)
  const isPurchasingPowerDeclining = purchasingPowerChangePercentage < 0

  return {
    yearsToRetirement,
    retirementAge,
    nominalValueAtRetirement: Math.round(finalNominal),
    realValueAtRetirement: Math.round(finalReal),
    purchasingPowerChange: Math.round(purchasingPowerChange),
    purchasingPowerChangePercentage,
    isPurchasingPowerDeclining,
    monthlyBreakdown,
  }
}
