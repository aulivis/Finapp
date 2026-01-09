'use client'

import React from 'react';

interface M2ContextualIndicatorClientProps {
  year: number
  m2Growth: number | null
  periodStartYear?: number
  periodEndYear?: number
  isCumulative?: boolean
}

export default function M2ContextualIndicatorClient({ 
  year, 
  m2Growth,
  periodStartYear,
  periodEndYear,
  isCumulative = false
}: M2ContextualIndicatorClientProps) {
  if (m2Growth === null) {
    return null;
  }

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const periodText = (periodStartYear && periodEndYear && periodStartYear !== periodEndYear)
    ? `${periodStartYear}-${periodEndYear}`
    : `${year}`;

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F0FDFA',
      borderRadius: '12px',
      border: '1px solid rgba(45, 212, 191, 0.2)',
      marginTop: '24px',
      fontSize: '13px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px',
        color: '#111827'
      }}>
        Mi történik közben a pénzzel?
      </h3>
      
      <div style={{
        marginBottom: '16px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid rgba(45, 212, 191, 0.1)'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '6px',
          lineHeight: '1.2'
        }} className="tabular-nums">
          {formatPercentage(m2Growth)}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          fontWeight: '400'
        }}>
          {isCumulative 
            ? `Kumulatív M2 pénzkínálat változás (${periodText})`
            : `Globális pénzkínálat (M2) változás (${periodText})`
          }
        </div>
      </div>

      <div style={{
        fontSize: '13px',
        lineHeight: '1.7',
        color: '#4B5563'
      }}>
        <p style={{ margin: '0 0 12px 0' }}>
          Az M2 pénzkínálat változása egy kontextuális mutató, amely a gazdaságban lévő pénzmennyiség változását mutatja.
          {isCumulative && ' A kumulatív érték az egész időszak alatt bekövetkezett összes változást mutatja.'}
        </p>
        <p style={{ margin: '0' }}>
          Ez az információ kizárólag tájékoztató jellegű, és nem befolyásolja a számításokat. Nem mutat közvetlen ok-okozati összefüggést az inflációval.
        </p>
      </div>
    </div>
  );
}
