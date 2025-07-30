import styled from 'styled-components';
import { useFocusable, type FocusableComponentLayout, type FocusDetails, type KeyPressDetails } from '../../index';

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
  width: 325px;
  height: 250px;
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
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function Asset({
  title,
  color,
  onEnterPress,
  onFocus
}: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color
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