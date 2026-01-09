'use client'

import React from 'react'
import { shadows, spacing, componentStyles } from '@/lib/design-system'

interface CardProps {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Card({
  children,
  padding = 'md',
  hover = false,
  className = '',
  style,
}: CardProps) {
  const paddingMap = {
    sm: spacing.lg,
    md: spacing['2xl'],
    lg: spacing['3xl'],
  }

  return (
    <div
      style={{
        ...componentStyles.card,
        padding: paddingMap[padding],
        transition: hover ? 'all 0.2s ease' : 'none',
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = shadows.lg
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = shadows.md
        }
      }}
    >
      {children}
    </div>
  )
}
