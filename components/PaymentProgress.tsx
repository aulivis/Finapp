'use client'

import React from 'react'
import { colors, spacing, typography } from '@/lib/design-system'

interface PaymentProgressProps {
  currentStep: number
  totalSteps: number
}

export default function PaymentProgress({ currentStep, totalSteps }: PaymentProgressProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)
  const progress = (currentStep / totalSteps) * 100

  return (
    <div style={{ marginBottom: spacing.xl }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md
      }}>
        {steps.map((step) => (
          <div
            key={step}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step <= currentStep ? colors.primary : colors.gray[200],
                color: step <= currentStep ? '#FFFFFF' : colors.gray[500],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.xs,
                transition: 'all 0.3s ease'
              }}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  backgroundColor: step < currentStep ? colors.primary : colors.gray[200],
                  zIndex: -1,
                  transition: 'background-color 0.3s ease'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{
        height: '4px',
        backgroundColor: colors.gray[200],
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: spacing.md
      }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: colors.primary,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  )
}
