import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { MoviesRow } from '../components/content/MoviesRow';
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

const actionMovies = [
  { title: 'Fast & Furious', color: '#FF4757' },
  { title: 'John Wick', color: '#2F3542' },
  { title: 'Mission Impossible', color: '#FF6348' },
  { title: 'Die Hard', color: '#FF7675' },
  { title: 'Mad Max', color: '#FDCB6E' },
  { title: 'The Matrix', color: '#00B894' },
];

const comedyMovies = [
  { title: 'The Hangover', color: '#FDCB6E' },
  { title: 'Superbad', color: '#E17055' },
  { title: 'Anchorman', color: '#74B9FF' },
  { title: 'Step Brothers', color: '#A29BFE' },
  { title: 'Dumb and Dumber', color: '#FD79A8' },
  { title: 'Zoolander', color: '#00CEC9' },
];

export function MoviesPage() {
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
            <MoviesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Action Movies"
              items={actionMovies}
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
              title="Comedy Movies"
              items={comedyMovies}
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