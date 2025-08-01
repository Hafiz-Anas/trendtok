'use client';

import { useState, useEffect } from 'react';
import { AIRecommendation } from '@/data/mockData';
import ViralScoreCard from '@/components/ui/ViralScoreCard';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

// Predefined hashtag suggestions based on common content types
const contentTypeHashtags = {
  'fitness': ['#workout', '#gym', '#fitness', '#health', '#strong', '#motivation', '#fitlife', '#exercise'],
  'food': ['#cooking', '#recipe', '#foodie', '#yummy', '#delicious', '#chef', '#kitchen', '#homemade'],
  'travel': ['#travel', '#wanderlust', '#explore', '#vacation', '#adventure', '#nature', '#beautiful', '#trip'],
  'dance': ['#dance', '#dancechallenge', '#viral', '#trending', '#fyp', '#moves', '#choreography', '#music'],
  'comedy': ['#funny', '#comedy', '#humor', '#laugh', '#meme', '#viral', '#entertainment', '#fun'],
  'lifestyle': ['#lifestyle', '#daily', '#vibe', '#aesthetic', '#selfcare', '#routine', '#mood', '#life'],
  'tech': ['#tech', '#technology', '#innovation', '#gadgets', '#review', '#tutorial', '#tips', '#future'],
  'beauty': ['#beauty', '#makeup', '#skincare', '#cosmetics', '#tutorial', '#glam', '#style', '#selfcare'],
  'pets': ['#pets', '#dog', '#cat', '#cute', '#animals', '#petlife', '#adorable', '#furry'],
  'music': ['#music', '#song', '#singing', '#cover', '#musician', '#artist', '#melody', '#sound']
};

const detectContentType = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [type, keywords] of Object.entries({
    'fitness': ['workout', 'gym', 'exercise', 'fitness', 'training', 'muscle', 'cardio', 'yoga'],
    'food': ['recipe', 'cooking', 'food', 'meal', 'kitchen', 'chef', 'delicious', 'eat', 'taste'],
    'travel': ['travel', 'trip', 'vacation', 'explore', 'adventure', 'visit', 'destination', 'journey'],
    'dance': ['dance', 'choreography', 'moves', 'dancing', 'rhythm', 'ballet', 'hip hop'],
    'comedy': ['funny', 'comedy', 'humor', 'joke', 'laugh', 'hilarious', 'entertaining'],
    'lifestyle': ['morning', 'routine', 'daily', 'lifestyle', 'vibe', 'aesthetic', 'self care'],
    'tech': ['tech', 'technology', 'gadget', 'review', 'unboxing', 'tutorial', 'software'],
    'beauty': ['makeup', 'beauty', 'skincare', 'cosmetics', 'lipstick', 'foundation', 'skincare'],
    'pets': ['pet', 'dog', 'cat', 'puppy', 'kitten', 'animal', 'cute pet'],
    'music': ['music', 'song', 'singing', 'cover', 'musician', 'guitar', 'piano']
  })) {
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      return type;
    }
  }
  
  return 'lifestyle'; // default
};

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [contentType, setContentType] = useState<string>('');

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisSteps([]);
    setGeneratedHashtags([]);
    setSelectedHashtags([]);
    
    // Detect content type
    const detectedType = detectContentType(inputValue);
    setContentType(detectedType);
    
    // Simulate realistic AI processing with steps
    const steps = [
      'Analyzing content context...',
      'Identifying key themes and topics...',
      'Searching trending hashtag database...',
      'Calculating viral potential scores...',
      'Generating personalized recommendations...'
    ];
    
    // Show analysis steps progressively
    for (let i = 0; i < steps.length; i++) {
      setTimeout(() => {
        setAnalysisSteps(prev => [...prev, steps[i]]);
      }, (i + 1) * 400);
    }
    
    // Generate hashtags based on content
    setTimeout(() => {
      const baseHashtags = contentTypeHashtags[detectedType as keyof typeof contentTypeHashtags] || contentTypeHashtags.lifestyle;
      const additionalHashtags = ['#viral', '#fyp', '#trending', '#explore', '#content', '#creator', '#amazing', '#mustwatch'];
      
      // Mix base hashtags with additional ones
      const suggested = [...baseHashtags.slice(0, 6), ...additionalHashtags.slice(0, 4)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
      
      setGeneratedHashtags(suggested);
      setIsAnalyzing(false);
      setShowRecommendations(true);
    }, 2200);
  };
  
  const toggleHashtagSelection = (hashtag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(hashtag) 
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag]
    );
  };
  
  const copySelectedHashtags = () => {
    const hashtagText = selectedHashtags.join(' ');
    navigator.clipboard.writeText(hashtagText);
    // You could add a toast notification here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <section className="mb-12">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
          <div className="relative w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
          AI Hashtag Generator
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transform your content description into viral hashtags with our advanced AI algorithm
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Real-time Analysis</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span>Viral Score Prediction</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
            <span>Content-Aware</span>
          </div>
        </div>
      </div>

      {/* Enhanced Input Section */}
      <div className="relative">
        <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-2xl dark:shadow-gray-900/50 backdrop-blur-sm overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="content-input" className="block text-lg font-bold text-gray-800 dark:text-white flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
                    Describe Your Content
                  </label>
                  {contentType && (
                    <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full font-medium capitalize">
                      {contentType} detected
                    </span>
                  )}
                </div>
                
                <div className="relative group">
                  <textarea
                    id="content-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your video content in detail... e.g., 'Morning workout routine with dumbbell exercises at home gym, focusing on upper body strength training for beginners'"
                    className="w-full px-6 py-4 h-32 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-900/50 focus:border-pink-400 dark:focus:border-pink-500 transition-all duration-300 shadow-sm hover:shadow-md group-hover:border-pink-300 disabled:bg-gray-50 disabled:text-gray-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white resize-none"
                    disabled={isAnalyzing}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                    {inputValue.length}/500
                  </div>
                </div>
                
                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Quick ideas:</span>
                  {['Morning workout routine', 'Quick pasta recipe', 'Travel vlog in Paris', 'Makeup tutorial'].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputValue(suggestion)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 px-3 py-1 rounded-full transition-colors duration-200"
                      disabled={isAnalyzing}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-end lg:w-48">
                <button
                  onClick={handleAnalyze}
                  disabled={!inputValue.trim() || isAnalyzing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 group"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate</span>
                    </div>
                  )}
                </button>
                
                {inputValue.trim() && !isAnalyzing && (
                  <div className="mt-3 text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Ready to generate hashtags
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Analysis Progress */}
        {isAnalyzing && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <div className="relative">
                <svg className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 ml-3">
                AI Analysis in Progress
              </h3>
            </div>
            
            <div className="space-y-2">
              {analysisSteps.map((step, index) => (
                <div key={index} className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  {step}
                </div>
              ))}
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(analysisSteps.length / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 text-center">
                {Math.round((analysisSteps.length / 5) * 100)}% Complete
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Results Section */}
      {showRecommendations && inputValue && generatedHashtags.length > 0 && (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    Analysis Complete!
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Generated {generatedHashtags.length} optimized hashtags for your {contentType} content
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowRecommendations(false);
                  setGeneratedHashtags([]);
                  setSelectedHashtags([]);
                  setInputValue('');
                }}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
              >
                Start Over
              </button>
            </div>
            
            <div className="text-sm text-green-700 dark:text-green-300">
              <strong>Content Analysis:</strong> "{inputValue.slice(0, 100)}{inputValue.length > 100 ? '...' : ''}"
            </div>
          </div>

          {/* Generated Hashtags Grid */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              AI-Generated Hashtags
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {generatedHashtags.map((hashtag, index) => {
                const isSelected = selectedHashtags.includes(hashtag);
                const viralScore = Math.floor(Math.random() * 30) + 70; // Generate realistic scores
                
                return (
                  <div
                    key={index}
                    onClick={() => toggleHashtagSelection(hashtag)}
                    className={`relative cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 ${
                      isSelected 
                        ? 'ring-2 ring-purple-500 scale-105' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-500'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {hashtag}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${
                          isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          Viral Score
                        </span>
                        <span className={`text-sm font-bold ${
                          isSelected ? 'text-white' : 'text-purple-600 dark:text-purple-400'
                        }`}>
                          {viralScore}/100
                        </span>
                      </div>
                      
                      {/* Mini score bar */}
                      <div className={`mt-2 h-1 rounded-full ${
                        isSelected ? 'bg-white/30' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <div 
                          className={`h-1 rounded-full transition-all duration-500 ${
                            isSelected ? 'bg-white' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${viralScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selection Summary & Copy */}
            {selectedHashtags.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-bold text-purple-800 dark:text-purple-200">
                    Selected Hashtags ({selectedHashtags.length})
                  </h5>
                  <div className="flex space-x-2">
                    <button
                      onClick={copySelectedHashtags}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy All
                    </button>
                    <button
                      onClick={() => setSelectedHashtags([])}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="text-purple-800 dark:text-purple-200 font-mono text-sm">
                    {selectedHashtags.join(' ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pro Tips & Strategy Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
              <h4 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Pro Tips
              </h4>
              <div className="space-y-3 text-sm text-orange-700 dark:text-orange-300">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Optimal Mix:</strong> Use 3-5 high-scoring hashtags (80+) with 3-5 medium ones (60-80)</div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Stay Relevant:</strong> Choose hashtags that truly match your content theme</div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Test & Iterate:</strong> Try different combinations and track performance</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                Growth Strategy
              </h4>
              <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Post Timing:</strong> Share during peak hours (6-9 PM) for maximum reach</div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Engagement:</strong> Respond to comments quickly to boost algorithmic ranking</div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong>Consistency:</strong> Use similar hashtag patterns across your content series</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Default State */}
      {!showRecommendations && !inputValue && (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="relative inline-block mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Go Viral?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Describe your content above and watch our AI create hashtags that get results
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">AI-Powered</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Smart suggestions based on content analysis</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Viral Scores</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Real-time performance predictions</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Personalized</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tailored to your content style</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700">
              ✨ Join 10,000+ creators already using AI hashtags
            </div>
          </div>
        </div>
      )}
    </section>
  );
}