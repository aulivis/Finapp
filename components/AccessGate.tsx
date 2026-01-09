import React from 'react'
import Link from 'next/link'

interface AccessGateProps {
  calculatorName?: string
}

export default function AccessGate({ calculatorName }: AccessGateProps) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{
          padding: '48px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#111827',
            lineHeight: '1.3'
          }}>
            Hozzáférés szükséges
          </h1>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#1F2937',
            marginBottom: '32px',
            fontWeight: '400'
          }}>
            <p style={{ marginBottom: '16px' }}>
              {calculatorName 
                ? `A "${calculatorName}" számítás hozzáférést igényel.`
                : 'Ez a számítás hozzáférést igényel.'}
            </p>
            <p style={{ marginBottom: '16px' }}>
              A hozzáférés személyre szabott számításokat tartalmaz. A számítások 
              saját adatok alapján működnek, és konkrét megtakarításokat, életkort 
              és egyéb paramétereket vesznek figyelembe.
            </p>
            <p style={{
              margin: '0',
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              A hozzáférés <strong style={{ fontWeight: '600' }}>1 évig érvényes</strong> a fizetés után.
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/fizetes"
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 24px',
                backgroundColor: '#2DD4BF',
                color: '#FFFFFF',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                textAlign: 'center',
                display: 'inline-block',
                transition: 'background-color 0.15s ease'
              }}
            >
              Hozzáférés
            </Link>
            <Link
              href="/"
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 24px',
                backgroundColor: '#FFFFFF',
                color: '#1F2937',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '400',
                textAlign: 'center',
                display: 'inline-block',
                transition: 'background-color 0.15s ease'
              }}
            >
              Vissza a nyilvános oldalra
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
