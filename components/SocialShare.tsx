'use client'

import React, { useState, useEffect } from 'react'
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { colors, spacing, borderRadius, transitions, shadows } from '@/lib/design-system'
import Button from '@/components/ui/Button'

interface SocialShareProps {
  amount: number
  startYear: number
  endYear: number
  lossPercentage: number
  loss: number
  formatCurrency: (value: number) => string
  formatPercentage: (value: number) => string
}

export default function SocialShare({
  amount,
  startYear,
  endYear,
  lossPercentage,
  loss,
  formatCurrency,
  formatPercentage
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://contexta.hu'

  const shareText = `A ${formatCurrency(amount)} vásárlóereje ${formatPercentage(lossPercentage)}-kal csökkent ${startYear} és ${endYear} között. Nézd meg a saját adataidat is!`
  const shareUrl = `${appUrl}/?amount=${amount}&startYear=${startYear}&endYear=${endYear}`
  const fullShareText = `${shareText} ${shareUrl}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vásárlóerő veszteség - Contexta',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    }
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const [isMobile, setIsMobile] = useState(false)
  const [hasNativeShare, setHasNativeShare] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      setHasNativeShare(typeof navigator !== 'undefined' && 'share' in navigator)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      marginTop: spacing.xl,
      paddingTop: spacing.xl,
      borderTop: `1px solid ${colors.gray[200]}`
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
        textAlign: 'center'
      }}>
        Oszd meg az eredményt
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.md,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Native Share (mobile) */}
        {isMobile && hasNativeShare && (
          <button
            onClick={handleNativeShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              padding: `${spacing.md} ${spacing.lg}`,
              backgroundColor: colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: borderRadius.md,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: transitions.fast,
              minHeight: '44px',
              boxShadow: shadows.sm
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary
            }}
            aria-label="Oszd meg"
          >
            <Share2 size={18} />
            <span>Oszd meg</span>
          </button>
        )}

        {/* Facebook */}
        <button
          onClick={shareToFacebook}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            backgroundColor: '#1877F2',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: borderRadius.md,
            cursor: 'pointer',
            transition: transitions.fast,
            boxShadow: shadows.sm
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#166FE5'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = shadows.md
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1877F2'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = shadows.sm
          }}
          aria-label="Oszd meg Facebookon"
        >
          <Facebook size={20} />
        </button>

        {/* Twitter/X */}
        <button
          onClick={shareToTwitter}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: borderRadius.md,
            cursor: 'pointer',
            transition: transitions.fast,
            boxShadow: shadows.sm
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333333'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = shadows.md
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000000'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = shadows.sm
          }}
          aria-label="Oszd meg Twitteren"
        >
          <Twitter size={20} />
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareToLinkedIn}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            backgroundColor: '#0077B5',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: borderRadius.md,
            cursor: 'pointer',
            transition: transitions.fast,
            boxShadow: shadows.sm
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#006399'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = shadows.md
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0077B5'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = shadows.sm
          }}
          aria-label="Oszd meg LinkedInen"
        >
          <Linkedin size={20} />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            backgroundColor: copied ? colors.success : colors.gray[100],
            color: copied ? '#FFFFFF' : colors.text.primary,
            border: `1px solid ${copied ? colors.success : colors.gray[200]}`,
            borderRadius: borderRadius.md,
            cursor: 'pointer',
            transition: transitions.fast,
            boxShadow: shadows.sm
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = colors.gray[200]
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = shadows.md
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = colors.gray[100]
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = shadows.sm
            }
          }}
          aria-label={copied ? "Link másolva" : "Link másolása"}
        >
          {copied ? <Check size={20} /> : <LinkIcon size={20} />}
        </button>
      </div>
    </div>
  )
}
