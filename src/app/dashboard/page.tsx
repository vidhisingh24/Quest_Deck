'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { UserProfile, RoadmapNode, Achievement } from '@/lib/types';
import { 
  getStoredUser, 
  setStoredUser, 
  getStoredRoadmap, 
  getStoredAchievements
} from '@/lib/storage';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setUser(getStoredUser());
    setRoadmapNodes(getStoredRoadmap());
    setAchievements(getStoredAchievements());
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-warm-700">Loading QuestDeck Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      <Navbar
        user={user}
        onOpenAuth={() => {}}
        onNavigate={(view) => {
          if (view === 'landing') router.push('/');
          if (view === 'roadmap') router.push('/roadmap');
        }}
        onReplayIntro={() => router.push('/')}
        onOpenSearch={() => {}}
        onOpenFlashcards={() => router.push('/flashcards')}
      />

      <main className="flex-1">
        <DashboardView
          user={user}
          roadmapNodes={roadmapNodes}
          achievements={achievements}
          onNavigateToRoadmap={() => router.push('/roadmap')}
          onLaunchMission={(node) => router.push(`/mission?nodeId=${node.id}`)}
          onOpenAIMentor={() => {}}
          onOpenDailyQuests={() => router.push('/quests')}
          onOpenQuestShop={() => router.push('/shop')}
          onOpenCertificate={() => router.push('/certificate')}
          onOpenFlashcards={() => router.push('/flashcards')}
          onBackToLanding={() => router.back()}
          onUserSwitch={(newUser) => {
            setUser(newUser);
            setStoredUser(newUser);
          }}
        />
      </main>
    </div>
  );
}
