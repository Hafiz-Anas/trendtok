import mongoose, { Document, Schema } from 'mongoose';

export interface IHashtag extends Document {
  tag: string;
  category: string;
  region: string;
  views: number;
  growthRate: number;
  viralScore: number;
  relatedTags: string[];
  trending: boolean;
  lastUpdated: Date;
}

const HashtagSchema = new Schema<IHashtag>({
  tag: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['entertainment', 'dance', 'comedy', 'education', 'lifestyle', 'beauty', 'fitness', 'food', 'travel', 'music', 'tech', 'gaming', 'fashion', 'pets', 'sports'],
  },
  region: {
    type: String,
    required: true,
    enum: ['global', 'us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'jp', 'kr', 'in', 'br', 'mx'],
    default: 'global',
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  growthRate: {
    type: Number,
    required: true,
    default: 0,
  },
  viralScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
  relatedTags: [{
    type: String,
  }],
  trending: {
    type: Boolean,
    default: false,
    index: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

HashtagSchema.index({ trending: 1, viralScore: -1 });
HashtagSchema.index({ category: 1, region: 1 });

export default mongoose.models.Hashtag || mongoose.model<IHashtag>('Hashtag', HashtagSchema);