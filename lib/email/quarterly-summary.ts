import { getApprovedAIContent } from '@/lib/ai/content-storage'
import { getMacroData, getLatestMacroDataYear } from '@/lib/data/macro-data'

/**
 * Get current quarter (1-4)
 */
function getCurrentQuarter(): number {
  const month = new Date().getMonth() + 1 // 1-12
  return Math.floor((month - 1) / 3) + 1
}

/**
 * Get quarter name in Hungarian
 */
function getQuarterName(year: number, quarter: number): string {
  const names: Record<number, string> = {
    1: 'I. negyedév',
    2: 'II. negyedév',
    3: 'III. negyedév',
    4: 'IV. negyedév',
  }
  return `${year} ${names[quarter] || `${quarter}. negyedév`}`
}

/**
 * Get latest quarterly update summary for display
 */
export async function getLatestQuarterlySummary(): Promise<{
  quarterName: string
  summaryPoints: string[]
} | null> {
  const currentYear = new Date().getFullYear()
  const currentQuarter = getCurrentQuarter()
  const period = `${currentYear}-Q${currentQuarter}`

  // Try to get approved AI-generated summary
  const aiSummary = await getApprovedAIContent('quarterly_summary', period, 'HU')

  if (aiSummary) {
    // Parse AI content into bullet points
    const content = aiSummary.content
    const lines = content.split('\n').filter(line => line.trim().length > 0)
    const summaryPoints = lines.slice(0, 3).map(line => line.trim().replace(/^[-•]\s*/, ''))
    
    return {
      quarterName: getQuarterName(currentYear, currentQuarter),
      summaryPoints: summaryPoints.length > 0 ? summaryPoints : [content.trim()]
    }
  }

  // Fallback: generate summary from economic data
  const macroData = await getMacroData('HU')
  const latestYear = await getLatestMacroDataYear('HU')

  if (!latestYear || macroData.length === 0) {
    return null
  }

  const currentYearRecord = macroData.find(d => d.year === currentYear)
  const previousYearRecord = macroData.find(d => d.year === currentYear - 1)

  const summaryPoints: string[] = []

  if (currentYearRecord) {
    const inflation = Number(currentYearRecord.inflation_rate)
    if (previousYearRecord) {
      const previousInflation = Number(previousYearRecord.inflation_rate)
      const change = inflation - previousInflation
      if (change > 0) {
        summaryPoints.push(`Az inflációs ráta ${inflation.toFixed(1)}%, ami ${change.toFixed(1)} százalékponttal magasabb, mint az előző évben.`)
      } else if (change < 0) {
        summaryPoints.push(`Az inflációs ráta ${inflation.toFixed(1)}%, ami ${Math.abs(change).toFixed(1)} százalékponttal alacsonyabb, mint az előző évben.`)
      } else {
        summaryPoints.push(`Az inflációs ráta ${inflation.toFixed(1)}%, változatlan az előző évhez képest.`)
      }
    } else {
      summaryPoints.push(`Az inflációs ráta ${inflation.toFixed(1)}%.`)
    }
  }

  // Calculate M2 growth if available
  const currentYearM2Data = macroData
    .filter(d => d.year === currentYear && d.m2_growth !== null)
    .map(d => Number(d.m2_growth))
  const averageM2Growth = currentYearM2Data.length > 0
    ? currentYearM2Data.reduce((sum, val) => sum + val, 0) / currentYearM2Data.length
    : null

  if (averageM2Growth !== null) {
    summaryPoints.push(`Az M2 pénzkínálat átlagos növekedése ${averageM2Growth.toFixed(1)}%.`)
  }

  if (summaryPoints.length === 0) {
    return null
  }

  // Add a general statement if we have points
  if (summaryPoints.length > 0) {
    summaryPoints.push('A számítási eszközök a legfrissebb adatokkal frissültek.')
  }

  return {
    quarterName: getQuarterName(currentYear, currentQuarter),
    summaryPoints: summaryPoints.slice(0, 3) // Limit to 3 points
  }
}
