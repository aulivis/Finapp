# Macroeconomic Data Update Script

This script updates macroeconomic data in the Supabase `macro_data` table.

## Usage

### Manual Update

Run the script manually:

```bash
npm run update-macro-data
```

Or directly with tsx:

```bash
npx tsx scripts/update-macro-data.ts
```

### Scheduled Updates

You can schedule this script to run automatically using:

- **Cron jobs** (Linux/Mac)
- **Windows Task Scheduler** (Windows)
- **GitHub Actions** (CI/CD)
- **Vercel Cron Jobs** (if deployed on Vercel)

Example cron job (runs quarterly on the 1st day of each quarter at 2 AM):

```cron
0 2 1 */3 * cd /path/to/finapp && npm run update-macro-data
```

## Customization

Edit `scripts/update-macro-data.ts` to:

1. **Fetch data from APIs**: Replace the example data array with API calls to:
   - KSH (Központi Statisztikai Hivatal) API
   - European Central Bank API
   - Other macroeconomic data sources

2. **Read from CSV files**: Parse CSV files containing historical data

3. **Add more countries**: Extend the script to support multiple countries

## Data Format

The script expects data in this format:

```typescript
{
  country: 'HU',           // Country code (default: 'HU')
  year: 2024,              // Year
  inflation_rate: 3.7,     // Annual inflation rate (percentage)
  interest_rate: null,     // Interest rate (optional, can be null)
  source: 'KSH (Központi Statisztikai Hivatal)' // Data source
}
```

## Environment Variables

Make sure these are set in your `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Notes

- The script uses `upsert` to update existing records or create new ones
- Records are uniquely identified by `(country, year)` combination
- The `source` field should clearly indicate where the data comes from
- Data is updated with the current timestamp in `updated_at`
