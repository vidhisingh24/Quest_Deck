'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Film, 
  Cpu, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  Coins, 
  Sparkles,
  Play,
  Bookmark,
  ArrowRight,
  Code2
} from 'lucide-react';
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
import { MissionVideoPlayer } from './MissionVideoPlayer';
import { ArticleMarkdownRenderer } from './ArticleMarkdownRenderer';
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
  const [activeTab, setActiveTab] = useState<'article' | 'video' | 'sim' | 'quiz'>('article');

  const missionData: InteractiveMission = MISSIONS_DATA[node.id] || {
    id: node.id,
    title: node.title,
    topic: node.category,
    tagline: node.description,
    description: node.description,
    xpReward: node.xpReward,
    coinReward: node.coinReward,
    durationMinutes: node.estimatedMinutes,
    articleContent: `### Lesson Overview for ${node.title}\n\nMaster key architectural principles and practical concepts in ${node.category}.\n\n#### Key Components:\n1. Call Stack & Execution Context LIFO order.\n2. Web APIs & Event Loop microtasks vs macrotasks.\n\n> [!NOTE]\n> Pro Tip: Always clear microtasks before macrotask execution!`,
    keyFacts: [
      `Essential subject milestone for ${node.category} domain`,
      `Hands-on practical deliverable: ${node.deliverable || 'Interactive Simulator Scenario'}`,
      `Earn +${node.xpReward} XP and +${node.coinReward} Coins upon quiz completion`
    ],
    videoUrl: 'https://www.youtube.com/embed/8aGhZQkoFbQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    videoDuration: '04:15',
    videoTimestamps: [
      { time: '00:15', label: '1. Architectural Overview' },
      { time: '01:30', label: '2. Practical Application' },
      { time: '03:10', label: '3. Troubleshooting' }
    ],
    steps: []
  };

  const handleSimComplete = (score: number) => {
    sounds.playXpGain();
    setActiveTab('quiz');
  };

  const handleQuizComplete = (quizScore: number) => {
    sounds.playLevelUp();
    onCompleteMission(node.xpReward, node.coinReward);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-20">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-warm-200 py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => {
              sounds.playClick();
              onCancel();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-50 hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all cursor-pointer shadow-card"
          >
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Visual Roadmap</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="pill-badge pill-sky text-xs font-bold">
              {node.category} Track
            </span>
            <div className="hidden sm:flex items-center gap-3 text-xs font-extrabold text-warm-800">
              <span className="flex items-center gap-1 text-sky"><Zap className="w-3.5 h-3.5 fill-sky" /> +{node.xpReward} XP</span>
              <span className="flex items-center gap-1 text-amber-700"><Coins className="w-3.5 h-3.5" /> +{node.coinReward} Coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Mission Title Banner */}
      <div className="bg-gradient-to-b from-white to-warm-50/50 border-b border-warm-200 py-8 px-4 sm:px-8 mb-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="pill-badge pill-sky text-xs font-bold uppercase tracking-wider mb-2">
            Multimodal Learning Studio
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            {missionData.title}
          </h1>
          <p className="text-sm text-warm-600 max-w-2xl mx-auto mt-2">
            {missionData.tagline || missionData.description}
          </p>

          {/* 4 Interactive Learning Mode Tabs */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-warm-100/90 border border-warm-200 overflow-x-auto max-w-full">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('article');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'article'
                  ? 'bg-white text-warm-900 shadow-sm border border-warm-200'
                  : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky" />
              <span>1. Article & Facts</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('video');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-white text-warm-900 shadow-sm border border-warm-200'
                  : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              <Film className="w-4 h-4 text-accent-dark" />
              <span>2. Video Tutorial</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('sim');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'sim'
                  ? 'bg-sky text-white shadow-sm font-black'
                  : 'text-warm-600 hover:text-sky'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>3. Interactive Simulator</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('quiz');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-500 text-white shadow-sm font-black'
                  : 'text-warm-600 hover:text-amber-600'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>4. Q&A Knowledge Check</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Tab 1: Comprehensive Article & Key Facts */}
        {activeTab === 'article' && (
          <div className="space-y-8">
            <div className="quest-card p-6 sm:p-10 bg-white border border-warm-200 rounded-3xl shadow-card">
              <div className="p-4 rounded-2xl bg-sky-light/40 border border-sky/30 text-xs font-semibold text-sky-deep flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-sky shrink-0" />
                <span>Read key concepts below, then test your skills in the Video Tutorial & Simulator tabs!</span>
              </div>

              {/* Rendered Article Content via ArticleMarkdownRenderer */}
              <ArticleMarkdownRenderer content={missionData.articleContent || ''} />

              {/* Code Snippets if present */}
              {missionData.codeSnippets && missionData.codeSnippets.length > 0 && (
                <div className="mt-8 pt-6 border-t border-warm-200 space-y-4">
                  <h4 className="text-base font-extrabold text-warm-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky" /> Interactive Code Breakdown
                  </h4>
                  {missionData.codeSnippets.map((snippet, idx) => (
                    <div key={idx} className="rounded-2xl bg-warm-900 border border-warm-700 p-4 text-white font-mono text-xs overflow-x-auto shadow-md">
                      <div className="flex items-center justify-between mb-2 text-warm-400 font-sans text-xs">
                        <span className="font-bold">{snippet.title}</span>
                        <span className="uppercase text-[10px] bg-warm-800 px-2 py-0.5 rounded">{snippet.language}</span>
                      </div>
                      <pre className="text-emerald-400 leading-relaxed">{snippet.code}</pre>
                      <p className="mt-3 pt-2 border-t border-warm-800 font-sans text-xs text-warm-300 italic">{snippet.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bulleted Key Facts Box */}
            {missionData.keyFacts && missionData.keyFacts.length > 0 && (
              <div className="quest-card p-6 bg-gradient-to-r from-amber-50/60 via-white to-white border border-amber-200 rounded-3xl shadow-card">
                <h4 className="text-base font-extrabold text-amber-950 mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-600" /> Key Takeaways & Facts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {missionData.keyFacts.map((fact, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-amber-200/80 flex items-start gap-2.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-warm-900">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Resource Links */}
            {missionData.curatedLinks && missionData.curatedLinks.length > 0 && (
              <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
                <h4 className="text-base font-extrabold text-warm-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-sky" /> Curated References & Official Documentation
                </h4>
                <div className="space-y-2.5">
                  {missionData.curatedLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl border border-warm-200 hover:border-sky bg-warm-50/50 hover:bg-white flex items-center justify-between text-xs font-bold text-warm-900 transition-all group"
                    >
                      <span className="group-hover:text-sky transition-colors">{link.title} ({link.source})</span>
                      <ExternalLink className="w-3.5 h-3.5 text-warm-400 group-hover:text-sky" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Next Tab Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('video');
                }}
                className="px-8 py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-extrabold text-sm shadow-float transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Video Tutorial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Video Tutorial Hub */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <MissionVideoPlayer mission={missionData} />

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('sim');
                }}
                className="px-8 py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-extrabold text-sm shadow-float transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Interactive Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Decision Simulator */}
        {activeTab === 'sim' && (
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
        )}

        {/* Tab 4: Post-Lesson Q&A Knowledge Check */}
        {activeTab === 'quiz' && (
          <MissionQuiz
            nodeId={node.id}
            xpReward={node.xpReward}
            coinReward={node.coinReward}
            onFinishQuiz={handleQuizComplete}
          />
        )}
      </main>
    </div>
  );
};
