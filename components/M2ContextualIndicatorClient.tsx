'use client'

import React from 'react'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import Card from '@/components/ui/Card'

interface M2ContextualIndicatorClientProps {
  year: number
  m2Growth: number | null
  periodStartYear?: number
  periodEndYear?: number
  isCumulative?: boolean
}

export default function M2ContextualIndicatorClient({ 
  year, 
  m2Growth,
  periodStartYear,
  periodEndYear,
  isCumulative = false
}: M2ContextualIndicatorClientProps) {
  if (m2Growth === null) {
    return null;
  }

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const periodText = (periodStartYear && periodEndYear && periodStartYear !== periodEndYear)
    ? `${periodStartYear}-${periodEndYear}`
    : `${year}`;

  return (
    <div style={{
      padding: spacing.xl,
      backgroundColor: colors.primaryLight,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.primaryBorder}`,
      marginTop: spacing.xl,
      fontSize: typography.fontSize.sm,
      boxShadow: shadows.md
    }}>
      <h3 style={{
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.xs,
        color: colors.text.primary
      }}>
        Mi történik közben a pénzzel?
      </h3>
      <div style={{
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing.lg,
        color: colors.text.muted,
        fontStyle: 'italic'
      }}>
        A pénz mennyisége a gazdaságban
      </div>
      
      <div style={{
        marginBottom: spacing.lg,
        padding: spacing.lg,
        backgroundColor: colors.background.paper,
        borderRadius: borderRadius.md,
        border: `1px solid ${colors.primaryBorder}`
      }}>
        <div style={{
          marginBottom: spacing.xs
        }}>
          <div style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight
          }} className="tabular-nums">
            {formatPercentage(m2Growth)}
          </div>
        </div>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.muted,
          fontWeight: typography.fontWeight.normal
        }}>
          {isCumulative 
            ? `Kumulatív viágszíntű pénzkínálat-növekedés (${periodText})`
            : `Globális pénzkínálat (M2) változás (${periodText})`
          }
        </div>
      </div>

      <div style={{
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.relaxed,
        color: colors.gray[600]
      }}>
        <p style={{ margin: `0 0 ${spacing.md} 0` }}>
          Az infláció azt mutatja meg, hogy <strong>az árak mennyivel lettek magasabbak</strong>.
          A pénzkínálat pedig azt, hogy <strong>összesen mennyi pénz van forgalomban</strong>.
        </p>
        <p style={{ margin: `0 0 ${spacing.md} 0` }}>
          Ha egyre több pénz van a gazdaságban, de nem lesz ugyanilyen arányban több áru és szolgáltatás,
          akkor <strong>ugyanaz a pénz kevesebbet ér, mint korábban</strong>.
        </p>
        <p style={{ margin: '0' }}>
          Ez az adat nem része a számításnak, de segít megérteni, miért csökken hosszú távon a pénz vásárlóereje.
        </p>
      </div>
    </div>
  );
}
