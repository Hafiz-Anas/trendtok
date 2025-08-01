'use client';

import { GrowthData } from '@/data/mockData';

interface TrendChartProps {
  data: GrowthData[];
  title?: string;
}

export default function TrendChart({ data, title = "7-Day Growth Trend" }: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No trend data available</p>
      </div>
    );
  }

  const maxViews = Math.max(...data.map(d => d.views));
  const minViews = Math.min(...data.map(d => d.views));

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="relative h-48 mb-4">
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="gradient-light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${(i * 25)}%`}
              x2="100%"
              y2={`${(i * 25)}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-200 dark:text-gray-600"
            />
          ))}
          
          {/* Trend line */}
          <polyline
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((point.views - minViews) / (maxViews - minViews)) * 100;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Area fill */}
          <polygon
            points={[
              '0,100',
              ...data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((point.views - minViews) / (maxViews - minViews)) * 100;
                return `${x},${y}`;
              }),
              '100,100'
            ].join(' ')}
            className="dark:hidden"
            fill="url(#gradient-light)"
          />
          <polygon
            points={[
              '0,100',
              ...data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((point.views - minViews) / (maxViews - minViews)) * 100;
                return `${x},${y}`;
              }),
              '100,100'
            ].join(' ')}
            className="hidden dark:block"
            fill="url(#gradient-dark)"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((point.views - minViews) / (maxViews - minViews)) * 100;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill="#ec4899"
                stroke="currentColor"
                strokeWidth="2"
                className="hover:r-6 transition-all text-white dark:text-gray-800"
              />
            );
          })}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        {data.map((point, index) => (
          <span key={index}>
            {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-600">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {((data[data.length - 1].views / 1000000)).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Current Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            +{data[data.length - 1].growth.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Latest Growth</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
            {(((data[data.length - 1].views - data[0].views) / data[0].views) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Growth</div>
        </div>
      </div>
    </div>
  );
}