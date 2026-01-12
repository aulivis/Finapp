import { NextRequest } from 'next/server'
import { createSuccessResponse, ApiErrors } from '@/lib/utils/api-response'
import { supabaseAdmin } from '@/lib/supabase/server'

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

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      // If already subscribed and active, return success
      if (existing.is_active) {
        return createSuccessResponse({
          message: 'Sikeresen feliratkoztál a hírlevélre.',
          email: normalizedEmail
        })
      }

      // If unsubscribed, reactivate
      const { error: updateError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .update({ 
          is_active: true,
          unsubscribed_at: null
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error reactivating subscription:', updateError)
        return ApiErrors.internalServerError('Hiba történt a feliratkozás során.')
      }

      return createSuccessResponse({
        message: 'Sikeresen feliratkoztál a hírlevélre.',
        email: normalizedEmail
      })
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: normalizedEmail,
        is_active: true
      })

    if (insertError) {
      // Handle unique constraint violation (race condition)
      if (insertError.code === '23505') {
        return createSuccessResponse({
          message: 'Sikeresen feliratkoztál a hírlevélre.',
          email: normalizedEmail
        })
      }

      console.error('Error inserting newsletter subscriber:', insertError)
      return ApiErrors.internalServerError('Hiba történt a feliratkozás során.')
    }

    return createSuccessResponse({
      message: 'Sikeresen feliratkoztál a hírlevélre.',
      email: normalizedEmail
    })
  } catch (error: any) {
    console.error('Newsletter signup error:', error)
    return ApiErrors.internalServerError('Hiba történt a feliratkozás során.')
  }
}
