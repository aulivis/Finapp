/**
 * Script to update macroeconomic data in Supabase
 * 
 * Usage:
 *   - Run manually: npx tsx scripts/update-macro-data.ts
 *   - Or schedule via cron/automated task
 * 
 * This script can be extended to fetch data from APIs or CSV files
 */

import { supabaseAdmin } from '../lib/supabase/server'

interface MacroDataInput {
  country: string
  year: number
  inflation_rate: number
  interest_rate?: number | null
  m2_growth?: number | null
  source: string
}

/**
 * Example: Update macro data manually
 * Replace this with your actual data source (API, CSV, etc.)
 */
async function updateMacroData() {
  // Example data - replace with actual data fetching logic
  // M2 growth data should be added from official sources (MNB - Magyar Nemzeti Bank)
  const dataToInsert: MacroDataInput[] = [
    { country: 'HU', year: 2014, inflation_rate: -0.2, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2015, inflation_rate: 0.1, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2016, inflation_rate: 0.4, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2017, inflation_rate: 2.4, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2018, inflation_rate: 2.8, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2019, inflation_rate: 3.4, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2020, inflation_rate: 3.3, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2021, inflation_rate: 5.1, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2022, inflation_rate: 14.5, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2023, inflation_rate: 17.6, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
    { country: 'HU', year: 2024, inflation_rate: 3.7, interest_rate: null, m2_growth: null, source: 'KSH (K?zponti Statisztikai Hivatal)' },
  ]

  console.log(`Updating ${dataToInsert.length} records...`)

  for (const record of dataToInsert) {
    const { error } = await supabaseAdmin
      .from('macro_data')
      .upsert({
        country: record.country,
        year: record.year,
        inflation_rate: record.inflation_rate,
        interest_rate: record.interest_rate,
        m2_growth: record.m2_growth,
        source: record.source,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'country,year',
      })
      .select()

    if (error) {
      console.error(`Error updating ${record.country} ${record.year}:`, error)
    } else {
      console.log(`? Updated ${record.country} ${record.year}`)
    }
  }

  console.log('Update complete!')
}

// Run if executed directly
if (require.main === module) {
  updateMacroData()
    .then(() => {
      console.log('Script completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Script failed:', error)
      process.exit(1)
    })
}

export { updateMacroData }
