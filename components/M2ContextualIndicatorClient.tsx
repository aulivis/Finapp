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
        marginBottom: '8px',
        color: '#111827'
      }}>
        Mi történik közben a pénzzel?
      </h3>
      <div style={{
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '16px',
        color: '#6B7280'
      }}>
        A pénz mennyisége a gazdaságban
      </div>
      
      <div style={{
        marginBottom: '16px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid rgba(45, 212, 191, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '6px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            lineHeight: '1.2'
          }} className="tabular-nums">
            {formatPercentage(m2Growth)}
          </div>
          {isCumulative && (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                flexShrink: 0,
                color: 'currentColor',
                opacity: 0.9
              }}
              className="m2-icon"
            >
              <style>{`
                @media (prefers-reduced-motion: no-preference) {
                  .m2-icon {
                    animation: m2-icon-pulse 3.5s ease-in-out infinite;
                  }
                }
                @keyframes m2-icon-pulse {
                  0%, 100% {
                    transform: scale(1);
                    opacity: 0.9;
                  }
                  50% {
                    transform: scale(1.04);
                    opacity: 1;
                  }
                }
              `}</style>
              {/* Outer boundary circle (economy) */}
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
              {/* Inner money units - arranged in layers suggesting accumulation */}
              <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.7" />
              <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="20" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="28" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
              <circle cx="25" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
              <circle cx="15" cy="25" r="1.5" fill="currentColor" opacity="0.5" />
              <circle cx="25" cy="25" r="1.5" fill="currentColor" opacity="0.5" />
              <circle cx="14" cy="11" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="26" cy="11" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="14" cy="29" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="26" cy="29" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="11" cy="14" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="29" cy="14" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="11" cy="26" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="29" cy="26" r="1" fill="currentColor" opacity="0.4" />
            </svg>
          )}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          fontWeight: '400'
        }}>
          {isCumulative 
            ? `Kumulatív viágszíntű pénzkínálat-növekedés (${periodText})`
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
          Az infláció azt mutatja meg, hogy <strong>az árak mennyivel lettek magasabbak</strong>.
          A pénzkínálat pedig azt, hogy <strong>összesen mennyi pénz van forgalomban</strong>.
        </p>
        <p style={{ margin: '0 0 12px 0' }}>
          Ha egyre több pénz van a gazdaságban, de nem lesz ugyanilyen arányban több áru és szolgáltatás,
          akkor <strong>ugyanaz a pénz kevesebbet ér, mint korábban</strong>.
        </p>
        <p style={{ margin: '0' }}>
          Ez az adat nem része a számításnak, de segít megérteni, miért csökken hosszú távon a pénz vásárlóereje.
        </p>
      </div>
    </div>
  );
}
