'use client';

import React, { useState, useEffect } from 'react';
import { QIntroSequence } from '@/components/QIntroSequence';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { InteractiveMissionTeaser } from '@/components/landing/InteractiveMissionTeaser';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { Footer } from '@/components/landing/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { RoadmapView } from '@/components/roadmap/RoadmapView';
import { MissionRunner } from '@/components/missions/MissionRunner';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { XPHeader } from '@/components/gamification/XPHeader';
import { LeaderboardModal } from '@/components/gamification/LeaderboardModal';
import { DailyQuestsModal } from '@/components/gamification/DailyQuestsModal';
import { QuestShopModal } from '@/components/gamification/QuestShopModal';
import { FlashcardDeckModal } from '@/components/gamification/FlashcardDeckModal';
import { CertificateModal } from '@/components/gamification/CertificateModal';
import { SearchBar } from '@/components/search/SearchBar';
import { AIMentorWidget } from '@/components/ai/AIMentorWidget';

import { UserProfile, RoadmapNode, Achievement, DailyQuest, ShopItem } from '@/lib/types';
import { 
  getStoredUser, 
  setStoredUser, 
  getStoredRoadmap, 
  setStoredRoadmap,
  getStoredAchievements,
  addXpAndCoins,
  completeRoadmapNode,
  clearAuthToken
} from '@/lib/storage';
import { sounds } from '@/lib/soundEngine';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('questdeck_intro_seen');
    }
    return true;
  });

  const handleFinishIntro = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('questdeck_intro_seen', 'true');
    }
    setShowIntro(false);
  };

  const [currentView, setCurrentView] = useState<'landing' | 'roadmap' | 'dashboard' | 'mission' | 'onboarding'>('landing');
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const [activeMissionNode, setActiveMissionNode] = useState<RoadmapNode | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDailyQuestsOpen, setIsDailyQuestsOpen] = useState(false);
  const [isQuestShopOpen, setIsQuestShopOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setRoadmapNodes(getStoredRoadmap());
    setAchievements(getStoredAchievements());
  }, []);

  const handleAuthSuccess = (updatedUser: UserProfile, isNewSignup: boolean) => {
    sounds.playLevelUp();
    setUser(updatedUser);
    if (isNewSignup || !updatedUser.isOnboarded) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleOnboardingComplete = (updatedUser: UserProfile) => {
    sounds.playLevelUp();
    setUser(updatedUser);
    setCurrentView('roadmap');
  };

  const handleSelectMissionNode = (node: RoadmapNode) => {
    sounds.playClick();
    setActiveMissionNode(node);
    setCurrentView('mission');
  };

  const handleCompleteMission = (xpGain: number, coinGain: number) => {
    if (!activeMissionNode) return;
    
    sounds.playXpGain();
    const updatedRoadmap = completeRoadmapNode(activeMissionNode.id);
    setRoadmapNodes(updatedRoadmap);

    const { user: updatedUser } = addXpAndCoins(xpGain, coinGain);
    setUser(updatedUser);

    setCurrentView('dashboard');
  };

  const handleClaimDailyQuest = (quest: DailyQuest) => {
    sounds.playXpGain();
    const { user: updatedUser } = addXpAndCoins(quest.rewardXp, quest.rewardCoins);
    setUser(updatedUser);
  };

  const handleBuyShopItem = (item: ShopItem) => {
    if (!user) return;
    if (user.coins >= item.costCoins) {
      sounds.playLevelUp();
      const updatedUser = {
        ...user,
        coins: user.coins - item.costCoins,
      };
      setStoredUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    setCurrentView('landing');
  };

  if (showIntro) {
    return <QIntroSequence onComplete={handleFinishIntro} />;
  }

  if (currentView === 'onboarding' && user) {
    return <OnboardingWizard user={user} onComplete={handleOnboardingComplete} />;
  }

  if (currentView === 'mission' && activeMissionNode) {
    return (
      <MissionRunner
        node={activeMissionNode}
        onCompleteMission={handleCompleteMission}
        onCancel={() => setCurrentView('roadmap')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Navbar
        user={user}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onNavigate={(view) => setCurrentView(view as any)}
        onReplayIntro={() => setShowIntro(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
      />

      {user && (
        <XPHeader
          user={user}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection
              onStartQuest={() => {
                if (user) {
                  setCurrentView('roadmap');
                } else {
                  setAuthMode('signup');
                  setIsAuthOpen(true);
                }
              }}
              onTryMission={() => {
                if (roadmapNodes.length > 0) {
                  setActiveMissionNode(roadmapNodes[0]);
                  setCurrentView('mission');
                }
              }}
            />
            <InteractiveMissionTeaser />
            <FeaturesGrid />
            <TestimonialsSection />
          </>
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            user={user || getStoredUser()}
            roadmapNodes={roadmapNodes}
            onSelectNode={handleSelectMissionNode}
            onUserUpdated={(updatedUser) => {
              setUser(updatedUser);
              setStoredUser(updatedUser);
            }}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            user={user || getStoredUser()}
            roadmapNodes={roadmapNodes}
            achievements={achievements}
            onNavigateToRoadmap={() => setCurrentView('roadmap')}
            onLaunchMission={handleSelectMissionNode}
            onOpenAIMentor={() => {}}
            onOpenDailyQuests={() => setIsDailyQuestsOpen(true)}
            onOpenQuestShop={() => setIsQuestShopOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenFlashcards={() => setIsFlashcardsOpen(true)}
            onBackToLanding={() => setCurrentView('landing')}
            onUserSwitch={(newUser) => {
              setUser(newUser);
              setStoredUser(newUser);
            }}
          />
        )}
      </main>

      <Footer
        onNavigate={(view) => setCurrentView(view as any)}
        onReplayIntro={() => setShowIntro(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <DailyQuestsModal
        isOpen={isDailyQuestsOpen}
        onClose={() => setIsDailyQuestsOpen(false)}
        onClaim={handleClaimDailyQuest}
      />

      <FlashcardDeckModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      {user && (
        <CertificateModal
          user={user}
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNode={handleSelectMissionNode}
      />

      {user && (
        <QuestShopModal
          user={user}
          isOpen={isQuestShopOpen}
          onClose={() => setIsQuestShopOpen(false)}
          onBuyItem={handleBuyShopItem}
        />
      )}

      {/* Floating Global AI Mentor Chatbot */}
      {user && (
        <AIMentorWidget user={user} />
      )}
    </div>
  );
}
