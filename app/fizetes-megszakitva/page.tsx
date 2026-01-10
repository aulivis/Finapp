import React from 'react'
import Link from 'next/link'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'

export default function PaymentCancelledPage() {
  return (
    <div id="main-content" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
      background: 'linear-gradient(to bottom, #F9FAFB 0%, #F3F4F6 100%)'
    }}>
      <Card style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing.lg,
          color: colors.text.primary,
          lineHeight: typography.lineHeight.tight
        }}>
          Fizetés megszakítva
        </h1>
        <Alert type="warning" style={{ marginBottom: spacing['2xl'] }}>
          A fizetési folyamat megszakadt. A vásárlás újraindítható.
        </Alert>
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
