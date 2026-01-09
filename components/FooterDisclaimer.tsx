/**
 * Footer disclaimer component
 * Displays comprehensive disclaimers in footer
 */

import React from 'react'

export default function FooterDisclaimer() {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E5E7EB',
      padding: '32px 0',
      marginTop: '64px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '24px'
        }}>
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              margin: '0 0 12px 0',
              color: '#111827'
            }}>
              Oktatási célok
            </h4>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: '#4B5563',
              margin: 0
            }}>
              A Finapp kizárólag oktatási és tájékoztatási célokat szolgál. 
              Az eszköz a pénzügyi folyamatok mechanizmusait mutatja be, 
              de nem nyújt személyre szabott tanácsokat.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              margin: '0 0 12px 0',
              color: '#111827'
            }}>
              Nem pénzügyi tanácsadás
            </h4>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: '#4B5563',
              margin: 0
            }}>
              Az eszköz nem minősül pénzügyi tanácsadásnak, befektetési ajánlásnak 
              vagy egyéb szakmai szolgáltatásnak. A számítások nem helyettesítik 
              a szakértői konzultációt.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              margin: '0 0 12px 0',
              color: '#111827'
            }}>
              Feltételezések
            </h4>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: '#4B5563',
              margin: 0
            }}>
              A szimulációk konzervatív feltételezéseken alapulnak. A számítások 
              közelítő értékek, és nem veszik figyelembe az egyéni körülményeket, 
              adózási tényezőket vagy piaci kockázatokat.
            </p>
          </div>
        </div>
        
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #E5E7EB',
          textAlign: 'center',
          fontSize: '12px',
          color: '#4B5563'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            © {new Date().getFullYear()} Finapp. Minden jog fenntartva.
          </p>
          <p style={{ margin: 0 }}>
            A múltbeli adatok nem garantálják a jövőbeli eredményeket.
          </p>
        </div>
      </div>
    </div>
  )
}
