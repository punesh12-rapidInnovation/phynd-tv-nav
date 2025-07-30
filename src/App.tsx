/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { init } from './lib/spatial-navigation';
import { Menu, TopNavbar } from './components/layout';
import { HomePage, MoviesPage, SeriesPage, SportsPage, SettingsPage } from './pages';

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center'
});


const AppContainer = styled.div`
  background-color: #221c35;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: calc(1080px - 80px);
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

export function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'movies':
        return <MoviesPage />;
      case 'series':
        return <SeriesPage />;
      case 'sports':
        return <SportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  const handleProfileClick = () => {
    // Handle profile click - could navigate to profile page or show profile menu
    console.log('Profile clicked');
  };

  return (
    <React.StrictMode>
      <AppContainer>
        <GlobalStyle />
        <TopNavbar
          userName="John Doe"
          userInitials="JD"
          onProfileClick={handleProfileClick}
        />
        <MainContent>
          <Menu focusKey="MENU" currentPage={currentPage} onNavigate={handleNavigate} />
          {renderCurrentPage()}
        </MainContent>
      </AppContainer>
    </React.StrictMode>
  );
}
