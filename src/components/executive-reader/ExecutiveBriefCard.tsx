import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, BookOpen, Volume2, Sparkles, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { ExecutiveBrief, executiveReaderService } from '../../services/executiveReaderService';
import { Letter, LETTERS } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveBriefCardProps {
  onOpenLetter: (letter: Letter) => void;
}

export default function ExecutiveBriefCard({ onOpenLetter }: ExecutiveBriefCardProps) {
  const [brief, setBrief] = useState<ExecutiveBrief>(() => executiveReaderService.getExecutiveBrief());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<any>(null);

  const targetLetter = LETTERS.find((l) => l.id === brief.recommendedLetterId) || LETTERS[0];

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleToggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    kcgSound.playTactileClick();

    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(brief.audioScript);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 0.92;

      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(
        (v) => (v.lang.includes('fr') || v.lang.includes('FR')) && (v.name.includes('Thomas') || v.name.includes('Henri') || v.name.includes('Male'))
      ) || voices.find((v) => v.lang.includes('fr'));

      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        setIsPlaying(false);
        executiveReaderService.logListeningMinutes(1.5);
      };
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#12080a] via-[#09090c] to-[#0A0A0C] border border-[#C8102E]/35 p-5 sm:p-7 text-left space-y-6 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              KCG EXECUTIVE BRIEF Â· {brief.dateFormatted}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
            Les idÃ©es essentielles Ã  retenir.
          </h3>
        </div>

        {/* Audio Action Button */}
        <button
          onClick={(e) => handleToggleAudio(e)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-md self-start sm:self-auto shrink-0"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE BRIEFING</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Ã‰COUTER ({brief.audioDurationFormatted})</span>
            </>
          )}
        </button>
      </div>

      {/* Core 3-point briefing structure */}
      <div className="space-y-4 relative z-10">
        {/* 01 - L'IDÃ‰E */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
              01 â€” L'IDÃ‰E MAÃŽTRESSE
            </span>
          </div>
          <p className="text-sm sm:text-base font-display font-medium text-white leading-relaxed">
            {brief.coreIdea}
          </p>
        </div>

        {/* 02 - POURQUOI CELA COMPTE */}
        <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
              02 â€” CE QUI CHANGE POUR LES ORGANISATIONS
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed">
            {brief.whatChanges}
          </p>
        </div>

        {/* 03 - Ã€ RETENIR */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
              03 â€” Ã€ RETENIR POUR VOTRE GOUVERNANCE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-neutral-200 font-normal leading-relaxed">
            {brief.keyTakeaway}
          </p>
        </div>

        {/* Expanded 04 and 05 */}
        {isExpanded && (
          <div className="space-y-4 pt-2 animate-in fade-in-50 duration-300">
            {/* 04 - QUESTION STRATÃ‰GIQUE */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#170a0e] to-[#0A0A0C] border border-[#C8102E]/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#C8102E]" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  04 â€” QUESTION Ã€ SE POSER EN CONSEIL
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans italic text-white leading-relaxed">
                Â« {brief.strategicQuestion} Â»
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTAs */}
      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
        <button
          onClick={() => {
            kcgSound.playTactileClick();
            setIsExpanded(!isExpanded);
          }}
          className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer text-left py-1"
        >
          {isExpanded ? 'RÃ‰DUIRE LE BRIEFING' : '+ DÃ‰PLOYER LA QUESTION STRATÃ‰GIQUE (04/05)'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              kcgSound.playTactileClick();
              onOpenLetter(targetLetter);
            }}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#a50d26] text-white font-mono text-[9.5px] uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>LIRE LA LETTRE ASSOCIÃ‰E</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
