'use client'

import React from 'react'
import { colors, spacing, typography, borderRadius } from '@/lib/design-system'
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
  return (
    <div
      style={{
        padding: spacing.xl,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.md,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
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
