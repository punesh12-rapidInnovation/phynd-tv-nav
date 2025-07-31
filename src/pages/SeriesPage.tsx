import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { SeriesRow } from '../components/content/SeriesRow';
import { ContentRow } from '../components/content/ContentRow';
import { Asset } from '../components/ui/Asset';

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

const netflixSeries = [
  { title: 'Stranger Things', color: '#E74C3C' },
  { title: 'The Crown', color: '#F39C12' },
  { title: 'Ozark', color: '#2C3E50' },
  { title: 'House of Cards', color: '#8E44AD' },
  { title: 'Narcos', color: '#27AE60' },
  { title: 'Black Mirror', color: '#34495E' },
];

const hboSeries = [
  { title: 'Game of Thrones', color: '#2C3E50' },
  { title: 'The Sopranos', color: '#8E44AD' },
  { title: 'Breaking Bad', color: '#27AE60' },
  { title: 'True Detective', color: '#E67E22' },
  { title: 'Westworld', color: '#3498DB' },
  { title: 'The Wire', color: '#95A5A6' },
];

export function SeriesPage() {
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
            <SeriesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Netflix Originals"
              items={netflixSeries}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
            <ContentRow
              title="HBO Series"
              items={hboSeries}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}