'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, CheckCircle2, Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';
import { sounds } from '@/lib/soundEngine';

interface FlashcardDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLASHCARDS = [
  { id: 'fc1', subject: 'Networking', question: 'What is the role of ARP (Address Resolution Protocol)?', answer: 'ARP maps Layer 3 IP addresses to physical Layer 2 MAC hardware addresses on local subnets.' },
  { id: 'fc2', subject: 'Cybersecurity', question: 'How do Prepared Statements stop SQL Injections?', answer: 'Prepared statements separate SQL execution logic from untrusted user input parameters.' },
  { id: 'fc3', subject: 'Operating Systems', question: 'What is a Process Context Switch?', answer: 'Saving CPU register states into the Process Control Block (PCB) before switching execution to another process.' },
  { id: 'fc4', subject: 'AI & ML', question: 'What causes Exploding Gradients during training?', answer: 'Large weight updates during backpropagation that amplify exponentially layer by layer.' },
  { id: 'fc5', subject: 'Database Systems', question: 'Why does a B-Tree Index speed up queries?', answer: 'It replaces O(N) full table scans with balanced O(log N) multi-way tree traversals.' },
];

export const FlashcardDeckModal: React.FC<FlashcardDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const card = FLASHCARDS[currentIdx];

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (mastered: boolean) => {
    sounds.playClick();
    if (mastered && !masteredIds.includes(card.id)) {
      setMasteredIds([...masteredIds, card.id]);
    }
    setIsFlipped(false);
    if (currentIdx + 1 < FLASHCARDS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white border border-warm-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <span className="pill-badge pill-sky text-xs font-bold uppercase mb-2">
              Active Recall Flashcards
            </span>
            <h3 className="text-2xl font-extrabold text-warm-900">Revision Deck</h3>
            <p className="text-xs text-warm-500">Card {currentIdx + 1} of {FLASHCARDS.length}</p>
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={handleFlip}
            className="w-full h-56 rounded-3xl bg-gradient-to-tr from-warm-50 via-white to-sky-light/30 border border-warm-200 p-6 shadow-card flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02] relative mb-6"
          >
            <span className="pill-badge pill-sage text-[10px] font-bold absolute top-4 left-4">
              {card.subject}
            </span>

            {!isFlipped ? (
              <div>
                <p className="text-base font-extrabold text-warm-900 leading-snug">{card.question}</p>
                <span className="text-[10px] text-warm-400 font-bold mt-4 block">Click to reveal answer</span>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm font-semibold text-warm-800 leading-relaxed">{card.answer}</p>
                <span className="text-[10px] text-sky font-bold mt-4 block">Click to flip back</span>
              </motion.div>
            )}
          </div>

          {/* Control Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNextCard(false)}
              className="flex-1 py-3 rounded-full bg-warm-100 hover:bg-warm-200 text-warm-800 font-bold text-xs transition-all cursor-pointer"
            >
              Review Later
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="flex-1 py-3 rounded-full bg-sage-deep hover:bg-sage-dark text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Mastered Card
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
