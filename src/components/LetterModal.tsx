import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Bookmark, Share2, Mail, ArrowRight, Loader2, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { usePodcastStore } from '../store/podcastStore';

interface Letter {
  id: number;
  date: string;
  title: string;
  duration: string;
  category: string;
  level: string;
  content: string;
  sign: string;
  excerpt: string;
  image: string;
}

interface LetterModalProps {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterModal({ letter, isOpen, onClose }: LetterModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { 
    activeLetter, 
    isPlaying, 
    isGenerating, 
    audioProgress,
    playLetter,
    togglePlayPause,
    isPlayerVisible
  } = usePodcastStore();

  const isCurrentLetterActive = activeLetter?.id === letter?.id;

  const handleAudioToggle = () => {
    if (!letter) return;
    if (isCurrentLetterActive) {
      togglePlayPause();
    } else {
      playLetter(letter);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Stop Lenis if it exists
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
      
      // Auto-start narration if we are not already playing it
      setTimeout(() => {
        if (letter && (usePodcastStore.getState().activeLetter?.id !== letter.id || !usePodcastStore.getState().isPlayerVisible)) {
           playLetter(letter);
        }
      }, 500);

      // Reset scroll progress
      setScrollProgress(0);
      
      // Force focus
      setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Start Lenis if it exists
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
  }, [isOpen, letter]);

  if (!letter) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* 1. PERMANENT BACKDROP (FIXED) */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-none" 
            aria-hidden="true"
          />
          
          {/* 2. THE INSTITUTIONAL HEADER BAR (FIXED ON TOP) */}
          <div className="fixed top-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 z-[250] flex items-center justify-between px-6 md:px-12 pointer-events-none">
             <div className="flex items-center gap-8 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <span className="text-black font-display font-bold text-sm">K</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white leading-none mb-1">Archives Stratégiques</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-mono">Document № 00{letter.id}</span>
                  </div>
                </div>
                
                <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                
                <div className="flex items-center gap-6 group pointer-events-auto bg-black/50 border border-white/5 rounded-full pl-2 pr-6 py-2 shadow-2xl backdrop-blur-xl">
                  <button 
                    onClick={handleAudioToggle}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                      (isCurrentLetterActive && isPlaying) ? "bg-white scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-kcg-red hover:bg-kcg-red/80 shadow-[0_0_30px_rgba(202,3,4,0.3)]"
                    )}
                    disabled={isCurrentLetterActive && isGenerating}
                  >
                    {(isCurrentLetterActive && isGenerating) ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (isCurrentLetterActive && isPlaying) ? (
                      <Pause className="w-5 h-5 text-black fill-black" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    )}
                  </button>
                  
                  <div className="text-left hidden xs:flex flex-col gap-1.5 w-64">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/50">
                        {(isCurrentLetterActive && isGenerating) ? 'Préparation de la narration stratégique...' : 'Lecture CEO'}
                      </p>
                      {(isCurrentLetterActive && isPlaying) && (
                        <div className="flex gap-0.5 items-end h-2.5">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [2, 8, 2] }}
                              transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                              className="w-[1.5px] bg-kcg-red"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
                        style={{ width: `${isCurrentLetterActive ? audioProgress : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
             </div>

             <div className="flex items-center gap-6 pointer-events-auto">
                <div className="hidden lg:flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[10px] uppercase font-bold tracking-widest">
                    <Bookmark className="w-3 h-3" />
                    <span>Archive</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[10px] uppercase font-bold tracking-widest">
                    <Share2 className="w-3 h-3" />
                    <span>Lien</span>
                  </button>
                </div>
                <div className="w-[1px] h-6 bg-white/10 hidden md:block" />
                <button 
                  onClick={onClose}
                  className="flex items-center gap-4 group pointer-events-auto"
                >
                  <span className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-white transition-colors hidden sm:inline">Quitter</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <X className="w-6 h-6 text-white/60 group-hover:text-black" />
                  </div>
                </button>
             </div>

             {/* Progress Bar attached to header bottom */}
             <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div 
                  className="h-full bg-kcg-red"
                  style={{ width: `${scrollProgress}%` }}
                />
             </div>
          </div>

          {/* 3. THE UNIQUE SCROLL VIEWPORT (MAIN SCROLL CONTAINER) */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-auto overscroll-contain z-[210] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden outline-none touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}
            tabIndex={0}
          >
            {/* Click to close backdrop layer inside scroll container (allows clicking empty space to close) */}
            <div className="fixed inset-0 z-0" onClick={onClose} />

            {/* Content Wrapper */}
            <div className="relative min-h-screen pt-40 pb-32 px-6 flex justify-center pointer-events-none">
              <motion.article
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[210mm] pointer-events-auto"
              >
                {/* THE A4 SHEET */}
                <div className="bg-white shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] relative flex flex-col min-h-[297mm]">
                  {/* Digital Paper Texture */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                  
                  {/* CINEMATIC LIGHTING OVERLAY */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(202,3,4,0.02)_0%,transparent_50%)]" />

                  {/* Letter Header */}
                  <header className="pt-24 px-12 md:px-24 flex flex-col gap-12 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black flex items-center justify-center">
                            <span className="text-white font-display font-bold text-sm">K</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12px] uppercase font-black tracking-[0.5em] text-black leading-none mb-1">Koffmann Capital Group</span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-mono italic">Strategic Governance Division</span>
                          </div>
                        </div>
                        <div className="h-[2px] w-20 bg-kcg-red" />
                      </div>
                      <div className="text-right font-mono text-[10px] uppercase tracking-widest text-black/40 space-y-1 font-bold">
                        <p>Lettre Stratégique № 00{letter.id}/2026</p>
                        <p className="text-kcg-red">{letter.category} • Niveau {letter.level}</p>
                      </div>
                    </div>

                    <div className="space-y-8 pt-12">
                      <p className="text-sm font-mono uppercase tracking-[0.4em] text-black font-bold opacity-60">Lomé, Togo — {letter.date}</p>
                      <h1 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-[0.9] text-black italic max-w-3xl">
                        {letter.title}
                      </h1>
                    </div>
                  </header>

                  {/* Body Content */}
                  <div className="w-full px-12 md:px-24 py-20 relative z-10">
                    <div className="space-y-12 text-xl md:text-2xl text-black/80 font-serif italic leading-[1.8] text-justify hyphens-auto">
                      {letter.content.split('\n\n').map((p, i) => (
                        <p key={i} className="first-letter:text-6xl first-letter:font-display first-letter:text-kcg-red first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Signature */}
                    <div className="pt-32 mt-20 border-t border-black/5">
                      <div className="space-y-10">
                        <p className="text-xl font-serif italic">Dans la vision et l'action,</p>
                        
                        <div className="relative pt-4">
                          <p className="text-6xl md:text-7xl font-display font-medium tracking-tighter uppercase text-black italic relative z-10">
                            Paul Koffmann
                          </p>
                          <div className="absolute -bottom-4 left-0 w-48 h-[3px] bg-kcg-red" />
                          
                          {/* Official Historical Seal */}
                          <div className="absolute right-0 bottom-[-20%] opacity-15 pointer-events-none">
                            <div className="w-40 h-40 border-8 border-kcg-red/20 rounded-full flex items-center justify-center p-4">
                              <div className="w-full h-full border-4 border-kcg-red/20 rounded-full flex items-center justify-center">
                                <span className="font-display font-bold text-3xl text-kcg-red/30 tracking-widest">KCG</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <p className="text-xs uppercase tracking-[0.5em] font-black text-black">Fondateur & Chairman</p>
                          <p className="text-xs uppercase tracking-[0.4em] font-bold text-black/40 italic mt-1">Koffmann Capital Group • Pan-African Sovereign Fund</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Integration */}
                  <div className="mt-auto px-12 md:px-24 py-24 bg-gray-50 border-t border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kcg-red/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-5 mb-8">
                        <Mail className="w-6 h-6 text-kcg-red" />
                        <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-black italic">
                          Accès au Cercle Stratégique
                        </h3>
                      </div>
                      <p className="text-sm text-black/60 leading-relaxed font-serif italic mb-12 max-w-xl">
                        Rejoignez les décideurs qui façonnent le futur du continent. Recevez hebdomadairement nos notes de synthèse, analyses de marché souveraines et orientations technologiques.
                      </p>
                      
                      <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                          type="email" 
                          placeholder="nom@koffmann.group"
                          className="flex-1 h-16 bg-white border border-black/10 px-8 text-sm italic font-serif focus:ring-1 focus:ring-kcg-red focus:border-kcg-red transition-all outline-none"
                        />
                        <button className="h-16 px-10 bg-black text-white hover:bg-kcg-red transition-all duration-300 flex items-center justify-center gap-4 group">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Rejoindre le Cercle</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Letter Metadata / Footer */}
                  <footer className="px-12 md:px-24 py-10 bg-white border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono uppercase tracking-[0.5em] text-black/30 font-bold">
                    <div className="flex items-center gap-6">
                      <span>© 2026 KCG INTELLIGENCE</span>
                      <span className="hidden md:inline">•</span>
                      <span>HORS COMMERCE</span>
                    </div>
                    <span>CLASSIFICATION : TOP SECRET / SOUVERAINETÉ AFRICAINE</span>
                    <span>PAGE 01/01</span>
                  </footer>
                </div>
              </motion.article>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
