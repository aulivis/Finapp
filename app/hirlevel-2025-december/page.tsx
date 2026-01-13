import type { Metadata } from 'next'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import ContextaWordmark from '@/components/ContextaWordmark'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import NewsletterSubscriptionBox from '@/components/NewsletterSubscriptionBox'
import BackLink from '@/components/BackLink'
import InflationInterestChart from '@/components/newsletter/2025-december/InflationInterestChart'
import ConsumerConfidenceChart from '@/components/newsletter/2025-december/ConsumerConfidenceChart'
import LaborMarketChart from '@/components/newsletter/2025-december/LaborMarketChart'
import BudgetBalanceChart from '@/components/newsletter/2025-december/BudgetBalanceChart'
import NewsletterAudioPlayer from '@/components/newsletter/2025-december/NewsletterAudioPlayer'

export const metadata: Metadata = {
  title: 'Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló | Contexta',
  description: 'Decemberi gazdasági összefoglaló: infláció, GDP növekedés, fogyasztói bizalom, munkaerőpiac és államháztartás - 2025. december',
  robots: {
    index: true,
    follow: true,
  },
}

export default function NewsletterPage() {
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
        padding: `0 ${spacing.md}`,
      }}>
        {/* Wordmark */}
        <div style={{
          marginBottom: spacing['3xl'],
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ContextaWordmark />
        </div>

        {/* Back to home link */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <BackLink />
        </div>

        {/* Newsletter Content */}
        <article className="newsletter-article-mobile" style={{
          padding: spacing['2xl'],
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.lg,
          boxShadow: shadows.md,
          marginBottom: spacing['3xl'],
        }}>
          <header style={{
            marginBottom: spacing['2xl'],
            paddingBottom: spacing.xl,
            borderBottom: `1px solid ${colors.gray[200]}`,
            textAlign: 'center',
          }}>
            <h1 className="newsletter-title" style={{
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.md,
              lineHeight: typography.lineHeight.tight,
              letterSpacing: '-0.03em',
            }}>
              Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló
            </h1>
            <p style={{
              fontSize: typography.fontSize.lg,
              color: colors.text.muted,
              margin: 0,
              fontStyle: 'italic',
            }}>
              Havi pénzügyi összefoglaló - 2025. december
            </p>
          </header>

          {/* Audio Player Placeholder */}
          <NewsletterAudioPlayer />

          {/* Newsletter Content Area */}
          <div style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            textAlign: 'justify',
          }}>
            {/* Introduction */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <p style={{ marginBottom: spacing.md }}>
                Decemberben a gazdasági hírek gyakran úgy hangzanak, mintha csak a szakértőknek szólnának – százalékok, szakzsargon, láthatatlan összefüggések. Ez az összefoglaló másként közelít: öt, az adatokból egyértelműen látszó tényt vizsgálunk meg abból a szempontból, hogy mit jelentenek a mindennapi életben.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Mi történt 2025-ben? Az infláció végre a jegybank célzónájába érkezett, de a gazdaság növekedése továbbra is visszafogott. Több mint három éve gyakorlatilag stagnál a GDP, miközben a fogyasztói bizalom mélyponton van – mégis, a háztartások költése tartja életben a növekedést. A munkaerőpiac paradox helyzetet mutat: alacsony a munkanélküliség, de a cégek nem bővülnek, az államháztartás pedig az év végén hiánnyal zárt.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az alábbiakban ezt az öt területet járjuk körül adatokkal, trendekkel – politikai álláspontok és spekulációk nélkül.
              </p>
            </section>

            {/* Visual separator before first topic */}
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray[300]}, transparent)`,
              marginTop: spacing['3xl'],
              marginBottom: spacing['3xl'],
            }} />

            {/* 1. Infláció */}
            <section style={{ marginBottom: spacing['4xl'] }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.xl,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  border: `2px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  flexShrink: 0,
                }}>
                  1
                </div>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                  flex: 1,
                  textAlign: 'left',
                }}>
                  Az infláció: Végre csökken, de mit jelent ez a gyakorlatban?
                </h2>
              </div>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Tények (2025. november):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>A fogyasztói árindex 3,8%-ra csökkent</li>
                <li style={{ marginBottom: spacing.sm }}>Ez a Magyar Nemzeti Bank 3% +/-1%-os célzónájába esik</li>
                <li style={{ marginBottom: spacing.sm }}>Tavaly ilyenkor még 7% felett volt az infláció</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                A bevásárláskor már nem érzed, hogy minden hónapban 5-10%-kal többet kell fizetned ugyanazért a kosárért. Ha egy átlagos család havi 100 000 forintot költ élelmiszerre, a csökkenő infláció azt jelenti, hogy a költségeik növekedése lelassult – de az árak továbbra sem estek vissza, csak lassabban nőnek.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A hiteleknél a helyzet bonyolultabb: a kamatok még mindig 6,5%-on állnak (az MNB alapkamata). Ez azt jelenti, hogy ha új hitelt vennél fel, a költségek magasabbak, mint 2021-ben voltak, de stabilak – nem emelkednek tovább.
              </p>

              {/* Information box about MNB alapkamat */}
              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.infoLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.info}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.info,
                  }}>
                    ℹ️
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.sm }}>
                      Mi az MNB alapkamat?
                    </strong>
                    <p style={{ 
                      marginBottom: spacing.sm,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.relaxed,
                    }}>
                      A Magyar Nemzeti Bank (MNB) alapkamata az a referencia kamatláb, amelyet a jegybank a pénzügyi rendszer stabilitásáért felelős. Ez a kamat meghatározza, hogy milyen áron kölcsönöznek egymásnak a bankok, és közvetve befolyásolja az összes többi kamatot a gazdaságban.
                    </p>
                    <p style={{ 
                      marginBottom: 0,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.relaxed,
                    }}>
                      <strong style={{ color: colors.text.primary }}>Gyakorlati jelentése:</strong> Ha az alapkamat magas (mint most 6,5%), akkor a bankok is magasabb kamatot számítanak fel a hitelekre, de magasabb kamatot is fizetnek a betétekre. Ha az alapkamat alacsony, olcsóbbak a hitelek, de a megtakarítások is kevesebbet hoznak. A jegybank ezzel a kamattal próbálja szabályozni az inflációt és a gazdasági növekedést.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart: Inflation & Interest Rates */}
              <div className="newsletter-chart-wrapper-mobile" style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: shadows.sm,
              }}>
                <InflationInterestChart height={600} />
              </div>

              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.primary,
                  }}>
                    💡
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.xs }}>
                      Miért fontos most?
                    </strong>
                    <span style={{ color: colors.text.secondary }}>
                      Az év végi inflációs adat meghatározza, hogy a jövő év elején milyen mértékben emelkedhetnek a bérek és nyugdíjak &quot;értéke&quot;.
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: spacing.md, marginTop: spacing.xl }}>
                A 3,8%-os novemberi inflációs adat azonban csak a felszínt mutatja. A Magyar Nemzeti Bank adatai szerint az úgynevezett maginfláció – ami kiszűri az élelmiszerek és energia árának rövid távú kilengéseit – még mindig 4,1% volt novemberben, jóval magasabb a célzóna felett. Ez azt jelenti, hogy a mindennapi szolgáltatások, a busz- és vonatjegyek, a fodrászat, a mosoda, a banki díjak terén a drágulás még mindig jelentősebb, mint ahogy a fő inflációs szám sugallja.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A forint 2025-ös erősödése (közel 5%-kal a euróval szemben) segítette az árcsökkenést, de ez a hatás 2026-ra elapadhat. A kormány árstopjai és egyéb adminisztratív intézkedései önmagukban 1,5-2 százalékponttal csökkentették a hivatalos inflációt – ezek nélkül a kosárban 5-5,5%-os drágulást mérhetnénk.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az élelmiszerek árai különösen volatilisak voltak: a novemberi enyhe csökkenés a kiugróan alacsony élelmiszerár-emelkedésnek köszönhető, ami nem feltétlenül tartható fenn. A lakossági inflációs várakozások továbbra is a 3%-os cél fölött ragadtak (4-5% körül), ami azt jelzi, hogy az emberek még nem hiszik el a tartós árstabilitást – és ez önbeteljesítő jóslat lehet, ha a cégek ennek megfelelően áraznak.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A kamatcsökkentés várhatóan csak 2026 második felében indulhat, amikor a maginfláció is tartósan a cél körül stabilizálódik – addig a lakáshitelek, fogyasztási hitelek kamatai magasak maradnak, ami visszafogja a nagyobb kiadásokat, például az autóvásárlást vagy lakásfelújítást.
              </p>
            </section>

            {/* Visual separator */}
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray[300]}, transparent)`,
              marginTop: spacing['4xl'],
              marginBottom: spacing['4xl'],
            }} />

            {/* 2. Gazdaság növekedés */}
            <section style={{ marginBottom: spacing['4xl'] }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.xl,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  border: `2px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  flexShrink: 0,
                }}>
                  2
                </div>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                  flex: 1,
                  textAlign: 'left',
                }}>
                  A gazdaság nő – de miért nem érezzük?
                </h2>
              </div>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Tények (2025 harmadik negyedév):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>A GDP 0,6%-kal nőtt éves összevetésben</li>
                <li style={{ marginBottom: spacing.sm }}>Ugyanakkor az év harmadik negyedévében stagnált a növekedés</li>
                <li style={{ marginBottom: spacing.sm }}>Három éve gyakorlatilag nem nő a magyar gazdaság</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                Ha a GDP &quot;nő&quot;, de te ezt nem érzed, annak oka az, hogy a növekedés egyenlőtlenül oszlik meg. A számok azt mutatják, hogy a háztartások fogyasztása tartja fenn a növekedést, de a cégek nem fejlesztenek, az export pedig gyengül.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Ez azt jelenti, hogy:
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>A munkahelyed valószínűleg megmaradt (munkanélküliség 4,5%)</li>
                <li style={{ marginBottom: spacing.sm }}>De ha váltanál, vagy béremelést szeretnél, nehezebb helyzetben vagy</li>
                <li style={{ marginBottom: spacing.sm }}>A cégek nem építenek új gyárakat, így kevesebb új munkahely jön létre</li>
              </ul>

              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.primary,
                  }}>
                    💡
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.xs }}>
                      Miért fontos most?
                    </strong>
                    <span style={{ color: colors.text.secondary }}>
                      Az év végi adatok alapján dől el, hogy 2026-ban mernek-e a cégek újra beruházni, ami közvetlenül a te jövőbeli munkalehetőségeidet is befolyásolja.
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: spacing.md, marginTop: spacing.xl }}>
                A 0,6%-os növekedés mögött egy év teljes jellemzője bújik meg. A 2025-ös év egészét nézve a gazdaság mindössze 0,4-0,5%-ot bővülhet, ami alig több a stagnálásnál. A legdrámaibb adat a beruházások terén látszik: a bruttó fix tőkealkotás (vagyis az új gépek, épületek, technológia vásárlása) 2025-ben csökkent, ami azt jelenti, hogy a cégek nem fejlesztenek, nem építenek új gyárakat, nem vesznek modern technológiát.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Ennek oka a bizonytalan nemzetközi környezet, a német gazdaság gyengülése (amely a magyar export 27%-át adja), és az EU-s források befagyása, amely 2025-ben 2,5%-kal visszavetette a beruházásokat. A külkereskedelem is vérzik: a gépjármű- és akkumulátorexport 8-10%-kal esett vissza, mivel az európai autópiac telítődött, és a kínai verseny erősödik.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az állami kiadások nőttek ugyan, de ezt részben az államadósság finanszírozása emésztette fel – a kamatkiadások 2025-ben meghaladták a GDP 3%-át. Ez a szerkezet azért nem érezhető a mindennapokban, mert a háztartások a reálbéreik növekedését (3-4% éves szinten) rögtön elköltik élelmiszerre, rezsire és szolgáltatásokra, miközben a cégek nem teremtenek új, magasabb hozzáadott értékű munkahelyeket.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Így marad a &quot;túlélő üzemmód&quot; – van munka, van fizetés, de nincs előrelépés, nincs növekedési dinamika, amely új lehetőségeket nyithatna.
              </p>
            </section>

            {/* Visual separator */}
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray[300]}, transparent)`,
              marginTop: spacing['4xl'],
              marginBottom: spacing['4xl'],
            }} />

            {/* 3. Fogyasztói bizalom */}
            <section style={{ marginBottom: spacing['4xl'] }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.xl,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  border: `2px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  flexShrink: 0,
                }}>
                  3
                </div>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                  flex: 1,
                  textAlign: 'left',
                }}>
                  Fogyasztói bizalom: Miért nem költünk, ha van munkánk?
                </h2>
              </div>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Tények (2025. november):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>A magyar fogyasztói bizalom index -24,3 pont</li>
                <li style={{ marginBottom: spacing.sm }}>Ez azt jelenti, hogy még mindig pesszimisták a háztartások</li>
                <li style={{ marginBottom: spacing.sm }}>30 ország közül csak Törökország előz meg minket</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                A bizalom index azt méri, hogy mennyire érzed magad biztonságban a munkahelyeddel, jövedelmeddel és a gazdasági kilátásokkal kapcsolatban. Mínusz érték azt jelenti, hogy többen félnek a jövőtől, mint ahányan optimisták.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Ennek ellenére a fogyasztás tartja a gazdaságot. Hogyan lehetséges ez?
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Az emberek költenek, de óvatosabban</li>
                <li style={{ marginBottom: spacing.sm }}>Inkább megtakarítanak, ha tehetik</li>
                <li style={{ marginBottom: spacing.sm }}>Kevesebb nagyberuházás (pl. lakásvásárlás, autóvétel)</li>
              </ul>

              {/* Chart: Consumer Confidence Global Ranking */}
              <div className="newsletter-chart-wrapper-mobile" style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: shadows.sm,
              }}>
                <ConsumerConfidenceChart height={700} />
              </div>

              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.primary,
                  }}>
                    💡
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.xs }}>
                      Miért fontos most?
                    </strong>
                    <span style={{ color: colors.text.secondary }}>
                      Az év végi bizalmi adatok befolyásolják a karácsonyi vásárlást és a 2026-os év kezdetét. Ha a bizalom továbbra is gyenge, a cégek nem fognak bővülni, mert nem bíznak a keresletben.
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: spacing.md, marginTop: spacing.xl }}>
                A -24,3-as bizalmi index nem csupán egy szám, hanem egy évekkel ezelőtt kezdődő trend csúcsa. A magyar fogyasztói bizalom 2022 óta folyamatosan a mélyben jár, és bár 2025 júliusában -28,9 ponton volt a mélypont, a novemberi -24,3 még mindig a lejtőn való toporgást jelzi. Az Ipsos globális felmérése szerint a 30 vizsgált ország közül Magyarországon a második legpesszimistábbak a fogyasztók, és ez a helyzet már évek óta változatlan – 2024-ben is a sereghajtók között voltunk.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az érdekesség, hogy a fogyasztói bizalom és a tényleges fogyasztás között szakadék tátong: 2025-ben a kiskereskedelmi forgalom 3,1%-kal nőtt, ami azt jelzi, hogy az emberek bár félnek, muszáj költeniük az alapvető dolgokra. A bizalmat leginkább a lakhatási költségek (rezsi, lakbér), a gyógyszerárak és az élelmiszerárak alakulása rombolja – ezek azok a kiadások, amelyekre nincs ráhatása a háztartásoknak, így a kontrollérzet hiánya pesszimizmust szül.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A bizalmi index ráadásul önbeteljesítő is: ha a vállalkozások azt látják, hogy a fogyasztók nem bíznak a jövőben, elhalasztják a beruházásokat, ami miatt kevesebb új munkahely jön létre, ami tovább rontja a bizalmat. Ez a spirál nehezen törik meg, és 2026 elején a 11%-os minimálbér-emelés sem garantáltan oldja meg – ha az emberek tartanak a munkahelyük elvesztésétől, inkább takarékoskodnak, mintsem elköltik a plusz jövedelmet.
              </p>
            </section>

            {/* Visual separator */}
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray[300]}, transparent)`,
              marginTop: spacing['4xl'],
              marginBottom: spacing['4xl'],
            }} />

            {/* 4. Munkaerőpiac */}
            <section style={{ marginBottom: spacing['4xl'] }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.xl,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  border: `2px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  flexShrink: 0,
                }}>
                  4
                </div>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                  flex: 1,
                  textAlign: 'left',
                }}>
                  Munkaerőpiac: Biztonság vagy bizonytalanság?
                </h2>
              </div>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Tények (2025. ősz):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Munkanélküliség: 4,5% (történelmileg alacsony)</li>
                <li style={{ marginBottom: spacing.sm }}>Ugyanakkor a &quot;munkaerőpiaci feszesség&quot; enyhül</li>
                <li style={{ marginBottom: spacing.sm }}>január: 11%-os minimálbér-emelés jön</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                Alacsony munkanélküliség = ha van munkád, valószínűleg meg is tartod. De a &quot;feszesség enyhülése&quot; azt jelenti, hogy a cégek nem küzdenek annyira a munkavállalókért, mint 2022-ben.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A minimálbér-emelés közvetlenül érint, ha ezen a szinten keresel:
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Bruttóban több lesz a fizetésed</li>
                <li style={{ marginBottom: spacing.sm }}>De a nettó béremelést részben elviheti a magas infláció</li>
                <li style={{ marginBottom: spacing.sm }}>A cégek költségei nőnek, ami visszafoghatja a további felvételeket</li>
              </ul>

              {/* Chart: Labor Market Paradox */}
              <div className="newsletter-chart-wrapper-mobile" style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: shadows.sm,
              }}>
                <LaborMarketChart height={650} />
              </div>

              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.primary,
                  }}>
                    💡
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.xs }}>
                      Miért fontos most?
                    </strong>
                    <span style={{ color: colors.text.secondary }}>
                      Az év végi adatok (munkanélküliség, betöltetlen álláshelyek) meghatározzák, hogy 2026-ban milyen erőtér alakul ki a bértárgyalásoknál.
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: spacing.md, marginTop: spacing.xl }}>
                A 4,5%-os munkanélküliségi ráta mögött egy láthatatlan, de érzékelhető strukturális változás bújik meg. A munkaerőpiaci feszesség – vagyis hogy mennyire küzdenek a cégek munkaerőért – 2025-ben folyamatosan enyhült: a betöltetlen álláshelyek száma 15%-kal csökkent 2024-hez képest, ami azt jelenti, hogy a munkaadók nem annyira sürgetően keresnek új embereket. Ez azért van, mert a cégek nem bővülnek, inkább a meglévő létszámot tartják, és ha valaki elmegy, nem mindig pótolják.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az új munkahelyek jelentős része a közfoglalkoztatásban vagy az állami szektorban jön létre, a versenyszféra csendben stagnál. A 2026. január 1-jei minimálbér-emelés 29 200 forintos bruttó növekedést jelent, de a nettó béremelés csak 19 500 forint, mivel a magasabb bér magasabb adó- és járulékterhet is von maga után. Ez a különbség fontos: a munkáltató többletköltsége nagyobb, mint a munkavállaló többletjövedelme.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az MNB adatai szerint a magánszektorbeli új munkaszerződések száma 2025-ben 12%-kal csökkent, miközben a közszféráé nőtt – ez azt jelenti, hogy a versenyszféra bizalma a jövőbeli kereslettel szemben gyenge, nem tervez hosszú távú létszámbővítést. Így a &quot;biztonság&quot; csak annyit jelent, hogy aki dolgozik, az maradhat, de aki munkát keres, annak nehezebb jó minőségű, versenyszféra-beli állást találnia, mint 2022-ben.
              </p>
            </section>

            {/* Visual separator */}
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${colors.gray[300]}, transparent)`,
              marginTop: spacing['4xl'],
              marginBottom: spacing['4xl'],
            }} />

            {/* 5. Államháztartás */}
            <section style={{ marginBottom: spacing['4xl'] }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.xl,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  border: `2px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  flexShrink: 0,
                }}>
                  5
                </div>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                  margin: 0,
                  flex: 1,
                  textAlign: 'left',
                }}>
                  Az állam költségvetése: Miért fontos ez neked?
                </h2>
              </div>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Tények (2025 első 9 hónapja):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Az államháztartás hiánya 1,9% a GDP-hez képest (javulás)</li>
                <li style={{ marginBottom: spacing.sm }}>De a harmadik negyedévben 4,2%-os volt a hiány</li>
                <li style={{ marginBottom: spacing.sm }}>Az EU-források felszabadítása még kérdéses</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
                textAlign: 'left',
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                A költségvetési hiány azt mutatja, hogy az állam többet költ, mint amennyi bevétele van. Ha ez tartósan magas, az hosszú távon:
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
                textAlign: 'left',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Növeli az államadósságot</li>
                <li style={{ marginBottom: spacing.sm }}>Nyomást gyakorolhat a kamatokra</li>
                <li style={{ marginBottom: spacing.sm }}>Korlátozhatja a további kiadásokat</li>
              </ul>
              <p style={{ marginBottom: spacing.md }}>
                Ha az EU-források felszabadulnak, az pénz érkezik infrastruktúra-fejlesztésekre, ami helyi szinten munkahelyeket teremthet. Ha nem, akkor a kormánynak más forrást kell találnia a tervezett adócsökkentésekre és kiadásokra.
              </p>

              {/* Chart: Budget Balance Scale */}
              <div className="newsletter-chart-wrapper-mobile" style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.xl,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
                boxShadow: shadows.sm,
              }}>
                <BudgetBalanceChart />
              </div>

              <div style={{
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                padding: spacing.xl,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.lg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                }}>
                  <div style={{
                    fontSize: '20px',
                    lineHeight: 1,
                    color: colors.primary,
                  }}>
                    💡
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, display: 'block', marginBottom: spacing.xs }}>
                      Miért fontos most?
                    </strong>
                    <span style={{ color: colors.text.secondary }}>
                      Az év végi költségvetési zárás meghatározza, hogy 2026-ban milyen adók és támogatások várnak ránk.
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: spacing.md, marginTop: spacing.xl }}>
                A 1,9%-os éves hiánycél azonban csak az egyik oldala a történetnek. Az uniós szabályok szerint a strukturális hiánynak (vagyis az államháztartás egyensúlyának, ha nem számítjuk a gazdasági ciklusból adódó kiadásokat vagy bevételeket) 3% alatt kell maradnia, de a 2025-ös adatok azt mutatják, hogy a magyar államháztartás szezonálisan kiigazítva 3,5-4% közötti strukturális hiánnyal működik. Ez azt jelenti, hogy az állam túlköltekezik, és ezt nem a gazdasági lassulás indokolja, hanem strukturális problémák.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az EU-források kérdése kulcsfontosságú: 2025-ben 2,3%-kal növelte volna a GDP-t, ha a források zavartalanul érkeznek, de a fagyasztás miatt ez az összeg nem érkezett meg, és a kormánynak pótolnia kellett a hiányzó pénzt belső forrásokból, ami növelte az államadósságot. Az államadósság-ráta 2025 végére várhatóan 71-72% körül alakult, ami magasabb a 2024-es 69%-nál, és ez közvetlenül érint mindenkit: minél magasabb az adósság, annál több pénzt kell kamatra fordítani, ami kevesebb marad oktatásra, egészségügyre, infrastruktúrára.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A kormány 2026-ra 3% alatti hiánycélt tűzött ki, de ez csak akkor tartható, ha az EU-források felszabadulnak, és a gazdasági növekedés valóban eléri a tervezett 2,4%-ot. Ha ez nem történik meg, akkor vagy a tervezett adócsökkentések (szja-emelés, családi adókedvezmények) csúsznak, vagy újabb kiadáscsökkentések jönnek, amelyek közvetve minden állami szolgáltatást érinthetnek.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Az államháztartás tehát nem csak egy könyvelési tételek sorozata, hanem a jövő évi közszolgáltatások minőségének és elérhetőségének alapja.
              </p>
            </section>

            {/* Visual separator before summary */}
            <div style={{
              height: '2px',
              background: `linear-gradient(to right, transparent, ${colors.primary}40, ${colors.primary}, ${colors.primary}40, transparent)`,
              marginTop: spacing['5xl'],
              marginBottom: spacing['3xl'],
            }} />

            {/* Summary - Distinctly styled */}
            <section style={{
              marginBottom: spacing['2xl'],
              padding: spacing['2xl'],
              backgroundColor: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.background.paper} 100%)`,
              background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.background.paper} 50%, ${colors.gray[50]} 100%)`,
              borderRadius: borderRadius.xl,
              border: `2px solid ${colors.primary}20`,
              boxShadow: shadows.lg,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryHover})`,
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  marginBottom: spacing.xl,
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.fontSize['2xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: '#FFFFFF',
                    flexShrink: 0,
                    boxShadow: shadows.md,
                  }}>
                    📊
                  </div>
                  <h2 style={{
                    fontSize: typography.fontSize['3xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: colors.text.primary,
                    margin: 0,
                    flex: 1,
                    textAlign: 'left',
                  }}>
                    Összefoglaló: Mit jelent mindez 2026-ra?
                  </h2>
                </div>
                
                <p style={{
                  marginBottom: spacing.lg,
                  fontSize: typography.fontSize.lg,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.secondary,
                }}>
                  A 2025-ös decemberi adatok azt mutatják, hogy a magyar gazdaság egy fordulóponton áll. Az infláció csökkenése adott, a növekedés elindulása azonban még kérdéses. A legnagyobb kihívás a bizalom hiánya: a háztartások és a cégek is óvatosak.
                </p>
                
                <div style={{
                  padding: spacing.xl,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.gray[200]}`,
                  marginBottom: spacing.lg,
                }}>
                  <p style={{
                    marginBottom: spacing.md,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                  }}>
                    <strong>Kulcskérdések 2026-ra:</strong>
                  </p>
                  <ul style={{
                    marginBottom: 0,
                    paddingLeft: spacing['2xl'],
                    listStyleType: 'disc',
                    textAlign: 'left',
                  }}>
                    <li style={{
                      marginBottom: spacing.md,
                      fontSize: typography.fontSize.base,
                      lineHeight: typography.lineHeight.relaxed,
                      color: colors.text.secondary,
                    }}>
                      Tartós lesz-e az inflációs csökkenés?
                    </li>
                    <li style={{
                      marginBottom: spacing.md,
                      fontSize: typography.fontSize.base,
                      lineHeight: typography.lineHeight.relaxed,
                      color: colors.text.secondary,
                    }}>
                      Mernek-e a cégek újra beruházni?
                    </li>
                    <li style={{
                      marginBottom: 0,
                      fontSize: typography.fontSize.base,
                      lineHeight: typography.lineHeight.relaxed,
                      color: colors.text.secondary,
                    }}>
                      Nő-e a bizalom a gazdaságpolitika iránt?
                    </li>
                  </ul>
                </div>
                
                <p style={{
                  marginBottom: 0,
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.secondary,
                  fontStyle: 'italic',
                }}>
                  Ezekre a kérdésekre a választ a 2026-os év eleji adatok fogják megadni.
                </p>
              </div>
            </section>
          </div>
        </article>

        {/* Newsletter Subscription Box */}
        <NewsletterSubscriptionBox />
      </div>

      {/* Footer - Full width */}
      <FooterDisclaimer />
    </main>
  )
}
