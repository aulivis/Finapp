import type { Metadata } from 'next'
import { colors, spacing, typography } from '@/lib/design-system'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Adatkezelési tájékoztató | Contexta',
  description: 'Adatkezelési tájékoztató - Hogyan kezeljük a személyes adataidat',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 50%, #F9FAFB 100%)',
      padding: `${spacing['4xl']} 0`,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: `0 ${spacing.xl}`,
      }}>
        {/* Back to home link */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Link 
            href="/"
            style={{
              color: colors.primary,
              textDecoration: 'none',
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.xs,
            }}
          >
            ← Vissza a főoldalra
          </Link>
        </div>

        {/* Privacy Policy Content */}
        <article style={{
          padding: spacing['3xl'],
        }}>
          <h1 style={{
            fontSize: typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            marginBottom: spacing['2xl'],
            lineHeight: typography.lineHeight.tight,
          }}>
            Adatkezelési tájékoztató
          </h1>

          <p style={{
            fontSize: typography.fontSize.lg,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing['3xl'],
          }}>
            Jelen adatkezelési tájékoztató célja, hogy tájékoztasson arról, hogyan kezeljük a weboldalon megadott személyes adataidat.
          </p>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              1. Az adatkezelő adatai
            </h2>
            <div style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              <p style={{ marginBottom: spacing.md }}>
                <strong>Adatkezelő neve:</strong> Kovács Róbert
              </p>
              <p style={{ marginBottom: spacing.md }}>
                <strong>Kapcsolattartási e-mail:</strong>{' '}
                <a 
                  href="mailto:hello@vyndi.hu"
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                  }}
                >
                  hello@vyndi.hu
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Weboldal:</strong>{' '}
                <a 
                  href="https://contexta.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                  }}
                >
                  https://contexta.hu
                </a>
              </p>
            </div>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              2. Kezelt személyes adatok köre
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              Az adatkezelés során az alábbi személyes adatot kezeljük:
            </p>
            <ul style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.md,
              paddingLeft: spacing['2xl'],
            }}>
              <li style={{ marginBottom: spacing.xs }}>e-mail cím</li>
            </ul>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              3. Az adatkezelés célja
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Az e-mail címedet kizárólag az alábbi célra használjuk:
            </p>
            <ul style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.md,
              paddingLeft: spacing['2xl'],
              marginBottom: spacing.md,
            }}>
              <li style={{ marginBottom: spacing.xs }}>pénzügyi / befektetési témájú hírlevelek és értesítések küldése</li>
              <li style={{ marginBottom: spacing.xs }}>a szolgáltatás fejlesztésével kapcsolatos információk megosztása</li>
            </ul>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              Az e-mail címedet nem használjuk automatizált döntéshozatalra, és nem adjuk el harmadik félnek.
            </p>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              4. Az adatkezelés jogalapja
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Az adatkezelés jogalapja:
            </p>
            <ul style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.md,
              paddingLeft: spacing['2xl'],
              marginBottom: spacing.md,
            }}>
              <li style={{ marginBottom: spacing.xs }}>
                az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) a) pont)
              </li>
            </ul>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              A hozzájárulásodat bármikor visszavonhatod a hírlevelekben található leiratkozási linken keresztül.
            </p>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              5. Az adatok tárolásának időtartama
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              A személyes adatokat addig kezeljük:
            </p>
            <ul style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.md,
              paddingLeft: spacing['2xl'],
              marginBottom: spacing.md,
            }}>
              <li style={{ marginBottom: spacing.xs }}>amíg le nem iratkozol a hírlevélről</li>
            </ul>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              Leiratkozás után az e-mail címedet haladéktalanul töröljük.
            </p>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              6. Adatfeldolgozók
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Az e-mail címek kezeléséhez hírlevélküldő szolgáltatót vehetünk igénybe (pl. e-mail küldés és lista kezelés céljából).
            </p>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              Az adatfeldolgozó kizárólag az adatkezelő utasításai alapján jár el.
            </p>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              7. Az érintettek jogai
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Az adatkezeléssel kapcsolatban jogosult vagy:
            </p>
            <ul style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.md,
              paddingLeft: spacing['2xl'],
              marginBottom: spacing.md,
            }}>
              <li style={{ marginBottom: spacing.xs }}>tájékoztatást kérni a kezelt adatokról</li>
              <li style={{ marginBottom: spacing.xs }}>kérni az adataid helyesbítését</li>
              <li style={{ marginBottom: spacing.xs }}>kérni az adataid törlését</li>
              <li style={{ marginBottom: spacing.xs }}>visszavonni a hozzájárulásodat</li>
              <li style={{ marginBottom: spacing.xs }}>panaszt tenni a felügyeleti hatóságnál</li>
            </ul>
          </section>

          <section style={{ marginBottom: spacing['3xl'] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              8. Panasztételi jog
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Amennyiben úgy érzed, hogy az adatkezelés sérti a jogaidat, panaszt tehetsz az alábbi hatóságnál:
            </p>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              <strong>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</strong><br />
              <a 
                href="https://www.naih.hu"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: colors.primary,
                  textDecoration: 'none',
                }}
              >
                Weboldal: https://www.naih.hu
              </a>
            </p>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              marginTop: spacing['2xl'],
            }}>
              9. Kapcsolat
            </h2>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing.md,
            }}>
              Adatkezeléssel kapcsolatos kérdés esetén az alábbi e-mail címen veheted fel velünk a kapcsolatot:
            </p>
            <p style={{
              fontSize: typography.fontSize.base,
              color: colors.text.secondary,
              lineHeight: typography.lineHeight.relaxed,
              margin: 0,
            }}>
              📧{' '}
              <a 
                href="mailto:hello@vyndi.hu"
                style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                hello@vyndi.hu
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
