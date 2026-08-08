'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Zap, ArrowLeft, Crown } from 'lucide-react';
import { INITIAL_LEADERBOARD } from '@/lib/data';
import { getStoredUser } from '@/lib/storage';
import { sounds } from '@/lib/soundEngine';
import { Navbar } from '@/components/landing/Navbar';

export default function LeaderboardPage() {
  const user = getStoredUser();
  const top3 = INITIAL_LEADERBOARD.slice(0, 3);
  const remainingTableRanks = INITIAL_LEADERBOARD.slice(3);

  // Play ambient page entry SFX sound when Leaderboard opens
  useEffect(() => {
    sounds.playLevelUp();
  }, []);

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
          <Link 
            href="/" 
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all shadow-card"
          >
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky text-white font-extrabold flex items-center justify-center">
              Q
            </div>
            <span className="font-extrabold text-warm-900 text-lg">Grand Master League</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="pill-badge pill-yellow text-xs uppercase font-bold tracking-wider mb-2">
            Weekly Global Competition
          </span>
          <h1 className="text-3xl font-extrabold text-warm-900">Student Leaderboard</h1>
          <p className="text-xs text-warm-500 mt-1">Top 3 Champions on Podium • All Ranks (4-8) below</p>
        </div>

        {/* Top 3 Podium Cards (Ranks 1, 2, 3) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 max-w-2xl mx-auto items-end">
          {/* 2nd Place Silver */}
          {top3[1] && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="quest-card p-4 bg-white border border-warm-200 rounded-3xl text-center shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-warm-300 text-white font-extrabold text-xs flex items-center justify-center mx-auto -mt-7 mb-2 shadow-sm border-2 border-white">
                🥈 2
              </div>
              <img src={top3[1].avatar} alt={top3[1].name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2 border-2 border-warm-200" />
              <h3 className="text-xs font-extrabold text-warm-900 truncate">{top3[1].name}</h3>
              <p className="text-[10px] text-warm-500 font-bold mt-0.5">{top3[1].badge}</p>
              <div className="mt-3 pt-2 border-t border-warm-100 flex items-center justify-center gap-1 text-xs font-extrabold text-sky">
                <Zap className="w-3.5 h-3.5 fill-sky" /> {top3[1].xp} XP
              </div>
            </motion.div>
          )}

          {/* 1st Place Gold */}
          {top3[0] && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="quest-card p-5 bg-gradient-to-b from-amber-50/80 via-white to-white border-2 border-amber-300 rounded-3xl text-center shadow-float relative -mt-4">
              <Crown className="w-6 h-6 text-amber-500 fill-amber-400 mx-auto -mt-8 mb-1 animate-bounce" />
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-2 shadow-sm border-2 border-white">
                🥇 1
              </div>
              <img src={top3[0].avatar} alt={top3[0].name} className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border-2 border-amber-400 shadow-sm" />
              <h3 className="text-sm font-extrabold text-warm-900 truncate">{top3[0].name}</h3>
              <span className="pill-badge pill-yellow text-[9px] font-bold mt-0.5">{top3[0].badge}</span>
              <div className="mt-3 pt-2 border-t border-amber-200 flex items-center justify-center gap-1 text-sm font-extrabold text-amber-700">
                <Zap className="w-4 h-4 fill-amber-500" /> {top3[0].xp} XP
              </div>
            </motion.div>
          )}

          {/* 3rd Place Bronze */}
          {top3[2] && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="quest-card p-4 bg-white border border-warm-200 rounded-3xl text-center shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center mx-auto -mt-7 mb-2 shadow-sm border-2 border-white">
                🥉 3
              </div>
              <img src={top3[2].avatar} alt={top3[2].name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2 border-2 border-warm-200" />
              <h3 className="text-xs font-extrabold text-warm-900 truncate">{top3[2].name}</h3>
              <p className="text-[10px] text-warm-500 font-bold mt-0.5">{top3[2].badge}</p>
              <div className="mt-3 pt-2 border-t border-warm-100 flex items-center justify-center gap-1 text-xs font-extrabold text-sky">
                <Zap className="w-3.5 h-3.5 fill-sky" /> {top3[2].xp} XP
              </div>
            </motion.div>
          )}
        </div>

        {/* Ranks 4+ Table */}
        <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
            <span className="text-xs font-bold text-warm-700">All Other League Challengers (Ranks 4-8)</span>
            <span className="pill-badge pill-sky text-[10px]">Weekly Updates</span>
          </div>

          <div className="space-y-2.5">
            {remainingTableRanks.map((itemUser) => (
              <div
                key={itemUser.id}
                onClick={() => sounds.playClick()}
                className="p-3.5 rounded-2xl border border-warm-200 bg-warm-50/50 flex items-center justify-between transition-all hover:bg-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full font-extrabold text-xs flex items-center justify-center bg-warm-200 text-warm-700">
                    #{itemUser.rank}
                  </div>
                  <img
                    src={itemUser.avatar}
                    alt={itemUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-warm-300"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-warm-900">{itemUser.name}</h4>
                    <p className="text-[10px] text-warm-500">{itemUser.badge}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-coral">
                    <Flame className="w-3.5 h-3.5 fill-coral" />
                    <span>{itemUser.streak}d</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-extrabold text-sky">
                    <Zap className="w-3.5 h-3.5 fill-sky" />
                    <span>{itemUser.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
