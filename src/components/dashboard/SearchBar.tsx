'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 p-8 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Search Hashtags</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Discover trending hashtags and boost your content reach</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for hashtags, keywords, or topics..."
            className="w-full px-4 py-4 pl-12 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md group-hover:border-purple-300 placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Search
        </button>
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Clear
          </button>
        )}
      </form>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="text-sm font-medium text-gray-600 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Popular searches:
        </span>
        {['viral', 'trending', 'dance', 'comedy', 'fyp'].map((term) => (
          <button
            key={term}
            onClick={() => {
              setQuery(term);
              onSearch(term);
            }}
            className="px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-gray-200 hover:border-purple-200"
          >
            #{term}
          </button>
        ))}
      </div>
    </div>
  );
}