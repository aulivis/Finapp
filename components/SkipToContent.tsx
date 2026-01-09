'use client'

import React from 'react'
import { colors, borderRadius, spacing } from '@/lib/design-system'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-40px',
        left: spacing.lg,
        backgroundColor: colors.primary,
        color: '#FFFFFF',
        padding: spacing.md + ' ' + spacing.lg,
        borderRadius: borderRadius.md,
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = spacing.lg
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px'
      }}
    >
      Ugrás a főtartalomhoz
    </a>
  )
}
