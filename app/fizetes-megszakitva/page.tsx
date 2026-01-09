import React from 'react'
import Link from 'next/link'
import FooterDisclaimer from '@/components/FooterDisclaimer'

export default function PaymentCancelledPage() {
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
          Fizetés megszakítva
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.7',
          color: '#1F2937',
          marginBottom: '32px',
          fontWeight: '400'
        }}>
          A fizetési folyamat megszakadt. A vásárlás újraindítható.
        </p>
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
