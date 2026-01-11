'use client'

import React, { useEffect, useRef, useState } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/lib/design-system'
import { ArrowRight, Calendar, TrendingDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import ContextaWordmark from '@/components/ContextaWordmark'

const EXAMPLE_AMOUNT = 1000000
const EXAMPLE_START_YEAR = 2015
const EXAMPLE_END_YEAR = 2025

export default function HeroSection() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [showCalculation, setShowCalculation] = useState(false)

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

  // Animate calculation display
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalculation(true)
    }, prefersReducedMotion ? 0 : 300)
    return () => clearTimeout(timer)
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
      const offsetPosition = elementPosition + window.scrollY - offset

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
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing.xl} 0 ${spacing['3xl']} 0` : `${spacing['3xl']} 0 ${spacing['5xl']} 0`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Wordmark */}
        <div style={{
          marginBottom: isMobile ? spacing['2xl'] : spacing['3xl'],
          display: 'flex',
          justifyContent: 'center'
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
            Mi történik a pénzeddel, ha évekig nem csinálsz semmit?
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
            lineHeight: typography.lineHeight.relaxed,
            color: colors.text.secondary,
            margin: `0 0 ${isMobile ? spacing['3xl'] : spacing['4xl']} 0`,
            fontWeight: typography.fontWeight.normal,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            A számládon ugyanannyi forint marad, a vásárlóereje viszont csendben és folyamatosan csökken.
          </p>

          {/* Impact Stat - Large, prominent with transformation */}
          <div style={{
            marginBottom: isMobile ? spacing['3xl'] : spacing['4xl'],
            padding: isMobile ? `${spacing.lg} ${spacing.md}` : `${spacing['2xl']} ${spacing['4xl']}`,
            background: `linear-gradient(135deg, ${colors.primaryLight} 0%, rgba(240, 253, 250, 0.8) 100%)`,
            borderRadius: borderRadius.xl,
            border: `2px solid ${colors.primaryBorder}`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: shadows.xl,
            opacity: showCalculation ? 1 : 0,
            transform: showCalculation ? 'translateY(0)' : 'translateY(20px)',
            transition: prefersReducedMotion ? 'none' : `opacity ${transitions.slow}, transform ${transitions.slow}`
          }}>

            {/* Before/After Transformation */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: isMobile ? spacing.lg : spacing['3xl'],
              marginBottom: spacing['2xl']
            }}>
              {/* Before */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? spacing.xs : spacing.md,
                flex: 1
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  padding: `${spacing.xs} ${spacing.md}`,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                  fontWeight: typography.fontWeight.semibold,
                  border: `1px solid ${colors.gray[300]}`,
                  marginBottom: isMobile ? spacing.xs : spacing.sm,
                  boxShadow: shadows.sm
                }}>
                  <Calendar size={14} />
                  <span>{EXAMPLE_START_YEAR}</span>
                </div>
                <div style={{
                  fontSize: isMobile ? typography.fontSize['5xl'] : typography.fontSize['6xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.primary,
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.1,
                  marginBottom: spacing.xs
                }} className="tabular-nums">
                  {formatCurrency(EXAMPLE_AMOUNT)}
                </div>
                <div style={{
                  fontSize: typography.fontSize.base,
                  color: colors.text.secondary,
                  fontWeight: typography.fontWeight.normal
                }}>
                  névértéken
                </div>
              </div>

              {/* Arrow / Transformation */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing.sm,
                flexShrink: 0
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isMobile ? 'rotate(90deg)' : 'none',
                  transition: prefersReducedMotion ? 'none' : transitions.all,
                  lineHeight: 1,
                  color: colors.primary
                }}>
                  <ArrowRight size={isMobile ? 32 : 48} strokeWidth={2.5} />
                </div>
                <div style={{
                  display: isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  padding: `${spacing.sm} ${spacing.lg}`,
                  backgroundColor: colors.errorLight,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.sm,
                  color: colors.error,
                  fontWeight: typography.fontWeight.bold,
                  border: `1px solid ${colors.error}`,
                  whiteSpace: 'nowrap',
                  boxShadow: shadows.md,
                  animation: prefersReducedMotion ? 'none' : 'pulse 2s ease-in-out infinite'
                }}>
                  <TrendingDown size={16} />
                  <span>–{lossPercentage}%</span>
                </div>
              </div>

              {/* After */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-end',
                gap: isMobile ? spacing.xs : spacing.md,
                flex: 1
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  padding: `${spacing.xs} ${spacing.md}`,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                  fontWeight: typography.fontWeight.semibold,
                  border: `1px solid ${colors.gray[300]}`,
                  marginBottom: isMobile ? spacing.xs : spacing.sm,
                  boxShadow: shadows.sm
                }}>
                  <Calendar size={14} />
                  <span>{EXAMPLE_END_YEAR}</span>
                </div>
                <div style={{
                  fontSize: isMobile ? typography.fontSize['5xl'] : typography.fontSize['6xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.error,
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.1,
                  marginBottom: spacing.xs
                }} className="tabular-nums">
                  {formatCurrency(Math.round(finalReal))}
                </div>
                <div style={{
                  fontSize: typography.fontSize.base,
                  color: colors.text.secondary,
                  fontWeight: typography.fontWeight.normal
                }}>
                  valós vásárlóerő
                </div>
              </div>
            </div>

            {/* Loss amount highlight */}
            <div style={{
              marginTop: spacing['2xl'],
              padding: spacing.xl,
              paddingTop: isMobile ? spacing['2xl'] : spacing.xl,
              backgroundColor: colors.errorLight,
              borderRadius: borderRadius.lg,
              border: `2px solid ${colors.error}`,
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Mobile badge at top center */}
              {isMobile && (
                <div style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  padding: `${spacing.md} ${spacing.xl}`,
                  backgroundColor: colors.primaryLight,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.base,
                  color: colors.error,
                  fontWeight: typography.fontWeight.bold,
                  border: `2px solid ${colors.error}`,
                  whiteSpace: 'nowrap',
                  boxShadow: shadows.md,
                  animation: prefersReducedMotion ? 'none' : 'pulse 2s ease-in-out infinite',
                  zIndex: 1
                }}>
                  <TrendingDown size={18} />
                  <span>–{lossPercentage}%</span>
                </div>
              )}
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.text.muted,
                marginBottom: spacing.xs,
                fontWeight: typography.fontWeight.medium
              }}>
                Elveszett vásárlóerő
              </div>
              <div style={{
                fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.error,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1
              }} className="tabular-nums">
                {formatCurrency(Math.round(loss))}
              </div>
            </div>

            <div style={{
              marginTop: spacing.lg,
              paddingTop: spacing.lg,
              borderTop: `1px solid ${colors.primaryBorder}`,
              fontSize: typography.fontSize.xs,
              color: colors.text.muted,
              fontWeight: typography.fontWeight.normal,
              textAlign: 'center'
            }}>
              Történelmi példa a KSH (Központi Statisztikai Hivatal) inflációs adatai alapján
            </div>

            {/* Primary CTA Button - More prominent */}
            <div style={{
              marginTop: spacing['2xl'],
              marginBottom: spacing.lg
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
                Számold ki a saját pénzeddel
              </Button>
            </div>

            {/* Trust signals */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? spacing.xs : spacing.xl,
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              fontWeight: typography.fontWeight.medium,
              flexWrap: 'wrap',
              paddingTop: isMobile ? spacing.md : 0
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                padding: `${spacing.xs} ${spacing.md}`,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.gray[200]}`,
                flexShrink: 0
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>📊</span>
                <span>KSH adatok</span>
              </div>
              <div style={{
                display: isMobile ? 'none' : 'block',
                width: '1px',
                height: '16px',
                backgroundColor: colors.gray[300]
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                padding: `${spacing.xs} ${spacing.md}`,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.gray[200]}`,
                flexShrink: 0
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>🔒</span>
                <span>Nincs regisztráció</span>
              </div>
              <div style={{
                display: isMobile ? 'none' : 'block',
                width: '1px',
                height: '16px',
                backgroundColor: colors.gray[300]
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                padding: `${spacing.xs} ${spacing.md}`,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.gray[200]}`,
                flexShrink: 0
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>⚡</span>
                <span>30 másodperc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
