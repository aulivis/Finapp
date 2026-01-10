'use client'

import React from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

interface QuarterlyUpdateSummaryProps {
  quarterName: string
  summaryPoints: string[]
}

export default function QuarterlyUpdateSummary({
  quarterName,
  summaryPoints
}: QuarterlyUpdateSummaryProps) {
  const isMobile = useIsMobile(768)
  
  if (summaryPoints.length === 0) {
    return null
  }

  return (
    <div style={{
      marginBottom: '32px',
      padding: isMobile ? 0 : '20px',
      backgroundColor: isMobile ? 'transparent' : '#FFFFFF',
      borderRadius: isMobile ? 0 : '2px',
      border: isMobile ? 'none' : '1px solid #E5E7EB'
    }}>
      <h2 style={{
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '12px',
        color: '#111827'
      }}>
        Negyedéves frissítés - {quarterName}
      </h2>
      <ul style={{
        margin: '0',
        paddingLeft: '20px',
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#4B5563'
      }}>
        {summaryPoints.map((point, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
