'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Flame, 
  Zap, 
  Coins, 
  Trophy, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Award,
  ShoppingBag,
  Target,
  BookOpen,
  Printer,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, RoadmapNode, Achievement } from '@/lib/types';
import { WEEKLY_STATS } from '@/lib/data';
import { sounds } from '@/lib/soundEngine';

interface DashboardViewProps {
  user: UserProfile;
  roadmapNodes: RoadmapNode[];
  achievements: Achievement[];
  onNavigateToRoadmap: () => void;
  onLaunchMission: (node: RoadmapNode) => void;
  onOpenAIMentor: () => void;
  onOpenDailyQuests: () => void;
  onOpenQuestShop: () => void;
  onOpenCertificate: () => void;
  onOpenFlashcards: () => void;
  onBackToLanding: () => void;
}

const RADAR_SKILL_DATA = [
  { subject: 'Networks', mastery: 85 },
  { subject: 'Cybersecurity', mastery: 70 },
  { subject: 'Web Dev', mastery: 90 },
  { subject: 'Operating Systems', mastery: 65 },
  { subject: 'AI & ML', mastery: 80 },
  { subject: 'Databases', mastery: 75 },
  { subject: 'Cloud DevOps', mastery: 60 },
  { subject: 'Mobile Dev', mastery: 70 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  roadmapNodes,
  achievements,
  onNavigateToRoadmap,
  onLaunchMission,
  onOpenAIMentor,
  onOpenDailyQuests,
  onOpenQuestShop,
  onOpenCertificate,
  onOpenFlashcards,
  onBackToLanding,
}) => {
  const completedMissions = roadmapNodes.filter((n) => n.status === 'completed');
  const activeMission = roadmapNodes.find((n) => n.status === 'unlocked') || roadmapNodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Universal Back Button Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sounds.playClick();
            onBackToLanding();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all cursor-pointer shadow-card"
        >
          <ArrowLeft className="w-4 h-4 text-sky" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenFlashcards();
            }}
            className="px-3.5 py-1.5 rounded-full bg-sage-light hover:bg-sage border border-sage/40 text-sage-deep font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practice Flashcards</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenCertificate();
            }}
            className="px-3.5 py-1.5 rounded-full bg-sky-light hover:bg-sky/20 border border-sky/30 text-sky font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Track Certificate</span>
          </button>
        </div>
      </div>

      {/* Top Welcome Banner */}
      <div className="quest-card p-6 sm:p-8 bg-gradient-to-r from-white via-sky-light/30 to-sage-light/30 border border-warm-200 rounded-3xl mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="pill-badge pill-sky text-xs font-bold">Level {user.level} Quest Master</span>
              <span className="pill-badge pill-sage text-xs font-bold">{user.careerGoal}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-900">
              Welcome Back, {user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-warm-600 mt-1">
              You are on a <span className="font-bold text-coral">{user.streak}-day study streak</span> across 8 subject domains.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDailyQuests();
            }}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-warm-50 border border-warm-200 text-warm-800 font-bold text-xs shadow-card flex items-center gap-1.5 cursor-pointer"
          >
            <Target className="w-4 h-4 text-accent-dark" />
            <span>Daily Quests</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenQuestShop();
            }}
            className="px-4 py-2.5 rounded-full bg-accent-light hover:bg-accent border border-accent-dark/30 text-warm-900 font-bold text-xs shadow-card flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-accent-dark" />
            <span>Rewards Shop</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onLaunchMission(activeMission);
            }}
            className="px-5 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-float transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Active Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Quick Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-warm-200 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-coral-light text-coral flex items-center justify-center">
            <Flame className="w-5 h-5 fill-coral" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-warm-400">Current Streak</p>
            <p className="text-xl font-extrabold text-warm-900">{user.streak} Days</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-200 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-light text-sky flex items-center justify-center">
            <Zap className="w-5 h-5 fill-sky" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-warm-400">Total XP Earned</p>
            <p className="text-xl font-extrabold text-warm-900">{user.xp} XP</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-200 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-light text-sage-deep flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-warm-400">Completed Quests</p>
            <p className="text-xl font-extrabold text-warm-900">{completedMissions.length} Missions</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-200 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-light text-accent-dark flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-warm-400">Coins Wallet</p>
            <p className="text-xl font-extrabold text-warm-900">{user.coins} Coins</p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid: Weekly Progress + Radar Chart Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-warm-900">Weekly Study XP Consistency</h3>
                <p className="text-xs text-warm-500">Track daily XP gains across the current week</p>
              </div>
              <span className="pill-badge pill-sky text-xs font-bold">Recharts Data</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_STATS}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#717168' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#717168' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '1rem',
                      border: '1px solid #EAEAEA',
                    }}
                  />
                  <Bar dataKey="xp" radius={[8, 8, 0, 0]}>
                    {WEEKLY_STATS.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 5 ? '#4F8EF7' : '#A8D5BA'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
              <h3 className="text-base font-extrabold text-warm-900">Multi-Subject Mastery Radar</h3>
              <span className="pill-badge pill-sage text-xs font-bold">8 Tracks</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_SKILL_DATA}>
                  <PolarGrid stroke="#E8E8DF" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#3A3A32' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Mastery" dataKey="mastery" stroke="#4F8EF7" fill="#4F8EF7" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
