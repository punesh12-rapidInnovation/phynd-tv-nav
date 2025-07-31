import { useEffect } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '../../index';
import { MenuItem } from '../ui/MenuItem';

interface MenuWrapperProps {
  $hasFocusedChild: boolean;
  $expanded: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: ${({ $expanded }) => ($expanded ? '246px' : '80px')};
  min-width: ${({ $expanded }) => ($expanded ? '246px' : '80px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ $hasFocusedChild, theme }) =>
    $hasFocusedChild ? theme.surfaceSecondaryOpacity60 : theme.surfaceSecondaryOpacity40};
  padding-top: 37px;
  transition: max-width 0.3s ease, min-width 0.3s ease;
`;

interface MenuProps {
  focusKey: string;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { title: 'Home', page: 'home', iconType: 'home' },
  { title: 'Movies', page: 'movies', iconType: 'movies' },
  { title: 'Series', page: 'series', iconType: 'series' },
  { title: 'Sports', page: 'sports', iconType: 'sports' },
  { title: 'Settings', page: 'settings', iconType: 'settings' }
];

export function Menu({ focusKey: focusKeyParam, currentPage, onNavigate }: MenuProps) {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: `MENU_ITEM_${currentPage.toUpperCase()}`,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onArrowRelease: () => {},
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: 'bar' }
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  // Menu is expanded when any child has focus
  const isExpanded = hasFocusedChild;

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} $hasFocusedChild={hasFocusedChild} $expanded={isExpanded}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            expanded={isExpanded}
            isActive={currentPage === item.page}
            iconType={item.iconType}
            focusKey={`MENU_ITEM_${item.page.toUpperCase()}`}
            onSelect={() => onNavigate(item.page)}
          />
        ))}
      </MenuWrapper>
    </FocusContext.Provider>
  );
}