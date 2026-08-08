'use client';

import React from 'react';
import { Compass, Sparkles, Heart, Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  return (
    <footer className="bg-[#FAFAF7] border-t border-warm-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-warm-200">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky to-accent text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
              Q
            </div>
            <div>
              <span className="font-extrabold text-warm-900 text-base">QuestDeck Platform</span>
              <p className="text-xs text-warm-500">Master Computer Science through Interactive Decks & AI Roadmaps.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-warm-600">
            <button onClick={() => onNavigate('landing')} className="hover:text-sky transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => onNavigate('roadmap')} className="hover:text-sky transition-colors cursor-pointer">
              Visual Roadmap
            </button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-sky transition-colors cursor-pointer">
              Dashboard
            </button>
            <button onClick={onReplayIntro} className="hover:text-sky transition-colors cursor-pointer">
              Replay Q Intro
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-500 gap-4">
          <p>© {new Date().getFullYear()} QuestDeck. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Gamified AI Learning Platform built with Notion & Linear aesthetics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
