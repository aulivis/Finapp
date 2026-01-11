'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'

interface M2Data {
  currentYear: number
  averageM2Growth: number | null
  averageM2GrowthPrevious: number | null
}

export default function VisualExplanation() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [m2Data, setM2Data] = useState<M2Data | null>(null)
  const [isLoadingM2, setIsLoadingM2] = useState(true)

  // Fetch M2 data
  useEffect(() => {
    async function fetchM2Data() {
      try {
        const response = await fetch('/api/macro-data?country=HU')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data.m2) {
            setM2Data(data.data.m2)
          }
        }
      } catch (error) {
        console.error('Error fetching M2 data:', error)
      } finally {
        setIsLoadingM2(false)
      }
    }
    fetchM2Data()
  }, [])

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
        backgroundColor: colors.background.paper,
        padding: isMobile ? `${spacing['4xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Mi történik, ha nem történik semmi?
          </h2>

          <p style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.text.secondary,
            marginBottom: spacing['3xl'],
            lineHeight: typography.lineHeight.relaxed,
            fontWeight: typography.fontWeight.normal
          }}>
            Idővel még a változatlan összeg is kevesebbet ér a vásárlóerő szempontjából.
          </p>

          <div style={{
            marginBottom: spacing['3xl'],
            borderRadius: borderRadius.xl,
            overflow: 'hidden',
            backgroundColor: colors.background.paper,
            padding: spacing.xl,
            border: `1px solid ${colors.gray[200]}`,
            boxShadow: shadows.md
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
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            margin: `${spacing.xl} 0 0 0`,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: typography.fontWeight.normal
          }}>
            A passzív tétlenség is valós hatással jár: az infláció folyamatosan csökkenti a pénz vásárlóerejét, még akkor is, ha a számlán ugyanannyi forintot látsz.
          </p>

          {/* M2 Section */}
          {!isLoadingM2 && m2Data && m2Data.averageM2Growth !== null && (
            <div style={{
              marginTop: spacing['4xl'],
              padding: spacing['2xl'],
              background: `linear-gradient(135deg, ${colors.gray[50]} 0%, ${colors.background.paper} 100%)`,
              borderRadius: borderRadius.xl,
              border: `1px solid ${colors.gray[200]}`,
              boxShadow: shadows.sm
            }}>
              <h3 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.md,
                color: colors.text.primary
              }}>
                Pénzkínálat (M2) trendek
              </h3>
              <p style={{
                fontSize: typography.fontSize.base,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.relaxed,
                marginBottom: spacing.md,
                margin: `0 0 ${spacing.md} 0`
              }}>
                Az {m2Data.currentYear}. év átlagos M2 pénzkínálat növekedése{' '}
                <strong>{m2Data.averageM2Growth.toFixed(1)}%</strong>.
                {m2Data.averageM2GrowthPrevious !== null && (
                  <>
                    {' '}
                    {(() => {
                      const m2Change = m2Data.averageM2Growth! - m2Data.averageM2GrowthPrevious
                      if (m2Change > 0) {
                        return `Az előző évhez képest ${m2Change.toFixed(1)} százalékponttal nőtt.`
                      } else if (m2Change < 0) {
                        return `Az előző évhez képest ${Math.abs(m2Change).toFixed(1)} százalékponttal csökkent.`
                      } else {
                        return 'Az előző évhez képest változatlan maradt.'
                      }
                    })()}
                  </>
                )}
              </p>
              <div style={{
                padding: spacing.md,
                backgroundColor: colors.gray[50],
                borderRadius: borderRadius.sm,
                borderLeft: `3px solid ${colors.gray[300]}`,
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.text.muted,
                marginTop: spacing.md
              }}>
                <strong>Megjegyzés:</strong> Az M2 pénzkínálat növekedése kontextuális mutató, 
                amely a gazdaságban lévő pénzmennyiség változását mutatja. Ez a mutató nem 
                használható a számításokban, és nem mutat közvetlen ok-okozati összefüggést 
                az inflációval. A vásárlóerőt számos tényező befolyásolja.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
