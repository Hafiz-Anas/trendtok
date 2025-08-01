'use client';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-pink-600">Trend</span>
                <span className="text-black">Tok</span>
              </h1>
            </div>
            <div className="hidden md:block ml-8">
              <p className="text-sm text-gray-600">
                Discover trending hashtags and boost your TikTok performance
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700 transition-colors">
              Get Pro
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}