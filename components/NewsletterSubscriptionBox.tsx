'use client'

import React, { useState } from 'react'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/lib/design-system'
import { isValidEmail } from '@/lib/utils/email'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

export default function NewsletterSubscriptionBox() {
  const isMobile = useIsMobile(768)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setErrorMessage('Kérjük, adja meg az email címét.')
      setStatus('error')
      return
    }

    if (!isValidEmail(email)) {
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
    <div style={{
      backgroundColor: colors.background.paper,
      borderRadius: borderRadius.xl,
      border: `1px solid ${colors.primaryBorder}`,
      boxShadow: shadows.lg,
      padding: isMobile ? spacing.xl : spacing['2xl'],
      marginBottom: spacing['3xl'],
      position: 'relative',
      overflow: 'hidden',
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

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: spacing.xl,
        alignItems: isMobile ? 'center' : 'flex-start',
      }}>
        {/* Author Image */}
        <div style={{
          flexShrink: 0,
          width: isMobile ? '120px' : '140px',
          height: isMobile ? '120px' : '140px',
          borderRadius: borderRadius.full,
          overflow: 'hidden',
          border: `3px solid ${colors.primaryLight}`,
          boxShadow: shadows.md,
          backgroundColor: colors.gray[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Placeholder for author image - replace with actual image */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.primaryLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: typography.fontSize['4xl'],
            color: colors.primary,
          }}>
            👤
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          minWidth: 0,
        }}>
          <h3 style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            marginBottom: spacing.md,
            lineHeight: typography.lineHeight.tight,
          }}>
            Szeretnél többet megtudni?
          </h3>
          
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing.xl,
          }}>
            Ilyen hírleveleket küldök havonta, amelyekben összefoglalom a legfontosabb pénzügyi trendeket, 
            inflációs adatokat és piaci változásokat. Minden hírlevél érthető, adatvezérelt és segít megérteni, 
            hogyan hatnak ezek a változások a nehezen megkeresett pénzedre.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: spacing.md,
              marginBottom: spacing.md,
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
                  aria-describedby={status === 'error' ? 'newsletter-error' : status === 'success' ? 'newsletter-success' : undefined}
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
                    minWidth: isMobile ? '100%' : '180px'
                  }}
                >
                  Feliratkozás
                </Button>
              </div>
            </div>

            {status === 'error' && errorMessage && (
              <div 
                id="newsletter-error"
                role="alert"
                aria-live="assertive"
                style={{
                  padding: spacing.md,
                  backgroundColor: colors.errorLight,
                  borderRadius: borderRadius.md,
                  color: colors.error,
                  fontSize: typography.fontSize.sm,
                  marginBottom: spacing.md,
                }}
              >
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div 
                id="newsletter-success"
                role="alert"
                aria-live="polite"
                style={{
                  padding: spacing.md,
                  backgroundColor: colors.successLight,
                  borderRadius: borderRadius.md,
                  color: colors.success,
                  fontSize: typography.fontSize.sm,
                  marginBottom: spacing.md,
                }}
              >
                Sikeresen feliratkoztál! Köszönjük.
              </div>
            )}

            {/* Privacy consent text */}
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
              margin: 0,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              A feliratkozással elfogadod az{' '}
              <a 
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
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
