'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, Lock, Terminal } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface CybersecuritySimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const CybersecuritySimulator: React.FC<CybersecuritySimulatorProps> = ({
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
      onMissionComplete(correctAnswersCount + (feedback?.isCorrect ? 1 : 0));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-light text-sage-deep flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">{mission.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="pill-badge pill-sage text-xs font-bold">
            SOC Incident {currentStepIdx + 1} of {mission.steps.length}
          </span>
        </div>
      </div>

      {/* Security Operations Console Teaser */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-coral animate-pulse" />
            <span className="text-xs font-bold text-warm-900">Apex Corp Security Telemetry</span>
          </div>
          <span className="pill-badge pill-sky text-xs font-mono">SOC Desk Status: ACTIVE</span>
        </div>

        <div className="p-4 bg-warm-900 rounded-2xl text-emerald-400 font-mono text-xs space-y-1">
          <p className="text-warm-400">[SYSTEM ALERT]: Threat signatures detected in traffic stream.</p>
          <p className="text-amber-300">{step.systemContext}</p>
          <p className="text-slate-300">&gt; Awaiting CISO mitigation response...</p>
        </div>
      </div>

      {/* Scenario & Choices */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">{step.title}</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">{step.description}</p>

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
                    : 'bg-warm-50/50 border-warm-200 hover:border-sage hover:bg-white text-warm-800'
                }`}
              >
                <span>{choice.text}</span>
                {isSelected && choice.isCorrect && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
                {isSelected && !choice.isCorrect && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
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
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{feedback.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedChoiceIdx !== null && (
          <button
            onClick={handleNextStep}
            className="w-full py-3.5 rounded-full bg-sage-deep hover:bg-sage-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentStepIdx + 1 < mission.steps.length ? 'Next Incident Vector' : 'Proceed to Mission Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
