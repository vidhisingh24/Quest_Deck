'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { setStoredUser, setAuthToken } from '@/lib/storage';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile, isNewSignup: boolean) => void;
}

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleExecuteAuth = (userEmail: string, userName?: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isSignup = mode === 'signup';
      const mockUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: isSignup ? name || 'Alex Rivers' : userName || 'Alex Rivers',
        email: userEmail,
        avatar: selectedAvatar,
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
        isOnboarded: !isSignup,
      };

      setStoredUser(mockUser);
      setAuthToken(`jwt_mock_token_${Date.now()}`);
      onSuccess(mockUser, isSignup);
      onClose();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill out all required fields.');
      return;
    }
    handleExecuteAuth(email, name);
  };

  const handleDemoLogin = () => {
    setEmail('alex@quest.edu');
    setPassword('password123');
    setMode('login');
    handleExecuteAuth('alex@quest.edu', 'Alex Rivers (Demo)');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white border border-warm-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-light text-sky mx-auto flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-warm-900">
              {mode === 'signup' ? 'Join Quest Today' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-warm-500 mt-1">
              {mode === 'signup'
                ? 'Create your account and start interactive onboarding'
                : 'Log in to continue your active mission roadmap'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-warm-100 p-1 rounded-2xl mb-4">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup' ? 'bg-white text-warm-900 shadow-card' : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login' ? 'bg-white text-warm-900 shadow-card' : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              Log In
            </button>
          </div>

          {/* 1-Click Demo Login CTA */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
          >
            <Zap className="w-4 h-4 text-amber-700 fill-amber-600" />
            <span>1-Click Demo Login (alex@quest.edu)</span>
          </button>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-coral-light border border-coral text-coral-dark text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-warm-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-warm-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivers"
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
              </>
            )}

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
              className="w-full py-3 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-5"
            >
              {loading ? (
                <span>Authenticating JWT...</span>
              ) : (
                <>
                  <span>{mode === 'signup' ? 'Create Account & Onboard' : 'Log In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-warm-400 mt-4">
            Protected with JWT Authentication. Demo: alex@quest.edu / password123
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
