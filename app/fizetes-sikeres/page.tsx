import React from 'react'
import Link from 'next/link'
import FooterDisclaimer from '@/components/FooterDisclaimer'

interface PageProps {
  searchParams: { session_id?: string }
}

export default function PaymentSuccessPage({ searchParams }: PageProps) {
  const sessionId = searchParams.session_id

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#F9FAFB'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '48px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#111827',
          lineHeight: '1.3'
        }}>
          Fizetés sikeres
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.7',
          color: '#1F2937',
          marginBottom: '32px',
          fontWeight: '400'
        }}>
          A fizetés sikeresen megtörtént. A hozzáférési linket emailben küldjük 
          néhány perc múlva. A link a személyre szabott számítási eszközökhöz 
          való hozzáférést biztosítja.
        </p>

        <div style={{
          marginTop: '32px',
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#F9FAFB',
          borderRadius: '8px'
        }}>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#1F2937',
            margin: '0',
            fontWeight: '400'
          }}>
            <strong style={{ fontWeight: '600', color: '#111827' }}>Email tájékoztatás:</strong> Negyedévente egyszer 
            automatikus emailt küldünk, amely az aktuális gazdasági változásokat összefoglalja. 
            Nem küldünk marketing emailt.
          </p>
        </div>

        {sessionId && typeof sessionId === 'string' && sessionId.length > 0 && (
          <p style={{
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '24px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            fontWeight: '400'
          }}>
            Munkamenet ID: {sessionId.substring(0, 20)}...
          </p>
        )}
        <Link href="/" style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#2DD4BF',
          color: '#FFFFFF',
          textDecoration: 'none',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background-color 0.15s ease'
        }}>
          Vissza a főoldalra
        </Link>
      </div>
      <FooterDisclaimer />
    </div>
  )
}
