import React from 'react';
import styled from 'styled-components';
import { TopNavbar } from './TopNavbar';
import { Menu } from './Menu';
import { GlobalStyles } from '../../styles/GlobalStyles';

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: calc(1080px - 80px);
  position: relative;
`;

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onProfileClick: () => void;
  userName?: string;
  userInitials?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  onProfileClick,
  userName = "John Doe",
  userInitials = "JD"
}) => {
  return (
    <AppContainer>
      <GlobalStyles />
      <TopNavbar
        userName={userName}
        userInitials={userInitials}
        onProfileClick={onProfileClick}
      />
      <Container>
        <Menu focusKey="MENU" currentPage={currentPage} onNavigate={onNavigate} />
        {children}
      </Container>
    </AppContainer>
  );
};