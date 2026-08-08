'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, CheckCircle2, AlertTriangle, ArrowRight, Play, FileCode, Check } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface WebDevSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const WebDevSimulator: React.FC<WebDevSimulatorProps> = ({
  mission,
  onMissionComplete,
}) => {
  const [fixedBugs, setFixedBugs] = useState<number[]>([]);
  const [activeBugIdx, setActiveBugIdx] = useState(0);
  const [selectedFix, setSelectedFix] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const BUGS = [
    {
      id: 1,
      title: 'Bug 1: CSS Flexbox Alignment Overlap',
      problemDesc: 'Navigation bar items are overflowing vertically on mobile viewport.',
      codeSnippet: `.navbar-container {\n  display: flex;\n  /* BUG HERE: Items stacking vertically */\n  flex-direction: column;\n  align-items: flex-start;\n}`,
      fixes: [
        { text: 'Change flex-direction to row & add flex-wrap: wrap', isCorrect: true, exp: 'Fixed! Flex-direction: row lays out items horizontally with wrapping.' },
        { text: 'Set position: absolute on every navigation link', isCorrect: false, exp: 'Incorrect! Absolute positioning causes items to overlap on top of each other.' },
      ]
    },
    {
      id: 2,
      title: 'Bug 2: Async Data Fetch Race Condition',
      problemDesc: 'Component sets stale user profile state because fetch response returns out of order.',
      codeSnippet: `useEffect(() => {\n  // BUG: Missing cancellation cleanup flag!\n  fetchUserProfile(userId).then(data => setUser(data));\n}, [userId]);`,
      fixes: [
        { text: 'Add AbortController or let isSubscribed boolean flag check inside cleanup return', isCorrect: true, exp: 'Awesome! AbortController cancels stale pending HTTP requests on parameter change.' },
        { text: 'Replace fetch with setTimeout(1000)', isCorrect: false, exp: 'Incorrect! setTimeout introduces arbitrary latency without solving race conditions.' },
      ]
    }
  ];

  const currentBug = BUGS[activeBugIdx];

  const handleFixSelect = (idx: number, isCorrect: boolean, exp: string) => {
    setSelectedFix(idx);
    setFeedback(exp);
    if (isCorrect && !fixedBugs.includes(activeBugIdx)) {
      setFixedBugs([...fixedBugs, activeBugIdx]);
    }
  };

  const handleNextBug = () => {
    setSelectedFix(null);
    setFeedback(null);
    if (activeBugIdx + 1 < BUGS.length) {
      setActiveBugIdx(activeBugIdx + 1);
    } else {
      onMissionComplete(fixedBugs.length);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-light text-accent-dark flex items-center justify-center font-bold">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">Live Code Inspector & IDE Bug Hunter</p>
          </div>
        </div>

        <span className="pill-badge pill-yellow text-xs font-bold">
          Bug {activeBugIdx + 1} of {BUGS.length}
        </span>
      </div>

      {/* Code Editor Mockup Card */}
      <div className="quest-card p-6 bg-[#1E1E1E] text-white rounded-3xl mb-8 shadow-card overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-sky" />
            <span className="text-xs font-mono text-gray-300">AppInspector.tsx</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-coral" />
            <div className="w-3 h-3 rounded-full bg-accent-dark" />
            <div className="w-3 h-3 rounded-full bg-mint" />
          </div>
        </div>

        <pre className="font-mono text-xs sm:text-sm text-sky-light leading-relaxed p-3 bg-black/40 rounded-xl overflow-x-auto">
          {currentBug.codeSnippet}
        </pre>
      </div>

      {/* Bug Details & Fix Options */}
      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">{currentBug.title}</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">{currentBug.problemDesc}</p>

        <div className="space-y-3 mb-6">
          {currentBug.fixes.map((fix, idx) => (
            <button
              key={idx}
              disabled={selectedFix !== null}
              onClick={() => handleFixSelect(idx, fix.isCorrect, fix.exp)}
              className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between gap-3 cursor-pointer ${
                selectedFix === idx
                  ? fix.isCorrect
                    ? 'bg-sage-light border-mint text-warm-900'
                    : 'bg-coral-light border-coral text-warm-900'
                  : 'bg-warm-50/50 border-warm-200 hover:border-accent-dark hover:bg-white text-warm-800'
              }`}
            >
              <span>{fix.text}</span>
              {selectedFix === idx && fix.isCorrect && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
              {selectedFix === idx && !fix.isCorrect && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="p-4 rounded-2xl border bg-warm-50 border-warm-200 text-warm-800 text-sm font-semibold mb-6">
            {feedback}
          </div>
        )}

        {selectedFix !== null && (
          <button
            onClick={handleNextBug}
            className="w-full py-3.5 rounded-full bg-accent-dark hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{activeBugIdx + 1 < BUGS.length ? 'Inspect Next Code Bug' : 'Proceed to Mission Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
