export interface HashtagData {
  id: string;
  name: string;
  views: number;
  growthRate: number;
  viralScore: number;
  category: string;
  region: string;
  relatedTags: string[];
  topVideos: VideoThumbnail[];
  weeklyGrowth: GrowthData[];
  engagementStats: EngagementStats;
  status: 'trending' | 'rising' | 'falling';
  estimatedReach: number;
}

export interface VideoThumbnail {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: number;
  videoUrl: string;
  duration: string;
}

export interface GrowthData {
  date: string;
  views: number;
  growth: number;
}

export interface EngagementStats {
  likes: number;
  comments: number;
  shares: number;
  likesCommentsRatio: number;
}

export interface AIRecommendation {
  id: string;
  hashtag: string;
  viralScore: number;
  estimatedReach: number;
  growthTrend: number[];
  category: string;
  reason: string;
}

export interface BestTimeData {
  region: string;
  bestTimes: {
    day: string;
    hours: number[];
  }[];
  engagement: number;
}

// Mock trending hashtags data
export const trendingHashtags: HashtagData[] = [
  {
    id: '1',
    name: 'dancechallenge',
    views: 25400000,
    growthRate: 18.5,
    viralScore: 95,
    category: 'dance',
    region: 'global',
    relatedTags: ['dance', 'viral', 'trending', 'fyp'],
    status: 'trending',
    estimatedReach: 2540000,
    topVideos: [
      {
        id: 'v1',
        thumbnail: 'https://picsum.photos/120/80?random=1',
        title: 'Amazing Dance Moves',
        creator: '@dancer123',
        views: 1200000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:15'
      },
      {
        id: 'v2',
        thumbnail: 'https://picsum.photos/120/80?random=2',
        title: 'Dance Tutorial',
        creator: '@dancepro',
        views: 980000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:23'
      },
      {
        id: 'v3',
        thumbnail: 'https://picsum.photos/120/80?random=3',
        title: 'Dance Battle',
        creator: '@coolmoves',
        views: 850000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:18'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 18200000, growth: 12.3 },
      { date: '2024-01-16', views: 19800000, growth: 8.8 },
      { date: '2024-01-17', views: 21500000, growth: 8.6 },
      { date: '2024-01-18', views: 22900000, growth: 6.5 },
      { date: '2024-01-19', views: 24100000, growth: 5.2 },
      { date: '2024-01-20', views: 24800000, growth: 2.9 },
      { date: '2024-01-21', views: 25400000, growth: 2.4 }
    ],
    engagementStats: {
      likes: 3200000,
      comments: 450000,
      shares: 280000,
      likesCommentsRatio: 7.1
    }
  },
  {
    id: '2',
    name: 'cooking',
    views: 19200000,
    growthRate: 14.2,
    viralScore: 88,
    category: 'food',
    region: 'global',
    relatedTags: ['recipe', 'food', 'kitchen', 'chef'],
    status: 'trending',
    estimatedReach: 1920000,
    topVideos: [
      {
        id: 'v4',
        thumbnail: 'https://picsum.photos/120/80?random=4',
        title: 'Quick Recipe',
        creator: '@chefmaster',
        views: 890000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:25'
      },
      {
        id: 'v5',
        thumbnail: 'https://picsum.photos/120/80?random=5',
        title: 'Cooking Hack',
        creator: '@kitchentips',
        views: 720000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:20'
      },
      {
        id: 'v6',
        thumbnail: 'https://picsum.photos/120/80?random=6',
        title: 'Food Art',
        creator: '@foodartist',
        views: 650000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:30'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 14500000, growth: 8.2 },
      { date: '2024-01-16', views: 15800000, growth: 9.0 },
      { date: '2024-01-17', views: 16900000, growth: 7.0 },
      { date: '2024-01-18', views: 17800000, growth: 5.3 },
      { date: '2024-01-19', views: 18500000, growth: 3.9 },
      { date: '2024-01-20', views: 19000000, growth: 2.7 },
      { date: '2024-01-21', views: 19200000, growth: 1.1 }
    ],
    engagementStats: {
      likes: 2400000,
      comments: 320000,
      shares: 180000,
      likesCommentsRatio: 7.5
    }
  },
  {
    id: '3',
    name: 'travel2024',
    views: 16800000,
    growthRate: 22.1,
    viralScore: 92,
    category: 'travel',
    region: 'global',
    relatedTags: ['travel', 'vacation', 'explore', 'wanderlust'],
    status: 'rising',
    estimatedReach: 1680000,
    topVideos: [
      {
        id: 'v7',
        thumbnail: 'https://picsum.photos/120/80?random=16',
        title: 'Hidden Paradise',
        creator: '@wanderer',
        views: 780000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:32'
      },
      {
        id: 'v8',
        thumbnail: 'https://picsum.photos/120/80?random=17',
        title: 'Travel Tips',
        creator: '@globetrotter',
        views: 620000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:28'
      },
      {
        id: 'v9',
        thumbnail: 'https://picsum.photos/120/80?random=18',
        title: 'Budget Travel',
        creator: '@cheaptravel',
        views: 540000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:24'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 11200000, growth: 15.8 },
      { date: '2024-01-16', views: 12800000, growth: 14.3 },
      { date: '2024-01-17', views: 14100000, growth: 10.2 },
      { date: '2024-01-18', views: 15200000, growth: 7.8 },
      { date: '2024-01-19', views: 15900000, growth: 4.6 },
      { date: '2024-01-20', views: 16400000, growth: 3.1 },
      { date: '2024-01-21', views: 16800000, growth: 2.4 }
    ],
    engagementStats: {
      likes: 2100000,
      comments: 280000,
      shares: 160000,
      likesCommentsRatio: 7.5
    }
  },
  {
    id: '4',
    name: 'comedy',
    views: 14500000,
    growthRate: 9.8,
    viralScore: 85,
    category: 'comedy',
    region: 'global',
    relatedTags: ['funny', 'humor', 'meme', 'laugh'],
    status: 'trending',
    estimatedReach: 1450000,
    topVideos: [
      {
        id: 'v10',
        thumbnail: 'https://picsum.photos/120/80?random=19',
        title: 'Funny Skit',
        creator: '@comedian',
        views: 670000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:35'
      },
      {
        id: 'v11',
        thumbnail: 'https://picsum.photos/120/80?random=20',
        title: 'Comedy Gold',
        creator: '@funnyvideos',
        views: 520000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:22'
      },
      {
        id: 'v12',
        thumbnail: 'https://picsum.photos/120/80?random=21',
        title: 'Hilarious Moments',
        creator: '@laughs',
        views: 480000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:29'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 12800000, growth: 6.2 },
      { date: '2024-01-16', views: 13200000, growth: 3.1 },
      { date: '2024-01-17', views: 13600000, growth: 3.0 },
      { date: '2024-01-18', views: 13900000, growth: 2.2 },
      { date: '2024-01-19', views: 14200000, growth: 2.2 },
      { date: '2024-01-20', views: 14350000, growth: 1.1 },
      { date: '2024-01-21', views: 14500000, growth: 1.0 }
    ],
    engagementStats: {
      likes: 1800000,
      comments: 240000,
      shares: 120000,
      likesCommentsRatio: 7.5
    }
  },
  {
    id: '5',
    name: 'diy',
    views: 12300000,
    growthRate: 16.7,
    viralScore: 82,
    category: 'lifestyle',
    region: 'global',
    relatedTags: ['crafts', 'handmade', 'creative', 'tutorial'],
    status: 'rising',
    estimatedReach: 1230000,
    topVideos: [
      {
        id: 'v13',
        thumbnail: 'https://picsum.photos/120/80?random=22',
        title: 'DIY Room Decor',
        creator: '@craftlover',
        views: 450000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:42'
      },
      {
        id: 'v14',
        thumbnail: 'https://picsum.photos/120/80?random=23',
        title: 'Easy Crafts',
        creator: '@diyqueen',
        views: 380000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:19'
      },
      {
        id: 'v15',
        thumbnail: 'https://picsum.photos/120/80?random=24',
        title: 'Handmade Magic',
        creator: '@craftylife',
        views: 320000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:38'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 9200000, growth: 12.2 },
      { date: '2024-01-16', views: 10100000, growth: 9.8 },
      { date: '2024-01-17', views: 10800000, growth: 6.9 },
      { date: '2024-01-18', views: 11400000, growth: 5.6 },
      { date: '2024-01-19', views: 11900000, growth: 4.4 },
      { date: '2024-01-20', views: 12150000, growth: 2.1 },
      { date: '2024-01-21', views: 12300000, growth: 1.2 }
    ],
    engagementStats: {
      likes: 1500000,
      comments: 200000,
      shares: 95000,
      likesCommentsRatio: 7.5
    }
  },
  {
    id: '6',
    name: 'fitness',
    views: 11800000,
    growthRate: -2.1,
    viralScore: 76,
    category: 'fitness',
    region: 'global',
    relatedTags: ['workout', 'gym', 'health', 'exercise'],
    status: 'falling',
    estimatedReach: 1180000,
    topVideos: [
      {
        id: 'v16',
        thumbnail: 'https://picsum.photos/120/80?random=25',
        title: 'Quick Workout',
        creator: '@fitnessguru',
        views: 420000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:27'
      },
      {
        id: 'v17',
        thumbnail: 'https://picsum.photos/120/80?random=26',
        title: 'Home Gym',
        creator: '@workoutking',
        views: 350000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:33'
      },
      {
        id: 'v18',
        thumbnail: 'https://picsum.photos/120/80?random=27',
        title: 'Fitness Tips',
        creator: '@healthylife',
        views: 290000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:21'
      }
    ],
    weeklyGrowth: [
      { date: '2024-01-15', views: 13200000, growth: -1.2 },
      { date: '2024-01-16', views: 12900000, growth: -2.3 },
      { date: '2024-01-17', views: 12600000, growth: -2.3 },
      { date: '2024-01-18', views: 12300000, growth: -2.4 },
      { date: '2024-01-19', views: 12100000, growth: -1.6 },
      { date: '2024-01-20', views: 11950000, growth: -1.2 },
      { date: '2024-01-21', views: 11800000, growth: -1.3 }
    ],
    engagementStats: {
      likes: 1400000,
      comments: 180000,
      shares: 85000,
      likesCommentsRatio: 7.8
    }
  }
];

// Rising hashtags
export const risingHashtags: HashtagData[] = [
  {
    id: '7',
    name: 'techhacks',
    views: 8200000,
    growthRate: 35.4,
    viralScore: 89,
    category: 'tech',
    region: 'global',
    relatedTags: ['technology', 'tips', 'gadgets', 'innovation'],
    status: 'rising',
    estimatedReach: 820000,
    topVideos: [
      {
        id: 'v7',
        thumbnail: 'https://picsum.photos/120/80?random=7',
        title: 'Tech Innovation',
        creator: '@techguru',
        views: 450000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:35'
      },
      {
        id: 'v8',
        thumbnail: 'https://picsum.photos/120/80?random=8',
        title: 'Gadget Review',
        creator: '@reviewer',
        views: 380000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:28'
      },
      {
        id: 'v9',
        thumbnail: 'https://picsum.photos/120/80?random=9',
        title: 'Future Tech',
        creator: '@futuretech',
        views: 320000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:42'
      }
    ],
    weeklyGrowth: [],
    engagementStats: {
      likes: 980000,
      comments: 140000,
      shares: 75000,
      likesCommentsRatio: 7.0
    }
  },
  {
    id: '8',
    name: 'sustainability',
    views: 6800000,
    growthRate: 28.9,
    viralScore: 86,
    category: 'lifestyle',
    region: 'global',
    relatedTags: ['eco', 'green', 'environment', 'planet'],
    status: 'rising',
    estimatedReach: 680000,
    topVideos: [
      {
        id: 'v10',
        thumbnail: 'https://picsum.photos/120/80?random=10',
        title: 'Eco Living Tips',
        creator: '@ecolife',
        views: 380000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:25'
      },
      {
        id: 'v11',
        thumbnail: 'https://picsum.photos/120/80?random=11',
        title: 'Green Lifestyle',
        creator: '@greenliving',
        views: 290000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:30'
      },
      {
        id: 'v12',
        thumbnail: 'https://picsum.photos/120/80?random=12',
        title: 'Planet Care',
        creator: '@planetcare',
        views: 250000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:20'
      }
    ],
    weeklyGrowth: [],
    engagementStats: {
      likes: 820000,
      comments: 110000,
      shares: 68000,
      likesCommentsRatio: 7.5
    }
  },
  {
    id: '10',
    name: 'mindfulness',
    views: 5400000,
    growthRate: 31.8,
    viralScore: 83,
    category: 'wellness',
    region: 'global',
    relatedTags: ['meditation', 'wellness', 'selfcare', 'mental health'],
    status: 'rising',
    estimatedReach: 540000,
    topVideos: [
      {
        id: 'v16',
        thumbnail: 'https://picsum.photos/120/80?random=16',
        title: 'Daily Meditation',
        creator: '@mindfulmoments',
        views: 320000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:25'
      },
      {
        id: 'v17',
        thumbnail: 'https://picsum.photos/120/80?random=17',
        title: 'Breathing Exercise',
        creator: '@breathewell',
        views: 280000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:15'
      },
      {
        id: 'v18',
        thumbnail: 'https://picsum.photos/120/80?random=18',
        title: 'Mindful Morning',
        creator: '@zenmode',
        views: 240000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:30'
      }
    ],
    weeklyGrowth: [],
    engagementStats: {
      likes: 650000,
      comments: 89000,
      shares: 45000,
      likesCommentsRatio: 7.3
    }
  }
];

// Falling hashtags
export const fallingHashtags: HashtagData[] = [
  {
    id: '9',
    name: 'oldtrend',
    views: 9500000,
    growthRate: -8.2,
    viralScore: 65,
    category: 'entertainment',
    region: 'global',
    relatedTags: ['old', 'past', 'vintage'],
    status: 'falling',
    estimatedReach: 950000,
    topVideos: [
      {
        id: 'v13',
        thumbnail: 'https://picsum.photos/120/80?random=13',
        title: 'Vintage Style',
        creator: '@vintage',
        views: 280000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:18'
      },
      {
        id: 'v14',
        thumbnail: 'https://picsum.photos/120/80?random=14',
        title: 'Retro Vibes',
        creator: '@retro',
        views: 220000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:22'
      },
      {
        id: 'v15',
        thumbnail: 'https://picsum.photos/120/80?random=15',
        title: 'Old School',
        creator: '@oldschool',
        views: 190000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_480_1_5MG.mp4',
        duration: '0:33'
      }
    ],
    weeklyGrowth: [],
    engagementStats: {
      likes: 1100000,
      comments: 160000,
      shares: 52000,
      likesCommentsRatio: 6.9
    }
  },
  {
    id: '11',
    name: 'ice bucket',
    views: 7200000,
    growthRate: -12.5,
    viralScore: 58,
    category: 'challenge',
    region: 'global',
    relatedTags: ['challenge', 'ice', 'charity', 'old challenge'],
    status: 'falling',
    estimatedReach: 720000,
    topVideos: [
      {
        id: 'v19',
        thumbnail: 'https://picsum.photos/120/80?random=19',
        title: 'Ice Challenge Fail',
        creator: '@challenger',
        views: 180000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_640_3MG.mp4',
        duration: '0:12'
      },
      {
        id: 'v20',
        thumbnail: 'https://picsum.photos/120/80?random=20',
        title: 'Cold Water Challenge',
        creator: '@icebreaker',
        views: 150000,
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        duration: '0:08'
      },
      {
        id: 'v21',
        thumbnail: 'https://picsum.photos/120/80?random=21',
        title: 'Charity Challenge',
        creator: '@goodcause',
        views: 120000,
        videoUrl: 'https://file-examples.com/storage/fe86b5c445d75ac5cefb1f8/2017/10/file_example_MP4_1280_10MG.mp4',
        duration: '0:15'
      }
    ],
    weeklyGrowth: [],
    engagementStats: {
      likes: 850000,
      comments: 95000,
      shares: 32000,
      likesCommentsRatio: 8.9
    }
  }
];

// AI Recommendations based on user input
export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'ai1',
    hashtag: 'morningvibes',
    viralScore: 87,
    estimatedReach: 1200000,
    growthTrend: [65, 70, 75, 82, 87],
    category: 'lifestyle',
    reason: 'Perfect for morning content with high engagement rates'
  },
  {
    id: 'ai2',
    hashtag: 'quickrecipe',
    viralScore: 84,
    estimatedReach: 980000,
    growthTrend: [72, 76, 80, 82, 84],
    category: 'food',
    reason: 'Food content performs exceptionally well with tutorials'
  },
  {
    id: 'ai3',
    hashtag: 'workfromhome',
    viralScore: 78,
    estimatedReach: 750000,
    growthTrend: [68, 72, 75, 76, 78],
    category: 'lifestyle',
    reason: 'Remote work content trending among professionals'
  },
  {
    id: 'ai4',
    hashtag: 'petlife',
    viralScore: 91,
    estimatedReach: 1450000,
    growthTrend: [80, 84, 87, 89, 91],
    category: 'pets',
    reason: 'Pet content consistently gets high engagement'
  },
  {
    id: 'ai5',
    hashtag: 'studytips',
    viralScore: 82,
    estimatedReach: 890000,
    growthTrend: [70, 74, 78, 80, 82],
    category: 'education',
    reason: 'Educational content perfect for student audience'
  }
];

// Best time to post data
export const bestTimeData: BestTimeData[] = [
  {
    region: 'North America',
    bestTimes: [
      { day: 'Monday', hours: [9, 12, 15] },
      { day: 'Tuesday', hours: [10, 14, 17] },
      { day: 'Wednesday', hours: [9, 13, 16] },
      { day: 'Thursday', hours: [11, 15, 18] },
      { day: 'Friday', hours: [10, 14, 19] },
      { day: 'Saturday', hours: [12, 16, 20] },
      { day: 'Sunday', hours: [13, 17, 21] }
    ],
    engagement: 85
  },
  {
    region: 'Europe',
    bestTimes: [
      { day: 'Monday', hours: [8, 12, 18] },
      { day: 'Tuesday', hours: [9, 13, 17] },
      { day: 'Wednesday', hours: [8, 14, 19] },
      { day: 'Thursday', hours: [10, 15, 18] },
      { day: 'Friday', hours: [9, 13, 20] },
      { day: 'Saturday', hours: [11, 15, 21] },
      { day: 'Sunday', hours: [12, 16, 20] }
    ],
    engagement: 82
  },
  {
    region: 'Asia Pacific',
    bestTimes: [
      { day: 'Monday', hours: [7, 11, 19] },
      { day: 'Tuesday', hours: [8, 12, 18] },
      { day: 'Wednesday', hours: [7, 13, 20] },
      { day: 'Thursday', hours: [9, 14, 19] },
      { day: 'Friday', hours: [8, 12, 21] },
      { day: 'Saturday', hours: [10, 14, 22] },
      { day: 'Sunday', hours: [11, 15, 20] }
    ],
    engagement: 88
  }
];

// Categories and regions for filtering
export const categories = [
  'all',
  'dance',
  'food',
  'travel',
  'comedy',
  'lifestyle',
  'fitness',
  'tech',
  'pets',
  'education',
  'entertainment'
];

export const regions = [
  'global',
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East',
  'Africa'
];