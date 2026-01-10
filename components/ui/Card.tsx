'use client'

import React from 'react'
import { shadows, spacing, componentStyles, colors } from '@/lib/design-system'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

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
  const isMobile = useIsMobile(768)
  const paddingMap = {
    sm: spacing.lg,
    md: spacing['2xl'],
    lg: spacing['3xl'],
  }

  // On mobile, remove card styling (borders, padding, shadows, background)
  const mobileStyles = isMobile ? {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    padding: 0,
  } : {
    backgroundColor: componentStyles.card.backgroundColor,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: componentStyles.card.borderRadius,
    boxShadow: componentStyles.card.shadow,
    padding: paddingMap[padding],
  }

  return (
    <div
      style={{
        ...mobileStyles,
        transition: hover ? 'all 0.2s ease' : 'none',
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (hover && !isMobile) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = shadows.lg
        }
      }}
      onMouseLeave={(e) => {
        if (hover && !isMobile) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = shadows.md
        }
      }}
    >
      {children}
    </div>
  )
}
