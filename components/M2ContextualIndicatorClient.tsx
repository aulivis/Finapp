'use client'

import React from 'react';

interface M2ContextualIndicatorClientProps {
  year: number
  m2Growth: number | null
  periodStartYear?: number
  periodEndYear?: number
}

export default function M2ContextualIndicatorClient({ 
  year, 
  m2Growth,
  periodStartYear,
  periodEndYear
}: M2ContextualIndicatorClientProps) {
  if (m2Growth === null) {
    return null;
  }

  const m2GrowthValue = m2Growth;

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const periodText = (periodStartYear && periodEndYear && periodStartYear !== periodEndYear)
    ? `${periodStartYear}-${periodEndYear}`
    : `${year}`;

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#FFFFFF',
      borderRadius: '2px',
      border: '1px solid #E5E7EB',
      marginTop: '24px',
      fontSize: '13px'
    }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '400',
        marginBottom: '12px',
        color: '#4B5563'
      }}>
        Mi történik közben a pénzzel?
      </h3>
      
      <div style={{
        marginBottom: '12px'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '400',
          color: '#111827',
          marginBottom: '4px'
        }}>
          {formatPercentage(m2GrowthValue)}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#4B5563'
        }}>
          Globális pénzkínálat (M2) változás ({periodText})
        </div>
      </div>

      <div style={{
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#4B5563'
      }}>
        <p style={{ margin: '0 0 8px 0 }}>
          Az M2 pénzkínálat változása egy kontextuális mutató, amely a gazdaságban lévő pénzmennyiség változását mutatja.
        </p>
        <p style={{ margin: '0' }}>
          Ez az információ kizárólag tájékoztató jellegű, és nem befolyásolja a számításokat. Nem mutat közvetlen ok-okozati összefüggést az inflációval.
        </p>
      </div>
    </div>
  );
}
