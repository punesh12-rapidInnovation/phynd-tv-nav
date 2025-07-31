import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable, type FocusableComponentLayout, type FocusDetails, type KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';
import { Asset } from '../ui/Asset';

const TrendingRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const TrendingRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const TrendingRowScrollingWrapper = styled.div`
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

const TrendingRowScrollingContent = styled.div`
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

interface ApiAsset {
  id: number;
  title: string;
  color: string;
}

interface TrendingRowProps {
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

// Mock API function to simulate fetching data
const fetchTrendingAssets = async (page: number): Promise<{ data: ApiAsset[], hasMore: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const itemsPerPage = 10;
  const totalItems = 50; // Simulate 50 total items
  const startIndex = (page - 1) * itemsPerPage;
  
  const data: ApiAsset[] = Array.from({ length: itemsPerPage }, (_, index) => {
    const id = startIndex + index + 1;
    return {
      id,
      title: `Trending Item ${id}`,
      color: `hsl(${(id * 25) % 360}, 70%, 50%)`
    };
  });
  
  const hasMore = startIndex + itemsPerPage < totalItems;
  
  return { data, hasMore };
};

export function TrendingRow({ onFocus }: TrendingRowProps) {
  const [assets, setAssets] = useState<ApiAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollingRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const { ref, focusKey } = useFocusable({
    onFocus,
    saveLastFocusedChild: false,
    preferredChildFocusKey: 'Trending Item 1-1'
  });

  // Initial data load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const result = await fetchTrendingAssets(1);
      setAssets(result.data);
      setHasMore(result.hasMore);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoading(true);
    
    try {
      const result = await fetchTrendingAssets(currentPage + 1);
      setAssets(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      const scrollContainer = scrollingRef.current;
      if (!scrollContainer) return;

      // Scroll to show the focused item
      scrollContainer.scrollTo({
        left: x ,
        behavior: 'smooth'
      });

      // Check if we're near the end and need to load more data
      const scrollLeft = x - 60;
      const containerWidth = scrollContainer.clientWidth;
      const scrollWidth = scrollContainer.scrollWidth;
      
      // Load more when we're within 2 items of the end
      const threshold = scrollWidth - containerWidth - (428 + 32) * 2; // 2 items worth of space
      
      if (scrollLeft >= threshold && hasMore && !loading) {
        loadMoreData();
      }
    },
    [hasMore, loading, loadMoreData]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <TrendingRowWrapper ref={ref}>
        <TrendingRowTitle>Trending</TrendingRowTitle>
        <TrendingRowScrollingWrapper ref={scrollingRef}>
          <TrendingRowScrollingContent>
            {assets.map((asset, index) => (
              <Asset
                index={asset.id}
                title={asset.title}
                key={`Trending-${asset.id}`}
                color={asset.color}
                onFocus={onAssetFocus}
              />
            ))}
            {loading && (
              <LoadingIndicator>
                Loading more...
              </LoadingIndicator>
            )}
          </TrendingRowScrollingContent>
        </TrendingRowScrollingWrapper>
      </TrendingRowWrapper>
    </FocusContext.Provider>
  );
}