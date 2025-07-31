import styled from 'styled-components';
import { gradients } from '../../styles/theme/gradients';

interface CardOverlayProps {
  focused: boolean;
  borderRadius?: string;
}

const OverlayWrapper = styled.div<CardOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${gradients.gameTileOverlayGradient.css};
  border-radius: ${({ borderRadius }) => borderRadius || '7px'};
  opacity: ${({ focused }) => (focused ? 0 : 1)};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

export interface CardOverlayComponentProps {
  focused: boolean;
  borderRadius?: string;
  className?: string;
}

export function CardOverlay({ 
  focused, 
  borderRadius = '7px',
  className 
}: CardOverlayComponentProps) {
  return (
    <OverlayWrapper 
      focused={focused} 
      borderRadius={borderRadius}
      className={className}
    />
  );
}