import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  plan: 'free' | 'pro';
  searchesUsed: number;
  maxSearches: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'pro'],
    default: 'free',
  },
  searchesUsed: {
    type: Number,
    default: 0,
  },
  maxSearches: {
    type: Number,
    default: 10, // free tier limit
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);