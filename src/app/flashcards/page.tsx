'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { getStoredUser } from '@/lib/storage';
import { Navbar } from '@/components/landing/Navbar';

const FLASHCARDS = [
  { id: 'fc1', subject: 'Networking', question: 'What is the role of ARP (Address Resolution Protocol)?', answer: 'ARP maps Layer 3 IP addresses to physical Layer 2 MAC hardware addresses on local subnets.' },
  { id: 'fc2', subject: 'Cybersecurity', question: 'How do Prepared Statements stop SQL Injections?', answer: 'Prepared statements separate SQL execution logic from untrusted user input parameters.' },
  { id: 'fc3', subject: 'Operating Systems', question: 'What is a Process Context Switch?', answer: 'Saving CPU register states into the Process Control Block (PCB) before switching execution to another process.' },
  { id: 'fc4', subject: 'AI & ML', question: 'What causes Exploding Gradients during training?', answer: 'Large weight updates during backpropagation that amplify exponentially layer by layer.' },
  { id: 'fc5', subject: 'Database Systems', question: 'Why does a B-Tree Index speed up queries?', answer: 'It replaces O(N) full table scans with balanced O(log N) multi-way tree traversals.' },
];

export default function FlashcardsPage() {
  const user = getStoredUser();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FLASHCARDS[currentIdx];

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

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200">
          <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all shadow-card">
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky text-white font-extrabold flex items-center justify-center">
              Q
            </div>
            <span className="font-extrabold text-warm-900 text-lg">Revision Flashcards</span>
          </div>
        </div>

        <div className="quest-card p-6 sm:p-10 bg-white border border-warm-200 rounded-3xl shadow-card text-center">
          <div className="w-14 h-14 rounded-2xl bg-sage-light text-sage-deep mx-auto flex items-center justify-center mb-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-warm-900">Active Recall Revision Deck</h1>
          <p className="text-sm text-warm-500 mt-1 mb-8">Card {currentIdx + 1} of {FLASHCARDS.length}</p>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 rounded-3xl bg-gradient-to-tr from-warm-50 via-white to-sky-light/40 border border-warm-200 p-8 shadow-card flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.01] relative mb-8"
          >
            <span className="pill-badge pill-sky text-xs font-bold absolute top-5 left-5">
              {card.subject}
            </span>

            {!isFlipped ? (
              <div>
                <p className="text-xl font-extrabold text-warm-900 leading-snug">{card.question}</p>
                <span className="text-xs text-warm-400 font-bold mt-6 block">Click to reveal answer</span>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-base font-semibold text-warm-800 leading-relaxed">{card.answer}</p>
                <span className="text-xs text-sky font-bold mt-6 block">Click to flip back</span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-4 max-w-sm mx-auto">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIdx((prev) => (prev + 1) % FLASHCARDS.length);
              }}
              className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              Next Flashcard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
