import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Share_Tech } from 'next/font/google'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const shareTech = Share_Tech({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-share-tech',
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'Contexta',
    template: '%s | Contexta',
  },
  description: 'Contexta - Pénzügyi tudatossági eszköz az infláció hatásainak megértéséhez. Számítsd ki a pénzed vásárlóerejének változását történelmi adatokkal.',
  authors: [{ name: 'Contexta' }],
  creator: 'Contexta',
  publisher: 'Contexta',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: '/',
    siteName: 'Contexta',
    title: 'Contexta - Pénzügyi tudatossági eszköz',
    description: 'Számítsd ki a pénzed vásárlóerejének változását történelmi inflációs adatokkal. Inflációs kalkulátor és összehasonlítások.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/contexta-social-share.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contexta - Pénzügyi tudatossági eszköz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contexta - Pénzügyi tudatossági eszköz',
    description: 'Számítsd ki a pénzed vásárlóerejének változását történelmi inflációs adatokkal. Inflációs kalkulátor és összehasonlítások.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/contexta-social-share.jpg`],
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Contexta',
  description: 'Pénzügyi tudatossági eszköz - Inflációs kalkulátor és vásárlóerő összehasonlítás',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={`${inter.variable} ${shareTech.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', position: 'relative' }}>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <BackToTop />
      </body>
    </html>
  )
}
