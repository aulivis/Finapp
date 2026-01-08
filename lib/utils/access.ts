import { supabaseAdmin } from '@/lib/supabase/server'
import { UserAccess } from '@/lib/types/database'
import { normalizeEmail } from './email'

/**
 * Check if an email has valid paid access
 */
export async function hasAccess(email: string): Promise<boolean> {
  if (!email || typeof email !== 'string') {
    return false
  }

  const normalizedEmail = normalizeEmail(email)
  
  // Additional validation: ensure email is not empty after normalization
  if (!normalizedEmail || normalizedEmail.length === 0) {
    return false
  }

  const now = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from('users_access')
    .select('access_valid_until')
    .eq('email', normalizedEmail)
    .gt('access_valid_until', now)
    .single()

  if (error || !data) {
    return false
  }

  return true
}

/**
 * Grant access to an email address for one year
 */
export async function grantAccess(
  email: string,
  stripeCustomerId?: string,
  stripeCheckoutSessionId?: string
): Promise<UserAccess | null> {
  if (!email || typeof email !== 'string') {
    console.error('Invalid email provided to grantAccess')
    return null
  }

  const normalizedEmail = normalizeEmail(email)
  
  // Validate email is not empty after normalization
  if (!normalizedEmail || normalizedEmail.length === 0) {
    console.error('Email is empty after normalization')
    return null
  }
  
  // Calculate access valid until (1 year from now)
  const accessValidUntil = new Date()
  accessValidUntil.setFullYear(accessValidUntil.getFullYear() + 1)

  // Check if access already exists
  const existing = await supabaseAdmin
    .from('users_access')
    .select('*')
    .eq('email', normalizedEmail)
    .single()

  if (existing.data) {
    // Update existing record - extend access by 1 year from current expiry or now
    const currentExpiry = new Date(existing.data.access_valid_until)
    const now = new Date()
    
    // Validate expiry date
    let newExpiry: Date
    if (isNaN(currentExpiry.getTime())) {
      console.error('Invalid expiry date in existing access record', { email: normalizedEmail })
      // Use new expiry if existing is invalid
      newExpiry = accessValidUntil
    } else {
      newExpiry = currentExpiry > now 
        ? new Date(currentExpiry.getFullYear() + 1, currentExpiry.getMonth(), currentExpiry.getDate())
        : accessValidUntil
    }

    const { data, error } = await supabaseAdmin
      .from('users_access')
      .update({
        access_valid_until: newExpiry.toISOString(),
        stripe_customer_id: stripeCustomerId || existing.data.stripe_customer_id,
        stripe_checkout_session_id: stripeCheckoutSessionId || existing.data.stripe_checkout_session_id,
        updated_at: new Date().toISOString(),
      })
      .eq('email', normalizedEmail)
      .select()
      .single()

    if (error) {
      console.error('Error updating access:', error)
      return null
    }

    return data
  }

  // Create new access record
  const { data, error } = await supabaseAdmin
    .from('users_access')
    .insert({
      email: normalizedEmail,
      access_valid_until: accessValidUntil.toISOString(),
      stripe_customer_id: stripeCustomerId,
      stripe_checkout_session_id: stripeCheckoutSessionId,
    })
    .select()
    .single()

  if (error) {
    console.error('Error granting access:', error)
    return null
  }

  return data
}

/**
 * Get access information for an email
 */
export async function getAccessInfo(email: string): Promise<UserAccess | null> {
  if (!email || typeof email !== 'string') {
    return null
  }

  const normalizedEmail = normalizeEmail(email)
  
  // Validate email is not empty after normalization
  if (!normalizedEmail || normalizedEmail.length === 0) {
    return null
  }

  const { data, error } = await supabaseAdmin
    .from('users_access')
    .select('*')
    .eq('email', normalizedEmail)
    .single()

  if (error || !data) {
    return null
  }

  return data
}
