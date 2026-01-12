'use client'

import Link from 'next/link'
import { colors, spacing, typography } from '@/lib/design-system'

export default function BackLink() {
  return (
    <Link 
      href="/"
      style={{
        color: colors.primary,
        textDecoration: 'none',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing.xs,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = colors.primaryHover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = colors.primary
      }}
    >
      ← Vissza a főoldalra
    </Link>
  )
}
