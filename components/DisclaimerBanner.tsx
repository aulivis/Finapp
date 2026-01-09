/**
 * Prominent disclaimer banner component
 * Displays key disclaimers on all pages
 */

import React from 'react'

export default function DisclaimerBanner() {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB',
      padding: '20px',
      margin: '0',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '700',
            flexShrink: '0',
            color: '#111827'
          }}>
            FIGYELMEZTETÉS
          </div>
          <div style={{
            flex: '1',
            minWidth: '250px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '500',
              margin: '0 0 12px 0',
              color: '#111827'
            }}>
              Fontos figyelmeztetés
            </h3>
            <ul style={{
              margin: '0',
              paddingLeft: '20px',
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#111827'
            }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Ez az eszköz kizárólag oktatási célokat szolgál.</strong> Nem nyújt pénzügyi tanácsadást vagy ajánlásokat.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Nem minősül pénzügyi tanácsadásnak.</strong> Az eszköz nem nyújt befektetési, adózási vagy egyéb pénzügyi tanácsokat.
              </li>
              <li style={{ marginBottom: '0' }}>
                <strong>A szimulációk feltételezéseken alapulnak.</strong> A számítások közelítő értékek, és nem veszik figyelembe az egyéni körülményeket, adózási tényezőket vagy piaci kockázatokat.
              </li>
            </ul>
            <p style={{
              margin: '16px 0 0 0',
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#111827',
              fontStyle: 'italic'
            }}>
              A pénzügyi döntésekhez szakértői konzultáció szükséges lehet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
