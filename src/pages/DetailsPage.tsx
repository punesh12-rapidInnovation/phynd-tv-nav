import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import { semanticBorderRadius } from '../styles/theme/borderRadius';

const DetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: ${({ theme }) => theme.textPrimary};
  padding: 60px;
  overflow: hidden;
`;

const BackButton = styled.button<{ $focused: boolean }>`
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: ${({ $focused, theme }) => 
    $focused ? theme.outlineStrokeFocusTertiary : theme.surfaceSecondaryOpacity60};
  border: ${({ $focused, theme }) => 
    $focused ? `3px solid ${theme.outlineStrokeFocusWhite}` : '3px solid transparent'};
  color: ${({ theme }) => theme.textPrimary};
  padding: 12px 24px;
  border-radius: ${semanticBorderRadius.component.button};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: '←';
    font-size: 18px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 80px;
  height: calc(100vh - 140px);
`;

const AssetPreview = styled.div<{ $color: string }>`
  width: 500px;
  height: 280px;
  background-color: ${({ $color }) => $color};
  border-radius: ${semanticBorderRadius.component.card};
  flex-shrink: 0;
`;

const DetailsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.textPrimary};
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MetaItem = styled.div`
  display: flex;
  gap: 16px;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  min-width: 100px;
`;

const MetaValue = styled.span`
  color: ${({ theme }) => theme.textSecondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const ActionButton = styled.button<{ $focused: boolean; $primary?: boolean }>`
  background-color: ${({ $focused, $primary, theme }) => {
    if ($focused) return theme.outlineStrokeFocusTertiary;
    return $primary ? theme.iconTertiary : theme.surfaceSecondaryOpacity60;
  }};
  border: ${({ $focused, theme }) => 
    $focused ? `3px solid ${theme.outlineStrokeFocusWhite}` : '3px solid transparent'};
  color: ${({ theme }) => theme.textPrimary};
  padding: 16px 32px;
  border-radius: ${semanticBorderRadius.component.button};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
`;

interface DetailsPageProps {}

export function DetailsPage({}: DetailsPageProps) {
  const navigate = useNavigate();
  const { assetId } = useParams<{ assetId: string }>();
  
  const { ref, focusKey } = useFocusable({
    focusKey: 'DETAILS_PAGE',
    trackChildren: true,
    preferredChildFocusKey: 'BACK_BUTTON',
  });

  // Handle back button with remote control
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Backspace') {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // Mock data based on asset ID
  const assetData = {
    title: `Content Item ${assetId}`,
    description: `This is a detailed description of content item ${assetId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    year: '2024',
    genre: 'Action, Adventure',
    duration: '2h 15m',
    rating: '8.5/10',
    color: `hsl(${(parseInt(assetId || '0') * 60) % 360}, 70%, 50%)`
  };

  const BackButtonComponent = () => {
    const { ref: backRef, focused } = useFocusable({
      focusKey: 'BACK_BUTTON',
      onEnterPress: () => navigate(-1),
    });

    return (
      <BackButton ref={backRef} $focused={focused} onClick={() => navigate(-1)}>
        Back
      </BackButton>
    );
  };

  const PlayButton = () => {
    const { ref: playRef, focused } = useFocusable({
      focusKey: 'PLAY_BUTTON',
      onEnterPress: () => console.log('Play pressed'),
    });

    return (
      <ActionButton ref={playRef} $focused={focused} $primary>
        Play
      </ActionButton>
    );
  };

  const AddToListButton = () => {
    const { ref: addRef, focused } = useFocusable({
      focusKey: 'ADD_TO_LIST_BUTTON',
      onEnterPress: () => console.log('Add to list pressed'),
    });

    return (
      <ActionButton ref={addRef} $focused={focused}>
        Add to List
      </ActionButton>
    );
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <DetailsPageWrapper ref={ref}>
        <BackButtonComponent />
        
        <ContentContainer>
          <AssetPreview $color={assetData.color} />
          
          <DetailsContent>
            <Title>{assetData.title}</Title>
            
            <MetaInfo>
              <MetaItem>
                <MetaLabel>Year:</MetaLabel>
                <MetaValue>{assetData.year}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Genre:</MetaLabel>
                <MetaValue>{assetData.genre}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Duration:</MetaLabel>
                <MetaValue>{assetData.duration}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Rating:</MetaLabel>
                <MetaValue>{assetData.rating}</MetaValue>
              </MetaItem>
            </MetaInfo>
            
            <Description>{assetData.description}</Description>
            
            <ActionButtons>
              <PlayButton />
              <AddToListButton />
            </ActionButtons>
          </DetailsContent>
        </ContentContainer>
      </DetailsPageWrapper>
    </FocusContext.Provider>
  );
}