import React from 'react';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SmartRecommendation, executiveReaderService } from '../../services/executiveReaderService';
import { Letter } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveRecommendationsProps {
  onOpenLetter: (letter: Letter) => void;
}

export default function ExecutiveRecommendations({ onOpenLetter }: ExecutiveRecommendationsProps) {
  const recommendations = executiveReaderService.getSmartRecommendations();

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              KCG AI Â· RECOMMANDATIONS CIBLÃ‰ES
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight">
            Pour Vous
          </h3>
        </div>
        <span className="text-[9px] font-mono text-neutral-400">
          ALIGNÃ‰ SUR VOS THÃˆMES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {recommendations.map(({ letter, reason }, idx) => (
          <div
            key={letter.id || idx}
            onClick={() => {
              kcgSound.playTactileClick();
              onOpenLetter(letter);
            }}
            className="p-4 sm:p-5 rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#C8102E]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            {/* Header tag & reason badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  DOSSIER #{letter.id} Â· {letter.category}
                </span>
                <span className="text-[8px] font-mono text-neutral-400">
                  {letter.date}
                </span>
              </div>

              <h4 className="text-sm font-display font-bold uppercase text-white line-clamp-2 group-hover:text-neutral-200">
                {letter.title}
              </h4>

              <p className="text-xs text-neutral-400 font-light line-clamp-2">
                {letter.excerpt}
              </p>
            </div>

            {/* Explainable Rationale Callout */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[9.5px] font-mono text-neutral-300">
                <span className="text-[#C8102E] mr-1">â†³</span>
                {reason}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[8px] font-mono text-neutral-500 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {letter.duration}
                </span>

                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#C8102E] transition-colors">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
