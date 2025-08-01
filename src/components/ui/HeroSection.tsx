'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Trending', 'Viral', 'Popular', 'Rising'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Attractive Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes with animations */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-32 left-40 w-2 h-2 bg-pink-500 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-60 right-32 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-40 left-16 w-2 h-2 bg-blue-400 rounded-full opacity-35 animate-ping delay-1000"></div>
        <div className="absolute bottom-60 right-20 w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-16 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-ping delay-3000"></div>
        
        {/* Decorative squares and triangles */}
        <div className="absolute top-24 right-1/4 w-4 h-4 bg-gradient-to-br from-purple-300 to-pink-300 opacity-20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-gradient-to-br from-blue-300 to-indigo-300 opacity-25 rotate-12 animate-pulse delay-1000"></div>
        
        {/* Plus signs */}
        <div className="absolute top-40 left-1/3 text-purple-400 opacity-20 text-xl animate-pulse delay-2000">+</div>
        <div className="absolute bottom-48 right-1/3 text-pink-400 opacity-25 text-lg animate-pulse delay-1000">+</div>
        
        {/* Check marks */}
        <div className="absolute top-1/3 left-10 text-green-400 opacity-30 text-2xl animate-bounce delay-3000">✓</div>
        <div className="absolute bottom-1/4 right-10 text-emerald-400 opacity-25 text-xl animate-bounce delay-2000">✓</div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] bg-[size:40px_40px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(71,85,105,0.15)_1px,transparent_0)]"></div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200 dark:via-purple-800 to-transparent opacity-40"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-200 dark:via-pink-800 to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900 to-transparent opacity-20"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Brand */}
        <div className="mb-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TrendTok Analytics
          </h1>
        </div>

        {/* Main Headline */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Discover{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                {words[currentWord]}
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform scale-x-0 animate-scale-x"></div>
            </span>
            <br />
            Hashtags
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Boost your TikTok performance with AI-powered hashtag analytics, 
            real-time trends, and personalized recommendations that drive engagement.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Analyzing
            </div>
          </button>
          
          <button className="group px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl">
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </div>
          </button>
        </div>

        {/* Stats with enhanced visual design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">10M+</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs font-medium">Hashtags Analyzed</div>
          </div>
          <div className="text-center bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-1">500K+</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs font-medium">Creators Trust Us</div>
          </div>
          <div className="text-center bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-1">98%</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs font-medium">Accuracy Rate</div>
          </div>
          <div className="text-center bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-1">24/7</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs font-medium">Real-time Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
}