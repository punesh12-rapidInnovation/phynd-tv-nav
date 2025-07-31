import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { RecommendedRow } from '../components/content/RecommendedRow';
import { TrendingRow } from '../components/content/TrendingRow';
import { MoviesRow } from '../components/content/MoviesRow';
import { SeriesRow } from '../components/content/SeriesRow';
import { TVChannelsRow } from '../components/content/TVChannelsRow';
import { SportRow } from '../components/content/SportRow';
import { ContentRow } from '../components/content/ContentRow';
import { Asset } from '../components/ui/Asset';
import { GameTile } from '../shared/gameTile';

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

// Additional content data for HomePage

const newReleases = [
  { title: 'New Release 1', color: '#FF7675' },
  { title: 'New Release 2', color: '#74B9FF' },
  { title: 'New Release 3', color: '#00B894' },
  { title: 'New Release 4', color: '#FDCB6E' },
  { title: 'New Release 5', color: '#E17055' },
  { title: 'New Release 6', color: '#A29BFE' },
];

const popularContent = [
  { title: 'Popular 1', color: '#6C5CE7' },
  { title: 'Popular 2', color: '#FD79A8' },
  { title: 'Popular 3', color: '#00CEC9' },
  { title: 'Popular 4', color: '#E84393' },
  { title: 'Popular 5', color: '#00B894' },
  { title: 'Popular 6', color: '#FDCB6E' },
];

const continueWatching = [
  { title: 'Continue 1', color: '#2D3436' },
  { title: 'Continue 2', color: '#636E72' },
  { title: 'Continue 3', color: '#B2BEC3' },
  { title: 'Continue 4', color: '#74B9FF' },
  { title: 'Continue 5', color: '#0984E3' },
  { title: 'Continue 6', color: '#00CEC9' },
];

const featuredGames = [
  {
    name: 'The Last of Us Part II',
    starRating: 1.5,
    esrbRating: 'M',
    imageUrl: 'https://picsum.photos/428/240?random=1'
  },
  {
    name: 'God of War',
    starRating: 2.8,
    esrbRating: 'M',
    imageUrl: 'https://picsum.photos/428/240?random=2'
  },
  {
    name: 'Spider-Man: Miles Morales',
    starRating: 3.3,
    esrbRating: 'T',
    imageUrl: 'https://picsum.photos/428/240?random=3'
  },
  {
    name: 'Horizon Zero Dawn',
    starRating: 4.6,
    esrbRating: 'T',
    imageUrl: 'https://picsum.photos/428/240?random=4'
  },
  {
    name: 'Ghost of Tsushima',
    starRating: 4.4,
    esrbRating: 'M',
    imageUrl: 'https://picsum.photos/428/240?random=5'
  },
  {
    name: 'Ratchet & Clank',
    starRating: 4.2,
    esrbRating: 'E10+',
    imageUrl: 'https://picsum.photos/428/240?random=6'
  }
];

export function HomePage() {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusable: true,
    autoRestoreFocus: true,
    trackChildren: true,
    preferredChildFocusKey: 'Recommended-0'
  });

  // Focus the page when it mounts and set focus to first item
  React.useEffect(() => {
    const timer = setTimeout(() => {
      focusSelf();
    }, 1500); // Longer delay to wait for RecommendedRow data to load (800ms API + buffer)
    
    return () => clearTimeout(timer);
  }, [focusSelf]);

  const navigate = useNavigate();

  const onAssetPress = useCallback((asset: any) => {
    // Handle asset press - navigate to details page with asset ID
    const assetId = asset.index || Math.random().toString(36).substr(2, 9);
    navigate(`/details/${assetId}`);
  }, [navigate]);

  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      (ref.current as HTMLDivElement)?.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <ScrollingRows ref={ref}>
          <div>

               <ContentRow
              title="Featured Games"
              items={featuredGames}
              renderItem={(item, index) => (
                <GameTile
                  index={index}
                  name={item.name}
                  starRating={item.starRating}
                  esrbRating={item.esrbRating}
                  imageUrl={item.imageUrl}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                />
              )}
              onFocus={onRowFocus}
            />
            <RecommendedRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <TrendingRow onFocus={onRowFocus} />
            <MoviesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="New Releases"
              items={newReleases}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}} // Empty function for individual card focus
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
            <SeriesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Popular Content"
              items={popularContent}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}} // Empty function for individual card focus
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
            <TVChannelsRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Continue Watching"
              items={continueWatching}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}} // Empty function for individual card focus
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
         
            <SportRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}