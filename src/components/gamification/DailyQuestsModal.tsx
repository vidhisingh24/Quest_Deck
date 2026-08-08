'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Zap, Coins } from 'lucide-react';
import { INITIAL_DAILY_QUESTS } from '@/lib/data';
import { DailyQuest } from '@/lib/types';

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (quest: DailyQuest) => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({ isOpen, onClose, onClaim }) => {
  const [quests, setQuests] = useState<DailyQuest[]>(INITIAL_DAILY_QUESTS);

  if (!isOpen) return null;

  const handleClaimQuest = (id: string) => {
    const updated = quests.map((q) => {
      if (q.id === id) {
        onClaim(q);
        return { ...q, isClaimed: true };
      }
      return q;
    });
    setQuests(updated);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white border border-warm-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-warm-900">Daily Quests</h3>
            <p className="text-xs text-warm-500 mt-1">Complete daily goals to earn bonus XP & Coins</p>
          </div>

          <div className="space-y-3">
            {quests.map((q) => {
              const isCompleted = q.progress >= q.maxProgress;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    q.isClaimed
                      ? 'bg-sage-light/30 border-sage/40 opacity-70'
                      : isCompleted
                      ? 'bg-sky-light/40 border-sky shadow-sm'
                      : 'bg-warm-50/50 border-warm-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-warm-900">{q.title}</h4>
                    <div className="flex items-center gap-3 text-xs font-bold text-warm-500 mt-1">
                      <span className="flex items-center gap-1 text-sky">
                        <Zap className="w-3.5 h-3.5 fill-sky" />+{q.rewardXp} XP
                      </span>
                      <span className="flex items-center gap-1 text-accent-dark">
                        <Coins className="w-3.5 h-3.5" />+{q.rewardCoins} Coins
                      </span>
                    </div>
                  </div>

                  {q.isClaimed ? (
                    <span className="pill-badge pill-sage text-[10px]">CLAIMED</span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleClaimQuest(q.id)}
                      className="px-3.5 py-1.5 rounded-full bg-sky hover:bg-sky-dark text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Claim
                    </button>
                  ) : (
                    <span className="text-xs font-mono font-bold text-warm-400">
                      {q.progress}/{q.maxProgress}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
