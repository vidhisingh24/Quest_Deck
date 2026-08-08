'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Server, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface NetworkingSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const NetworkingSimulator: React.FC<NetworkingSimulatorProps> = ({
  mission,
  onMissionComplete,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const step = mission.steps[currentStepIdx];

  const handleChoice = (idx: number) => {
    if (selectedChoiceIdx !== null) return;
    setSelectedChoiceIdx(idx);
    const choice = step.choices[idx];

    if (choice.isCorrect) {
      setFeedback({ isCorrect: true, text: choice.explanation });
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      setFeedback({ isCorrect: false, text: choice.explanation });
    }
  };

  const handleNextStep = () => {
    setSelectedChoiceIdx(null);
    setFeedback(null);
    if (currentStepIdx + 1 < mission.steps.length) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      // Completed simulator, proceed to Quiz!
      onMissionComplete(correctAnswersCount + (feedback?.isCorrect ? 1 : 0));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-light text-sky flex items-center justify-center font-bold">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">{mission.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="pill-badge pill-sky text-xs font-bold">
            Step {currentStepIdx + 1} of {mission.steps.length}
          </span>
        </div>
      </div>

      {/* Network Topology Visualizer Header */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card overflow-hidden">
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase font-bold text-warm-400 tracking-wider">
            Live Network Topology Node Stream
          </span>
        </div>

        <div className="flex items-center justify-between max-w-lg mx-auto relative py-4">
          {/* Connecting Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-warm-200 z-0" />

          {/* Node 1: Client IP */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              currentStepIdx >= 0 ? 'bg-sky text-white border-sky shadow-sm' : 'bg-white text-warm-400 border-warm-300'
            }`}>
              <Network className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-warm-700 mt-1">Client LAN</span>
          </div>

          {/* Node 2: Firewall Router */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              currentStepIdx >= 1 ? 'bg-sky text-white border-sky shadow-sm' : 'bg-white text-warm-400 border-warm-300'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-warm-700 mt-1">Gateway NAT</span>
          </div>

          {/* Node 3: ISP Router */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              currentStepIdx >= 2 ? 'bg-sky text-white border-sky shadow-sm' : 'bg-white text-warm-400 border-warm-300'
            }`}>
              <Network className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-warm-700 mt-1">WAN Hop</span>
          </div>

          {/* Node 4: Target Server */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              currentStepIdx >= 3 ? 'bg-sage-deep text-white border-sage-deep shadow-sm' : 'bg-white text-warm-400 border-warm-300'
            }`}>
              <Server className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-warm-700 mt-1">Target Web Server</span>
          </div>
        </div>

        <div className="p-3 bg-warm-50 border border-warm-200 rounded-2xl mt-4 text-xs font-mono text-warm-700 text-center">
          {step.systemContext}
        </div>
      </div>

      {/* Interactive Scenario Prompt & Decisions */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">{step.title}</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">{step.description}</p>

        {/* Choice Buttons */}
        <div className="space-y-3 mb-6">
          {step.choices.map((choice, idx) => {
            const isSelected = selectedChoiceIdx === idx;
            return (
              <button
                key={choice.id}
                disabled={selectedChoiceIdx !== null}
                onClick={() => handleChoice(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? choice.isCorrect
                      ? 'bg-sage-light border-mint text-warm-900'
                      : 'bg-coral-light border-coral text-warm-900'
                    : 'bg-warm-50/50 border-warm-200 hover:border-sky hover:bg-white text-warm-800'
                }`}
              >
                <span>{choice.text}</span>
                {isSelected && choice.isCorrect && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
                {isSelected && !choice.isCorrect && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`p-4 rounded-2xl border mb-6 ${
                feedback.isCorrect
                  ? 'bg-sage-light/60 border-sage text-sage-deep'
                  : 'bg-coral-light/60 border-coral text-coral-dark'
              }`}
            >
              <div className="flex items-start gap-2 text-sm font-semibold">
                <Zap className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{feedback.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {selectedChoiceIdx !== null && (
          <button
            onClick={handleNextStep}
            className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentStepIdx + 1 < mission.steps.length ? 'Proceed to Next Network Hop' : 'Proceed to Mission Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
