import React from 'react'
import PaymentForm from '@/components/PaymentForm'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import Link from 'next/link'

export default function PaymentPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: '0'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <header style={{
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#111827',
            lineHeight: '1.3'
          }}>
            Hozzáférés vásárlása
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#1F2937',
            maxWidth: '500px',
            margin: '0 auto',
            fontWeight: '400'
          }}>
            A fizetős hozzáférés személyre szabott számításokat tartalmaz. 
            A hozzáférés 1 évig érvényes, email-cím alapján működik, jelszó nélkül.
          </p>
        </header>

        <PaymentForm />

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#1F2937',
            textDecoration: 'none',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.15s ease'
          }}>
            Vissza a kezdőlapra
          </Link>
        </div>
      </div>

      <FooterDisclaimer />
    </main>
  )
}
