/**
 * Footer disclaimer component
 * Displays comprehensive disclaimers in footer
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { colors, spacing, typography } from '@/lib/design-system'

export default function FooterDisclaimer() {
  return (
    <div style={{
      backgroundColor: '#F3F4F6',
      borderTop: `1px solid ${colors.gray[200]}`,
      padding: `${spacing.xl} 0`,
      marginTop: spacing['3xl']
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing.md}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: spacing.lg,
          marginBottom: spacing.lg
        }}>
          <div>
            <h4 style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: `0 0 ${spacing.md} 0`,
              color: colors.text.primary
            }}>
              Oktatási cél
            </h4>
            <p style={{
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'justify'
            }}>
              A Contexta kizárólag oktatási és tájékoztatási célt szolgál. 
              Az eszköz pénzügyi folyamatok működését szemlélteti, nem nyújt személyre szabott tanácsot.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: `0 0 ${spacing.md} 0`,
              color: colors.text.primary
            }}>
              Nem pénzügyi tanácsadás
            </h4>
            <p style={{
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'justify'
            }}>
              A Contexta nem minősül pénzügyi tanácsadásnak, befektetési ajánlásnak 
              vagy egyéb szakmai szolgáltatásnak. A megjelenített információk nem helyettesítik szakértő bevonását.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: `0 0 ${spacing.md} 0`,
              color: colors.text.primary
            }}>
              Feltételezések és korlátok
            </h4>
            <p style={{
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'justify'
            }}>
              A szimulációk egyszerűsített, konzervatív feltételezéseken alapulnak. Az eredmények 
              közelítőek, nem veszik figyelembe az egyéni körülményeket, adózást vagy piaci kockázatokat.
            </p>
          </div>
        </div>
        
        <div style={{
          paddingTop: spacing.xl,
          borderTop: `1px solid ${colors.gray[200]}`,
          textAlign: 'center',
          fontSize: typography.fontSize.xs,
          color: colors.gray[600]
        }}>
          <p style={{ margin: `0 0 ${spacing.xs} 0` }}>
            © {new Date().getFullYear()} Contexta. Minden jog fenntartva. {' '}
            <span style={{ color: colors.gray[400] }}>|</span>{' '}
            <Link 
              href="/privacy"
              style={{
                color: colors.gray[600],
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray[600]
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Adatkezelési tájékoztató
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            A múltbeli adatok nem garantálják a jövőbeli eredményeket.
          </p>
        </div>
      </div>
    </div>
  )
}
