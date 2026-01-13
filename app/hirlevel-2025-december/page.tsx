import type { Metadata } from 'next'
import Script from 'next/script'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import ContextaWordmark from '@/components/ContextaWordmark'
import FooterDisclaimer from '@/components/FooterDisclaimer'
import NewsletterSubscriptionBox from '@/components/NewsletterSubscriptionBox'
import BackLink from '@/components/BackLink'
import NewsletterContent from '@/components/newsletter/2025-december/NewsletterContent'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.contexta.hu'
const newsletterUrl = `${appUrl}/hirlevel-2025-december`
const publishedDate = '2025-12-01'
const modifiedDate = '2025-12-01'

export const metadata: Metadata = {
  title: 'Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló | Contexta',
  description: 'Decemberi gazdasági összefoglaló: infláció, GDP növekedés, fogyasztói bizalom, munkaerőpiac és államháztartás - 2025. december',
  keywords: ['gazdasági hírlevél', 'infláció', 'GDP', 'fogyasztói bizalom', 'munkaerőpiac', 'államháztartás', 'magyar gazdaság', '2025 december'],
  authors: [{ name: 'Kovács Róbert', url: newsletterUrl }],
  creator: 'Contexta',
  publisher: 'Contexta',
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: '/hirlevel-2025-december',
  },
  openGraph: {
    type: 'article',
    locale: 'hu_HU',
    url: newsletterUrl,
    siteName: 'Contexta',
    title: 'Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló',
    description: 'Decemberi gazdasági összefoglaló: infláció, GDP növekedés, fogyasztói bizalom, munkaerőpiac és államháztartás - 2025. december',
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
    authors: ['Kovács Róbert'],
    images: [
      {
        url: `${appUrl}/contexta-social-share.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contexta - Decemberi gazdasági összefoglaló',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló',
    description: 'Decemberi gazdasági összefoglaló: infláció, GDP növekedés, fogyasztói bizalom, munkaerőpiac és államháztartás',
    images: [`${appUrl}/contexta-social-share.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Az év öt legfontosabb gazdasági kérdése – Decemberi összefoglaló',
  description: 'Decemberi gazdasági összefoglaló: infláció, GDP növekedés, fogyasztói bizalom, munkaerőpiac és államháztartás - 2025. december',
  image: `${appUrl}/contexta-social-share.jpg`,
  datePublished: publishedDate,
  dateModified: modifiedDate,
  author: {
    '@type': 'Person',
    name: 'Kovács Róbert',
    jobTitle: 'Alapító',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Contexta',
    logo: {
      '@type': 'ImageObject',
      url: `${appUrl}/favicon.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': newsletterUrl,
  },
}

export default function NewsletterPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

            {/* Newsletter Content with Audio Player and Font Size Controls */}
            <NewsletterContent />
          </article>

          {/* Newsletter Subscription Box */}
          <NewsletterSubscriptionBox />
        </div>

        {/* Footer - Full width */}
        <FooterDisclaimer />
      </main>
    </>
  )
}
