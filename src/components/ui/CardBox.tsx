import styled from 'styled-components';

interface CardBoxProps {
  focused: boolean;
  imageUrl?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
}

const StyledCardBox = styled.div<CardBoxProps>`
  width: ${({ width }) => width || '428px'};
  height: ${({ height }) => height || '240px'};
  background-image: ${({ imageUrl }) =>
    imageUrl
      ? `url(${imageUrl})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || '7px'};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: ${({ padding }) => padding || '16px'};
`;

export interface CardBoxComponentProps {
  focused: boolean;
  imageUrl?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CardBox({
  focused,
  imageUrl,
  width = '428px',
  height = '240px',
  borderRadius = '7px',
  padding = '20px',
  children,
  className
}: CardBoxComponentProps) {
  return (
    <StyledCardBox
      focused={focused}
      imageUrl={imageUrl}
      width={width}
      height={height}
      borderRadius={borderRadius}
      padding={padding}
      className={className}
    >
      {children}
    </StyledCardBox>
  );
}