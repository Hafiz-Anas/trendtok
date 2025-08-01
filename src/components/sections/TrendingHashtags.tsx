'use client';

import { HashtagData } from '@/data/mockData';
import HashtagCard from '@/components/ui/HashtagCard';

interface TrendingHashtagsProps {
  hashtags: HashtagData[];
  onHashtagClick: (hashtag: HashtagData) => void;
}

export default function TrendingHashtags({ hashtags, onHashtagClick }: TrendingHashtagsProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 Trending Hashtags</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Most popular hashtags right now</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Updated {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hashtags.map((hashtag) => (
          <HashtagCard
            key={hashtag.id}
            hashtag={hashtag}
            onClick={() => onHashtagClick(hashtag)}
          />
        ))}
      </div>
      
      {hashtags.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No trending hashtags found for the selected filters.</p>
        </div>
      )}
    </section>
  );
}