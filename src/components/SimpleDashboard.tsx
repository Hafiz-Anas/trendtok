'use client';

import { useState } from 'react';

// Sample data embedded directly
const sampleHashtags = [
  {
    _id: '1',
    tag: 'fyp',
    category: 'entertainment',
    region: 'global',
    views: 45200000,
    growthRate: 15.5,
    viralScore: 95,
    relatedTags: ['foryou', 'viral', 'trending'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '2',
    tag: 'viral',
    category: 'entertainment',
    region: 'global',
    views: 38900000,
    growthRate: 12.3,
    viralScore: 92,
    relatedTags: ['fyp', 'trending', 'popular'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '3',
    tag: 'dance',
    category: 'dance',
    region: 'global',
    views: 28500000,
    growthRate: 8.7,
    viralScore: 88,
    relatedTags: ['dancing', 'choreography', 'music'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '4',
    tag: 'comedy',
    category: 'comedy',
    region: 'global',
    views: 22100000,
    growthRate: 6.4,
    viralScore: 85,
    relatedTags: ['funny', 'humor', 'memes'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '5',
    tag: 'recipe',
    category: 'food',
    region: 'global',
    views: 18700000,
    growthRate: 9.2,
    viralScore: 82,
    relatedTags: ['cooking', 'food', 'kitchen'],
    trending: true,
    lastUpdated: new Date().toISOString()
  }
];

export default function SimpleDashboard() {
  const [hashtags] = useState(sampleHashtags);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredHashtags = hashtags.filter(hashtag => {
    const matchesSearch = hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TrendTok Dashboard
          </h1>
          <p className="text-gray-600">
            Discover trending hashtags and boost your TikTok content performance
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Hashtags</h3>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for hashtags, keywords, or topics..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => console.log('Search:', searchQuery)}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              Search
            </button>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="entertainment">Entertainment</option>
              <option value="dance">Dance</option>
              <option value="comedy">Comedy</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {filteredHashtags.length}
              </div>
              <div className="text-sm text-gray-500">Hashtags Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredHashtags.filter(h => h.trending).length}
              </div>
              <div className="text-sm text-gray-500">Trending Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredHashtags.filter(h => h.viralScore >= 80).length}
              </div>
              <div className="text-sm text-gray-500">High Viral Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(filteredHashtags.reduce((acc, h) => acc + h.viralScore, 0) / filteredHashtags.length) || 0}
              </div>
              <div className="text-sm text-gray-500">Avg Viral Score</div>
            </div>
          </div>
        </div>

        {/* Hashtag Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hashtag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Viral Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHashtags.map((hashtag) => (
                  <tr key={hashtag._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-gray-900">
                          #{hashtag.tag}
                        </span>
                        {hashtag.trending && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(hashtag.viralScore)}`}>
                        {hashtag.viralScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(hashtag.views)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${hashtag.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {hashtag.growthRate >= 0 ? '+' : ''}{hashtag.growthRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {hashtag.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => alert(`Bookmarked #${hashtag.tag}!`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Bookmark
                      </button>
                      <button
                        onClick={() => alert(`Viewing analytics for #${hashtag.tag}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Analytics
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredHashtags.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <p className="text-gray-600">
              No hashtags found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}