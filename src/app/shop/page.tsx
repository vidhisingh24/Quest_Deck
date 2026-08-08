'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Coins, Shield, Zap, Crown, ArrowLeft, Shirt, CheckCircle2, AlertCircle } from 'lucide-react';
import { INITIAL_SHOP_ITEMS } from '@/lib/data';
import { UserProfile, ShopItem } from '@/lib/types';
import { getStoredUser, setStoredUser } from '@/lib/storage';
import { sounds } from '@/lib/soundEngine';
import { Navbar } from '@/components/landing/Navbar';

export default function ShopPage() {
  const [user, setUser] = useState<UserProfile>(() => getStoredUser());
  const [redeemedMsg, setRedeemedMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Play ambient page entry SFX sound when Shop opens
  useEffect(() => {
    sounds.playXpGain();
  }, []);

  const handleRedeem = (item: ShopItem) => {
    setRedeemedMsg(null);
    setErrorMsg(null);

    if (user.coins < item.costCoins) {
      sounds.playClick();
      setErrorMsg(`Insufficient coins! You need ${item.costCoins - user.coins} more coins to redeem ${item.title}. Complete missions to earn coins!`);
      return;
    }

    sounds.playLevelUp();
    const updatedUser: UserProfile = {
      ...user,
      coins: user.coins - item.costCoins,
    };

    setStoredUser(updatedUser);
    setUser(updatedUser);
    setRedeemedMsg(`Successfully redeemed "${item.title}"! ${item.category === 'Booster' ? 'Physical swag shipping confirmation sent to your email.' : 'Power-up item active.'}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      <Navbar
        user={user}
        onOpenAuth={() => {}}
        onNavigate={() => {}}
        onReplayIntro={() => {}}
        onOpenSearch={() => {}}
        onOpenFlashcards={() => {}}
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200">
          <Link 
            href="/" 
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all shadow-card"
          >
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-accent-dark/30 text-warm-900 font-extrabold text-sm shadow-card">
            <Coins className="w-5 h-5 text-accent-dark" />
            <span>Coins Wallet: {user.coins} Coins</span>
          </div>
        </div>

        <div className="quest-card p-6 sm:p-10 bg-white border border-warm-200 rounded-3xl shadow-card">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-warm-900">LeetCode Merch & Quest Shop</h1>
            <p className="text-sm text-warm-500 mt-1">Redeem your earned Quest Coins for physical swag, books, and digital powerups!</p>
          </div>

          <AnimatePresence>
            {redeemedMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6 p-4 rounded-2xl bg-sage-light border border-sage text-sage-deep font-bold text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-mint shrink-0" />
                <p>{redeemedMsg}</p>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6 p-4 rounded-2xl bg-coral-light border border-coral text-coral-dark font-bold text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-coral shrink-0" />
                <p>{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_SHOP_ITEMS.map((item) => {
              const canAfford = user.coins >= item.costCoins;
              return (
                <div key={item.id} className="p-6 rounded-3xl border border-warm-200 bg-warm-50/50 hover:bg-white transition-all flex flex-col justify-between shadow-sm hover:border-sky">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-warm-200 flex items-center justify-center text-sky shadow-card">
                        {item.icon === 'Shirt' && <Shirt className="w-6 h-6 text-accent-dark" />}
                        {item.icon === 'Shield' && <Shield className="w-6 h-6 text-sage-deep" />}
                        {item.icon === 'Zap' && <Zap className="w-6 h-6 text-sky" />}
                        {item.icon === 'Crown' && <Crown className="w-6 h-6 text-amber-500" />}
                      </div>
                      <span className="pill-badge pill-yellow text-xs font-extrabold flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" /> {item.costCoins} Coins
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-warm-900">{item.title}</h3>
                    <p className="text-xs text-warm-600 mt-1 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-warm-200 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-warm-400">
                      {item.category === 'Booster' && item.title.includes('Cap') ? 'Physical Merch' : 'Digital Powerup'}
                    </span>

                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford}
                      className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-accent-dark hover:bg-amber-600 text-white shadow-sm cursor-pointer hover:scale-105'
                          : 'bg-warm-200 text-warm-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Redeem Swag</span>
                      <Coins className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
