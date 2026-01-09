import React from 'react'
import DemoCalculator from '@/components/DemoCalculator'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import M2ContextualIndicator from '@/components/M2ContextualIndicator'
import Link from 'next/link'

export default async function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: '0'
    }}>
      {/* Section 1 - Header */}
      <header style={{
        backgroundColor: '#F9FAFB',
        borderBottom: '1px solid #E5E7EB',
        padding: '48px 0'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '400',
            margin: '0 0 16px 0',
            color: '#111827'
          }}>
            Finapp
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4B5563',
            margin: '0',
            maxWidth: '700px'
          }}>
            Az infláció hatása a pénz vásárlóerejére. Ez egy általános jelenség, 
            amely mindenkit érint. Az alábbi számítás bemutatja, hogyan változott 
            egy fix összeg vásárlóereje az elmúlt években.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {/* Section 2 - Public Demo Calculator */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '400',
            marginBottom: '24px',
            color: '#111827',
            textAlign: 'center'
          }}>
            Általános példa számítás
          </h2>
          <DemoCalculator />
          <M2ContextualIndicator year={2024} />
        </section>

        {/* Section 3 - Explanation */}
        <section style={{
          marginBottom: '64px',
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Mit mutat ez a számítás?
          </h3>
          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#4B5563'
          }}>
            <p style={{ marginBottom: '16px' }}>
              A fenti számítás egy általános példa. Rögzített értékeket használ 
              (1 millió forint, 2014-2024 időszak) és bemutatja, hogyan csökken 
              a pénz vásárlóereje az infláció hatására.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Ez a számítás <strong>nem személyre szabott</strong>. Nem veszi 
              figyelembe az egyéni körülményeket, a konkrét megtakarításokat, 
              vagy a befektetési lehetőségeket. Csak egy általános mechanizmust 
              mutat be.
            </p>
            <p style={{ margin: '0' }}>
              A számítás a KSH által közzétett éves inflációs adatokon alapul. 
              A múltbeli adatok nem garantálják a jövőbeli eredményeket.
            </p>
          </div>
        </section>

        {/* Section 4 - Access Explanation */}
        <section style={{
          marginBottom: '64px',
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Személyre szabott számítások
          </h3>
          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#4B5563',
            marginBottom: '24px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              A fizetős hozzáférés személyre szabott számításokat tartalmaz.
            </p>
            <p style={{ marginBottom: '16px' }}>
              A hozzáférés tartalma:
            </p>
            <ul style={{
              margin: '0 0 16px 0',
              paddingLeft: '24px',
              listStyle: 'disc'
            }}>
              <li style={{ marginBottom: '8px' }}>
                Személyre szabott inflációs számítás: saját összeg és időszak alapján
              </li>
              <li style={{ marginBottom: '8px' }}>
                &quot;Semmit sem csinálok&quot; forgatókönyv: megtakarítások vásárlóerejének 
                számítása nyugdíjkorhatárig
              </li>
            </ul>
            <p style={{ margin: '0' }}>
              A hozzáférés email-cím alapján működik, jelszó nélkül. A fizetés 
              után emailben küldjük a hozzáférési linket.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/fizetes" style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              Hozzáférés vásárlása
            </Link>
          </div>
        </section>

        {/* Section 5 - Disclaimer */}
        <section style={{
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Fontos megjegyzések
          </h3>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#4B5563'
          }}>
            <p style={{ marginBottom: '12px' }}>
              Ez az eszköz kizárólag oktatási célokat szolgál. Nem minősül 
              pénzügyi tanácsadásnak, befektetési ajánlásnak vagy egyéb szakmai 
              szolgáltatásnak.
            </p>
            <p style={{ marginBottom: '12px' }}>
              A számítások feltételezéseken alapulnak és közelítő értékek. 
              Nem veszik figyelembe az egyéni körülményeket, adózási tényezőket 
              vagy piaci kockázatokat.
            </p>
            <p style={{ margin: '0' }}>
              A múltbeli adatok nem garantálják a jövőbeli eredményeket. 
              A pénzügyi döntésekhez szakértői konzultáció szükséges lehet.
            </p>
          </div>
        </section>
      </div>

      {/* Footer with Disclaimers */}
      <FooterDisclaimer />
    </main>
  )
}
