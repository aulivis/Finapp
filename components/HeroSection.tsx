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
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F9FAFB 100%)',
        padding: isMobile ? `${spacing['3xl']} 0 ${spacing['4xl']} 0` : `${spacing['5xl']} 0 ${spacing['4xl']} 0`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        {/* Wordmark */}
        <div style={{
          marginBottom: isMobile ? spacing['2xl'] : spacing['4xl']
        }}>
          <ContextaWordmark />
        </div>

        {/* Hero Content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Main Headline */}
          <h1 style={{
            fontSize: isMobile ? typography.fontSize['4xl'] : typography.fontSize['6xl'],
            fontWeight: typography.fontWeight.semibold,
            margin: `0 0 ${spacing.xl} 0`,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Mi történik a pénzeddel, ha nem csinálsz semmit?
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            margin: `0 0 ${spacing['3xl']} 0`,
            fontWeight: typography.fontWeight.normal
          }}>
            Az infláció miatt a pénz értéke idővel csökken — még akkor is, ha a számlán ugyanannyi forintot látsz.
          </p>

          {/* Primary CTA Button */}
          <div style={{
            marginBottom: spacing['2xl']
          }}>
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToCalculator}
              style={{
                fontSize: typography.fontSize.lg,
                padding: `${spacing.md} ${spacing['2xl']}`,
                minWidth: isMobile ? '100%' : 'auto',
                fontWeight: typography.fontWeight.semibold,
                boxShadow: shadows.lg
              }}
            >
              Nézd meg a saját számaidon
            </Button>
          </div>

          {/* Static Result Block - Moved below CTA for better hierarchy */}
          <div style={{
            padding: spacing.xl,
            backgroundColor: colors.primaryLight,
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.primaryBorder}`,
            marginBottom: spacing['3xl'],
            boxShadow: shadows.sm
          }}>
            <div style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.sm,
              fontVariantNumeric: 'tabular-nums'
            }} className="tabular-nums">
              {formatCurrency(EXAMPLE_AMOUNT)} vásárlóereje {EXAMPLE_START_YEAR} és {EXAMPLE_END_YEAR} között ≈ <span style={{ color: colors.error }}>–{lossPercentage}%</span>
            </div>
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              fontWeight: typography.fontWeight.normal
            }}>
              Történelmi példa a KSH (Központi Statisztikai Hivatal) inflációs adatai alapján
            </div>
          </div>

          {/* Optional Microcopy */}
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            margin: '0',
            fontWeight: typography.fontWeight.normal
          }}>
            30 másodperc • nincs regisztráció
          </p>
        </div>
      </div>
    </header>
  )
}
