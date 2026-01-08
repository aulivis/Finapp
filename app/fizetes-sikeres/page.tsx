import { redirect } from 'next/navigation'
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
        borderRadius: '2px',
        border: '1px solid #E5E7EB',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '500',
          marginBottom: '16px',
          color: '#111827'
        }}>
          Fizetés sikeres
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#4B5563',
          marginBottom: '32px'
        }}>
          A fizetés sikeresen megtörtént. A hozzáférési linket emailben küldjük 
          néhány perc múlva. A link a személyre szabott számítási eszközökhöz 
          való hozzáférést biztosítja.
        </p>

        <div style={{
          marginTop: '32px',
          marginBottom: '32px',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <p style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#4B5563',
            margin: '0'
          }}>
            <strong style={{ color: '#4B5563' }}>Email tájékoztatás:</strong> Negyedévente egyszer 
            automatikus emailt küldünk, amely az aktuális gazdasági változásokat összefoglalja. 
            Nem küldünk marketing emailt.
          </p>
        </div>

        {sessionId && typeof sessionId === 'string' && sessionId.length > 0 && (
          <p style={{
            fontSize: '12px',
            color: '#4B5563',
            marginBottom: '24px',
            fontFamily: 'monospace',
            wordBreak: 'break-all'
          }}>
            Munkamenet ID: {sessionId.substring(0, 20)}...
          </p>
        )}
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
