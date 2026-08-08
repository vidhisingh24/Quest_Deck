'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Trophy, ArrowRight, Zap, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_DATA } from '@/lib/data';
import { QuizQuestion } from '@/lib/types';

interface MissionQuizProps {
  nodeId: string;
  xpReward: number;
  coinReward: number;
  onFinishQuiz: (score: number) => void;
}

export const MissionQuiz: React.FC<MissionQuizProps> = ({
  nodeId,
  xpReward,
  coinReward,
  onFinishQuiz,
}) => {
  const questions: QuizQuestion[] = QUIZ_DATA[nodeId] || QUIZ_DATA['node_net_1'];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const question = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOpt(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    setUserAnswers([...userAnswers, selectedOpt]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      // Calculate overall score
      const correctCount = userAnswers.filter(
        (ans, idx) => ans === questions[idx].correctIndex
      ).length + (selectedOpt === question.correctIndex ? 1 : 0);

      setShowSummary(true);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F8EF7', '#A8D5BA', '#FFD166'],
        });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setUserAnswers([]);
    setIsSubmitted(false);
    setShowSummary(false);
  };

  if (showSummary) {
    const totalCorrect = userAnswers.filter(
      (ans, idx) => ans === questions[idx].correctIndex
    ).length;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4 py-12 text-center"
      >
        <div className="quest-card p-8 sm:p-10 bg-white border border-warm-200 rounded-3xl shadow-float relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-warm-900 mb-1">Mission Completed!</h2>
          <p className="text-sm text-warm-600 mb-6">
            Quiz Score: <span className="font-extrabold text-sky">{totalCorrect} / {questions.length}</span>
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="p-4 rounded-2xl bg-sky-light/60 border border-sky/30">
              <span className="text-[10px] uppercase font-bold text-warm-500">XP Earned</span>
              <p className="text-2xl font-extrabold text-sky flex items-center justify-center gap-1 mt-1">
                <Zap className="w-5 h-5 fill-sky" />
                <span>+{xpReward}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-accent-light/60 border border-accent-dark/30">
              <span className="text-[10px] uppercase font-bold text-warm-500">Coins Claimed</span>
              <p className="text-2xl font-extrabold text-accent-dark flex items-center justify-center gap-1 mt-1">
                <Coins className="w-5 h-5" />
                <span>+{coinReward}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 py-3.5 rounded-full bg-warm-100 hover:bg-warm-200 text-warm-800 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={() => onFinishQuiz(totalCorrect)}
              className="flex-1 py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-float transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Collect Rewards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-dark" />
          <h2 className="text-lg font-extrabold text-warm-900">Post-Mission Knowledge Check</h2>
        </div>
        <span className="pill-badge pill-sky text-xs font-bold">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 leading-snug mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === question.correctIndex;

            let cardStyle = 'bg-warm-50/60 border-warm-200 hover:border-sky text-warm-800';
            if (isSubmitted) {
              if (isCorrect) {
                cardStyle = 'bg-sage-light border-mint text-warm-900 font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-coral-light border-coral text-warm-900 font-bold';
              } else {
                cardStyle = 'bg-warm-50 opacity-50 border-warm-200 text-warm-500';
              }
            } else if (isSelected) {
              cardStyle = 'bg-sky-light/50 border-sky text-warm-900 font-bold';
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
              >
                <span>{opt}</span>
                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-mint shrink-0" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-coral shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* AI Explanation Box */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-sky-light/40 border border-sky/30 text-warm-800 text-xs sm:text-sm font-medium mb-6"
            >
              <div className="flex items-center gap-1.5 font-bold text-sky mb-1">
                <Sparkles className="w-4 h-4 text-accent-dark" />
                <span>Quest AI Explanation:</span>
              </div>
              <p className="leading-relaxed">{question.aiExplanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        {!isSubmitted ? (
          <button
            disabled={selectedOpt === null}
            onClick={handleCheckAnswer}
            className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${
              selectedOpt !== null
                ? 'bg-sky hover:bg-sky-dark text-white shadow-sm cursor-pointer'
                : 'bg-warm-200 text-warm-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-float transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Quiz & Claim Rewards'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
