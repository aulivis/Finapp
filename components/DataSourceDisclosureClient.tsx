'use client'

interface DataSourceDisclosureClientProps {
  sources: string[]
}

export default function DataSourceDisclosureClient({ sources }: DataSourceDisclosureClientProps) {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#FFFFFF',
      borderRadius: '2px',
      borderLeft: '3px solid #4B5563',
      fontSize: '12px',
      lineHeight: '1.6',
      color: '#4B5563',
      marginTop: '16px'
    }}>
      <p style={{ margin: '0 0 8px 0' }}>
        Felhasznált fő mutatók: fogyasztói árindex (CPI), globális pénzmennyiség (M2).
        Források: jegybanki és nemzetközi statisztikai adatbázisok.
      </p>
      {sources.length > 0 && (
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6B7280' }}>
          <strong>Konkrét források:</strong> {sources.join(', ')}
        </p>
      )}
    </div>
  )
}
