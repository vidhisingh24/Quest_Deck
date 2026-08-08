'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';
import { getStoredUser } from '@/lib/storage';
import { Navbar } from '@/components/landing/Navbar';

export default function CertificatePage() {
  const user = getStoredUser();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      <div className="print:hidden">
        <Navbar
          user={user}
          onOpenAuth={() => {}}
          onNavigate={() => {}}
          onReplayIntro={() => {}}
          onOpenSearch={() => {}}
          onOpenFlashcards={() => {}}
        />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-200 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 border border-warm-200 text-warm-800 text-xs font-bold transition-all shadow-card">
            <ArrowLeft className="w-4 h-4 text-sky" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky text-white font-extrabold flex items-center justify-center">
              Q
            </div>
            <span className="font-extrabold text-warm-900 text-lg">Certificate Generator</span>
          </div>
        </div>

        <div className="quest-card p-8 sm:p-14 bg-white border-2 border-warm-300 rounded-3xl shadow-float text-center">
          <div className="border border-warm-200 rounded-2xl p-8 sm:p-12 bg-gradient-to-b from-warm-50/50 via-white to-sky-light/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sky text-white font-extrabold flex items-center justify-center text-2xl shadow-sm">
                Q
              </div>
              <span className="font-extrabold text-warm-900 text-2xl tracking-tight">QUEST ACADEMY</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-3">
              Official Certificate of Mastery
            </p>

            <h2 className="text-3xl font-extrabold text-warm-900 mb-4">
              This certifies that
            </h2>

            <p className="text-3xl font-extrabold text-sky underline underline-offset-8 decoration-sky/40 mb-6">
              {user.name}
            </p>

            <p className="text-sm text-warm-700 leading-relaxed max-w-lg mx-auto mb-8">
              has successfully completed interactive mission simulations, decision checks, and technical mastery quizzes for:
            </p>

            <span className="pill-badge pill-sky text-base font-extrabold px-5 py-2 mb-8">
              {user.careerGoal || 'Full-Stack & Computer Systems Engineering'}
            </span>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-8 border-t border-warm-200 text-left text-xs font-semibold text-warm-600">
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Issued Date</p>
                <p className="font-bold text-warm-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Verification Seal</p>
                <p className="font-mono text-warm-800 text-[11px]">QST-VERIFIED-2026-9482</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="px-8 py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-float flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF Certificate</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
