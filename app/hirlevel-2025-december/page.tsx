import type { Metadata } from 'next'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import ContextaWordmark from '@/components/ContextaWordmark'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import NewsletterSubscriptionBox from '@/components/NewsletterSubscriptionBox'
import BackLink from '@/components/BackLink'

export const metadata: Metadata = {
  title: 'Hírlevél 2025. december | Contexta',
  description: 'Havi pénzügyi összefoglaló - 2025. december',
  robots: {
    index: true,
    follow: true,
  },
}

export default function NewsletterPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 50%, #F9FAFB 100%)',
      padding: `${spacing['4xl']} 0`,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: `0 ${spacing.md}`,
      }}>
        {/* Wordmark */}
        <div style={{
          marginBottom: spacing['3xl'],
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ContextaWordmark />
        </div>

        {/* Back to home link */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <BackLink />
        </div>

        {/* Newsletter Content */}
        <article style={{
          padding: spacing['2xl'],
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.lg,
          boxShadow: shadows.md,
          marginBottom: spacing['3xl'],
        }}>
          <header style={{
            marginBottom: spacing['2xl'],
            paddingBottom: spacing.xl,
            borderBottom: `1px solid ${colors.gray[200]}`,
          }}>
            <h1 style={{
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.md,
              lineHeight: typography.lineHeight.tight,
            }}>
              Hírlevél 2025. december
            </h1>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.text.muted,
              margin: 0,
              fontStyle: 'italic',
            }}>
              Havi pénzügyi összefoglaló
            </p>
          </header>

          {/* Newsletter Content Area - This will be populated with monthly content */}
          <div style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
          }}>
            {/* Placeholder content - replace with actual newsletter content */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                Bevezető
              </h2>
              <p style={{ marginBottom: spacing.md }}>
                Üdvözöllek a Contexta havi hírlevelében! Ebben a számban összefoglaljuk a legfontosabb pénzügyi eseményeket és trendeket, amelyek hatással vannak a pénzed vásárlóerejére.
              </p>
            </section>

            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                Főbb témák
              </h2>
              <p style={{ marginBottom: spacing.md }}>
                Ez egy példa hírlevél, amely bemutatja a template struktúráját. A tényleges tartalom minden hónapban frissül, és tartalmazza az aktuális pénzügyi trendeket, inflációs adatokat és piaci elemzéseket.
              </p>
            </section>

            {/* Add more sections as needed for the actual newsletter content */}
          </div>
        </article>

        {/* Newsletter Subscription Box */}
        <NewsletterSubscriptionBox />
      </div>

      {/* Footer - Full width */}
      <FooterDisclaimer />
    </main>
  )
}
