import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { calculatePurchasingPower } from '@/lib/data/inflation'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const amount = parseFloat(searchParams.get('amount') || '1000000')
    const startYear = parseInt(searchParams.get('startYear') || '2015')
    const endYear = parseInt(searchParams.get('endYear') || '2025')
    
    // Calculate purchasing power loss
    const dataPoints = calculatePurchasingPower(amount, startYear, endYear)
    const finalNominal = dataPoints[dataPoints.length - 1]?.nominal || amount
    const finalReal = dataPoints[dataPoints.length - 1]?.real || amount
    const loss = finalNominal - finalReal
    const lossPercentage = (loss / finalNominal) * 100
    
    // Format currency
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        maximumFractionDigits: 0,
      }).format(value)
    }
    
    const formatPercentage = (value: number) => {
      return `${value.toFixed(1)}%`
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FAFDFC 0%, #FAFBFF 25%, #FFFFFF 50%, #FCFAFF 75%, #FAFAFA 100%)',
            position: 'relative',
          }}
        >
          {/* Background decorative element */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-200px',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          
          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '60px 80px',
              gap: '40px',
            }}
          >
            {/* Contexta Wordmark */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '48px',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#111827',
                  lineHeight: '1.2',
                  fontFeatureSettings: '"liga" off',
                }}
              >
                CONTEXTA
              </div>
              <div
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#6B7280',
                  lineHeight: '1.4',
                  letterSpacing: '0.02em',
                }}
              >
                Pénzügyi kontextus, érthetően
              </div>
            </div>
            
            {/* Main Result Card */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
                padding: '48px 60px',
                background: 'linear-gradient(135deg, #FEE2E2 0%, rgba(254, 226, 226, 0.6) 50%, rgba(254, 226, 226, 0.4) 100%)',
                borderRadius: '24px',
                border: '4px solid #EF4444',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                maxWidth: '900px',
                width: '100%',
              }}
            >
              {/* Loss Percentage - Large Display */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#EF4444',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Vásárlóerő veszteség
                </div>
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '96px',
                    fontWeight: '700',
                    color: '#EF4444',
                    lineHeight: '1.1',
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {formatPercentage(lossPercentage)}
                </div>
              </div>
              
              {/* Amount and Years Info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#111827',
                    textAlign: 'center',
                    lineHeight: '1.4',
                  }}
                >
                  {formatCurrency(amount)}
                </div>
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#374151',
                    textAlign: 'center',
                  }}
                >
                  {startYear} - {endYear}
                </div>
                <div
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#6B7280',
                    textAlign: 'center',
                    marginTop: '8px',
                  }}
                >
                  Valódi vásárlóerő: {formatCurrency(finalReal)}
                </div>
              </div>
            </div>
            
            {/* KSH Info Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 24px',
                backgroundColor: '#DBEAFE',
                borderRadius: '12px',
                border: '2px solid #3B82F6',
                maxWidth: '800px',
                width: '100%',
              }}
            >
              <div
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#1E40AF',
                  textAlign: 'center',
                }}
              >
                A KSH (Központi Statisztikai Hivatal) inflációs adatai alapján
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
