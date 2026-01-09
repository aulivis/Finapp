import React from 'react'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import Link from 'next/link'
import { getMacroData } from '@/lib/data/macro-data'
import { colors, spacing, typography } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default async function Home() {
  // Fetch M2 data for the calculator
  const macroData = await getMacroData('HU')
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: colors.background.default,
      padding: '0'
    }}>
      {/* Hero and Calculator sections - Client component for state management */}
      <LandingPageClient macroData={macroData} />

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: `${spacing['4xl']} ${spacing.xl}`
      }}>

        {/* Section 3 - Access Explanation */}
        <Card hover style={{ marginBottom: spacing['4xl'] }}>
          <h3 style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            <strong>Mit jelent ez a számodra</strong>?
          </h3>
          <div style={{
            fontSize: typography.fontSize.md,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            marginBottom: spacing.xl,
            fontWeight: typography.fontWeight.normal
          }}>
            <p style={{ marginBottom: spacing.lg }}>
              A fenti számítás egy általános példa.
            </p>
            <p style={{ marginBottom: spacing.lg }}>
              A fizetős hozzáféréssel a <strong>saját pénzedre és időtávodra</strong> számolunk.
            </p>
            <p style={{ marginBottom: spacing.lg, fontWeight: typography.fontWeight.semibold }}>
              <strong>Mit kapsz a hozzáféréssel?</strong>
            </p>
            <ul style={{
              margin: `0 0 ${spacing.lg} 0`,
              paddingLeft: spacing.xl,
              listStyle: 'disc'
            }}>
              <li style={{ marginBottom: spacing.md }}>
                <strong>Személyre szabott inflációs számítás</strong><br />
                Saját összeggel és időszakkal, valós adatok alapján.
              </li>
              <li style={{ marginBottom: spacing.md }}>
                <strong>&quot;Semmit sem csinálok&quot; forgatókönyv</strong><br />
                Megmutatja, hogyan alakul a megtakarításod vásárlóereje nyugdíjkorhatárig, ha nem hozol döntést.
              </li>
              <li style={{ marginBottom: spacing.md }}>
                <strong>Egyszerű, jelszómentes hozzáférés</strong><br />
                Fizetés után emailben küldjük a személyes hozzáférési linkedet.
              </li>
            </ul>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/fizetes">
              <Button variant="primary" size="md">
                👉 Személyre szabott számítás megnyitása
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
