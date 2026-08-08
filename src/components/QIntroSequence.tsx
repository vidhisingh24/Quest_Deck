'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Zap, Network, BrainCircuit } from 'lucide-react';

interface QIntroSequenceProps {
  onComplete: () => void;
}

export const QIntroSequence: React.FC<QIntroSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    { label: 'Building Neural Learning Paths...', icon: BrainCircuit },
    { label: 'Initializing 8 Subject Multiverse...', icon: Compass },
    { label: 'Connecting Mission Gateway Nodes...', icon: Network },
    { label: 'Quest Platform Ecosystem Ready', icon: Zap },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        const next = prev + 2;
        if (next > 25 && next <= 55) setActiveStep(1);
        else if (next > 55 && next <= 85) setActiveStep(2);
        else if (next > 85) setActiveStep(3);
        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentStepIcon = STEPS[activeStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FAFAF7] p-6 overflow-hidden select-none"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-sky-light via-sage-light to-accent-light rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-warm-200 shadow-card"
        >
          <Sparkles className="w-4 h-4 text-sky" />
          <span className="text-xs font-extrabold tracking-widest text-warm-800 uppercase">
            Learn by Playing. Grow by Completing Quests.
          </span>
        </motion.div>
      </div>

      {/* Center 3D Apple/Notion Floating Emblem Card */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-md w-full">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', damping: 20 }}
          className="w-full bg-white/90 backdrop-blur-md border border-warm-200/80 rounded-3xl p-8 shadow-float text-center relative overflow-hidden"
        >
          {/* Animated Ambient Light Beam Behind Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-r from-sky via-secondary-sage to-accent-yellow rounded-full blur-2xl opacity-30 pointer-events-none"
          />

          {/* Central 3D Q Emblem Badge */}
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-3xl bg-gradient-to-tr from-sky via-sky-dark to-sage-deep p-0.5 shadow-float flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-sky via-sky-dark to-sage-deep">
                  Q
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-3xl border border-dashed border-sky/40 pointer-events-none"
            />
          </div>

          <h1 className="text-2xl font-extrabold text-warm-900 tracking-tight mb-1">
            QUEST
          </h1>
          <p className="text-xs text-warm-500 font-semibold mb-6">
            Gamified AI-Powered Learning Platform
          </p>

          {/* Dynamic Step Status Indicator */}
          <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200/70 mb-5">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-warm-800 mb-2">
              <CurrentStepIcon className="w-4 h-4 text-sky animate-spin-slow" />
              <span>{STEPS[activeStep].label}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky via-sage to-accent-dark rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] font-mono font-bold text-sky mt-2">{progress}% Completed</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Skip CTA */}
      <div className="relative z-10 pb-6">
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-warm-800 border border-warm-200 shadow-card text-xs font-bold hover:bg-warm-50 hover:border-sky transition-all cursor-pointer"
        >
          <span>Skip Intro to Platform</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky" />
        </button>
      </div>
    </motion.div>
  );
};
