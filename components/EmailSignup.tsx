'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions, shadows } from '@/lib/design-system'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function EmailSignup() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const successMessageRef = useRef<HTMLDivElement>(null)
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
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  // Focus management after successful submission
  useEffect(() => {
    if (status === 'success' && successMessageRef.current) {
      successMessageRef.current.focus()
      successMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [status])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setErrorMessage('Kérjük, adja meg az email címét.')
      setStatus('error')
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Kérjük, adjon meg egy érvényes email címet.')
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setEmail('')
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Hiba történt a feliratkozás során. Kérjük, próbálja újra később.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Hiba történt a feliratkozás során. Kérjük, próbálja újra később.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['4xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`,
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          padding: isMobile ? spacing['2xl'] : spacing['3xl'],
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.xl,
          border: `1px solid ${colors.primaryBorder}`,
          boxShadow: shadows.lg,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`
          }} />
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Havonta összefoglaljuk a gazdasági változásokat
          </h2>

          <p style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.text.secondary,
            marginBottom: spacing['3xl'],
            lineHeight: typography.lineHeight.relaxed,
            fontWeight: typography.fontWeight.normal
          }}>
            Értelmezhető, adatvezérelt összefoglaló, nem clickbait hírlevél.
          </p>

            <form onSubmit={handleSubmit} style={{ marginBottom: spacing.xl }}>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: spacing.md,
                marginBottom: spacing.md
              }}>
                <div style={{ flex: 1 }}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') {
                        setStatus('idle')
                        setErrorMessage('')
                      }
                    }}
                    placeholder="email@pelda.hu"
                    style={{ marginBottom: 0 }}
                    disabled={isSubmitting}
                    required
                    aria-label="Email cím"
                    aria-describedby={status === 'error' ? 'email-error' : status === 'success' ? 'email-success' : undefined}
                    aria-invalid={status === 'error'}
                    aria-required="true"
                  />
                </div>
                <div style={{ flexShrink: 0 }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={{
                      width: isMobile ? '100%' : 'auto',
                      minWidth: isMobile ? '100%' : '160px'
                    }}
                  >
                    Feliratkozom
                  </Button>
                </div>
              </div>

              {status === 'error' && errorMessage && (
                <div 
                  id="email-error"
                  role="alert"
                  aria-live="assertive"
                  style={{
                    padding: spacing.md,
                    backgroundColor: colors.errorLight,
                    borderRadius: borderRadius.md,
                    color: colors.error,
                    fontSize: typography.fontSize.sm,
                    marginBottom: spacing.md,
                    textAlign: 'left'
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div 
                  ref={successMessageRef}
                  id="email-success"
                  role="alert"
                  aria-live="polite"
                  tabIndex={-1}
                  style={{
                    padding: spacing.md,
                    backgroundColor: colors.successLight,
                    borderRadius: borderRadius.md,
                    color: colors.success,
                    fontSize: typography.fontSize.sm,
                    marginBottom: spacing.md,
                    textAlign: 'left',
                    outline: 'none'
                  }}
                >
                  Sikeresen feliratkoztál! Köszönjük.
                </div>
              )}
            </form>

            {/* Privacy consent text */}
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              textAlign: 'center',
              marginTop: spacing.md,
              marginBottom: 0,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              A feliratkozással elfogadod az{' '}
              <Link 
                href="/privacy"
                style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontWeight: typography.fontWeight.medium,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none'
                }}
              >
                Adatkezelési tájékoztatót
              </Link>
              .
            </p>

            {/* Trust signals */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? spacing.md : spacing.lg,
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              marginTop: spacing.xl,
              flexWrap: 'wrap',
              fontWeight: typography.fontWeight.medium
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>🔒</span>
                <span>Nem küldünk spamet</span>
              </div>
              <div style={{
                display: isMobile ? 'none' : 'block',
                width: '1px',
                height: '16px',
                backgroundColor: colors.gray[300]
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>✉️</span>
                <span>Havi egy email</span>
              </div>
              <div style={{
                display: isMobile ? 'none' : 'block',
                width: '1px',
                height: '16px',
                backgroundColor: colors.gray[300]
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>🚪</span>
                <span>Bármikor leiratkozhatsz</span>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
