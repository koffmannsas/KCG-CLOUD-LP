import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Radio,
  Volume2,
  Share2,
  Sparkles,
  Loader2,
  Bell,
  Bookmark,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/src/lib/utils';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS, Letter } from '../data/letters';
import {
  LetterEngagementBar,
  LetterCommentsSection,
  LetterRecommendationCard,
  ReadingProgressBanner
} from './LetterEngagement';
import LetterSubscriptionModal, { LetterSubscriptionBanner } from './LetterSubscriptionModal';
import KCGLetterIntelligence from './letter-intelligence/KCGLetterIntelligence';
import { readerService } from '../services/readerService';
import { kcgSound } from '../mobile/soundEngine';

interface LetterModalProps {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectLetter?: (letter: Letter) => void;
}

export default function LetterModal({ letter, isOpen, onClose, onSelectLetter }: LetterModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(letter);
  const [initialProgress, setInitialProgress] = useState<number>(0);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [highlightedSnippet, setHighlightedSnippet] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const commentsSectionRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (letter) {
      setCurrentLetter(letter);
      const savedProg = readerService.getReadingProgress(letter.id);
      setInitialProgress(savedProg);
      readerService.recordLetterOpen(letter.id, savedProg);
      setHighlightedSnippet(null);
    }
  }, [letter]);

  const handleToggleImmersiveMode = () => {
    kcgSound.playTactileClick();
    setIsImmersiveMode(!isImmersiveMode);
  };

  const handleViewPassage = (snippet?: string) => {
    if (!snippet) return;
    setHighlightedSnippet(snippet);
    kcgSound.playTactileClick();

    // Find snippet element or scroll into reading container
    if (scrollContainerRef.current) {
      const pElements = scrollContainerRef.current.querySelectorAll('p, blockquote');
      const snippetWords = snippet.toLowerCase().slice(0, 35);

      let matchedEl: Element | null = null;
      pElements.forEach((el) => {
        if (el.textContent && el.textContent.toLowerCase().includes(snippetWords)) {
          matchedEl = el;
        }
      });

      if (matchedEl) {
        (matchedEl as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        scrollContainerRef.current.scrollTo({ top: 300, behavior: 'smooth' });
      }

      setTimeout(() => {
        setHighlightedSnippet(null);
      }, 4000);
    }
  };

  const {
    activeLetter,
    isPlaying,
    isGenerating,
    playLetter,
    togglePlayPause
  } = usePodcastStore();

  const isCurrentLetterActive = activeLetter?.id === currentLetter?.id;

  // Previous & Next Letters
  const { prevLetter, nextLetter } = useMemo(() => {
    if (!currentLetter) return { prevLetter: null, nextLetter: null };
    const currentIndex = LETTERS.findIndex((l) => l.id === currentLetter.id);
    const prev = currentIndex > 0 ? LETTERS[currentIndex - 1] : null;
    const next = currentIndex < LETTERS.length - 1 ? LETTERS[currentIndex + 1] : null;
    return { prevLetter: prev, nextLetter: next };
  }, [currentLetter]);

  const handleAudioToggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentLetter) return;
    if (isCurrentLetterActive) {
      togglePlayPause();
    } else {
      playLetter(currentLetter);
    }
  };

  const handleNavigateToLetter = (target: Letter) => {
    setCurrentLetter(target);
    const savedProg = readerService.getReadingProgress(target.id);
    setInitialProgress(savedProg);
    readerService.recordLetterOpen(target.id, savedProg);
    if (onSelectLetter) onSelectLetter(target);
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToComments = () => {
    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResumeReading = () => {
    if (scrollContainerRef.current && initialProgress > 0) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const targetScroll = ((scrollHeight - clientHeight) * initialProgress) / 100;
      scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setInitialProgress(0); // Dismiss the banner after resuming
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        setScrollProgress(progress);
        if (currentLetter) {
          readerService.saveReadingProgress(currentLetter.id, progress);
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
      setScrollProgress(0);
      setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen || !currentLetter) return null;

  // Render Letter Content with structured Section Headers and paragraphs
  const renderFormattedContent = (rawContent: string) => {
    const blocks = rawContent.split('\n\n');
    let sectionCounter = 0;

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Detect markdown section header (### ...)
      if (trimmed.startsWith('###')) {
        sectionCounter += 1;
        const cleanTitle = trimmed.replace(/^###\s*/, '').replace(/^[I|V|X]+\.\s*/, '');
        const romanMatch = trimmed.match(/^###\s*([I|V|X]+)\.\s*/);
        const roman = romanMatch ? romanMatch[1] : `0${sectionCounter}`;

        return (
          <div key={`section-${idx}`} className="pt-8 pb-3 space-y-2 border-t border-white/10 mt-8 first:mt-0 first:border-0 first:pt-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#C8102E] font-mono text-[9px] font-bold uppercase tracking-widest">
                PARTIE {roman}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-display font-black uppercase text-white tracking-tight leading-snug">
              {cleanTitle}
            </h2>
          </div>
        );
      }

      // Detect pull-quote (starts with "Â«" or quotes)
      if (trimmed.startsWith('Â«') || trimmed.startsWith('"')) {
        return (
          <blockquote
            key={`quote-${idx}`}
            className="my-6 p-4 sm:p-6 rounded-2xl bg-white/[0.03] border-l-4 border-[#C8102E] space-y-2"
          >
            <p className="text-base sm:text-xl font-display italic font-medium text-white leading-relaxed">
              {trimmed}
            </p>
          </blockquote>
        );
      }

      // Standard body paragraph
      const isFirstParagraph = idx === 0 || (idx === 1 && blocks[0].startsWith('###'));
      const isHighlighted = highlightedSnippet && (trimmed.toLowerCase().includes(highlightedSnippet.toLowerCase().slice(0, 30)) || highlightedSnippet.toLowerCase().includes(trimmed.toLowerCase().slice(0, 30)));

      return (
        <p
          key={`p-${idx}`}
          className={cn(
            "text-[16.5px] sm:text-[18px] text-neutral-200/90 font-sans font-light leading-[1.8] sm:leading-[1.85] text-left break-words transition-all duration-500",
            isFirstParagraph && "first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-display first-letter:font-black first-letter:text-[#C8102E] first-letter:mr-3 first-letter:float-left first-letter:leading-none",
            isHighlighted && "bg-[#C8102E]/15 border-l-4 border-[#C8102E] pl-3 py-1 text-white rounded-r-lg"
          )}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[300] bg-[#000000] flex flex-col justify-start overflow-hidden select-none"
      >
        {/* ================= 1. STICKY TOP EDITORIAL HEADER BAR ================= */}
        <header
          className="w-full h-14 sm:h-16 px-4 sm:px-6 border-b border-white/10 bg-[#08080a]/95 backdrop-blur-xl flex items-center justify-between z-50 shrink-0 relative"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          {/* Left: Back / Letter Number */}
          <button
            onClick={onClose}
            aria-label="Fermer la lettre"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer group active:scale-95 py-1 px-2 -ml-2 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C8102E] group-hover:border-[#C8102E] transition-all">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white">
              LETTRE 00{currentLetter.id}
            </span>
          </button>

          {/* Center: Category Pill */}
          <div className="hidden md:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
              {currentLetter.category}
            </span>
          </div>

          {/* Right: Actions (Immersive mode + Follow + Audio trigger + Close) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleToggleImmersiveMode}
              title={isImmersiveMode ? "Quitter le mode immersif" : "Mode de lecture immersif"}
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer",
                isImmersiveMode
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 hover:border-white/30 text-neutral-300 hover:text-white"
              )}
            >
              {isImmersiveMode ? (
                <>
                  <Minimize2 className="w-3 h-3 text-black" />
                  <span>NORMAL</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 text-[#C8102E]" />
                  <span>MODE IMMERSIF</span>
                </>
              )}
            </button>

            {!isImmersiveMode && (
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#C8102E]/20 border border-white/10 hover:border-[#C8102E]/40 text-neutral-300 hover:text-white transition-all text-[9px] font-mono uppercase font-bold tracking-widest cursor-pointer"
              >
                <Bell className="w-3 h-3 text-[#C8102E]" />
                <span>ÃŠTRE INFORMÃ‰</span>
              </button>
            )}

            <button
              onClick={handleAudioToggle}
              aria-label="Ã‰couter la lettre"
              className={cn(
                "px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer",
                isCurrentLetterActive && isPlaying
                  ? "bg-[#C8102E] border-[#C8102E] text-white font-bold animate-pulse shadow-lg shadow-[#C8102E]/30"
                  : "bg-white/5 border-white/15 text-neutral-300 hover:text-white hover:bg-white/10"
              )}
            >
              {isCurrentLetterActive && isGenerating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : isCurrentLetterActive && isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Ã‰couter ({currentLetter.duration})</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Reading Scroll Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5">
            <div
              className="h-full bg-[#C8102E] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

        {/* ================= 2. MAIN SCROLLABLE READING VIEWPORT ================= */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          tabIndex={0}
          className="flex-1 overflow-y-auto overflow-x-hidden text-white outline-none"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-36 space-y-8">
            {/* Resume reading if previous progress exists */}
            {initialProgress > 10 && initialProgress < 95 && (
              <ReadingProgressBanner
                progress={initialProgress}
                onResume={handleResumeReading}
              />
            )}

            {/* Poster / Cover Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/15 bg-[#09090c] shadow-2xl">
              <img
                src={currentLetter.image || 'https://firebasestorage.googleapis.com/v0/b/krypton-ai-490214.firebasestorage.app/o/kcg_boardroom.png?alt=media'}
                alt={currentLetter.title}
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#C8102E] text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                  LET 00{currentLetter.id} // {currentLetter.date}
                </span>
                <span className="text-[9px] font-mono text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  {currentLetter.duration} DE LECTURE
                </span>
              </div>
            </div>

            {/* Letter Header Content */}
            <article className="space-y-6">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold">
                    DOCTRINE DU FONDATEUR Â· {currentLetter.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight leading-[1.1]">
                  {currentLetter.title}
                </h1>

                {/* Accent Line */}
                <div className="h-[3px] w-20 bg-[#C8102E] rounded-full" />

                {/* EDITORIAL ENGAGEMENT LAYER (Likes, Comments, Save, Views, Share) */}
                <LetterEngagementBar
                  letter={currentLetter}
                  onScrollToComments={handleScrollToComments}
                />
              </div>

              {/* Excerpt / Executive ChapÃ´ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0e0e12] border-l-4 border-[#C8102E] border-y border-r border-white/5 space-y-1">
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#C8102E] font-bold block">
                  SYNTHÃˆSE DU FONDATEUR
                </span>
                <p className="text-sm sm:text-base font-sans italic text-white font-normal leading-relaxed">
                  Â« {currentLetter.excerpt} Â»
                </p>
              </div>

              {/* Main Reading Body */}
              <div className="space-y-6 sm:space-y-7 pt-2">
                {renderFormattedContent(currentLetter.content)}
              </div>

              {/* ================= 3. OFFICIAL FOUNDER SIGNATURE ================= */}
              <div className="pt-12 sm:pt-16 mt-12 border-t border-white/10 relative">
                <div className="space-y-4 relative z-10">
                  <p className="text-sm sm:text-base font-sans italic text-neutral-300">
                    Dans la vision et l'action,
                  </p>

                  <div className="space-y-1 pt-1">
                    <p className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white">
                      {currentLetter.sign || 'Paul Koffmann'}
                    </p>
                    <div className="h-[2px] w-28 bg-[#C8102E]" />
                  </div>

                  <div className="pt-2 space-y-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    <p className="text-white font-bold">Fondateur & Chairman</p>
                    <p>Koffmann Capital Group â€¢ Pan-African Sovereign Fund</p>
                    <p className="text-[#C8102E]">KCG HOUSE // LomÃ©, Togo & Abidjan, CÃ´te d'Ivoire</p>
                  </div>
                </div>

                {/* Subtle Sovereign Seal Watermark */}
                <div className="absolute right-0 bottom-4 opacity-10 pointer-events-none select-none">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#C8102E] flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-full border-2 border-[#C8102E] flex items-center justify-center">
                      <span className="font-display font-black text-2xl sm:text-3xl text-[#C8102E] tracking-widest">
                        KCG
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= 4. KCG LETTERS INTELLIGENCEâ„¢ AUGMENTED LAYER ================= */}
              <KCGLetterIntelligence
                letter={currentLetter}
                onViewPassage={handleViewPassage}
                onNavigateDesktopPage={(page) => {
                  onClose();
                  // Dispatch customary window navigation or handle gracefully
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('kcg-navigate', { detail: { page } }));
                  }
                }}
              />

              {/* ================= 5. NEXT READING RECOMMENDATION ("Ã€ LIRE ENSUITE") ================= */}
              {!isImmersiveMode && (
                <LetterRecommendationCard
                  currentLetterId={currentLetter.id}
                  onSelectLetter={handleNavigateToLetter}
                />
              )}

              {/* ================= 6. INTELLIGENT FOLLOW-UP CALLOUT ================= */}
              {!isImmersiveMode && (
                <LetterSubscriptionBanner
                  onOpenModal={() => setIsSubscriptionModalOpen(true)}
                />
              )}

              {/* ================= 7. COMMENTS & REACTIONS SECTION ================= */}
              {!isImmersiveMode && (
                <LetterCommentsSection
                  letter={currentLetter}
                  sectionRef={commentsSectionRef}
                />
              )}

              {/* ================= 8. PREVIOUS / NEXT LETTER NAVIGATION ================= */}
              <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prevLetter ? (
                  <button
                    onClick={() => handleNavigateToLetter(prevLetter)}
                    className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 flex items-center gap-3 text-left group transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#C8102E] transition-colors shrink-0">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">
                        â† LETTRE PRÃ‰CÃ‰DENTE (00{prevLetter.id})
                      </span>
                      <span className="text-xs font-display font-bold uppercase text-white truncate block">
                        {prevLetter.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextLetter && (
                  <button
                    onClick={() => handleNavigateToLetter(nextLetter)}
                    className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 hover:border-[#C8102E]/60 flex items-center justify-between gap-3 text-right group transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">
                        LETTRE SUIVANTE (00{nextLetter.id}) â†’
                      </span>
                      <span className="text-xs font-display font-bold uppercase text-white truncate block">
                        {nextLetter.title}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#C8102E] transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                )}
              </div>
            </article>
          </div>
        </div>

        {/* ================= 8. FLOATING BOTTOM AUDIO DOCK ================= */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none flex justify-center"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
        >
          <div className="w-full max-w-lg bg-[#0e0e13]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl pointer-events-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={handleAudioToggle}
                aria-label="ContrÃ´le audio de la lettre"
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md active:scale-95",
                  isCurrentLetterActive && isPlaying
                    ? "bg-white text-black"
                    : "bg-[#C8102E] text-white"
                )}
              >
                {isCurrentLetterActive && isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isCurrentLetterActive && isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div className="min-w-0 text-left">
                <span className="text-[7.5px] font-mono text-neutral-400 uppercase tracking-widest block truncate">
                  {isCurrentLetterActive && isPlaying ? 'NARRATION EN COURS' : 'NARRATION AUDIO DU FONDATEUR'}
                </span>
                <span className="text-[11px] font-display font-bold uppercase text-white truncate block">
                  {currentLetter.title}
                </span>
              </div>
            </div>

            {/* Waveform Visualizer or Duration */}
            <div className="flex items-center gap-2 shrink-0 pr-1">
              {isCurrentLetterActive && isPlaying ? (
                <div className="flex gap-0.5 items-end h-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [3, 12, 3] }}
                      transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                      className="w-1 bg-[#C8102E] rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <span className="text-[10px] font-mono font-bold text-neutral-400">
                  {currentLetter.duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subscription Bottom Sheet Modal */}
        <LetterSubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
