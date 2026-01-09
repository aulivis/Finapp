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
      padding: '32px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#1F2937',
        marginBottom: '24px',
        fontWeight: '400'
      }}>
        Ez az eszköz kizárólag oktatási célokat szolgál, nem minősül pénzügyi 
        tanácsadásnak. A számítások feltételezéseken alapulnak.
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '10px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#1F2937'
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
            padding: '12px 16px',
            fontSize: '16px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            color: '#111827',
            fontFamily: 'inherit',
            fontWeight: '400'
          }}
        />
      </div>

      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#F9FAFB',
          borderRadius: '8px',
          color: '#1F2937',
          fontSize: '14px',
          marginBottom: '16px',
          fontWeight: '400'
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 24px',
          fontSize: '15px',
          fontWeight: '500',
          color: loading ? '#9CA3AF' : '#FFFFFF',
          backgroundColor: loading ? '#E5E7EB' : '#2DD4BF',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s ease'
        }}
      >
        {loading ? 'Feldolgozás...' : 'Fizetés'}
      </button>

      <p style={{
        fontSize: '14px',
        color: '#6B7280',
        marginTop: '16px',
        lineHeight: '1.6',
        fontWeight: '400'
      }}>
        A fizetés után emailben kapja meg a hozzáférési linket. 
        Jelszó nem szükséges, csak az email cím alapján történik az azonosítás.
      </p>
    </form>
  )
}
