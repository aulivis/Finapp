'use client'

import React, { useMemo } from 'react'
import { calculatePurchasingPower } from '@/lib/data/inflation'

interface HeroVisualAnchorProps {
  initialAmount?: number
  startYear?: number
  endYear?: number
}

export default function HeroVisualAnchor({
  initialAmount = 1000000,
  startYear = 2010,
  endYear = 2024
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

  return (
    <div className="hero-visual-card" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '40px 32px',
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
      <div style={{
        fontSize: '15px',
        color: '#059669',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Azonos összeg, eltérő vásárlóerő
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '4px'
        }}>
          {formatCurrency(startValue)}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6B7280',
          fontWeight: '500'
        }}>
          {effectiveStartYear}
        </div>
        <div style={{
          fontSize: '24px',
          color: '#EF4444',
          fontWeight: '600',
          margin: '8px 0',
          transform: 'scale(1.2)'
        }}>
          ↓
        </div>
        <div style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#EF4444',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '4px'
        }}>
          ≈ {formatCurrency(endValue)}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6B7280',
          fontWeight: '500'
        }}>
          {endYear}
        </div>
      </div>
    </div>
  )
}
