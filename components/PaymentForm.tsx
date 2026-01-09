'use client'

import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function PaymentForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Client-side email validation
    if (!email || email.trim().length === 0) {
      setError('Az email cím megadása kötelező.')
      setLoading(false)
      return
    }

    if (email.length > 320) {
      setError('Az email cím túl hosszú.')
      setLoading(false)
      return
    }

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
      <form onSubmit={handleSubmit} style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#FFFFFF',
      borderRadius: '2px',
      border: '1px solid #E5E7EB'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '400',
        marginBottom: '16px',
        color: '#111827'
      }}>
        Hozzáférés vásárlása
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#4B5563',
        marginBottom: '16px',
        lineHeight: '1.6'
      }}>
        Email cím megadása után a fizetés során hozzáférés jön létre a személyre 
        szabott számítási eszközökhöz. A hozzáférés 1 évig érvényes.
      </p>
      <div style={{
        padding: '16px',
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        borderRadius: '2px',
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#4B5563',
        marginBottom: '24px'
      }}>
        Ez az eszköz kizárólag oktatási célokat szolgál, nem minősül pénzügyi 
        tanácsadásnak. A számítások feltételezéseken alapulnak.
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '400',
          color: '#111827'
        }}>
          Email cím
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="pelda@email.hu"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #E5E7EB',
            borderRadius: '2px',
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            color: '#111827'
          }}
        />
      </div>

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '2px',
          color: '#4B5563',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 24px',
          fontSize: '15px',
          fontWeight: '400',
          color: loading ? '#9CA3AF' : '#FFFFFF',
          backgroundColor: loading ? '#E5E7EB' : '#111827',
          border: 'none',
          borderRadius: '2px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Feldolgozás...' : 'Fizetés'}
      </button>

      <p style={{
        fontSize: '12px',
        color: '#4B5563',
        marginTop: '16px',
        lineHeight: '1.5'
      }}>
        A fizetés után emailben kapja meg a hozzáférési linket. 
        Jelszó nem szükséges, csak az email cím alapján történik az azonosítás.
      </p>
    </form>
  )
}
