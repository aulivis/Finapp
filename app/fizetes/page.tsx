import React from 'react'
import PaymentForm from '@/components/PaymentForm'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export default function PaymentPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: '0'
    }}>
      <DisclaimerBanner />
      
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <header style={{
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '400',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Hozzáférés vásárlása
          </h1>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#4B5563',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            A fizetős hozzáférés személyre szabott számításokat tartalmaz. 
            A hozzáférés 1 évig érvényes, email-cím alapján működik, jelszó nélkül.
          </p>
        </header>

        <PaymentForm />
      </div>

      <FooterDisclaimer />
    </main>
  )
}
