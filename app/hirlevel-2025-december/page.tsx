import type { Metadata } from 'next'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import ContextaWordmark from '@/components/ContextaWordmark'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import NewsletterSubscriptionBox from '@/components/NewsletterSubscriptionBox'
import BackLink from '@/components/BackLink'
import InflationInterestChart from '@/components/newsletter/2025-december/InflationInterestChart'
import GDPGrowthChart from '@/components/newsletter/2025-december/GDPGrowthChart'
import ConsumerConfidenceChart from '@/components/newsletter/2025-december/ConsumerConfidenceChart'
import LaborMarketChart from '@/components/newsletter/2025-december/LaborMarketChart'
import BudgetBalanceChart from '@/components/newsletter/2025-december/BudgetBalanceChart'

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
        <article style={{
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
          }}>
            <h1 style={{
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              marginBottom: spacing.md,
              lineHeight: typography.lineHeight.tight,
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

          {/* Newsletter Content Area */}
          <div style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
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

            {/* 1. Infláció */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                1. Az infláció: Végre csökken, de mit jelent ez a gyakorlatban?
              </h2>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Tények (2025. november):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
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
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                A bevásárláskor már nem érzed, hogy minden hónapban 5-10%-kal többet kell fizetned ugyanazért a kosárért. Ha egy átlagos család havi 100 000 forintot költ élelmiszerre, a csökkenő infláció azt jelenti, hogy a költségeik növekedése lelassult – de az árak továbbra sem estek vissza, csak lassabban nőnek.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A hiteleknél a helyzet bonyolultabb: a kamatok még mindig 6,5%-on állnak (az MNB alapkamata). Ez azt jelenti, hogy ha új hitelt vennél fel, a költségek magasabbak, mint 2021-ben voltak, de stabilak – nem emelkednek tovább.
              </p>

              {/* Chart: Inflation & Interest Rates */}
              <div style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.lg,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
              }}>
                <InflationInterestChart height={600} />
              </div>

              <p style={{
                marginBottom: spacing.md,
                padding: spacing.lg,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.md,
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <strong>Miért fontos most?</strong> Az év végi inflációs adat meghatározza, hogy a jövő év elején milyen mértékben emelkedhetnek a bérek és nyugdíjak "értéke".
              </p>
            </section>

            {/* 2. Gazdaság növekedés */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                2. A gazdaság nő – de miért nem érezzük?
              </h2>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Tények (2025 harmadik negyedév):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
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
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                Ha a GDP "nő", de te ezt nem érzed, annak oka az, hogy a növekedés egyenlőtlenül oszlik meg. A számok azt mutatják, hogy a háztartások fogyasztása tartja fenn a növekedést, de a cégek nem fejlesztenek, az export pedig gyengül.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                Ez azt jelenti, hogy:
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
              }}>
                <li style={{ marginBottom: spacing.sm }}>A munkahelyed valószínűleg megmaradt (munkanélküliség 4,5%)</li>
                <li style={{ marginBottom: spacing.sm }}>De ha váltanál, vagy béremelést szeretnél, nehezebb helyzetben vagy</li>
                <li style={{ marginBottom: spacing.sm }}>A cégek nem építenek új gyárakat, így kevesebb új munkahely jön létre</li>
              </ul>

              {/* Chart: GDP Growth Decomposition */}
              <div style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.lg,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
              }}>
                <GDPGrowthChart height={500} />
              </div>

              <p style={{
                marginBottom: spacing.md,
                padding: spacing.lg,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.md,
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <strong>Miért fontos most?</strong> Az év végi adatok alapján dől el, hogy 2026-ban mernek-e a cégek újra beruházni, ami közvetlenül a te jövőbeli munkalehetőségeidet is befolyásolja.
              </p>
            </section>

            {/* 3. Fogyasztói bizalom */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                3. Fogyasztói bizalom: Miért nem költünk, ha van munkánk?
              </h2>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Tények (2025. november):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
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
              }}>
                <li style={{ marginBottom: spacing.sm }}>Az emberek költenek, de óvatosabban</li>
                <li style={{ marginBottom: spacing.sm }}>Inkább megtakarítanak, ha tehetik</li>
                <li style={{ marginBottom: spacing.sm }}>Kevesebb nagyberuházás (pl. lakásvásárlás, autóvétel)</li>
              </ul>

              {/* Chart: Consumer Confidence Global Ranking */}
              <div style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.lg,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
              }}>
                <ConsumerConfidenceChart height={700} />
              </div>

              <p style={{
                marginBottom: spacing.md,
                padding: spacing.lg,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.md,
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <strong>Miért fontos most?</strong> Az év végi bizalmi adatok befolyásolják a karácsonyi vásárlást és a 2026-os év kezdetét. Ha a bizalom továbbra is gyenge, a cégek nem fognak bővülni, mert nem bíznak a keresletben.
              </p>
            </section>

            {/* 4. Munkaerőpiac */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                4. Munkaerőpiac: Biztonság vagy bizonytalanság?
              </h2>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Tények (2025. ősz):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Munkanélküliség: 4,5% (történelmileg alacsony)</li>
                <li style={{ marginBottom: spacing.sm }}>Ugyanakkor a "munkaerőpiaci feszesség" enyhül</li>
                <li style={{ marginBottom: spacing.sm }}>január: 11%-os minimálbér-emelés jön</li>
              </ul>

              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Hétköznapi hatások:
              </h3>
              <p style={{ marginBottom: spacing.md }}>
                Alacsony munkanélküliség = ha van munkád, valószínűleg meg is tartod. De a "feszesség enyhülése" azt jelenti, hogy a cégek nem küzdenek annyira a munkavállalókért, mint 2022-ben.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                A minimálbér-emelés közvetlenül érint, ha ezen a szinten keresel:
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Bruttóban több lesz a fizetésed</li>
                <li style={{ marginBottom: spacing.sm }}>De a nettó béremelést részben elviheti a magas infláció</li>
                <li style={{ marginBottom: spacing.sm }}>A cégek költségei nőnek, ami visszafoghatja a további felvételeket</li>
              </ul>

              {/* Chart: Labor Market Paradox */}
              <div style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.lg,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
              }}>
                <LaborMarketChart height={650} />
              </div>

              <p style={{
                marginBottom: spacing.md,
                padding: spacing.lg,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.md,
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <strong>Miért fontos most?</strong> Az év végi adatok (munkanélküliség, betöltetlen álláshelyek) meghatározzák, hogy 2026-ban milyen erőtér alakul ki a bértárgyalásoknál.
              </p>
            </section>

            {/* 5. Államháztartás */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                5. Az állam költségvetése: Miért fontos ez neked?
              </h2>
              
              <h3 style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginTop: spacing.xl,
                marginBottom: spacing.md,
              }}>
                Tények (2025 első 9 hónapja):
              </h3>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
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
              }}>
                <li style={{ marginBottom: spacing.sm }}>Növeli az államadósságot</li>
                <li style={{ marginBottom: spacing.sm }}>Nyomást gyakorolhat a kamatokra</li>
                <li style={{ marginBottom: spacing.sm }}>Korlátozhatja a további kiadásokat</li>
              </ul>
              <p style={{ marginBottom: spacing.md }}>
                Ha az EU-források felszabadulnak, az pénz érkezik infrastruktúra-fejlesztésekre, ami helyi szinten munkahelyeket teremthet. Ha nem, akkor a kormánynak más forrást kell találnia a tervezett adócsökkentésekre és kiadásokra.
              </p>

              {/* Chart: Budget Balance Scale */}
              <div style={{
                marginTop: spacing['2xl'],
                marginBottom: spacing['2xl'],
                padding: spacing.lg,
                backgroundColor: colors.background.paper,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.gray[200]}`,
              }}>
                <BudgetBalanceChart height={600} />
              </div>

              <p style={{
                marginBottom: spacing.md,
                padding: spacing.lg,
                backgroundColor: colors.primaryLight,
                borderRadius: borderRadius.md,
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <strong>Miért fontos most?</strong> Az év végi költségvetési zárás meghatározza, hogy 2026-ban milyen adók és támogatások várnak ránk.
              </p>
            </section>

            {/* Summary */}
            <section style={{ marginBottom: spacing['2xl'] }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.lg,
                marginTop: spacing['2xl'],
              }}>
                Összefoglaló: Mit jelent mindez 2026-ra?
              </h2>
              <p style={{ marginBottom: spacing.md }}>
                A 2025-ös decemberi adatok azt mutatják, hogy a magyar gazdaság egy fordulóponton áll. Az infláció csökkenése adott, a növekedés elindulása azonban még kérdéses. A legnagyobb kihívás a bizalom hiánya: a háztartások és a cégek is óvatosak.
              </p>
              <p style={{ marginBottom: spacing.md }}>
                <strong>Kulcskérdések 2026-ra:</strong>
              </p>
              <ul style={{
                marginBottom: spacing.lg,
                paddingLeft: spacing['2xl'],
                listStyleType: 'disc',
              }}>
                <li style={{ marginBottom: spacing.sm }}>Tartós lesz-e az inflációs csökkenés?</li>
                <li style={{ marginBottom: spacing.sm }}>Mernek-e a cégek újra beruházni?</li>
                <li style={{ marginBottom: spacing.sm }}>Nő-e a bizalom a gazdaságpolitika iránt?</li>
              </ul>
              <p style={{ marginBottom: spacing.md }}>
                Ezekre a kérdésekre a választ a 2026-os év eleji adatok fogják megadni.
              </p>
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
