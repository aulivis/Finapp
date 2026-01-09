import React from 'react'
import Link from 'next/link'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'

interface AccessLayoutProps {
  children: React.ReactNode
}

export default function AccessLayout({ children }: AccessLayoutProps) {
  return (
    <div id="main-content" style={{
      minHeight: '100vh',
      backgroundColor: colors.background.default
    }}>
      <header style={{
        backgroundColor: colors.background.paper,
        borderBottom: `1px solid ${colors.gray[200]}`,
        padding: `${spacing.xl} 0`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `0 ${spacing.xl}`
        }}>
          <div style={{
            marginBottom: spacing.lg,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.semibold,
                margin: `0 0 ${spacing.xs} 0`,
                color: colors.text.primary,
                lineHeight: typography.lineHeight.tight
              }}>
                Számítási eszközök
              </h1>
              <p style={{
                fontSize: typography.fontSize.base,
                color: colors.text.muted,
                margin: 0,
                fontWeight: typography.fontWeight.normal
              }}>
                Aktuális gazdasági környezet
              </p>
            </div>

            <Link href="/">
              <Button variant="secondary" size="sm">
                Főoldal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${spacing['3xl']} ${spacing.xl}`
      }}>
        {children}
      </main>
    </div>
  )
}
