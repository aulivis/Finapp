/**
 * Script to generate quarterly AI content for email updates
 * 
 * Usage:
 *   npm run generate-quarterly-ai-content
 * 
 * This script:
 * 1. Fetches latest economic data
 * 2. Generates AI content using OpenAI
 * 3. Stores content in database with 'pending' status
 * 4. Content must be reviewed and approved before use
 */

import { getMacroData, getLatestMacroDataYear } from '../lib/data/macro-data'
import { generateQuarterlySummary, generatePurchasingPowerExplanation } from '../lib/ai/openai-client'
import { storeAIContent } from '../lib/ai/content-storage'

function getCurrentQuarter(): number {
  const month = new Date().getMonth() + 1
  return Math.floor((month - 1) / 3) + 1
}

async function generateQuarterlyAIContent() {
  const currentYear = new Date().getFullYear()
  const currentQuarter = getCurrentQuarter()
  const period = `${currentYear}-Q${currentQuarter}`

  console.log(`Generating AI content for period: ${period}`)

  // Get economic data
  const currentYearData = await getMacroData('HU')
  const latestYear = await getLatestMacroDataYear('HU')

  if (!latestYear || currentYearData.length === 0) {
    console.error('No economic data available')
    return
  }

  const currentYearRecord = currentYearData.find(d => d.year === currentYear)
  const previousYearRecord = currentYearData.find(d => d.year === currentYear - 1)
  const latestRecord = currentYearData.find(d => d.year === latestYear)

  // Calculate average M2 growth
  const currentYearM2Data = currentYearData
    .filter(d => d.year === currentYear && d.m2_growth !== null)
    .map(d => Number(d.m2_growth))
  const averageM2Growth = currentYearM2Data.length > 0
    ? currentYearM2Data.reduce((sum, val) => sum + val, 0) / currentYearM2Data.length
    : null

  const previousYearM2Data = currentYearData
    .filter(d => d.year === currentYear - 1 && d.m2_growth !== null)
    .map(d => Number(d.m2_growth))
  const averageM2GrowthPrevious = previousYearM2Data.length > 0
    ? previousYearM2Data.reduce((sum, val) => sum + val, 0) / previousYearM2Data.length
    : null

  const economicData = {
    currentYear,
    currentQuarter,
    latestYear,
    currentInflation: currentYearRecord ? Number(currentYearRecord.inflation_rate) : null,
    previousYearInflation: previousYearRecord ? Number(previousYearRecord.inflation_rate) : null,
    latestInflation: latestRecord ? Number(latestRecord.inflation_rate) : null,
    averageM2Growth,
    averageM2GrowthPrevious,
    source: latestRecord?.source || 'KSH (Központi Statisztikai Hivatal)',
  }

  console.log('Economic data:', economicData)

  // Generate quarterly summary
  console.log('\nGenerating quarterly summary...')
  try {
    const summaryContent = await generateQuarterlySummary(economicData)
    const summaryMetadata = {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      prompt_type: 'quarterly_summary',
      economic_data: economicData,
      generated_at: new Date().toISOString(),
    }

    await storeAIContent(
      'quarterly_summary',
      period,
      summaryContent,
      `Negyedéves összefoglaló - ${period}`,
      summaryMetadata,
      'HU'
    )
    console.log('✓ Quarterly summary generated and stored')
  } catch (error: any) {
    console.error('✗ Error generating quarterly summary:', error.message)
  }

  // Generate purchasing power explanation
  console.log('\nGenerating purchasing power explanation...')
  try {
    const explanationContent = await generatePurchasingPowerExplanation(economicData)
    const explanationMetadata = {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      prompt_type: 'purchasing_power_explanation',
      economic_data: economicData,
      generated_at: new Date().toISOString(),
    }

    await storeAIContent(
      'purchasing_power_explanation',
      period,
      explanationContent,
      `Vásárlóerő magyarázat - ${period}`,
      explanationMetadata,
      'HU'
    )
    console.log('✓ Purchasing power explanation generated and stored')
  } catch (error: any) {
    console.error('✗ Error generating purchasing power explanation:', error.message)
  }

  console.log('\n=== Generation Complete ===')
  console.log('Content has been stored with "pending" status.')
  console.log('Please review and approve content before sending emails.')
}

// Run if executed directly
if (require.main === module) {
  generateQuarterlyAIContent()
    .then(() => {
      console.log('\nScript completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\nScript failed:', error)
      process.exit(1)
    })
}

export { generateQuarterlyAIContent }
