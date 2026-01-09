/**
 * Design System Constants
 * Centralized design tokens for consistent UI/UX
 */

// Spacing Scale (4px base unit)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '96px',
} as const

// Border Radius
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const

// Typography Scale
export const typography = {
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '22px',
    '4xl': '28px',
    '5xl': '36px',
    '6xl': '48px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.7',
  },
} as const

// Color System
export const colors = {
  // Brand
  primary: '#2DD4BF',
  primaryHover: '#14B8A6',
  primaryLight: '#F0FDFA',
  primaryBorder: 'rgba(45, 212, 191, 0.2)',
  
  // Semantic Colors
  success: '#10B981',
  successLight: '#D1FAE5',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Grayscale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#1F2937',
    tertiary: '#374151',
    muted: '#6B7280',
    disabled: '#9CA3AF',
  },
  
  // Background Colors
  background: {
    default: '#F9FAFB',
    paper: '#FFFFFF',
    subtle: '#F3F4F6',
  },
} as const

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 3px rgba(45, 212, 191, 0.1)',
} as const

// Transitions
export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
  all: 'all 0.2s ease',
} as const

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const

// Breakpoints (for reference, actual breakpoints handled by hooks)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Component-specific styles
export const componentStyles = {
  card: {
    padding: {
      mobile: spacing.xl,
      desktop: spacing['2xl'],
    },
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
    backgroundColor: colors.background.paper,
  },
  input: {
    padding: spacing.md + ' ' + spacing.lg,
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.gray[200]}`,
    fontSize: typography.fontSize.lg,
    focus: {
      borderColor: colors.primary,
      outline: '2px solid transparent',
      outlineOffset: '2px',
      boxShadow: shadows.focus,
    },
  },
  button: {
    padding: {
      sm: spacing.md + ' ' + spacing.xl,
      md: spacing.md + ' ' + spacing['2xl'],
      lg: '14px ' + spacing['2xl'],
    },
    borderRadius: borderRadius.md,
    minHeight: '44px', // Touch target size
    transition: transitions.fast,
  },
} as const

// Helper function to get responsive spacing
export function getResponsiveSpacing(mobile: string, desktop: string) {
  return { mobile, desktop }
}

// Helper function for focus styles
export const focusStyles = {
  outline: '2px solid transparent',
  outlineOffset: '2px',
  boxShadow: shadows.focus,
}
