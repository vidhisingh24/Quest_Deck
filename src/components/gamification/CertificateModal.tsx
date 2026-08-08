'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ShieldCheck, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '@/lib/types';

interface CertificateModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white border-2 border-warm-300 rounded-3xl shadow-float p-8 sm:p-12 overflow-hidden text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Inner Frame */}
          <div className="border border-warm-200 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-warm-50/50 via-white to-sky-light/20 relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky text-white font-extrabold flex items-center justify-center text-xl shadow-sm">
                Q
              </div>
              <span className="font-extrabold text-warm-900 text-xl tracking-tight">QUEST ACADEMY</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-2">
              Official Certificate of Mastery
            </p>

            <h2 className="text-3xl font-extrabold text-warm-900 mb-4">
              This certifies that
            </h2>

            <p className="text-2xl font-extrabold text-sky underline underline-offset-8 decoration-sky/40 mb-4">
              {user.name}
            </p>

            <p className="text-xs sm:text-sm text-warm-700 leading-relaxed max-w-md mx-auto mb-6">
              has successfully completed all interactive mission simulations, scenario decision checks, and technical mastery quizzes for the track:
            </p>

            <span className="pill-badge pill-sky text-sm font-extrabold px-4 py-1.5 mb-6">
              {user.careerGoal || 'Full-Stack & Computer Systems'}
            </span>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-6 border-t border-warm-200 text-left text-xs font-semibold text-warm-600">
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Issued Date</p>
                <p className="font-bold text-warm-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-warm-400">Verification Hash</p>
                <p className="font-mono text-warm-800 text-[10px]">QST-VERIFIED-2026-9482</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF Certificate</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
