import { getMacroData } from '@/lib/data/macro-data';

interface M2ContextualIndicatorProps {
  year: number
  country?: string
  periodStartYear?: number
  periodEndYear?: number
}

export default async function M2ContextualIndicator({ 
  year, 
  country = 'HU',
  periodStartYear,
  periodEndYear
}: M2ContextualIndicatorProps) {
  const macroData = await getMacroData(country)
  const yearData = macroData.find(d => d.year === year)
  
  if (!yearData || yearData.m2_growth === null) {
    return null;
  }

  const m2Growth = Number(yearData.m2_growth);

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
          {formatPercentage(m2Growth)}
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
        <p style={{ margin: '0 0 8px 0' }}>
          Az M2 pénzkínálat változása egy kontextuális mutató, amely a gazdaságban lévő pénzmennyiség változását mutatja.
        </p>
        <p style={{ margin: '0' }}>
          Ez az információ kizárólag tájékoztató jellegű, és nem befolyásolja a számításokat. Nem mutat közvetlen ok-okozati összefüggést az inflációval.
        </p>
      </div>
    </div>
  );
}
