import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Database,
  Workflow,
  Lock,
  Globe,
  CheckCircle2,
  Server,
  Code2,
  Terminal,
  Activity,
  Compass,
  Building2,
  TrendingUp,
  Flame,
  HeartHandshake
} from 'lucide-react';
import ProductLaunchModal from '../components/ProductLaunchModal';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';

export default function SolutionsPage() {
  const [selectedLaunchProduct, setSelectedLaunchProduct] = useState<'fiko-one' | 'fiko-connect' | null>(null);
  const [activeEngineStep, setActiveEngineStep] = useState<number>(0);
  const { playLetter, isPlayerVisible } = usePodcastStore();

  const engineSteps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Identification & Cadrage StratÃ©gique',
      desc: 'Cartographie des anomalies Ã©conomiques et des frictions de marchÃ© non rÃ©solues sur le continent.',
      deliverable: 'Cahier d\'impact & modÃ©lisation de faisabilitÃ©'
    },
    {
      num: '02',
      title: 'ARCHITECT',
      subtitle: 'IngÃ©nierie SystÃ¨me & Protocoles',
      desc: 'Conception de l\'architecture souveraine, des modÃ¨les de donnÃ©es et de la topologie de sÃ©curitÃ©.',
      deliverable: 'SchÃ©ma d\'architecture de rang institutionnel'
    },
    {
      num: '03',
      title: 'BUILD',
      subtitle: 'DÃ©veloppement PropriÃ©taire Haute Performance',
      desc: 'DÃ©veloppement full-stack robuste, moteurs d\'intelligence cognitive et intÃ©gration d\'infrastructures rÃ©silientes.',
      deliverable: 'Codebase propriÃ©taire & clusters distribuÃ©s'
    },
    {
      num: '04',
      title: 'INTEGRATE',
      subtitle: 'Interconnexion aux Ã‰cosystÃ¨mes Existants',
      desc: 'Liaison directe avec les rÃ©seaux bancaires, tÃ©lÃ©coms, rÃ©gulateurs et systÃ¨mes d\'entreprises partenaires.',
      deliverable: 'APIs souveraines & passerelles multi-canaux'
    },
    {
      num: '05',
      title: 'DEPLOY',
      subtitle: 'Mise en Production & Orchestration Locale',
      desc: 'DÃ©ploiement sur nos data centers et nÅ“uds opÃ©rationnels distribuÃ©s Ã  travers les mÃ©tropoles africaines.',
      deliverable: 'Mise en service opÃ©rationnelle 99.99%'
    },
    {
      num: '06',
      title: 'SCALE',
      subtitle: 'Expansion & RÃ©silience Continentale',
      desc: 'AccÃ©lÃ©ration de la volumÃ©trie transactionnelle et absorption des flux massifs en temps rÃ©el.',
      deliverable: 'Monopole technologique & impact souverain'
    }
  ];

  const techCapabilities = [
    { title: 'DIGITAL INFRASTRUCTURE', icon: Server, desc: 'RÃ©seaux distribuÃ©s, clusters haute disponibilitÃ© et hÃ©bergement souverain Ã  latence ultra-faible.' },
    { title: 'ARTIFICIAL INTELLIGENCE', icon: Sparkles, desc: 'ModÃ¨les cognitifs verticaux, automatisation neuronale et raisonnement contextualisÃ© pour les marchÃ©s Ã©mergents.' },
    { title: 'DATA & ANALYTICS', icon: Database, desc: 'Pipelines temps rÃ©el, data lakes sÃ©curisÃ©s et extraction de signaux Ã©conomiques prÃ©dictifs.' },
    { title: 'AUTOMATION & WORKFLOW', icon: Workflow, desc: 'Orchestration autonome des processus critiques d\'entreprises sans rupture humaine.' },
    { title: 'PAYMENTS & RAILS', icon: Zap, desc: 'Passerelles de paiement instantanÃ© unifiant mobile money, cartes et protocoles souverains.' },
    { title: 'PLATFORMS & SUPER APPS', icon: Layers, desc: 'Marketplaces et applications multiservices pensÃ©es pour des dizaines de millions d\'utilisateurs.' },
    { title: 'API & PROTOCOLS', icon: Code2, desc: 'Interfaces de programmation institutionnelles sÃ©curisÃ©es pour l\'interconnexion inter-systÃ¨mes.' },
    { title: 'SECURITY & CIPHER', icon: Lock, desc: 'Chiffrement post-quantique, conformitÃ© bancaire et protection absolue des donnÃ©es territoriales.' },
    { title: 'OBSERVABILITY', icon: Activity, desc: 'TÃ©lÃ©mÃ©trie de prÃ©cision, monitoring temps rÃ©el et rÃ©silience continue 24/7.' }
  ];

  const strategicDomains = [
    {
      code: '01 // DDD',
      name: 'DIVERTISSEMENT DIVERSIFIÃ‰',
      desc: 'Architectures multimÃ©dias, diffusion de contenus souverains et valorisation du patrimoine culturel Ã  grande Ã©chelle.',
      capabilities: ['Plateformes de streaming', 'Gestion des droits numÃ©riques', 'Infrastructures crÃ©atives'],
      icon: Flame
    },
    {
      code: '02 // DPI',
      name: 'PRODUITS D\'INVESTISSEMENT',
      desc: 'IngÃ©nierie financiÃ¨re, vÃ©hicules de capital et plateformes d\'allocation pour les infrastructures critiques.',
      capabilities: ['Structured Finance', 'Tokenisation d\'actifs rÃ©els', 'Corridors de capitaux institutionnels'],
      icon: TrendingUp
    },
    {
      code: '03 // DRN',
      name: 'RESSOURCES NATURELLES',
      desc: 'Technologies de traÃ§abilitÃ©, optimisation logistique et transformation locale des mÃ©taux et Ã©nergies stratÃ©giques.',
      capabilities: ['ChaÃ®nes d\'approvisionnement critiques', 'Surveillance satellitaire', 'Protocoles ESG certifiÃ©s'],
      icon: Compass
    },
    {
      code: '04 // DMS',
      name: 'MULTI-SERVICES',
      desc: 'Plateformes connectÃ©es rÃ©pondant aux besoins essentiels du quotidien et des entreprises africaines.',
      capabilities: ['Services Ã  la demande', 'Logistique du dernier kilomÃ¨tre', 'Commerce conversationnel'],
      icon: Building2
    },
    {
      code: '05 // DFC',
      name: 'FONDATION DE CHARITÃ‰',
      desc: 'Programmes d\'impact technologique, bourses d\'excellence et formation de l\'Ã©lite des ingÃ©nieurs du continent.',
      capabilities: ['KCG Talents Fellowship', 'Inclusion numÃ©rique territoriale', 'Recherche acadÃ©mique appliquÃ©e'],
      icon: HeartHandshake
    }
  ];

  const whyKcgArguments = [
    { num: '01', title: 'SYSTEM THINKING', desc: 'Nous ne concevons pas des applications isolÃ©es, mais des architectures Ã©cosystÃ©miques complÃ¨tes et interconnectÃ©es.' },
    { num: '02', title: 'AFRICA-FIRST', desc: 'Nos technologies intÃ¨grent nativement la connectivitÃ© intermittente, la diversitÃ© des paiements et les usages locaux.' },
    { num: '03', title: 'END-TO-END EXECUTION', desc: 'De la conception du hardware et de l\'infrastructure cloud jusqu\'Ã  l\'expÃ©rience utilisateur finale, nous maÃ®trisons chaque couche.' },
    { num: '04', title: 'TECHNOLOGY + CAPITAL', desc: 'Nous combinons la puissance financiÃ¨re d\'une holding de premier plan avec l\'agilitÃ© d\'un laboratoire de pointe.' },
    { num: '05', title: 'LONG-TERM EXECUTION', desc: 'GuidÃ©s par notre Vision & Horizon 2030, nous construisons des monopoles souverains pÃ©rennes.' }
  ];

  return (
    <div className="bg-[#000000] text-white min-h-screen relative font-sans selection:bg-[#C8102E] selection:text-white pt-24 pb-32">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[#C8102E]/[0.07] rounded-full blur-[280px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 space-y-32 md:space-y-44">

        {/* ================= 01. HERO DESKTOP ================= */}
        <section className="container mx-auto px-6 max-w-7xl pt-12 lg:pt-20 text-left">
          <div className="space-y-8 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
                KOFFMANN CAPITAL GROUP // SOLUTION ARCHITECTURE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black uppercase tracking-tight text-white leading-[1.02]">
              NOUS CONSTRUISONS <br />
              LES SOLUTIONS <br />
              DE L'<span className="text-[#C8102E]">AFRIQUE.</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              KCG transforme des enjeux stratÃ©giques en infrastructures, plateformes et technologies capables de fonctionner Ã  grande Ã©chelle.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-5">
              <a
                href="#platforms"
                className="py-4 px-8 rounded-full bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-[#C8102E]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>EXPLORER NOS SOLUTIONS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#contact"
                className="py-4 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer"
              >
                <span>PARLER Ã€ KCG</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Signature statement */}
            <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-neutral-400 text-xs font-mono tracking-widest uppercase">
              <span className="text-white font-bold">â€œNOUS NE FOURNISSONS PAS SIMPLEMENT DES OUTILS. NOUS CONSTRUISONS LES CAPACITÃ‰S QUI LES RENDENT POSSIBLES.â€</span>
              <span className="text-neutral-500">CAPITAL â€¢ TECHNOLOGIE â€¢ INTELLIGENCE â€¢ INFRASTRUCTURE</span>
            </div>
          </div>
        </section>

        {/* ================= 02. SOLUTION ENGINE (FROM PROBLEM TO INFRASTRUCTURE) ================= */}
        <section id="engine" className="container mx-auto px-6 max-w-7xl text-left">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[32px] bg-gradient-to-b from-[#0c0c0f] to-[#050507] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                  KCG SOLUTION ENGINE // PIPELINE OPÃ‰RATIONNEL
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight">
                  FROM PROBLEM <br className="hidden sm:inline" />
                  TO INFRASTRUCTURE.
                </h2>
              </div>
              <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
                Notre mÃ©thodologie rigoureuse garantit le passage d'une friction systÃ©mique Ã  une plateforme opÃ©rationnelle souveraine de rang mondial.
              </p>
            </div>

            {/* Interactive 6-Step Engine Pipeline */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              {engineSteps.map((step, idx) => {
                const isActive = activeEngineStep === idx;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveEngineStep(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[190px] relative select-none ${
                      isActive
                        ? 'bg-[#18080b] border-[#C8102E] shadow-[0_0_25px_rgba(200,16,46,0.25)]'
                        : 'bg-black/40 border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#C8102E]' : 'text-neutral-500'}`}>
                        {step.num}
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-ping" />}
                    </div>

                    <div>
                      <h3 className="text-base font-display font-bold text-white tracking-tight uppercase">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 font-light line-clamp-2 mt-1">
                        {step.subtitle}
                      </p>
                    </div>

                    <div className={`w-full h-1 rounded-full ${isActive ? 'bg-[#C8102E]' : 'bg-white/10'}`} />
                  </div>
                );
              })}
            </div>

            {/* Active Step Deep Dive Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#C8102E]/20 text-[#C8102E] font-mono text-[10px] font-bold">
                    PHASE {engineSteps[activeEngineStep].num}
                  </span>
                  <span className="text-sm font-display font-bold uppercase text-white">
                    {engineSteps[activeEngineStep].title} â€” {engineSteps[activeEngineStep].subtitle}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {engineSteps[activeEngineStep].desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 shrink-0 text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">LIVRABLE SYSTÃˆME</span>
                <span className="text-xs font-mono text-white font-medium block mt-1">
                  {engineSteps[activeEngineStep].deliverable}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03. THREE FLAGSHIP PLATFORMS ================= */}
        <section id="platforms" className="container mx-auto px-6 max-w-7xl text-left">
          <div className="space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8102E]/10 border border-[#C8102E]/25">
              <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold">
                KCG // FLAGSHIP TECHNOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight">
              THREE PLATFORMS. <br />
              ONE ECOSYSTEM.
            </h2>
            <p className="text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
              Les trois premiÃ¨res expressions commerciales visibles de la capacitÃ© d'architecture souveraine de Koffmann Capital Group.
            </p>
          </div>

          {/* 3 Prominent Horizontal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* PLATFORM 1: KRYPTON AI */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-[30px] bg-gradient-to-b from-[#0f0a0c] via-[#09080a] to-[#050505] border border-[#C8102E]/40 flex flex-col justify-between relative overflow-hidden shadow-2xl group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8102E]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#C8102E]/20 transition-all duration-500" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C8102E] font-bold tracking-widest">01 // FLAGSHIP AI</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#C8102E]/10 border border-[#C8102E]/30 flex items-center justify-center text-[#C8102E]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight">
                    KRYPTON AI
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    INTELLIGENCE BUSINESS & OPÃ‰RATIONNELLE
                  </span>
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Krypton AI est la plateforme d'intelligence business qui connecte les donnÃ©es, les clients, les Ã©quipes et les opÃ©rations afin d'automatiser l'exÃ©cution, amÃ©liorer les dÃ©cisions et accÃ©lÃ©rer la croissance.
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#C8102E] tracking-widest font-bold block">PROMESSE SYSTÃˆME</span>
                  <p className="text-xs font-display font-bold text-white uppercase">
                    â€œL'INTELLIGENCE QUI FAIT AVANCER VOTRE ENTREPRISE.â€
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 relative z-10">
                <a
                  href="https://krypton-ia.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-neutral-200 text-black font-display font-extrabold text-xs uppercase tracking-widest flex items-center justify-between shadow-xl transition-all cursor-pointer group/btn"
                >
                  <span>EXPLORER KRYPTON AI</span>
                  <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* PLATFORM 2: FIKO ONE */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-[30px] bg-gradient-to-b from-[#110609] via-[#09080a] to-[#050505] border border-white/15 hover:border-[#C8102E]/50 flex flex-col justify-between relative overflow-hidden shadow-2xl group transition-colors"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#C8102E]/10 transition-all duration-500" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 font-bold tracking-widest">02 // ON DEMAND</span>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight">
                    FIKO ONE
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    PLATEFORME DE MISE EN RELATION MULTISERVICE
                  </span>
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Fiko One est une plateforme souveraine de mise en relation multiservice qui connecte directement les prestataires qualifiÃ©s et les demandeurs de services dans une expÃ©rience fluide et instantanÃ©e.
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#C8102E] tracking-widest font-bold block">PROMESSE SYSTÃˆME</span>
                  <p className="text-xs font-display font-bold text-white uppercase">
                    â€œCONNECTER LA DEMANDE Ã€ L'OFFRE DE SERVICES.â€
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 relative z-10">
                <button
                  onClick={() => setSelectedLaunchProduct('fiko-one')}
                  className="w-full py-4 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-extrabold text-xs uppercase tracking-widest flex items-center justify-between shadow-xl transition-all cursor-pointer group/btn"
                >
                  <span>SOYEZ INFORMÃ‰ DU LANCEMENT</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* PLATFORM 3: FIKO CONNECT */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-[30px] bg-gradient-to-b from-[#09110d] via-[#09080a] to-[#050505] border border-white/15 hover:border-[#25D366]/40 flex flex-col justify-between relative overflow-hidden shadow-2xl group transition-colors"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#25D366]/15 transition-all duration-500" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest">03 // CONVERSATIONAL</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <Workflow className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight">
                    FIKO CONNECT
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    INFRASTRUCTURE CONVERSATIONNELLE INTELLIGENTE
                  </span>
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Fiko Connect est la couche de connexion et d'orchestration conversationnelle qui permet aux entreprises de transformer leurs conversations clients (notamment WhatsApp Business) en interactions intelligentes et opÃ©rations commerciales.
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#25D366] tracking-widest font-bold block">ARCHITECTURE DES FLUX</span>
                  <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                    CONNECT â€¢ UNDERSTAND â€¢ ENGAGE â€¢ CONVERT â€¢ ORCHESTRATE
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 relative z-10">
                <button
                  onClick={() => setSelectedLaunchProduct('fiko-connect')}
                  className="w-full py-4 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-extrabold text-xs uppercase tracking-widest flex items-center justify-between shadow-xl transition-all cursor-pointer group/btn"
                >
                  <span>SOYEZ INFORMÃ‰ DU LANCEMENT</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= 04. TECHNOLOGY CAPABILITIES (BUILT FOR SCALE) ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="space-y-3 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
              CAPACITÃ‰S TECHNOLOGIQUES KCG
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              BUILT FOR SCALE.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
              KCG maÃ®trise l'intÃ©gralitÃ© des briques logicielles, matÃ©rielles et cognitives permettant de construire des plateformes complexes capables de servir des millions d'utilisateurs.
            </p>
          </div>

          {/* 3x3 Grid of Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-7 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-bold uppercase text-white tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 05. FIVE STRATEGIC DOMAINS ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="space-y-3 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold block">
              DOMAINES D'EXPANSION & D'INVESTISSEMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              LES 5 DOMAINES STRATÃ‰GIQUES.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
              Les architectures sectorielles au sein desquelles Koffmann Capital Group orchestre le dÃ©ploiement de solutions technologiques et d'infrastructures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicDomains.map((dom) => {
              const Icon = dom.icon;
              return (
                <div
                  key={dom.code}
                  className="p-8 rounded-[24px] bg-[#0c0c0e] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#C8102E] font-bold tracking-widest">{dom.code}</span>
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-display font-black uppercase text-white tracking-tight">
                      {dom.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {dom.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <span className="text-[9px] font-mono uppercase text-neutral-500 tracking-widest font-bold block">
                      CAPACITÃ‰S CLÃ‰S
                    </span>
                    <ul className="space-y-1.5">
                      {dom.capabilities.map((c) => (
                        <li key={c} className="text-xs font-mono text-neutral-300 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#C8102E]" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 06. AFRICA-FIRST ENGINEERING ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[32px] bg-gradient-to-r from-[#0d0305] via-[#08080a] to-[#0d0305] border border-[#C8102E]/30 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                INGÃ‰NIERIE SOUVERAINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                CONÃ‡U POUR L'AFRIQUE. <br />
                <span className="text-neutral-400">PENSÃ‰ POUR LE MONDE.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                KCG construit Ã  partir des rÃ©alitÃ©s exigeantes du continent africain â€” connectivitÃ© variable, volumÃ©trie mobile massive, intÃ©grations monÃ©taires fragmentÃ©es â€” sans jamais limiter ses ambitions Ã  celui-ci.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
              {[
                { title: 'CONNECTIVITY', desc: 'RÃ©silience hors-ligne et protocoles lÃ©gers adaptÃ©s aux rÃ©seaux locaux.' },
                { title: 'PAYMENTS', desc: 'Interconnexion native aux flux Mobile Money et systÃ¨mes bancaires UEMOA/CEMAC.' },
                { title: 'SCALE', desc: 'Architecture haute disponibilitÃ© conÃ§ue pour absorber l\'explosion dÃ©mographique.' },
                { title: 'LOCAL INTELLIGENCE', desc: 'ComprÃ©hension des dialectes, contextes culturels et modÃ¨les Ã©conomiques informels.' },
                { title: 'SOVEREIGNTY', desc: 'DonnÃ©es protÃ©gÃ©es sur le sol africain et gouvernance technologique indÃ©pendante.' }
              ].map((item, idx) => (
                <div key={item.title} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <span className="text-[9px] font-mono text-[#C8102E] font-bold block">0{idx + 1} // CRITÃˆRE</span>
                  <h3 className="text-sm font-display font-bold uppercase text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 07. KCG CORE ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="p-8 sm:p-12 rounded-[28px] bg-[#09090b] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold block">
                KCG CORE // DIGITAL INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                THE ENGINE BEHIND THE ECOSYSTEM.
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                KCG Core constitue la couche d'infrastructure et d'orchestration qui permet de connecter les systÃ¨mes, les donnÃ©es, les identitÃ©s, les plateformes et l'intelligence de l'Ã©cosystÃ¨me.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#ecosystem"
                className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                DÃ‰COUVRIR LE SOCLE KCG CORE
              </a>
            </div>
          </div>
        </section>

        {/* ================= 08. WHY KCG ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="space-y-3 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
              DIFFÃ‰RENCIATION STRATÃ‰GIQUE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              WHY KCG?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {whyKcgArguments.map((arg) => (
              <div
                key={arg.num}
                className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <span className="text-xs font-mono text-[#C8102E] font-bold">{arg.num}</span>
                <div className="space-y-2">
                  <h3 className="text-sm font-display font-bold uppercase text-white">{arg.title}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{arg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 09. MANIFESTO SEQUENCE ================= */}
        <section className="container mx-auto px-6 max-w-5xl text-center py-16">
          <div className="p-12 sm:p-20 rounded-[36px] bg-black border border-white/15 space-y-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial from-[#C8102E]/10 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="space-y-6 max-w-3xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8102E] font-bold block">
                MANIFESTE SOUVERAIN
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
                L'AFRIQUE N'A PAS BESOIN DE PLUS D'APPLICATIONS.
              </h2>

              <div className="w-16 h-1 bg-[#C8102E] mx-auto my-6" />

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-300 leading-tight">
                ELLE A BESOIN DE NOUVELLES INFRASTRUCTURES.
              </h3>

              <p className="text-xl sm:text-3xl font-display font-black uppercase tracking-widest text-[#C8102E] pt-4">
                KCG CONSTRUIT CELLES-CI.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 10. FINAL ACTION CTA ================= */}
        <section className="container mx-auto px-6 max-w-7xl text-left">
          <div className="p-10 sm:p-16 rounded-[32px] bg-gradient-to-b from-[#140608] to-[#070709] border border-[#C8102E]/40 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                KOFFMANN CAPITAL GROUP // SOLUTION ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                QUELLE CAPACITÃ‰ <br />
                VOULEZ-VOUS CONSTRUIRE ?
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Contactez notre bureau d'architecture pour initier un dÃ©ploiement stratÃ©gique ou intÃ©grer l'Ã©cosystÃ¨me KCG.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#contact"
                className="py-4 px-8 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-[#C8102E]/30 cursor-pointer"
              >
                <span>PARLER Ã€ KCG</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#ecosystem"
                className="py-4 px-8 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>EXPLORER L'Ã‰COSYSTÃˆME</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Product Launch Notification Modal */}
      {selectedLaunchProduct && (
        <ProductLaunchModal
          isOpen={!!selectedLaunchProduct}
          onClose={() => setSelectedLaunchProduct(null)}
          product={selectedLaunchProduct}
          source="kcg-desktop"
        />
      )}
    </div>
  );
}
