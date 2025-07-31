import styled from 'styled-components';
import { useFocusable } from '../../index';
import { semanticBorderRadius } from '../../styles/theme/borderRadius';

interface MenuItemBoxProps {
  $focused: boolean;
  $expanded: boolean;
  $isActive: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: ${({ $expanded }) => ($expanded ? '171px' : '51px')};
  height: 51px;
  background-color: ${({ $isActive, $focused, theme }) =>
    $isActive ? theme.iconTertiary : $focused ? theme.outlineStrokeFocusTertiary : theme.surfaceSecondaryOpacity100};
  border-color: ${({ theme }) => theme.outlineStrokeFocusWhite};
  border-style: solid;
  border-width: ${({ $focused }) => ($focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: ${semanticBorderRadius.component.button};
  margin-bottom: 37px;
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? 'flex-start' : 'center')};
  padding: ${({ $expanded }) => ($expanded ? '0 15px' : '0')};
  transition: width 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  position: relative;
`;

const ActiveIndicator = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ theme }) => theme.iconGold};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const MenuItemTitle = styled.span<{ $expanded: boolean }>`
  color: ${({ theme }) => theme.textPrimary};
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 500;
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const MenuItemIcon = styled.div<{ $expanded: boolean; $iconType: string }>`
  width: 24px;
  height: 24px;
  margin-right: ${({ $expanded }) => ($expanded ? '12px' : '0')};
  margin-left: ${({ $expanded }) => ($expanded ? '0' : '36px')};
  transition: margin-right 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.iconWhite};
  font-size: 18px;
  
  &::before {
    content: ${({ $iconType }) => {
      switch ($iconType) {
        case 'home': return '"🏠"';
        case 'movies': return '"🎬"';
        case 'series': return '"📺"';
        case 'sports': return '"⚽"';
        case 'settings': return '"⚙️"';
        default: return '"📱"';
      }
    }};
  }
`;

interface MenuItemProps {
  title: string;
  expanded: boolean;
  isActive: boolean;
  iconType: string;
  onSelect: () => void;
  focusKey: string;
}

export function MenuItem({ title, expanded, isActive, iconType, onSelect, focusKey }: MenuItemProps) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: () => {
      onSelect();
    }
  });

  return (
    <MenuItemBox
      ref={ref}
      $focused={focused}
      $expanded={expanded}
      $isActive={isActive}
      onClick={onSelect}
    >
      <ActiveIndicator $isActive={isActive} />
      <MenuItemIcon $expanded={expanded} $iconType={iconType} />
      <MenuItemTitle $expanded={expanded}>{title}</MenuItemTitle>
    </MenuItemBox>
  );
}