import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { executiveReaderService } from '../../services/executiveReaderService';
import { Letter } from '../../data/letters';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveAskModalProps {
  onOpenLetter: (letter: Letter) => void;
}

const PROMPT_SUGGESTIONS = [
  "Quelles sont les principales idÃ©es dÃ©veloppÃ©es dans ces lettres ?",
  "Quelle lettre parle le plus de souverainetÃ© et de serveurs ?",
  "Comment l'IA transforme-t-elle l'organisation selon le Fondateur ?",
  "Quels sont les piliers du leadership intergÃ©nÃ©rationnel ?",
];

export default function ExecutiveAskModal({ onOpenLetter }: ExecutiveAskModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<
    Array<{
      question: string;
      answer: string;
      referencedLetters: Letter[];
      sourceSnippets: string[];
    }>
  >([]);

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || loading) return;

    kcgSound.playTactileClick();
    setLoading(true);
    setQuery('');

    try {
      const response = await executiveReaderService.answerLibraryQuery(q);
      setConversation((prev) => [
        {
          question: q,
          answer: response.answer,
          referencedLetters: response.referencedLetters,
          sourceSnippets: response.sourceSnippets,
        },
        ...prev,
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left select-none">
      {/* Header */}
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            KCG AI Â· RECHERCHE DOCTRINALE ANCRÃ‰E
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
          Interrogez Votre Espace de Lecture
        </h3>
        <p className="text-xs text-neutral-400 font-light">
          Posez des questions stratÃ©giques sur les lettres consultÃ©es, comparÃ©es et sauvegardÃ©es.
        </p>
      </div>

      {/* Suggested prompts */}
      <div className="space-y-2">
        <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
          SUGGESTIONS D'INVESTIGATION
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PROMPT_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(s)}
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left text-xs font-sans text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
            >
              <span className="truncate mr-2">Â« {s} Â»</span>
              <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-2 rounded-2xl bg-[#09090c] border border-white/15 focus-within:border-[#C8102E] transition-all flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAsk(query);
          }}
          placeholder="Ex: Quelle est la position sur la souverainetÃ© technologique ?"
          className="flex-1 px-3 py-2 bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none font-sans"
        />
        <button
          onClick={() => handleAsk(query)}
          disabled={!query.trim() || loading}
          className="px-4 py-2 rounded-xl bg-[#C8102E] hover:bg-[#a50d26] disabled:opacity-40 text-white font-mono text-[9px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <>
              <Send className="w-3 h-3" />
              <span>INTERROGER</span>
            </>
          )}
        </button>
      </div>

      {/* Conversation Thread */}
      <div className="space-y-4">
        {conversation.map((entry, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-4 animate-in fade-in duration-300"
          >
            {/* User Question */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-[9px] font-mono uppercase text-[#C8102E] font-bold">
                QUESTION DIRIGEANT :
              </span>
              <span className="text-xs font-sans text-white font-medium">
                Â« {entry.question} Â»
              </span>
            </div>

            {/* AI Answer */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#C8102E]" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  RÃ‰PONSE KCG AI Â· BASÃ‰E SUR VOS LECTURES
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed font-light">
                {entry.answer}
              </p>
            </div>

            {/* Source Snippets */}
            {entry.sourceSnippets.length > 0 && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[8px] font-mono uppercase text-neutral-500 font-bold">
                  EXTRAITS DU CORPUS CONSULTÃ‰ :
                </span>
                {entry.sourceSnippets.map((snippet, sIdx) => (
                  <p key={sIdx} className="text-[11px] font-mono italic text-neutral-300">
                    â€œ{snippet}â€
                  </p>
                ))}
              </div>
            )}

            {/* Referencing Letters */}
            {entry.referencedLetters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[8px] font-mono text-neutral-500 uppercase">
                  Dossiers citÃ©s :
                </span>
                {entry.referencedLetters.map((letter) => (
                  <button
                    key={letter.id}
                    onClick={() => {
                      kcgSound.playTactileClick();
                      onOpenLetter(letter);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-mono text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-2.5 h-2.5 text-[#C8102E]" />
                    <span>Dossier #{letter.id} Â· {letter.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
