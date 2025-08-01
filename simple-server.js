const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Sample hashtag data
const sampleHashtags = [
  {
    _id: '1',
    tag: 'fyp',
    category: 'entertainment',
    region: 'global',
    views: 45200000,
    growthRate: 15.5,
    viralScore: 95,
    relatedTags: ['foryou', 'viral', 'trending'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '2',
    tag: 'viral',
    category: 'entertainment',
    region: 'global',
    views: 38900000,
    growthRate: 12.3,
    viralScore: 92,
    relatedTags: ['fyp', 'trending', 'popular'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '3',
    tag: 'dance',
    category: 'dance',
    region: 'global',
    views: 28500000,
    growthRate: 8.7,
    viralScore: 88,
    relatedTags: ['dancing', 'choreography', 'music'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '4',
    tag: 'comedy',
    category: 'comedy',
    region: 'global',
    views: 22100000,
    growthRate: 6.4,
    viralScore: 85,
    relatedTags: ['funny', 'humor', 'memes'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '5',
    tag: 'recipe',
    category: 'food',
    region: 'global',
    views: 18700000,
    growthRate: 9.2,
    viralScore: 82,
    relatedTags: ['cooking', 'food', 'kitchen'],
    trending: true,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: '6',
    tag: 'travel',
    category: 'travel',
    region: 'global',
    views: 15300000,
    growthRate: 5.8,
    viralScore: 78,
    relatedTags: ['vacation', 'adventure', 'explore'],
    trending: true,
    lastUpdated: new Date().toISOString()
  }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/hashtags/trending') {
    res.setHeader('Content-Type', 'application/json');
    
    let filteredHashtags = sampleHashtags.filter(h => h.trending);
    
    // Apply filters
    if (query.category && query.category !== 'all') {
      filteredHashtags = filteredHashtags.filter(h => h.category === query.category);
    }
    
    if (query.region && query.region !== 'global') {
      filteredHashtags = filteredHashtags.filter(h => h.region === query.region);
    }

    // Sort
    const sortBy = query.sortBy || 'viral_score';
    filteredHashtags.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'growth':
          return b.growthRate - a.growthRate;
        default:
          return b.viralScore - a.viralScore;
      }
    });

    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '20');
    const startIndex = (page - 1) * limit;
    const paginatedHashtags = filteredHashtags.slice(startIndex, startIndex + limit);

    res.writeHead(200);
    res.end(JSON.stringify({
      hashtags: paginatedHashtags,
      pagination: {
        page,
        limit,
        total: filteredHashtags.length,
        pages: Math.ceil(filteredHashtags.length / limit)
      }
    }));
    return;
  }

  if (pathname === '/api/hashtags/search') {
    res.setHeader('Content-Type', 'application/json');
    
    const searchQuery = query.query;
    if (!searchQuery) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Search query is required' }));
      return;
    }

    const filteredHashtags = sampleHashtags.filter(hashtag => {
      return hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hashtag.relatedTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    res.writeHead(200);
    res.end(JSON.stringify({
      hashtags: filteredHashtags,
      pagination: {
        page: 1,
        limit: 20,
        total: filteredHashtags.length,
        pages: 1
      }
    }));
    return;
  }

  if (pathname === '/api/ai/recommend' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const videoTitle = data.videoTitle || '';
        
        // Simple AI simulation - return relevant hashtags
        const recommendations = sampleHashtags
          .filter(h => h.viralScore >= 70)
          .slice(0, 5)
          .map(h => ({
            hashtag: h.tag,
            viralScore: h.viralScore,
            category: h.category,
            reasoning: `High viral score (${h.viralScore}/100) with strong engagement trends`
          }));

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
          videoTitle,
          recommendations,
          totalFound: recommendations.length
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Serve the HTML dashboard
  if (pathname === '/' || pathname === '/index.html') {
    fs.readFile(path.join(__dirname, 'demo.html'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(data);
    });
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end('Not Found');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('🚀 TrendTok Server Started!');
  console.log('==========================');
  console.log(`🌐 Dashboard: http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET  /api/hashtags/trending`);
  console.log(`   GET  /api/hashtags/search?query=viral`);
  console.log(`   POST /api/ai/recommend`);
  console.log('');
  console.log('✨ Press Ctrl+C to stop the server');
  console.log('');
});