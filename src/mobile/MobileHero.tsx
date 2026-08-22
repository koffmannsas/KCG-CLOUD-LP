import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Activity, Globe, Zap, Radio } from 'lucide-react';
import { kcgSound } from './soundEngine';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';

interface MobileHeroProps {
  onExplore?: () => void;
}

export default function MobileHero({ onExplore }: MobileHeroProps) {
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const { playLetter, isPlayerVisible } = usePodcastStore();

  const telemetryLogs = [
    'CORE STATUS // SYNCRONISÃ‰ (ABIDJAN HQ)',
    'CORRIDOR DAKAR-ABIDJAN-LAGOS // ACTIF',
    'FIKO AI // APPRENTISSAGE CONTINU (96.8%)',
    'FIKO PAY // RÃˆGLEMENTS MULTI-SIG OPÃ‰RATIONNELS',
    'SOUVERAINETÃ‰ AFRICAINE // EN Ã‰RECTION'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetryLogs.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleExploreClick = () => {
    kcgSound.playTactileClick();
    if (onExplore) {
      onExplore();
    } else {
      const el = document.getElementById('africa-network');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[94svh] flex flex-col justify-between overflow-hidden bg-black text-white select-none px-5 pt-20 pb-6">
      {/* ================= 1. ATMOSPHERIC BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={kcgAfricaRising}
          alt="KCG Africa Rising"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 mix-blend-screen scale-105"
        />
        {/* Soft Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Red Center Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C8102E]/15 rounded-full blur-[110px] pointer-events-none" />

      {/* ================= 2. SYSTEM INITIALIZATION TELEMETRY ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
        <span className="text-[8px] font-mono uppercase tracking-[0.35em] text-neutral-300 font-bold">
          KCG // SOVEREIGN INFRASTRUCTURE
        </span>
      </motion.div>

      {/* ================= 3. MONUMENTAL DECLARATION STACK ================= */}
      <div className="relative z-10 my-auto text-center space-y-4 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          <span className="block text-[9.5px] font-mono uppercase tracking-[0.4em] text-[#C8102E] font-black">
            L'INFRASTRUCTURE DIGITALE & INDUSTRIELLE
          </span>

          <h1
            className="font-display font-medium uppercase tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(2.2rem, 10vw, 4rem)' }}
          >
            <span className="block font-light text-neutral-300">BÃ¢tissons</span>
            <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E]">
              L'Afrique
            </span>
            <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] via-red-400 to-white italic">
              De Demain,
            </span>
            <span className="block font-light text-white text-2xl tracking-widest mt-1">
              ENSEMBLE.
            </span>
          </h1>
        </motion.div>

        {/* Crisp Sovereign Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto px-1"
        >
          KOFFMANN CAPITAL GROUP orchestre la fusion du capital stratÃ©gique, de la logistique d'approvisionnement et de l'intelligence algorithmique depuis son siÃ¨ge mondial Ã  Abidjan.
        </motion.p>

        {/* Strategic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto"
        >
          <button
            onClick={handleExploreClick}
            className="w-full py-3.5 px-6 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 active:scale-95 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white"
          >
            <span className="whitespace-nowrap">Explorer le RÃ©seau</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={() => {
              if (!isPlayerVisible) {
                playLetter(LETTERS[0]);
              } else {
                usePodcastStore.getState().setIsExpanded(true);
              }
            }}
            className="w-full py-3 px-6 rounded-full bg-white/[0.03] border border-white/10 text-white font-mono text-[9.5px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/5"
          >
            <Radio className="w-3.5 h-3.5 text-[#C8102E] animate-pulse" />
            <span>Radio StratÃ©gique KCG</span>
          </button>
        </motion.div>
      </div>

      {/* ================= 4. BOTTOM TELEMETRY RIBBON ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 w-full pt-3 border-t border-white/5 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/5 text-[8px] font-mono text-neutral-400 tracking-wider">
          <Activity className="w-3 h-3 text-[#C8102E] animate-pulse shrink-0" />
          <span className="truncate">{telemetryLogs[telemetryIndex]}</span>
        </div>

        <button
          onClick={handleExploreClick}
          aria-label="Faire dÃ©filer"
          className="text-neutral-600 hover:text-white transition-colors p-0.5"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
