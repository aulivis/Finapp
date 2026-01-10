import React from 'react'
import type { Metadata } from 'next'
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
  description: 'Pénzügyi tudatossági eszköz',
  keywords: ['pénzügy', 'számítás', 'infláció', 'nyugdíj', 'magyarország'],
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
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: '/',
    siteName: 'Contexta',
    title: 'Contexta - Pénzügyi tudatossági eszköz',
    description: 'Pénzügyi tudatossági eszköz',
  },
  twitter: {
    card: 'summary',
    title: 'Contexta - Pénzügyi tudatossági eszköz',
    description: 'Pénzügyi tudatossági eszköz',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={`${inter.variable} ${shareTech.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', position: 'relative' }}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <BackToTop />
      </body>
    </html>
  )
}
