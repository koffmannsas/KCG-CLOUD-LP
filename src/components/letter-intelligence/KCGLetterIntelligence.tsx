import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Key, Target, MessageSquare, Loader2, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Letter } from '../../data/letters';
import {
  letterIntelligenceService,
  LetterSummary,
  KeyIdea,
  ExecutiveAnalysis,
} from '../../services/letterIntelligenceService';
import KCGLetterSummary from './KCGLetterSummary';
import KCGLetterKeyIdeas from './KCGLetterKeyIdeas';
import KCGLetterAnalysis from './KCGLetterAnalysis';
import KCGLetterAsk from './KCGLetterAsk';
import KCGLetterAudioAnalysis from './KCGLetterAudioAnalysis';
import KCGLetterInsight from './KCGLetterInsight';
import { kcgSound } from '../../mobile/soundEngine';

type IntelligenceTab = 'summary' | 'ideas' | 'analysis' | 'ask';

interface KCGLetterIntelligenceProps {
  letter: Letter;
  onViewPassage?: (snippet?: string) => void;
  onNavigateDesktopPage?: (page: string) => void;
}

export default function KCGLetterIntelligence({
  letter,
  onViewPassage,
  onNavigateDesktopPage,
}: KCGLetterIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<IntelligenceTab>('summary');
  const [status, setStatus] = useState<'IDLE' | 'THINKING' | 'READY' | 'ERROR'>('READY');
  const [summary, setSummary] = useState<LetterSummary | null>(null);
  const [keyIdeas, setKeyIdeas] = useState<KeyIdea[]>([]);
  const [analysis, setAnalysis] = useState<ExecutiveAnalysis | null>(null);
  const [insight, setInsight] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setStatus('THINKING');

    const loadIntelligence = async () => {
      try {
        const [sum, ideas, exec, ins] = await Promise.all([
          letterIntelligenceService.summarizeLetter(letter),
          letterIntelligenceService.extractKeyIdeas(letter),
          letterIntelligenceService.analyzeForExecutive(letter),
          letterIntelligenceService.generateInsight(letter),
        ]);

        if (isMounted) {
          setSummary(sum);
          setKeyIdeas(ideas);
          setAnalysis(exec);
          setInsight(ins);
          setStatus('READY');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('ERROR');
        }
      }
    };

    loadIntelligence();

    return () => {
      isMounted = false;
    };
  }, [letter]);

  const handleTabChange = (tab: IntelligenceTab) => {
    kcgSound.playTactileClick();
    setActiveTab(tab);
  };

  return (
    <section className="mt-12 pt-10 border-t border-white/10 space-y-8 text-left">
      {/* ================= 1. SECTION BRANDING HEADER ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
            <span>KCG LETTERS INTELLIGENCEâ„¢</span>
          </div>

          <span className="text-[8px] font-mono uppercase text-neutral-500 tracking-wider">
            ANALYSTE & SYNTHÃ‰TISEUR
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white leading-snug">
            Comprendre cette lettre.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Une nouvelle maniÃ¨re d'explorer les idÃ©es du Fondateur sans dÃ©naturer la parole originale.
          </p>
        </div>
      </div>

      {/* ================= 2. AUDIO SYNTHESIS DOCK ================= */}
      <KCGLetterAudioAnalysis letter={letter} />

      {/* ================= 3. FOUR CORE INTELLIGENCE ACTIONS ================= */}
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#09090c] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => handleTabChange('summary')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>RÃ‰SUMER</span>
          </button>

          <button
            onClick={() => handleTabChange('ideas')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'ideas'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Key className="w-3 h-3" />
            <span>3 IDÃ‰ES CLÃ‰S</span>
          </button>

          <button
            onClick={() => handleTabChange('analysis')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Target className="w-3 h-3" />
            <span>ANALYSER</span>
          </button>

          <button
            onClick={() => handleTabChange('ask')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'ask'
                ? 'bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>POSER QUESTION</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="pt-2">
          {status === 'THINKING' && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#C8102E]" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                ANALYSE EN COURS PAR KCG AI...
              </span>
            </div>
          )}

          {status === 'ERROR' && (
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 text-center space-y-2">
              <p className="text-xs font-mono text-red-400">
                Impossible de gÃ©nÃ©rer l'analyse pour cette lettre actuellement.
              </p>
            </div>
          )}

          {status === 'READY' && (
            <div>
              {activeTab === 'summary' && summary && (
                <KCGLetterSummary summary={summary} onViewPassage={onViewPassage} />
              )}
              {activeTab === 'ideas' && (
                <KCGLetterKeyIdeas keyIdeas={keyIdeas} onViewPassage={onViewPassage} />
              )}
              {activeTab === 'analysis' && analysis && (
                <KCGLetterAnalysis analysis={analysis} />
              )}
              {activeTab === 'ask' && (
                <KCGLetterAsk letter={letter} onViewPassage={onViewPassage} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= 4. KCG INSIGHT CARD ================= */}
      {insight && <KCGLetterInsight insightText={insight} />}

      {/* ================= 5. FINAL SOVEREIGN BRIDGES ("EXPLORER KCG") ================= */}
      <div className="pt-8 border-t border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
            EXPLORER L'Ã‰COSYSTÃˆME KCG
          </span>
          <span className="text-[8px] font-mono text-neutral-500 uppercase">
            Passerelles Institutionnelles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateDesktopPage && onNavigateDesktopPage('krypton')}
            className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 text-left space-y-1.5 group transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                INTELLIGENCE SOUVERAINE
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h4 className="text-xs font-display font-bold uppercase text-white">
              KCG AI & KRYPTON
            </h4>
            <p className="text-[11px] text-neutral-400 font-light">
              Moteur d'analyse prÃ©dictive et cognitive.
            </p>
          </button>

          <button
            onClick={() => onNavigateDesktopPage && onNavigateDesktopPage('ecosystem')}
            className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 text-left space-y-1.5 group transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                PÃ”LES D'ACTIVITÃ‰
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h4 className="text-xs font-display font-bold uppercase text-white">
              NOS SOLUTIONS
            </h4>
            <p className="text-[11px] text-neutral-400 font-light">
              Finance, Datacenters, Logistique & Ã‰nergie.
            </p>
          </button>

          <button
            onClick={() => onNavigateDesktopPage && onNavigateDesktopPage('doctrine')}
            className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 text-left space-y-1.5 group transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                ARCHIVES EXÃ‰CUTIVES
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h4 className="text-xs font-display font-bold uppercase text-white">
              FOUNDER'S LETTERS
            </h4>
            <p className="text-[11px] text-neutral-400 font-light">
              Toutes les lettres et analyses doctrinales.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
