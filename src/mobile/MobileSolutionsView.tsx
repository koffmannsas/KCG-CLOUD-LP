import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  Sparkles,
  Layers,
  Workflow,
  ArrowRight,
  ArrowUpRight,
  Server,
  Database,
  Zap,
  Lock,
  Code2,
  Activity,
  CheckCircle2,
  X,
  Compass,
  Flame,
  TrendingUp,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import ProductLaunchModal from '../components/ProductLaunchModal';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';
// @ts-ignore
import kcgBoardroom from '@/src/assets/images/kcg_boardroom_1780425890075.png';

interface CapabilityItem {
  id: string;
  title: string;
  short: string;
  icon: any;
  desc: string;
  bullets: string[];
}

export default function MobileSolutionsView() {
  const { setActiveTab } = useMobileOSStore();
  const [selectedLaunchProduct, setSelectedLaunchProduct] = useState<'fiko-one' | 'fiko-connect' | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [activeEngineStep, setActiveEngineStep] = useState<number>(0);

  // ================= HERO SLIDER STATE =================
  const [slideIndex, setSlideIndex] = useState(0);
  const dragX = useMotionValue(0);

  const SLIDES = [
    {
      id: 'solutions',
      tag: 'KCG ARCHITECTURE',
      title: (
        <>
          NOS <br />
          <span className="text-[#CF1A26]">SOLUTIONS.</span>
        </>
      ),
      bgImage: kcgAfricaRising,
      gradient: 'from-black/80 via-black/90 to-black'
    },
    {
      id: 'infrastructure',
      tag: 'SOUVERAINETÃ‰',
      title: (
        <>
          NOUS CONSTRUISONS <br />
          <span className="text-[#CF1A26]">L'INFRASTRUCTURE.</span>
        </>
      ),
      bgImage: kcgBoardroom,
      gradient: 'from-black/75 via-black/85 to-black'
    },
    {
      id: 'engine',
      tag: 'METHODOLOGIE',
      title: (
        <>
          FROM PROBLEM <br />
          <span className="text-white">TO INFRASTRUCTURE.</span>
        </>
      ),
      bgImage: kcgAfricaRising,
      gradient: 'from-black/80 via-black/90 to-black'
    },
    {
      id: 'scale',
      tag: 'PERFORMANCE',
      title: (
        <>
          BUILT <br />
          <span className="text-[#CF1A26]">FOR SCALE.</span>
        </>
      ),
      bgImage: kcgBoardroom,
      gradient: 'from-black/75 via-black/85 to-black'
    }
  ];

  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    kcgSound.playTactileClick();
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    kcgSound.playTactileClick();
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  // ================= CAPABILITIES DATA =================
  const CAPABILITIES: CapabilityItem[] = [
    {
      id: 'infra',
      title: 'DIGITAL INFRASTRUCTURE',
      short: 'INFRASTRUCTURE',
      icon: Server,
      desc: 'RÃ©seaux distribuÃ©s, hÃ©bergement souverain et clusters haute disponibilitÃ© Ã  latence ultra-faible.',
      bullets: ['Clusters haute disponibilitÃ©', 'HÃ©bergement souverain', 'Architecture distribuÃ©e']
    },
    {
      id: 'ai',
      title: 'AI INTELLIGENCE',
      short: 'INTELLIGENCE IA',
      icon: Sparkles,
      desc: 'ModÃ¨les cognitifs verticaux, raisonnement contextualisÃ© et automatisation neuronale adaptÃ©e au continent.',
      bullets: ['ModÃ¨les de langage verticaux', 'Raisonnement contextualisÃ©', 'Automatisation cognitive']
    },
    {
      id: 'data',
      title: 'DATA & PIPELINES',
      short: 'DONNÃ‰ES & FLUX',
      icon: Database,
      desc: 'Pipelines temps rÃ©el et extraction de signaux Ã©conomiques prÃ©dictifs sur donnÃ©es souveraines.',
      bullets: ['Pipelines temps rÃ©el', 'Data lakes souverains', 'Analytique prÃ©dictive']
    },
    {
      id: 'platforms',
      title: 'PLATFORMS & APPS',
      short: 'PLATEFORMES',
      icon: Layers,
      desc: 'Applications multiservices et super apps conÃ§ues pour des dizaines de millions d\'utilisateurs.',
      bullets: ['Super Apps multiservices', 'ExpÃ©rience mobile native', 'Haute rÃ©silience']
    },
    {
      id: 'payments',
      title: 'PAYMENTS & RAILS',
      short: 'PAIEMENTS & RAILS',
      icon: Zap,
      desc: 'Passerelles de paiement instantanÃ© unifiant Mobile Money, cartes et protocoles souverains.',
      bullets: ['AgrÃ©gation Mobile Money', 'RÃ¨glement instantanÃ©', 'ConformitÃ© bancaire']
    },
    {
      id: 'automation',
      title: 'AUTOMATION & WORKFLOWS',
      short: 'AUTOMATISATION',
      icon: Workflow,
      desc: 'Orchestration autonome des processus critiques d\'entreprises sans rupture humaine.',
      bullets: ['Workflows intelligents', 'IntÃ©gration d\'API', 'Traitement temps rÃ©el']
    },
    {
      id: 'security',
      title: 'SECURITY & CIPHER',
      short: 'SÃ‰CURITÃ‰ & CHIFFREMENT',
      icon: Lock,
      desc: 'Chiffrement post-quantique et conformitÃ© rigoureuse garantissant l\'inviolabilitÃ© des donnÃ©es.',
      bullets: ['Chiffrement post-quantique', 'SouverainetÃ© des donnÃ©es', 'Audits continus']
    },
    {
      id: 'api',
      title: 'API & PROTOCOLS',
      short: 'APIs & PROTOCOLES',
      icon: Code2,
      desc: 'Interfaces institutionnelles hautement sÃ©curisÃ©es pour l\'interconnexion inter-systÃ¨mes.',
      bullets: ['APIs haute vÃ©locitÃ©', 'Protocoles souverains', 'Documentation certifiÃ©e']
    }
  ];

  // ================= ENGINE STEPS =================
  const ENGINE_STEPS = [
    { num: '01', title: 'DISCOVER', desc: 'Identification des anomalies Ã©conomiques et des frictions de marchÃ© non rÃ©solues.' },
    { num: '02', title: 'ARCHITECT', desc: 'Conception de l\'architecture souveraine, des modÃ¨les de donnÃ©es et de la sÃ©curitÃ©.' },
    { num: '03', title: 'BUILD', desc: 'DÃ©veloppement full-stack propriÃ©taire, moteurs d\'IA et clusters haute performance.' },
    { num: '04', title: 'INTEGRATE', desc: 'Liaison directe avec les rÃ©seaux bancaires, tÃ©lÃ©coms et systÃ¨mes partenaires.' },
    { num: '05', title: 'DEPLOY', desc: 'Mise en production sur nos nÅ“uds distribuÃ©s dans les mÃ©tropoles africaines.' },
    { num: '06', title: 'SCALE', desc: 'Absorption des volumes transactionnels massifs et rÃ©silience continentale.' }
  ];

  // ================= STRATEGIC DOMAINS =================
  const STRATEGIC_DOMAINS = [
    { code: '01 // DDD', name: 'DIVERTISSEMENT DIVERSIFIÃ‰', icon: Flame, desc: 'Architectures multimÃ©dias et diffusion souveraine de contenus.' },
    { code: '02 // DPI', name: 'PRODUITS D\'INVESTISSEMENT', icon: TrendingUp, desc: 'IngÃ©nierie financiÃ¨re et corridors de capitaux institutionnels.' },
    { code: '03 // DRN', name: 'RESSOURCES NATURELLES', icon: Compass, desc: 'TraÃ§abilitÃ© et transformation locale des mÃ©taux et Ã©nergies stratÃ©giques.' },
    { code: '04 // DMS', name: 'MULTI-SERVICES', icon: Building2, desc: 'Plateformes connectÃ©es rÃ©pondant aux besoins essentiels du quotidien.' },
    { code: '05 // DFC', name: 'FONDATION DE CHARITÃ‰', icon: HeartHandshake, desc: 'Programmes d\'impact, bourses et formation d\'ingÃ©nieurs d\'Ã©lite.' }
  ];

  return (
    <div className="w-full bg-[#000000] text-white select-none px-4 pt-16 pb-36 flex flex-col justify-start overflow-x-hidden text-left relative space-y-10">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#CF1A26]/15 rounded-full blur-[140px]" />
      </div>

      {/* ================= 1. MOBILE HERO SLIDER (TOUCH & CLEAN) ================= */}
      <div className="relative z-10 w-full pt-1">
        <div className="relative w-full aspect-[4/3.8] max-h-[380px] rounded-[28px] overflow-hidden border border-white/[0.12] bg-[#0c0c0f] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={SLIDES[slideIndex].id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 cursor-grab active:cursor-grabbing"
            >
              {/* Background Image & Tone */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={SLIDES[slideIndex].bgImage}
                  alt="Hero Atmosphere"
                  className="w-full h-full object-cover object-center opacity-30 mix-blend-screen"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${SLIDES[slideIndex].gradient}`} />
              </div>

              {/* Slide Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF1A26] animate-pulse" />
                  <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold">
                    {SLIDES[slideIndex].tag}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-neutral-400 font-bold">
                  0{slideIndex + 1} / 0{totalSlides}
                </span>
              </div>

              {/* Slide Main Monumental Headline */}
              <div className="relative z-10 space-y-2">
                <h1 className="text-3xl sm:text-4xl font-display font-black uppercase text-white leading-tight tracking-tight">
                  {SLIDES[slideIndex].title}
                </h1>
              </div>

              {/* Slide Bottom Action Row */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  SWIPE POUR DÃ‰COUVRIR
                </span>

                {/* Dots Indicator */}
                <div className="flex gap-1.5">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        slideIndex === idx ? 'w-5 bg-[#CF1A26]' : 'w-1 bg-white/20'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= 2. CAPACITÃ‰S TECHNOLOGIQUES (2-COLUMN GRID) ================= */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
              01 // CAPACITÃ‰S MAÃŽTRISÃ‰ES
            </span>
          </div>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            NOS CAPACITÃ‰S
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <button
                key={cap.id}
                onClick={() => {
                  kcgSound.playTactileClick();
                  setSelectedCapability(cap);
                }}
                className="p-4 rounded-2xl bg-[#0e0e12] border border-white/[0.08] active:border-[#CF1A26]/50 active:bg-white/[0.04] transition-all flex flex-col justify-between min-h-[115px] text-left cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CF1A26]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10.5px] font-display font-bold uppercase tracking-tight text-white block">
                    {cap.short}
                  </span>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase block mt-0.5">
                    DÃ‰COUVRIR â†’
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 3. THREE FLAGSHIP PLATFORMS ================= */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold">
              02 // PRODUITS PHARES
            </span>
          </div>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            3 PLATEFORMES. 1 Ã‰COSYSTÃˆME.
          </h2>
        </div>

        {/* CARD 1: KRYPTON AI */}
        <div className="p-5 rounded-[24px] bg-gradient-to-b from-[#14080a] to-[#0a0a0d] border border-[#CF1A26]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest">
              01 // INTELLIGENCE BUSINESS
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#CF1A26]/15 border border-[#CF1A26]/30 flex items-center justify-center text-[#CF1A26]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
              KRYPTON AI
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              L'intelligence qui connecte les donnÃ©es, les clients et les opÃ©rations pour automatiser l'exÃ©cution.
            </p>
          </div>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              setActiveTab('ai');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-transform"
          >
            <span>EXPLORER KRYPTON AI</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* CARD 2: FIKO ONE */}
        <div className="p-5 rounded-[24px] bg-gradient-to-b from-[#11080a] to-[#0a0a0d] border border-white/15 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold tracking-widest">
              02 // MULTISERVICE ON-DEMAND
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
              FIKO ONE
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Plateforme souveraine de mise en relation connectant prestataires et demandeurs de services.
            </p>
          </div>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              setSelectedLaunchProduct('fiko-one');
            }}
            className="w-full min-h-[52px] py-3.5 px-4 rounded-xl bg-[#CF1A26] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-transform"
          >
            <span>SOYEZ INFORMÃ‰ DU LANCEMENT</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* CARD 3: FIKO CONNECT */}
        <div className="p-5 rounded-[24px] bg-gradient-to-b from-[#08120c] to-[#0a0a0d] border border-white/15 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
              03 // COMMERCE CONVERSATIONNEL
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Workflow className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
              FIKO CONNECT
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Infrastructure transformant les conversations clients (WhatsApp) en opÃ©rations et opportunitÃ©s.
            </p>
          </div>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              setSelectedLaunchProduct('fiko-connect');
            }}
            className="w-full min-h-[52px] py-3.5 px-4 rounded-xl bg-[#CF1A26] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-transform"
          >
            <span>SOYEZ INFORMÃ‰ DU LANCEMENT</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ================= 4. KCG SOLUTION ENGINE ================= */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold">
              03 // PROCESSUS SYSTÃˆME
            </span>
          </div>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            KCG SOLUTION ENGINE
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d10] border border-white/10 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {ENGINE_STEPS.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => {
                  kcgSound.playTactileClick();
                  setActiveEngineStep(idx);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeEngineStep === idx
                    ? 'bg-[#CF1A26]/20 border-[#CF1A26] text-white'
                    : 'bg-black/40 border-white/5 text-neutral-400'
                }`}
              >
                <span className="text-[9px] font-mono block font-bold">{step.num}</span>
                <span className="text-[10px] font-display font-bold uppercase block truncate">{step.title}</span>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-[#CF1A26] font-bold uppercase">
                PHASE {ENGINE_STEPS[activeEngineStep].num}
              </span>
              <span className="text-xs font-display font-bold uppercase text-white">
                {ENGINE_STEPS[activeEngineStep].title}
              </span>
            </div>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {ENGINE_STEPS[activeEngineStep].desc}
            </p>
          </div>
        </div>
      </div>

      {/* ================= 5. LES 5 DOMAINES STRATÃ‰GIQUES ================= */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-1">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block">
            04 // DOMAINES STRATÃ‰GIQUES
          </span>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            5 SECTEURS D'EXPANSION
          </h2>
        </div>

        <div className="space-y-2.5">
          {STRATEGIC_DOMAINS.map((dom) => {
            const Icon = dom.icon;
            return (
              <div
                key={dom.code}
                className="p-4 rounded-2xl bg-[#0b0b0e] border border-white/[0.08] flex items-start gap-3.5 text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[#CF1A26]" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] font-mono text-[#CF1A26] font-bold tracking-widest">{dom.code}</span>
                  </div>
                  <h3 className="text-xs font-display font-bold uppercase text-white">{dom.name}</h3>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5">{dom.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 6. AFRICA-FIRST ENGINEERING ================= */}
      <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-b from-[#140608] to-[#08080a] border border-[#CF1A26]/30 space-y-3">
        <div className="space-y-1">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold block">
            INGÃ‰NIERIE CONTINENTALE
          </span>
          <h2 className="text-lg font-display font-black uppercase text-white tracking-tight">
            CONÃ‡U POUR L'AFRIQUE. PENSÃ‰ POUR LE MONDE.
          </h2>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            Technologies rÃ©silientes, tolÃ©rantes aux rÃ©seaux intermittents, connectÃ©es au Mobile Money et hautement scalables.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {['CONNECTIVITÃ‰', 'PAIEMENTS SOUVERAINS', 'SCALE MASSIF', 'INTELLIGENCE LOCALE'].map((p) => (
            <span key={p} className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono text-neutral-300 uppercase">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ================= 7. KCG CORE SUMMARY ================= */}
      <div className="relative z-10 p-5 rounded-2xl bg-[#0d0d10] border border-white/10 space-y-2 text-left">
        <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block">
          KCG CORE // INFRASTRUCTURE
        </span>
        <h3 className="text-sm font-display font-bold uppercase text-white">
          LE SYSTÃˆME NERVEUX DE L'Ã‰COSYSTÃˆME
        </h3>
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          KCG Core constitue la couche d'orchestration reliant donnÃ©es, identitÃ©s et intelligence de toutes nos plateformes.
        </p>
      </div>

      {/* ================= 8. MANIFESTO ================= */}
      <div className="relative z-10 py-6 px-5 rounded-2xl bg-black border border-white/15 text-center space-y-4 shadow-xl">
        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#CF1A26] font-bold block">
          MANIFESTE SOUVERAIN
        </span>
        <h2 className="text-lg font-display font-black uppercase text-white leading-tight">
          L'AFRIQUE N'A PAS BESOIN DE PLUS D'APPLICATIONS.
        </h2>
        <div className="w-10 h-0.5 bg-[#CF1A26] mx-auto" />
        <h3 className="text-base font-display font-extrabold uppercase text-neutral-300 leading-tight">
          ELLE A BESOIN DE NOUVELLES INFRASTRUCTURES.
        </h3>
        <p className="text-sm font-display font-black uppercase tracking-wider text-[#CF1A26]">
          KCG CONSTRUIT CELLES-CI.
        </p>
      </div>

      {/* ================= 9. FINAL CTA ================= */}
      <div className="relative z-10 p-6 rounded-2xl bg-gradient-to-b from-[#18080a] to-[#08080a] border border-[#CF1A26]/40 space-y-4 text-center">
        <div className="space-y-1">
          <span className="text-[8px] font-mono uppercase tracking-widest text-[#CF1A26] font-bold block">
            KOFFMANN CAPITAL GROUP
          </span>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            QUELLE CAPACITÃ‰ VOULEZ-VOUS CONSTRUIRE ?
          </h2>
        </div>

        <button
          onClick={() => {
            kcgSound.playTactileClick();
            setActiveTab('more');
          }}
          className="w-full py-3.5 px-4 rounded-xl bg-[#CF1A26] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl cursor-pointer"
        >
          <span>CONTACTER KCG</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* ================= 10. INSTITUTIONAL MOBILE FOOTER (RED BACKGROUND) ================= */}
      <div className="relative z-10 pt-4 -mx-4 px-5 py-8 bg-[#C8102E] text-white space-y-6">
        <div className="space-y-2 text-left">
          <div className="text-lg font-display font-black tracking-wider uppercase">
            KOFFMANN CAPITAL GROUP
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/90 font-medium">
            CAPITAL â€¢ TECHNOLOGIE â€¢ INTELLIGENCE â€¢ INFRASTRUCTURE
          </p>
        </div>

        {/* 4 Clean Navigation Sections with Vision & Horizon 2030 */}
        <div className="space-y-5 pt-2 border-t border-white/20 text-left">
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/70 font-bold block">
              01 // INSTITUTION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-display font-bold uppercase tracking-wider text-white">
              <span>Ã€ PROPOS DE KCG</span>
              <span>VISION & HORIZON 2030</span>
              <span>LEADERSHIP DU FONDATEUR</span>
              <span>KCG HOUSE (ABIDJAN)</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/70 font-bold block">
              02 // Ã‰COSYSTÃˆME & SOLUTIONS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-display font-bold uppercase tracking-wider text-white">
              <span>KRYPTON AI</span>
              <span>FIKO ONE</span>
              <span>FIKO CONNECT</span>
              <span>KCG CORE</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[8.5px] font-mono uppercase tracking-widest text-white/80">
          <span>Â© 2026 KOFFMANN CAPITAL GROUP</span>
          <span>ABIDJAN HQ</span>
        </div>
      </div>

      {/* ================= CAPABILITY DETAIL BOTTOM SHEET ================= */}
      <AnimatePresence>
        {selectedCapability && (
          <div className="fixed inset-0 z-[160] flex items-end justify-center select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCapability(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0e0e12] border-t border-white/20 rounded-t-[28px] p-6 text-white shadow-2xl z-10 text-left space-y-4"
              style={{
                paddingBottom: 'calc(80px + max(env(safe-area-inset-bottom, 0px), 16px))'
              }}
            >
              <div className="w-10 h-1 bg-white/25 rounded-full mx-auto -mt-2 mb-3" />

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#CF1A26] font-bold">
                    CAPACITÃ‰ SYSTÃˆME
                  </span>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    {selectedCapability.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCapability(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {selectedCapability.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                  LIVRABLES TECHNIQUES
                </span>
                <ul className="space-y-1.5">
                  {selectedCapability.bullets.map((b) => (
                    <li key={b} className="text-xs font-mono text-neutral-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CF1A26] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedCapability(null)}
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase tracking-widest mt-2 cursor-pointer"
              >
                FERMER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PRODUCT LAUNCH MODAL (FIKO ONE / FIKO CONNECT) ================= */}
      {selectedLaunchProduct && (
        <ProductLaunchModal
          isOpen={!!selectedLaunchProduct}
          onClose={() => setSelectedLaunchProduct(null)}
          product={selectedLaunchProduct}
          source="kcg-mobile-os"
        />
      )}

    </div>
  );
}
