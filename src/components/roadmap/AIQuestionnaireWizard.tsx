'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  Sun, 
  Moon, 
  Zap, 
  Compass, 
  Briefcase, 
  Code, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X,
  Bot,
  BookOpen,
  Award
} from 'lucide-react';
import { SubjectCategory, UserProfile, RoadmapNode } from '@/lib/types';
import { generatePersonalizedRoadmap } from '@/lib/data';
import { sounds } from '@/lib/soundEngine';

interface AIQuestionnaireWizardProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onRoadmapGenerated: (newNodes: RoadmapNode[], updatedUser: UserProfile) => void;
}

export const AIQuestionnaireWizard: React.FC<AIQuestionnaireWizardProps> = ({
  user,
  isOpen,
  onClose,
  onRoadmapGenerated
}) => {
  const [step, setStep] = useState(1);
  const [focusSubject, setFocusSubject] = useState<SubjectCategory>('Web Dev');
  const [priorKnowledge, setPriorKnowledge] = useState<'beginner' | 'basics' | 'advanced'>('beginner');
  const [dailyTime, setDailyTime] = useState<number>(user.dailyStudyTime || 30);
  const [chronotype, setChronotype] = useState<'morning' | 'night'>(user.chronotype || 'morning');
  const [pacePreference, setPacePreference] = useState<'speedrun' | 'mastery'>(user.pacePreference || 'speedrun');
  const [targetGoal, setTargetGoal] = useState<'job' | 'projects' | 'exam' | 'curiosity'>(user.targetGoal || 'job');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    sounds.playClick();
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    sounds.playClick();
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    sounds.playLevelUp();

    setTimeout(() => {
      const updatedUser: UserProfile = {
        ...user,
        dailyStudyTime: dailyTime,
        chronotype,
        pacePreference,
        targetGoal
      };

      const newPersonalizedNodes = generatePersonalizedRoadmap(focusSubject, updatedUser, priorKnowledge);
      setIsGenerating(false);
      onRoadmapGenerated(newPersonalizedNodes, updatedUser);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-float border border-warm-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-light/80 via-white to-accent-light/50 border-b border-warm-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-warm-900 flex items-center gap-2">
                QuestDeck AI Roadmap Architect
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-light text-accent-dark font-bold">Step {step} of 5</span>
              </h3>
              <p className="text-xs text-warm-600 font-medium">Adaptive questionnaire assesses your prior knowledge so you never start from scratch</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warm-100 text-warm-500 hover:text-warm-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 min-h-[360px] flex flex-col justify-between">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-sky border-t-transparent animate-spin mb-4" />
              <h4 className="text-xl font-extrabold text-warm-900">Synthesizing Your Adaptive AI Roadmap...</h4>
              <p className="text-sm text-warm-600 mt-2 max-w-md">
                {priorKnowledge !== 'beginner' ? `Skipping introductory stages for ${focusSubject} based on your prior experience...` : 'Building complete foundation pathway...'}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                    1. Which Subject Track do you want to tune right now?
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(['Web Dev', 'Networking', 'Cybersecurity', 'AI & Algorithms', 'Database Systems', 'Cloud & DevOps'] as SubjectCategory[]).map((subj) => (
                      <button
                        key={subj}
                        onClick={() => {
                          sounds.playClick();
                          setFocusSubject(subj);
                        }}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all cursor-pointer ${
                          focusSubject === subj
                            ? 'bg-sky-light/60 border-sky text-sky-deep shadow-sm ring-2 ring-sky/30'
                            : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-sky/50'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Dynamic Follow-Up Step 2: Prior Knowledge Assessment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                    2. How much prior experience do you have in {focusSubject}?
                  </h4>
                  <p className="text-xs text-warm-600">If you already know the basics, QuestDeck AI will skip introductory stages so you don't waste time!</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPriorKnowledge('beginner');
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                        priorKnowledge === 'beginner'
                          ? 'bg-sky-light/60 border-sky text-sky-deep shadow-sm ring-2 ring-sky/30'
                          : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-sky/50'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-white text-sky shadow-xs mt-0.5">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-warm-900">🟢 Complete Beginner (Start from Stage 1)</div>
                        <div className="text-xs text-warm-600 mt-0.5">I am new to {focusSubject}. I want to learn all fundamentals from scratch.</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPriorKnowledge('basics');
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                        priorKnowledge === 'basics'
                          ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm ring-2 ring-amber-400/30'
                          : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-amber-300'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-white text-amber-600 shadow-xs mt-0.5">
                        <Zap className="w-5 h-5 fill-amber-400" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-warm-900">🟡 Know the Basics (Skip to Stage 3)</div>
                        <div className="text-xs text-warm-600 mt-0.5">I know syntax and basic concepts. Pre-clear basic stages and unlock React/Hooks directly!</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPriorKnowledge('advanced');
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                        priorKnowledge === 'advanced'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-sm ring-2 ring-indigo-400/30'
                          : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-white text-indigo-600 shadow-xs mt-0.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-warm-900">🔴 Intermediate / Advanced (Skip to Stage 4)</div>
                        <div className="text-xs text-warm-600 mt-0.5">I am experienced. Pre-clear Stages 1-3 and jump straight into REST APIs, Server Components & Architecture!</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                    3. How much time can you give every day?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { mins: 15, title: '⚡ 15 Mins / Day', sub: 'Micro Sprints' },
                      { mins: 30, title: '🎯 30 Mins / Day', sub: 'Balanced Pace' },
                      { mins: 60, title: '🔥 60+ Mins / Day', sub: 'Deep Architecture Sprints' }
                    ].map((opt) => (
                      <button
                        key={opt.mins}
                        onClick={() => {
                          sounds.playClick();
                          setDailyTime(opt.mins);
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                          dailyTime === opt.mins
                            ? 'bg-sky-light/60 border-sky text-sky-deep shadow-sm ring-2 ring-sky/30'
                            : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-sky/50'
                        }`}
                      >
                        <div className="font-extrabold text-base">{opt.title}</div>
                        <div className="text-xs text-warm-600 mt-1">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                    4. Are you a Morning Person or a Night Owl?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setChronotype('morning');
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                        chronotype === 'morning'
                          ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm ring-2 ring-amber-400/30'
                          : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-amber-300'
                      }`}
                    >
                      <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
                        <Sun className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-extrabold text-base">☀️ Morning Person</div>
                        <div className="text-xs text-warm-600 mt-1">Peak focus 07:00 AM - 09:00 AM window.</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        setChronotype('night');
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                        chronotype === 'night'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-sm ring-2 ring-indigo-400/30'
                          : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700">
                        <Moon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-extrabold text-base">🌙 Night Owl</div>
                        <div className="text-xs text-warm-600 mt-1">Quiet focus 10:30 PM - 12:00 AM window.</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                    5. What is your primary Goal right now?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'job', title: '💼 Job & Career Ready', icon: Briefcase },
                      { key: 'projects', title: '🛠️ Build Portfolio Projects', icon: Code },
                      { key: 'exam', title: '🎓 University Exams', icon: GraduationCap },
                      { key: 'curiosity', title: '🔍 Pure CS Curiosity', icon: Sparkles }
                    ].map((g) => {
                      const IconComp = g.icon;
                      return (
                        <button
                          key={g.key}
                          onClick={() => {
                            sounds.playClick();
                            setTargetGoal(g.key as any);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                            targetGoal === g.key
                              ? 'bg-sky-light/60 border-sky text-sky-deep shadow-sm ring-2 ring-sky/30'
                              : 'bg-warm-50/50 border-warm-200 text-warm-800 hover:border-sky/50'
                          }`}
                        >
                          <IconComp className="w-5 h-5 text-sky" />
                          <span className="font-bold text-sm">{g.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Footer Controls */}
          {!isGenerating && (
            <div className="mt-8 pt-4 border-t border-warm-200 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-4 py-2 rounded-xl text-warm-600 font-semibold hover:bg-warm-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>{step === 5 ? '⚡ Generate Adaptive AI Roadmap' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
