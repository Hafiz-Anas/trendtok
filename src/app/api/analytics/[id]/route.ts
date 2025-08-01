import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Analytics from '@/models/Analytics';
import Hashtag from '@/models/Hashtag';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const hashtag = await Hashtag.findById(params.id);
    if (!hashtag) {
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      );
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = await Analytics.find({
      hashtagId: params.id,
      date: { $gte: startDate },
    })
      .sort({ date: 1 })
      .select('-__v');

    const chartData = analytics.map(item => ({
      date: item.date.toISOString().split('T')[0],
      views: item.views,
      engagement: item.engagement,
      posts: item.posts,
    }));

    const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);
    const totalEngagement = analytics.reduce((sum, item) => sum + item.engagement, 0);
    const totalPosts = analytics.reduce((sum, item) => sum + item.posts, 0);

    const summary = {
      hashtag: hashtag.tag,
      category: hashtag.category,
      viralScore: hashtag.viralScore,
      growthRate: hashtag.growthRate,
      relatedTags: hashtag.relatedTags,
      totalViews,
      totalEngagement,
      totalPosts,
      averageViews: Math.round(totalViews / analytics.length) || 0,
      averageEngagement: Math.round(totalEngagement / analytics.length) || 0,
    };

    return NextResponse.json({
      summary,
      chartData,
    });
  } catch (error) {
    console.error('Error fetching hashtag analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}