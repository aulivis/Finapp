# Newsletter Components Structure

This directory contains all components specific to newsletter editions.

## Directory Structure

```
components/newsletter/
├── README.md                    # This file
├── shared/                      # Shared components used across multiple editions
│   └── (future shared components)
└── [YEAR]-[MONTH]/              # Edition-specific components
    ├── [ChartName]Chart.tsx     # Chart components for this edition
    └── (other edition-specific components)
```

## Naming Convention

### Edition Folders
- Format: `YYYY-MONTH` (e.g., `2025-december`, `2026-january`)
- Use lowercase month names
- Examples:
  - `2025-december`
  - `2026-january`
  - `2026-february`

### Chart Components
- Format: `[Topic][ChartType]Chart.tsx`
- Use PascalCase
- Include "Chart" suffix
- Examples:
  - `InflationInterestChart.tsx` - Chart showing inflation and interest rates
  - `GDPGrowthChart.tsx` - Chart showing GDP growth decomposition
  - `ConsumerConfidenceChart.tsx` - Chart showing consumer confidence data

### Component Naming Guidelines
1. **Be descriptive**: Component name should clearly indicate what it displays
2. **Use topic + type**: Combine the main topic with chart type (e.g., `InflationLineChart`, `GDPBarChart`)
3. **Keep it concise**: Avoid overly long names, but prioritize clarity
4. **Consistent suffix**: Always end chart components with `Chart.tsx`

## Usage in Newsletter Pages

### Import Pattern
```typescript
// From edition-specific folder
import InflationInterestChart from '@/components/newsletter/2025-december/InflationInterestChart'
import GDPGrowthChart from '@/components/newsletter/2025-december/GDPGrowthChart'

// From shared folder (if applicable)
import SharedComponent from '@/components/newsletter/shared/SharedComponent'
```

### Page Structure
Newsletter pages are located in:
```
app/hirlevel-[YEAR]-[MONTH]/page.tsx
```

Example: `app/hirlevel-2025-december/page.tsx`

## Adding a New Newsletter Edition

1. **Create edition folder**:
   ```bash
   mkdir components/newsletter/2026-january
   ```

2. **Create chart components** in the new folder:
   - Follow naming convention: `[Topic][ChartType]Chart.tsx`
   - Use the same structure as existing charts

3. **Create newsletter page**:
   ```bash
   mkdir app/hirlevel-2026-january
   # Create page.tsx in the new directory
   ```

4. **Import components** in the page:
   ```typescript
   import NewChart from '@/components/newsletter/2026-january/NewChart'
   ```

## Shared Components

Components that are reused across multiple editions should be placed in `shared/`:
- Generic chart wrappers
- Common data visualization utilities
- Reusable chart configurations

## Best Practices

1. **Keep edition-specific**: If a component is only used in one edition, keep it in that edition's folder
2. **Extract to shared**: If a component is used in 2+ editions, consider moving it to `shared/`
3. **Document data**: Include JSDoc comments explaining data structure and sources
4. **Consistent styling**: Use the design system from `@/lib/design-system`
5. **Mobile-first**: All charts should be responsive and mobile-optimized

## Example Structure for Multiple Editions

```
components/newsletter/
├── README.md
├── shared/
│   └── ChartWrapper.tsx
├── 2025-december/
│   ├── InflationInterestChart.tsx
│   └── GDPGrowthChart.tsx
└── 2026-january/
    ├── EmploymentChart.tsx
    └── TradeBalanceChart.tsx
```
