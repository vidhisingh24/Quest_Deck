'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MissionRunner } from '@/components/missions/MissionRunner';
import { RoadmapNode, UserProfile } from '@/lib/types';
import { 
  getStoredUser, 
  getStoredRoadmap, 
  completeRoadmapNode, 
  addXpAndCoins 
} from '@/lib/storage';
import { MULTI_SUBJECT_ROADMAPS } from '@/lib/data';

function MissionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nodeId = searchParams.get('nodeId') || 'node_web_1';

  const [user, setUser] = useState<UserProfile | null>(null);
  const [node, setNode] = useState<RoadmapNode | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    const storedNodes = getStoredRoadmap();
    const allBaseNodes = Object.values(MULTI_SUBJECT_ROADMAPS).flat();
    const foundNode = storedNodes.find(n => n.id === nodeId) || 
                      allBaseNodes.find(n => n.id === nodeId) || 
                      storedNodes[0] || 
                      allBaseNodes[0];
    setNode(foundNode);
  }, [nodeId]);

  const handleCompleteMission = (xpGain: number, coinGain: number) => {
    if (!node) return;
    completeRoadmapNode(node.id);
    addXpAndCoins(xpGain, coinGain);
    router.push('/dashboard');
  };

  const handleCancel = () => {
    router.back();
  };

  if (!node || !user) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-warm-700">Loading Interactive Mission Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <MissionRunner
      node={node}
      onCompleteMission={handleCompleteMission}
      onCancel={handleCancel}
    />
  );
}

export default function DedicatedMissionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-sky border-t-transparent animate-spin" />
      </div>
    }>
      <MissionContent />
    </Suspense>
  );
}
