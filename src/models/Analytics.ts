import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  hashtagId: mongoose.Types.ObjectId;
  date: Date;
  views: number;
  engagement: number;
  posts: number;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  hashtagId: {
    type: Schema.Types.ObjectId,
    ref: 'Hashtag',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  engagement: {
    type: Number,
    required: true,
    default: 0,
  },
  posts: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

AnalyticsSchema.index({ hashtagId: 1, date: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);