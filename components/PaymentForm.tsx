'use client'

import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { colors, spacing } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Alert from '@/components/ui/Alert'
import Card from '@/components/ui/Card'
import PaymentProgress from '@/components/PaymentProgress'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function PaymentForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string): string | null => {
    if (!email || email.trim().length === 0) {
      return 'Az email cím megadása kötelező.'
    }
    if (email.length > 320) {
      return 'Az email cím túl hosszú.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return 'Érvényes email címet adj meg.'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || 'A fizetési folyamat jelenleg nem elérhető.'
        throw new Error(errorMessage)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('A fizetési rendszer jelenleg nem elérhető.')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error('A fizetési oldal jelenleg nem elérhető.')
      }
    } catch (err: any) {
      setError(err.message || 'A fizetési folyamat jelenleg nem elérhető.')
      setLoading(false)
    }
  }

  return (
    <Card style={{ maxWidth: '500px', margin: '0 auto' }}>
      <PaymentProgress currentStep={1} totalSteps={2} />
      
      <Alert type="info" style={{ marginBottom: spacing.xl }}>
        Ez az eszköz kizárólag oktatási célokat szolgál, nem minősül pénzügyi 
        tanácsadásnak. A számítások feltételezéseken alapulnak.
      </Alert>
      
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          label="Email cím"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="pelda@email.hu"
          error={error || undefined}
          helperText="A fizetés után emailben kapsz meg a hozzáférési linket."
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          style={{ width: '100%', marginTop: spacing.md }}
        >
          Fizetés
        </Button>

        <p style={{
          fontSize: '14px',
          color: colors.text.muted,
          marginTop: spacing.lg,
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          Jelszó nem szükséges, csak az email cím alapján történik az azonosítás.
        </p>
      </form>
    </Card>
  )
}
