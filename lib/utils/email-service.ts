/**
 * Email service utility
 * Supports both Postmark and MailerLite
 */

import { isValidEmail } from './email'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options

  // Validate inputs
  if (!to || !subject || !html) {
    console.error('Missing required email fields', { to: !!to, subject: !!subject, html: !!html })
    return false
  }

  // Validate email format
  if (!isValidEmail(to)) {
    console.error('Invalid email address', { to })
    return false
  }

  // Try Postmark first
  if (process.env.POSTMARK_API_KEY) {
    try {
      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY,
        },
        body: JSON.stringify({
          From: process.env.POSTMARK_FROM_EMAIL || 'noreply@finapp.hu',
          To: to,
          Subject: subject,
          HtmlBody: html,
          TextBody: text || html.replace(/<[^>]*>/g, ''),
        }),
      })

      if (response.ok) {
        return true
      }
    } catch (error) {
      console.error('Postmark error:', error)
    }
  }

  // Try MailerLite as fallback
  if (process.env.MAILERLITE_API_KEY) {
    try {
      // MailerLite requires different API structure
      // This is a simplified version - adjust based on MailerLite API docs
      const response = await fetch('https://api.mailerlite.com/api/v2/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({
          emails: [to],
          subject,
          html,
        }),
      })

      if (response.ok) {
        return true
      }
    } catch (error) {
      console.error('MailerLite error:', error)
    }
  }

  console.error('No email service configured or all services failed')
  return false
}

/**
 * Generate access link for email
 */
export function generateAccessLink(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required to generate access link')
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  // Validate and sanitize base URL
  let sanitizedBaseUrl = baseUrl.trim()
  if (!sanitizedBaseUrl.startsWith('http://') && !sanitizedBaseUrl.startsWith('https://')) {
    sanitizedBaseUrl = 'https://' + sanitizedBaseUrl
  }
  
  // Remove trailing slash
  sanitizedBaseUrl = sanitizedBaseUrl.replace(/\/+$/, '')
  
  const encodedEmail = encodeURIComponent(email)
  return `${sanitizedBaseUrl}/hozzaferes?email=${encodedEmail}`
}
