'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Clock, 
  Zap, 
  Coins, 
  Network, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  BrainCircuit,
  Database,
  Cloud,
  Smartphone,
  ArrowRight,
  Bot,
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import { RoadmapNode, UserProfile, SubjectCategory } from '@/lib/types';
import { MULTI_SUBJECT_ROADMAPS, generatePersonalizedRoadmap } from '@/lib/data';
import { getStoredRoadmapMode, setStoredRoadmapMode } from '@/lib/storage';
import { AIQuestionnaireWizard } from './AIQuestionnaireWizard';
import { sounds } from '@/lib/soundEngine';

interface RoadmapViewProps {
  user: UserProfile;
  roadmapNodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
  onUserUpdated?: (user: UserProfile) => void;
}

const SUBJECT_LIST: Array<{ category: SubjectCategory; label: string; icon: any }> = [
  { category: 'Web Dev', label: 'Web Dev', icon: Code2 },
  { category: 'Networking', label: 'Networking', icon: Network },
  { category: 'Cybersecurity', label: 'Cybersecurity', icon: ShieldCheck },
  { category: 'AI & Algorithms', label: 'AI & Algorithms', icon: BrainCircuit },
  { category: 'Operating Systems', label: 'Operating Systems', icon: Cpu },
  { category: 'Database Systems', label: 'Databases', icon: Database },
  { category: 'Cloud & DevOps', label: 'Cloud & DevOps', icon: Cloud },
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
  Zap: Zap,
  Server: Cpu,
  Layout: Layers,
};

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  user,
  roadmapNodes,
  onSelectNode,
  onUserUpdated
}) => {
  const [roadmapMode, setRoadmapMode] = useState<'common' | 'personalized'>(() => getStoredRoadmapMode());
  const [activeCategory, setActiveCategory] = useState<SubjectCategory>('Web Dev');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [customUser, setCustomUser] = useState<UserProfile>(user);

  const getDisplayNodes = (): RoadmapNode[] => {
    if (roadmapMode === 'personalized') {
      return generatePersonalizedRoadmap(activeCategory, customUser);
    }
    return MULTI_SUBJECT_ROADMAPS[activeCategory] || MULTI_SUBJECT_ROADMAPS['Web Dev'];
  };

  const currentCategoryNodes = getDisplayNodes();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(currentCategoryNodes[0]?.id || 'node_web_1');

  useEffect(() => {
    setCustomUser(user);
  }, [user]);

  useEffect(() => {
    if (currentCategoryNodes.length > 0 && !currentCategoryNodes.some(n => n.id === selectedNodeId)) {
      setSelectedNodeId(currentCategoryNodes[0].id);
    }
  }, [activeCategory, roadmapMode]);

  const handleModeToggle = (mode: 'common' | 'personalized') => {
    sounds.playClick();
    setRoadmapMode(mode);
    setStoredRoadmapMode(mode);
  };

  const handleRoadmapGenerated = (newNodes: RoadmapNode[], updatedUser: UserProfile) => {
    setCustomUser(updatedUser);
    setRoadmapMode('personalized');
    setStoredRoadmapMode('personalized');
    if (onUserUpdated) onUserUpdated(updatedUser);
    if (newNodes.length > 0) setSelectedNodeId(newNodes[0].id);
  };

  const activeDetailNode = currentCategoryNodes.find((n) => n.id === selectedNodeId) || currentCategoryNodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner with Clean Mode Switcher & CTA */}
      <div className="bg-white border border-warm-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="pill-badge pill-sky text-xs font-bold uppercase tracking-wider">
              {roadmapMode === 'personalized' ? '⚡ AI Custom Roadmap' : '🌐 Standard Roadmap'}
            </span>
            {customUser.chronotype && roadmapMode === 'personalized' && (
              <span className="text-xs font-semibold text-warm-500 flex items-center gap-1">
                {customUser.chronotype === 'morning' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
                {customUser.chronotype === 'morning' ? 'Morning Sprint' : 'Night Owl'}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-900 tracking-tight">
            Visual Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-warm-600 mt-1 max-w-xl">
            Choose between standard university curriculum or generate an AI roadmap tailored to your study schedule.
          </p>
        </div>

        {/* Mode Selector & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="bg-warm-100/90 p-1.5 rounded-2xl border border-warm-200 flex items-center gap-1">
            <button
              onClick={() => handleModeToggle('common')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roadmapMode === 'common'
                  ? 'bg-white text-warm-900 shadow-sm border border-warm-200'
                  : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => handleModeToggle('personalized')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                roadmapMode === 'personalized'
                  ? 'bg-sky text-white shadow-sm'
                  : 'text-warm-600 hover:text-sky'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Custom</span>
            </button>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setIsWizardOpen(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-sky hover:bg-sky-dark text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>✨ Create Custom AI Roadmap</span>
          </button>
        </div>
      </div>

      {/* Subject Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {SUBJECT_LIST.map((subj) => {
          const Icon = subj.icon;
          const isActive = activeCategory === subj.category;
          return (
            <button
              key={subj.category}
              onClick={() => {
                sounds.playClick();
                setActiveCategory(subj.category);
              }}
              className={`px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-sky text-white border-sky shadow-sm'
                  : 'bg-white text-warm-700 border-warm-200 hover:border-sky'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{subj.label}</span>
            </button>
          );
        })}
      </div>

      {/* Roadmap Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Nodes Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-warm-200 rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-warm-100">
            <span className="text-xs font-bold text-warm-500 uppercase tracking-wider">
              {activeCategory} Track • Stage Milestones
            </span>
            <span className="pill-badge pill-sky text-[10px] font-bold">
              {currentCategoryNodes.length} Stages
            </span>
          </div>

          <div className="relative max-w-lg mx-auto py-2 space-y-8">
            {/* Connecting Vertical Line */}
            <div className="absolute left-1/2 top-6 bottom-6 w-1 -translate-x-1/2 bg-warm-200 z-0 rounded-full" />

            {currentCategoryNodes.map((node, index) => {
              const IconComponent = ICON_MAP[node.icon] || Network;
              const isSelected = selectedNodeId === node.id;
              const isCompleted = node.status === 'completed';
              const isUnlocked = node.status === 'unlocked';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedNodeId(node.id);
                  }}
                  className={`relative z-10 flex items-center justify-between gap-4 cursor-pointer group transition-all ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-card shrink-0 ${
                      isCompleted
                        ? 'bg-sage-light border-sage text-sage-deep'
                        : isUnlocked
                        ? 'bg-white border-sky text-sky ring-4 ring-sky-light/80'
                        : 'bg-warm-100 border-warm-300 text-warm-400 opacity-60'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-sage-deep" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 text-warm-400" />
                    ) : (
                      <IconComponent className="w-6 h-6 text-sky" />
                    )}
                  </motion.div>

                  <div
                    className={`flex-1 p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-sky-light/40 border-sky shadow-sm ring-2 ring-sky/30'
                        : 'bg-warm-50/60 border-warm-200 hover:bg-white hover:border-warm-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-warm-500">
                        Milestone {index + 1}
                      </span>
                      <span className={`pill-badge text-[10px] font-bold ${
                        isCompleted ? 'pill-sage' : isUnlocked ? 'pill-sky' : 'bg-warm-200 text-warm-600'
                      }`}>
                        {node.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-warm-900 group-hover:text-sky transition-colors">
                      {node.title}
                    </h4>

                    <p className="text-xs text-warm-600 line-clamp-1 mt-0.5">{node.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Card (5 cols) */}
        {activeDetailNode && (
          <div className="lg:col-span-5 sticky top-24">
            <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
                <span className="pill-badge pill-sky text-xs font-bold">
                  {activeDetailNode.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-warm-600">
                  <Clock className="w-3.5 h-3.5 text-sky" />
                  <span>{activeDetailNode.estimatedMinutes} mins</span>
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-warm-900 mb-2">
                {activeDetailNode.title}
              </h3>

              <p className="text-xs text-warm-600 leading-relaxed mb-4">
                {activeDetailNode.description}
              </p>

              {/* Concept Tags */}
              {activeDetailNode.conceptTags && activeDetailNode.conceptTags.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-warm-400 block mb-1.5">
                    Core Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailNode.conceptTags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-warm-100 border border-warm-200 text-xs font-semibold text-warm-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverable Box */}
              {activeDetailNode.deliverable && (
                <div className="p-3 rounded-2xl bg-sky-light/30 border border-sky/20 mb-4">
                  <span className="text-[10px] uppercase font-bold text-sky-deep tracking-wider block mb-0.5">
                    🎯 Practical Deliverable
                  </span>
                  <p className="text-xs font-bold text-warm-900">{activeDetailNode.deliverable}</p>
                </div>
              )}

              {/* Rewards Box */}
              <div className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200 mb-6 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-warm-400 tracking-wider">
                  Rewards
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-warm-900">
                    <Zap className="w-4 h-4 text-sky" />
                    <span>+{activeDetailNode.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-warm-900">
                    <Coins className="w-4 h-4 text-accent-dark" />
                    <span>+{activeDetailNode.coinReward} Coins</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectNode(activeDetailNode);
                }}
                className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-float transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Interactive Mission</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Questionnaire Wizard Modal */}
      <AIQuestionnaireWizard
        user={customUser}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onRoadmapGenerated={handleRoadmapGenerated}
      />
    </div>
  );
};
