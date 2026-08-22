import React from 'react';
import { ArrowUpRight, Quote, BookOpen } from 'lucide-react';
import { KeyIdea } from '../../services/letterIntelligenceService';

interface KCGLetterKeyIdeasProps {
  keyIdeas: KeyIdea[];
  onViewPassage?: (snippet?: string) => void;
}

export default function KCGLetterKeyIdeas({ keyIdeas, onViewPassage }: KCGLetterKeyIdeasProps) {
  return (
    <div className="space-y-4 text-left animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
          3 IDÃ‰ES FONDAMENTALES DÃ‰PLOYÃ‰ES
        </span>
        <span className="text-[8px] font-mono text-neutral-500 uppercase">
          Architecture Conceptuelle
        </span>
      </div>

      <div className="space-y-3.5">
        {keyIdeas.map((idea) => (
          <div
            key={idea.id}
            className="p-5 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/40 transition-all group space-y-3"
          >
            {/* Header: Number & Tag */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-display font-black text-xl sm:text-2xl text-[#C8102E] tracking-tight">
                  {idea.number}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  {idea.partReference || 'AXE STRATÃ‰GIQUE'}
                </span>
              </div>

              {idea.passageSnippet && onViewPassage && (
                <button
                  onClick={() => onViewPassage(idea.passageSnippet)}
                  className="flex items-center gap-1 text-[8px] font-mono uppercase tracking-wider text-neutral-400 hover:text-[#C8102E] transition-colors py-1 px-2 rounded-md hover:bg-white/5 cursor-pointer"
                >
                  <span>VOIR LE PASSAGE</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C8102E]" />
                </button>
              )}
            </div>

            {/* Title */}
            <h4 className="text-base sm:text-lg font-display font-bold uppercase tracking-tight text-white group-hover:text-neutral-100">
              {idea.title}
            </h4>

            {/* Explanation */}
            <p className="text-xs sm:text-sm font-sans font-light text-neutral-300 leading-relaxed">
              {idea.explanation}
            </p>

            {/* Direct quotation preview */}
            {idea.passageSnippet && (
              <div className="pt-2 border-t border-white/5 flex items-start gap-2 text-neutral-400">
                <Quote className="w-3 h-3 text-[#C8102E] shrink-0 mt-0.5" />
                <p className="text-[11px] font-sans italic text-neutral-400 leading-snug">
                  Â« {idea.passageSnippet} Â»
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
