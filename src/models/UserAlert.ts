import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAlert extends Document {
  userId: mongoose.Types.ObjectId;
  hashtagId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
}

const UserAlertSchema = new Schema<IUserAlert>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  hashtagId: {
    type: Schema.Types.ObjectId,
    ref: 'Hashtag',
    required: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

UserAlertSchema.index({ userId: 1, hashtagId: 1 }, { unique: true });

export default mongoose.models.UserAlert || mongoose.model<IUserAlert>('UserAlert', UserAlertSchema);