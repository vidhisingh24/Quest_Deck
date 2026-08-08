'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ArrowLeft,
  Eye,
  EyeOff,
  UserCheck,
  Sun,
  Moon,
  Calendar,
  Layers,
  ChevronRight,
  Activity,
  Code2,
  Network,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { UserProfile, RoadmapNode, Achievement } from '@/lib/types';
import { ALEX_USER, MAYA_USER, INITIAL_WEEKLY_STATS } from '@/lib/data';
import { setStoredUser } from '@/lib/storage';
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
  onUserSwitch?: (newUser: UserProfile) => void;
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

const RECENT_ACTIVITIES = [
  { id: 'act_1', text: 'Completed Packet Routing Simulator', time: '10 mins ago', xp: '+250 XP', icon: Network },
  { id: 'act_2', text: 'Claimed Daily Quest Challenge', time: '1 hour ago', xp: '+150 XP', icon: Target },
  { id: 'act_3', text: 'Reviewed 10 Active Flashcards', time: 'Yesterday', xp: '+100 XP', icon: BookOpen },
  { id: 'act_4', text: 'Achieved 7-Day Study Streak', time: '2 days ago', xp: '+200 XP', icon: Flame },
];

const SKILL_METERS = [
  { skill: 'DOM API & Event Loop', progress: 90, category: 'Web Dev' },
  { skill: 'React Architecture & Hooks', progress: 85, category: 'Web Dev' },
  { skill: 'IP Packet Hop Routing', progress: 80, category: 'Networking' },
  { skill: 'SQL Injection Defense', progress: 75, category: 'Security' },
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
  onUserSwitch,
}) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile>(user);
  const [isPrivate, setIsPrivate] = useState<boolean>(!!user.isPrivateOnLeaderboard);
  const [todaysGoals, setTodaysGoals] = useState([
    { id: 'g1', title: 'Complete 1 Interactive Mission', current: 1, max: 1, done: true },
    { id: 'g2', title: 'Review 10 Active Flashcards', current: 6, max: 10, done: false },
    { id: 'g3', title: 'Maintain Daily Study Streak', current: currentUser.streak, max: 5, done: true },
    { id: 'g4', title: 'Earn 200 XP Today', current: 180, max: 200, done: false }
  ]);

  const togglePrivacy = () => {
    sounds.playClick();
    const updated = !isPrivate;
    setIsPrivate(updated);
    const updatedUser = { ...currentUser, isPrivateOnLeaderboard: updated };
    setCurrentUser(updatedUser);
    setStoredUser(updatedUser);
    if (onUserSwitch) onUserSwitch(updatedUser);
  };

  const handleSwitchUser = (selectedUser: UserProfile) => {
    sounds.playClick();
    setCurrentUser(selectedUser);
    setIsPrivate(!!selectedUser.isPrivateOnLeaderboard);
    setStoredUser(selectedUser);
    if (onUserSwitch) onUserSwitch(selectedUser);
  };

  const handleBack = () => {
    sounds.playClick();
    router.back();
  };

  const completedMissions = roadmapNodes.filter((n) => n.status === 'completed');
  const activeMission = roadmapNodes.find((n) => n.status === 'unlocked') || roadmapNodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar: Smart History Back Button + Demo User Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-extrabold transition-all cursor-pointer shadow-card"
        >
          <ArrowLeft className="w-4 h-4 text-sky" />
          <span>Back</span>
        </button>

        {/* 1-Click Demo User Switcher */}
        <div className="flex items-center gap-2 bg-warm-100/80 p-1.5 rounded-2xl border border-warm-200">
          <span className="text-[11px] font-extrabold text-warm-600 px-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-sky" /> Demo Profile:
          </span>
          <button
            onClick={() => handleSwitchUser(ALEX_USER)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentUser.email === ALEX_USER.email
                ? 'bg-sky text-white shadow-sm'
                : 'bg-white text-warm-700 hover:text-sky'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>Alex (Knows JS - Starts Stage 3)</span>
          </button>
          <button
            onClick={() => handleSwitchUser(MAYA_USER)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentUser.email === MAYA_USER.email
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-warm-700 hover:text-indigo-600'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-200" />
            <span>Maya (Beginner - Starts Stage 1)</span>
          </button>
        </div>
      </div>

      {/* Main Welcome Hero Banner */}
      <div className="quest-card p-6 sm:p-8 bg-gradient-to-r from-white via-sky-light/30 to-sage-light/30 border border-warm-200 rounded-3xl mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="pill-badge pill-sky text-xs font-bold">Level {currentUser.level} Quest Master</span>
              <span className="pill-badge pill-sage text-xs font-bold">{currentUser.careerGoal}</span>
              {currentUser.chronotype && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-warm-100 border border-warm-200 font-bold text-warm-700 flex items-center gap-1">
                  {currentUser.chronotype === 'morning' ? '☀️ Morning Sprint' : '🌙 Night Explorer'}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-900">
              Welcome to QuestDeck, {currentUser.name}!
            </h1>
            <p className="text-xs sm:text-sm text-warm-600 mt-1">
              You are on a <span className="font-bold text-coral">{currentUser.streak}-day study streak</span> with {currentUser.dailyStudyTime || 30} mins daily commitment.
            </p>
          </div>
        </div>

        {/* Questboard Visibility Privacy Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={togglePrivacy}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isPrivate 
                ? 'bg-warm-100 border-warm-300 text-warm-700 hover:bg-warm-200' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
            }`}
            title="Toggle Questboard Visibility"
          >
            {isPrivate ? <EyeOff className="w-4 h-4 text-warm-500" /> : <Eye className="w-4 h-4 text-emerald-600" />}
            <span>{isPrivate ? 'Questboard: Hidden (Private)' : 'Questboard: Public'}</span>
          </button>

          <Link
            href="/roadmap"
            onClick={() => sounds.playClick()}
            className="px-5 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-float transition-all hover:scale-105 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Visual Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Dedicated Action Cards: Questboard, Shop, Flashcards, Certificate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          href="/leaderboard"
          onClick={() => sounds.playClick()}
          className="p-5 rounded-3xl bg-white border border-warm-200 hover:border-accent shadow-card transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="pill-badge pill-sky text-[10px] font-bold">Top Standings</span>
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-warm-900 group-hover:text-sky transition-colors flex items-center justify-between">
              <span>Questboard</span>
              <ChevronRight className="w-4 h-4 text-warm-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-warm-500 mt-1">View Global Rankings & Podium Standings</p>
          </div>
        </Link>

        <Link
          href="/shop"
          onClick={() => sounds.playClick()}
          className="p-5 rounded-3xl bg-white border border-warm-200 hover:border-sky shadow-card transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-light text-sky flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="pill-badge pill-sage text-[10px] font-bold">{currentUser.coins} Coins</span>
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-warm-900 group-hover:text-sky transition-colors flex items-center justify-between">
              <span>Quest Shop</span>
              <ChevronRight className="w-4 h-4 text-warm-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-warm-500 mt-1">Redeem Caps, T-Shirts & Boosters</p>
          </div>
        </Link>

        <Link
          href="/flashcards"
          onClick={() => sounds.playClick()}
          className="p-5 rounded-3xl bg-white border border-warm-200 hover:border-sage shadow-card transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-sage-light text-sage-deep flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="pill-badge pill-sky text-[10px] font-bold">Active Recall</span>
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-warm-900 group-hover:text-sky transition-colors flex items-center justify-between">
              <span>Flashcards Deck</span>
              <ChevronRight className="w-4 h-4 text-warm-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-warm-500 mt-1">Spaced Repetition Concept Decks</p>
          </div>
        </Link>

        <Link
          href="/certificate"
          onClick={() => sounds.playClick()}
          className="p-5 rounded-3xl bg-white border border-warm-200 hover:border-accent shadow-card transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Printer className="w-6 h-6" />
            </div>
            <span className="pill-badge pill-sage text-[10px] font-bold">Verified Hash</span>
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-warm-900 group-hover:text-sky transition-colors flex items-center justify-between">
              <span>Official Certificate</span>
              <ChevronRight className="w-4 h-4 text-warm-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-warm-500 mt-1">Printable Verification Mastery Seal</p>
          </div>
        </Link>
      </div>

      {/* Activity Log & Skill Mastery Meters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Recent Learning Activity Log (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-warm-200 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
            <h3 className="text-base font-extrabold text-warm-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky" /> Recent Activity Log
            </h3>
            <span className="pill-badge pill-sky text-[10px] font-bold">Live Stream</span>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="p-3.5 rounded-2xl border border-warm-200 bg-warm-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-sky border border-warm-200 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-warm-900">{act.text}</p>
                      <span className="text-[10px] text-warm-500">{act.time}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-sky bg-sky-light/50 px-2.5 py-1 rounded-xl border border-sky/20">
                    {act.xp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Mastery Meters (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-warm-200 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
            <h3 className="text-base font-extrabold text-warm-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent-dark" /> Skill Mastery Meters
            </h3>
            <span className="pill-badge pill-sage text-[10px] font-bold">Active Progress</span>
          </div>

          <div className="space-y-4">
            {SKILL_METERS.map((m) => (
              <div key={m.skill}>
                <div className="flex items-center justify-between text-xs font-extrabold text-warm-900 mb-1">
                  <span>{m.skill}</span>
                  <span className="text-sky">{m.progress}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-warm-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-sky to-sky-dark transition-all duration-500" 
                    style={{ width: `${m.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analytics Grid: Weekly XP + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        <div className="lg:col-span-7">
          <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-warm-900">Weekly Study XP Consistency</h3>
                <p className="text-xs text-warm-500">Track daily XP gains across the current week</p>
              </div>
              <span className="pill-badge pill-sky text-xs font-bold">XP Analytics</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INITIAL_WEEKLY_STATS}>
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
                    {INITIAL_WEEKLY_STATS.map((entry, index) => (
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

        <div className="lg:col-span-5">
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
