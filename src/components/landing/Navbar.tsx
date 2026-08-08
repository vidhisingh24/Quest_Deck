'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, User, LogIn, Award, RotateCcw, Search, BookOpen, Target, ShoppingBag } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { sounds } from '@/lib/soundEngine';

interface NavbarProps {
  user: UserProfile | null;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onNavigate?: (view: string) => void;
  onReplayIntro?: () => void;
  onOpenSearch?: () => void;
  onOpenFlashcards?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onNavigate,
  onReplayIntro,
  onOpenSearch,
  onOpenFlashcards,
}) => {
  const handleClick = () => {
    sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/90 backdrop-blur-md border-b border-warm-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/"
          onClick={handleClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky to-sky-dark flex items-center justify-center text-white font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
            Q
          </div>
          <div>
            <span className="font-extrabold text-lg text-warm-900 tracking-tight flex items-center gap-1">
              Quest <span className="text-xs px-2 py-0.5 rounded-full bg-sky-light text-sky border border-sky/20 font-semibold">Beta</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-warm-700">
          <Link 
            href="/" 
            onClick={handleClick} 
            className="hover:text-sky transition-colors cursor-pointer"
          >
            Overview
          </Link>
          <button 
            onClick={() => {
              handleClick();
              onNavigate?.('roadmap');
            }}
            className="hover:text-sky transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-sky" />
            <span>Visual Roadmap</span>
          </button>
          <button 
            onClick={() => {
              handleClick();
              onNavigate?.('dashboard');
            }}
            className="hover:text-sky transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <Link 
            href="/leaderboard" 
            onClick={handleClick}
            className="hover:text-sky transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Award className="w-4 h-4 text-accent-dark" />
            <span>Leaderboard</span>
          </Link>
          <Link 
            href="/shop" 
            onClick={handleClick}
            className="hover:text-sky transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-sage-deep" />
            <span>Shop</span>
          </Link>
          <Link 
            href="/flashcards" 
            onClick={handleClick}
            className="hover:text-sky transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-sage-deep" />
            <span>Flashcards</span>
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              handleClick();
              onOpenSearch?.();
            }}
            className="p-2 rounded-full bg-white border border-warm-200 hover:border-sky text-warm-600 hover:text-sky transition-all cursor-pointer shadow-card"
            title="Global Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {user ? (
            <Link
              href="/profile"
              onClick={handleClick}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-warm-200 hover:border-sky text-sm font-semibold text-warm-800 shadow-card transition-all cursor-pointer"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-6 h-6 rounded-full object-cover border border-warm-300"
              />
              <span className="max-w-[100px] truncate">{user.name}</span>
              <span className="pill-badge pill-sky text-xs font-bold">Lvl {user.level}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={handleClick}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-warm-700 hover:text-sky transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Link>
              <Link
                href="/signup"
                onClick={handleClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky hover:bg-sky-dark text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <span>Start Your Quest</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
