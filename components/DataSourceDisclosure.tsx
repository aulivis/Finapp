import { getDataSources } from '@/lib/data/macro-data'

interface DataSourceDisclosureProps {
  country?: string
}

export default async function DataSourceDisclosure({ country = 'HU' }: DataSourceDisclosureProps) {
  const sources = await getDataSources(country)

  if (sources.length === 0) {
    return null
  }

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
      <strong style={{ color: '#111827' }}>Adatforrás:</strong>{' '}
      {sources.join(', ')}
    </div>
  )
}
