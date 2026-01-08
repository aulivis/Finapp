# Quarterly Email Update System

This system sends quarterly update emails to users with valid access.

## Overview

- **Frequency**: Quarterly (once every 3 months)
- **Recipients**: Users with valid access (access_valid_until > now)
- **Content**: Inflation trends, money supply (M2) trends (contextual), purchasing power implications
- **Language**: Hungarian
- **Tone**: Neutral, data-driven, no marketing language

## Rationale

- Macroeconomic data is meaningful at quarterly scale
- Reduces noise and user fatigue
- Aligns with non-SaaS, instrument-style positioning

## Usage

### Manual Send

```bash
npm run send-quarterly-email
```

### Automated Send (Vercel Cron)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/quarterly-email",
      "schedule": "0 10 1 */3 *"
    }
  ]
}
```

This runs on the 1st day of every 3rd month at 10:00 AM UTC.

### External Cron Service

You can also call the endpoint directly:

```
GET https://your-domain.com/api/cron/quarterly-email
```

With optional authentication header:
```
Authorization: Bearer YOUR_CRON_SECRET
```

### Manual Cron (Linux/Mac)

```bash
# Runs quarterly (Jan 1, Apr 1, Jul 1, Oct 1) at 2 AM
0 2 1 */3 * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.com/api/cron/quarterly-email
```

## Email Content

The email includes:

1. **Inflation Trends** - Current year inflation rate and comparison to previous year
2. **Money Supply (M2) Trends** - Average M2 growth (contextual only, not used in calculations)
3. **Purchasing Power Implications** - What the data means for purchasing power
4. **Calculator Update Notice** - Link to updated calculators

All content is in Hungarian and uses neutral, data-driven language.

## AI Content Integration

The system can use AI-generated content if available and approved:

- `quarterly_summary` - Quarterly economic summary
- `purchasing_power_explanation` - Explanation of purchasing power impact

Content is generated using `npm run generate-quarterly-ai-content` and must be approved before use.

## Database

Emails are logged in the `email_logs` table with:
- Email address
- Email type (`quarterly_update`)
- Subject
- Status (`sent`, `failed`, `bounced`)
- Timestamp
- Error message (if failed)

## Duplicate Prevention

The system automatically prevents sending duplicate emails in the same quarter by checking `email_logs` for existing `quarterly_update` emails sent in the current quarter.

## Testing

1. Ensure you have users with valid access in `users_access` table
2. Ensure macroeconomic data is available in `macro_data` table
3. Run: `npm run send-quarterly-email`

## Customization

Edit `lib/email/quarterly-update.ts` to customize:
- Email template
- Content structure
- Data sources
- Frequency logic
