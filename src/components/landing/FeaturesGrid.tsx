'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Sparkles, 
  MapPin, 
  Flame, 
  Bot, 
  GraduationCap, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Gamepad2,
    iconBg: 'bg-sky-light text-sky',
    title: 'No Boring Videos',
    description: 'Stop watching passive 3-hour video playlists. Learn by doing hands-on simulations where every click and decision provides immediate feedback.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-accent-light text-accent-dark',
    title: 'AI Learning Planner',
    description: 'Our AI analyzes your career goals, current skill levels, and daily available study time to curate custom weekly milestones automatically.',
  },
  {
    icon: MapPin,
    iconBg: 'bg-sage-light text-sage-deep',
    title: 'Visual Learning Roadmap',
    description: 'Trade checklists for interactive mission maps. Complete nodes to earn colorful badges, unlock next topics, and feel genuine progression.',
  },
  {
    icon: Flame,
    iconBg: 'bg-coral-light text-coral',
    title: 'Duolingo XP & Streaks',
    description: 'Build consistent study habits with daily streaks, level-up animations, coin rewards, and friendly leaderboard competitions.',
  },
  {
    icon: Bot,
    iconBg: 'bg-sky-light text-sky-dark',
    title: '24/7 AI Mentor',
    description: 'Never stay stuck. Your personal AI mentor retains your mission context, breaks down complex concepts simply, and gives instant hints.',
  },
  {
    icon: GraduationCap,
    iconBg: 'bg-sage-light text-sage-deep',
    title: 'University-Grade Trust',
    description: 'A clean, calming, warm interface designed to meet modern higher education standards — free of distracting dark cyberpunk aesthetics.',
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="pill-badge pill-sage text-xs uppercase font-bold tracking-wider mb-3">
            Built for Modern Students
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            Designed like Notion + Linear + Duolingo + Apple + Headspace
          </h2>
          <p className="text-base text-warm-600 mt-4">
            Everything you need to master technical skills effortlessly in a calming, friendly environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="quest-card p-6 bg-white border border-warm-200 rounded-3xl flex flex-col justify-between hover:border-sky/40 transition-all"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-warm-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-warm-600 leading-relaxed">{feat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-warm-100 flex items-center gap-2 text-xs font-bold text-warm-500">
                  <Zap className="w-3.5 h-3.5 text-sky" />
                  <span>Production Grade Sim</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
