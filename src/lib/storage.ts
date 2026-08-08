import { UserProfile, RoadmapNode, Achievement } from './types';
import { INITIAL_USER, INITIAL_ROADMAP, INITIAL_ACHIEVEMENTS } from './data';

const STORAGE_KEYS = {
  USER: 'quest_user_profile',
  ROADMAP: 'quest_roadmap_nodes',
  ACHIEVEMENTS: 'quest_achievements',
  AUTH_TOKEN: 'quest_jwt_token',
};

export const getStoredUser = (): UserProfile => {
  if (typeof window === 'undefined') return INITIAL_USER;
  try {
    const item = localStorage.getItem(STORAGE_KEYS.USER);
    return item ? JSON.parse(item) : INITIAL_USER;
  } catch {
    return INITIAL_USER;
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

export const getStoredRoadmap = (): RoadmapNode[] => {
  if (typeof window === 'undefined') return INITIAL_ROADMAP;
  try {
    const item = localStorage.getItem(STORAGE_KEYS.ROADMAP);
    return item ? JSON.parse(item) : INITIAL_ROADMAP;
  } catch {
    return INITIAL_ROADMAP;
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
  
  // Calculate level: level 1 is 0-500, level 2 is 501-1200, level 3 is 1201-2200, level 4 is 2201-3500, etc.
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

  // Unlock next node if present
  if (foundIndex !== -1 && foundIndex + 1 < updated.length) {
    if (updated[foundIndex + 1].status === 'locked') {
      updated[foundIndex + 1].status = 'unlocked';
    }
  }

  setStoredRoadmap(updated);
  return updated;
};
