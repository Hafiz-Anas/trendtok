import { NextRequest, NextResponse } from 'next/server';
import { sampleHashtags } from '@/lib/seed-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region') || 'global';
    const timeframe = searchParams.get('timeframe') || '24h';
    const sortBy = searchParams.get('sortBy') || 'viral_score';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Filter sample data based on parameters
    let filteredHashtags = sampleHashtags.filter(hashtag => {
      if (category && category !== 'all' && hashtag.category !== category) {
        return false;
      }
      if (region !== 'global' && hashtag.region !== region && hashtag.region !== 'global') {
        return false;
      }
      return hashtag.trending; // Only show trending hashtags
    });

    // Sort based on sortBy parameter
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

    // Add mock IDs to sample data
    const hashtagsWithIds = filteredHashtags.map((hashtag, index) => ({
      ...hashtag,
      _id: `hashtag_${index + 1}`,
    }));

    // Paginate results
    const startIndex = (page - 1) * limit;
    const paginatedHashtags = hashtagsWithIds.slice(startIndex, startIndex + limit);
    const total = hashtagsWithIds.length;

    return NextResponse.json({
      hashtags: paginatedHashtags,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching trending hashtags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending hashtags' },
      { status: 500 }
    );
  }
}