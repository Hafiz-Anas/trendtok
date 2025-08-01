'use client';

import { AIRecommendation } from '@/data/mockData';

interface ViralScoreCardProps {
  recommendation: AIRecommendation;
}

export default function ViralScoreCard({ recommendation }: ViralScoreCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-emerald-600 bg-emerald-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-900/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs">#</span>
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">#{recommendation.hashtag}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{recommendation.reason}</p>
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold shadow-sm ${getScoreColor(recommendation.viralScore)}`}>
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {recommendation.viralScore}/100
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Estimated Reach:</span>
          </div>
          <span className="text-sm font-bold text-blue-600">{formatNumber(recommendation.estimatedReach)}</span>
        </div>
        
        <div className="flex justify-between items-center bg-purple-50 rounded-lg px-3 py-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Category:</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 capitalize border border-purple-200">
            {recommendation.category}
          </span>
        </div>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Growth Trend:</span>
          <span className="text-sm font-medium text-green-600">
            +{((recommendation.growthTrend[recommendation.growthTrend.length - 1] - recommendation.growthTrend[0]) / recommendation.growthTrend[0] * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="relative h-8">
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              points={recommendation.growthTrend.map((value, index) => {
                const x = (index / (recommendation.growthTrend.length - 1)) * 100;
                const minValue = Math.min(...recommendation.growthTrend);
                const maxValue = Math.max(...recommendation.growthTrend);
                const y = 100 - ((value - minValue) / (maxValue - minValue)) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {recommendation.growthTrend.map((value, index) => {
              const x = (index / (recommendation.growthTrend.length - 1)) * 100;
              const minValue = Math.min(...recommendation.growthTrend);
              const maxValue = Math.max(...recommendation.growthTrend);
              const y = 100 - ((value - minValue) / (maxValue - minValue)) * 100;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="2"
                  fill="#10b981"
                />
              );
            })}
          </svg>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 group-hover:shadow-pink-200">
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Use this Hashtag
        </div>
      </button>
    </div>
  );
}