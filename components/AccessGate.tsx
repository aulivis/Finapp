import Link from 'next/link'

interface AccessGateProps {
  calculatorName?: string
}

export default function AccessGate({ calculatorName }: AccessGateProps) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{
          padding: '48px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          border: '1px solid #E5E7EB'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '400',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Hozzáférés szükséges
          </h1>

          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#4B5563',
            marginBottom: '32px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              {calculatorName 
                ? `A "${calculatorName}" számítás hozzáférést igényel.`
                : 'Ez a számítás hozzáférést igényel.'}
            </p>
            <p style={{ marginBottom: '16px' }}>
              A hozzáférés személyre szabott számításokat tartalmaz. A számítások 
              saját adatok alapján működnek, és konkrét megtakarításokat, életkort 
              és egyéb paramétereket vesznek figyelembe.
            </p>
            <p style={{
              margin: '0',
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              border: '1px solid #E5E7EB',
              fontSize: '14px'
            }}>
              A hozzáférés <strong>1 évig érvényes</strong> a fizetés után.
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/fizetes"
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                color: '#111827',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                fontSize: '15px',
                fontWeight: '400',
                textAlign: 'center',
                display: 'inline-block'
              }}
            >
              Hozzáférés
            </Link>
            <Link
              href="/"
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 24px',
                backgroundColor: '#F9FAFB',
                color: '#4B5563',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                fontSize: '15px',
                fontWeight: '400',
                textAlign: 'center',
                display: 'inline-block'
              }}
            >
              Vissza a nyilvános oldalra
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
