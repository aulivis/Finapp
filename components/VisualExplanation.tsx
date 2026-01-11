'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions } from '@/lib/design-system'

export default function VisualExplanation() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Add fade-in animation on mount
  useEffect(() => {
    if (sectionRef.current && !prefersReducedMotion) {
      sectionRef.current.style.opacity = '0'
      sectionRef.current.style.transform = 'translateY(20px)'
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = `opacity ${transitions.slow}, transform ${transitions.slow}`
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: colors.background.default,
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['4xl']} 0`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing.xl,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }}>
            Mi történik, ha nem történik semmi?
          </h2>

          <p style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.text.secondary,
            marginBottom: spacing['2xl'],
            lineHeight: typography.lineHeight.relaxed,
            fontWeight: typography.fontWeight.normal
          }}>
            Idővel még a változatlan összeg is kevesebbet ér a vásárlóerő szempontjából.
          </p>

          <div style={{
            marginBottom: spacing.xl,
            borderRadius: borderRadius.md,
            overflow: 'hidden',
            backgroundColor: colors.background.paper,
            padding: spacing.lg,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <Image 
              src="/mi-tortenik.png" 
              alt="Mi történik a pénzzel, ha nem történik semmi"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 800px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: borderRadius.sm
              }}
              priority={false}
              loading="lazy"
            />
          </div>

          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            lineHeight: typography.lineHeight.relaxed,
            margin: '0',
            fontStyle: 'italic',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            A passzív tétlenség is valós hatással jár: az infláció folyamatosan csökkenti a pénz vásárlóerejét, még akkor is, ha a számlán ugyanannyi forintot látsz.
          </p>
        </div>
      </div>
    </section>
  )
}
