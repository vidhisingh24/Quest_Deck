export type SubjectCategory = 
  | 'Networking' 
  | 'Cybersecurity' 
  | 'Web Dev' 
  | 'Operating Systems' 
  | 'AI & Algorithms' 
  | 'Database Systems' 
  | 'Cloud & DevOps' 
  | 'Mobile App Dev';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  lastStudyDate: string;
  careerGoal: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyStudyTime: number; // minutes
  learningStyle: string;
  interests: string[];
  isOnboarded: boolean;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: SubjectCategory;
  description: string;
  level: number;
  xpReward: number;
  coinReward: number;
  estimatedMinutes: number;
  status: 'completed' | 'unlocked' | 'locked';
  icon: string;
  prerequisites: string[];
}

export interface MissionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  nextStepId?: string;
}

export interface MissionStep {
  id: string;
  title: string;
  description: string;
  systemContext: string;
  choices: MissionChoice[];
}

export interface InteractiveMission {
  id: string;
  title: string;
  topic: SubjectCategory;
  tagline: string;
  description: string;
  xpReward: number;
  coinReward: number;
  durationMinutes: number;
  steps: MissionStep[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  aiExplanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'Streaks' | 'Missions' | 'Mastery' | 'XP';
}

export interface DailyQuest {
  id: string;
  title: string;
  rewardXp: number;
  rewardCoins: number;
  progress: number;
  maxProgress: number;
  isClaimed: boolean;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  costCoins: number;
  icon: string;
  category: 'Booster' | 'Streak' | 'AvatarFrame' | 'Certificate';
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface WeeklyStudyStat {
  day: string;
  xp: number;
  minutes: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}
