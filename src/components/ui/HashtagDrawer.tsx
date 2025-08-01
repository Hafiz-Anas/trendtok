'use client';

import { useState, useEffect } from 'react';
import { HashtagData, VideoThumbnail } from '@/data/mockData';
import TrendChart from './TrendChart';
import VideoModal from './VideoModal';

interface HashtagDrawerProps {
  hashtag: HashtagData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HashtagDrawer({ hashtag, isOpen, onClose }: HashtagDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoThumbnail | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 800);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleVideoClick = (video: VideoThumbnail) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  if (!isVisible || !hashtag) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with fade animation */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`} 
        onClick={handleClose} 
      />
      
      {/* Drawer with slide animation */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl transform transition-all duration-700 ease-out overflow-y-auto md:w-2xl ${
        isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Header with enhanced styling */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-sm">#</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">#{hashtag.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Detailed Analytics</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Stats with staggered animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-800 ease-out hover:scale-105 hover:shadow-xl ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: isAnimating ? '400ms' : '0ms' }}>
              <div className="text-2xl font-bold">{formatNumber(hashtag.views)}</div>
              <div className="text-sm opacity-90 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Total Views
              </div>
            </div>
            <div className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-800 ease-out hover:scale-105 hover:shadow-xl ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: isAnimating ? '550ms' : '0ms' }}>
              <div className="text-2xl font-bold">{hashtag.growthRate > 0 ? '+' : ''}{hashtag.growthRate.toFixed(1)}%</div>
              <div className="text-sm opacity-90 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Growth Rate
              </div>
            </div>
            <div className={`bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-800 ease-out hover:scale-105 hover:shadow-xl ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: isAnimating ? '700ms' : '0ms' }}>
              <div className="text-2xl font-bold">{hashtag.viralScore}/100</div>
              <div className="text-sm opacity-90 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Viral Score
              </div>
            </div>
            <div className={`bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-800 ease-out hover:scale-105 hover:shadow-xl ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: isAnimating ? '850ms' : '0ms' }}>
              <div className="text-2xl font-bold">{formatNumber(hashtag.estimatedReach)}</div>
              <div className="text-sm opacity-90 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Est. Reach
              </div>
            </div>
          </div>

          {/* Growth Chart */}
          {hashtag.weeklyGrowth && hashtag.weeklyGrowth.length > 0 && (
            <TrendChart data={hashtag.weeklyGrowth} />
          )}

          {/* Engagement Stats */}
          <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out ${
            isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: isAnimating ? '1000ms' : '0ms' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Engagement Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-xl font-bold text-pink-600 dark:text-pink-400">{formatNumber(hashtag.engagementStats.likes)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Likes</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(hashtag.engagementStats.comments)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Comments</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">{formatNumber(hashtag.engagementStats.shares)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Shares</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{hashtag.engagementStats.likesCommentsRatio.toFixed(1)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">L/C Ratio</div>
              </div>
            </div>
          </div>

          {/* Related Hashtags */}
          <div className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out ${
            isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`} style={{ transitionDelay: isAnimating ? '1150ms' : '0ms' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Related Hashtags
            </h3>
            <div className="flex flex-wrap gap-2">
              {hashtag.relatedTags.map((tag, index) => (
                <button
                  key={index}
                  className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-800 dark:hover:text-pink-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Top Videos Section */}
          <div className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out ${ 
            isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: isAnimating ? '1200ms' : '0ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Top Trending Videos
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                {hashtag.topVideos.length} videos
              </span>
            </div>

            {hashtag.topVideos && hashtag.topVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hashtag.topVideos.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="group cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => handleVideoClick(video)}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src={video.thumbnail || `https://picsum.photos/160/90?random=${video.id}`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/160/90?random=${Math.random()}`;
                        }}
                      />
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-200">
                        <div className="w-12 h-12 bg-white bg-opacity-0 group-hover:bg-opacity-95 rounded-full flex items-center justify-center transform transition-all duration-200 group-hover:scale-100 scale-75">
                          <svg className="w-6 h-6 text-gray-800 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Duration badge */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration || '0:15'}
                      </div>
                      
                      {/* Ranking badge */}
                      <div className="absolute top-2 left-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-bold text-xs">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {video.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                        <span className="font-medium truncate mr-1">{video.creator}</span>
                        <span className="flex-shrink-0">{formatNumber(video.views)}</span>
                      </div>
                      
                      {/* Performance indicator */}
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((video.views / 1000000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">No videos available for this hashtag</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600 transform transition-all duration-700 ease-out ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: isAnimating ? '1300ms' : '0ms' }}>
            <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save to Favorites
              </div>
            </button>
            <button className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Analytics
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={handleVideoModalClose}
      />
    </div>
  );
}