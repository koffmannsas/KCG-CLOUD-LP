import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { kcgSound } from './soundEngine';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';
// @ts-ignore
import kcgBoardroom from '@/src/assets/images/kcg_boardroom_1780425890075.png';

interface HeroSlide {
  id: string;
  title: React.ReactNode;
  bgType: 'kcg' | 'krypton' | 'fiko-one' | 'fiko-connect' | 'core' | 'radio';
}

export default function KCGSovereignHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastInteractionTime = useRef<number>(Date.now());
  const dragX = useMotionValue(0);

  const SLIDES: HeroSlide[] = [
    // 01 - KCG
    {
      id: 'kcg',
      title: (
        <>
          BÃ‚TIR. <br />
          CONNECTER. <br />
          <span className="text-[#CF1A26]">TRANSFORMER.</span>
        </>
      ),
      bgType: 'kcg'
    },
    // 02 - KRYPTON AI
    {
      id: 'krypton',
      title: (
        <>
          L'INTELLIGENCE <br />
          <span className="text-[#CF1A26]">PREND LE RELAIS.</span>
        </>
      ),
      bgType: 'krypton'
    },
    // 03 - FIKO ONE
    {
      id: 'fiko-one',
      title: (
        <>
          FIKO ONE. <br />
          <span className="text-white">LA SUPER APP UNIFIÃ‰E.</span>
        </>
      ),
      bgType: 'fiko-one'
    },
    // 04 - FIKO CONNECT
    {
      id: 'fiko-connect',
      title: (
        <>
          FIKO CONNECT. <br />
          <span className="text-[#CF1A26]">COMMERCE WHATSAPP IA.</span>
        </>
      ),
      bgType: 'fiko-connect'
    },
    // 05 - KCG CORE
    {
      id: 'core',
      title: (
        <>
          KCG CORE. <br />
          <span className="text-white">LE SYSTÃˆME NERVEUX.</span>
        </>
      ),
      bgType: 'core'
    },
    // 06 - KCG RADIO
    {
      id: 'radio',
      title: (
        <>
          KCG RADIO. <br />
          <span className="text-[#CF1A26]">L'INTELLIGENCE EN CONTINU.</span>
        </>
      ),
      bgType: 'radio'
    }
  ];

  const totalSlides = SLIDES.length;

  const goToNextSlide = useCallback(() => {
    kcgSound.playTactileClick();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    kcgSound.playTactileClick();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Autoplay Loop (7 seconds per slide, slow, luxurious, pause on interaction)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const intervalTime = 50; // ms ticks
    const step = 100 / (7000 / intervalTime);

    const timer = setInterval(() => {
      if (!isPaused && Date.now() - lastInteractionTime.current > 2000) {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNextSlide();
            return 0;
          }
          return prev + step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, goToNextSlide]);

  const handleDragEnd = (_: any, info: any) => {
    const offsetThreshold = 40;
    const velocityThreshold = 350;

    if (info.offset.x < -offsetThreshold || info.velocity.x < -velocityThreshold) {
      goToNextSlide();
    } else if (info.offset.x > offsetThreshold || info.velocity.x > velocityThreshold) {
      goToPrevSlide();
    }
    setIsPaused(false);
    lastInteractionTime.current = Date.now();
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      className="relative w-full h-[64svh] max-h-[560px] min-h-[440px] rounded-3xl bg-black overflow-hidden select-none flex flex-col justify-end p-6 sm:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="KCG Sovereign Hero Slider"
    >
      {/* ================= 1. CINEMATIC FULL-BLEED BACKGROUND SCENES ================= */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => {
          setIsPaused(true);
          lastInteractionTime.current = Date.now();
        }}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        className="absolute inset-0 z-0 touch-pan-y cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          {/* SLIDE 01: KCG SOUVERAIN (BOARDROOM & ARCHITECTURE) */}
          {currentSlide.bgType === 'kcg' && (
            <motion.div
              key="bg-kcg"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={kcgBoardroom}
                alt="KCG Sovereign"
                className="w-full h-full object-cover object-center opacity-45 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </motion.div>
          )}

          {/* SLIDE 02: KRYPTON AI */}
          {currentSlide.bgType === 'krypton' && (
            <motion.div
              key="bg-krypton"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CF1A26]/30 via-black to-black" />
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-72 h-72 rounded-full border border-dashed border-[#CF1A26]/40 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-44 h-44 rounded-full border border-white/10" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}

          {/* SLIDE 03: FIKO ONE */}
          {currentSlide.bgType === 'fiko-one' && (
            <motion.div
              key="bg-fiko-one"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={kcgAfricaRising}
                alt="FIKO ONE Ecosystem"
                className="w-full h-full object-cover object-center opacity-45 mix-blend-screen scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}

          {/* SLIDE 04: FIKO CONNECT */}
          {currentSlide.bgType === 'fiko-connect' && (
            <motion.div
              key="bg-fiko-connect"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#06180e] via-black to-[#140608]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}

          {/* SLIDE 05: KCG CORE */}
          {currentSlide.bgType === 'core' && (
            <motion.div
              key="bg-core"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c080d] via-black to-black opacity-95" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}

          {/* SLIDE 06: KCG RADIO */}
          {currentSlide.bgType === 'radio' && (
            <motion.div
              key="bg-radio"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a080d] via-black to-black" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-64 h-64 rounded-full border border-[#CF1A26]/30 animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soft Dark Gradient Vignette for pure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </motion.div>

      {/* ================= 2. GRAND TITRE MONUMENTAL (PURE CINEMA) ================= */}
      <div className="relative z-10 space-y-4 mb-4 pointer-events-none max-w-[90%]">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.6rem] sm:text-[3.4rem] font-display font-black uppercase text-white tracking-tight leading-[0.98]"
          >
            {currentSlide.title}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* ================= 3. MICRO PAGINATION DISCRÃˆTE ================= */}
      <div className="relative z-10 flex items-center gap-1.5 pt-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              kcgSound.playTactileClick();
              setCurrentIndex(i);
              setProgress(0);
            }}
            aria-label={`Slide ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300 cursor-pointer overflow-hidden relative"
            style={{
              width: i === currentIndex ? '28px' : '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            {i === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-[#CF1A26]"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
