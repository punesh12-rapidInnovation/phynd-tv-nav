import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable, type FocusableComponentLayout, type FocusDetails } from '@noriginmedia/norigin-spatial-navigation';
import { Asset } from '../ui/Asset';
import { usePaginatedData } from '../../hooks/usePaginatedData';

const PaginatedRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const PaginatedRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const PaginatedRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const PaginatedRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 428px;
  height: 240px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  color: white;
  font-size: 16px;
`;

interface PaginatedRowProps {
  title: string;
  apiEndpoint: string;
  itemsPerPage?: number;
  totalItems?: number;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function PaginatedRow({ 
  title, 
  apiEndpoint, 
  itemsPerPage = 10, 
  totalItems = 50, 
  onFocus 
}: PaginatedRowProps) {
  const scrollingRef = useRef<HTMLDivElement>(null);
  
  const { data, loading, hasMore, loadMore } = usePaginatedData({
    apiEndpoint,
    itemsPerPage,
    totalItems,
    initialLoad: true
  });

  const { ref, focusKey } = useFocusable({
    onFocus,
    saveLastFocusedChild: false,
    preferredChildFocusKey: `${title}-0`
  });

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      const scrollContainer = scrollingRef.current;
      if (!scrollContainer) return;

      // Scroll to show the focused item
      scrollContainer.scrollTo({
        left: x - 60,
        behavior: 'smooth'
      });

      // Check if we're near the end and need to load more data
      const scrollLeft = x - 60;
      const containerWidth = scrollContainer.clientWidth;
      const scrollWidth = scrollContainer.scrollWidth;
      
      // Load more when we're within 2 items of the end
      const threshold = scrollWidth - containerWidth - (428 + 32) * 2; // 2 items worth of space
      
      if (scrollLeft >= threshold && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <PaginatedRowWrapper ref={ref}>
        <PaginatedRowTitle>{title}</PaginatedRowTitle>
        <PaginatedRowScrollingWrapper ref={scrollingRef}>
          <PaginatedRowScrollingContent>
            {data.map((item, index) => (
              <Asset
                index={item.id}
                title={item.title}
                key={`${title}-${item.id}`}
                color={item.color}
                onFocus={onAssetFocus}
              />
            ))}
            {loading && (
              <LoadingIndicator>
                Loading more...
              </LoadingIndicator>
            )}
          </PaginatedRowScrollingContent>
        </PaginatedRowScrollingWrapper>
      </PaginatedRowWrapper>
    </FocusContext.Provider>
  );
}