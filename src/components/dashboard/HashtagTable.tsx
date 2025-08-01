'use client';

import { useState } from 'react';
import { Hashtag } from '@/types';

interface HashtagTableProps {
  hashtags: Hashtag[];
  onBookmark?: (hashtagId: string) => void;
}

export default function HashtagTable({ hashtags, onBookmark }: HashtagTableProps) {
  const [sortBy, setSortBy] = useState<'views' | 'growth' | 'viral_score'>('viral_score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedHashtags = [...hashtags].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'views':
        aValue = a.views;
        bValue = b.views;
        break;
      case 'growth':
        aValue = a.growthRate;
        bValue = b.growthRate;
        break;
      default:
        aValue = a.viralScore;
        bValue = b.viralScore;
    }
    
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (field: 'views' | 'growth' | 'viral_score') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

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

  const getTrendingBadge = (trending: boolean) => {
    return trending ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        🔥 Trending
      </span>
    ) : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hashtag
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('viral_score')}
              >
                Viral Score {sortBy === 'viral_score' && (sortOrder === 'desc' ? '↓' : '↑')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('views')}
              >
                Views {sortBy === 'views' && (sortOrder === 'desc' ? '↓' : '↑')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('growth')}
              >
                Growth {sortBy === 'growth' && (sortOrder === 'desc' ? '↓' : '↑')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Related Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedHashtags.map((hashtag) => (
              <tr key={hashtag._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-900">
                      #{hashtag.tag}
                    </span>
                    {getTrendingBadge(hashtag.trending)}
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
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {hashtag.relatedTags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                    {hashtag.relatedTags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{hashtag.relatedTags.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onBookmark?.(hashtag._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Bookmark
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    View Analytics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}