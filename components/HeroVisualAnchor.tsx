'use client'

import React, { useMemo, useState, useEffect } from 'react'
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
  years?: number  // Explicit years prop for controlled component
  onAmountChange?: (amount: number) => void
  onYearsChange?: (years: number) => void
}

export default function HeroVisualAnchor({
  initialAmount = 1000000,
  startYear = 2015,
  endYear = 2025,
  years: controlledYears,
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
  // Use controlled years if provided, otherwise calculate from start and end years
  const years = controlledYears !== undefined ? controlledYears : (endYear - effectiveStartYear + 1)
  
  // Local state for input value to allow free typing
  const [inputValue, setInputValue] = useState<string>(years.toString())
  const [isInputFocused, setIsInputFocused] = useState(false)
  
  // Sync local state when years prop changes (but not when we're actively typing)
  useEffect(() => {
    // Only sync if the input is not focused to avoid interrupting typing
    if (!isInputFocused) {
      setInputValue(years.toString())
    }
  }, [years, isInputFocused])

  return (
    <div className="hero-visual-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? spacing.xl : spacing.xl,
      padding: isMobile ? spacing.xl : spacing['2xl'],
      background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.primaryLight} 100%)`,
      borderRadius: borderRadius.xl,
      boxShadow: `${shadows.lg}, inset 0 1px 0 0 rgba(255, 255, 255, 0.7)`,
      border: `1px solid ${colors.primaryBorder}40`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
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
                  const newYears = Math.max(2, years - 1)
                  if (onYearsChange) onYearsChange(newYears)
                }}
                disabled={years <= 2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                color: years <= 2 ? colors.gray[400] : colors.text.primary,
                cursor: years <= 2 ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                borderRadius: borderRadius.md,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (years > 2) {
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
              disabled={years >= (MAX_YEAR - effectiveStartYear + 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                color: years >= (MAX_YEAR - effectiveStartYear + 1) ? colors.gray[400] : colors.text.primary,
                cursor: years >= (MAX_YEAR - effectiveStartYear + 1) ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                borderRadius: borderRadius.md,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                const maxYears = MAX_YEAR - effectiveStartYear + 1
                if (years < maxYears) {
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
              value={inputValue}
              onFocus={(e) => {
                setIsInputFocused(true)
                // Select all text on focus for easy editing
                e.target.select()
              }}
              onChange={(e) => {
                // Allow free typing - update local state immediately
                const newValue = e.target.value
                setInputValue(newValue)
              }}
              onKeyDown={(e) => {
                // Handle arrow keys for stepper functionality
                const maxYears = MAX_YEAR - effectiveStartYear + 1
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  const newYears = Math.min(maxYears, years + 1)
                  if (onYearsChange && newYears !== years) {
                    onYearsChange(newYears)
                    setInputValue(newYears.toString())
                  }
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const newYears = Math.max(2, years - 1)
                  if (onYearsChange && newYears !== years) {
                    onYearsChange(newYears)
                    setInputValue(newYears.toString())
                  }
                } else if (e.key === 'Enter') {
                  // Validate on Enter key
                  e.preventDefault()
                  const numValue = Number(inputValue)
                  const maxYears = MAX_YEAR - effectiveStartYear + 1
                  if (isNaN(numValue) || numValue < 2) {
                    const clampedValue = 2
                    if (onYearsChange) onYearsChange(clampedValue)
                    setInputValue(clampedValue.toString())
                  } else if (numValue > maxYears) {
                    if (onYearsChange) onYearsChange(maxYears)
                    setInputValue(maxYears.toString())
                  } else {
                    if (onYearsChange) onYearsChange(numValue)
                    setInputValue(numValue.toString())
                  }
                  e.currentTarget.blur()
                }
              }}
              onBlur={(e) => {
                setIsInputFocused(false)
                // Validate and clamp value on blur
                const numValue = Number(inputValue)
                const maxYears = MAX_YEAR - effectiveStartYear + 1
                
                if (inputValue === '' || isNaN(numValue) || numValue < 2) {
                  // If empty or invalid, set to minimum
                  const clampedValue = 2
                  if (onYearsChange) onYearsChange(clampedValue)
                  setInputValue(clampedValue.toString())
                } else if (numValue > maxYears) {
                  // If too large, set to maximum
                  if (onYearsChange) onYearsChange(maxYears)
                  setInputValue(maxYears.toString())
                } else {
                  // Valid value - update parent with integer value
                  const intValue = Math.floor(numValue)
                  if (onYearsChange && intValue !== years) {
                    onYearsChange(intValue)
                  }
                  setInputValue(intValue.toString())
                }
              }}
              min="2"
              max={MAX_YEAR - effectiveStartYear + 1}
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
        marginTop: spacing.md,
        borderTop: `1px solid ${colors.gray[200]}`
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
