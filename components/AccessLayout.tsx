import Link from 'next/link'

interface AccessLayoutProps {
  children: React.ReactNode
  email: string
}

export default function AccessLayout({ children, email }: AccessLayoutProps) {
  // Email is validated before reaching this component, no need to display it
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB'
    }}>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '24px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            marginBottom: '16px'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '400',
              margin: '0 0 8px 0',
              color: '#111827'
            }}>
              Számítási eszközök
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#4B5563',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Aktuális gazdasági környezet
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Link
              href="/"
              style={{
                padding: '8px 16px',
                color: '#4B5563',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                fontSize: '14px',
                fontWeight: '400',
                backgroundColor: '#FFFFFF'
              }}
            >
              Főoldal
            </Link>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {children}
      </main>
    </div>
  )
}
