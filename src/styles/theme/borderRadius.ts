// Border radius tokens (none, sm, md, lg, full)
export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Semantic border radius tokens
export const semanticBorderRadius = {
  // Component border radius
  component: {
    button: borderRadius.md,
    input: borderRadius.md,
    card: borderRadius.lg,
    modal: borderRadius.xl,
    avatar: borderRadius.full,
    badge: borderRadius.full,
  },

  // Interactive elements
  interactive: {
    small: borderRadius.sm,
    medium: borderRadius.md,
    large: borderRadius.lg,
  },

  // Container elements
  container: {
    small: borderRadius.md,
    medium: borderRadius.lg,
    large: borderRadius.xl,
  },
} as const;
