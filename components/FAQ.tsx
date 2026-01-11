'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { colors, spacing, typography, borderRadius, transitions } from '@/lib/design-system'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answers: string[]
}

const faqData: FAQItem[] = [
  {
    question: 'Mi az infláció, és miért fontos a megtakarításaim szempontjából?',
    answers: [
      'Az infláció azt mutatja meg, hogy átlagosan mennyivel emelkednek az árak egy adott időszak alatt. Ha infláció van, ugyanazért a pénzért kevesebb terméket és szolgáltatást tudsz megvásárolni, vagyis a pénz vásárlóereje csökken.',
      'Ha a megtakarításaid nem hoznak legalább akkora hozamot, mint az infláció mértéke, akkor reálértéken veszítenek az értékükből, még akkor is, ha a számlán szereplő összeg nem változik.',
    ],
  },
  {
    question: 'Mi a különbség a nominális és a reálérték között?',
    answers: [
      'A nominális érték a pénz összege számokban, például 1 000 000 forint. A reálérték azt mutatja meg, hogy ez az összeg valójában mennyit ér vásárlóerőben.',
      'Előfordulhat, hogy évek múlva is ugyanannyi pénz van a számládon, de közben kevesebb dolgot tudsz belőle megvásárolni.',
    ],
  },
  {
    question: 'Mi az a pénzkínálat (M2), és miért számít?',
    answers: [
      'A pénzkínálat azt mutatja meg, hogy összesen mennyi pénz van a gazdaságban. Az M2 pénzkínálat tartalmazza a készpénzt, a bankszámlapénzt és a rövid lejáratú betéteket.',
      'Ha a pénzkínálat gyorsan nő, miközben a gazdaságban elérhető termékek és szolgáltatások mennyisége nem növekszik ugyanilyen gyorsan, akkor egy pénzegység átlagosan kevesebbet ér.',
    ],
  },
  {
    question: 'Miért nem elég csak az inflációt figyelni?',
    answers: [
      'Az infláció azt mutatja meg, hogyan változnak az árak. A pénzkínálat növekedése azt mutatja meg, mennyi pénz versenyez ugyanazokért az árukért és szolgáltatásokért.',
      'A pénz vásárlóerejének hosszú távú változását ezért nem lehet egyetlen mutatóval megérteni.',
    ],
  },
  {
    question: 'Mit jelent az, hogy a pénz veszít az értékéből?',
    answers: [
      'Ez nem azt jelenti, hogy a pénz eltűnik, hanem azt, hogy ugyanaz az összeg idővel kevesebb dolgot tud megvásárolni.',
      'Ez a folyamat általában lassú és fokozatos, ezért sokszor észrevétlen marad.',
    ],
  },
  {
    question: 'Mi történik, ha nem csinálok semmit a megtakarításaimmal?',
    answers: [
      'Ha a pénzed készpénzben vagy alacsony kamatozású számlán van, és nem követi legalább az infláció mértékét, akkor a vásárlóereje fokozatosan csökken.',
      'A kalkulátor ezt a hatást szemlélteti konkrét számokon keresztül.',
    ],
  },
  {
    question: 'Miért hasonlítjuk össze a pénzt lakásárral, arannyal vagy részvényindexszel?',
    answers: [
      'Ezek az összehasonlítások segítenek kontextust adni a számoknak. Egy pénzösszeg önmagában nehezen értelmezhető, de könnyebb megérteni, ha látod, hogyan változott egy lakás, az arany vagy egy tőzsdeindex értéke ugyanebben az időszakban.',
    ],
  },
  {
    question: 'A kalkulátor előrejelzést ad?',
    answers: [
      'Nem. A kalkulátor múltbeli, hivatalos adatokon alapul, és egy általános gazdasági mechanizmust mutat be.',
      'Nem pénzügyi tanácsadás, és nem jóslat a jövőre nézve.',
    ],
  },
  {
    question: 'Mennyire megbízhatóak az adatok?',
    answers: [
      'Az inflációs adatok hivatalos statisztikákon alapulnak, az összehasonlítások pedig nyilvánosan elérhető, aggregált adatokon.',
      'A múltbeli adatok nem garantálják a jövőbeli eredményeket, de segítenek megérteni a hosszú távú trendeket.',
    ],
  },
  {
    question: 'Kinek szól ez az oldal?',
    answers: [
      'Az oldal azoknak szól, akik szeretnék megérteni, mi történik a pénzükkel, és tudatosabban szeretnének gondolkodni a megtakarításaikról.',
    ],
  },
]

// FAQ Schema for SEO (JSON-LD structured data)
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Mi az infláció, és miért fontos a megtakarításaim szempontjából?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Az infláció azt mutatja meg, hogy átlagosan mennyivel emelkednek az árak egy adott időszak alatt. Infláció esetén a pénz vásárlóereje csökken, vagyis ugyanazért az összegért kevesebb terméket és szolgáltatást lehet megvásárolni. Ha a megtakarítások nem hoznak legalább akkora hozamot, mint az infláció mértéke, akkor reálértéken veszítenek az értékükből.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mi a különbség a nominális és a reálérték között?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A nominális érték a pénz összege számokban kifejezve. A reálérték azt mutatja meg, hogy ez az összeg mennyi terméket és szolgáltatást ér ténylegesen. Infláció mellett a nominális érték változatlan maradhat, miközben a reálérték csökken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mi az a pénzkínálat (M2), és miért számít?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A pénzkínálat azt mutatja meg, hogy mennyi pénz van összesen a gazdaságban. Az M2 pénzkínálat magában foglalja a készpénzt, a bankszámlapénzt és a rövid lejáratú betéteket. Ha a pénzkínálat gyorsabban nő, mint a gazdaság teljesítménye, akkor egy pénzegység átlagosan kevesebbet ér.',
        },
      },
      {
        '@type': 'Question',
        name: 'Miért nem elég csak az inflációt figyelni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Az infláció az árak változását mutatja meg, míg a pénzkínálat növekedése azt, hogy mennyi pénz versenyez ugyanazokért a termékekért és szolgáltatásokért. A pénz értékének hosszú távú megértéséhez több gazdasági mutató együttes vizsgálata szükséges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mit jelent az, hogy a pénz veszít az értékéből?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A pénz értékvesztése azt jelenti, hogy idővel ugyanaz az összeg kevesebb dolgot tud megvásárolni. Ez a folyamat általában fokozatos, ezért sokszor csak hosszabb távon válik igazán láthatóvá.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mi történik, ha nem csinálok semmit a megtakarításaimmal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ha a pénz alacsony kamatozású számlán vagy készpénzben marad, és nem követi az inflációt, akkor a vásárlóereje idővel csökken. Ez azt jelenti, hogy a megtakarítás reálértéken veszít az értékéből.',
        },
      },
      {
        '@type': 'Question',
        name: 'Miért hasonlítjuk össze a pénzt lakásárral, arannyal vagy részvényindexszel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Az ilyen összehasonlítások segítenek kontextusba helyezni a pénz értékét. Könnyebb megérteni a változásokat, ha azt látjuk, hogy ugyanabban az időszakban hogyan alakult más eszközök értéke.',
        },
      },
      {
        '@type': 'Question',
        name: 'A kalkulátor előrejelzést ad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nem. A kalkulátor múltbeli adatokon alapul, és a gazdasági összefüggések szemléltetésére szolgál. Nem minősül pénzügyi tanácsadásnak, és nem ad jövőbeni előrejelzést.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mennyire megbízhatóak az adatok?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Az inflációs és egyéb gazdasági adatok hivatalos, nyilvánosan elérhető statisztikákon alapulnak. Ezek segítenek a trendek megértésében, de nem garantálják a jövőbeni eredményeket.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kinek szól ez az oldal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Az oldal azoknak szól, akik szeretnék jobban megérteni a pénzük értékének változását, és tudatosabban szeretnének gondolkodni a megtakarításaikról.',
        },
      },
    ],
  }

export default function FAQ() {
  const isMobile = useIsMobile(768)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Add fade-in animation on mount
  useEffect(() => {
    if (sectionRef.current && !prefersReducedMotion) {
      sectionRef.current.style.opacity = '0'
      sectionRef.current.style.transform = 'translateY(20px)'
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = `opacity ${transitions.slow}, transform ${transitions.slow}`
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  // Inject JSON-LD schema into document head for SEO
  useEffect(() => {
    const scriptId = 'faq-schema-ld-json'
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.remove()
    }

    // Create and add new script
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.text = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, []) // Empty dependency array - schema is static

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      id="faq-title"
      style={{
        backgroundColor: 'transparent',
        padding: isMobile ? `${spacing['3xl']} 0` : `${spacing['5xl']} 0`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? `0 ${spacing.md}` : `0 ${spacing.xl}`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? spacing['3xl'] : spacing['4xl'],
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? typography.fontSize['3xl'] : typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.lg,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em'
          }}>
            Gyakran ismételt kérdések az inflációról és a pénz értékéről
          </h2>
        </div>

        {/* FAQ Items */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {faqData.map((item, index) => {
            const isExpanded = expandedIndex === index

            return (
              <article
                key={index}
                style={{
                  marginBottom: isMobile ? spacing.sm : spacing.md,
                  backgroundColor: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.gray[200]}`,
                  overflow: 'hidden',
                  transition: 'none',
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  style={{
                    width: '100%',
                    padding: isMobile ? spacing.xl : spacing['2xl'],
                    textAlign: 'left',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: spacing.lg,
                    transition: 'none',
                  }}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <h3 style={{
                    fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                    lineHeight: typography.lineHeight.normal,
                    margin: 0,
                    flex: 1,
                    paddingRight: spacing.md,
                    transition: 'none',
                  }}>
                    {item.question}
                  </h3>
                  <div style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? '44px' : '32px',
                    height: isMobile ? '44px' : '32px',
                    minWidth: isMobile ? '44px' : '32px',
                    minHeight: isMobile ? '44px' : '32px',
                    borderRadius: borderRadius.md,
                    backgroundColor: isExpanded ? colors.primaryLight : colors.gray[100],
                    color: isExpanded ? colors.primary : colors.text.muted,
                    transition: prefersReducedMotion ? 'none' : `background-color ${transitions.normal} ease, color ${transitions.normal} ease`,
                  }}>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: prefersReducedMotion ? 'none' : `transform ${transitions.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
                      }}
                    />
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  style={{
                    maxHeight: isExpanded ? '2000px' : '0',
                    overflow: 'hidden',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `max-height ${transitions.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
                  }}
                >
                  <div style={{
                    paddingLeft: isMobile ? spacing.xl : spacing['2xl'],
                    paddingRight: isMobile ? spacing.xl : spacing['2xl'],
                    paddingTop: spacing.lg,
                    paddingBottom: spacing.md,
                  }}>
                    {item.answers.map((answer, answerIndex) => (
                      <p
                        key={answerIndex}
                        style={{
                          fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
                          color: colors.text.secondary,
                          lineHeight: typography.lineHeight.relaxed,
                          margin: answerIndex === item.answers.length - 1 ? '0' : `0 0 ${spacing.md} 0`,
                          textAlign: 'justify',
                        }}
                      >
                        {answer}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}