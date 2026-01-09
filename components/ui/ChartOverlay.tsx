'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { colors, spacing, borderRadius, shadows } from '@/lib/design-system'

interface ChartOverlayProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function ChartOverlay({ isOpen, onClose, title, children }: ChartOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        style={{
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.lg,
          padding: spacing.xl,
          maxWidth: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: shadows['2xl'],
          animation: 'slideUp 0.3s ease',
          width: '100%',
          maxWidth: '600px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg
        }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: colors.text.primary,
            margin: 0
          }}>
            {title}
          </h4>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: borderRadius.md,
              border: 'none',
              backgroundColor: colors.gray[100],
              color: colors.gray[600],
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.gray[200]
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.gray[100]
            }}
            aria-label="Bezárás"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
