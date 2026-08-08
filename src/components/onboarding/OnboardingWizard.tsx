'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  BarChart2, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Bot,
  Compass
} from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { setStoredUser } from '@/lib/storage';

interface OnboardingWizardProps {
  user: UserProfile;
  onComplete: (updatedUser: UserProfile) => void;
}

const CAREER_GOALS = [
  { id: 'fullstack', title: 'Full Stack Engineer', desc: 'Master frontend, backend APIs, and web architecture' },
  { id: 'cyber', title: 'Cybersecurity Specialist', desc: 'Defend enterprise infrastructure and mitigate threat vectors' },
  { id: 'network', title: 'Cloud & Network Architect', desc: 'Understand packet routing, protocols, and infrastructure' },
  { id: 'systems', title: 'Systems & Kernel Engineer', desc: 'Master CPU scheduling, memory, and operating systems' },
];

const SKILL_LEVELS: Array<'Beginner' | 'Intermediate' | 'Advanced'> = ['Beginner', 'Intermediate', 'Advanced'];

const DAILY_TIMES = [
  { minutes: 15, label: '15 Mins / Day', tag: 'Casual Questing' },
  { minutes: 30, label: '30 Mins / Day', tag: 'Recommended' },
  { minutes: 45, label: '45 Mins / Day', tag: 'Deep Mastery' },
  { minutes: 60, label: '60+ Mins / Day', tag: 'Intensive Training' },
];

const LEARNING_STYLES = [
  'Interactive Simulators (No Videos)',
  'Scenario-Based Security Ops',
  'Code Bug Fixing & IDE Challenges',
  'Visual Architecture Mapping',
];

const TOPICS = ['Networking', 'Cybersecurity', 'Web Development', 'Operating Systems', 'AI & Algorithms'];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [careerGoal, setCareerGoal] = useState(CAREER_GOALS[0].title);
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [dailyTime, setDailyTime] = useState(30);
  const [learningStyle, setLearningStyle] = useState(LEARNING_STYLES[0]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Networking', 'Cybersecurity']);

  // AI Planner Generating state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState('');

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleFinish = () => {
    setIsAiGenerating(true);
    setAiStatusMessage('Analyzing your career goals & target skill level...');

    setTimeout(() => {
      setAiStatusMessage('Identifying technical skill gaps in Networking & Security...');
    }, 900);

    setTimeout(() => {
      setAiStatusMessage('Generating weekly milestones & daily interactive missions...');
    }, 1800);

    setTimeout(() => {
      const updated: UserProfile = {
        ...user,
        careerGoal,
        skillLevel,
        dailyStudyTime: dailyTime,
        learningStyle,
        interests: selectedTopics,
        isOnboarded: true,
      };
      setStoredUser(updated);
      setIsAiGenerating(false);
      onComplete(updated);
    }, 2700);
  };

  if (isAiGenerating) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-white border border-warm-200 shadow-float flex items-center justify-center mb-6 text-sky"
        >
          <Bot className="w-10 h-10 animate-bounce" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-900 mb-2">
          AI Learning Planner at Work
        </h2>
        <p className="text-sm text-warm-600 max-w-md mb-6">{aiStatusMessage}</p>

        <div className="w-full max-w-xs h-2 bg-warm-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky via-sage to-accent-dark rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-10 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white border border-warm-200 rounded-3xl shadow-card p-6 sm:p-10 relative">
        {/* Step Counter Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-sky-light text-sky font-bold text-sm flex items-center justify-center">
              {step}
            </span>
            <span className="text-xs font-bold text-warm-700 uppercase tracking-wider">
              Step {step} of 5 • Onboarding Survey
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-8 bg-sky' : i < step ? 'w-3 bg-sage' : 'w-3 bg-warm-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Career Goal */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-warm-900 flex items-center gap-2">
                <Target className="w-6 h-6 text-sky" />
                <span>What is your primary career goal?</span>
              </h3>
              <p className="text-sm text-warm-500 mt-1">
                Our AI Learning Planner customizes your initial mission roadmap based on this target.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {CAREER_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setCareerGoal(goal.title)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    careerGoal === goal.title
                      ? 'bg-sky-light/50 border-sky text-warm-900 shadow-sm'
                      : 'bg-warm-50/50 border-warm-200 hover:border-warm-300 text-warm-700'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-warm-900">{goal.title}</h4>
                    <p className="text-xs text-warm-500 mt-0.5">{goal.desc}</p>
                  </div>
                  {careerGoal === goal.title && <CheckCircle2 className="w-5 h-5 text-sky shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Skill Level */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-warm-900 flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-sage-deep" />
                <span>What is your current technical skill level?</span>
              </h3>
              <p className="text-sm text-warm-500 mt-1">
                We adjust mission difficulty and initial milestone pacing to match your foundation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSkillLevel(lvl)}
                  className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                    skillLevel === lvl
                      ? 'bg-sage-light/60 border-sage text-warm-900 shadow-sm'
                      : 'bg-warm-50/50 border-warm-200 hover:border-warm-300 text-warm-700'
                  }`}
                >
                  <h4 className="text-base font-bold text-warm-900 mb-1">{lvl}</h4>
                  <p className="text-xs text-warm-500">
                    {lvl === 'Beginner' && 'Starting from scratch'}
                    {lvl === 'Intermediate' && 'Some CS fundamentals'}
                    {lvl === 'Advanced' && 'Experienced builder'}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Daily Study Time */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-warm-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-accent-dark" />
                <span>How much time can you study daily?</span>
              </h3>
              <p className="text-sm text-warm-500 mt-1">
                Quest sets realistic streak targets so you stay consistent without burnout.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DAILY_TIMES.map((timeItem) => (
                <button
                  key={timeItem.minutes}
                  onClick={() => setDailyTime(timeItem.minutes)}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    dailyTime === timeItem.minutes
                      ? 'bg-accent-light/60 border-accent-dark text-warm-900 shadow-sm'
                      : 'bg-warm-50/50 border-warm-200 hover:border-warm-300 text-warm-700'
                  }`}
                >
                  <div>
                    <h4 className="text-base font-bold text-warm-900">{timeItem.label}</h4>
                    <span className="pill-badge pill-yellow text-[10px] mt-1">{timeItem.tag}</span>
                  </div>
                  {dailyTime === timeItem.minutes && <CheckCircle2 className="w-5 h-5 text-accent-dark shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Learning Style */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-warm-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-coral" />
                <span>What is your preferred learning style?</span>
              </h3>
              <p className="text-sm text-warm-500 mt-1">
                Every lesson on Quest is an interactive mission instead of passive video playback.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {LEARNING_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setLearningStyle(style)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    learningStyle === style
                      ? 'bg-coral-light/60 border-coral text-warm-900 shadow-sm'
                      : 'bg-warm-50/50 border-warm-200 hover:border-warm-300 text-warm-700'
                  }`}
                >
                  <span className="text-sm font-bold text-warm-900">{style}</span>
                  {learningStyle === style && <CheckCircle2 className="w-5 h-5 text-coral shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Interests & Focus Areas */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-warm-900 flex items-center gap-2">
                <Compass className="w-6 h-6 text-sky" />
                <span>Select your focus topics</span>
              </h3>
              <p className="text-sm text-warm-500 mt-1">
                Choose at least one topic to include in your personalized visual roadmap.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-5 py-3 rounded-full border text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-sky text-white border-sky shadow-sm'
                        : 'bg-warm-50 text-warm-700 border-warm-200 hover:border-sky'
                    }`}
                  >
                    <span>{topic}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Wizard Controls Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-warm-200">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-bold text-warm-600 hover:text-warm-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-sky via-sage-deep to-accent-dark text-white font-bold text-xs shadow-float flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Roadmap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
