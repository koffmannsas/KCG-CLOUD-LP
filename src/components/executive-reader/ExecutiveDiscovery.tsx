import React, { useState } from 'react';
import { Target, ArrowRight, BookOpen, Sparkles, Shield, Cpu, Landmark, Users } from 'lucide-react';
import { executiveReaderService, StrategicTheme, ThematicCluster } from '../../services/executiveReaderService';
import { Letter } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveDiscoveryProps {
  onOpenLetter: (letter: Letter) => void;
}

export default function ExecutiveDiscovery({ onOpenLetter }: ExecutiveDiscoveryProps) {
  const clusters = executiveReaderService.getThematicClusters();
  const [activeClusterIndex, setActiveClusterIndex] = useState(0);

  const selectedCluster = clusters[activeClusterIndex] || clusters[0];

  const getThemeIcon = (theme: StrategicTheme) => {
    switch (theme) {
      case 'SOUVERAINETÃ‰':
        return Shield;
      case 'INTELLIGENCE':
        return Cpu;
      case 'CAPITAL':
        return Landmark;
      case 'LEADERSHIP':
        return Users;
      default:
        return Target;
    }
  };

  return (
    <div className="space-y-6 text-left select-none">
      {/* Header */}
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            EXPLORATION PAR PILIER CONCEPTUEL
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
          Explorer Une IdÃ©e MaÃ®tresse
        </h3>
        <p className="text-xs text-neutral-400 font-light">
          Naviguez dans la doctrine de KCG en reliant chaque grand thÃ¨me aux rÃ©flexions correspondantes.
        </p>
      </div>

      {/* Theme Selection Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {clusters.map((cluster, idx) => {
          const isActive = idx === activeClusterIndex;
          const Icon = getThemeIcon(cluster.theme);
          return (
            <button
              key={cluster.theme}
              onClick={() => {
                kcgSound.playTactileClick();
                setActiveClusterIndex(idx);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cluster.theme}</span>
            </button>
          );
        })}
      </div>

      {/* Cluster Deep Dive */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#09090c] border border-white/10 space-y-6">
        {/* Insight Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#18090d] to-[#0A0A0C] border border-[#C8102E]/30 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
              INSIGHT CENTRAL Â· {selectedCluster.theme}
            </span>
          </div>
          <p className="text-sm sm:text-base font-display font-medium text-white">
            Â« {selectedCluster.centralInsight} Â»
          </p>
          <p className="text-xs text-neutral-400 font-light pt-1">
            {selectedCluster.description}
          </p>
        </div>

        {/* Associated Letters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
              LETTRES ASSOCIÃ‰ES ({selectedCluster.letters.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedCluster.letters.map((letter) => (
              <div
                key={letter.id}
                onClick={() => {
                  kcgSound.playTactileClick();
                  onOpenLetter(letter);
                }}
                className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-[#C8102E]/50 transition-all cursor-pointer space-y-2 flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase text-[#C8102E] font-bold">
                      DOSSIER #{letter.id}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-500">
                      {letter.duration}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-display font-bold uppercase text-white group-hover:text-neutral-200 line-clamp-2">
                    {letter.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light line-clamp-2">
                    {letter.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-[8px] font-mono text-neutral-400">
                    Ouvrir la rÃ©flexion
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
