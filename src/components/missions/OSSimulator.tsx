'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, AlertTriangle, ArrowRight, Play, Server, Layers } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface OSSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const OSSimulator: React.FC<OSSimulatorProps> = ({
  mission,
  onMissionComplete,
}) => {
  const [activeQueue, setActiveQueue] = useState([
    { id: 'P1', name: 'Browser Tab', time: 10, state: 'Ready' },
    { id: 'P2', name: 'Database Query', time: 4, state: 'Ready' },
    { id: 'P3', name: 'Background Backup', time: 15, state: 'Waiting' },
  ]);

  const [selectedAlgo, setSelectedAlgo] = useState<'RR' | 'SJF' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAlgorithmChoice = (algo: 'RR' | 'SJF') => {
    setSelectedAlgo(algo);
    if (algo === 'RR') {
      setFeedback('Correct! Round Robin (RR) with a 4ms time quantum prevents long background jobs from starving interactive user processes.');
    } else {
      setFeedback('SJF minimizes average waiting time, but large processes like P3 may suffer from starvation!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-coral-light text-coral flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">Operating System CPU Scheduler Simulator</p>
          </div>
        </div>
      </div>

      {/* CPU Process Queue Visualization */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card">
        <h3 className="text-sm font-bold text-warm-800 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky" />
          <span>Active CPU Ready Queue & Context Switcher</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {activeQueue.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-warm-900">{p.id}: {p.name}</span>
                <span className="pill-badge pill-sky text-[10px]">{p.state}</span>
              </div>
              <p className="text-xs text-warm-500 font-mono">Burst Time: {p.time}ms</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Card */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">Scenario: Choose CPU Scheduling Algorithm</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">
          High-priority interactive processes arrive alongside a background batch job. Which scheduling algorithm ensures low latency without process starvation?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleAlgorithmChoice('RR')}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedAlgo === 'RR' ? 'bg-sage-light border-mint text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <div>
              <h4 className="text-base font-bold text-warm-900">Preemptive Round Robin (Quantum = 4ms)</h4>
              <p className="text-xs text-warm-500">Allocates fixed time slices fairly across all processes</p>
            </div>
            {selectedAlgo === 'RR' && <CheckCircle2 className="w-5 h-5 text-mint shrink-0" />}
          </button>

          <button
            onClick={() => handleAlgorithmChoice('SJF')}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedAlgo === 'SJF' ? 'bg-coral-light border-coral text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <div>
              <h4 className="text-base font-bold text-warm-900">Shortest Job First (Non-Preemptive)</h4>
              <p className="text-xs text-warm-500">Executes shortest burst processes first</p>
            </div>
            {selectedAlgo === 'SJF' && <AlertTriangle className="w-5 h-5 text-coral shrink-0" />}
          </button>
        </div>

        {feedback && (
          <div className="p-4 rounded-2xl border bg-warm-50 border-warm-200 text-warm-800 text-sm font-semibold mb-6">
            {feedback}
          </div>
        )}

        {selectedAlgo && (
          <button
            onClick={() => onMissionComplete(selectedAlgo === 'RR' ? 1 : 0)}
            className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Mission Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
