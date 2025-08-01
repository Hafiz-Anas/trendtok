# TrendTok - TikTok Hashtag Analytics Platform

TrendTok is a comprehensive web application that helps TikTok creators discover trending hashtags, analyze performance metrics, and receive AI-powered hashtag recommendations to boost their content performance.

## Features

### 🔥 Core Features
- **Trending Hashtags Dashboard**: Real-time trending hashtags with advanced filtering
- **Hashtag Analytics**: Detailed performance metrics with growth charts
- **AI-Powered Recommendations**: Smart hashtag suggestions based on video content
- **Hashtag Tracker**: Bookmark and monitor hashtag performance
- **Search & Discovery**: Advanced search with category and region filters

### 🎯 User Management
- **Freemium Model**: Free tier with limited searches, Pro tier with unlimited access
- **User Dashboard**: Track usage, view saved hashtags, manage alerts
- **CSV Export**: Export analytics data (Pro feature)

### 📊 Analytics & Visualization
- **Growth Charts**: Visualize hashtag performance over time using Recharts
- **Viral Score Metrics**: Proprietary scoring system for hashtag potential
- **Category Analysis**: Performance breakdown by content categories
- **Regional Insights**: Location-based trending data

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Hook Form** for form handling

### Backend
- **Next.js API Routes** for RESTful endpoints
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **OpenAI API** for AI-powered recommendations

### Database Schema
- **Users**: Authentication and subscription management
- **Hashtags**: Core hashtag data with trending metrics
- **Analytics**: Time-series performance data
- **UserAlerts**: Hashtag tracking and notifications

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- OpenAI API key (for AI features)

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd trendtok
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/trendtok
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Hashtags
- `GET /api/hashtags/trending` - Get trending hashtags with filters
- `GET /api/hashtags/search` - Search hashtags by query
- `GET /api/analytics/[id]` - Get detailed analytics for a hashtag

### AI Recommendations
- `POST /api/ai/recommend` - Get AI-powered hashtag recommendations

### User Management
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User authentication
- `GET /api/user/profile` - Get user profile and usage stats

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── hashtags/       # Hashtag endpoints
│   │   ├── analytics/      # Analytics endpoints
│   │   ├── auth/          # Authentication
│   │   └── ai/            # AI recommendations
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── dashboard/         # Dashboard components
│   ├── charts/           # Chart components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── db/               # Database connection
│   ├── auth/             # Authentication utilities
│   ├── ai/               # AI integration
│   └── utils.ts          # Utility functions
├── models/               # Mongoose models
│   ├── User.ts
│   ├── Hashtag.ts
│   ├── Analytics.ts
│   └── UserAlert.ts
└── types/                # TypeScript definitions
    └── index.ts
```

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Component-based architecture

### Database Design
- Optimized indexes for query performance
- Time-series data for analytics
- Flexible schema for hashtag metadata

### Security
- JWT-based authentication
- Input validation and sanitization
- Rate limiting on API endpoints
- No sensitive data in client-side code

## Deployment

### Environment Variables
Ensure all required environment variables are set:
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Build and Deploy
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
