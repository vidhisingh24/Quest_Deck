'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Shield, Network, Cpu, Code2, CheckCircle2, Layers } from 'lucide-react';

interface HeroSectionProps {
  onStartQuest: () => void;
  onTryMission: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuest, onTryMission }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Gentle background accent blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-light/60 via-sage-light/50 to-accent-light/60 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-warm-200 shadow-card mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
          <span className="text-xs font-extrabold text-warm-900 tracking-tight flex items-center gap-1.5">
            Welcome to <span className="text-sky font-black">QuestDeck</span> — Gamified AI Learning Deck
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent-dark ml-1" />
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warm-900 tracking-tight leading-[1.15] max-w-4xl mx-auto"
        >
          Master Computer Science through <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky via-sky-dark to-accent-dark">QuestDeck</span> Interactive Decks
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-warm-700 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          No passive video lectures. QuestDeck turns complex software engineering, networking, and security into interactive simulator missions and dual-mode AI roadmaps tailored specifically to your study schedule.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStartQuest}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white text-base font-bold shadow-float transition-all hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Layers className="w-5 h-5 text-white" />
            <span>Launch QuestDeck Platform</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onTryMission}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-warm-50 text-warm-800 border border-warm-200 hover:border-sky text-base font-semibold shadow-card transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-sky fill-sky" />
            <span>Try Interactive Simulator</span>
          </button>
        </motion.div>

        {/* Feature Badges under CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-warm-700"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-mint" />
            <span>Dual-Mode AI Roadmaps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky" />
            <span>Gamified XP & Questboards</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-dark" />
            <span>Floating AI Mentor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sage-deep" />
            <span>LeetCode Style Rewards</span>
          </div>
        </motion.div>

        {/* Interactive Topic Pills Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-white border border-warm-200 shadow-card flex flex-col items-center text-center hover:border-sky transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-light text-sky flex items-center justify-center mb-2">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-warm-900">Networking</h4>
            <p className="text-xs text-warm-500 mt-1">Packet Routing Deck</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-warm-200 shadow-card flex flex-col items-center text-center hover:border-sage transition-all">
            <div className="w-10 h-10 rounded-xl bg-sage-light text-sage-deep flex items-center justify-center mb-2">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-warm-900">Cybersecurity</h4>
            <p className="text-xs text-warm-500 mt-1">SOC Defender Deck</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-warm-200 shadow-card flex flex-col items-center text-center hover:border-accent transition-all">
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent-dark flex items-center justify-center mb-2">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-warm-900">Web Dev</h4>
            <p className="text-xs text-warm-500 mt-1">Full-Stack RSC Deck</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-warm-200 shadow-card flex flex-col items-center text-center hover:border-coral transition-all">
            <div className="w-10 h-10 rounded-xl bg-coral-light text-coral flex items-center justify-center mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-warm-900">Operating Systems</h4>
            <p className="text-xs text-warm-500 mt-1">Kernel Process Deck</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
