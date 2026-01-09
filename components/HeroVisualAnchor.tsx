'use client'

import React, { useMemo } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import { Calculator, Calendar, Minus, Plus } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import Input from '@/components/ui/Input'

const MAX_YEAR = 2025

interface HeroVisualAnchorProps {
  initialAmount?: number
  startYear?: number
  endYear?: number
  onAmountChange?: (amount: number) => void
  onYearsChange?: (years: number) => void
}

export default function HeroVisualAnchor({
  initialAmount = 1000000,
  startYear = 2015,
  endYear = 2025,
  onAmountChange,
  onYearsChange
}: HeroVisualAnchorProps) {
  const isMobile = useIsMobile(768)
  
  const data = useMemo(() => {
    // Try to calculate, but if startYear is too early, use 2014
    const effectiveStartYear = Math.max(startYear, 2014)
    return calculatePurchasingPower(initialAmount, effectiveStartYear, endYear)
  }, [initialAmount, startYear, endYear])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const startValue = data[0]?.nominal || initialAmount
  const endValue = data[data.length - 1]?.real || initialAmount
  const effectiveStartYear = Math.max(startYear, 2014)
  // Calculate years from the actual start and end years
  const years = endYear - effectiveStartYear + 1

  return (
    <div className="hero-visual-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? spacing.xl : spacing.xl,
      padding: isMobile ? spacing.xl : spacing['2xl'],
      background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.primaryLight} 100%)`,
      borderRadius: borderRadius.xl,
      boxShadow: shadows.lg + ', 0 0 0 1px ' + colors.primaryBorder,
      border: `2px solid ${colors.primaryBorder}`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {/* Decorative accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #2DD4BF 0%, #14B8A6 100%)'
      }} />
      
      {/* Input Fields */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.lg
      }}>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
            fontSize: typography.fontSize.sm,
            color: colors.text.secondary,
            marginBottom: spacing.xs,
            fontWeight: typography.fontWeight.medium
          }}>
            <Calculator size={14} style={{ color: colors.gray[500] }} />
            Összeg
          </label>
          <Input
            type="number"
            value={initialAmount}
            onChange={(e) => {
              const value = Number(e.target.value) || 0
              if (onAmountChange) onAmountChange(value)
            }}
            min="0"
            step="10000"
            suffix="HUF"
            style={{ marginBottom: 0 }}
          />
        </div>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
            fontSize: typography.fontSize.sm,
            color: colors.text.secondary,
            marginBottom: spacing.xs,
            fontWeight: typography.fontWeight.medium
          }}>
            <Calendar size={14} style={{ color: colors.gray[500] }} />
            Évek száma
          </label>
          {isMobile ? (
            /* Mobile: Stepper control with +/- buttons */
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              overflow: 'hidden'
            }}>
              <button
                type="button"
                onClick={() => {
                  const newYears = Math.max(1, years - 1)
                  if (onYearsChange) onYearsChange(newYears)
                }}
                disabled={years <= 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                color: years <= 1 ? colors.gray[400] : colors.text.primary,
                cursor: years <= 1 ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                borderRadius: borderRadius.md,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (years > 1) {
                  e.currentTarget.style.backgroundColor = colors.gray[100]
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              aria-label="Évek csökkentése"
            >
              <Minus size={20} />
            </button>
            <span 
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                minWidth: '32px',
                textAlign: 'center'
              }}
              className="tabular-nums"
            >
              {years}
            </span>
            <button
              type="button"
              onClick={() => {
                const maxYears = MAX_YEAR - effectiveStartYear + 1
                const newYears = Math.min(maxYears, years + 1)
                if (onYearsChange) onYearsChange(newYears)
              }}
              disabled={years >= MAX_YEAR - effectiveStartYear + 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                color: years >= MAX_YEAR - effectiveStartYear + 1 ? colors.gray[400] : colors.text.primary,
                cursor: years >= MAX_YEAR - effectiveStartYear + 1 ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                borderRadius: borderRadius.md,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (years < MAX_YEAR - effectiveStartYear + 1) {
                  e.currentTarget.style.backgroundColor = colors.gray[100]
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              aria-label="Évek növelése"
            >
              <Plus size={20} />
            </button>
            </div>
          ) : (
            <Input
              type="number"
              value={years}
              onChange={(e) => {
                const value = Math.max(1, Math.min(Number(e.target.value) || 1, MAX_YEAR - startYear + 1))
                if (onYearsChange) onYearsChange(value)
              }}
              min="1"
              max={MAX_YEAR - startYear + 1}
              style={{ marginBottom: 0 }}
            />
          )}
        </div>
      </div>

      {/* Visual Result */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        width: '100%',
        paddingTop: spacing.lg,
        borderTop: `1px solid ${colors.primaryBorder}`
      }}>
        <div style={{
          fontSize: typography.fontSize.md,
          color: colors.success,
          fontWeight: typography.fontWeight.semibold,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: spacing.xs
        }}>
          Azonos összeg, eltérő vásárlóerő
        </div>
        <div style={{
          fontSize: isMobile ? typography.fontSize['5xl'] : '38px',
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '2px',
          transition: 'all 0.3s ease'
        }} className="hero-dynamic-number tabular-nums">
          {formatCurrency(startValue)}
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.text.muted,
          fontWeight: typography.fontWeight.medium,
          marginBottom: spacing.xs
        }}>
          {effectiveStartYear}
        </div>
        <div style={{
          fontSize: typography.fontSize['2xl'],
          color: colors.error,
          fontWeight: typography.fontWeight.semibold,
          margin: `${spacing.xs} 0`,
          transform: 'scale(1.2)',
          transition: 'transform 0.2s ease'
        }}>
          ↓
        </div>
        <div style={{
          fontSize: isMobile ? typography.fontSize['5xl'] : '38px',
          fontWeight: typography.fontWeight.bold,
          color: colors.error,
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '2px',
          transition: 'all 0.3s ease'
        }} className="hero-dynamic-number tabular-nums">
          ≈ {formatCurrency(endValue)}
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.text.muted,
          fontWeight: typography.fontWeight.medium
        }}>
          {endYear}
        </div>
      </div>
    </div>
  )
}
