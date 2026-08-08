'use client';

import React, { useState } from 'react';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { InteractiveMission, RoadmapNode } from '@/lib/types';
import { MISSIONS_DATA } from '@/lib/data';
import { NetworkingSimulator } from './NetworkingSimulator';
import { CybersecuritySimulator } from './CybersecuritySimulator';
import { WebDevSimulator } from './WebDevSimulator';
import { OSSimulator } from './OSSimulator';
import { AIMLSimulator } from './AIMLSimulator';
import { DatabaseSimulator } from './DatabaseSimulator';
import { CloudDevOpsSimulator } from './CloudDevOpsSimulator';
import { MissionQuiz } from './MissionQuiz';
import { sounds } from '@/lib/soundEngine';

interface MissionRunnerProps {
  node: RoadmapNode;
  onCompleteMission: (xpGain: number, coinGain: number) => void;
  onCancel: () => void;
}

export const MissionRunner: React.FC<MissionRunnerProps> = ({
  node,
  onCompleteMission,
  onCancel,
}) => {
  const [phase, setPhase] = useState<'sim' | 'quiz'>('sim');

  const missionData: InteractiveMission = MISSIONS_DATA[node.id] || {
    id: node.id,
    title: node.title,
    topic: node.category,
    tagline: node.description,
    description: node.description,
    xpReward: node.xpReward,
    coinReward: node.coinReward,
    durationMinutes: node.estimatedMinutes,
    steps: [],
  };

  const handleSimComplete = (score: number) => {
    sounds.playXpGain();
    setPhase('quiz');
  };

  const handleQuizComplete = (quizScore: number) => {
    sounds.playLevelUp();
    onCompleteMission(node.xpReward, node.coinReward);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-20">
      {/* Top Universal Back Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-warm-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              sounds.playClick();
              onCancel();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-50 hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Visual Roadmap</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="pill-badge pill-sky text-xs font-bold">
              {node.category} Mission
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Content */}
      {phase === 'sim' ? (
        <>
          {node.category === 'Networking' && (
            <NetworkingSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Cybersecurity' && (
            <CybersecuritySimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Web Dev' && (
            <WebDevSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Operating Systems' && (
            <OSSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'AI & Algorithms' && (
            <AIMLSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Database Systems' && (
            <DatabaseSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Cloud & DevOps' && (
            <CloudDevOpsSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
          {node.category === 'Mobile App Dev' && (
            <WebDevSimulator mission={missionData} onMissionComplete={handleSimComplete} />
          )}
        </>
      ) : (
        <MissionQuiz
          nodeId={node.id}
          xpReward={node.xpReward}
          coinReward={node.coinReward}
          onFinishQuiz={handleQuizComplete}
        />
      )}
    </div>
  );
};
