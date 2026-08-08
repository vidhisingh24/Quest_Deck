'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CheckCircle2, AlertTriangle, ArrowRight, Server, Activity } from 'lucide-react';
import { InteractiveMission } from '@/lib/types';

interface CloudDevOpsSimulatorProps {
  mission: InteractiveMission;
  onMissionComplete: (score: number) => void;
}

export const CloudDevOpsSimulator: React.FC<CloudDevOpsSimulatorProps> = ({ mission, onMissionComplete }) => {
  const [replicas, setReplicas] = useState(2);
  const [cpuLoad, setCpuLoad] = useState(98);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const handleScaleCluster = () => {
    setReplicas(8);
    setCpuLoad(24);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-light text-sky flex items-center justify-center font-bold">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-warm-900">{mission.title}</h2>
            <p className="text-xs text-warm-500">Kubernetes Cluster Pod Auto-Scaler & Load Balancer</p>
          </div>
        </div>
        <span className="pill-badge pill-sky text-xs font-bold">Cloud & DevOps Sim</span>
      </div>

      {/* Kubernetes Cluster Status Visualizer */}
      <div className="quest-card p-6 bg-white border border-warm-200 rounded-3xl mb-8 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-warm-800">
            <Activity className="w-4 h-4 text-coral animate-pulse" />
            <span>Kubernetes Ingress Load Balancer</span>
          </div>
          <span className={`pill-badge text-xs font-bold ${cpuLoad > 80 ? 'pill-coral' : 'pill-sage'}`}>
            CPU Load: {cpuLoad}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {[...Array(replicas)].map((_, i) => (
            <div key={i} className="p-3 rounded-2xl bg-sky-light/40 border border-sky/30 text-center">
              <Server className="w-5 h-5 text-sky mx-auto mb-1" />
              <p className="text-xs font-bold text-warm-900">Pod Replica #{i + 1}</p>
              <p className="text-[10px] text-warm-500 font-mono">Status: Running</p>
            </div>
          ))}
        </div>

        {replicas === 2 && (
          <div className="text-center">
            <button
              onClick={handleScaleCluster}
              className="px-6 py-2.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-xs shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Cloud className="w-4 h-4" />
              <span>Trigger Horizontal Pod Autoscaler (HPA to 8 Pods)</span>
            </button>
          </div>
        )}
      </div>

      <div className="quest-card p-6 sm:p-8 bg-white border border-warm-200 rounded-3xl shadow-card">
        <h3 className="text-xl font-bold text-warm-900 mb-2">Scenario: Mitigate CPU Load Surge</h3>
        <p className="text-sm text-warm-700 leading-relaxed mb-6">
          During a product launch spike, existing pod CPU load reaches 98%. What is the correct DevOps architecture action?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedChoiceIdx(0)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 0 ? 'bg-sage-light border-mint text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>A. Scale out pod replicas via Kubernetes HPA and distribute traffic with NGINX Ingress</span>
            {selectedChoiceIdx === 0 && <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />}
          </button>

          <button
            onClick={() => setSelectedChoiceIdx(1)}
            className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start justify-between cursor-pointer ${
              selectedChoiceIdx === 1 ? 'bg-coral-light border-coral text-warm-900' : 'bg-warm-50/50 border-warm-200 hover:border-sky'
            }`}
          >
            <span>B. Terminate the Kubernetes cluster node</span>
            {selectedChoiceIdx === 1 && <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />}
          </button>
        </div>

        {selectedChoiceIdx !== null && (
          <button
            onClick={() => onMissionComplete(selectedChoiceIdx === 0 ? 1 : 0)}
            className="w-full py-3.5 rounded-full bg-sky hover:bg-sky-dark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Cloud & DevOps Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
