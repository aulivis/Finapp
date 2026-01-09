# Scripts

This directory contains utility scripts for the application.

## Available Scripts

### `validate-env.ts`
Validates that all required environment variables are set.

**Usage:**
```bash
npm run validate-env
```

### `send-quarterly-email.ts`
Manually sends quarterly update emails to all users with active access.

**Usage:**
```bash
npm run send-quarterly-email
```

### `generate-quarterly-ai-content.ts`
Generates AI content for quarterly email updates using OpenAI.

**Usage:**
```bash
npm run generate-quarterly-ai-content
```

## Macroeconomic Data Updates

Macroeconomic data (including M2 growth rates) should be updated directly in Supabase using SQL:

1. Open Supabase SQL Editor
2. Run the SQL file: `supabase/update-m2-data.sql`
3. Or create custom SQL queries to update the `macro_data` table

This approach is simpler and doesn't require environment variable configuration.
