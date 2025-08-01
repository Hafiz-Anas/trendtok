import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Hashtag from '@/models/Hashtag';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { videoTitle, category } = await request.json();

    if (!videoTitle) {
      return NextResponse.json(
        { error: 'Video title is required' },
        { status: 400 }
      );
    }

    const filters: any = {};
    if (category && category !== 'all') {
      filters.category = category;
    }

    const trendingHashtags = await Hashtag.find({
      ...filters,
      trending: true,
      viralScore: { $gte: 50 },
    })
      .sort({ viralScore: -1 })
      .limit(20)
      .select('tag category viralScore relatedTags');

    const recommendations = trendingHashtags.map(hashtag => ({
      hashtag: hashtag.tag,
      viralScore: hashtag.viralScore,
      category: hashtag.category,
      reasoning: `High viral score (${hashtag.viralScore}/100) with strong engagement trends`,
    }));

    const keywords = videoTitle.toLowerCase().split(' ');
    const relatedHashtags = await Hashtag.find({
      $or: [
        { tag: { $in: keywords.map(k => new RegExp(k, 'i')) } },
        { relatedTags: { $in: keywords.map(k => new RegExp(k, 'i')) } },
      ],
      viralScore: { $gte: 30 },
    })
      .limit(10)
      .select('tag category viralScore');

    const contextualRecommendations = relatedHashtags.map(hashtag => ({
      hashtag: hashtag.tag,
      viralScore: hashtag.viralScore,
      category: hashtag.category,
      reasoning: `Related to your video content with good viral potential`,
    }));

    const allRecommendations = [...recommendations, ...contextualRecommendations]
      .filter((rec, index, self) => 
        index === self.findIndex(r => r.hashtag === rec.hashtag)
      )
      .sort((a, b) => b.viralScore - a.viralScore)
      .slice(0, 15);

    return NextResponse.json({
      videoTitle,
      recommendations: allRecommendations,
      totalFound: allRecommendations.length,
    });
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}