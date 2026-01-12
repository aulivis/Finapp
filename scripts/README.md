# Scripts

This directory contains utility scripts for the application.

## Available Scripts

### `validate-env.ts`
Validates that all required environment variables are set.

**Usage:**
```bash
npm run validate-env
```

## Macroeconomic Data Updates

Macroeconomic data (including inflation rates and M2 growth rates) should be updated in the static data file:

1. Open `lib/data/economic-data.ts`
2. Update the `HISTORICAL_INFLATION` array for inflation data
3. Update the `HISTORICAL_M2_GROWTH` array for M2 money supply growth data

All macroeconomic data is now read from static files instead of the database, making it easier to maintain and version control.
