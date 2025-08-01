'use client';

import { TrendingFilters } from '@/types';

interface FilterPanelProps {
  filters: TrendingFilters;
  onFiltersChange: (filters: TrendingFilters) => void;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'dance', label: 'Dance' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'education', label: 'Education' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'food', label: 'Food' },
  { value: 'travel', label: 'Travel' },
  { value: 'music', label: 'Music' },
  { value: 'tech', label: 'Tech' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'pets', label: 'Pets' },
  { value: 'sports', label: 'Sports' },
];

const regions = [
  { value: 'global', label: 'Global' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

const timeframes = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

const sortOptions = [
  { value: 'viral_score', label: 'Viral Score' },
  { value: 'views', label: 'Views' },
  { value: 'growth', label: 'Growth Rate' },
];

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleFilterChange = (key: keyof TrendingFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            value={filters.region || 'global'}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <select
            value={filters.timeframe || '24h'}
            onChange={(e) => handleFilterChange('timeframe', e.target.value as '24h' | '7d' | '30d')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'viral_score'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as 'views' | 'growth' | 'viral_score')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => onFiltersChange({
              category: 'all',
              region: 'global',
              timeframe: '24h',
              sortBy: 'viral_score',
            })}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}