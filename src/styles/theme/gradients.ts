import { applyOpacity } from '../../utils/styleUtils';
import { AppColors } from './colors';



export const gradients = {
  gameTileOverlayGradient: {
    colors: [
      applyOpacity(AppColors.primaryDarkNavy, 0), // primaryDarkNavy 0% opacity
      applyOpacity(AppColors.primaryDarkNavy, 0.9), // primaryDarkNavy 90% opacity
    ],
    // CSS linear gradient string for easy use in styled-components
    css: `linear-gradient(180deg, ${applyOpacity(AppColors.primaryDarkNavy, 0)} 0%, ${applyOpacity(AppColors.primaryDarkNavy, 0.9)} 100%)`,
  },
} as const;

// Type for gradient keys
export type GradientKey = keyof typeof gradients;

