import React from 'react';
import { Compass, ArrowDown, ChevronRight, BookOpen } from 'lucide-react';
import { StrategicTimelineItem, executiveReaderService } from '../../services/executiveReaderService';
import { Letter, LETTERS } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveTimelineProps {
  onOpenLetter: (letter: Letter) => void;
}

export default function ExecutiveTimeline({ onOpenLetter }: ExecutiveTimelineProps) {
  const timeline = executiveReaderService.getStrategicTimeline();

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            CHRONOLOGIE DOCTRINALE
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
          Votre Parcours de RÃ©flexion
        </h3>
        <p className="text-xs text-neutral-400 font-light">
          Historique factuel des thÃ¨mes et des dossiers explorÃ©s au fil de vos lectures.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-white/15">
        {timeline.map((item, idx) => {
          const letter = LETTERS.find((l) => l.id === item.letterId) || LETTERS[0];
          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full bg-[#0A0A0C] border-2 border-[#C8102E] group-hover:bg-[#C8102E] transition-colors" />

              <div
                onClick={() => {
                  kcgSound.playTactileClick();
                  onOpenLetter(letter);
                }}
                className="p-4 sm:p-5 rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#C8102E]/60 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-white px-2 py-0.5 rounded bg-white/10">
                      {item.month} {item.year}
                    </span>
                    <ArrowDown className="w-2.5 h-2.5 text-neutral-500" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                      {item.theme}
                    </span>
                  </div>

                  <span className="text-[8px] font-mono text-neutral-500 uppercase">
                    DOSSIER #{letter.id}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-display font-bold uppercase text-white group-hover:text-neutral-200">
                  {item.letterTitle}
                </h4>

                <p className="text-xs text-neutral-400 font-light line-clamp-2">
                  {letter.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-[8px] font-mono text-neutral-500 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" />
                    {letter.duration}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-[#C8102E] uppercase font-bold">
                    <span>Revisiter la lettre</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
