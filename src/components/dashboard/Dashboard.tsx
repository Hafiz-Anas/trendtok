'use client';

import { useState, useEffect } from 'react';
import { sampleHashtags } from '@/lib/seed-data';

export default function Dashboard() {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TrendingFilters>({
    category: 'all',
    region: 'global',
    timeframe: '24h',
    sortBy: 'viral_score',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHashtags = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.region) {
        params.append('region', filters.region);
      }
      if (filters.timeframe) {
        params.append('timeframe', filters.timeframe);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }

      const endpoint = searchQuery 
        ? `/api/hashtags/search?query=${encodeURIComponent(searchQuery)}&${params.toString()}`
        : `/api/hashtags/trending?${params.toString()}`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch hashtags');
      
      const data = await response.json();
      setHashtags(data.hashtags);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
      setHashtags([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHashtags();
  }, [filters, searchQuery]);

  const handleBookmark = async (hashtagId: string) => {
    console.log('Bookmarking hashtag:', hashtagId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TrendTok Dashboard
          </h1>
          <p className="text-gray-600">
            Discover trending hashtags and boost your TikTok content performance
          </p>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {hashtags.length}
                  </div>
                  <div className="text-sm text-gray-500">Hashtags Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {hashtags.filter(h => h.trending).length}
                  </div>
                  <div className="text-sm text-gray-500">Trending Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {hashtags.filter(h => h.viralScore >= 80).length}
                  </div>
                  <div className="text-sm text-gray-500">High Viral Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(hashtags.reduce((acc, h) => acc + h.viralScore, 0) / hashtags.length) || 0}
                  </div>
                  <div className="text-sm text-gray-500">Avg Viral Score</div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading hashtags...</p>
              </div>
            ) : hashtags.length > 0 ? (
              <HashtagTable
                hashtags={hashtags}
                onBookmark={handleBookmark}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <p className="text-gray-600">
                  {searchQuery ? 'No hashtags found matching your search.' : 'No trending hashtags available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}