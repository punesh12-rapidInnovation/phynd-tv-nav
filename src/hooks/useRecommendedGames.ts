import { useState, useEffect, useCallback, useRef } from 'react';
import { gamesApi, type ApiGame, type ApiResponse } from '../lib/api/gamesApi';

export interface RecommendedGame {
  id: string;
  title: string;
  color: string;
  image_url?: string;
  description?: string;
  category?: string;
}

export interface UseRecommendedGamesReturn {
  games: RecommendedGame[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => void;
  currentPage: number;
  error: string | null;
}

// Function to convert API game to display format
const convertApiGameToRecommendedGame = (apiGame: ApiGame, index: number): RecommendedGame => {
  // Generate colors based on game id or index for visual variety
  const colors = ['#714ADD', '#AB8DFF', '#512EB0', '#8B5CF6', '#A855F7', '#9333EA'];
  const color = colors[index % colors.length];

  return {
    id: apiGame.id,
    title: apiGame.name,
    color,
    image_url: apiGame.image_url,
    description: apiGame.description,
    category: apiGame.category,
  };
};

export function useRecommendedGames(limit: number = 12): UseRecommendedGamesReturn {
  const [games, setGames] = useState<RecommendedGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // Initial data load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setGames([]);
    
    try {
      const result: ApiResponse = await gamesApi.fetchTopGames(1, limit);
      const convertedGames = result.data.map((game, index) => 
        convertApiGameToRecommendedGame(game, index)
      );
      
      setGames(convertedGames);
      setHasMore(result.current_page < result.total_page);
    } catch (err) {
      console.error('Failed to load initial recommended games:', err);
      setError('Failed to load recommended games');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || loading) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const nextPage = currentPage + 1;
      const result: ApiResponse = await gamesApi.fetchTopGames(nextPage, limit);
      
      const convertedGames = result.data.map((game, index) => 
        convertApiGameToRecommendedGame(game, games.length + index)
      );
      
      setGames(prev => [...prev, ...convertedGames]);
      setHasMore(result.current_page < result.total_page);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error('Failed to load more recommended games:', err);
      setError('Failed to load more games');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [currentPage, hasMore, limit, games.length, loading]);

  const reset = useCallback(() => {
    setGames([]);
    setCurrentPage(1);
    setHasMore(true);
    setLoading(false);
    setError(null);
    loadingRef.current = false;
  }, []);

  return {
    games,
    loading,
    hasMore,
    loadMore,
    reset,
    currentPage,
    error
  };
}