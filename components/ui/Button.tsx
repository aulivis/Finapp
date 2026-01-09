'use client'

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { colors, borderRadius, spacing, transitions, componentStyles } from '@/lib/design-system'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: size === 'sm' ? '14px' : size === 'lg' ? '15px' : '15px',
    fontWeight: variant === 'tertiary' ? '400' : '500',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: transitions.fast,
    minHeight: componentStyles.button.minHeight,
    padding: componentStyles.button.padding[size],
    fontFamily: 'inherit',
    ...style,
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: disabled || loading ? colors.gray[300] : colors.primary,
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: disabled || loading ? colors.gray[100] : colors.background.paper,
      color: disabled || loading ? colors.gray[400] : colors.text.primary,
      border: `1px solid ${disabled || loading ? colors.gray[300] : colors.gray[200]}`,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: disabled || loading ? colors.gray[400] : colors.text.primary,
      padding: spacing.sm + ' ' + spacing.lg,
    },
  }

  const [isHovered, setIsHovered] = useState(false)

  const hoverStyles = !disabled && !loading && isHovered ? {
    backgroundColor: variant === 'primary' ? colors.primaryHover : variant === 'secondary' ? colors.gray[50] : 'transparent',
  } : {}

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <button
        style={{
          ...baseStyles,
          ...variantStyles[variant],
          ...hoverStyles,
          opacity: disabled && !loading ? 0.5 : 1,
        }}
        disabled={disabled || loading}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {loading && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
        {children}
      </button>
    </>
  )
}
