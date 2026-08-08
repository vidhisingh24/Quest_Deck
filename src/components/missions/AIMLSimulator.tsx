'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface AIMLSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const AIMLSimulator: React.FC<AIMLSimulatorProps> = ({ mission, onMissionComplete }) => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(10);
  const [isTrained, setIsTrained] = useState(false);
  const [loss, setLoss] = useState(2.45);
  const [accuracy, setAccuracy] = useState(42);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const handleTrain = () => {
    setIsTrained(true);
    if (learningRate === 0.001) {
      setLoss(0.04);
      setAccuracy(98);
    } else if (learningRate > 0.1) {
      setLoss(Infinity);
      setAccuracy(10);
    } else {
      setLoss(0.35);
      setAccuracy(85);
    }
  };

  const handleChoice = (idx: number) => {
    setSelectedChoiceIdx(idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-light text-sky flex items-center justify-center font-bold">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">Neural Network Hyperparameter & Loss Optimizer</p>
          </div>
        </div>
        <span className="pill-badge pill-sky text-xs font-bold">AI & ML Sim</span>
      </div>

      {/* Neural Network Weight Matrix Visualization Card */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
          <span className="text-xs font-bold text-warm-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-sky" />
            <span>Forward-Propagation Weights Matrix</span>
          </span>
          <span className="pill-badge pill-yellow text-xs font-mono">
            {isTrained ? `Status: Trained (Acc ${accuracy}%)` : 'Status: Untrained'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center my-6">
          <div className="p-4 rounded-2xl bg-sky-light/40 border border-sky/30">
            <p className="text-[10px] uppercase font-bold text-warm-400">Learning Rate (α)</p>
            <p className="text-xl font-mono font-extrabold text-sky mt-1">{learningRate}</p>
          </div>
          <div className="p-4 rounded-2xl bg-sage-light/40 border border-sage/30">
            <p className="text-[10px] uppercase font-bold text-warm-400">Epoch Loss</p>
            <p className="text-xl font-mono font-extrabold text-sage-deep mt-1">
              {loss === Infinity ? 'NaN (Spike)' : loss}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-accent-light/40 border border-accent-dark/30">
            <p className="text-[10px] uppercase font-bold text-warm-400">Model Accuracy</p>
            <p className="text-xl font-mono font-extrabold text-accent-dark mt-1">{accuracy}%</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setLearningRate(0.001)}
            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              learningRate === 0.001 ? 'bg-sky text-white border-sky' : 'bg-warm-50 text-warm-700 border-warm-200'
            }`}
          >
            α = 0.001 (Adam Optimal)
          </button>
          <button
            onClick={() => setLearningRate(0.8)}
            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              learningRate === 0.8 ? 'bg-coral text-white border-coral' : 'bg-warm-50 text-warm-700 border-warm-200'
            }`}
          >
            α = 0.8 (Exploding Risk)
          </button>
          <button
            onClick={handleTrain}
            className="px-6 py-2 rounded-full bg-sage-deep hover:bg-sage-dark text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Forward Prop</span>
          </button>
        </div>
      </div>

      {/* Scenario Choice Card */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">Scenario: Fix Exploding Loss Gradient</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">
          During backpropagation, weight gradients exceed floating-point precision bounds causing Loss to spike to Infinity. What optimization technique resolves this?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleChoice(0)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 0 ? 'bg-sage-light border-mint text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>A. Apply Gradient Clipping (max_norm=1.0) & use Adam Optimizer with α = 0.001</span>
            {selectedChoiceIdx === 0 && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
          </button>

          <button
            onClick={() => handleChoice(1)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 1 ? 'bg-coral-light border-coral text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>B. Increase learning rate to 5.0 without gradient clipping</span>
            {selectedChoiceIdx === 1 && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
          </button>
        </div>

        {selectedChoiceIdx !== null && (
          <button
            onClick={() => onMissionComplete(selectedChoiceIdx === 0 ? 1 : 0)}
            className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to AI & ML Mission Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
