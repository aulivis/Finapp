'use client'

import React from 'react'
import { colors, spacing, typography, borderRadius } from '@/lib/design-system'
import { Minus, Plus, Type } from 'lucide-react'

interface FontSizeControlsProps {
  fontSizeMultiplier: number
  onIncrease: () => void
  onDecrease: () => void
  onReset: () => void
}

export default function FontSizeControls({
  fontSizeMultiplier,
  onIncrease,
  onDecrease,
  onReset,
}: FontSizeControlsProps) {
  const minSize = 0.8
  const maxSize = 1.5

  const canDecrease = fontSizeMultiplier > minSize
  const canIncrease = fontSizeMultiplier < maxSize

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.md,
      backgroundColor: colors.gray[50],
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.gray[200]}`,
    }}>
      <Type size={16} color={colors.text.muted} style={{ flexShrink: 0 }} />
      <span style={{
        fontSize: typography.fontSize.xs,
        color: colors.text.muted,
        minWidth: '60px',
        textAlign: 'center',
      }}>
        Betűméret
      </span>
      <button
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label="Csökkentés"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: borderRadius.md,
          backgroundColor: canDecrease ? colors.background.paper : colors.gray[100],
          color: canDecrease ? colors.text.primary : colors.text.disabled,
          border: `1px solid ${colors.gray[200]}`,
          cursor: canDecrease ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (canDecrease) {
            e.currentTarget.style.backgroundColor = colors.gray[100]
            e.currentTarget.style.borderColor = colors.gray[300]
          }
        }}
        onMouseLeave={(e) => {
          if (canDecrease) {
            e.currentTarget.style.backgroundColor = colors.background.paper
            e.currentTarget.style.borderColor = colors.gray[200]
          }
        }}
      >
        <Minus size={16} />
      </button>
      <span style={{
        fontSize: typography.fontSize.sm,
        color: colors.text.primary,
        fontWeight: typography.fontWeight.medium,
        minWidth: '40px',
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {Math.round(fontSizeMultiplier * 100)}%
      </span>
      <button
        onClick={onIncrease}
        disabled={!canIncrease}
        aria-label="Növelés"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: borderRadius.md,
          backgroundColor: canIncrease ? colors.background.paper : colors.gray[100],
          color: canIncrease ? colors.text.primary : colors.text.disabled,
          border: `1px solid ${colors.gray[200]}`,
          cursor: canIncrease ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (canIncrease) {
            e.currentTarget.style.backgroundColor = colors.gray[100]
            e.currentTarget.style.borderColor = colors.gray[300]
          }
        }}
        onMouseLeave={(e) => {
          if (canIncrease) {
            e.currentTarget.style.backgroundColor = colors.background.paper
            e.currentTarget.style.borderColor = colors.gray[200]
          }
        }}
      >
        <Plus size={16} />
      </button>
      {fontSizeMultiplier !== 1 && (
        <button
          onClick={onReset}
          aria-label="Alapértelmezett méret"
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.primary,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: `${spacing.xs} ${spacing.sm}`,
            marginLeft: spacing.xs,
            textDecoration: 'underline',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primaryHover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.primary
          }}
        >
          Alap
        </button>
      )}
    </div>
  )
}
