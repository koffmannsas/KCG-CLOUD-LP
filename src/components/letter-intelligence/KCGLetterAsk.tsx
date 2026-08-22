import React, { useState } from 'react';
import { Send, Sparkles, HelpCircle, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Letter } from '../../data/letters';
import { letterIntelligenceService, GroundedAnswer } from '../../services/letterIntelligenceService';
import { kcgSound } from '../../mobile/soundEngine';

interface KCGLetterAskProps {
  letter: Letter;
  onViewPassage?: (snippet?: string) => void;
}

export default function KCGLetterAsk({ letter, onViewPassage }: KCGLetterAskProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<GroundedAnswer | null>(null);
  const [lastAskedQuestion, setLastAskedQuestion] = useState<string>('');

  const suggestedQuestions = letterIntelligenceService.getSuggestedQuestions(letter);

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim() || isLoading) return;
    kcgSound.playTactileClick();
    setIsLoading(true);
    setLastAskedQuestion(questionText);

    try {
      const res = await letterIntelligenceService.answerQuestion(letter, questionText);
      setAnswer(res);
      kcgSound.playSignalPing(520);
    } catch (e) {
      setAnswer({
        answer: "Une erreur est survenue lors de l'analyse. Veuillez reformuler votre question.",
        isGrounded: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(query);
  };

  return (
    <div className="space-y-5 text-left animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
          POSER UNE QUESTION Ã€ KCG AI
        </span>
        <span className="text-[8px] font-mono text-[#C8102E] uppercase font-bold">
          Strictement AncrÃ© dans la Lettre
        </span>
      </div>

      {/* Question Suggestions Chips */}
      <div className="space-y-2">
        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider block">
          Suggestions d'investigation stratÃ©gique :
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleAsk(q);
              }}
              className="text-left text-[10px] sm:text-xs font-sans text-neutral-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-[#C8102E]/40 px-3 py-1.5 rounded-full transition-all cursor-pointer active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Que souhaitez-vous comprendre ?"
          className="w-full bg-[#0a0a0c] border border-white/15 focus:border-[#C8102E] rounded-2xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
        />

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[#C8102E] disabled:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>
      </form>

      {/* Answer Output Block */}
      {answer && (
        <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/15 space-y-3.5 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white font-bold">
                RÃ‰PONSE KCG AI
              </span>
            </div>
            <span className="text-[8px] font-mono text-neutral-400">
              {answer.isGrounded ? 'SOURCE : CONTENU OFFICIEL' : 'HORS-PÃ‰RIMÃˆTRE'}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-sans text-neutral-200 font-light leading-relaxed">
            {answer.answer}
          </p>

          {answer.passageSnippet && onViewPassage && (
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[8px] font-mono text-neutral-500 uppercase">
                Passage associÃ© identifiÃ©
              </span>
              <button
                onClick={() => onViewPassage(answer.passageSnippet)}
                className="flex items-center gap-1 text-[8.5px] font-mono uppercase tracking-wider text-[#C8102E] hover:underline cursor-pointer"
              >
                <span>VOIR LE PASSAGE DANS LA LETTRE</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
