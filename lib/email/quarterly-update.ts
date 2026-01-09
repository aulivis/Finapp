import { supabaseAdmin } from '@/lib/supabase/server'
import { getMacroData, getLatestMacroDataYear } from '@/lib/data/macro-data'
import { sendEmail } from '@/lib/utils/email-service'
import { getApprovedAIContent } from '@/lib/ai/content-storage'

/**
 * Get all users with valid access
 */
export async function getUsersWithValidAccess(): Promise<string[]> {
  const now = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from('users_access')
    .select('email')
    .gt('access_valid_until', now)

  if (error || !data) {
    console.error('Error fetching users with valid access:', error)
    return []
  }

  // Filter out invalid emails
  return data
    .map(row => row.email)
    .filter((email): email is string => typeof email === 'string' && email.length > 0 && email.length <= 320)
}

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
function getQuarterName(quarter: number): string {
  const names: Record<number, string> = {
    1: 'I. negyedév',
    2: 'II. negyedév',
    3: 'III. negyedév',
    4: 'IV. negyedév',
  }
  return names[quarter] || `${quarter}. negyedév`
}

/**
 * Get latest quarterly economic changes
 */
async function getLatestEconomicChanges() {
  const currentYear = new Date().getFullYear()
  const currentQuarter = getCurrentQuarter()
  
  // Get data for current year and previous year
  const currentYearData = await getMacroData('HU')
  const latestYear = await getLatestMacroDataYear('HU')
  
  if (!latestYear || currentYearData.length === 0) {
    return null
  }

  // Find current year's data
  const currentYearRecord = currentYearData.find(d => d.year === currentYear)
  const previousYearRecord = currentYearData.find(d => d.year === currentYear - 1)
  const latestRecord = currentYearData.find(d => d.year === latestYear)

  // Calculate average M2 growth for current year (if available)
  const currentYearM2Data = currentYearData
    .filter(d => d.year === currentYear && d.m2_growth !== null)
    .map(d => Number(d.m2_growth))
    .filter(val => isFinite(val))
  const averageM2Growth = currentYearM2Data.length > 0
    ? currentYearM2Data.reduce((sum, val) => sum + val, 0) / currentYearM2Data.length
    : null

  // Calculate average M2 growth for previous year (if available)
  const previousYearM2Data = currentYearData
    .filter(d => d.year === currentYear - 1 && d.m2_growth !== null)
    .map(d => Number(d.m2_growth))
    .filter(val => isFinite(val))
  const averageM2GrowthPrevious = previousYearM2Data.length > 0
    ? previousYearM2Data.reduce((sum, val) => sum + val, 0) / previousYearM2Data.length
    : null

  return {
    currentYear,
    currentQuarter,
    latestYear,
    currentInflation: currentYearRecord && isFinite(Number(currentYearRecord.inflation_rate)) 
      ? Number(currentYearRecord.inflation_rate) 
      : null,
    previousYearInflation: previousYearRecord && isFinite(Number(previousYearRecord.inflation_rate))
      ? Number(previousYearRecord.inflation_rate)
      : null,
    latestInflation: latestRecord && isFinite(Number(latestRecord.inflation_rate))
      ? Number(latestRecord.inflation_rate)
      : null,
    averageM2Growth,
    averageM2GrowthPrevious,
    source: latestRecord?.source || 'KSH (Központi Statisztikai Hivatal)',
  }
}

/**
 * Generate quarterly update email content
 * Uses AI-generated content if available and approved, otherwise falls back to template
 */
export async function generateQuarterlyUpdateContent(): Promise<{
  subject: string
  html: string
  text: string
}> {
  const economicData = await getLatestEconomicChanges()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const currentYear = new Date().getFullYear()
  const currentQuarter = getCurrentQuarter()
  const quarterName = getQuarterName(currentQuarter)
  const period = `${currentYear}-Q${currentQuarter}`

  // Try to get approved AI-generated content
  const aiSummary = await getApprovedAIContent('quarterly_summary', period, 'HU')
  const aiExplanation = await getApprovedAIContent('purchasing_power_explanation', period, 'HU')

  if (!economicData) {
    // Fallback content if no data available
    return {
      subject: `Pénzügyi adatok frissítése - ${currentYear} ${quarterName}`,
      html: `
        <h2>Negyedéves frissítés - ${currentYear} ${quarterName}</h2>
        <p>Az adatbázisban jelenleg nincs elérhető makroökonómiai adat.</p>
        <p>A számítási eszközök továbbra is elérhetők: <a href="${appUrl}">${appUrl}</a></p>
      `,
      text: `Negyedéves frissítés - ${currentYear} ${quarterName}\n\nAz adatbázisban jelenleg nincs elérhető makroökonómiai adat.\n\nA számítási eszközök továbbra is elérhetők: ${appUrl}`,
    }
  }

  // Calculate changes (only if we have economic data)
  let inflationChange: number | null = null
  let inflationChangeText = 'nincs elérhető adat'
  let m2Change: number | null = null
  let m2ChangeText = 'nincs elérhető adat'

  if (economicData) {
    inflationChange = economicData.currentInflation !== null && economicData.previousYearInflation !== null
      ? economicData.currentInflation - economicData.previousYearInflation
      : null

    inflationChangeText = inflationChange !== null
      ? inflationChange > 0
        ? `${inflationChange.toFixed(1)} százalékponttal nőtt`
        : inflationChange < 0
        ? `${Math.abs(inflationChange).toFixed(1)} százalékponttal csökkent`
        : 'változatlan maradt'
      : 'nincs elérhető adat'

    // M2 change
    if (economicData.averageM2Growth !== null && economicData.averageM2GrowthPrevious !== null) {
      m2Change = economicData.averageM2Growth - economicData.averageM2GrowthPrevious
      m2ChangeText = m2Change > 0
        ? `${m2Change.toFixed(1)} százalékponttal nőtt`
        : m2Change < 0
        ? `${Math.abs(m2Change).toFixed(1)} százalékponttal csökkent`
        : 'változatlan maradt'
    }
  }

  const subject = `Pénzügyi adatok frissítése - ${currentYear} ${quarterName}`

  const html = `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #212529; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background-color: #ffffff; padding: 32px; border-radius: 8px;">
        <h2 style="color: #212529; margin-bottom: 20px;">Negyedéves frissítés - ${currentYear} ${quarterName}</h2>

        <div style="margin-bottom: 24px; padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #212529; margin-top: 0; margin-bottom: 12px; font-size: 18px;">
            Inflációs trendek
          </h3>
          ${aiSummary ? `
            <div style="color: #495057; line-height: 1.6; margin: 0 0 12px 0;">
              ${aiSummary.content.split('\n').map((para: string) => `<p style="margin: 0 0 12px 0;">${para}</p>`).join('')}
            </div>
          ` : economicData.currentInflation !== null ? `
            <p style="color: #495057; line-height: 1.6; margin: 0 0 12px 0;">
              Az ${economicData.currentYear}. évi inflációs ráta <strong>${economicData.currentInflation.toFixed(1)}%</strong>.
              ${economicData.previousYearInflation !== null ? `
                Az előző évhez képest az infláció ${inflationChangeText}.
              ` : ''}
            </p>
          ` : `
            <p style="color: #495057; line-height: 1.6; margin: 0;">
              Az aktuális inflációs adatok még nem érhetők el.
            </p>
          `}
          <p style="color: #6c757d; font-size: 12px; margin: 12px 0 0 0;">
            Adatforrás: ${economicData?.source || 'KSH (Központi Statisztikai Hivatal)'}
          </p>
        </div>

        ${economicData.averageM2Growth !== null ? `
          <div style="margin-bottom: 24px; padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #212529; margin-top: 0; margin-bottom: 12px; font-size: 18px;">
              Pénzkínálat (M2) trendek
            </h3>
            <p style="color: #495057; line-height: 1.6; margin: 0 0 12px 0;">
              Az ${economicData.currentYear}. év átlagos M2 pénzkínálat növekedése 
              <strong>${economicData.averageM2Growth.toFixed(1)}%</strong>.
              ${economicData.averageM2GrowthPrevious !== null ? `
                Az előző évhez képest ${m2ChangeText}.
              ` : ''}
            </p>
            <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px; border-left: 2px solid #dee2e6; font-size: 12px; line-height: 1.6; color: #495057; margin-top: 12px;">
              <strong>Megjegyzés:</strong> Az M2 pénzkínálat növekedése kontextuális mutató, 
              amely a gazdaságban lévő pénzmennyiség változását mutatja. Ez a mutató nem 
              használható a számításokban, és nem mutat közvetlen ok-okozati összefüggést 
              az inflációval. A vásárlóerőt számos tényező befolyásolja.
            </div>
          </div>
        ` : ''}

        <div style="margin-bottom: 24px; padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #212529; margin-top: 0; margin-bottom: 12px; font-size: 18px;">
            Mit jelent ez a vásárlóerőre?
          </h3>
          ${aiExplanation ? `
            <div style="color: #495057; line-height: 1.6; margin: 0 0 12px 0;">
              ${aiExplanation.content.split('\n').map((para: string) => `<p style="margin: 0 0 12px 0;">${para}</p>`).join('')}
            </div>
            <p style="color: #495057; line-height: 1.6; margin: 12px 0 0 0;">
              A számítási eszközök segítségével megnézheti, hogyan érinti ez a saját megtakarításait.
            </p>
          ` : economicData.currentInflation !== null ? `
            <p style="color: #495057; line-height: 1.6; margin: 0 0 12px 0;">
              ${economicData.currentInflation > 0 ? `
                Az ${economicData.currentInflation.toFixed(1)}%-os inflációs ráta azt jelenti, hogy a pénz vásárlóereje 
                ebben az évben ennyivel csökkent. Ez azt jelenti, hogy ugyanaz az összeg kevesebb árut és 
                szolgáltatást vásárol, mint egy évvel ezelőtt.
              ` : economicData.currentInflation < 0 ? `
                Az ${Math.abs(economicData.currentInflation).toFixed(1)}%-os defláció azt jelenti, hogy a pénz 
                vásárlóereje növekedett. Ez azt jelenti, hogy ugyanaz az összeg több árut és szolgáltatást 
                vásárol, mint egy évvel ezelőtt.
              ` : `
                A nulla infláció azt jelenti, hogy a pénz vásárlóereje változatlan maradt.
              `}
            </p>
            <p style="color: #495057; line-height: 1.6; margin: 0;">
              A számítási eszközök segítségével megnézheti, hogyan érinti ez a saját megtakarításait.
            </p>
          ` : `
            <p style="color: #495057; line-height: 1.6; margin: 0;">
              Az aktuális adatok hiányában nem lehet pontos következtetést levonni a vásárlóerő változásáról.
            </p>
          `}
        </div>

        <div style="margin-bottom: 24px; padding: 16px; background-color: #e7f3ff; border-radius: 8px; border-left: 4px solid #0066cc;">
          <h3 style="color: #0066cc; margin-top: 0; margin-bottom: 12px; font-size: 18px;">
            Számítási eszközök frissítve
          </h3>
          <p style="color: #495057; line-height: 1.6; margin: 0 0 16px 0;">
            A számítási eszközök a legfrissebb makroökonómiai adatokkal frissültek. 
            Használhatja az eszközöket a saját adatai alapján történő számításokhoz.
          </p>
          <a href="${appUrl}/szamitasok" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #212529; text-decoration: none; border: 1px solid #dee2e6; border-radius: 4px; font-weight: 400;">
            Számítási eszközök
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 32px 0;">
        
        <p style="color: #6c757d; font-size: 12px; line-height: 1.6; margin: 0;">
          Ez egy automatikus, negyedévente egyszer küldött tájékoztató email. Ha nem szeretne több ilyen 
          üzenetet kapni, kérjük, lépjen velünk kapcsolatba.
        </p>
        <p style="color: #6c757d; font-size: 12px; line-height: 1.6; margin: 8px 0 0 0;">
          A Contexta kizárólag oktatási és tájékoztatási célokat szolgál. Nem minősül pénzügyi tanácsadásnak.
        </p>
      </div>
    </body>
    </html>
  `

  // Generate text version
  const summaryText = aiSummary 
    ? aiSummary.content 
    : economicData && economicData.currentInflation !== null 
      ? `Az ${economicData.currentYear}. évi inflációs ráta ${economicData.currentInflation.toFixed(1)}%. ${economicData.previousYearInflation !== null ? `Az előző évhez képest az infláció ${inflationChangeText}.` : ''}`
      : 'Az aktuális inflációs adatok még nem érhetők el.'

  const explanationText = aiExplanation
    ? aiExplanation.content
    : economicData && economicData.currentInflation !== null
      ? economicData.currentInflation > 0
        ? `Az ${economicData.currentInflation.toFixed(1)}%-os inflációs ráta azt jelenti, hogy a pénz vásárlóereje ebben az évben ennyivel csökkent. Ez azt jelenti, hogy ugyanaz az összeg kevesebb árut és szolgáltatást vásárol, mint egy évvel ezelőtt.`
        : economicData.currentInflation < 0
        ? `Az ${Math.abs(economicData.currentInflation).toFixed(1)}%-os defláció azt jelenti, hogy a pénz vásárlóereje növekedett. Ez azt jelenti, hogy ugyanaz az összeg több árut és szolgáltatást vásárol, mint egy évvel ezelőtt.`
        : `A nulla infláció azt jelenti, hogy a pénz vásárlóereje változatlan maradt.`
      : 'Az aktuális adatok hiányában nem lehet pontos következtetést levonni a vásárlóerő változásáról.'

  const m2Text = economicData && economicData.averageM2Growth !== null
    ? `Az ${economicData.currentYear}. év átlagos M2 pénzkínálat növekedése ${economicData.averageM2Growth.toFixed(1)}%. ${economicData.averageM2GrowthPrevious !== null ? `Az előző évhez képest ${m2ChangeText}.` : ''} Megjegyzés: Az M2 pénzkínálat növekedése kontextuális mutató, nem használható a számításokban.`
    : ''

  const text = `
Negyedéves frissítés - ${currentYear} ${quarterName}

Inflációs trendek

${summaryText}

Adatforrás: ${economicData?.source || 'KSH (Központi Statisztikai Hivatal)'}

${m2Text ? `Pénzkínálat (M2) trendek\n\n${m2Text}\n\n` : ''}Mit jelent ez a vásárlóerőre?

${explanationText}
${economicData && economicData.currentInflation !== null ? '\nA számítási eszközök segítségével megnézheti, hogyan érinti ez a saját megtakarításait.' : ''}

Számítási eszközök frissítve

A számítási eszközök a legfrissebb makroökonómiai adatokkal frissültek. 
Használhatja az eszközöket a saját adatai alapján történő számításokhoz.

Számítási eszközök: ${appUrl}/szamitasok

---

Ez egy automatikus, negyedévente egyszer küldött tájékoztató email. Ha nem szeretne több ilyen 
üzenetet kapni, kérjük, lépjen velünk kapcsolatba.

A Contexta kizárólag oktatási és tájékoztatási célokat szolgál. Nem minősül pénzügyi tanácsadásnak.
  `.trim()

  return { subject, html, text }
}

/**
 * Check if quarterly email was already sent this quarter
 */
export async function wasQuarterlyEmailSentThisQuarter(): Promise<boolean> {
  const currentYear = new Date().getFullYear()
  const currentQuarter = getCurrentQuarter()
  const quarterStart = new Date(currentYear, (currentQuarter - 1) * 3, 1)
  const quarterStartISO = quarterStart.toISOString()

  const { data, error } = await supabaseAdmin
    .from('email_logs')
    .select('id')
    .eq('email_type', 'quarterly_update')
    .gte('sent_at', quarterStartISO)
    .limit(1)

  if (error) {
    console.error('Error checking quarterly email status:', error)
    return false
  }

  return (data?.length || 0) > 0
}

/**
 * Send quarterly update emails to all users with valid access
 */
export async function sendQuarterlyUpdateEmails(): Promise<{
  sent: number
  failed: number
  errors: Array<{ email: string; error: string }>
}> {
  const alreadySent = await wasQuarterlyEmailSentThisQuarter()
  if (alreadySent) {
    console.log('Quarterly email already sent this quarter. Skipping.')
    return { sent: 0, failed: 0, errors: [] }
  }

  const users = await getUsersWithValidAccess()
  const { subject, html, text } = await generateQuarterlyUpdateContent()

  let sent = 0
  let failed = 0
  const errors: Array<{ email: string; error: string }> = []

  for (const email of users) {
    try {
      const success = await sendEmail({
        to: email,
        subject,
        html,
        text,
      })
      if (success) {
        await logEmail(email, 'quarterly_update', subject, 'sent')
        console.log(`✓ Sent quarterly update to ${email}`)
        sent++
      } else {
        await logEmail(email, 'quarterly_update', subject, 'failed', 'Email service returned false')
        errors.push({ email, error: 'Email service returned false' })
        failed++
        console.error(`✗ Failed to send quarterly update to ${email}`)
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error'
      await logEmail(email, 'quarterly_update', subject, 'failed', errorMessage)
      errors.push({ email, error: errorMessage })
      failed++
      console.error(`✗ Error sending quarterly update to ${email}:`, errorMessage)
    }
  }

  console.log(`Quarterly update emails: ${sent} sent, ${failed} failed`)
  return { sent, failed, errors }
}

/**
 * Log email to database
 */
async function logEmail(
  email: string,
  emailType: string,
  subject: string,
  status: 'sent' | 'failed' | 'bounced',
  errorMessage?: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('email_logs')
    .insert({
      email,
      email_type: emailType,
      subject,
      status,
      error_message: errorMessage || null,
    })

  if (error) {
    console.error('Error logging email:', error)
  }
}
