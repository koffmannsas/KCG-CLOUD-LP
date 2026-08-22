import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Shield, Sparkles } from 'lucide-react';
import { kcgSound } from './soundEngine';

interface KCGSovereignIntroProps {
  onComplete: () => void;
  autoDurationMs?: number;
}

export default function KCGSovereignIntro({
  onComplete,
  autoDurationMs = 5000
}: KCGSovereignIntroProps) {
  const [phase, setPhase] = useState<'genesis' | 'convergence' | 'monogram' | 'orbit' | 'ready'>('genesis');
  const [isDismissing, setIsDismissing] = useState(false);
  const [isMuted, setIsMuted] = useState(kcgSound.getIsMuted());

  useEffect(() => {
    // Stage 1: Genesis quantum dots
    const t0 = setTimeout(() => {
      kcgSound.playSubPulse();
    }, 100);

    // Stage 2: Convergence
    const t1 = setTimeout(() => {
      setPhase('convergence');
      kcgSound.playSignalPing(330);
    }, 600);

    // Stage 3: Monogram Reveal
    const t2 = setTimeout(() => {
      setPhase('monogram');
      kcgSound.playSignalPing(520);
    }, 1200);

    // Stage 4: Orbit Formation & Satellites
    const t3 = setTimeout(() => {
      setPhase('orbit');
      kcgSound.playSignalPing(660);
    }, 1900);

    // Stage 5: Ready / Active
    const t4 = setTimeout(() => {
      setPhase('ready');
    }, 2800);

    // Auto dismiss if user waits
    const t5 = setTimeout(() => {
      handleEnter();
    }, autoDurationMs);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [autoDurationMs]);

  const handleEnter = () => {
    if (isDismissing) return;
    setIsDismissing(true);
    kcgSound.playActivationChime();

    try {
      sessionStorage.setItem('kcg_mobile_intro_viewed', 'true');
    } catch {}

    setTimeout(() => {
      onComplete();
    }, 750);
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = kcgSound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      kcgSound.playSignalPing(440);
    }
  };

  const satelliteTags = [
    { num: '01', label: 'INTELLIGENCE', angle: 0 },
    { num: '02', label: 'INFRASTRUCTURE', angle: 72 },
    { num: '03', label: 'CAPITAL', angle: 144 },
    { num: '04', label: 'NETWORK', angle: 216 },
    { num: '05', label: 'SOVEREIGNTY', angle: 288 }
  ];

  return (
    <AnimatePresence>
      {!isDismissing ? (
        <motion.div
          key="kcg-omega-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(16px)'
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-between py-8 px-6 select-none cursor-pointer overflow-hidden touch-none"
          style={{
            height: '100svh',
            paddingTop: 'calc(env(safe-area-inset-top, 16px) + 16px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 20px)'
          }}
        >
          {/* ================= 1. DEEP SPATIAL BACKGROUND ================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Deep Cosmic Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(207,26,38,0.09)_0%,rgba(5,5,5,0.95)_60%,#000000_100%)]" />

            {/* Micro Coordinate Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

            {/* Breathing Deep Red Core Aura */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: phase === 'ready' ? [1, 1.3, 1] : 0.8,
                opacity: phase === 'ready' ? [0.25, 0.45, 0.25] : 0.2
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#CF1A26]/20 blur-[100px]"
            />
          </div>

          {/* ================= 2. TOP HEADER STATUS / SOUND SWITCH ================= */}
          <div className="relative z-20 w-full flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#CF1A26] animate-ping" />
              <span className="text-[8px] font-mono uppercase tracking-[0.35em] text-neutral-300 font-bold">
                KCG // SYSTEM GENESIS
              </span>
            </motion.div>

            {/* Sound Toggle Button */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white active:scale-90 transition-transform cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#CF1A26]" />}
            </button>
          </div>

          {/* ================= 3. MIDGROUND & FOREGROUND ORBITAL CORE ================= */}
          <div className="relative flex items-center justify-center w-80 h-80 my-auto">
            {/* Step 1: Three Converging Quantum Signals */}
            {phase === 'genesis' && (
              <>
                <motion.div
                  initial={{ x: -70, y: -40, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeIn' }}
                  className="absolute w-2 h-2 rounded-full bg-[#CF1A26] shadow-[0_0_15px_#CF1A26]"
                />
                <motion.div
                  initial={{ x: 70, y: -40, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeIn' }}
                  className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_15px_white]"
                />
                <motion.div
                  initial={{ x: 0, y: 60, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeIn' }}
                  className="absolute w-2 h-2 rounded-full bg-[#CF1A26] shadow-[0_0_15px_#CF1A26]"
                />
              </>
            )}

            {/* Step 2: Concentric Radar Shockwaves */}
            {(phase === 'convergence' || phase === 'monogram' || phase === 'orbit' || phase === 'ready') && (
              <>
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-[#CF1A26]/40 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1.25, opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"
                />
              </>
            )}

            {/* Step 3: Faint Spatial Satellite Points Orbiting */}
            {(phase === 'orbit' || phase === 'ready') && (
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 0.8 },
                  rotate: { duration: 32, repeat: Infinity, ease: 'linear' }
                }}
                className="absolute inset-0 pointer-events-none"
              >
                {satelliteTags.map((sat, i) => {
                  const rad = (sat.angle * Math.PI) / 180;
                  const x = 140 * Math.cos(rad);
                  const y = 140 * Math.sin(rad);
                  return (
                    <div
                      key={i}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#CF1A26]" />
                      <span className="text-[6.5px] font-mono tracking-widest text-neutral-400">
                        {sat.num} {sat.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Step 4: The Monumental Circular SVG Typography Orbit */}
            {(phase === 'orbit' || phase === 'ready') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 26, repeat: Infinity, ease: 'linear' }
                }}
                className="absolute inset-0 z-10 w-full h-full pointer-events-none"
              >
                <svg viewBox="0 0 280 280" className="w-full h-full">
                  <defs>
                    <path
                      id="kcgOmegaCirclePath"
                      d="M 140, 140 m -108, 0 a 108,108 0 1,1 216,0 a 108,108 0 1,1 -216,0"
                      fill="none"
                    />
                  </defs>

                  {/* High-Precision Orbital Guides */}
                  <circle
                    cx="140"
                    cy="140"
                    r="108"
                    fill="none"
                    stroke="rgba(207,26,38,0.25)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="116"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.75"
                  />

                  {/* Circular Orbiting Typography */}
                  <text className="text-[12.5px] uppercase tracking-[0.24em] font-sans fill-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                    <textPath href="#kcgOmegaCirclePath" startOffset="0%">
                      KOFFMANN CAPITAL GROUP â€¢ KOFFMANN CAPITAL GROUP â€¢&nbsp;
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            )}

            {/* Step 5: Central Sovereign Capsule with Official KCG Monogram */}
            {(phase === 'monogram' || phase === 'orbit' || phase === 'ready') && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-32 h-32 rounded-full bg-black/95 border border-[#CF1A26]/50 shadow-[0_0_40px_rgba(207,26,38,0.4)] flex items-center justify-center overflow-hidden backdrop-blur-xl"
              >
                {/* Micro Carbon Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1] pointer-events-none" />

                {/* Inner Ring */}
                <div className="absolute inset-1.5 rounded-full border border-white/10" />

                {/* Official Monogram */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/krypton-ai-490214.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0c252df9-95d7-4ef8-abb1-03d509a84403"
                  alt="KCG Sovereign Monogram"
                  className="w-16 h-16 object-contain relative z-10 brightness-115 drop-shadow-[0_0_16px_rgba(207,26,38,0.6)]"
                />
              </motion.div>
            )}
          </div>

          {/* ================= 4. BOTTOM ACTIVATE KCG INTERACTION ================= */}
          <div className="relative z-20 w-full flex flex-col items-center gap-4 text-center">
            {/* System Status Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-1"
            >
              <span className="text-[8.5px] font-mono uppercase tracking-[0.45em] text-[#CF1A26] font-black block">
                KCG SOVEREIGN PROXIED
              </span>
              <span className="text-[7.5px] font-mono text-neutral-500 tracking-widest block">
                HQ ABIDJAN // LATENCE : 0.004 MS
              </span>
            </motion.div>

            {/* Glowing Energy Beam Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full max-w-xs relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-white/[0.04] via-[#CF1A26]/20 to-white/[0.04] border border-[#CF1A26]/50 hover:border-[#CF1A26] text-white flex items-center justify-between active:scale-95 transition-all shadow-[0_0_25px_rgba(207,26,38,0.25)] relative overflow-hidden group cursor-pointer"
              >
                {/* Sweeping Energy Line */}
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#CF1A26]/60 to-transparent pointer-events-none"
                />

                <span className="text-[9.5px] font-mono uppercase tracking-[0.28em] font-bold text-white relative z-10">
                  ACTIVER LE SYSTÃˆME KCG
                </span>

                <div className="w-6 h-6 rounded-full bg-[#CF1A26] flex items-center justify-center text-white relative z-10 shadow-[0_0_10px_#CF1A26]">
                  <span className="text-xs font-bold leading-none">â†’</span>
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
