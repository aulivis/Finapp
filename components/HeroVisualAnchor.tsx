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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '32px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{
        fontSize: '14px',
        color: '#6B7280',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '8px'
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
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {formatCurrency(startValue)}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          fontWeight: '400'
        }}>
          ({effectiveStartYear})
        </div>
        <div style={{
          fontSize: '20px',
          color: '#6B7280',
          fontWeight: '400',
          margin: '4px 0'
        }}>
          ↓
        </div>
        <div style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums'
        }}>
          ≈ {formatCurrency(endValue)}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          fontWeight: '400'
        }}>
          ({endYear})
        </div>
      </div>
    </div>
  )
}
