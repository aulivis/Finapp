import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICE_ID } from '@/lib/stripe/config'
import { normalizeEmail, isValidEmail } from '@/lib/utils/email'
import { rateLimit } from '@/lib/utils/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Túl sok kérés. Kérjük, próbálja újra később.' },
        { status: 429 }
      )
    }

    // Limit body size
    const MAX_BODY_SIZE = 1024 // 1KB is more than enough for email
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'A kérés túl nagy.' },
        { status: 413 }
      )
    }

    const body = await request.json()
    const { email } = body

    // Validate email exists and is a string
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Az email cím megadása kötelező.' },
        { status: 400 }
      )
    }

    // Validate email length (RFC 5321: max 320 characters)
    if (email.length > 320) {
      return NextResponse.json(
        { error: 'Az email cím túl hosszú.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Az email cím formátuma nem megfelelő.' },
        { status: 400 }
      )
    }

    if (!STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: 'A fizetési rendszer jelenleg nem elérhető.' },
        { status: 500 }
      )
    }

    const normalizedEmail = normalizeEmail(email)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/fizetes-sikeres?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/fizetes-megszakitva`,
      customer_email: normalizedEmail,
      metadata: {
        email: normalizedEmail,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'A fizetési folyamat jelenleg nem elérhető.' },
      { status: 500 }
    )
  }
}
