import React from 'react'
import PaymentForm from '@/components/PaymentForm'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import Link from 'next/link'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'

export default function PaymentPage() {
  return (
    <main id="main-content" style={{
      minHeight: '100vh',
      backgroundColor: colors.background.default,
      padding: '0'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: `${spacing['4xl']} ${spacing.xl}`
      }}>
        <header style={{
          marginBottom: spacing['3xl'],
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            Hozzáférés vásárlása
          </h1>
          <p style={{
            fontSize: typography.fontSize.lg,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            maxWidth: '500px',
            margin: '0 auto',
            fontWeight: typography.fontWeight.normal
          }}>
            A fizetős hozzáférés személyre szabott számításokat tartalmaz. 
            A hozzáférés 1 évig érvényes, email-cím alapján működik, jelszó nélkül.
          </p>
        </header>

        <PaymentForm />

        <div style={{ marginTop: spacing.xl, textAlign: 'center' }}>
          <Link href="/">
            <Button variant="secondary" size="md">
              Vissza a kezdőlapra
            </Button>
          </Link>
        </div>
      </div>

      <FooterDisclaimer />
    </main>
  )
}
