import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFocusable, type FocusableComponentLayout, type FocusDetails, type KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';

const AssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
 width: 428px;
height: 240px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;


export interface AssetProps {
  index: number;
  title: string;
  color: string;
  onEnterPress?: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  enableNavigation?: boolean;
}

export function Asset({
  index,
  title,
  color,
  onEnterPress,
  onFocus,
  enableNavigation = false
}: AssetProps) {
  const navigate = useNavigate();

  const handleEnterPress = (props: object, details: KeyPressDetails) => {
    if (enableNavigation) {
      // Navigate to details page with asset index as ID
      navigate(`/details/${index}`);
    } else if (onEnterPress) {
      onEnterPress(props, details);
    }
  };

  const { ref, focused } = useFocusable({
    focusKey: `${title}-${index}`,
    onEnterPress: handleEnterPress,
    onFocus,
    extraProps: {
      title,
      color,
      index
    }
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox
        color={color}
        focused={focused}
      />
    </AssetWrapper>
  );
}