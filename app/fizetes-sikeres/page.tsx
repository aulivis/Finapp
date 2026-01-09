import React from 'react'
import Link from 'next/link'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'

interface PageProps {
  searchParams: { session_id?: string }
}

export default function PaymentSuccessPage({ searchParams }: PageProps) {
  const sessionId = searchParams.session_id

  return (
    <div id="main-content" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
      backgroundColor: colors.background.default
    }}>
      <Card style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing.lg,
          color: colors.text.primary,
          lineHeight: typography.lineHeight.tight
        }}>
          Fizetés sikeres
        </h1>
        <p style={{
          fontSize: typography.fontSize.lg,
          lineHeight: typography.lineHeight.relaxed,
          color: colors.text.secondary,
          marginBottom: spacing['2xl'],
          fontWeight: typography.fontWeight.normal
        }}>
          A fizetés sikeresen megtörtént. A hozzáférési linket emailben küldjük 
          néhány perc múlva. A link a személyre szabott számítási eszközökhöz 
          való hozzáférést biztosítja.
        </p>

        <Alert type="success" style={{ marginTop: spacing['2xl'], marginBottom: spacing['2xl'] }}>
          <strong>Email tájékoztatás:</strong> Negyedévente egyszer 
          automatikus emailt küldünk, amely az aktuális gazdasági változásokat összefoglalja. 
          Nem küldünk marketing emailt.
        </Alert>

        {sessionId && typeof sessionId === 'string' && sessionId.length > 0 && (
          <p style={{
            fontSize: typography.fontSize.xs,
            color: colors.text.muted,
            marginBottom: spacing.xl,
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            fontWeight: typography.fontWeight.normal
          }}>
            Munkamenet ID: {sessionId.substring(0, 20)}...
          </p>
        )}
        <Link href="/">
          <Button variant="primary" size="md">
            Vissza a főoldalra
          </Button>
        </Link>
      </Card>
      <FooterDisclaimer />
    </div>
  )
}
