import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Play, Pause, X } from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
import { kcgSound } from './soundEngine';

export default function MobileMiniPlayer() {
  const { isRadioFullscreen, setIsRadioFullscreen, isRadioVisible, setIsRadioVisible } = useMobileOSStore();
  const { activeLetter, isPlaying, setIsPlaying, playLetter, closePlayer } = usePodcastStore();

  const currentLetter = activeLetter || LETTERS[0];

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    if (!activeLetter) {
      playLetter(LETTERS[0]);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenFullscreen = () => {
    kcgSound.playTactileClick();
    kcgSound.playSignalPing(500);
    setIsRadioFullscreen(true);
  };

  const handleCloseRadio = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    setIsPlaying(false);
    closePlayer();
    setIsRadioVisible(false);
  };

  if (!isRadioVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-3 z-[100] select-none pointer-events-auto"
        style={{ bottom: 'calc(76px + max(env(safe-area-inset-bottom, 0px), 8px))' }}
      >
        <div
          onClick={handleOpenFullscreen}
          className="max-w-md mx-auto h-13 px-3.5 rounded-2xl bg-[#0A0A0A]/95 border border-white/[0.1] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.9)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
        >
          {/* Left: Cover + Single Track Line */}
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-7 h-7 rounded-lg bg-[#CF1A26] text-white flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(207,26,38,0.4)]">
              <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>

            <div className="min-w-0 text-left">
              <h4 className="text-xs font-display font-black text-white uppercase truncate tracking-tight">
                {currentLetter.title}
              </h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#CF1A26] animate-pulse" />
                <span className="text-[7.5px] font-mono text-[#8A8A8A] tracking-wider uppercase truncate">
                  KCG RADIO // {isPlaying ? 'EN LECTURE' : 'TRANSMISSION'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions (Play/Pause + Close Radio Button) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Play / Pause */}
            <button
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
              className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-md cursor-pointer hover:bg-neutral-200"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-black" />
              ) : (
                <Play className="w-3 h-3 fill-black ml-0.5" />
              )}
            </button>

            {/* Close Radio Button */}
            <button
              onClick={handleCloseRadio}
              aria-label="Fermer la radio"
              title="Fermer la radio"
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
