/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { init } from './lib/spatial-navigation';
import { Layout } from './components/layout';
import { HomePage, MoviesPage, SeriesPage, SportsPage, SettingsPage } from './pages';
import { darkTheme } from './styles/theme/darkTheme';

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center'
});



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
      <ThemeProvider theme={darkTheme}>
        <Layout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onProfileClick={handleProfileClick}
          userName="John Doe"
          userInitials="JD"
        >
          {renderCurrentPage()}
        </Layout>
      </ThemeProvider>
    </React.StrictMode>
  );
}
