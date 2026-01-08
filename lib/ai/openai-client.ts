/**
 * OpenAI API client for batch content generation
 * Uses low temperature for deterministic, review-ready output
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini' // Use cost-effective model
const OPENAI_TEMPERATURE = 0.2 // Low temperature for deterministic output

if (!OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not set. AI content generation will not work.')
}

interface OpenAIResponse {
  id: string
  choices: Array<{
    message: {
      content: string
    }
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

/**
 * Generate content using OpenAI API
 * @param prompt - The prompt for content generation
 * @param systemPrompt - Optional system prompt for context
 * @returns Generated content
 */
export async function generateContent(
  prompt: string,
  systemPrompt?: string
): Promise<{
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const messages: Array<{ role: string; content: string }> = []

  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }

  messages.push({ role: 'user', content: prompt })

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: OPENAI_TEMPERATURE,
        max_tokens: 2000, // Limit for cost control
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${error}`)
    }

    const data: OpenAIResponse = await response.json()

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No content generated from OpenAI')
    }

    return {
      content: data.choices[0].message.content.trim(),
      usage: data.usage,
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

/**
 * Generate quarterly economic summary
 */
export async function generateQuarterlySummary(
  economicData: {
    currentInflation: number | null
    previousYearInflation: number | null
    currentYear: number
    currentQuarter: number
    averageM2Growth: number | null
    averageM2GrowthPrevious: number | null
    source: string
  }
): Promise<string> {
  const systemPrompt = `Te egy pénzügyi tájékoztató író vagy. Feladatod objektív, semleges, adatalapú szövegek írása magyar nyelven. 
A szövegeknek:
- Ténylegesen kell lenniük, nem marketing nyelvűek
- Semleges hangvételűek
- Adatokra alapozottak
- Rövidek és tömörek (max 250 szó)
- Nem tartalmaznak tanácsadást vagy ajánlásokat`

  const quarterNames: Record<number, string> = {
    1: 'I. negyedév',
    2: 'II. negyedév',
    3: 'III. negyedév',
    4: 'IV. negyedév',
  }
  const quarterName = quarterNames[economicData.currentQuarter] || `${economicData.currentQuarter}. negyedév`
  
  let prompt = `Írj egy rövid, objektív összefoglalót a ${economicData.currentYear}. év ${quarterName} gazdasági helyzetéről. `

  if (economicData.currentInflation !== null) {
    prompt += `Az inflációs ráta ${economicData.currentInflation.toFixed(1)}%. `
    if (economicData.previousYearInflation !== null) {
      const change = economicData.currentInflation - economicData.previousYearInflation
      if (change > 0) {
        prompt += `Ez ${change.toFixed(1)} százalékponttal magasabb, mint az előző évben. `
      } else if (change < 0) {
        prompt += `Ez ${Math.abs(change).toFixed(1)} százalékponttal alacsonyabb, mint az előző évben. `
      } else {
        prompt += `Ez megegyezik az előző évi értékkel. `
      }
    }
  }

  if (economicData.averageM2Growth !== null) {
    prompt += `Az átlagos M2 pénzkínálat növekedés ${economicData.averageM2Growth.toFixed(1)}%. `
    if (economicData.averageM2GrowthPrevious !== null) {
      const m2Change = economicData.averageM2Growth - economicData.averageM2GrowthPrevious
      if (m2Change > 0) {
        prompt += `Ez ${m2Change.toFixed(1)} százalékponttal magasabb, mint az előző évben. `
      } else if (m2Change < 0) {
        prompt += `Ez ${Math.abs(m2Change).toFixed(1)} százalékponttal alacsonyabb, mint az előző évben. `
      }
    }
    prompt += `Megjegyzés: Az M2 pénzkínálat kontextuális mutató, nem használható a számításokban. `
  }

  prompt += `Adatforrás: ${economicData.source}. `
  prompt += `A szöveg legyen semleges, adatalapú, rövid (max 250 szó), és ne tartalmazzon tanácsadást vagy ajánlásokat.`

  const result = await generateContent(prompt, systemPrompt)
  return result.content
}

/**
 * Generate purchasing power explanation
 */
export async function generatePurchasingPowerExplanation(
  economicData: {
    currentInflation: number | null
    currentYear: number
  }
): Promise<string> {
  const systemPrompt = `Te egy pénzügyi tájékoztató író vagy. Feladatod objektív, semleges, adatalapú szövegek írása magyar nyelven. 
A szövegeknek:
- Ténylegesen kell lenniük, nem marketing nyelvűek
- Semleges hangvételűek
- Adatokra alapozottak
- Rövidek és tömörek (max 150 szó)
- Nem tartalmaznak tanácsadást vagy ajánlásokat`

  let prompt = `Magyarázzd el objektíven, mit jelent az infláció a vásárlóerőre. `

  if (economicData.currentInflation !== null) {
    prompt += `Az aktuális inflációs ráta ${economicData.currentInflation.toFixed(1)}%. `
    if (economicData.currentInflation > 0) {
      prompt += `Magyarázd el, hogy ez mit jelent a pénz vásárlóerejére. `
    } else if (economicData.currentInflation < 0) {
      prompt += `Magyarázd el, hogy a defláció mit jelent a vásárlóerőre. `
    }
  }

  prompt += `A szöveg legyen semleges, adatalapú, rövid (max 150 szó), és ne tartalmazzon tanácsadást vagy ajánlásokat. 
Ne használj marketing nyelvet vagy felhívásokat.`

  const result = await generateContent(prompt, systemPrompt)
  return result.content
}
