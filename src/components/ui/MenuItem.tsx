import styled from 'styled-components';
import { useFocusable } from '../../index';

interface MenuItemBoxProps {
  $focused: boolean;
  $expanded: boolean;
  $isActive: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: ${({ $expanded }) => ($expanded ? '171px' : '51px')};
  height: 51px;
  background-color: ${({ $isActive, $focused }) =>
    $isActive ? '#8E44AD' : $focused ? '#b056ed' : '#9B59B6'};
  border-color: white;
  border-style: solid;
  border-width: ${({ $focused }) => ($focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
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
  background-color: #F39C12;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const MenuItemTitle = styled.span<{ $expanded: boolean }>`
  color: white;
  font-family: 'Segoe UI';
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
  color: white;
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
}

export function MenuItem({ title, expanded, isActive, iconType, onSelect }: MenuItemProps) {
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      onSelect();
    }
  });

  return (
    <MenuItemBox ref={ref} $focused={focused} $expanded={expanded} $isActive={isActive}>
      <ActiveIndicator $isActive={isActive} />
      <MenuItemIcon $expanded={expanded} $iconType={iconType} />
      <MenuItemTitle $expanded={expanded}>{title}</MenuItemTitle>
    </MenuItemBox>
  );
}