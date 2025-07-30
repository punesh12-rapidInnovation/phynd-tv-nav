import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '../index';
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

const liveEvents = [
  { title: 'NBA Finals Live', color: '#E74C3C' },
  { title: 'Premier League', color: '#27AE60' },
  { title: 'Champions League', color: '#3498DB' },
  { title: 'NFL Sunday', color: '#8E44AD' },
  { title: 'Tennis Open', color: '#F39C12' },
  { title: 'Formula 1 Race', color: '#E67E22' },
];

const highlights = [
  { title: 'Best Goals 2024', color: '#2ECC71' },
  { title: 'Amazing Saves', color: '#3498DB' },
  { title: 'Top 10 Dunks', color: '#E74C3C' },
  { title: 'Fastest Runs', color: '#F39C12' },
  { title: 'Epic Comebacks', color: '#9B59B6' },
  { title: 'Record Breakers', color: '#1ABC9C' },
];

export function SportsPage() {
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
            <SportRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <ContentRow
              title="Live Events"
              assets={liveEvents}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
            <ContentRow
              title="Highlights"
              assets={highlights}
              onAssetPress={onAssetPress}
              onFocus={onRowFocus}
            />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}