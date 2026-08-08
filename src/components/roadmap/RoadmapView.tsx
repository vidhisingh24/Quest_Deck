'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Clock, 
  Zap, 
  Coins, 
  Award, 
  Network, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  BrainCircuit,
  Database,
  Cloud,
  Smartphone,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { RoadmapNode, UserProfile, SubjectCategory } from '@/lib/types';
import { MULTI_SUBJECT_ROADMAPS } from '@/lib/data';

interface RoadmapViewProps {
  user: UserProfile;
  roadmapNodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
}

const SUBJECT_LIST: Array<{ category: SubjectCategory; label: string; icon: any }> = [
  { category: 'Networking', label: 'Computer Networks', icon: Network },
  { category: 'Cybersecurity', label: 'Cybersecurity & SOC', icon: ShieldCheck },
  { category: 'Web Dev', label: 'Full-Stack Web Dev', icon: Code2 },
  { category: 'Operating Systems', label: 'Operating Systems', icon: Cpu },
  { category: 'AI & Algorithms', label: 'AI & Machine Learning', icon: BrainCircuit },
  { category: 'Database Systems', label: 'Database Systems', icon: Database },
  { category: 'Cloud & DevOps', label: 'Cloud & DevOps', icon: Cloud },
  { category: 'Mobile App Dev', label: 'Mobile App Dev', icon: Smartphone },
];

const ICON_MAP: Record<string, any> = {
  Network: Network,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
  Cpu: Cpu,
  BrainCircuit: BrainCircuit,
  Database: Database,
  Cloud: Cloud,
  Smartphone: Smartphone,
};

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  user,
  roadmapNodes,
  onSelectNode,
}) => {
  const [activeCategory, setActiveCategory] = useState<SubjectCategory>('Networking');

  const currentCategoryNodes = MULTI_SUBJECT_ROADMAPS[activeCategory] || MULTI_SUBJECT_ROADMAPS['Networking'];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(currentCategoryNodes[0].id);

  const activeDetailNode = currentCategoryNodes.find((n) => n.id === selectedNodeId) || currentCategoryNodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="pill-badge pill-sky text-xs font-bold uppercase tracking-wider">
              Multiverse Learning Path
            </span>
            <span className="text-xs font-semibold text-warm-500">
              8 Available Subject Tracks
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-warm-900 tracking-tight">
            Visual Mission Roadmap
          </h1>
          <p className="text-sm text-warm-600 mt-1">
            Switch between computer science domains below to unlock interactive mission nodes.
          </p>
        </div>
      </div>

      {/* 8 Subject Track Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {SUBJECT_LIST.map((subj) => {
          const Icon = subj.icon;
          const isActive = activeCategory === subj.category;
          return (
            <button
              key={subj.category}
              onClick={() => {
                setActiveCategory(subj.category);
                const newNodes = MULTI_SUBJECT_ROADMAPS[subj.category];
                if (newNodes && newNodes.length > 0) {
                  setSelectedNodeId(newNodes[0].id);
                }
              }}
              className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-sky text-white border-sky shadow-sm scale-105'
                  : 'bg-white text-warm-700 border-warm-200 hover:border-sky'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{subj.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Visual Path Left + Selected Node Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Path (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-warm-200 rounded-3xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-warm-400 uppercase tracking-widest">
              Active Track: {activeCategory}
            </span>
          </div>

          <div className="relative max-w-lg mx-auto py-6 space-y-12">
            <div className="absolute left-1/2 top-10 bottom-10 w-1.5 -translate-x-1/2 bg-warm-200 z-0 rounded-full" />

            {currentCategoryNodes.map((node, index) => {
              const IconComponent = ICON_MAP[node.icon] || Network;
              const isSelected = selectedNodeId === node.id;
              const isCompleted = node.status === 'completed';
              const isUnlocked = node.status === 'unlocked';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`relative z-10 flex items-center justify-between gap-4 cursor-pointer group transition-all ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all shadow-card ${
                      isCompleted
                        ? 'bg-sage-light border-sage text-sage-deep'
                        : isUnlocked
                        ? 'bg-white border-sky text-sky ring-4 ring-sky-light/80 pulse-sky'
                        : 'bg-warm-100 border-warm-300 text-warm-400 opacity-60'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-sage-deep" />
                    ) : isLocked ? (
                      <Lock className="w-7 h-7 text-warm-400" />
                    ) : (
                      <IconComponent className="w-7 h-7 text-sky" />
                    )}
                  </motion.div>

                  <div
                    className={`flex-1 p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-sky-light/40 border-sky shadow-sm'
                        : 'bg-warm-50/70 border-warm-200 hover:bg-white hover:border-warm-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-warm-500">
                        Milestone {index + 1} • {node.category}
                      </span>
                      <span className="pill-badge pill-sky text-[10px] font-bold">
                        {node.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-warm-900 group-hover:text-sky transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-warm-500 line-clamp-1 mt-0.5">{node.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Mission Launch Card (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-4">
              <span className="pill-badge pill-sky text-xs font-bold">
                {activeDetailNode.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-warm-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeDetailNode.estimatedMinutes} mins</span>
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-warm-900 mb-2">
              {activeDetailNode.title}
            </h3>

            <p className="text-xs text-warm-600 leading-relaxed mb-6">
              {activeDetailNode.description}
            </p>

            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 mb-6 space-y-2">
              <span className="text-[10px] uppercase font-bold text-warm-400 tracking-wider">
                Mission Rewards
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-warm-800">
                  <Zap className="w-4 h-4 text-sky" />
                  <span>+{activeDetailNode.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-warm-800">
                  <Coins className="w-4 h-4 text-accent-dark" />
                  <span>+{activeDetailNode.coinReward} Coins</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectNode(activeDetailNode)}
              className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-float transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Mission Sim</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
