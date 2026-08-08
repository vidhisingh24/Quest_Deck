'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Flame, Zap, Award } from 'lucide-react';
import { INITIAL_LEADERBOARD } from '@/lib/data';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white border border-warm-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-warm-900">Weekly Quest Leaderboard</h3>
            <p className="text-xs text-warm-500 mt-1">Top learners ranked by weekly XP gains & consistency</p>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {INITIAL_LEADERBOARD.map((user) => (
              <div
                key={user.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  user.isCurrentUser
                    ? 'bg-sky-light/60 border-sky shadow-sm'
                    : 'bg-warm-50/50 border-warm-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full font-extrabold text-xs flex items-center justify-center ${
                      user.rank === 1
                        ? 'bg-accent-dark text-white'
                        : user.rank === 2
                        ? 'bg-warm-400 text-white'
                        : user.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-warm-200 text-warm-700'
                    }`}
                  >
                    #{user.rank}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-warm-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-warm-900 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.isCurrentUser && <span className="pill-badge pill-sky text-[10px]">YOU</span>}
                    </h4>
                    <p className="text-[10px] text-warm-500">{user.badge}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-coral">
                    <Flame className="w-3.5 h-3.5 fill-coral" />
                    <span>{user.streak}d</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-extrabold text-sky">
                    <Zap className="w-3.5 h-3.5 fill-sky" />
                    <span>{user.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
