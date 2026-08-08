'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Coins, Shield, Zap, Crown, Check } from 'lucide-react';
import { INITIAL_SHOP_ITEMS } from '@/lib/data';
import { UserProfile, ShopItem } from '@/lib/types';

interface QuestShopModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onBuyItem: (item: ShopItem) => void;
}

export const QuestShopModal: React.FC<QuestShopModalProps> = ({ user, isOpen, onClose, onBuyItem }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white border border-warm-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent-dark mx-auto flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-warm-900">Quest Rewards Shop</h3>
            <p className="text-xs text-warm-500 mt-1">Redeem your Quest Coins for boosters & shields</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light/80 border border-accent-dark/30 text-warm-900 font-extrabold text-xs mt-3">
              <Coins className="w-4 h-4 text-accent-dark" />
              <span>Balance: {user.coins} Coins</span>
            </div>
          </div>

          <div className="space-y-3">
            {INITIAL_SHOP_ITEMS.map((item) => {
              const canAfford = user.coins >= item.costCoins;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-warm-200 bg-warm-50/50 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-warm-200 flex items-center justify-center text-sky shrink-0">
                      {item.icon === 'Shield' && <Shield className="w-5 h-5 text-sage-deep" />}
                      {item.icon === 'Zap' && <Zap className="w-5 h-5 text-sky" />}
                      {item.icon === 'Crown' && <Crown className="w-5 h-5 text-accent-dark" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-warm-900">{item.title}</h4>
                      <p className="text-xs text-warm-500">{item.description}</p>
                    </div>
                  </div>

                  <button
                    disabled={!canAfford}
                    onClick={() => onBuyItem(item)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                      canAfford
                        ? 'bg-accent-dark hover:bg-amber-600 text-white shadow-sm cursor-pointer'
                        : 'bg-warm-200 text-warm-400 cursor-not-allowed'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>{item.costCoins}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
