'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle2, AlertTriangle, ArrowRight, Table, Search, Zap } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface DatabaseSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const DatabaseSimulator: React.FC<DatabaseSimulatorProps> = ({ mission, onMissionComplete }) => {
  const [hasIndex, setHasIndex] = useState(false);
  const [executionTime, setExecutionTime] = useState(8400); // 8.4 seconds
  const [scanType, setScanType] = useState('Sequential Scan (10,000,000 rows)');
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const handleCreateIndex = () => {
    setHasIndex(true);
    setExecutionTime(2); // 2ms!
    setScanType('Index Scan using B-Tree orders_user_id_idx');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-light text-sage-deep flex items-center justify-center font-bold">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">PostgreSQL EXPLAIN Execution Tree Optimizer</p>
          </div>
        </div>
        <span className="pill-badge pill-sage text-xs font-bold">Database Sim</span>
      </div>

      {/* SQL EXPLAIN Visualizer Card */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-warm-800">
            <Table className="w-4 h-4 text-sage-deep" />
            <span>Target Table: orders (10,000,000 Rows)</span>
          </div>
          <span className={`pill-badge text-xs font-mono font-bold ${hasIndex ? 'pill-sage' : 'pill-yellow'}`}>
            {hasIndex ? 'B-Tree Index ACTIVE' : 'NO INDEX (Slow)'}
          </span>
        </div>

        <div className="p-4 bg-warm-900 rounded-2xl text-emerald-400 font-mono text-xs space-y-1 my-4">
          <p className="text-sky-light">&gt; EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 49201;</p>
          <p className="text-amber-300">Scan Node: {scanType}</p>
          <p className="text-white">Execution Time: <span className="text-emerald-400 font-bold">{executionTime} ms</span></p>
        </div>

        {!hasIndex && (
          <div className="text-center">
            <button
              onClick={handleCreateIndex}
              className="px-6 py-2.5 rounded-full bg-sage-deep hover:bg-sage-dark text-white font-bold text-xs shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Create B-Tree Index on user_id</span>
            </button>
          </div>
        )}
      </div>

      {/* Decision Card */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">Scenario: Eliminate 10M Row Sequential Scan</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">
          How does creating a B-Tree index decrease database query execution time from 8,400ms down to 2ms?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedChoiceIdx(0)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 0 ? 'bg-sage-light border-mint text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>A. By replacing O(N) full table scans with O(log N) balanced multi-way tree traversals</span>
            {selectedChoiceIdx === 0 && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
          </button>

          <button
            onClick={() => setSelectedChoiceIdx(1)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 1 ? 'bg-coral-light border-coral text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>B. By compressing the hard drive storage disk</span>
            {selectedChoiceIdx === 1 && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
          </button>
        </div>

        {selectedChoiceIdx !== null && (
          <button
            onClick={() => onMissionComplete(selectedChoiceIdx === 0 ? 1 : 0)}
            className="w-full py-3.5 rounded-full bg-sage-deep hover:bg-sage-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Database Mission Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
