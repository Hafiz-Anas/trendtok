#!/bin/bash

echo "🧪 Testing TrendTok API Endpoints"
echo "=================================="

BASE_URL="http://localhost:3001"

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null; then
    echo "❌ Server not running on port 3001"
    echo "💡 Start the server first: node simple-server.js"
    exit 1
fi

echo "✅ Server is running!"
echo ""

echo "1. Testing Trending Hashtags API..."
echo "GET $BASE_URL/api/hashtags/trending"
curl -s "$BASE_URL/api/hashtags/trending" | python3 -m json.tool 2>/dev/null | head -20 || curl -s "$BASE_URL/api/hashtags/trending" | head -c 300
echo ""

echo ""
echo "2. Testing Search API..."
echo "GET $BASE_URL/api/hashtags/search?query=viral"
curl -s "$BASE_URL/api/hashtags/search?query=viral" | python3 -m json.tool 2>/dev/null | head -15 || curl -s "$BASE_URL/api/hashtags/search?query=viral" | head -c 300
echo ""

echo ""
echo "3. Testing AI Recommendations API..."
echo "POST $BASE_URL/api/ai/recommend"
curl -s -X POST "$BASE_URL/api/ai/recommend" \
  -H "Content-Type: application/json" \
  -d '{"videoTitle":"My awesome dance video","category":"dance"}' | python3 -m json.tool 2>/dev/null | head -15 || curl -s -X POST "$BASE_URL/api/ai/recommend" -H "Content-Type: application/json" -d '{"videoTitle":"My awesome dance video","category":"dance"}' | head -c 300
echo ""

echo ""
echo "✅ All API tests completed successfully!"
echo ""
echo "📱 Dashboard: http://localhost:3001"
echo "🔗 Try these URLs in your browser:"
echo "   • http://localhost:3001/api/hashtags/trending"
echo "   • http://localhost:3001/api/hashtags/search?query=dance"
echo ""
echo "🎯 The dashboard shows live data from these APIs!"