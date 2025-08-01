'use client';

import { HashtagData, BestTimeData } from '@/data/mockData';

interface HashtagInsightsProps {
  risingHashtags: HashtagData[];
  fallingHashtags: HashtagData[];
  bestTimeData: BestTimeData[];
  selectedRegion: string;
  onHashtagClick: (hashtag: HashtagData) => void;
}

export default function HashtagInsights({ 
  risingHashtags, 
  fallingHashtags, 
  bestTimeData, 
  selectedRegion,
  onHashtagClick 
}: HashtagInsightsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getCurrentBestTimes = () => {
    const regionData = bestTimeData.find(data => 
      data.region.toLowerCase() === selectedRegion.toLowerCase()
    ) || bestTimeData[0];
    
    return regionData;
  };

  const bestTimes = getCurrentBestTimes();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Hashtag Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rising Soon */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📈</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rising Soon</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Growing rapidly but not saturated</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {risingHashtags.slice(0, 3).map((hashtag) => (
              <div 
                key={hashtag.id}
                onClick={() => onHashtagClick(hashtag)}
                className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">#{hashtag.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{formatNumber(hashtag.views)} views</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">
                    +{hashtag.growthRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">growth</div>
                </div>
              </div>
            ))}
          </div>
          
          {risingHashtags.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No rising hashtags found</p>
          )}
        </div>

        {/* Falling Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📉</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Falling Trends</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Losing popularity - avoid these</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {fallingHashtags.slice(0, 3).map((hashtag) => (
              <div 
                key={hashtag.id}
                onClick={() => onHashtagClick(hashtag)}
                className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">#{hashtag.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{formatNumber(hashtag.views)} views</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-600">
                    {hashtag.growthRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">decline</div>
                </div>
              </div>
            ))}
          </div>
          
          {fallingHashtags.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No falling trends found</p>
          )}
        </div>

        {/* Best Time to Post */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">⏰</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Best Time to Post</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Optimized for {bestTimes.region}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {bestTimes.bestTimes.slice(0, 4).map((timeSlot, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{timeSlot.day}</span>
                <div className="flex space-x-1">
                  {timeSlot.hours.map((hour, hourIndex) => (
                    <span 
                      key={hourIndex}
                      className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                    >
                      {hour}:00
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
            <div className="text-lg font-bold">{bestTimes.engagement}%</div>
            <div className="text-sm opacity-90">Avg Engagement Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}