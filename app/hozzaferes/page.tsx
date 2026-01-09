import React from 'react'
import { redirect } from 'next/navigation'
import { hasAccess } from '@/lib/utils/access'
import { isValidEmail } from '@/lib/utils/email'
import Link from 'next/link'
import FooterDisclaimer from '@/components/FooterDisclaimer'

interface PageProps {
  searchParams: { email?: string }
}

export default async function AccessPage({ searchParams }: PageProps) {
  const email = searchParams.email

  // Validate email parameter
  if (!email || typeof email !== 'string') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
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
            marginBottom: '16px', 
            color: '#111827',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.3'
          }}>
            Hozzáférés ellenőrzése
          </h1>
          <p style={{ 
            color: '#1F2937', 
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            A hozzáférési link nem található. A hozzáférési linket emailben küldjük.
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

  // Validate email format before checking access
  if (!isValidEmail(email)) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
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
            marginBottom: '16px', 
            color: '#111827',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.3'
          }}>
            Érvénytelen hozzáférési link
          </h1>
          <p style={{ 
            color: '#1F2937', 
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            A hozzáférési link formátuma nem megfelelő.
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

  const hasValidAccess = await hasAccess(email)

  if (!hasValidAccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
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
            marginBottom: '16px', 
            color: '#111827', 
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '1.3'
          }}>
            Hozzáférés lejárt
          </h1>
          <p style={{ 
            color: '#1F2937', 
            marginBottom: '24px', 
            lineHeight: '1.7', 
            fontSize: '16px',
            fontWeight: '400'
          }}>
            Az email címhez tartozó hozzáférés lejárt. 
            A hozzáférés 1 évig érvényes a fizetés után. Új hozzáféréshez 
            szükséges a fizetés megismétlése.
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
            marginTop: '16px',
            transition: 'background-color 0.15s ease'
          }}>
            Vissza a főoldalra
          </Link>
        </div>
        <FooterDisclaimer />
      </div>
    )
  }

  // Store access in session/cookie for this browser session
  // For simplicity, we'll use a query param approach
  // In production, you might want to use secure cookies
  redirect(`/szamitasok?email=${encodeURIComponent(email)}`)
}
