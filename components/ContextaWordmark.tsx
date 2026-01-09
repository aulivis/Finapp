import React from 'react'

interface ContextaWordmarkProps {
  showSubtitle?: boolean
  className?: string
}

export default function ContextaWordmark({ 
  showSubtitle = true,
  className = '' 
}: ContextaWordmarkProps) {
  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px'
    }}>
      <div style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontSize: '28px',
        fontWeight: '600', // SemiBold
        letterSpacing: '0.05em', // tracking-wide
        color: '#111827',
        lineHeight: '1.2'
      }}>
        CONTEXTA
      </div>
      {showSubtitle && (
        <div style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '13px',
          fontWeight: '400',
          color: '#6B7280',
          lineHeight: '1.4',
          letterSpacing: '0.01em'
        }}>
          Pénzügyi kontextus, érthetően
        </div>
      )}
    </div>
  )
}
