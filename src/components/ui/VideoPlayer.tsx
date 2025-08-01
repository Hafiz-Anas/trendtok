'use client';

import { VideoThumbnail } from '@/data/mockData';

interface VideoPlayerProps {
  video: VideoThumbnail;
  index: number;
  onVideoClick: (video: VideoThumbnail) => void;
}

export default function VideoPlayer({ video, index, onVideoClick }: VideoPlayerProps) {

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex-1">
      <div 
        className="relative w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => onVideoClick(video)}
      >
        <img 
          src={video.thumbnail || `https://picsum.photos/120/80?random=${video.id}`}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/120/80?random=${Math.random()}`;
          }}
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-200">
          <div className="w-8 h-8 bg-white bg-opacity-0 group-hover:bg-opacity-95 rounded-full flex items-center justify-center transform transition-all duration-200 group-hover:scale-100 scale-75">
            <svg className="w-4 h-4 text-gray-800 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
          {video.duration || '0:15'}
        </div>
        
        {/* Video number */}
        <div className="absolute top-1.5 left-1.5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full font-semibold text-[10px]">
            #{index + 1}
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-600 dark:text-gray-300 truncate font-medium">
          {video.title}
        </div>
        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {formatNumber(video.views)} views
        </div>
      </div>
    </div>
  );
}