import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  careerGoal: string;
  skillLevel: string;
  dailyStudyTime: number;
  learningStyle: string;
  interests: string[];
  isOnboarded: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: '' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 10 },
  streak: { type: Number, default: 1 },
  careerGoal: { type: String, default: '' },
  skillLevel: { type: String, default: 'Beginner' },
  dailyStudyTime: { type: Number, default: 30 },
  learningStyle: { type: String, default: 'Interactive Simulators' },
  interests: { type: [String], default: [] },
  isOnboarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
