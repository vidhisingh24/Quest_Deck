'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { RoadmapView } from '@/components/roadmap/RoadmapView';
import { UserProfile, RoadmapNode } from '@/lib/types';
import { 
  getStoredUser, 
  setStoredUser, 
  getStoredRoadmap
} from '@/lib/storage';

export default function DedicatedRoadmapPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);

  useEffect(() => {
    setUser(getStoredUser());
    setRoadmapNodes(getStoredRoadmap());
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-warm-700">Loading Visual Roadmap...</p>
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
          if (view === 'dashboard') router.push('/dashboard');
        }}
        onReplayIntro={() => router.push('/')}
        onOpenSearch={() => {}}
        onOpenFlashcards={() => router.push('/flashcards')}
      />

      <main className="flex-1">
        <RoadmapView
          user={user}
          roadmapNodes={roadmapNodes}
          onSelectNode={(node) => {
            // Navigate directly to dedicated mission page route!
            router.push(`/mission?nodeId=${node.id}`);
          }}
          onUserUpdated={(updatedUser) => {
            setUser(updatedUser);
            setStoredUser(updatedUser);
          }}
        />
      </main>
    </div>
  );
}
