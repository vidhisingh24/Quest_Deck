'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { setStoredUser, setAuthToken } from '@/lib/storage';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: name,
        email: email,
        avatar: selectedAvatar,
        level: 1,
        xp: 0,
        coins: 100,
        streak: 1,
        lastStudyDate: new Date().toISOString(),
        careerGoal: 'Full Stack Engineer',
        skillLevel: 'Beginner',
        dailyStudyTime: 30,
        learningStyle: 'Interactive Simulators',
        interests: ['Networking', 'Cybersecurity'],
        isOnboarded: false, // Forces onboarding!
      };

      setStoredUser(newUser);
      setAuthToken(`jwt_mock_token_${Date.now()}`);
      // Redirect directly to the dedicated full-page /onboarding route!
      router.push('/onboarding');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-warm-700 hover:text-sky transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky text-white font-bold flex items-center justify-center">
            Q
          </div>
          <span className="font-extrabold text-warm-900 text-lg">Quest</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-warm-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
            <span className="text-xs font-bold text-warm-800">Join Thousands of Students</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight leading-tight">
            Start learning through interactive missions today
          </h1>

          <div className="space-y-3 text-xs sm:text-sm text-warm-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-mint shrink-0" />
              <span>8 Subject Tracks: Networks, Cyber, Web, OS, AI, Databases, Cloud & Mobile</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky shrink-0" />
              <span>100% decision-driven hands-on learning</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent-dark shrink-0" />
              <span>Personalized AI Learning Planner & Merch Rewards Shop</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-float">
          <h2 className="text-2xl font-extrabold text-warm-900 mb-1">Create Account</h2>
          <p className="text-xs text-warm-500 mb-6">Begin your quest and unlock your initial roadmap</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-coral-light border border-coral text-coral-dark text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-warm-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-warm-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New Student"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-warm-700 mb-1">Select Avatar</label>
              <div className="flex items-center gap-3">
                {AVATARS.map((imgUrl) => (
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    alt="Avatar choice"
                    onClick={() => setSelectedAvatar(imgUrl)}
                    className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition-all ${
                      selectedAvatar === imgUrl ? 'border-sky scale-110 shadow-sm' : 'border-transparent opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-warm-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-warm-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="newstudent@quest.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-warm-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-warm-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Proceed to Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-warm-200 text-center text-xs text-warm-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-sky hover:underline">
              Log In
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-warm-400">
        © {new Date().getFullYear()} Quest Platform Inc.
      </div>
    </div>
  );
}
