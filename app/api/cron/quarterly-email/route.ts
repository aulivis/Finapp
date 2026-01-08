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
  // Optional: Add authentication check
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // Require authentication if CRON_SECRET is set
  if (cronSecret) {
    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      // Log failed attempt (without exposing secret)
      console.warn('Unauthorized cron access attempt')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
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
