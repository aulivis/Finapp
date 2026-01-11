import { NextRequest } from 'next/server'
import { createSuccessResponse, ApiErrors } from '@/lib/utils/api-response'

/**
 * Newsletter signup API endpoint
 * Stores email addresses for newsletter subscription
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return ApiErrors.badRequest('Email cím megadása kötelező.')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return ApiErrors.badRequest('Érvénytelen email cím formátum.')
    }

    // TODO: Implement actual newsletter subscription storage
    // Store email in database (create a newsletter_subscribers table in Supabase)

    return createSuccessResponse({
      message: 'Sikeresen feliratkoztál a hírlevélre.',
      email: email.toLowerCase().trim()
    })
  } catch (error: any) {
    console.error('Newsletter signup error:', error)
    return ApiErrors.internalServerError('Hiba történt a feliratkozás során.')
  }
}
