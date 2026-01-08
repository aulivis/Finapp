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
          Fizetés megszakítva
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#4B5563',
          marginBottom: '32px'
        }}>
          A fizetési folyamat megszakadt. A vásárlás újraindítható.
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
