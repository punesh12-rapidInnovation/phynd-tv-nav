import axiosClient from './axiosClient';

export interface ApiGame {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  category?: string;
}

export interface ApiResponse {
  data: ApiGame[];
  total: number;
  total_page: number;
  current_page: number;
  remaining_pages: number;
}

export interface GamesRequest {
  external_category: string;
  featured_type: string[];
  page: number;
  limit: number;
  game_chain: string[];
  network: string;
}

// Mock data generator for testing
const generateMockGames = (page: number, limit: number): ApiGame[] => {
  const startIndex = (page - 1) * limit;
  return Array.from({ length: limit }, (_, index) => {
    const gameIndex = startIndex + index + 1;
    return {
      id: `game-${gameIndex}`,
      name: `Top Game ${gameIndex}`,
      image_url: `https://picsum.photos/300/400?random=${gameIndex}`,
      description: `This is an amazing game #${gameIndex} with great gameplay and graphics.`,
      category: 'gaming'
    };
  });
};

export const gamesApi = {
  // Fetch games by category with pagination
  async fetchGamesByCategory(request: GamesRequest): Promise<ApiResponse> {
    try {
      const response = await axiosClient.post<ApiResponse>('/game/api/v1/games/category', request);
      return response.data;
    } catch (error) {
      console.error('Error fetching games by category:', error);
      throw error;
    }
  },

  // Fetch recommended games (specific implementation)
  async fetchRecommendedGames(page: number = 1, limit: number = 10): Promise<ApiResponse> {
    const request: GamesRequest = {
      external_category: "gaming",
      featured_type: ["TRENDING_GAMES"],
      page,
      limit,
      game_chain: [],
      network: "WEB3"
    };

    return this.fetchGamesByCategory(request);
  },

  // Fetch top games for recommended row - using dummy data for testing
  async fetchTopGames(page: number = 1, limit: number = 12): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock data
    const mockGames = generateMockGames(page, limit);
    const totalGames = 100; // Simulate 100 total games
    const totalPages = Math.ceil(totalGames / limit);
    
    console.log(`Fetching dummy games - Page ${page}, Limit ${limit}`);
    
    return {
      data: mockGames,
      total: totalGames,
      total_page: totalPages,
      current_page: page,
      remaining_pages: totalPages - page
    };
  },

  // Real API call for top games (commented out for testing)
  async fetchTopGamesReal(page: number = 1, limit: number = 12): Promise<ApiResponse> {
    const request: GamesRequest = {
      external_category: "gaming",
      featured_type: ["TOP_GAMES"],
      page,
      limit,
      game_chain: [],
      network: "WEB3"
    };

    return this.fetchGamesByCategory(request);
  }
};