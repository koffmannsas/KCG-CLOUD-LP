import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Compass } from 'lucide-react';
import { LetterSummary } from '../../services/letterIntelligenceService';

interface KCGLetterSummaryProps {
  summary: LetterSummary;
  onViewPassage?: (snippet?: string) => void;
}

export default function KCGLetterSummary({ summary, onViewPassage }: KCGLetterSummaryProps) {
  return (
    <div className="space-y-6 text-left animate-in fade-in-50 duration-300">
      {/* 1. EN UNE PHRASE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            EN UNE PHRASE
          </span>
        </div>
        <p className="text-sm sm:text-base font-display font-medium text-white leading-relaxed">
          {summary.oneSentence}
        </p>
      </div>

      {/* 2. L'ESSENTIEL (3 Bullet Points) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
            L'ESSENTIEL
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {summary.essentials.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-xl bg-[#0e0e12] border border-white/5 flex items-start gap-3 hover:border-white/15 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-mono text-[10px] font-bold text-[#C8102E]">
                  0{idx + 1}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. IMPACT POUR UN DIRIGEANT */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#12080a] to-[#0A0A0C] border border-[#C8102E]/30 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            IMPACT POUR UN DIRIGEANT
          </span>
        </div>
        <p className="text-xs sm:text-sm font-sans text-neutral-200 font-normal leading-relaxed">
          {summary.executiveImpact}
        </p>
      </div>
    </div>
  );
}
