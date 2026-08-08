'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Zap, Coins, ArrowLeft, CheckCircle2, Trophy } from 'lucide-react';
import { INITIAL_DAILY_QUESTS } from '@/lib/data';
import { getStoredUser, addXpAndCoins, setStoredUser } from '@/lib/storage';
import { Navbar } from '@/components/landing/Navbar';
import { sounds } from '@/lib/soundEngine';

export default function QuestsPage() {
  const router = useRouter();
  const [user, setUser] = useState(() => getStoredUser());
  const [quests, setQuests] = useState(INITIAL_DAILY_QUESTS);

  const handleClaim = (questId: string) => {
    sounds.playXpGain();
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.isClaimed) return;

    const { user: updatedUser } = addXpAndCoins(quest.rewardXp, quest.rewardCoins);
    setUser(updatedUser);

    setQuests(prev => prev.map(q => q.id === questId ? { ...q, isClaimed: true } : q));
  };

  const handleBack = () => {
    sounds.playClick();
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      <Navbar
        user={user}
        onOpenAuth={() => {}}
        onNavigate={(view) => {
          if (view === 'landing') router.push('/');
          if (view === 'roadmap') router.push('/roadmap');
          if (view === 'dashboard') router.push('/dashboard');
        }}
        onReplayIntro={() => router.push('/')}
        onOpenSearch={() => {}}
        onOpenFlashcards={() => router.push('/flashcards')}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-extrabold transition-all cursor-pointer shadow-card"
          >
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky text-white font-extrabold flex items-center justify-center">
              Q
            </div>
            <span className="font-extrabold text-warm-900 text-lg">Daily Quests</span>
          </div>
        </div>

        <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-3">
              <Target className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-warm-900">Daily Learning Challenges</h1>
            <p className="text-xs sm:text-sm text-warm-600 mt-1">Complete micro-challenges to claim daily XP and Coin multipliers</p>
          </div>

          <div className="space-y-4">
            {quests.map((q) => {
              const isReadyToClaim = q.progress >= q.maxProgress && !q.isClaimed;

              return (
                <div key={q.id} className="p-5 rounded-2xl border border-warm-200 bg-warm-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-extrabold text-warm-900">{q.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-extrabold mt-2">
                      <span className="text-sky flex items-center gap-1"><Zap className="w-4 h-4 fill-sky" />+{q.rewardXp} XP</span>
                      <span className="text-amber-700 flex items-center gap-1"><Coins className="w-4 h-4" />+{q.rewardCoins} Coins</span>
                      <span className="text-warm-500 font-bold">Progress: {q.progress}/{q.maxProgress}</span>
                    </div>
                  </div>

                  {q.isClaimed ? (
                    <span className="px-4 py-2 rounded-full bg-sage-light text-sage-deep font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Claimed
                    </span>
                  ) : isReadyToClaim ? (
                    <button
                      onClick={() => handleClaim(q.id)}
                      className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all animate-bounce cursor-pointer"
                    >
                      🎁 Claim Reward!
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/roadmap')}
                      className="px-4 py-2 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      Start Challenge
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
