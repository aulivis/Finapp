'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { colors } from '@/lib/design-system'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  className?: string
}

export default function LoadingSpinner({
  size = 24,
  color = colors.primary,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <Loader2
      size={size}
      style={{
        color,
        animation: 'spin 1s linear infinite',
      }}
      className={className}
      aria-label="Betöltés"
    >
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Loader2>
  )
}
