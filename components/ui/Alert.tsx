'use client'

import React from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { colors, borderRadius, spacing } from '@/lib/design-system'

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: React.ReactNode
  onClose?: () => void
  dismissible?: boolean
  style?: React.CSSProperties
}

export default function Alert({
  type = 'info',
  title,
  children,
  onClose,
  dismissible = false,
  style,
}: AlertProps) {
  const typeConfig = {
    success: {
      bg: colors.successLight,
      border: colors.success,
      icon: CheckCircle,
      iconColor: colors.success,
    },
    error: {
      bg: colors.errorLight,
      border: colors.error,
      icon: AlertCircle,
      iconColor: colors.error,
    },
    warning: {
      bg: colors.warningLight,
      border: colors.warning,
      icon: AlertTriangle,
      iconColor: colors.warning,
    },
    info: {
      bg: colors.infoLight,
      border: colors.info,
      icon: Info,
      iconColor: colors.info,
    },
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      style={{
        padding: spacing.lg,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: borderRadius.md,
        display: 'flex',
        gap: spacing.md,
        position: 'relative',
        ...style,
      }}
      role="alert"
    >
      <Icon size={20} style={{ color: config.iconColor, flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && (
          <div
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: colors.text.primary,
              marginBottom: spacing.xs,
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: colors.text.secondary,
          }}
        >
          {children}
        </div>
      </div>
      {dismissible && onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing.md,
            right: spacing.md,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.gray[500],
            padding: spacing.xs,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Bezárás"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
