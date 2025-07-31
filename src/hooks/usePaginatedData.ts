import { useState, useEffect, useCallback, useRef } from 'react';

export interface PaginatedItem {
  id: number;
  title: string;
  color: string;
}

export interface PaginatedResponse {
  data: PaginatedItem[];
  hasMore: boolean;
}

export interface UsePaginatedDataOptions {
  apiEndpoint: string;
  itemsPerPage?: number;
  totalItems?: number;
  initialLoad?: boolean;
}

export interface UsePaginatedDataReturn {
  data: PaginatedItem[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => void;
  currentPage: number;
}

// Mock API function that can be customized for different endpoints
const fetchPaginatedData = async (
  endpoint: string,
  page: number,
  itemsPerPage: number = 10,
  totalItems: number = 50
): Promise<PaginatedResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const startIndex = (page - 1) * itemsPerPage;
  
  // Generate different data based on endpoint
  const data: PaginatedItem[] = Array.from({ length: itemsPerPage }, (_, index) => {
    const id = startIndex + index + 1;
    let title = '';
    let hueOffset = 0;
    
    switch (endpoint) {
      case 'trending':
        title = `Trending Item ${id}`;
        hueOffset = 25;
        break;
      case 'popular':
        title = `Popular Item ${id}`;
        hueOffset = 45;
        break;
      case 'new-releases':
        title = `New Release ${id}`;
        hueOffset = 65;
        break;
      case 'recommended':
        title = `Recommended ${id}`;
        hueOffset = 85;
        break;
      default:
        title = `Item ${id}`;
        hueOffset = 0;
    }
    
    return {
      id,
      title,
      color: `hsl(${(id * hueOffset) % 360}, 70%, 50%)`
    };
  });
  
  const hasMore = startIndex + itemsPerPage < totalItems;
  
  return { data, hasMore };
};

export function usePaginatedData({
  apiEndpoint,
  itemsPerPage = 10,
  totalItems = 50,
  initialLoad = true
}: UsePaginatedDataOptions): UsePaginatedDataReturn {
  const [data, setData] = useState<PaginatedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const loadingRef = useRef(false);

  // Initial data load
  useEffect(() => {
    if (initialLoad) {
      loadInitialData();
    }
  }, [apiEndpoint, initialLoad]);

  const loadInitialData = async () => {
    setLoading(true);
    setCurrentPage(1);
    setData([]);
    
    try {
      const result = await fetchPaginatedData(apiEndpoint, 1, itemsPerPage, totalItems);
      setData(result.data);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(`Failed to load initial data from ${apiEndpoint}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoading(true);
    
    try {
      const nextPage = currentPage + 1;
      const result = await fetchPaginatedData(apiEndpoint, nextPage, itemsPerPage, totalItems);
      
      setData(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error(`Failed to load more data from ${apiEndpoint}:`, error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [apiEndpoint, currentPage, hasMore, itemsPerPage, totalItems]);

  const reset = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setLoading(false);
    loadingRef.current = false;
  }, []);

  return {
    data,
    loading,
    hasMore,
    loadMore,
    reset,
    currentPage
  };
}