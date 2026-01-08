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
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '16px', color: '#212529' }}>
            Hozzáférés ellenőrzése
          </h1>
          <p style={{ color: '#4B5563', marginBottom: '24px' }}>
            A hozzáférési link nem található. A hozzáférési linket emailben küldjük.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            textDecoration: 'none',
            border: 'none',
            borderRadius: '2px',
            fontSize: '14px',
            fontWeight: '400'
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
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '16px', color: '#212529' }}>
            Érvénytelen hozzáférési link
          </h1>
          <p style={{ color: '#4B5563', marginBottom: '24px' }}>
            A hozzáférési link formátuma nem megfelelő.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            textDecoration: 'none',
            border: 'none',
            borderRadius: '2px',
            fontSize: '14px',
            fontWeight: '400'
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
          padding: '32px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '2px',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '16px', color: '#212529', fontWeight: '400' }}>
            Hozzáférés lejárt
          </h1>
          <p style={{ color: '#4B5563', marginBottom: '24px', lineHeight: '1.7', fontSize: '15px' }}>
            Az email címhez tartozó hozzáférés lejárt. 
            A hozzáférés 1 évig érvényes a fizetés után. Új hozzáféréshez 
            szükséges a fizetés megismétlése.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#ffffff',
            color: '#111827',
            textDecoration: 'none',
            border: '1px solid #E5E7EB',
            borderRadius: '2px',
            fontSize: '14px',
            fontWeight: '400',
            marginTop: '16px'
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
