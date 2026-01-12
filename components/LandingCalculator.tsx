'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { calculatePurchasingPower, historicalInflation } from '@/lib/data/inflation'
import ModernLineChart from '@/components/ModernLineChart'
import { ChartErrorBoundary } from '@/components/ChartErrorBoundary'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { Info, Wallet, Calendar, TrendingDown } from 'lucide-react'
import Input from '@/components/ui/Input'
import SocialShare from '@/components/SocialShare'

const DEFAULT_AMOUNT = 1000000
const DEFAULT_START_YEAR = 2015
const DEFAULT_END_YEAR = 2025

interface LandingCalculatorProps {
  startYear?: number
  endYear?: number
  onStartYearChange?: (year: number) => void
  onEndYearChange?: (year: number) => void
  amount?: number
  onAmountChange?: (amount: number) => void
}

export default function LandingCalculator({
  startYear: propStartYear,
  endYear: propEndYear,
  onStartYearChange,
  onEndYearChange,
  amount: propAmount,
  onAmountChange
}: LandingCalculatorProps = {}) {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const [isCalculating, setIsCalculating] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(true) // Initialize to true to show default results
  const [startYearError, setStartYearError] = useState('')
  const [endYearError, setEndYearError] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  
  const [internalAmount, setInternalAmount] = useState(DEFAULT_AMOUNT)
  const [internalStartYear, setInternalStartYear] = useState(DEFAULT_START_YEAR)
  const [internalEndYear, setInternalEndYear] = useState(DEFAULT_END_YEAR)

  // Use props if provided, otherwise use internal state
  const startYear = propStartYear ?? internalStartYear
  const endYear = propEndYear ?? internalEndYear
  const amount = propAmount ?? internalAmount
  
  const setAmount = (value: number | ((prev: number) => number)) => {
    const newAmount = typeof value === 'function' ? value(amount) : value
    if (onAmountChange) {
      onAmountChange(newAmount)
    } else {
      setInternalAmount(newAmount)
    }
  }

  const handleStartYearChange = (year: number) => {
    if (onStartYearChange) {
      onStartYearChange(year)
    } else {
      setInternalStartYear(year)
    }
  }

  const handleEndYearChange = (year: number) => {
    if (onEndYearChange) {
      onEndYearChange(year)
    } else {
      setInternalEndYear(year)
    }
  }

  // Get available years from historical inflation data
  const availableYears = historicalInflation.map(d => d.year).sort((a, b) => a - b)
  const minYear = Math.min(...availableYears)
  const maxYear = Math.max(...availableYears)

  // Validate and clamp years
  const validStartYear = Math.max(minYear, Math.min(startYear, maxYear))
  const validEndYear = Math.max(validStartYear, Math.min(endYear, maxYear))

  // Validate years and set error messages
  useEffect(() => {
    if (!hasUserInteracted) return

    if (startYear < minYear || startYear > maxYear) {
      setStartYearError(`Az évnek ${minYear} és ${maxYear} között kell lennie.`)
    } else if (startYear > endYear) {
      setStartYearError('A kezdő év nem lehet nagyobb, mint a végződő év.')
    } else {
      setStartYearError('')
    }

    if (endYear < startYear || endYear > maxYear) {
      setEndYearError(`Az évnek ${startYear} és ${maxYear} között kell lennie.`)
    } else {
      setEndYearError('')
    }
  }, [startYear, endYear, minYear, maxYear, hasUserInteracted])

  // Calculate purchasing power
  const calculationData = useMemo(() => {
    if (validStartYear > validEndYear || amount <= 0 || !hasUserInteracted) {
      return {
        dataPoints: [],
        finalNominal: amount,
        finalReal: amount,
        loss: 0,
        lossPercentage: 0
      }
    }

    try {
      const dataPoints = calculatePurchasingPower(amount, validStartYear, validEndYear)
      const finalNominal = dataPoints[dataPoints.length - 1]?.nominal || amount
      const finalReal = dataPoints[dataPoints.length - 1]?.real || amount
      const loss = finalNominal - finalReal
      const lossPercentage = (loss / finalNominal) * 100

      return {
        dataPoints,
        finalNominal,
        finalReal,
        loss,
        lossPercentage
      }
    } catch (error) {
      console.error('Error calculating purchasing power:', error)
      return {
        dataPoints: [],
        finalNominal: amount,
        finalReal: amount,
        loss: 0,
        lossPercentage: 0
      }
    }
  }, [amount, validStartYear, validEndYear, hasUserInteracted])

  // Loading state effect
  useEffect(() => {
    if (!hasUserInteracted) {
      setIsCalculating(false)
      return
    }
    
    if (calculationData.dataPoints.length === 0 && validStartYear <= validEndYear && amount > 0) {
      setIsCalculating(false)
      return // Don't show loading for invalid states
    }
    
    setIsCalculating(true)
    const timer = setTimeout(() => {
      setIsCalculating(false)
    }, prefersReducedMotion ? 0 : 150)
    
    return () => clearTimeout(timer)
  }, [amount, validStartYear, validEndYear, hasUserInteracted, prefersReducedMotion, calculationData.dataPoints.length])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  // Add fade-in animation on mount
  useEffect(() => {
    if (sectionRef.current && !prefersReducedMotion) {
      sectionRef.current.style.opacity = '0'
      sectionRef.current.style.transform = 'translateY(20px)'
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = `opacity ${transitions.slow}, transform ${transitions.slow}`
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="calculator-section"
      style={{
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['5xl']} 0`,
        scrollMarginTop: '80px',
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: spacing['2xl'],
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Megtakarításod vásárlóerejének alakulása
          </h2>
          <p style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            margin: 0
          }}>
            Nézd meg, hogy az általad megadott összeg ma mennyit érne az infláció hatására.
          </p>
        </div>

        {/* Calculator Container */}
        <div style={{
          padding: isMobile ? spacing['2xl'] : spacing['3xl'],
          position: 'relative'
        }}>
          {/* Inputs Section */}
          <div style={{
            marginBottom: spacing['3xl']
          }}>
            <div style={{
              backgroundColor: colors.gray[50],
              borderRadius: borderRadius.lg,
              padding: isMobile ? spacing.lg : spacing.xl,
              border: `1px solid ${colors.gray[200]}`,
              marginBottom: spacing['2xl']
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: spacing.lg,
              }}>
                <Input
                  type="number"
                  label="Kezdeti összeg"
                  value={amount}
                  onChange={(e) => {
                    setHasUserInteracted(true)
                    setAmount(Math.max(0, Number(e.target.value) || 0))
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setHasUserInteracted(true)
                      setAmount(prev => prev + 10000)
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setHasUserInteracted(true)
                      setAmount(prev => Math.max(0, prev - 10000))
                    }
                  }}
                  min="0"
                  step="10000"
                  suffix="HUF"
                  icon={<Wallet size={18} />}
                  style={{ marginBottom: 0 }}
                  aria-label="Kezdeti összeg forintban"
                />

                <div>
                  <Input
                    type="number"
                    label="Kezdő év"
                    value={startYear}
                    onChange={(e) => {
                      setHasUserInteracted(true)
                      const newYear = Number(e.target.value)
                      if (!isNaN(newYear)) {
                        handleStartYearChange(newYear)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        const newYear = Math.min(maxYear, startYear + 1)
                        setHasUserInteracted(true)
                        handleStartYearChange(newYear)
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        const newYear = Math.max(minYear, startYear - 1)
                        setHasUserInteracted(true)
                        handleStartYearChange(newYear)
                      }
                    }}
                    onBlur={(e) => {
                      const newYear = Number(e.target.value)
                      const clampedYear = Math.max(minYear, Math.min(newYear || minYear, maxYear))
                      handleStartYearChange(clampedYear)
                      if (clampedYear > endYear) {
                        handleEndYearChange(clampedYear)
                      }
                    }}
                    min={minYear}
                    max={maxYear}
                    error={startYearError}
                    icon={<Calendar size={18} />}
                    style={{ marginBottom: 0 }}
                    aria-label="Kezdő év"
                    aria-describedby={startYearError ? 'start-year-error' : undefined}
                  />
                  {startYearError && (
                    <div id="start-year-error" role="alert" style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.error,
                      marginTop: spacing.xs
                    }}>
                      {startYearError}
                    </div>
                  )}
                </div>

                <div>
                  <Input
                    type="number"
                    label="Végződő év"
                    value={endYear}
                    onChange={(e) => {
                      setHasUserInteracted(true)
                      const newYear = Number(e.target.value)
                      if (!isNaN(newYear)) {
                        handleEndYearChange(newYear)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        const newYear = Math.min(maxYear, endYear + 1)
                        setHasUserInteracted(true)
                        handleEndYearChange(newYear)
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        const newYear = Math.max(startYear, endYear - 1)
                        setHasUserInteracted(true)
                        handleEndYearChange(newYear)
                      }
                    }}
                    onBlur={(e) => {
                      const newYear = Number(e.target.value)
                      const clampedYear = Math.max(startYear, Math.min(newYear || startYear, maxYear))
                      handleEndYearChange(clampedYear)
                    }}
                    min={startYear}
                    max={maxYear}
                    error={endYearError}
                    icon={<Calendar size={18} />}
                    style={{ marginBottom: 0 }}
                    aria-label="Végződő év"
                    aria-describedby={endYearError ? 'end-year-error' : undefined}
                  />
                  {endYearError && (
                    <div id="end-year-error" role="alert" style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.error,
                      marginTop: spacing.xs
                    }}>
                      {endYearError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isCalculating && hasUserInteracted && (
            <div style={{
              padding: spacing['2xl'],
              textAlign: 'center',
              color: colors.text.muted
            }} role="status" aria-live="polite">
              <div style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: `3px solid ${colors.gray[200]}`,
                borderTopColor: colors.primary,
                borderRadius: '50%',
                animation: prefersReducedMotion ? 'none' : 'spin 0.8s linear infinite'
              }} aria-label="Számítás folyamatban" />
            </div>
          )}

          {/* Outputs Section */}
          {!isCalculating && calculationData.dataPoints.length > 0 && (
            <>
              {/* Chart Section - Show first for visual impact */}
              <div style={{
                marginBottom: spacing['3xl'],
                ...(isMobile ? {
                  marginLeft: `calc(-${spacing['2xl']} - ${spacing.md})`, // Break out of calculator (32px) + maxWidth (12px) padding
                  marginRight: `calc(-${spacing['2xl']} - ${spacing.md})`, // Break out of calculator (32px) + maxWidth (12px) padding
                  width: `calc(100% + ${spacing['2xl']} + ${spacing['2xl']} + ${spacing.md} + ${spacing.md})` // Full width accounting for all parent padding
                } : {})
              }}>
                <h3 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  marginBottom: spacing.xl,
                  color: colors.text.primary,
                  ...(isMobile ? {
                    paddingLeft: spacing['2xl'], // Add back padding for the title
                    paddingRight: spacing['2xl']
                  } : {})
                }}>
                  Vásárlóerő alakulása
                </h3>
                <div style={{
                  padding: isMobile ? `${spacing.lg} 0` : spacing.xl,
                  backgroundColor: colors.gray[50],
                  borderRadius: isMobile ? 0 : borderRadius.lg,
                  border: isMobile ? 'none' : `1px solid ${colors.gray[200]}`,
                  borderTop: isMobile ? `1px solid ${colors.gray[200]}` : undefined,
                  borderBottom: isMobile ? `1px solid ${colors.gray[200]}` : undefined,
                  overflow: 'hidden'
                }}>
                  {calculationData.dataPoints.length > 0 ? (
                    <ChartErrorBoundary
                      fallback={
                        <div style={{
                          padding: spacing['2xl'],
                          textAlign: 'center',
                          color: colors.text.muted
                        }}>
                          Nem sikerült az ábra megjelenítése.
                        </div>
                      }
                    >
                      <ModernLineChart
                        data={calculationData.dataPoints}
                        formatCurrency={formatCurrency}
                        height={isMobile ? 400 : 400}
                        isMobile={isMobile}
                      />
                    </ChartErrorBoundary>
                  ) : null}
                </div>
              </div>

              {/* Hero Result Message - The Key Insight - Enhanced Focus Card */}
              <div style={{
                padding: isMobile ? `${spacing['3xl']} ${spacing.lg}` : spacing['4xl'],
                background: `linear-gradient(135deg, #FEF7F7 0%, rgba(254, 242, 242, 0.6) 50%, rgba(254, 242, 242, 0.4) 100%)`,
                borderRadius: borderRadius.xl,
                border: `3px solid rgba(239, 68, 68, 0.3)`,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `${shadows['2xl']}, 0 0 0 1px rgba(239, 68, 68, 0.1)`,
                marginBottom: isMobile ? spacing.xl : spacing.xl,
                transform: 'scale(1.02)',
                transition: transitions.slow,
                animation: prefersReducedMotion ? 'none' : 'pulseShadow 3s ease-in-out infinite'
              }}>
                <div style={{
                  marginBottom: spacing.xl
                }}>
                  <div style={{
                    fontSize: typography.fontSize['2xl'],
                    color: colors.text.primary,
                    fontWeight: typography.fontWeight.semibold,
                    marginBottom: spacing.lg
                  }}>
                    Ennyit veszített a pénzed vásárlóerejéből
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: spacing.md,
                    flexWrap: 'wrap',
                    fontSize: isMobile ? typography.fontSize['6xl'] : '72px',
                    fontWeight: typography.fontWeight.bold,
                    color: colors.error,
                    lineHeight: typography.lineHeight.tight,
                    marginBottom: spacing.lg,
                    fontFeatureSettings: '"tnum"',
                  }}>
                    <span>-{formatCurrency(Math.round(calculationData.loss))}</span>
                    <span style={{ 
                      fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.xs
                    }}>
                      (<TrendingDown size={isMobile ? 32 : 48} strokeWidth={2.5} /> {formatPercentage(calculationData.lossPercentage)})
                    </span>
                  </div>
                  <div style={{
                    fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
                    color: colors.text.primary,
                    lineHeight: typography.lineHeight.relaxed,
                    maxWidth: '700px',
                    margin: '0 auto',
                    fontWeight: typography.fontWeight.medium
                  }}>
                    A(z) <strong style={{ color: colors.text.primary, fontWeight: typography.fontWeight.bold, fontSize: isMobile ? typography.fontSize.xl : typography.fontSize['3xl'] }}>{formatCurrency(amount)}</strong> vásárlóereje{' '}
                    <strong style={{ color: colors.text.primary, fontWeight: typography.fontWeight.bold, fontSize: isMobile ? typography.fontSize.xl : typography.fontSize['3xl'] }}>{validStartYear}</strong> és{' '}
                    <strong style={{ color: colors.text.primary, fontWeight: typography.fontWeight.bold, fontSize: isMobile ? typography.fontSize.xl : typography.fontSize['3xl'] }}>{validEndYear}</strong> között{' '}
                    <strong style={{ color: colors.text.primary, fontWeight: typography.fontWeight.bold, fontSize: isMobile ? typography.fontSize.xl : typography.fontSize['3xl'] }}>{formatCurrency(Math.round(calculationData.finalReal))}</strong>-ra csökkent. Ezért fontos, hogy tudd: a pénz nem csak „áll&quot;, hanem <strong style={{ color: colors.text.primary, fontWeight: typography.fontWeight.bold }}>idővel változik az értéke.</strong>
                  </div>
                </div>
                
                {/* Social Share Component */}
                <SocialShare
                  amount={amount}
                  startYear={validStartYear}
                  endYear={validEndYear}
                  lossPercentage={calculationData.lossPercentage}
                  formatCurrency={formatCurrency}
                  formatPercentage={formatPercentage}
                />
                
                {/* Secondary text below share buttons */}
                <div
                  style={{
                    marginTop: spacing.lg,
                    textAlign: 'center',
                    color: colors.text.muted,
                    fontSize: typography.fontSize.sm,
                    lineHeight: typography.lineHeight.normal,
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  A megosztásoddal segítesz abban, hogy családtagjaid és ismerőseid tudatosabbak legyenek a pénzügyeikben, felhívva a figyelmet az infláció következményeire.
                </div>
              </div>
            </>
          )}

          {/* Empty State - Only show if user has interacted and there's an actual error */}
          {calculationData.dataPoints.length === 0 && hasUserInteracted && (startYearError || endYearError || amount <= 0) && (
            <div style={{
              padding: spacing['3xl'],
              textAlign: 'center',
              color: colors.text.muted
            }}>
              <p style={{
                fontSize: typography.fontSize.base,
                margin: '0'
              }}>
                Kérjük, adjon meg érvényes értékeket a számításhoz.
              </p>
            </div>
          )}
        </div>

        {/* Information Box - What is purchasing power */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing.md,
          padding: spacing.xl,
          backgroundColor: colors.infoLight,
          borderRadius: borderRadius.lg,
          border: `1px solid ${colors.info}`,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            flexShrink: 0,
            marginTop: '2px'
          }}>
            <Info size={20} color={colors.info} />
          </div>
          <div style={{
            flex: 1,
            fontSize: typography.fontSize.sm,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed
          }}>
            <p style={{ margin: '0' }}>
              A <strong>vásárlóerő</strong> azt mutatja meg, hogy egy adott összeggel valójában mennyi terméket és szolgáltatást tudsz megvásárolni.
              Ha az árak emelkednek, miközben a pénzösszeg változatlan marad, a vásárlóerő csökken. Ez a kalkulátor azt szemlélteti, hogy az infláció hogyan befolyásolja a megtakarításod <strong>valós értékét</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
