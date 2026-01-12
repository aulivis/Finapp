'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function DynamicMetaTags() {
  const searchParams = useSearchParams()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'

  useEffect(() => {
    const amount = searchParams.get('amount')
    const startYear = searchParams.get('startYear')
    const endYear = searchParams.get('endYear')

    // Only update meta tags if we have all required params
    if (amount && startYear && endYear) {
      const ogImageUrl = `${appUrl}/og?amount=${amount}&startYear=${startYear}&endYear=${endYear}`
      
      // Update or create og:image meta tag
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.setAttribute('content', ogImageUrl)

      // Update og:image:width
      let ogImageWidth = document.querySelector('meta[property="og:image:width"]')
      if (!ogImageWidth) {
        ogImageWidth = document.createElement('meta')
        ogImageWidth.setAttribute('property', 'og:image:width')
        document.head.appendChild(ogImageWidth)
      }
      ogImageWidth.setAttribute('content', '1200')

      // Update og:image:height
      let ogImageHeight = document.querySelector('meta[property="og:image:height"]')
      if (!ogImageHeight) {
        ogImageHeight = document.createElement('meta')
        ogImageHeight.setAttribute('property', 'og:image:height')
        document.head.appendChild(ogImageHeight)
      }
      ogImageHeight.setAttribute('content', '630')

      // Update og:url to include params
      let ogUrl = document.querySelector('meta[property="og:url"]')
      if (!ogUrl) {
        ogUrl = document.createElement('meta')
        ogUrl.setAttribute('property', 'og:url')
        document.head.appendChild(ogUrl)
      }
      ogUrl.setAttribute('content', `${appUrl}/?amount=${amount}&startYear=${startYear}&endYear=${endYear}`)

      // Update Twitter card image
      let twitterImage = document.querySelector('meta[name="twitter:image"]')
      if (!twitterImage) {
        twitterImage = document.createElement('meta')
        twitterImage.setAttribute('name', 'twitter:image')
        document.head.appendChild(twitterImage)
      }
      twitterImage.setAttribute('content', ogImageUrl)
    }
  }, [searchParams, appUrl])

  return null // This component doesn't render anything
}
