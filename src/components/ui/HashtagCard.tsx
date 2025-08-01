'use client';

import { useState } from 'react';
import { HashtagData, VideoThumbnail } from '@/data/mockData';
import VideoPlayer from './VideoPlayer';
import VideoModal from './VideoModal';

interface HashtagCardProps {
  hashtag: HashtagData;
  onClick: () => void;
}

export default function HashtagCard({ hashtag, onClick }: HashtagCardProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoThumbnail | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleVideoClick = (video: VideoThumbnail) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getGrowthColor = (rate: number) => {
    if (rate > 15) return 'text-green-600';
    if (rate > 0) return 'text-green-500';
    return 'text-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trending':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">🔥 Trending</span>;
      case 'rising':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">📈 Rising</span>;
      case 'falling':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">📉 Falling</span>;
      default:
        return null;
    }
  };

  return (
    <>
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">#</span>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
              {hashtag.name}
            </h3>
          </div>
          {getStatusBadge(hashtag.status)}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {formatNumber(hashtag.views)}
          </div>
          <div className="text-sm text-gray-500 font-medium">views</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Growth:</span>
          <span className={`text-xs font-bold ${getGrowthColor(hashtag.growthRate)}`}>
            {hashtag.growthRate > 0 ? '+' : ''}{hashtag.growthRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Viral Score:</span>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {hashtag.viralScore}/100
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {hashtag.relatedTags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              #{tag}
            </span>
          ))}
          {hashtag.relatedTags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{hashtag.relatedTags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
        <div className="flex space-x-3 justify-center">
          {hashtag.topVideos.slice(0, 3).map((video, index) => (
            <VideoPlayer
              key={video.id}
              video={video}
              index={index}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>
        <div className="mt-3 text-center">
          <button 
            onClick={onClick}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Analytics
            </div>
          </button>
        </div>
      </div>
    </div>
    
    <VideoModal
      video={selectedVideo}
      isOpen={isVideoModalOpen}
      onClose={handleCloseVideoModal}
    />
    </>
  );
}