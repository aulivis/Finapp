import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DisclaimerBanner from '@/components/DisclaimerBanner'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Finapp',
  description: 'Pénzügyi tudatossági eszköz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        <DisclaimerBanner />
        {children}
      </body>
    </html>
  )
}
