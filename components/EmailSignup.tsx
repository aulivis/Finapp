'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions } from '@/lib/design-system'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

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
        backgroundColor: colors.background.paper,
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['4xl']} 0`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.lg}` : `0 ${spacing.xl}`
      }}>
        <Card>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.semibold,
              marginBottom: spacing.lg,
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight
            }}>
              Havonta összefoglaljuk a gazdasági változásokat — világ és Magyarország
            </h2>

            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              marginBottom: spacing['2xl'],
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

            <p style={{
              fontSize: typography.fontSize.xs,
              color: colors.text.muted,
              margin: '0',
              lineHeight: typography.lineHeight.normal,
              marginTop: spacing.lg
            }}>
              Nem küldünk spamet. Bármikor leiratkozhatsz.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
