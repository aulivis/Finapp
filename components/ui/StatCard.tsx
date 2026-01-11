'use client'

import React from 'react'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
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
  
  return (
    <div
      style={{
        padding: spacing.xl,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.md,
        transition: prefersReducedMotion ? 'none' : transitions.all,
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!prefersReducedMotion) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = shadows.md
        }
      }}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
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
        fontSize: typography.fontSize['3xl'],
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
