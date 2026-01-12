# Newsletter File Structure

## Current Structure (2025-12)

```
components/newsletter/
├── README.md                           # Documentation
├── STRUCTURE.md                        # This file
├── shared/                             # Shared components (empty for now)
└── 2025-december/                      # December 2025 edition
    ├── InflationInterestChart.tsx      # Topic 1: Inflation & Interest Rates
    └── GDPGrowthChart.tsx              # Topic 2: GDP Growth Decomposition
```

## Page Structure

```
app/
└── hirlevel-2025-december/
    └── page.tsx                        # Newsletter page
```

## Naming Convention Summary

### Edition Folders
- **Format**: `YYYY-MONTH` (lowercase)
- **Example**: `2025-december`, `2026-january`

### Chart Components
- **Format**: `[Topic][ChartType]Chart.tsx`
- **Example**: `InflationInterestChart.tsx`, `GDPGrowthChart.tsx`

### Page Routes
- **Format**: `app/hirlevel-YYYY-MONTH/page.tsx`
- **Example**: `app/hirlevel-2025-december/page.tsx`

## Import Examples

```typescript
// Edition-specific charts
import InflationInterestChart from '@/components/newsletter/2025-december/InflationInterestChart'
import GDPGrowthChart from '@/components/newsletter/2025-december/GDPGrowthChart'

// Shared components (when available)
import SharedChart from '@/components/newsletter/shared/SharedChart'
```

## Adding Future Editions

1. Create folder: `components/newsletter/2026-january/`
2. Add chart components following naming convention
3. Create page: `app/hirlevel-2026-january/page.tsx`
4. Import components using the pattern above
