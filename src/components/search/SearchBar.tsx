'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Play, Compass, ArrowRight, Zap } from 'lucide-react';
import { RoadmapNode } from '@/lib/types';
import { INITIAL_ROADMAP } from '@/lib/data';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (node: RoadmapNode) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose, onSelectNode }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredNodes = INITIAL_ROADMAP.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.category.toLowerCase().includes(query.toLowerCase()) ||
      n.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-warm-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="relative w-full max-w-xl bg-white border border-warm-200 rounded-3xl shadow-float p-6 overflow-hidden"
        >
          {/* Header Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-warm-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, missions, subjects (e.g. Data Packet, SQL, Neural Net)..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl border border-warm-200 focus:border-sky focus:outline-none text-sm text-warm-900 bg-warm-50/50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-3.5 text-warm-400 hover:text-warm-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {filteredNodes.length > 0 ? (
              filteredNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    onSelectNode(node);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl border border-warm-200 hover:border-sky bg-warm-50/50 hover:bg-white flex items-center justify-between gap-3 cursor-pointer transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="pill-badge pill-sky text-[10px]">{node.category}</span>
                      <span className="text-[10px] font-bold text-warm-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-sky" />+{node.xpReward} XP
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-warm-900 group-hover:text-sky transition-colors">
                      {node.title}
                    </h4>
                    <p className="text-xs text-warm-500 line-clamp-1 mt-0.5">{node.description}</p>
                  </div>

                  <button className="px-3 py-1.5 rounded-full bg-sky text-white font-bold text-xs shadow-sm flex items-center gap-1 shrink-0">
                    <Play className="w-3 h-3 fill-white" />
                    <span>Launch</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-warm-500 text-xs font-semibold">
                No matching mission nodes found for "{query}".
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-warm-200 text-right">
            <button
              onClick={onClose}
              className="text-xs font-bold text-warm-500 hover:text-warm-900 cursor-pointer"
            >
              Close Overlay (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
