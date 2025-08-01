'use client';

import { useState, useMemo } from 'react';
import { 
  trendingHashtags, 
  risingHashtags, 
  fallingHashtags, 
  aiRecommendations, 
  bestTimeData,
  categories,
  regions,
  HashtagData 
} from '@/data/mockData';

import Navbar from '@/components/ui/Navbar';
import FilterDropdown from '@/components/ui/FilterDropdown';
import TrendingHashtags from '@/components/sections/TrendingHashtags';
import HashtagInsights from '@/components/sections/HashtagInsights';
import AIRecommendations from '@/components/sections/AIRecommendations';
import HashtagDrawer from '@/components/ui/HashtagDrawer';
import HeroSection from '@/components/ui/HeroSection';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedHashtag, setSelectedHashtag] = useState<HashtagData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredTrendingHashtags = useMemo(() => {
    return trendingHashtags.filter(hashtag => {
      const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
      const matchesRegion = selectedRegion === 'global' || hashtag.region === selectedRegion;
      return matchesCategory && matchesRegion;
    });
  }, [selectedCategory, selectedRegion]);

  const filteredRisingHashtags = useMemo(() => {
    return risingHashtags.filter(hashtag => {
      const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
      const matchesRegion = selectedRegion === 'global' || hashtag.region === selectedRegion;
      return matchesCategory && matchesRegion;
    });
  }, [selectedCategory, selectedRegion]);

  const filteredFallingHashtags = useMemo(() => {
    return fallingHashtags.filter(hashtag => {
      const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
      const matchesRegion = selectedRegion === 'global' || hashtag.region === selectedRegion;
      return matchesCategory && matchesRegion;
    });
  }, [selectedCategory, selectedRegion]);

  const handleHashtagClick = (hashtag: HashtagData) => {
    setSelectedHashtag(hashtag);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedHashtag(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore detailed insights, filter trends, and get AI-powered recommendations.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FilterDropdown
                  label="Category"
                  value={selectedCategory}
                  options={categories}
                  onChange={setSelectedCategory}
                  placeholder="All Categories"
                />
                <FilterDropdown
                  label="Region"
                  value={selectedRegion}
                  options={regions}
                  onChange={setSelectedRegion}
                  placeholder="Global"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>Live data</span>
              </div>
              <div>
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Trending Now Card */}
          <div className="relative bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 dark:from-pink-600 dark:via-pink-700 dark:to-rose-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {filteredTrendingHashtags.length}
                  </div>
                  <div className="text-sm text-white/90 font-medium">Trending Now</div>
                  <div className="text-xs text-white/70 mt-1">Active hashtags</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Rising Trends Card */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 dark:from-emerald-600 dark:via-green-700 dark:to-teal-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {filteredRisingHashtags.length}
                  </div>
                  <div className="text-sm text-white/90 font-medium">Rising Trends</div>
                  <div className="text-xs text-white/70 mt-1">Growing fast</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Viral Score Card */}
          <div className="relative bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 dark:from-violet-600 dark:via-purple-700 dark:to-indigo-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {Math.round(
                      filteredTrendingHashtags.reduce((acc, h) => acc + h.viralScore, 0) / 
                      (filteredTrendingHashtags.length || 1)
                    )}
                  </div>
                  <div className="text-sm text-white/90 font-medium">Avg Viral Score</div>
                  <div className="text-xs text-white/70 mt-1">Out of 100</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions Card */}
          <div className="relative bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-600 dark:via-blue-700 dark:to-indigo-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {aiRecommendations.length}
                  </div>
                  <div className="text-sm text-white/90 font-medium">AI Suggestions</div>
                  <div className="text-xs text-white/70 mt-1">Ready to use</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <TrendingHashtags 
          hashtags={filteredTrendingHashtags}
          onHashtagClick={handleHashtagClick}
        />

        {/* AI Recommendations - After Trending Cards */}
        <AIRecommendations
          recommendations={aiRecommendations}
        />

        <HashtagInsights
          risingHashtags={filteredRisingHashtags}
          fallingHashtags={filteredFallingHashtags}
          bestTimeData={bestTimeData}
          selectedRegion={selectedRegion}
          onHashtagClick={handleHashtagClick}
        />

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700 mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} TrendTok. All rights reserved.
          </p>
        </div>
      </div>

      {/* Hashtag Detail Drawer */}
      <HashtagDrawer
        hashtag={selectedHashtag}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}