import { NextRequest, NextResponse } from 'next/server';
import { sampleHashtags } from '@/lib/seed-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const region = searchParams.get('region') || 'global';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Filter sample data based on search query and parameters
    let filteredHashtags = sampleHashtags.filter(hashtag => {
      const matchesQuery = hashtag.tag.toLowerCase().includes(query.toLowerCase()) ||
        hashtag.relatedTags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      if (!matchesQuery) return false;
      
      if (category && category !== 'all' && hashtag.category !== category) {
        return false;
      }
      
      if (region !== 'global' && hashtag.region !== region && hashtag.region !== 'global') {
        return false;
      }
      
      return true;
    });

    // Sort by viral score and views
    filteredHashtags.sort((a, b) => {
      if (b.viralScore !== a.viralScore) {
        return b.viralScore - a.viralScore;
      }
      return b.views - a.views;
    });

    // Add mock IDs to sample data
    const hashtagsWithIds = filteredHashtags.map((hashtag, index) => ({
      ...hashtag,
      _id: `search_${index + 1}`,
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
    console.error('Error searching hashtags:', error);
    return NextResponse.json(
      { error: 'Failed to search hashtags' },
      { status: 500 }
    );
  }
}