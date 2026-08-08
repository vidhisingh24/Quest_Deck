'use client';

import React from 'react';
import { Flame, Zap, Coins, Award, User, LogOut } from 'lucide-react';
import { UserProfile } from '@/lib/types';

interface XPHeaderProps {
  user: UserProfile;
  onOpenLeaderboard: () => void;
  onLogout: () => void;
}

export const XPHeader: React.FC<XPHeaderProps> = ({ user, onOpenLeaderboard, onLogout }) => {
  // Level threshold calculation: Level 1 (0-600), Level 2 (600-1200), Level 3 (1200-1800), Level 4 (1800-2400)
  const currentLevelMinXp = (user.level - 1) * 600;
  const nextLevelXp = user.level * 600;
  const xpInCurrentLevel = Math.max(0, user.xp - currentLevelMinXp);
  const xpRequiredForLevel = nextLevelXp - currentLevelMinXp;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpRequiredForLevel) * 100));

  return (
    <div className="bg-white border-b border-warm-200 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Level & Progress */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-warm-50 px-3 py-1.5 rounded-full border border-warm-200">
            <span className="w-6 h-6 rounded-full bg-sky text-white font-extrabold text-xs flex items-center justify-center">
              {user.level}
            </span>
            <span className="text-xs font-extrabold text-warm-900">Level {user.level}</span>
          </div>

          {/* XP Bar */}
          <div className="hidden sm:block w-44">
            <div className="flex justify-between text-[10px] font-bold text-warm-500 mb-1">
              <span>{user.xp} XP</span>
              <span>{nextLevelXp} XP</span>
            </div>
            <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky to-sage-deep rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Gamification Badges (Streak, Coins, Leaderboard) */}
        <div className="flex items-center gap-3">
          {/* Flame Streak */}
          <div 
            title="Daily Learning Streak"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-light/70 border border-coral/30 text-coral-dark text-xs font-bold shadow-sm"
          >
            <Flame className="w-4 h-4 fill-coral text-coral animate-bounce" />
            <span>{user.streak} Day Streak</span>
          </div>

          {/* Coins */}
          <div 
            title="Quest Coins Balance"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light/80 border border-accent-dark/30 text-warm-900 text-xs font-bold shadow-sm"
          >
            <Coins className="w-4 h-4 text-accent-dark" />
            <span>{user.coins} Coins</span>
          </div>

          {/* Leaderboard CTA */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-warm-50 hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-sky" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 rounded-full text-warm-400 hover:text-coral hover:bg-warm-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
