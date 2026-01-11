'use client'

import React, { useEffect, useRef } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/lib/design-system'
import Button from '@/components/ui/Button'
import ContextaWordmark from '@/components/ContextaWordmark'

const EXAMPLE_AMOUNT = 1000000
const EXAMPLE_START_YEAR = 2015
const EXAMPLE_END_YEAR = 2025

export default function HeroSection() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Add fade-in animation on mount
  useEffect(() => {
    if (sectionRef.current && !prefersReducedMotion) {
      sectionRef.current.style.opacity = '0'
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = `opacity ${transitions.slow}`
          sectionRef.current.style.opacity = '1'
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  // Calculate historical loss for the example
  const exampleData = calculatePurchasingPower(EXAMPLE_AMOUNT, EXAMPLE_START_YEAR, EXAMPLE_END_YEAR)
  const finalNominal = exampleData[exampleData.length - 1]?.nominal || EXAMPLE_AMOUNT
  const finalReal = exampleData[exampleData.length - 1]?.real || EXAMPLE_AMOUNT
  const loss = finalNominal - finalReal
  const lossPercentage = Math.round((loss / finalNominal) * 100)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator-section')
    if (calculatorSection) {
      const offset = 80 // Account for any fixed headers
      const elementPosition = calculatorSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header 
      ref={sectionRef}
      className="hero-section" 
      style={{
        background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 50%, #F9FAFB 100%)',
        padding: isMobile ? `${spacing['4xl']} 0 ${spacing['5xl']} 0` : `${spacing['5xl']} 0 ${spacing['5xl']} 0`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(45, 212, 191, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Wordmark */}
        <div style={{
          marginBottom: isMobile ? spacing['3xl'] : spacing['5xl']
        }}>
          <ContextaWordmark />
        </div>

        {/* Hero Content */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Main Headline */}
          <h1 style={{
            fontSize: isMobile ? typography.fontSize['4xl'] : typography.fontSize['6xl'],
            fontWeight: typography.fontWeight.bold,
            margin: `0 0 ${spacing.xl} 0`,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.03em'
          }}>
            Mi történik a pénzeddel, ha nem csinálsz semmit?
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            margin: `0 0 ${spacing['4xl']} 0`,
            fontWeight: typography.fontWeight.normal,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Az infláció miatt a pénz értéke idővel csökken — még akkor is, ha a számlán ugyanannyi forintot látsz.
          </p>

          {/* Impact Stat - Large, prominent */}
          <div style={{
            marginBottom: spacing['4xl'],
            padding: isMobile ? spacing['2xl'] : spacing['3xl'],
            background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.5) 100%)`,
            borderRadius: borderRadius.xl,
            border: `2px solid ${colors.primaryBorder}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`
            }} />
            
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? spacing.lg : spacing['2xl'],
              flexWrap: 'wrap'
            }}>
              <div style={{
                fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1
              }} className="tabular-nums">
                {formatCurrency(EXAMPLE_AMOUNT)}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
                color: colors.text.secondary,
                fontWeight: typography.fontWeight.normal
              }}>
                vásárlóereje
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
                color: colors.text.muted,
                padding: `${spacing.xs} ${spacing.md}`,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.full,
                fontWeight: typography.fontWeight.medium
              }}>
                {EXAMPLE_START_YEAR} → {EXAMPLE_END_YEAR}
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize['4xl'] : typography.fontSize['6xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.error,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1
              }} className="tabular-nums">
                –{lossPercentage}%
              </div>
            </div>
            <div style={{
              marginTop: spacing.lg,
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              fontWeight: typography.fontWeight.normal
            }}>
              Történelmi példa a KSH (Központi Statisztikai Hivatal) inflációs adatai alapján
            </div>
          </div>

          {/* Primary CTA Button - More prominent */}
          <div style={{
            marginBottom: spacing.xl
          }}>
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToCalculator}
              style={{
                fontSize: isMobile ? typography.fontSize.base : typography.fontSize.xl,
                padding: `${spacing.lg} ${spacing['3xl']}`,
                minWidth: isMobile ? '100%' : '280px',
                fontWeight: typography.fontWeight.semibold,
                boxShadow: shadows.xl,
                transform: 'translateY(0)',
                transition: transitions.all
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = shadows['2xl']
                }
              }}
              onMouseLeave={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = shadows.xl
                }
              }}
            >
              Nézd meg a saját számaidon
            </Button>
          </div>

          {/* Trust signals */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.lg,
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            fontWeight: typography.fontWeight.normal,
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <span>30 másodperc</span>
            </div>
            <div style={{
              display: isMobile ? 'none' : 'block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: colors.gray[300]
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <span style={{ fontSize: '18px' }}>🔒</span>
              <span>Nincs regisztráció</span>
            </div>
            <div style={{
              display: isMobile ? 'none' : 'block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: colors.gray[300]
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <span style={{ fontSize: '18px' }}>📊</span>
              <span>KSH adatok</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
