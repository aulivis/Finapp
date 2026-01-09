'use client'

import React from 'react'
import { colors, borderRadius } from '@/lib/design-system'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
}

export default function Skeleton({
  width = '100%',
  height = '20px',
  className = '',
  style,
}: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: colors.gray[200],
        borderRadius: borderRadius.md,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...style,
      }}
      className={className}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
