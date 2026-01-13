'use client'

import React, { useState, useRef, useEffect } from 'react'
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/design-system'
import { Play, Pause, Volume2 } from 'lucide-react'

export default function NewsletterAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioSrc = '/newsletter-2025-december.mp3'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
    }
  }

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  // If no audio source, show placeholder
  if (!audioSrc) {
    return (
      <div style={{
        marginBottom: spacing['2xl'],
        padding: spacing.xl,
        backgroundColor: colors.gray[50],
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.gray[200]}`,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.md,
          marginBottom: spacing.sm,
        }}>
          <Volume2 size={20} color={colors.text.muted} />
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.muted,
            margin: 0,
            fontStyle: 'italic',
          }}>
            Hangos verzió hamarosan elérhető
          </p>
        </div>
        <p style={{
          fontSize: typography.fontSize.xs,
          color: colors.text.muted,
          margin: 0,
        }}>
          A hírlevél hangos változata jelenleg készül. Hamarosan itt lesz elérhető, hogy olvasás közben hallgathasd is.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      marginBottom: spacing['2xl'],
      padding: spacing.xl,
      backgroundColor: colors.background.paper,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.gray[200]}`,
      boxShadow: shadows.sm,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.sm,
      }}>
        <Volume2 size={20} color={colors.primary} />
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
        }}>
          Hangos verzió
        </h3>
      </div>
      <p style={{
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.md,
        textAlign: 'justify',
      }}>
        Hallgasd meg a hírlevelet olvasás közben. A hangos verzió lehetővé teszi, hogy más tevékenységeket is végezhess közben.
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.gray[50],
        borderRadius: borderRadius.md,
      }}>
        <button
          onClick={togglePlay}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: borderRadius.full,
            backgroundColor: colors.primary,
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryHover
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary
            e.currentTarget.style.transform = 'scale(1)'
          }}
          aria-label={isPlaying ? 'Szünet' : 'Lejátszás'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: borderRadius.full,
              background: `linear-gradient(to right, ${colors.primary} ${(currentTime / duration) * 100}%, ${colors.gray[300]} ${(currentTime / duration) * 100}%)`,
              outline: 'none',
              cursor: 'pointer',
            }}
            aria-label="Hang lejátszási pozíció"
          />
        </div>

        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.muted,
          fontVariantNumeric: 'tabular-nums',
          minWidth: '80px',
          textAlign: 'right',
        }} className="tabular-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />
    </div>
  )
}
