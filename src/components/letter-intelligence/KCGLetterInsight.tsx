import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface KCGLetterInsightProps {
  insightText: string;
}

export default function KCGLetterInsight({ insightText }: KCGLetterInsightProps) {
  return (
    <div className="relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-[#09090c] border border-white/15 text-left shadow-2xl">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white font-bold">
              KCG INSIGHT
            </span>
          </div>

          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
            GÃ‰NÃ‰RÃ‰ PAR KCG AI
          </span>
        </div>

        <div className="pt-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold block mb-1.5">
            CE QUE CETTE LETTRE INVITE Ã€ CONSIDÃ‰RER :
          </span>
          <p className="text-base sm:text-lg font-display font-medium text-white italic leading-relaxed">
            Â« {insightText} Â»
          </p>
        </div>
      </div>
    </div>
  );
}
