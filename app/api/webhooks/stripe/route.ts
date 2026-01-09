import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { grantAccess } from '@/lib/utils/access'
import { sendEmail, generateAccessLink } from '@/lib/utils/email-service'
import { isValidEmail } from '@/lib/utils/email'

// Disable body parsing for webhook to get raw body
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Limit body size to prevent DoS attacks (Stripe webhooks are typically < 50KB)
  const MAX_BODY_SIZE = 100 * 1024 // 100KB
  
  const body = await request.text()
  
  if (body.length > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: 'A kérés túl nagy.' },
      { status: 413 }
    )
  }
  
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'A fizetési adatok ellenőrzése nem sikerült.' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'A fizetési rendszer jelenleg nem elérhető.' },
      { status: 500 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'A fizetési adatok ellenőrzése nem sikerült.' },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any

    const email = session.metadata?.email || session.customer_email
    const customerId = session.customer
    const sessionId = session.id

    // Validate email exists and is a string
    if (!email || typeof email !== 'string') {
      console.error('No valid email in checkout session', { sessionId })
      return NextResponse.json(
        { error: 'Az email cím nem található a fizetési adatokban.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.error('Invalid email format in checkout session', { email, sessionId })
      return NextResponse.json(
        { error: 'Az email cím formátuma nem megfelelő.' },
        { status: 400 }
      )
    }

    try {
      // Grant access in Supabase
      const access = await grantAccess(email, customerId, sessionId)

      if (!access) {
        console.error('Failed to grant access')
        return NextResponse.json(
          { error: 'A hozzáférés aktiválása jelenleg nem sikerült.' },
          { status: 500 }
        )
      }

      // Send access email
      const accessLink = generateAccessLink(email)
      const validUntilDate = new Date(access.access_valid_until)
      const formattedDate = isNaN(validUntilDate.getTime()) 
        ? '1 évig' 
        : validUntilDate.toLocaleDateString('hu-HU')
      
      const emailSent = await sendEmail({
        to: email,
        subject: 'Hozzáférése aktiválva - Finapp',
        html: `
          <h2>Hozzáférés aktiválva</h2>
          <p>Hozzáférése aktiválva lett a Finapp számítási eszközeihez.</p>
          <p>Hozzáférési link:</p>
          <p><a href="${accessLink.replace(/[<>&"']/g, (char) => {
            const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#039;' }
            return map[char] || char
          })}" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #212529; text-decoration: none; border: 1px solid #dee2e6; border-radius: 4px; font-weight: 400;">Hozzáférések</a></p>
          <p>Vagy másolja be ezt a linket a böngészőjébe:</p>
          <p style="word-break: break-all;">${accessLink.replace(/[<>&"']/g, (char) => {
            const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#039;' }
            return map[char] || char
          })}</p>
          <p>Hozzáférése ${formattedDate.replace(/[<>&"']/g, (char) => {
            const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#039;' }
            return map[char] || char
          })}-ig érvényes.</p>
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 24px 0;">
          <p style="font-size: 13px; line-height: 1.6; color: #6c757d; margin: 0 0 12px 0;">
            <strong style="color: #495057;">Email tájékoztatás:</strong> Negyedévente egyszer automatikus emailt küldünk, 
            amely az aktuális gazdasági változásokat összefoglalja. Nem küldünk marketing emailt.
          </p>
          <p style="font-size: 12px; color: #6c757d; margin: 0;">Ez egy automatikus üzenet, erre az emailre nem kell válaszolni.</p>
        `,
        text: `
Köszönjük a vásárlást!

Hozzáférése sikeresen aktiválva lett a Finapp számítási eszközeihez.

Hozzáférési linkje: ${accessLink}

Hozzáférése ${new Date(access.access_valid_until).toLocaleDateString('hu-HU')}-ig érvényes.

---

Email tájékoztatás: Negyedévente egyszer automatikus emailt küldünk, amely az aktuális gazdasági változásokat összefoglalja. Nem küldünk marketing emailt.
        `,
      })

      if (!emailSent) {
        console.error('Failed to send access email')
        // Don't fail the webhook if email fails, access is already granted
      }

      return NextResponse.json({ success: true })
    } catch (error: any) {
      console.error('Error processing webhook:', error)
      return NextResponse.json(
        { error: 'A fizetési feldolgozás jelenleg nem sikerült.' },
        { status: 500 }
      )
    }
  }

  // Return 200 for other event types
  return NextResponse.json({ received: true })
}
