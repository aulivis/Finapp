'use client'

import React, { useId } from 'react'
import { colors, spacing, componentStyles, focusStyles } from '@/lib/design-system'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  suffix?: string
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  suffix,
  id,
  className = '',
  style,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const isMobile = useIsMobile(768)
  
  // Calculate padding: larger on mobile for easier typing
  const basePadding = componentStyles.input.padding.split(' ')
  const verticalPadding = isMobile ? spacing.lg : basePadding[0] // 16px on mobile, 12px on desktop
  const horizontalPadding = basePadding[1] // 16px

  return (
    <div style={{ marginBottom: spacing.lg }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            marginBottom: spacing.sm,
            fontSize: '14px',
            fontWeight: '500',
            color: colors.text.secondary,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: spacing.lg,
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.gray[500],
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </div>
        )}
        <input
          id={inputId}
          style={{
            ...componentStyles.input,
            padding: `${verticalPadding} ${horizontalPadding}`,
            paddingLeft: icon ? spacing['3xl'] : horizontalPadding,
            paddingRight: suffix ? spacing['3xl'] : horizontalPadding,
            width: '100%',
            backgroundColor: colors.background.paper,
            color: colors.text.primary,
            fontFamily: 'inherit',
            fontWeight: '400',
            ...(error
              ? {
                  borderColor: colors.error,
                  boxShadow: `0 0 0 1px ${colors.error}`,
                }
              : {}),
            ...style,
          }}
          className={className}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = colors.primary
              e.target.style.boxShadow = focusStyles.boxShadow
            }
            onFocus?.(e)
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = colors.gray[200]
              e.target.style.boxShadow = 'none'
            }
            onBlur?.(e)
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e)
          }}
          {...props}
        />
        {suffix && (
          <div
            style={{
              position: 'absolute',
              right: spacing.lg,
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.gray[500],
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
            marginTop: spacing.xs,
            fontSize: '13px',
            color: colors.error,
          }}
        >
          <span style={{ fontSize: '16px' }}>⚠</span>
          {error}
        </div>
      )}
      {helperText && !error && (
        <div
          style={{
            marginTop: spacing.xs,
            fontSize: '13px',
            color: colors.text.muted,
            lineHeight: '1.6',
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  )
}
