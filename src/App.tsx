/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Layout } from './components/layout';
import { HomePage, MoviesPage, SeriesPage, SportsPage, SettingsPage, DetailsPage } from './pages';
import { darkTheme } from './styles/theme/darkTheme';

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center'
});



function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const location = useLocation();
  
  // Check if we're on a details page
  const isDetailsPage = location.pathname.startsWith('/details/');
  
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

  // If we're on a details page, render it without the layout
  if (isDetailsPage) {
    return (
      <Routes>
        <Route path="/details/:assetId" element={<DetailsPage />} />
      </Routes>
    );
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onProfileClick={handleProfileClick}
      userName="John Doe"
      userInitials="JD"
    >
      <Routes>
        <Route path="/" element={renderCurrentPage()} />
        <Route path="/home" element={<HomePage />} />
        {/* Commented out other page routes for now */}
         <Route path="/movies" element={<MoviesPage />} />
         <Route path="/series" element={<SeriesPage />} />
         <Route path="/sports" element={<SportsPage />} />
         <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter initialEntries={['/']}>
          <AppContent />
        </MemoryRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
