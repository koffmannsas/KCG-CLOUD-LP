import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Database,
  Users,
  Briefcase,
  TrendingUp,
  Brain,
  MessageSquare,
  Activity,
  CheckCircle2,
  RefreshCw,
  Compass,
  FileText,
  Lock
} from 'lucide-react';

export type IntelligenceLoopStep = 'observe' | 'comprend' | 'decide' | 'agit' | 'apprend';

export interface LoopStepData {
  id: IntelligenceLoopStep;
  num: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  focus: string;
}

export const STRATEGIC_LOOP_STEPS: LoopStepData[] = [
  {
    id: 'observe',
    num: '01',
    name: 'OBSERVE',
    shortDesc: 'Krypton comprend lâ€™activitÃ© globale de lâ€™entreprise.',
    fullDesc: 'AgrÃ©gation continue des flux de donnÃ©es, signaux marchÃ©s, interactions clients et activitÃ©s opÃ©rationnelles sans perturber le travail des Ã©quipes.',
    focus: 'Flux de donnÃ©es & signaux d\'activitÃ©'
  },
  {
    id: 'comprend',
    num: '02',
    name: 'COMPREND',
    shortDesc: 'Krypton analyse le contexte, les dynamiques et les donnÃ©es.',
    fullDesc: 'Extraction du sens mÃ©tier, modÃ©lisation Customer 360 et contextualisation des enjeux spÃ©cifiques Ã  l\'Ã©cosystÃ¨me de l\'entreprise.',
    focus: 'ModÃ©lisation de contexte & Customer 360'
  },
  {
    id: 'decide',
    num: '03',
    name: 'DÃ‰CIDE',
    shortDesc: 'Krypton aide Ã  identifier et prioriser les meilleures actions.',
    fullDesc: 'Ã‰valuation des scÃ©narios, arbitrage prÃ©dictif et recommandations actionnables pour soutenir la direction et les gestionnaires.',
    focus: 'Arbitrage & Recommandations stratÃ©giques'
  },
  {
    id: 'agit',
    num: '04',
    name: 'AGIT',
    shortDesc: 'Krypton accompagne ou automatise lâ€™exÃ©cution opÃ©rationnelle.',
    fullDesc: 'DÃ©clenchement des playbooks, orchestration des processus et synchronisation des communications en temps rÃ©el.',
    focus: 'Workflows & Orchestration opÃ©rationnelle'
  },
  {
    id: 'apprend',
    num: '05',
    name: 'APPREND',
    shortDesc: 'Le systÃ¨me enrichit progressivement sa comprÃ©hension.',
    fullDesc: 'MÃ©morisation contextuelle (Business Memory) et affinement continuel des schÃ©mas d\'exÃ©cution pour maximiser la pertinence dans la durÃ©e.',
    focus: 'Business Memory & Apprentissage continu'
  }
];

export const KRYPTON_FIVE_PILLARS = [
  {
    num: '01',
    title: 'ACQUÃ‰RIR',
    summary: 'Transformer les donnÃ©es et les canaux digitaux en opportunitÃ©s commerciales.',
    icon: Compass,
    concepts: ['Capture de signaux', 'Qualification', 'GÃ©nÃ©ration d\'opportunitÃ©s']
  },
  {
    num: '02',
    title: 'CONVERSER',
    summary: 'Transformer les interactions avec les prospects et clients en opportunitÃ©s intelligentes.',
    icon: MessageSquare,
    concepts: ['PrÃ©sence intelligente', 'Qualification contextuelle', 'Dialogue naturel']
  },
  {
    num: '03',
    title: 'COMPRENDRE',
    summary: 'Transformer les donnÃ©es de l\'entreprise en comprÃ©hension exploitable.',
    icon: Brain,
    concepts: ['Customer 360', 'Business Memory', 'Market Intelligence']
  },
  {
    num: '04',
    title: 'AGIR',
    summary: 'Automatiser et orchestrer les processus opÃ©rationnels.',
    icon: Zap,
    concepts: ['Workflows opÃ©rationnels', 'Playbooks mÃ©tier', 'ExÃ©cution synchronisÃ©e']
  },
  {
    num: '05',
    title: 'DÃ‰CIDER',
    summary: 'Aider les dirigeants et les Ã©quipes Ã  prendre de meilleures dÃ©cisions grÃ¢ce Ã  l\'intelligence business.',
    icon: TrendingUp,
    concepts: ['Executive Intelligence', 'Indicateurs clÃ©s', 'Recommandations prÃ©dictives']
  }
];

export default function Intelligence() {
  const [activeStepId, setActiveStepId] = useState<IntelligenceLoopStep>('observe');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance loop every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepId((current) => {
        const order: IntelligenceLoopStep[] = ['observe', 'comprend', 'decide', 'agit', 'apprend'];
        const nextIdx = (order.indexOf(current) + 1) % order.length;
        return order[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStep = STRATEGIC_LOOP_STEPS.find((s) => s.id === activeStepId) || STRATEGIC_LOOP_STEPS[0];

  return (
    <section
      id="intelligence"
      className="py-32 bg-[#020203] text-white relative overflow-hidden select-none font-sans border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-kcg-red/[0.04] rounded-full blur-[240px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-28">

        {/* ================= 1. HERO SECTION: KRYPTON AI POSITIONING ================= */}
        <div className="grid lg:grid-cols-12 gap-12 items-end">

          <div className="lg:col-span-8 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 border border-kcg-red/30 rounded-full bg-kcg-red/[0.04]"
            >
              <span className="w-2 h-2 rounded-full bg-kcg-red animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-kcg-red font-black">
                KRYPTON AI â€¢ COUCHE D'INTELLIGENCE OPÃ‰RATIONNELLE
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight uppercase leading-[0.96]">
              L'INTELLIGENCE <br />
              <span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-kcg-red">
                OPÃ‰RATIONNELLE DES ENTREPRISES.
              </span>
            </h2>

            <div className="w-16 h-[2.5px] bg-kcg-red" />

            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              Krypton AI est une plateforme d'intelligence business qui connecte les donnÃ©es, les clients, les Ã©quipes et les opÃ©rations d'une entreprise afin d'automatiser l'exÃ©cution, amÃ©liorer les dÃ©cisions et accÃ©lÃ©rer la croissance.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-left w-full max-w-md">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                PROMESSE COMMERCIALE
              </span>
              <p className="text-sm font-display font-extrabold uppercase text-white tracking-tight leading-snug">
                L'intelligence qui fait avancer votre entreprise.
              </p>
            </div>

            <a
              href="#contact"
              className="py-4 px-8 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98] cursor-pointer"
            >
              <span>EXPLORER KRYPTON AI</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>


        {/* ================= 2. THE CENTRAL CONCEPT: THE 5-STEP STRATEGIC LOOP ================= */}
        <div
          className="p-8 lg:p-14 rounded-[32px] bg-[#050507] border border-white/10 shadow-2xl relative overflow-hidden space-y-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-kcg-red/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Loop Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-kcg-red animate-[spin_12s_linear_infinite]" />
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-kcg-red font-bold">
                  BOUCLE STRATÃ‰GIQUE INFINIE
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white">
                Comment fonctionne Krypton AI
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>CYCLE COGNITIF EN CONTINU</span>
            </div>
          </div>

          {/* 5-Step Visual Loop Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {STRATEGIC_LOOP_STEPS.map((step, idx) => {
              const isSelected = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepId(step.id);
                    setIsAutoPlaying(false);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? 'bg-[#111116] border-kcg-red shadow-[0_0_25px_rgba(207,26,38,0.25)]'
                      : 'bg-[#09090c] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Top indicator */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black ${isSelected ? 'text-kcg-red' : 'text-neutral-500'}`}>
                      {step.num}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-kcg-red animate-pulse" />
                    )}
                  </div>

                  {/* Title & Short description */}
                  <div className="space-y-1">
                    <h4 className={`text-base font-display font-extrabold uppercase tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug line-clamp-2">
                      {step.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Focus Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 rounded-2xl bg-[#09090d] border border-white/10 grid md:grid-cols-12 gap-6 items-center text-left"
            >
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-kcg-red">
                    PHASE {currentStep.num} // {currentStep.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    {currentStep.focus}
                  </span>
                </div>
                <p className="text-sm md:text-base text-neutral-200 font-light leading-relaxed">
                  {currentStep.fullDesc}
                </p>
              </div>

              <div className="md:col-span-4 flex items-center justify-end">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 w-full text-left">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                    ENTITÃ‰ COGNITIVE
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    PilotÃ© par <strong className="text-white font-medium">Fiko</strong>, l'interface et la prÃ©sence business intelligente de Krypton AI.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>


        {/* ================= 3. THE 5 CORE CAPABILITIES ================= */}
        <div className="space-y-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-2 text-left">
              <span className="text-[9px] font-mono text-kcg-red uppercase tracking-widest font-black block">
                CAPACITÃ‰S PHARES
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white leading-none">
                Les cinq piliers d'exÃ©cution
              </h3>
            </div>
            <p className="text-sm text-neutral-400 font-light max-w-md text-left">
              Une architecture intÃ©grÃ©e conÃ§ue pour accompagner l'ensemble du cycle de valeur de l'entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {KRYPTON_FIVE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-7 rounded-2xl bg-[#060608] border border-white/5 hover:border-kcg-red/30 transition-all duration-500 space-y-6 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-kcg-red transition-colors">
                        {pillar.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:text-kcg-red transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-lg font-display font-black uppercase text-white tracking-tight">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-1.5">
                    {pillar.concepts.map((concept, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-[10.5px] text-neutral-400 font-mono">
                        <span className="w-1 h-1 rounded-full bg-kcg-red" />
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>


        {/* ================= 4. VISUAL ARCHITECTURE & THE MOAT ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Graphic Data-to-Growth Pipeline */}
          <div className="lg:col-span-6 p-8 lg:p-10 rounded-[28px] bg-[#07070a] border border-white/10 space-y-8 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-kcg-red uppercase tracking-widest font-black block">
                ARCHITECTURE DU SYSTÃˆME
              </span>
              <h4 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                De la donnÃ©e brute Ã  la croissance
              </h4>
            </div>

            {/* Clean Graphical Pipeline */}
            <div className="space-y-4 py-4">

              {/* Layer 1: Inputs */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase">01. SOURCES</span>
                <div className="flex items-center gap-3 text-xs font-display font-bold uppercase text-white">
                  <span>DONNÃ‰ES</span>
                  <span className="text-neutral-600">â€¢</span>
                  <span>CLIENTS</span>
                  <span className="text-neutral-600">â€¢</span>
                  <span>Ã‰QUIPES</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-kcg-red" />
              </div>

              {/* Layer 2: Core Intelligence */}
              <div className="p-4.5 rounded-xl bg-gradient-to-r from-[#1b0507] via-[#111115] to-[#1b0507] border border-kcg-red/40 flex items-center justify-between shadow-[0_0_20px_rgba(207,26,38,0.2)]">
                <span className="text-xs font-mono font-bold text-kcg-red uppercase">02. MOTEUR</span>
                <div className="flex items-center gap-2 text-sm font-display font-black uppercase text-white">
                  <Sparkles className="w-4 h-4 text-kcg-red" />
                  <span>KRYPTON AI // INTELLIGENCE</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[1px] h-6 bg-gradient-to-b from-kcg-red to-white/20" />
              </div>

              {/* Layer 3: Outcomes */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase">03. IMPACT</span>
                <div className="flex items-center gap-3 text-xs font-display font-bold uppercase text-white">
                  <span>DÃ‰CISION</span>
                  <span className="text-neutral-600">â€¢</span>
                  <span>ACTION</span>
                  <span className="text-neutral-600">â€¢</span>
                  <span>CONSEIL</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-white" />
              </div>

              {/* Layer 4: Final Outcome */}
              <div className="p-4 rounded-xl bg-white text-black font-display font-black text-center text-sm uppercase tracking-widest">
                CROISSANCE & COMPÃ‰TITIVITÃ‰ ACCÃ‰LÃ‰RÃ‰ES
              </div>

            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Une chaÃ®ne d'infÃ©rence directe qui supprime les silos informationnels et aligne les opÃ©rations sur les objectifs stratÃ©giques.
            </p>
          </div>

          {/* Right: The Moat (Une intelligence qui apprend) */}
          <div className="lg:col-span-6 p-8 lg:p-10 rounded-[28px] bg-gradient-to-br from-[#0c0305] via-[#07070a] to-[#040406] border border-kcg-red/30 space-y-8 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kcg-red/10 border border-kcg-red/25 text-kcg-red text-[9px] font-mono font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>LE MOAT SOUVERAIN</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
                Une intelligence qui apprend
              </h4>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Plus Krypton comprend l'entreprise, plus son intelligence devient pertinente et personnalisÃ©e.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-3">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  BUSINESS MEMORY & CONTEXTE
                </span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Krypton conserve et exploite le contexte nÃ©cessaire pour comprendre l'entreprise dans la durÃ©e. Chaque dÃ©cision, chaque workflow exÃ©cutÃ© et chaque retour renforcent le corpus d'intelligence mÃ©tier.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-3">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  PRÃ‰SENCE COGNITIVE FIKO
                </span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Fiko est l'interface intelligente de Krypton AI qui qualifie, conseille et orchestre sans jamais se limiter Ã  un simple modÃ¨le de rÃ©ponse textuelle.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://krypton-ia.tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter Krypton AI"
                className="flex-1 py-4 px-6 rounded-xl bg-[#C8102E] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(200,16,46,0.3)]"
              >
                <span>VISITER KRYPTON AI</span>
                <span className="text-sm">â†—</span>
              </a>
              <a
                href="#contact"
                className="py-4 px-6 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white border border-white/10 font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-all cursor-pointer"
              >
                <span>CONTACTER KCG</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
