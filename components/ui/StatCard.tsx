'use client'

import React from 'react'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import AnimatedNumber from './AnimatedNumber'

interface StatCardProps {
  label: string
  value: number
  formatter: (value: number) => string
  subtitle?: string
  className?: string
  style?: React.CSSProperties
}

export default function StatCard({
  label,
  value,
  formatter,
  subtitle,
  className = '',
  style,
}: StatCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile(768)
  
  return (
    <div
      style={{
        padding: spacing.xl,
        backgroundColor: colors.background.paper,
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.gray[200]}`,
        transition: prefersReducedMotion ? 'none' : transitions.all,
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!prefersReducedMotion) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = shadows.lg
          e.currentTarget.style.borderColor = colors.primaryBorder
        }
      }}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = colors.gray[200]
        }
      }}
    >
      <div style={{
        fontSize: typography.fontSize.sm,
        color: colors.text.muted,
        marginBottom: spacing.xs,
        fontWeight: typography.fontWeight.normal
      }}>
        {label}
      </div>
      <div style={{
        fontSize: isMobile ? typography.fontSize['4xl'] : typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.medium,
        color: colors.text.primary,
        lineHeight: typography.lineHeight.tight
      }} className="tabular-nums">
        <AnimatedNumber value={value} formatter={formatter} />
      </div>
      {subtitle && (
        <div style={{
          fontSize: typography.fontSize.base,
          color: colors.text.muted,
          marginTop: spacing.xs,
          fontWeight: typography.fontWeight.normal
        }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}
