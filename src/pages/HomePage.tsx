import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '../index';
import { RecommendedRow } from '../components/content/RecommendedRow';
import { MoviesRow } from '../components/content/MoviesRow';
import { SeriesRow } from '../components/content/SeriesRow';
import { TVChannelsRow } from '../components/content/TVChannelsRow';
import { SportRow } from '../components/content/SportRow';
import { ContentRow } from '../components/content/ContentRow';

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

// Additional content data for HomePage
const trendingContent = [
  { title: 'Trending Now 1', color: '#FF6B6B' },
  { title: 'Trending Now 2', color: '#4ECDC4' },
  { title: 'Trending Now 3', color: '#45B7D1' },
  { title: 'Trending Now 4', color: '#96CEB4' },
  { title: 'Trending Now 5', color: '#FFEAA7' },
  { title: 'Trending Now 6', color: '#DDA0DD' },
];

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

export function HomePage() {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusable: true,
    autoRestoreFocus: true,
    trackChildren: true
  });

  // Focus the page when it mounts
  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const onAssetPress = useCallback((asset: object) => {
    // Handle asset press
  }, []);

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
            <RecommendedRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Trending Now"
              assets={trendingContent}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
            <MoviesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="New Releases"
              assets={newReleases}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
            <SeriesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Popular Content"
              assets={popularContent}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
            <TVChannelsRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Continue Watching"
              assets={continueWatching}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
            <SportRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}