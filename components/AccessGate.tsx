import React from 'react'
import Link from 'next/link'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface AccessGateProps {
  calculatorName?: string
}

export default function AccessGate({ calculatorName }: AccessGateProps) {
  return (
    <div id="main-content" style={{
      minHeight: '100vh',
      backgroundColor: colors.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${spacing['3xl']} ${spacing.xl}`
    }}>
      <Card style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing.lg,
          color: colors.text.primary,
          lineHeight: typography.lineHeight.tight
        }}>
          Hozzáférés szükséges
        </h1>

        <div style={{
          fontSize: typography.fontSize.lg,
          lineHeight: typography.lineHeight.relaxed,
          color: colors.text.secondary,
          marginBottom: spacing['2xl'],
          fontWeight: typography.fontWeight.normal
        }}>
          <p style={{ marginBottom: spacing.lg }}>
            {calculatorName 
              ? `A "${calculatorName}" számítás hozzáférést igényel.`
              : 'Ez a számítás hozzáférést igényel.'}
          </p>
          <p style={{ marginBottom: spacing.lg }}>
            A hozzáférés személyre szabott számításokat tartalmaz. A számítások 
            saját adatok alapján működnek, és konkrét megtakarításokat, életkort 
            és egyéb paramétereket vesznek figyelembe.
          </p>
          <p style={{
            margin: '0',
            padding: spacing.lg,
            backgroundColor: colors.background.subtle,
            borderRadius: '8px',
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.normal
          }}>
            A hozzáférés <strong style={{ fontWeight: typography.fontWeight.semibold }}>1 évig érvényes</strong> a fizetés után.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: spacing.md,
          flexWrap: 'wrap'
        }}>
          <Link href="/fizetes" style={{ flex: '1', minWidth: '200px' }}>
            <Button variant="primary" size="md" style={{ width: '100%' }}>
              Hozzáférés
            </Button>
          </Link>
          <Link href="/" style={{ flex: '1', minWidth: '200px' }}>
            <Button variant="secondary" size="md" style={{ width: '100%' }}>
              Vissza a nyilvános oldalra
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
