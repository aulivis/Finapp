import { NextRequest, NextResponse } from 'next/server'
import { sendQuarterlyUpdateEmails } from '@/lib/email/quarterly-update'

// Disable body parsing for cron route
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Cron endpoint for sending quarterly update emails
 * 
 * This should be called by:
 * - Vercel Cron Jobs (recommended)
 * - External cron service
 * - Manual trigger
 * 
 * Security: Add authentication header check in production
 */
export async function GET(request: NextRequest) {
  // Vercel Cron Jobs automatically add a special header
  // For additional security, we also check for CRON_SECRET
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get('authorization')
  const vercelCronHeader = request.headers.get('x-vercel-cron')

  // In production, require either Vercel cron header or CRON_SECRET
  if (process.env.NODE_ENV === 'production') {
    const isVercelCron = vercelCronHeader === '1'
    const isValidSecret = cronSecret && authHeader === `Bearer ${cronSecret}`

    if (!isVercelCron && !isValidSecret) {
      console.warn('Unauthorized cron access attempt', {
        hasVercelHeader: !!vercelCronHeader,
        hasAuthHeader: !!authHeader,
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  } else {
    // In development, allow with CRON_SECRET if set
    if (cronSecret) {
      if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
        console.warn('Unauthorized cron access attempt')
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }
  }

  try {
    const result = await sendQuarterlyUpdateEmails()
    
    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error in quarterly email cron:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
