'use client'

import React, { useMemo } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import { Calculator, Calendar, Minus, Plus } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

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
  const years = endYear - startYear + 1

  return (
    <div className="hero-visual-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '20px' : '24px',
      padding: isMobile ? '24px' : '32px',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(45, 212, 191, 0.1)',
      border: '2px solid rgba(45, 212, 191, 0.2)',
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
        background: 'linear-gradient(90deg, #2DD4BF 0%, #14B8A6 100%)'
      }} />
      
      {/* Input Fields */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#1F2937',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            <Calculator size={14} style={{ color: '#6B7280' }} />
            Összeg
          </label>
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => {
              const value = Number(e.target.value) || 0
              if (onAmountChange) onAmountChange(value)
            }}
            min="0"
            step="10000"
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '15px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              fontFamily: 'inherit',
              fontWeight: '400',
              transition: 'border-color 0.15s ease'
            }}
            className="tabular-nums"
          />
        </div>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#1F2937',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            <Calendar size={14} style={{ color: '#6B7280' }} />
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
                  color: years <= 1 ? '#9CA3AF' : '#111827',
                  cursor: years <= 1 ? 'not-allowed' : 'pointer',
                  flexShrink: 0
                }}
                aria-label="Évek csökkentése"
              >
                <Minus size={20} />
              </button>
              <span 
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827',
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
                  const maxYears = MAX_YEAR - startYear + 1
                  const newYears = Math.min(maxYears, years + 1)
                  if (onYearsChange) onYearsChange(newYears)
                }}
                disabled={years >= MAX_YEAR - startYear + 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: years >= MAX_YEAR - startYear + 1 ? '#9CA3AF' : '#111827',
                  cursor: years >= MAX_YEAR - startYear + 1 ? 'not-allowed' : 'pointer',
                  flexShrink: 0
                }}
                aria-label="Évek növelése"
              >
                <Plus size={20} />
              </button>
            </div>
          ) : (
            <input
              type="number"
              value={years}
              onChange={(e) => {
                const value = Math.max(1, Math.min(Number(e.target.value) || 1, MAX_YEAR - startYear + 1))
                if (onYearsChange) onYearsChange(value)
              }}
              min="1"
              max={MAX_YEAR - startYear + 1}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '15px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontFamily: 'inherit',
                fontWeight: '400',
                transition: 'border-color 0.15s ease'
              }}
              className="tabular-nums"
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
        paddingTop: '16px',
        borderTop: '1px solid rgba(45, 212, 191, 0.2)'
      }}>
        <div style={{
          fontSize: '15px',
          color: '#059669',
          fontWeight: '600',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '8px'
        }}>
          Azonos összeg, eltérő vásárlóerő
        </div>
        <div style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '2px'
        }} className="hero-dynamic-number tabular-nums">
          {formatCurrency(startValue)}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6B7280',
          fontWeight: '500',
          marginBottom: '4px'
        }}>
          {effectiveStartYear}
        </div>
        <div style={{
          fontSize: '20px',
          color: '#EF4444',
          fontWeight: '600',
          margin: '4px 0',
          transform: 'scale(1.2)'
        }}>
          ↓
        </div>
        <div style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: '700',
          color: '#EF4444',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '2px'
        }} className="hero-dynamic-number tabular-nums">
          ≈ {formatCurrency(endValue)}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6B7280',
          fontWeight: '500'
        }}>
          {endYear}
        </div>
      </div>
    </div>
  )
}
