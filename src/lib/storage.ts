import { UserProfile, RoadmapNode, Achievement } from './types';
import { ALEX_USER, MULTI_SUBJECT_ROADMAPS, INITIAL_ACHIEVEMENTS } from './data';

const STORAGE_KEYS = {
  USER: 'questdeck_user_profile',
  ROADMAP: 'questdeck_roadmap_nodes',
  ROADMAP_MODE: 'questdeck_roadmap_mode', // 'common' | 'personalized'
  ACHIEVEMENTS: 'questdeck_achievements',
  AUTH_TOKEN: 'questdeck_jwt_token',
};

export const getStoredUser = (): UserProfile => {
  if (typeof window === 'undefined') return ALEX_USER;
  try {
    const item = localStorage.getItem(STORAGE_KEYS.USER);
    return item ? JSON.parse(item) : ALEX_USER;
  } catch {
    return ALEX_USER;
  }
};

export const setStoredUser = (user: UserProfile): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
};

export const getStoredRoadmapMode = (): 'common' | 'personalized' => {
  if (typeof window === 'undefined') return 'personalized';
  try {
    const mode = localStorage.getItem(STORAGE_KEYS.ROADMAP_MODE);
    return (mode === 'common' || mode === 'personalized') ? mode : 'personalized';
  } catch {
    return 'personalized';
  }
};

export const setStoredRoadmapMode = (mode: 'common' | 'personalized'): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ROADMAP_MODE, mode);
  } catch (e) {
    console.error('Failed to save roadmap mode:', e);
  }
};

export const getStoredRoadmap = (): RoadmapNode[] => {
  const defaultRoadmap = MULTI_SUBJECT_ROADMAPS['Web Dev'];
  if (typeof window === 'undefined') return defaultRoadmap;
  try {
    const item = localStorage.getItem(STORAGE_KEYS.ROADMAP);
    return item ? JSON.parse(item) : defaultRoadmap;
  } catch {
    return defaultRoadmap;
  }
};

export const setStoredRoadmap = (nodes: RoadmapNode[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(nodes));
  } catch (e) {
    console.error('Failed to save roadmap:', e);
  }
};

export const getStoredAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') return INITIAL_ACHIEVEMENTS;
  try {
    const item = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return item ? JSON.parse(item) : INITIAL_ACHIEVEMENTS;
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const addXpAndCoins = (xpGain: number, coinGain: number): { user: UserProfile; leveledUp: boolean } => {
  const user = getStoredUser();
  const currentXp = user.xp + xpGain;
  const currentCoins = user.coins + coinGain;
  
  const newLevel = Math.floor(currentXp / 600) + 1;
  const leveledUp = newLevel > user.level;

  const updatedUser: UserProfile = {
    ...user,
    xp: currentXp,
    coins: currentCoins,
    level: newLevel,
  };

  setStoredUser(updatedUser);
  return { user: updatedUser, leveledUp };
};

export const completeRoadmapNode = (nodeId: string): RoadmapNode[] => {
  const roadmap = getStoredRoadmap();
  let foundIndex = -1;
  
  const updated = roadmap.map((node, index) => {
    if (node.id === nodeId) {
      foundIndex = index;
      return { ...node, status: 'completed' as const };
    }
    return node;
  });

  if (foundIndex !== -1 && foundIndex + 1 < updated.length) {
    if (updated[foundIndex + 1].status === 'locked') {
      updated[foundIndex + 1].status = 'unlocked';
    }
  }

  setStoredRoadmap(updated);
  return updated;
};
