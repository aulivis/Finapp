import React from 'react'
import LandingPageClient from '@/components/LandingPageClient'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import Link from 'next/link'
import { getMacroData } from '@/lib/data/macro-data'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import { Check, ArrowRight } from 'lucide-react'

export default async function Home() {
  // Fetch M2 data for the calculator
  const macroData = await getMacroData('HU')
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #F9FAFB 0%, #F3F4F6 100%)',
      padding: '0'
    }}>
      {/* Hero and Calculator sections - Client component for state management */}
      <LandingPageClient macroData={macroData} />

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: `${spacing['5xl']} ${spacing.xl} ${spacing['4xl']} ${spacing.xl}`
      }}>

        {/* CTA Section - Redesigned with Professional UI/UX */}
        <div style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.primaryLight} 100%)`,
          borderRadius: borderRadius.xl,
          padding: spacing['3xl'],
          border: `1px solid ${colors.primaryBorder}40`,
          boxShadow: `${shadows.xl}, inset 0 1px 0 0 rgba(255, 255, 255, 0.7)`,
          marginBottom: spacing['4xl'],
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          {/* Content */}
          <div style={{ position: 'relative' }}>
            {/* Heading */}
            <h2 style={{
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.semibold,
              marginBottom: spacing.xl,
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
              textAlign: 'center'
            }}>
              Mit jelent ez a <span style={{ color: colors.primary }}>számodra</span>?
            </h2>

            {/* Intro Text */}
            <p style={{
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.secondary,
              marginBottom: spacing['2xl'],
              textAlign: 'center',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              A fenti számítás egy <strong>általános példa</strong>. A fizetős hozzáféréssel a <strong>saját pénzedre és időtávodra</strong> számolunk valós adatok alapján.
            </p>

            {/* Benefits Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: spacing.xl,
              marginBottom: spacing['3xl']
            }}>
              {/* Benefit 1 */}
              <div style={{
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: `${shadows.sm}, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  marginBottom: spacing.md
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.successLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={20} color={colors.success} strokeWidth={2.5} />
                  </div>
                  <h3 style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Személyre szabott számítás
                  </h3>
                </div>
                <p style={{
                  fontSize: typography.fontSize.md,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.secondary,
                  margin: 0,
                  paddingLeft: '52px'
                }}>
                  Saját összeggel és időszakkal, valós adatok alapján.
                </p>
              </div>

              {/* Benefit 2 */}
              <div style={{
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: `${shadows.sm}, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  marginBottom: spacing.md
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.infoLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={20} color={colors.info} strokeWidth={2.5} />
                  </div>
                  <h3 style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    &quot;Semmit sem csinálok&quot; forgatókönyv
                  </h3>
                </div>
                <p style={{
                  fontSize: typography.fontSize.md,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.secondary,
                  margin: 0,
                  paddingLeft: '52px'
                }}>
                  Láthatod, hogyan alakul a megtakarításod vásárlóereje nyugdíjkorhatárig.
                </p>
              </div>

              {/* Benefit 3 */}
              <div style={{
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: `${shadows.sm}, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  marginBottom: spacing.md
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.warningLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={20} color={colors.warning} strokeWidth={2.5} />
                  </div>
                  <h3 style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Egyszerű hozzáférés
                  </h3>
                </div>
                <p style={{
                  fontSize: typography.fontSize.md,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.secondary,
                  margin: 0,
                  paddingLeft: '52px'
                }}>
                  Jelszómentes, fizetés után emailben küldjük a személyes linkedet.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div style={{
              textAlign: 'center',
              paddingTop: spacing.xl,
              marginTop: spacing.xl,
              borderTop: `1px solid ${colors.gray[200]}`
            }}>
              <Link href="/fizetes" style={{ display: 'inline-block' }}>
                <Button 
                  variant="primary" 
                  size="lg"
                  style={{
                    fontSize: typography.fontSize.lg,
                    padding: `${spacing.md} ${spacing['2xl']}`,
                    fontWeight: typography.fontWeight.semibold,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: spacing.md,
                    boxShadow: shadows.lg
                  }}
                >
                  Személyre szabott számítás megnyitása
                  <ArrowRight size={20} strokeWidth={2.5} />
                </Button>
              </Link>
              <p style={{
                marginTop: spacing.md,
                fontSize: typography.fontSize.sm,
                color: colors.text.muted,
                marginBottom: 0
              }}>
                Nincs regisztráció • Azonnali hozzáférés
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
