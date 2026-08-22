import React from 'react';
import { Target, Coins, Cpu, Users, ShieldAlert, Sparkles } from 'lucide-react';
import { ExecutiveAnalysis, ExecutiveDimension } from '../../services/letterIntelligenceService';

interface KCGLetterAnalysisProps {
  analysis: ExecutiveAnalysis;
}

const CATEGORY_META: Record<
  ExecutiveDimension['category'],
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  STRATÉGIE: {
    icon: Target,
    color: '#C8102E',
    bg: 'bg-[#C8102E]/10 border-[#C8102E]/30',
  },
  CAPITAL: {
    icon: Coins,
    color: '#D4AF37',
    bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/30',
  },
  TECHNOLOGIE: {
    icon: Cpu,
    color: '#3B82F6',
    bg: 'bg-[#3B82F6]/10 border-[#3B82F6]/30',
  },
  LEADERSHIP: {
    icon: Users,
    color: '#10B981',
    bg: 'bg-[#10B981]/10 border-[#10B981]/30',
  },
};

export default function KCGLetterAnalysis({ analysis }: KCGLetterAnalysisProps) {
  return (
    <div className="space-y-4 text-left animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
          ANALYSE DIRIGEANT & DÉCIDEUR
        </span>
        <span className="text-[8px] font-mono text-neutral-500 uppercase">
          Angles d'Impact Exécutif
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {analysis.dimensions.map((dim, idx) => {
          const meta = CATEGORY_META[dim.category] || CATEGORY_META.STRATÉGIE;
          const Icon = meta.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${meta.bg} border flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-white">
                    {dim.category}
                  </span>
                </div>

                <h4 className="text-sm font-display font-bold uppercase tracking-tight text-white">
                  {dim.label}
                </h4>

                <p className="text-xs font-sans text-neutral-300 font-light leading-relaxed">
                  {dim.insight}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-neutral-500">
                <span>ANGLE D'INTERPRÉTATION KCG</span>
                <span className="text-neutral-400">NON PRESCRIPTIF</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-mono text-neutral-400 leading-relaxed text-center">
        ✦ Note de rigueur : KCG AI intervient en tant qu’analyste et interprète conceptuel. Ces perspectives n'engagent pas de déclarations au-delà de la doctrine formulée par le Fondateur.
      </div>
    </div>
  );
}
