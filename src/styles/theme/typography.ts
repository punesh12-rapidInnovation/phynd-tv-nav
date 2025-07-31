import styled, { css } from 'styled-components';

// Typography base styles
const baseTextStyles = css`
  margin: 0;
  padding: 0;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

// Display styles
export const DisplayXL = styled.h1`
  ${baseTextStyles}
  font-size: 72px;
  font-weight: 400;
  line-height: 80px;
  /* Usage: Hero titles / Home screen headlines */
`;

export const DisplayLG = styled.h2`
  ${baseTextStyles}
  font-size: 60px;
  font-weight: 400;
  line-height: 68px;
  /* Usage: Large screen section titles */
`;

// Heading styles
export const HeadingLG = styled.h3`
  ${baseTextStyles}
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  /* Usage: Section headers / prominent headings */
`;

export const HeadingMD = styled.h4`
  ${baseTextStyles}
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  /* Usage: Standard screen headers */
`;

export const HeadingSM = styled.h5`
  ${baseTextStyles}
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  /* Usage: Subsection headers / subtitles */
`;

// Body styles
export const BodyXL = styled.p`
  ${baseTextStyles}
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  /* Usage: Large body text (Game pages, interstitials) */
`;

export const BodyLG = styled.p`
  ${baseTextStyles}
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  /* Usage: Primary readable copy */
`;

export const BodyMD = styled.p`
  ${baseTextStyles}
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  /* Usage: Slightly stronger body text */
`;

// Label styles
export const LabelLG = styled.span`
  ${baseTextStyles}
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  /* Usage: Buttons, nav items */
`;

export const LabelMD = styled.span`
  ${baseTextStyles}
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  /* Usage: Tab labels or small UI text */
`;

export const LabelSM = styled.span`
  ${baseTextStyles}
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  /* Usage: Metadata badges (e.g. timestamps, category tags) */
`;

// Button styles
export const ButtonBase = styled.span`
  ${baseTextStyles}
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  /* Usage: Standard UI buttons (cards, nav, secondary CTAs) */
`;

export const ButtonLG = styled.span`
  ${baseTextStyles}
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  /* Usage: Hero buttons / high-visibility CTAs */
`;

export const ButtonXL = styled.span`
  ${baseTextStyles}
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  /* Usage: Large-scale buttons (e.g. Game interstitial, featured CTAs) */
`;

// Typography variants object for programmatic access
export const Typography = {
  DisplayXL,
  DisplayLG,
  HeadingLG,
  HeadingMD,
  HeadingSM,
  BodyXL,
  BodyLG,
  BodyMD,
  LabelLG,
  LabelMD,
  LabelSM,
  ButtonBase,
  ButtonLG,
  ButtonXL,
} as const;

// Type for typography component keys
export type TypographyKey = keyof typeof Typography;