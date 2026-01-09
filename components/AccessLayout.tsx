import React from 'react'
import Link from 'next/link'

interface AccessLayoutProps {
  children: React.ReactNode
}

export default function AccessLayout({ children }: AccessLayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB'
    }}>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '24px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            marginBottom: '16px'
          }}>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 8px 0',
              color: '#111827',
              lineHeight: '1.3'
            }}>
              Számítási eszközök
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              margin: 0,
              fontWeight: '400'
            }}>
              Aktuális gazdasági környezet
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Link
              href="/"
              style={{
                padding: '8px 16px',
                color: '#1F2937',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '400',
                backgroundColor: '#FFFFFF',
                transition: 'background-color 0.15s ease'
              }}
            >
              Főoldal
            </Link>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {children}
      </main>
    </div>
  )
}
