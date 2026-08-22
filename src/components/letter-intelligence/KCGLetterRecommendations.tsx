import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Letter } from '../../data/letters';
import { letterIntelligenceService } from '../../services/letterIntelligenceService';
import { kcgSound } from '../../mobile/soundEngine';

interface KCGLetterRecommendationsProps {
  currentLetter: Letter;
  onSelectLetter: (letter: Letter) => void;
}

export default function KCGLetterRecommendations({
  currentLetter,
  onSelectLetter,
}: KCGLetterRecommendationsProps) {
  const recommendations = letterIntelligenceService.getRecommendedLetters(currentLetter);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 text-left pt-6 border-t border-white/10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            Ã€ EXPLORER ENSUITE
          </span>
        </div>
        <p className="text-xs text-neutral-400 font-light">
          Si cette rÃ©flexion vous intÃ©resse, vous pourriez Ã©galement approfondir :
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {recommendations.map((letter) => (
          <div
            key={letter.id}
            onClick={() => {
              kcgSound.playTactileClick();
              onSelectLetter(letter);
            }}
            className="p-4 sm:p-5 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 transition-all flex flex-col justify-between space-y-3 cursor-pointer group active:scale-[0.98]"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  LETTRE 00{letter.id}
                </span>
                <span className="text-[8px] font-mono text-neutral-400 uppercase">
                  {letter.category}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-display font-bold uppercase text-white group-hover:text-[#C8102E] transition-colors leading-snug line-clamp-2">
                {letter.title}
              </h4>

              <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                {letter.excerpt}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[8.5px] font-mono text-neutral-500">
                <Clock className="w-2.5 h-2.5" />
                {letter.duration}
              </span>

              <span className="flex items-center gap-1 text-[8.5px] font-mono uppercase font-bold text-white group-hover:text-[#C8102E] transition-colors">
                <span>Lire</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
