'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Settings } from 'lucide-react';
import { getStoredUser, setStoredUser } from '@/lib/storage';
import { Navbar } from '@/components/landing/Navbar';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
];

export default function ProfilePage() {
  const [user, setUser] = useState(getStoredUser());
  const [name, setName] = useState(user.name);
  const [careerGoal, setCareerGoal] = useState(user.careerGoal);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      careerGoal,
      avatar: selectedAvatar,
    };
    setStoredUser(updated);
    setUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

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
            <span className="font-extrabold text-warm-900 text-lg">Student Profile</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card text-center">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-3xl object-cover mx-auto mb-4 border-2 border-sky shadow-sm" />
            <h2 className="text-xl font-extrabold text-warm-900">{user.name}</h2>
            <p className="text-xs text-warm-500 font-semibold mt-0.5">{user.email}</p>

            <div className="mt-4 pt-4 border-t border-warm-200 space-y-2">
              <span className="pill-badge pill-sky text-xs font-bold w-full justify-center">Level {user.level} Quest Master</span>
              <span className="pill-badge pill-sage text-xs font-bold w-full justify-center">{user.careerGoal}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-warm-200 text-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">XP</p>
                <p className="text-sm font-extrabold text-sky">{user.xp}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Streak</p>
                <p className="text-sm font-extrabold text-coral">{user.streak}d</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Coins</p>
                <p className="text-sm font-extrabold text-accent-dark">{user.coins}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
            <h3 className="text-xl font-bold text-warm-900 mb-1 flex items-center gap-2">
              <Settings className="w-5 h-5 text-sky" />
              <span>Profile Settings</span>
            </h3>
            <p className="text-xs text-warm-500 mb-6">Update your avatar, full name, and career mastery goal</p>

            {isSaved && (
              <div className="mb-4 p-3 rounded-xl bg-sage-light border border-sage text-sage-deep text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-mint" />
                <span>Profile changes saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-warm-700 mb-2">Change Avatar</label>
                <div className="flex items-center gap-4">
                  {AVATARS.map((imgUrl) => (
                    <img
                      key={imgUrl}
                      src={imgUrl}
                      alt="Avatar option"
                      onClick={() => setSelectedAvatar(imgUrl)}
                      className={`w-12 h-12 rounded-2xl object-cover cursor-pointer border-2 transition-all ${
                        selectedAvatar === imgUrl ? 'border-sky scale-110 shadow-sm' : 'border-transparent opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-warm-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-warm-700 mb-1">Target Career Goal</label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all cursor-pointer mt-4"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
