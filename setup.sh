#!/bin/bash

echo "🚀 TrendTok Setup Script"
echo "========================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📋 Creating environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "⚠️  Please update .env.local with your actual values:"
    echo "   - MONGODB_URI: Your MongoDB connection string"
    echo "   - OPENAI_API_KEY: Your OpenAI API key (for AI recommendations)"
else
    echo "✅ .env.local already exists"
fi

# Check if MongoDB is accessible (optional)
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    echo "✅ MongoDB CLI (mongosh) is available"
elif command -v mongo &> /dev/null; then
    echo "✅ MongoDB CLI (mongo) is available"
else
    echo "⚠️  MongoDB CLI not found. Make sure MongoDB is installed and running."
    echo "   You can use MongoDB Atlas (cloud) or install MongoDB locally."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your MongoDB URI and API keys"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For demo purposes, the app will work with sample data even without MongoDB."