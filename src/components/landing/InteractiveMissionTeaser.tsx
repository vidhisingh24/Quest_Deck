'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, CheckCircle2, XCircle, ArrowRight, RefreshCw, Zap, ShieldAlert } from 'lucide-react';

export const InteractiveMissionTeaser: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleChoice = (idx: number, isCorrect: boolean, explanation: string) => {
    setSelectedChoice(idx);
    setFeedback({ isCorrect, text: explanation });
  };

  const handleReset = () => {
    setSelectedChoice(null);
    setFeedback(null);
  };

  return (
    <section className="py-12 bg-white/60 border-y border-warm-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="pill-badge pill-sky text-xs uppercase font-bold tracking-wider mb-2">
            Live Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-900">
            Try a 30-Second Mission Right Now
          </h2>
          <p className="text-sm text-warm-600 mt-1 max-w-xl mx-auto">
            You are a 1500-byte TCP Data Packet at IP <span className="font-mono font-bold text-sky">192.168.1.50</span> trying to send a request to a remote server.
          </p>
        </div>

        {/* Live Simulator Card */}
        <div className="quest-card p-6 sm:p-8 max-w-3xl mx-auto bg-white border border-warm-200 rounded-3xl shadow-card relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-light text-sky flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-warm-900">Mission: Router Gateway Hop</h3>
                <p className="text-xs text-warm-500 font-mono">Src: 192.168.1.50 | Dest: 8.8.8.8 | TTL: 64</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="pill-badge pill-yellow text-xs font-bold">+150 XP</span>
              <button 
                onClick={handleReset}
                title="Reset scenario"
                className="p-1.5 rounded-lg text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Situation Prompt */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-warm-800 leading-relaxed">
              Scenario: You have arrived at your local Wi-Fi router (192.168.1.1). The router needs to route you onto the WAN public internet. What is your next protocol action?
            </p>
          </div>

          {/* Choices Grid */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleChoice(
                0,
                true,
                'Correct! NAT translates your private LAN IP (192.168.1.50) into a public IP address so response packets can route back to you.'
              )}
              className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between gap-3 cursor-pointer ${
                selectedChoice === 0
                  ? feedback?.isCorrect
                    ? 'bg-sage-light border-mint text-warm-900 shadow-sm'
                    : 'bg-coral-light border-coral text-warm-900'
                  : 'bg-warm-50/50 border-warm-200 hover:border-sky hover:bg-white text-warm-800'
              }`}
            >
              <span>A. Perform Network Address Translation (NAT) and swap Private IP with Public IP</span>
              {selectedChoice === 0 && (
                <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
              )}
            </button>

            <button
              onClick={() => handleChoice(
                1,
                false,
                'Incorrect! Broadcast ARP requests cannot pass beyond local subnets over public WAN links.'
              )}
              className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between gap-3 cursor-pointer ${
                selectedChoice === 1
                  ? 'bg-coral-light border-coral text-warm-900'
                  : 'bg-warm-50/50 border-warm-200 hover:border-sky hover:bg-white text-warm-800'
              }`}
            >
              <span>B. Broadcast an ARP packet directly to Google DNS server (8.8.8.8)</span>
              {selectedChoice === 1 && (
                <XCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
              )}
            </button>

            <button
              onClick={() => handleChoice(
                2,
                false,
                'Incorrect! Setting TTL to 0 forces routers to immediately drop the packet and return ICMP Time Exceeded!'
              )}
              className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between gap-3 cursor-pointer ${
                selectedChoice === 2
                  ? 'bg-coral-light border-coral text-warm-900'
                  : 'bg-warm-50/50 border-warm-200 hover:border-sky hover:bg-white text-warm-800'
              }`}
            >
              <span>C. Drop TTL (Time To Live) to 0 to bypass firewall inspection</span>
              {selectedChoice === 2 && (
                <XCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
              )}
            </button>
          </div>

          {/* Feedback Box */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-2xl border ${
                  feedback.isCorrect
                    ? 'bg-sage-light/60 border-sage text-sage-deep'
                    : 'bg-coral-light/60 border-coral text-coral-dark'
                }`}
              >
                <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold">
                  {feedback.isCorrect ? (
                    <Zap className="w-5 h-5 text-mint shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                  )}
                  <p>{feedback.text}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
