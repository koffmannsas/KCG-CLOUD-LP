import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  PowerOff
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
import { kcgSound } from './soundEngine';

export default function MobileRadioModal() {
  const { isRadioFullscreen, setIsRadioFullscreen, setActiveTab, setIsRadioVisible } = useMobileOSStore();
  const { activeLetter, isPlaying, setIsPlaying, playLetter, closePlayer } = usePodcastStore();

  const currentLetter = activeLetter || LETTERS[0];

  if (!isRadioFullscreen) return null;

  const handleTogglePlay = () => {
    kcgSound.playTactileClick();
    if (!activeLetter) {
      playLetter(LETTERS[0]);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleCloseAndStopRadio = () => {
    kcgSound.playTactileClick();
    setIsPlaying(false);
    closePlayer();
    setIsRadioVisible(false);
    setIsRadioFullscreen(false);
  };

  const handleNext = () => {
    kcgSound.playSignalPing(440);
    const currentIndex = LETTERS.findIndex((l) => l.id === currentLetter.id);
    const nextLetter = LETTERS[(currentIndex + 1) % LETTERS.length];
    playLetter(nextLetter);
  };

  const handlePrev = () => {
    kcgSound.playSignalPing(380);
    const currentIndex = LETTERS.findIndex((l) => l.id === currentLetter.id);
    const prevLetter = LETTERS[(currentIndex - 1 + LETTERS.length) % LETTERS.length];
    playLetter(prevLetter);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[260] bg-black flex flex-col justify-between overflow-hidden select-none">
        {/* Top Header */}
        <div
          className="w-full px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/95 backdrop-blur-md relative z-20"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 16px) + 8px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CF1A26] animate-pulse" />
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
              KCG RADIO // LIVE INTELLIGENCE
            </span>
          </div>

          <button
            onClick={handleCloseAndStopRadio}
            aria-label="Fermer la radio"
            title="Fermer la radio"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-[#CF1A26]/30 hover:border-[#CF1A26]/60 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Central Artwork & Waveform Interface */}
        <div className="flex-1 px-6 py-6 flex flex-col items-center justify-center space-y-6 text-center">
          {/* Circular Vinyl Artwork */}
          <div className="relative w-56 h-56 rounded-full border border-white/15 bg-gradient-to-b from-[#18181b] via-[#0A0A0A] to-black shadow-[0_0_40px_rgba(207,26,38,0.25)] flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border border-dashed border-[#CF1A26]/30 rounded-full"
            />

            <div className="relative z-10 w-20 h-20 rounded-full bg-black border border-white/20 flex flex-col items-center justify-center shadow-2xl">
              <span className="text-lg font-display font-black text-white tracking-widest">KCG</span>
              <span className="text-[6px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest mt-0.5">
                RADIO
              </span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-1 max-w-xs">
            <span className="text-[8px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest">
              DOSSIER STRATÃ‰GIQUE #{currentLetter.id}
            </span>
            <h2 className="text-base font-display font-black uppercase text-white tracking-tight leading-snug">
              {currentLetter.title}
            </h2>
            <span className="text-[9px] font-mono text-neutral-400 block">
              Paul Koffmann // Abidjan HQ
            </span>
          </div>

          {/* Dynamic Waveform */}
          <div className="flex items-center justify-center gap-1 w-44 h-7">
            {[40, 70, 30, 90, 50, 80, 45, 60, 95, 35, 75, 55, 85, 30, 65].map((h, i) => (
              <motion.span
                key={i}
                animate={{
                  height: isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : '20%'
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut'
                }}
                className="w-0.5 rounded-full bg-gradient-to-t from-[#CF1A26] to-white"
              />
            ))}
          </div>
        </div>

        {/* Bottom Audio Controller Deck */}
        <div
          className="w-full p-6 border-t border-white/[0.08] bg-[#0A0A0A] space-y-4"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 16px)' }}
        >
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              aria-label="Dossier prÃ©cÃ©dent"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 active:scale-90 transition-transform cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer hover:bg-neutral-200"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              aria-label="Dossier suivant"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 active:scale-90 transition-transform cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsRadioFullscreen(false);
                setActiveTab('ai');
              }}
              className="py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[7.5px] font-mono uppercase text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#CF1A26]" />
              <span className="truncate">Analyse KCG AI</span>
            </button>

            <button
              onClick={handleCloseAndStopRadio}
              className="py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-[#CF1A26]/10 hover:border-[#CF1A26]/40 text-[7.5px] font-mono uppercase text-neutral-400 hover:text-red-400 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-colors cursor-pointer"
            >
              <PowerOff className="w-3 h-3" />
              <span className="truncate">Ã‰teindre la radio</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
