import React, { useState, useMemo } from 'react';
import { Columns2, ArrowRight, Sparkles, HelpCircle, Check, BookOpen } from 'lucide-react';
import { executiveReaderService, LetterComparison } from '../../services/executiveReaderService';
import { LETTERS, Letter } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveCompareModalProps {
  onOpenLetter: (letter: Letter) => void;
}

export default function ExecutiveCompareModal({ onOpenLetter }: ExecutiveCompareModalProps) {
  const [selectedIdA, setSelectedIdA] = useState<number>(1);
  const [selectedIdB, setSelectedIdB] = useState<number>(2);

  const comparison: LetterComparison = useMemo(() => {
    return executiveReaderService.compareLetters(selectedIdA, selectedIdB);
  }, [selectedIdA, selectedIdB]);

  const letterA = comparison.letterA;
  const letterB = comparison.letterB;

  return (
    <div className="space-y-6 text-left select-none">
      {/* Header */}
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Columns2 className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            MOTEUR COMPARATIF DOCTRINAL
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
          Comparer Deux RÃ©flexions
        </h3>
        <p className="text-xs text-neutral-400 font-light">
          Analysez les continuitÃ©s, ruptures et Ã©volutions de pensÃ©e entre deux dossiers stratÃ©giques.
        </p>
      </div>

      {/* Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Letter A selector */}
        <div className="p-4 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
            LETTRE A (RÃ‰FÃ‰RENCE)
          </span>
          <select
            value={selectedIdA}
            onChange={(e) => {
              kcgSound.playTactileClick();
              setSelectedIdA(Number(e.target.value));
            }}
            className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-[#C8102E] cursor-pointer"
          >
            {LETTERS.map((l) => (
              <option key={`a-${l.id}`} value={l.id} disabled={l.id === selectedIdB}>
                Dossier #{l.id} â€” {l.title}
              </option>
            ))}
          </select>
        </div>

        {/* Letter B selector */}
        <div className="p-4 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
            LETTRE B (CONFRONTATION)
          </span>
          <select
            value={selectedIdB}
            onChange={(e) => {
              kcgSound.playTactileClick();
              setSelectedIdB(Number(e.target.value));
            }}
            className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-[#C8102E] cursor-pointer"
          >
            {LETTERS.map((l) => (
              <option key={`b-${l.id}`} value={l.id} disabled={l.id === selectedIdA}>
                Dossier #{l.id} â€” {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix Cards */}
      <div className="space-y-3.5">
        {/* 1. POINT COMMUN */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              01 â€” SOCLE COMMUN & PRINCIPE PARTAGÃ‰
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed font-light">
            {comparison.commonGround}
          </p>
        </div>

        {/* 2. DIFFÃ‰RENCE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
              02 â€” DISTINCTION CONCEPTUELLE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed font-light">
            {comparison.keyDifference}
          </p>
        </div>

        {/* 3. Ã‰VOLUTION DE LA PENSÃ‰E */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              03 â€” TRAJECTOIRE & Ã‰VOLUTION DOCTRINALE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed font-light">
            {comparison.evolutionOfThought}
          </p>
        </div>

        {/* 4. QUESTION STRATÃ‰GIQUE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#170a0e] to-[#0A0A0C] border border-[#C8102E]/35 space-y-1.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
              04 â€” SYNTHÃˆSE POUR DÃ‰CIDEUR
            </span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-white italic leading-relaxed">
            Â« {comparison.strategicQuestion} Â»
          </p>
        </div>
      </div>

      {/* Direct links to both letters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
        <button
          onClick={() => {
            kcgSound.playTactileClick();
            onOpenLetter(letterA);
          }}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9.5px] font-mono uppercase font-bold tracking-wider flex items-center justify-between cursor-pointer"
        >
          <span className="truncate mr-2">Ouvrir Lettre 00{letterA.id}</span>
          <BookOpen className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
        </button>

        <button
          onClick={() => {
            kcgSound.playTactileClick();
            onOpenLetter(letterB);
          }}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9.5px] font-mono uppercase font-bold tracking-wider flex items-center justify-between cursor-pointer"
        >
          <span className="truncate mr-2">Ouvrir Lettre 00{letterB.id}</span>
          <BookOpen className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
        </button>
      </div>
    </div>
  );
}
