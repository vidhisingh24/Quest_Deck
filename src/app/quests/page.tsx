'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Zap, Coins, ArrowLeft } from 'lucide-react';
import { INITIAL_DAILY_QUESTS } from '@/lib/data';
import { getStoredUser } from '@/lib/storage';
import { Navbar } from '@/components/landing/Navbar';

export default function QuestsPage() {
  const user = getStoredUser();

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      <Navbar
        user={user}
        onOpenAuth={() => {}}
        onNavigate={() => {}}
        onReplayIntro={() => {}}
        onOpenSearch={() => {}}
        onOpenFlashcards={() => {}}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200">
          <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all shadow-card">
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky text-white font-extrabold flex items-center justify-center">
              Q
            </div>
            <span className="font-extrabold text-warm-900 text-lg">Daily Quests</span>
          </div>
        </div>

        <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-3">
              <Target className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-warm-900">Daily Learning Challenges</h1>
            <p className="text-sm text-warm-500 mt-1">Complete daily quests to claim bonus XP and Coins</p>
          </div>

          <div className="space-y-4">
            {INITIAL_DAILY_QUESTS.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl border border-warm-200 bg-warm-50/50 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-warm-900">{q.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold mt-2">
                    <span className="text-sky flex items-center gap-1"><Zap className="w-4 h-4 fill-sky" />+{q.rewardXp} XP</span>
                    <span className="text-accent-dark flex items-center gap-1"><Coins className="w-4 h-4" />+{q.rewardCoins} Coins</span>
                  </div>
                </div>

                <Link href="/" className="px-4 py-2 rounded-full bg-sky text-white font-bold text-xs shadow-sm">
                  Complete Quest
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
