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
      background: 'linear-gradient(to bottom, #FFFFFF 0%, #F9FAFB 100%)',
      borderTop: `1px solid ${colors.gray[200]}`,
      padding: `${spacing['2xl']} 0`,
      marginTop: spacing['4xl']
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing.xl}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: spacing['2xl'],
          marginBottom: spacing.xl
        }}>
          <div>
            <h4 style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: `0 0 ${spacing.md} 0`,
              color: colors.text.primary
            }}>
              Oktatási célok
            </h4>
            <p style={{
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'justify'
            }}>
              A Contexta kizárólag oktatási és tájékoztatási célokat szolgál. 
              Az eszköz a pénzügyi folyamatok mechanizmusait mutatja be, 
              de nem nyújt személyre szabott tanácsokat.
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
              Az eszköz nem minősül pénzügyi tanácsadásnak, befektetési ajánlásnak 
              vagy egyéb szakmai szolgáltatásnak. A számítások nem helyettesítik 
              a szakértői konzultációt.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: `0 0 ${spacing.md} 0`,
              color: colors.text.primary
            }}>
              Feltételezések
            </h4>
            <p style={{
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'justify'
            }}>
              A szimulációk konzervatív feltételezéseken alapulnak. A számítások 
              közelítő értékek, és nem veszik figyelembe az egyéni körülményeket, 
              adózási tényezőket vagy piaci kockázatokat.
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
            © {new Date().getFullYear()} Contexta. Minden jog fenntartva.
          </p>
          <p style={{ margin: `0 0 ${spacing.xs} 0` }}>
            A múltbeli adatok nem garantálják a jövőbeli eredményeket.
          </p>
          <p style={{ margin: 0 }}>
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
        </div>
      </div>
    </div>
  )
}
