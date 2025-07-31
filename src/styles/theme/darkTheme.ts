import { applyOpacity } from '../../utils/styleUtils';
import { AppColors } from './colors';



export const darkTheme = {
  // Surface tokens
  bgColor: AppColors.primaryDarkNavy,
  surfaceSecondaryOpacity40: applyOpacity(AppColors.secondaryGrey, 0.4), // 40% opacity
  surfaceSecondaryOpacity60: applyOpacity(AppColors.secondaryGrey, 0.6), // 60% opacity
  surfaceSecondaryOpacity100: AppColors.secondaryGrey, // 100% opacity
  surfaceWhite: AppColors.phyndWhite, // 100% opacity

  // Typography tokens
  textPrimary: AppColors.phyndWhite,
  textSecondary: applyOpacity(AppColors.phyndWhite, 0.7),
  textInvert: AppColors.primaryDarkNavy,

  // Outline tokens
  outlineStrokeFocusWhite: AppColors.phyndWhite,
  outlineStrokeFocusTertiary: AppColors.tertiaryBluePeriwinkle,
  outlineStrokeStandardWhite: AppColors.phyndWhite,

  // Icon tokens
  iconGold: AppColors.iconGold,
  iconTertiary: AppColors.iconTertiary,
  iconInverted: AppColors.iconInverted,
  iconWhite: AppColors.iconWhite,
  favorite: AppColors.favorite,

  // Status tokens
  statusOnline: AppColors.statusOnline,
} 
