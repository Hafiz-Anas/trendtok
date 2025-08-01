export const sampleHashtags = [
  {
    tag: "fyp",
    category: "entertainment",
    region: "global",
    views: 45200000,
    growthRate: 15.5,
    viralScore: 95,
    relatedTags: ["foryou", "viral", "trending"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "viral",
    category: "entertainment", 
    region: "global",
    views: 38900000,
    growthRate: 12.3,
    viralScore: 92,
    relatedTags: ["fyp", "trending", "popular"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "dance",
    category: "dance",
    region: "global", 
    views: 28500000,
    growthRate: 8.7,
    viralScore: 88,
    relatedTags: ["dancing", "choreography", "music"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "comedy",
    category: "comedy",
    region: "global",
    views: 22100000,
    growthRate: 6.4,
    viralScore: 85,
    relatedTags: ["funny", "humor", "memes"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "recipe",
    category: "food",
    region: "global",
    views: 18700000,
    growthRate: 9.2,
    viralScore: 82,
    relatedTags: ["cooking", "food", "kitchen"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "travel",
    category: "travel",
    region: "global",
    views: 15300000,
    growthRate: 5.8,
    viralScore: 78,
    relatedTags: ["vacation", "adventure", "explore"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "fitness",
    category: "fitness",
    region: "global",
    views: 12900000,
    growthRate: 7.1,
    viralScore: 75,
    relatedTags: ["workout", "gym", "health"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "fashion",
    category: "fashion",
    region: "global",
    views: 11200000,
    growthRate: 4.3,
    viralScore: 72,
    relatedTags: ["style", "outfit", "ootd"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "gaming",
    category: "gaming", 
    region: "global",
    views: 9800000,
    growthRate: 6.7,
    viralScore: 69,
    relatedTags: ["games", "streamer", "esports"],
    trending: false,
    lastUpdated: new Date()
  },
  {
    tag: "pets",
    category: "pets",
    region: "global",
    views: 8500000,
    growthRate: 3.9,
    viralScore: 66,
    relatedTags: ["animals", "cute", "dogs"],
    trending: false,
    lastUpdated: new Date()
  },
  {
    tag: "diy",
    category: "lifestyle",
    region: "global",
    views: 7200000,
    growthRate: 5.2,
    viralScore: 63,
    relatedTags: ["crafts", "handmade", "tutorial"],
    trending: false,
    lastUpdated: new Date()
  },
  {
    tag: "music",
    category: "music",
    region: "global",
    views: 6800000,
    growthRate: 4.1,
    viralScore: 60,
    relatedTags: ["song", "artist", "sound"],
    trending: false,
    lastUpdated: new Date()
  },
  {
    tag: "beauty",
    category: "beauty",
    region: "us",
    views: 5900000,
    growthRate: 8.3,
    viralScore: 71,
    relatedTags: ["makeup", "skincare", "tutorial"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "tech",
    category: "tech",
    region: "global",
    views: 5200000,
    growthRate: 12.1,
    viralScore: 74,
    relatedTags: ["technology", "gadgets", "review"],
    trending: true,
    lastUpdated: new Date()
  },
  {
    tag: "education",
    category: "education",
    region: "global",
    views: 4100000,
    growthRate: 7.8,
    viralScore: 68,
    relatedTags: ["learning", "tutorial", "howto"],
    trending: false,
    lastUpdated: new Date()
  }
];

export function generateAnalyticsData(hashtagId: string) {
  const days = 30;
  const data = [];
  const baseViews = Math.floor(Math.random() * 100000) + 50000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variance = (Math.random() - 0.5) * 0.3;
    const growth = 1 + variance;
    const dayViews = Math.floor(baseViews * growth * (1 + Math.random() * 0.5));
    
    data.push({
      hashtagId,
      date,
      views: dayViews,
      engagement: Math.floor(dayViews * 0.05 * (1 + Math.random() * 0.5)),
      posts: Math.floor(dayViews * 0.001 * (1 + Math.random()))
    });
  }
  
  return data;
}