'use client'

import React, { useMemo } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'
import { Calculator, Calendar } from 'lucide-react'

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
      gap: '24px',
      padding: '32px',
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
        display: 'flex',
        flexDirection: 'column',
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
        </div>
      </div>

      {/* Visual Result */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        paddingTop: '16px',
        borderTop: '1px solid rgba(45, 212, 191, 0.2)'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#059669',
          fontWeight: '600',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '4px'
        }}>
          Azonos összeg, eltérő vásárlóerő
        </div>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '4px'
        }}>
          {formatCurrency(startValue)}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6B7280',
          fontWeight: '500'
        }}>
          {effectiveStartYear}
        </div>
        <div style={{
          fontSize: '20px',
          color: '#EF4444',
          fontWeight: '600',
          margin: '6px 0',
          transform: 'scale(1.2)'
        }}>
          ↓
        </div>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#EF4444',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '4px'
        }}>
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
