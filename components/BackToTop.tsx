'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { colors, borderRadius, spacing, shadows } from '@/lib/design-system'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Vissza a tetejére"
      style={{
        position: 'fixed',
        bottom: spacing.xl,
        right: spacing.xl,
        width: '48px',
        height: '48px',
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary,
        color: '#FFFFFF',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: shadows.lg,
        zIndex: 50,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primaryHover
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <ArrowUp size={20} />
    </button>
  )
}
