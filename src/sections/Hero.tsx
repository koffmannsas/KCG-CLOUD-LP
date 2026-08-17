import { motion } from 'motion/react';
import { ArrowRight, Cpu, Network, Terminal, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';
// @ts-ignore
import kcgBoardroom from '@/src/assets/images/kcg_boardroom_1780425890075.png';

const HERO_SLIDES = [
  {
    id: 'africa',
    image: kcgAfricaRising,
    eyebrow: 'CONSEIL SOUVERAIN & RELATIONS INSTITUTIONNELLES',
    title: 'BÂTISSONS L’AFRIQUE',
    emphasis: 'DE DEMAIN, ENSEMBLE',
    description: 'Que vous soyez un investisseur institutionnel, un gouvernement, un leader d’écosystème, une startup technologique ou un talent d’exception, Koffmann Capital Group structure les infrastructures stratégiques de la prochaine génération.'
  },
  {
    id: 'boardroom',
    image: kcgBoardroom,
    eyebrow: 'CAPITAL • TECHNOLOGIE • INFRASTRUCTURE',
    title: 'STRUCTURONS LA',
    emphasis: 'PUISSANCE INSTITUTIONNELLE',
    description: 'Nous connectons capital, intelligence, technologie et infrastructures pour transformer les ambitions stratégiques en capacités durables.'
  },
  {
    id: 'sovereign',
    image: null,
    eyebrow: 'KCG SOVEREIGN INTELLIGENCE',
    title: 'L’AFRIQUE DE DEMAIN',
    emphasis: 'SE CONSTRUIT AUJOURD’HUI',
    description: 'Une architecture intégrée pour anticiper les mutations économiques, technologiques et industrielles du continent.'
  }
];

const taglineItems = [
  "AFRICAN SOVEREIGNTY", 
  "COGNITIVE CAPITAL", 
  "INFRASTRUCTURE ENGINE", 
  "VALUE SYNERGY", 
  "ALGORITHMIC DECISION"
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLog, setActiveLog] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Live telemetry logs simulating real-time operations
  const mockTelemetryLogs = [
    "[KCG-CORE] CONNECTION STABLE - SECURE CORRIDORS",
    "[FIKO-AI] COGNITIVE FLOW OPTIMIZING BUSINESSES",
    "[MAVO] REGIONAL ENTERTAINMENT DATA STREAM - ACTIVE",
    "[FIKO-PAY] CORE FINANCIAL TRANSACTIONS - NOMINAL",
    "[KCG-MINE] MINERAL SUPPLY TRACKER - PIPELINE SYNCED"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Rotate simulated logs
    const logInterval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % mockTelemetryLogs.length);
    }, 4000);

    const startSlider = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        if (!document.hidden) {
          setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }
      }, 7000);
    };

    startSlider();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (slideInterval.current) clearInterval(slideInterval.current);
      } else {
        startSlider();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(logInterval);
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent text-white select-none">
        
        {/* ================= CINEMATIC BACKGROUND SYSTEM ================= */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {HERO_SLIDES[activeSlide].image ? (
                <motion.img
                  src={HERO_SLIDES[activeSlide].image}
                  alt={HERO_SLIDES[activeSlide].title}
                  loading={activeSlide === 0 ? "eager" : "lazy"}
                  fetchPriority={activeSlide === 0 ? "high" : "auto"}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
                  style={{
                    transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`,
                    transition: 'transform 0.8s ease-out',
                  }}
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.06] }}
                  transition={{ duration: 10, ease: "linear", repeat: 0 }}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-transparent" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Glowing Ambient Vignettes (Black -> Transparent -> Black) */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-10" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#000000] to-transparent z-10" />
          <div className="absolute inset-0 bg-[#C8102E]/[0.02] mix-blend-overlay z-10 pointer-events-none" />
        </div>

        {/* Ambient Top Minimalist Line Accent */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-kcg-red/30 to-transparent z-10" />

        {/* ================= SCI-FI HUD GRAPHICS LAYER ================= */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          
          {/* Top-Left Scanning Coordinates */}
          <div className="absolute top-28 left-8 hidden lg:flex flex-col font-mono text-[9px] text-neutral-500 tracking-wider space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span>SYS_MONITOR: ACTIVE</span>
            </div>
            <div>LAT: { (4.53 + mousePos.y * 0.1).toFixed(4) }° N</div>
            <div>LON: { (-4.02 + mousePos.x * 0.15).toFixed(4) }° W</div>
            <div>ALT: 812.4m</div>
          </div>

          {/* Top-Right Telemetry Data */}
          <div className="absolute top-28 right-8 hidden lg:flex flex-col font-mono text-[9px] text-neutral-500 tracking-wider text-right space-y-1">
            <div>UTC TIME: {new Date().toISOString()}</div>
            <div>NETWORK STABILITY: 99.98%</div>
            <div className="text-kcg-red font-semibold uppercase tracking-widest">{mockTelemetryLogs[activeLog]}</div>
          </div>

          {/* Left Border Structural Bracket HUD */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-white/10 hidden lg:block">
            <div className="absolute top-0 left-0 w-2 h-[1px] bg-white/40" />
            <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-white/40" />
            <div className="absolute top-1/3 left-4 transform -rotate-90 origin-left text-[8px] font-mono tracking-[0.3em] text-neutral-600">
              KCG_CORE_MATRIX
            </div>
          </div>

          {/* Right Border Structural Bracket HUD */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-white/10 hidden lg:block">
            <div className="absolute top-0 right-0 w-2 h-[1px] bg-white/40" />
            <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-white/40" />
            <div className="absolute top-1/3 right-4 transform rotate-90 origin-right text-[8px] font-mono tracking-[0.3em] text-neutral-600 text-right">
              SOVEREIGN_SYSTEMS
            </div>
          </div>

          {/* Centered Cursor Interactive Reticle */}
          <div 
            className="absolute hidden md:block w-36 h-36 border border-white/[0.04] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 30}px))`,
              transition: 'transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)'
            }}
          >
            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 flex items-center justify-center">
              <div className="w-[1px] h-3 bg-kcg-red/25" />
              <div className="w-3 h-[1px] bg-kcg-red/25 absolute" />
            </div>
            {/* Outer dotted sweep */}
            <div className="absolute inset-2 border border-dashed border-kcg-red/10 rounded-full animate-[spin_40s_linear_infinite]" />
            {/* Circular radar sweep */}
            <div className="absolute inset-6 border border-white/[0.02] rounded-full" />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[7px] font-mono text-neutral-500">SCANNING...</span>
          </div>

        </div>

        {/* ================= HERO INTELLECTUAL CONTENT LAYER ================= */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto text-center space-y-8"
            >

              {/* Elegant Top Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.01] border border-white/10 text-[9px] uppercase tracking-[0.45em] text-neutral-300 mx-auto font-black backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-kcg-red shadow-[0_0_10px_#C8102E] animate-pulse" />
                {HERO_SLIDES[activeSlide].eyebrow}
              </div>

              {/* Main Premium Typography Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px] font-display font-medium tracking-tighter leading-[1.05] flex flex-col items-center text-white uppercase drop-shadow-[0_0_50px_rgba(200,16,46,0.1)]">
                  <span className="block font-black tracking-tight leading-none mb-1">
                    {HERO_SLIDES[activeSlide].title}
                  </span>
                  <span className="block text-gradient bg-gradient-to-r from-white via-kcg-red to-[#A50A1E] italic font-extrabold font-display">
                    {HERO_SLIDES[activeSlide].emphasis}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="max-w-[760px] mx-auto text-neutral-400 text-xs sm:text-sm md:text-base font-light leading-relaxed select-none px-6">
                {HERO_SLIDES[activeSlide].description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 z-20">
                <button
                  onClick={() => {
                    document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer px-9 py-4.5 rounded-full bg-white hover:bg-neutral-150 text-black font-bold text-[11px] tracking-widest uppercase transition-all flex items-center gap-3 border border-white shadow-[0_15px_30px_rgba(0,0,0,0.4)] group duration-500"
                >
                  Explorer l'écosystème
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 text-black" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= SLIDER CONTROLS ================= */}
        <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex items-center justify-center md:justify-between max-w-[1440px] mx-auto">
          {/* Progress Indicators */}
          <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest text-neutral-500 font-bold">
            <button onClick={() => { setActiveSlide(0); if(slideInterval.current) clearInterval(slideInterval.current); }} className={`transition-colors ${activeSlide === 0 ? 'text-white' : 'hover:text-neutral-300'}`}>01</button>
            <div className="w-12 md:w-24 h-[1px] bg-white/10 relative overflow-hidden">
              {activeSlide === 0 && (
                <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 7, ease: 'linear' }} className="absolute inset-0 bg-kcg-red" />
              )}
            </div>

            <button onClick={() => { setActiveSlide(1); if(slideInterval.current) clearInterval(slideInterval.current); }} className={`transition-colors ${activeSlide === 1 ? 'text-white' : 'hover:text-neutral-300'}`}>02</button>
            <div className="w-12 md:w-24 h-[1px] bg-white/10 relative overflow-hidden">
              {activeSlide === 1 && (
                <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 7, ease: 'linear' }} className="absolute inset-0 bg-kcg-red" />
              )}
            </div>

            <button onClick={() => { setActiveSlide(2); if(slideInterval.current) clearInterval(slideInterval.current); }} className={`transition-colors ${activeSlide === 2 ? 'text-white' : 'hover:text-neutral-300'}`}>03</button>
            <div className="w-12 md:w-24 h-[1px] bg-white/10 relative overflow-hidden">
              {activeSlide === 2 && (
                <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 7, ease: 'linear' }} className="absolute inset-0 bg-kcg-red" />
              )}
            </div>
          </div>
        </div>

        {/* ================= INFINITE TICKER ================= */}
        <div className="relative z-10 w-full overflow-hidden border-y border-white/5 py-4 tracking-widest bg-black/40 backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-20 px-10 items-center">
                {taglineItems.map((item) => (
                  <span key={item} className="text-[9px] font-mono tracking-[0.45em] text-neutral-500 font-bold uppercase flex items-center gap-3">
                    <span className="w-1 h-1 bg-kcg-red rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMMERSIVE INTELLECTUAL BANNER (AFRICA RISING) ================= */}
      <section className="relative w-full py-32 px-6 bg-[#020203] z-20 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
        
        {/* Glow Ambient Layer */}
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.02),transparent_65%)] pointer-events-none" 
        />
        
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Title Left */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="text-[9px] font-mono text-kcg-red uppercase tracking-widest font-black block">
              NOTRE STRATÉGIE INDUSTRIELLE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-display font-medium tracking-tighter uppercase leading-[1.0] text-white">
              Le destin technologique <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-red-400 font-bold italic font-display">du continent se forge ici.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#C8102E] mt-4" />
          </div>

          {/* Description Right */}
          <div className="md:col-span-7 text-left space-y-6">
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Matières critiques, structures de paiements autonomes, et liaisons logistiques paneuropéennes. Nous mettons en œuvre les architectures d'indépendance financière du futur.
            </p>
            <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
              En raffinant localement les gisements d'Afrique et en automatisant la prise de décision stratégique par l'IA, KOFFMANN CAPITAL GROUP transforme l'économie physique en un réseau cybernétique hautement efficient.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}
