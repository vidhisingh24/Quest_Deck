'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, CheckCircle2, ArrowLeft, Zap } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { setStoredUser, setAuthToken } from '@/lib/storage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginUser = (userEmail: string, userName: string = 'Alex Rivers') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: userName,
        email: userEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        level: 3,
        xp: 1450,
        coins: 140,
        streak: 5,
        lastStudyDate: new Date().toISOString(),
        careerGoal: 'Full Stack & Cyber Specialist',
        skillLevel: 'Intermediate',
        dailyStudyTime: 30,
        learningStyle: 'Interactive Simulators',
        interests: ['Networking', 'Cybersecurity', 'Web Dev', 'AI & Machine Learning'],
        isOnboarded: true,
      };

      setStoredUser(mockUser);
      setAuthToken(`jwt_mock_token_${Date.now()}`);
      router.push('/');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in your email and password.');
      return;
    }
    handleLoginUser(email, email.split('@')[0]);
  };

  const handleDemoLogin = () => {
    setEmail('alex@quest.edu');
    setPassword('password123');
    handleLoginUser('alex@quest.edu', 'Alex Rivers (Demo)');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
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

      {/* Main Login Card */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-8">
        {/* Left Side: Brand Value Proposition */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-warm-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
            <span className="text-xs font-bold text-warm-800">Learn by Playing. Grow by Completing Quests.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight leading-tight">
            Welcome back to your active mission roadmap
          </h1>

          {/* Quick Demo Credentials Callout Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-warm-800 text-xs space-y-1">
            <p className="font-bold text-amber-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Demo Account Credentials:</span>
            </p>
            <p className="font-mono">Email: <span className="font-bold text-warm-900">alex@quest.edu</span></p>
            <p className="font-mono">Password: <span className="font-bold text-warm-900">password123</span></p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-warm-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-mint shrink-0" />
              <span>Resume interactive missions across 8 subject multiverse tracks</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky shrink-0" />
              <span>Track your daily XP, flame streaks, and coin rewards</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-float">
          <h2 className="text-2xl font-extrabold text-warm-900 mb-1">Log In</h2>
          <p className="text-xs text-warm-500 mb-6">Enter your credentials to access your student account</p>

          {/* 1-Click Demo Login CTA */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mb-5"
          >
            <Zap className="w-4 h-4 text-amber-700 fill-amber-600" />
            <span>1-Click Demo Login (Alex Rivers)</span>
          </button>

          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-px bg-warm-200" />
            <span className="text-[10px] uppercase font-bold text-warm-400">or sign in manually</span>
            <div className="flex-1 h-px bg-warm-200" />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-coral-light border border-coral text-coral-dark text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-warm-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-warm-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@quest.edu"
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
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-warm-200 text-center text-xs text-warm-600">
            Don't have an account yet?{' '}
            <Link href="/signup" className="font-bold text-sky hover:underline">
              Sign Up Free
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-warm-400">
        © {new Date().getFullYear()} Quest Platform Inc. Demo: alex@quest.edu / password123
      </div>
    </div>
  );
}
