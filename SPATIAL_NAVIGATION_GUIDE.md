# 🧭 Spatial Navigation & Focus Management Guide

This guide explains how to implement spatial navigation, focus management, and scrollable components in our TV navigation system using React and the spatial navigation library.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Basic Focus Wrapper](#basic-focus-wrapper)
4. [Menu Navigation](#menu-navigation)
5. [Scrollable Content Rows](#scrollable-content-rows)
6. [Modal Components](#modal-components)
7. [Theme Integration](#theme-integration)
8. [Best Practices](#best-practices)

## 🎯 Overview

Our TV navigation system uses spatial navigation to allow users to navigate through the interface using D-pad controls (arrow keys). The system automatically manages focus states, visual feedback, and smooth scrolling.

### Key Features:
- **D-pad Navigation**: Navigate using arrow keys (↑↓←→)
- **Focus Management**: Automatic focus tracking and visual feedback
- **Smooth Scrolling**: Auto-scroll content into view when focused
- **Theme Integration**: Consistent styling using theme variables
- **Accessibility**: Full keyboard and remote control support

## 🔧 Core Concepts

### 1. useFocusable Hook

The `useFocusable` hook is the foundation of our spatial navigation system:

```typescript
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';

const { ref, focused, focusKey } = useFocusable({
  focusKey: 'UNIQUE_KEY',           // Unique identifier
  onEnterPress: () => {},           // Handle Enter/OK button
  onArrowPress: (direction) => {},  // Handle arrow key presses
  onFocus: () => {},               // Called when component gains focus
  onBlur: () => {},                // Called when component loses focus
});
```

### 2. Focus Context

Use `FocusContext.Provider` to create focus boundaries and manage child components:

```typescript
<FocusContext.Provider value={focusKey}>
  {/* Child components inherit this focus context */}
</FocusContext.Provider>
```

## 🎮 Basic Focus Wrapper

### Simple Focusable Component

```typescript
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

function FocusableButton({ title, onPress }) {
  const { ref, focused } = useFocusable({
    onEnterPress: onPress,
  });

  return (
    <StyledButton 
      ref={ref} 
      $focused={focused}
      onClick={onPress}
    >
      {title}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $focused: boolean }>`
  background-color: ${({ $focused, theme }) => 
    $focused ? theme.outlineStrokeFocusTertiary : theme.surfaceSecondaryOpacity100};
  border: ${({ $focused, theme }) => 
    $focused ? `3px solid ${theme.outlineStrokeFocusWhite}` : 'none'};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.3s ease;
`;
```

## 🍔 Menu Navigation

### Vertical Menu with Focus Management

```typescript
// Menu Container
function Menu({ currentPage, onNavigate }) {
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    focusKey: 'MENU',
    trackChildren: true,
    preferredChildFocusKey: `MENU_ITEM_${currentPage.toUpperCase()}`,
    onArrowPress: (direction) => {
      if (direction === 'right') {
        return false; // Allow focus to move to main content
      }
      return true; // Handle other directions within menu
    },
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} $hasFocusedChild={hasFocusedChild}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.page}
            focusKey={`MENU_ITEM_${item.page.toUpperCase()}`}
            isActive={currentPage === item.page}
            onSelect={() => onNavigate(item.page)}
            {...item}
          />
        ))}
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

// Menu Item
function MenuItem({ focusKey, isActive, onSelect, title, iconType }) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onSelect,
    onArrowPress: (direction) => {
      if (direction === 'right') {
        return false; // Allow focus to move to content
      }
      return true;
    },
  });

  return (
    <MenuItemBox 
      ref={ref} 
      $focused={focused} 
      $isActive={isActive}
      onClick={onSelect}
    >
      <MenuItemIcon $iconType={iconType} />
      <MenuItemTitle>{title}</MenuItemTitle>
    </MenuItemBox>
  );
}
```

## 📜 Scrollable Content Rows

### Horizontal Scrolling Row

```typescript
function ContentRow({ title, assets, onAssetPress, onFocus }) {
  const { ref, focusKey } = useFocusable({
    onFocus,
    saveLastFocusedChild: false,
    preferredChildFocusKey: `${title}-0`, // Focus first item by default
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  // Auto-scroll focused item into view
  const onAssetFocus = useCallback(({ x }: { x: number }) => {
    scrollingRef.current?.scrollTo({
      left: x,
      behavior: 'smooth'
    });
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{title}</ContentRowTitle>
        
        {/* Scrollable container with hidden scrollbar */}
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map((asset, index) => (
              <Asset
                key={`${title}-${index}`}
                index={index}
                title={asset.title}
                color={asset.color}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

// Hide scrollbar while maintaining functionality
const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
`;
```

### Individual Asset Component

```typescript
function Asset({ title, color, onEnterPress, onFocus, index }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus: (layout) => {
      // Notify parent about focus position for auto-scroll
      onFocus({ x: layout.left - 60 }); // Offset for padding
    },
  });

  return (
    <AssetWrapper 
      ref={ref} 
      $focused={focused}
      $color={color}
    >
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}
```

## 🪟 Modal Components

### Modal with Focus Boundary

```typescript
function Modal({ isOpen, onClose, children }) {
  const { ref, focusKey } = useFocusable({
    focusable: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: true, // Prevent focus from leaving modal
    focusKey: 'MODAL',
    preferredChildFocusKey: 'CLOSE_BUTTON',
  });

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <FocusContext.Provider value={focusKey}>
        <ModalContent ref={ref}>
          {children}
          <CloseButton focusKey="CLOSE_BUTTON" onPress={onClose} />
        </ModalContent>
      </FocusContext.Provider>
    </ModalOverlay>
  );
}
```

### Modal with Focusable List

```typescript
function FriendsModal({ isOpen, onClose }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'FRIENDS_MODAL',
    trackChildren: true,
    isFocusBoundary: true,
    preferredChildFocusKey: 'CLOSE_BUTTON',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FocusContext.Provider value={focusKey}>
        <ModalContent ref={ref}>
          <ModalTitle>Friends</ModalTitle>
          
          {friends.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              focusKey={`FRIEND_${friend.id}`}
            />
          ))}
          
          <CloseButton focusKey="CLOSE_BUTTON" onPress={onClose} />
        </ModalContent>
      </FocusContext.Provider>
    </Modal>
  );
}

// Friend item with multiple focusable buttons
function FriendItem({ friend, focusKey }) {
  const { ref, focusKey: containerFocusKey } = useFocusable({
    focusKey,
    trackChildren: true,
    preferredChildFocusKey: `${focusKey}_MESSAGE`,
  });

  return (
    <FocusContext.Provider value={containerFocusKey}>
      <FriendItemContainer ref={ref}>
        <FriendInfo>
          <FriendName>{friend.name}</FriendName>
          <FriendStatus>{friend.status}</FriendStatus>
        </FriendInfo>
        
        <FriendActions>
          <ActionButton focusKey={`${focusKey}_MESSAGE`}>Message</ActionButton>
          <ActionButton focusKey={`${focusKey}_CALL`}>Call</ActionButton>
          <ActionButton focusKey={`${focusKey}_BLOCK`}>Block</ActionButton>
        </FriendActions>
      </FriendItemContainer>
    </FocusContext.Provider>
  );
}
```

## 🎨 Theme Integration

### Using Theme Variables in Styled Components

```typescript
// With ThemeProvider wrapper in App.tsx
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>

// In styled components
const StyledComponent = styled.div<{ $focused: boolean }>`
  background-color: ${({ $focused, theme }) => 
    $focused ? theme.surfaceSecondaryOpacity60 : theme.surfaceSecondaryOpacity40};
  color: ${({ theme }) => theme.textPrimary};
  border: ${({ $focused, theme }) => 
    $focused ? `3px solid ${theme.outlineStrokeFocusWhite}` : 'none'};
  border-radius: ${semanticBorderRadius.component.button};
`;
```

### TypeScript Theme Declaration

```typescript
// src/types/styled.d.ts
import 'styled-components';
import { darkTheme } from '../styles/theme/darkTheme';

type ThemeType = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
```

## ✅ Best Practices

### 1. Focus Key Naming Convention
```typescript
// Use descriptive, hierarchical naming
'MENU'                    // Top-level menu
'MENU_ITEM_HOME'         // Menu item
'CONTENT_ROW_MOVIES'     // Content row
'MOVIES_ASSET_0'         // Individual asset
'MODAL_FRIENDS'          // Modal container
'FRIEND_123_MESSAGE'     // Nested focusable element
```

### 2. Arrow Key Handling
```typescript
const { ref, focused } = useFocusable({
  onArrowPress: (direction) => {
    switch (direction) {
      case 'right':
        // Allow focus to move to next section
        return false;
      case 'left':
        // Handle within current component
        return true;
      case 'up':
      case 'down':
        // Handle vertical navigation
        return true;
      default:
        return true;
    }
  },
});
```

### 3. Focus State Styling
```typescript
// Always provide visual feedback for focused state
const FocusableElement = styled.div<{ $focused: boolean }>`
  // Use theme variables for consistency
  background-color: ${({ $focused, theme }) => 
    $focused ? theme.outlineStrokeFocusTertiary : 'transparent'};
  
  // Clear focus indication
  border: ${({ $focused, theme }) => 
    $focused ? `3px solid ${theme.outlineStrokeFocusWhite}` : '3px solid transparent'};
  
  // Smooth transitions
  transition: all 0.3s ease;
  
  // Ensure proper contrast
  color: ${({ theme }) => theme.textPrimary};
`;
```

### 4. Scroll Management
```typescript
// Auto-scroll focused elements into view
const onItemFocus = useCallback(({ x, y }) => {
  scrollContainerRef.current?.scrollTo({
    left: x - SCROLL_OFFSET,
    top: y - SCROLL_OFFSET,
    behavior: 'smooth'
  });
}, []);
```

### 5. Modal Focus Management
```typescript
// Always set focus boundaries for modals
const modalFocusConfig = {
  isFocusBoundary: true,        // Prevent focus from leaving modal
  autoRestoreFocus: true,       // Restore focus when modal closes
  preferredChildFocusKey: 'CLOSE_BUTTON', // Default focus target
};
```

## 🚀 Quick Start Checklist

1. **Wrap your app** with `ThemeProvider`
2. **Initialize spatial navigation** with `init()` in your main component
3. **Use `useFocusable`** for any interactive element
4. **Provide unique `focusKey`** for each focusable component
5. **Use `FocusContext.Provider`** for containers with multiple focusable children
6. **Handle arrow key navigation** with `onArrowPress`
7. **Style focus states** using theme variables
8. **Hide scrollbars** while maintaining scroll functionality
9. **Set focus boundaries** for modals and overlays
10. **Test navigation flow** with keyboard/D-pad controls

This system provides a robust foundation for TV-style navigation with smooth focus management, automatic scrolling, and consistent theming across your entire application.