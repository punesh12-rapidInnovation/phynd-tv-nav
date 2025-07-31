export const AppColors = {
  // Brand Tokens
  primaryDarkNavy: '#1B1D26', // Primary (Dark Navy)
  secondaryGrey: '#313544', // Secondary (Grey)
  tertiaryBluePeriwinkle: '#5D88FF', // Tertiary (Blue/Periwinkle)
  phyndWhite: '#F5F5F5', // Phynd White

  iconGold: '#e3ba24',
  iconTertiary: '#5d88ff',
  iconInverted: '#1b1d26',
  iconWhite: '#f5f5f5',
  statusOnline: '#5ed36a',
  favorite: '#E91E63',
} as const;

// Type for color keys
export type AppColorKey = keyof typeof AppColors;
