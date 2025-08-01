#!/bin/bash

# TrendTok Server Startup Script
echo "🚀 Starting TrendTok Development Server..."

# Check if port 3001 is available
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use. Trying port 3002..."
    export PORT=3002
else
    export PORT=3001
fi

# Start the simple Node.js server (works without npm dependencies)
echo "🌐 Server will be available at http://localhost:${PORT}"
echo "📱 Dashboard: http://localhost:${PORT}"
echo "🔗 API Endpoints:"
echo "   - GET /api/hashtags/trending"
echo "   - GET /api/hashtags/search?query=viral"
echo "   - POST /api/ai/recommend"
echo ""
echo "✨ Press Ctrl+C to stop the server"
echo ""

node simple-server.js