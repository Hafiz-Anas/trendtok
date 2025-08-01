export interface User {
  _id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  searchesUsed: number;
  maxSearches: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hashtag {
  _id: string;
  tag: string;
  category: string;
  region: string;
  views: number;
  growthRate: number;
  viralScore: number;
  relatedTags: string[];
  trending: boolean;
  lastUpdated: string;
}

export interface Analytics {
  _id: string;
  hashtagId: string;
  date: string;
  views: number;
  engagement: number;
  posts: number;
}

export interface UserAlert {
  _id: string;
  userId: string;
  hashtagId: string;
  isActive: boolean;
  createdAt: string;
}

export interface TrendingFilters {
  category?: string;
  region?: string;
  timeframe?: '24h' | '7d' | '30d';
  sortBy?: 'views' | 'growth' | 'viral_score';
}

export interface AIRecommendation {
  hashtag: string;
  viralScore: number;
  reasoning: string;
  category: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  region?: string;
  page?: number;
  limit?: number;
}