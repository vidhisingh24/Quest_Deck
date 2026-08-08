'use client';

import React, { useState } from 'react';
import { Play, Pause, Clock, Film, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { InteractiveMission, VideoTimestamp } from '@/lib/types';
import { sounds } from '@/lib/soundEngine';

interface MissionVideoPlayerProps {
  mission: InteractiveMission;
}

export const MissionVideoPlayer: React.FC<MissionVideoPlayerProps> = ({ mission }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(
    mission.videoTimestamps?.[0]?.time || null
  );

  const handlePlayToggle = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleSelectTimestamp = (ts: VideoTimestamp) => {
    sounds.playClick();
    setActiveTimestamp(ts.time);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      {/* Main Video Frame Container */}
      <div className="relative rounded-3xl bg-warm-900 border border-warm-700 overflow-hidden shadow-float group">
        {isPlaying && mission.videoUrl ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={`${mission.videoUrl}?autoplay=1`}
              title={mission.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full flex items-center justify-center bg-warm-900 overflow-hidden">
            <img
              src={mission.videoThumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80'}
              alt={mission.title}
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-warm-950 via-warm-900/40 to-transparent" />

            {/* Play Button Overlay */}
            <button
              onClick={handlePlayToggle}
              className="relative z-10 w-20 h-20 rounded-full bg-sky hover:bg-sky-dark text-white flex items-center justify-center shadow-float hover:scale-110 transition-all cursor-pointer ring-8 ring-sky/30"
            >
              <Play className="w-9 h-9 fill-white ml-1" />
            </button>

            {/* Video Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="pill-badge pill-sky text-xs font-bold flex items-center gap-1">
                  <Film className="w-3.5 h-3.5" /> HD Video Tutorial
                </span>
                {mission.videoDuration && (
                  <span className="px-2.5 py-1 rounded-full bg-warm-900/80 border border-warm-700 text-xs font-bold text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky" /> {mission.videoDuration}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timestamp Chapters & Video Key Notes */}
      {mission.videoTimestamps && mission.videoTimestamps.length > 0 && (
        <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
            <h4 className="text-base font-extrabold text-warm-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky" /> Interactive Video Timestamps & Chapters
            </h4>
            <span className="pill-badge pill-sky text-xs font-bold">{mission.videoTimestamps.length} Chapters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mission.videoTimestamps.map((ts) => {
              const isActive = activeTimestamp === ts.time;
              return (
                <button
                  key={ts.time}
                  onClick={() => handleSelectTimestamp(ts)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-sky-light/60 border-sky shadow-sm ring-2 ring-sky/30 text-warm-900 font-bold'
                      : 'bg-warm-50/50 border-warm-200 hover:border-sky/50 text-warm-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-sky text-white text-xs font-extrabold">
                      {ts.time}
                    </span>
                    <span className="text-xs font-bold">{ts.label}</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-sky shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
