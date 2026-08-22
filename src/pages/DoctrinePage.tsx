import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Clock,
  Compass,
  Radio,
  Share2,
  Calendar,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  Flame,
  Volume2,
  BookmarkCheck,
  Bell
} from 'lucide-react';
import { LETTERS, Letter } from '../data/letters';
import { usePodcastStore } from '../store/podcastStore';
import LetterModal from '../components/LetterModal';
import LetterSubscriptionModal, { LetterSubscriptionBanner } from '../components/LetterSubscriptionModal';
import MyLettersSection from '../components/MyLettersSection';
import KCGExecutiveReader from '../components/executive-reader/KCGExecutiveReader';
import { readerService } from '../services/readerService';
import { kcgSound } from '../mobile/soundEngine';
// @ts-ignore
import boardroomImg from '../assets/images/kcg_boardroom_1780425890075.png';
// @ts-ignore
import kcgAfricaRising from '../assets/images/kcg_africa_rising_1780357788022.png';

const CATEGORIES = ['TOUTES', 'SOUVERAINETÃ‰', 'INTELLIGENCE', 'CAPITAL', 'STRATÃ‰GIE', 'GÃ‰OPOLITIQUE'];

export default function DoctrinePage() {
  const [selectedCategory, setSelectedCategory] = useState('TOUTES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isExecutiveReaderOpen, setIsExecutiveReaderOpen] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const latestLetterId = useMemo(() => Math.max(...LETTERS.map((l) => l.id)), []);

  // Deep Link support: ?letter=1 or #lettre-1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const letterParam = params.get('letter') || params.get('lettre');
      const hash = window.location.hash;

      let targetId: number | null = null;
      if (letterParam) {
        targetId = parseInt(letterParam.replace(/^0+/, ''), 10);
      } else if (hash && hash.includes('lettre-')) {
        const match = hash.match(/lettre-(\d+)/);
        if (match) {
          targetId = parseInt(match[1], 10);
        }
      }

      if (targetId) {
        const found = LETTERS.find((l) => l.id === targetId);
        if (found) {
          setSelectedLetter(found);
          setIsLetterModalOpen(true);
        }
      }
    }
  }, []);

  const {
    activeLetter,
    isPlaying,
    isGenerating,
    playLetter,
    togglePlayPause,
    isPlayerVisible
  } = usePodcastStore();

  const featuredLetter = LETTERS[0];

  const filteredLetters = useMemo(() => {
    return LETTERS.filter((l) => {
      const matchCat =
        selectedCategory === 'TOUTES' ||
        l.category.toUpperCase().includes(selectedCategory.toUpperCase()) ||
        selectedCategory.toUpperCase().includes(l.category.toUpperCase());
      const matchQuery =
        !searchQuery ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const timelineSteps = [
    {
      code: '01 // ORIGIN',
      title: 'L\'IMPACT PAR LA MAÃŽTRISE',
      period: 'ORIGINE',
      desc: 'Constat initial des asymÃ©tries Ã©conomiques et de la dÃ©pendance technologique du continent face aux solutions importÃ©es.'
    },
    {
      code: '02 // BUILD',
      title: 'INGÃ‰NIERIE SOUVERAINE',
      period: 'FONDATION',
      desc: 'Mise en place d\'une mÃ©thode d\'exÃ©cution intransigeante articulant R&D de pointe, infrastructures data et modÃ©lisation cognitive.'
    },
    {
      code: '03 // VISION',
      title: 'DOCTRINE D\'Ã‰LÃ‰VATION',
      period: 'DOCTRINE',
      desc: 'Affirmation du souverainisme technologique : passer du statut de simple zone de consommation Ã  celui de crÃ©ateur et exportateur de standards.'
    },
    {
      code: '04 // KCG',
      title: 'LE VÃ‰HICULE INDUSTRIEL',
      period: 'KCG HOLDING',
      desc: 'CrÃ©ation de Koffmann Capital Group comme conglomÃ©rat d\'infrastructure, unifiant capital institutionnel et plateformes propriÃ©taires.'
    },
    {
      code: '05 // HORIZON 2030',
      title: 'EXPANSION CONTINENTALE',
      period: 'HORIZON 2030',
      desc: 'DÃ©ploiement massif des plateformes critiques (Krypton AI, Fiko One, Fiko Connect) pour propulser l\'autonomie de millions d\'entreprises.'
    }
  ];

  const founderPrinciples = [
    {
      num: '01',
      title: 'TECHNOLOGY AS A LEVER',
      desc: 'La technologie n\'est pas un produit d\'accompagnement. C\'est l\'infrastructure fondamentale sur laquelle l\'Afrique doit rÃ©Ã©crire ses rÃ¨gles de prospÃ©ritÃ©.'
    },
    {
      num: '02',
      title: 'PATIENT CAPITAL',
      desc: 'Le capital doit Ã©pouser le temps long. Construire des monopoles souverains et des infrastructures critiques exige une discipline financiÃ¨re impermÃ©able aux cycles spÃ©culatifs.'
    },
    {
      num: '03',
      title: 'RADICAL EXECUTION',
      desc: 'Une vision sans exÃ©cution n\'est qu\'une hallucination. Chaque ligne de code, chaque protocole et chaque investissement doit dÃ©livrer une supÃ©rioritÃ© opÃ©rationnelle tangible.'
    },
    {
      num: '04',
      title: 'AFRICAN SOVEREIGNTY',
      desc: 'Garantir la souverainetÃ© sur nos donnÃ©es, nos rails de paiement et nos intelligences algorithmiques est la seule garantie d\'indÃ©pendance gÃ©opolitique rÃ©elle.'
    },
    {
      num: '05',
      title: 'LONG-TERM HORIZON 2030',
      desc: 'Chaque dÃ©cision stratÃ©gique est calibrÃ©e avec rigueur pour bÃ¢tir des institutions pÃ©rennes capables de traverser les dÃ©cennies.'
    }
  ];

  const handleOpenLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    setIsLetterModalOpen(true);
  };

  const handleAudioClick = (letter: Letter, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLetter?.id === letter.id) {
      togglePlayPause();
    } else {
      playLetter(letter);
    }
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen relative font-sans selection:bg-[#C8102E] selection:text-white pt-24 pb-32 text-left">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[#C8102E]/[0.08] rounded-full blur-[260px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-[220px]" />
      </div>

      <div className="relative z-10 space-y-32 md:space-y-44">

        {/* ================= 01. HERO IMMERSIF (FOUNDER'S OFFICE) ================= */}
        <section className="container mx-auto px-6 max-w-7xl pt-8 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Text column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
                  FOUNDER'S OFFICE // KOFFMANN CAPITAL GROUP
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.4em] text-[#C8102E] font-bold">
                  BÃ‚TIR. CONNECTER. TRANSFORMER.
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-[1.02]">
                  UNE AFRIQUE <br />
                  TECHNOLOGIQUEMENT <br />
                  <span className="text-[#C8102E]">PUISSANTE.</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
                Entrez dans la doctrine intellectuelle, la vision stratÃ©gique et les lettres hebdomadaires du fondateur de Koffmann Capital Group, dÃ©diÃ©es aux dÃ©cideurs qui bÃ¢tissent l'avenir du continent.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#letters"
                  className="py-4 px-8 rounded-full bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-[#C8102E]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>EXPLORER LES LETTRES</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <button
                  onClick={() => {
                    kcgSound.playTactileClick();
                    setIsExecutiveReaderOpen(true);
                  }}
                  className="py-4 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#C8102E]" />
                  <span>MON ESPACE STRATÃ‰GIQUE</span>
                </button>

                <a
                  href="#journey"
                  className="py-4 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer"
                >
                  <span>DÃ‰COUVRIR LA VISION</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Cinematic Portrait Card Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden border border-white/15 bg-[#0a0a0d] shadow-2xl group">
                <img
                  src={boardroomImg}
                  alt="Paul Koffmann & KCG Leadership"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#C8102E] uppercase font-bold tracking-widest">
                      LEADERSHIP DU FONDATEUR
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                  </div>
                  <h2 className="text-base font-display font-black uppercase text-white">
                    Paul Koffmann
                  </h2>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase">
                    FONDATEUR & PRÃ‰SIDENT-DIRECTEUR GÃ‰NÃ‰RAL â€” KCG
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 02. INTRODUCTION NARRATIVE ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="p-8 sm:p-14 lg:p-16 rounded-[32px] bg-gradient-to-b from-[#0e0a0c] via-[#09080a] to-[#050505] border border-white/10 space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                01 // THE FOUNDER
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                UNE VISION AVANT UNE ENTREPRISE.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <div className="space-y-2 p-6 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-xs font-mono text-[#C8102E] font-bold">I. LE CONSTAT</span>
                <p>
                  L'Afrique regorge de talents et d'Ã©nergie, mais souffre de la fragmentation de ses canaux technologiques et financiers. DÃ©pendre de protocoles tiers fragilise l'indÃ©pendance de ses Ã©conomies.
                </p>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-xs font-mono text-[#C8102E] font-bold">II. LA DOCTRINE</span>
                <p>
                  Construire soi-mÃªme les couches fondamentales : clusters data sÃ©curisÃ©s, moteurs d'intelligence artificielle contextualisÃ©s et passerelles transactionnelles universelles.
                </p>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-xs font-mono text-[#C8102E] font-bold">III. L'HORIZON 2030</span>
                <p>
                  Ã‰riger des infrastructures rÃ©silientes, Ã©prouvÃ©es sur le sol africain et capables d'inspirer les standards technologiques mondiaux de demain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03. TIMELINE DU FONDATEUR (THE JOURNEY) ================= */}
        <section id="journey" className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-4 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
              TRAJECTOIRE & ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              THE JOURNEY.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
              Les jalons de la maturation doctrinale et industrielle ayant donnÃ© naissance Ã  l'Ã©cosystÃ¨me Koffmann Capital Group.
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timelineSteps.map((step, idx) => {
              const isActive = activeTimelineIndex === idx;
              return (
                <div
                  key={step.code}
                  onClick={() => setActiveTimelineIndex(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] select-none ${
                    isActive
                      ? 'bg-[#18080b] border-[#C8102E] shadow-[0_0_30px_rgba(200,16,46,0.25)]'
                      : 'bg-[#09090b] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold tracking-widest ${isActive ? 'text-[#C8102E]' : 'text-neutral-500'}`}>
                      {step.period}
                    </span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-ping" />}
                  </div>

                  <div className="space-y-2 my-4">
                    <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className={`w-full h-1 rounded-full ${isActive ? 'bg-[#C8102E]' : 'bg-white/10'}`} />
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 04. THE VISION MONUMENT ================= */}
        <section className="container mx-auto px-6 max-w-5xl text-center py-8">
          <div className="p-12 sm:p-20 rounded-[36px] bg-black border border-white/15 space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial from-[#C8102E]/10 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="space-y-6 max-w-3xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8102E] font-bold block">
                AXIOME FONDATEUR
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                â€œIL NE S'AGIT PAS SIMPLEMENT DE CRÃ‰ER DES ENTREPRISES.â€
              </h2>

              <div className="w-16 h-1 bg-[#C8102E] mx-auto my-6" />

              <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-tight text-neutral-300 leading-tight">
                â€œIL S'AGIT DE CONSTRUIRE DES CAPACITÃ‰S.â€
              </h3>

              <p className="text-lg sm:text-2xl font-display font-black uppercase tracking-widest text-[#C8102E] pt-4">
                DES CAPACITÃ‰S CAPABLES DE CHANGER L'Ã‰CHELLE DE L'AFRIQUE.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 05. THE FOUNDER'S PRINCIPLES ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-4 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
              THE FOUNDER'S PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              LES 5 CONVICTIONS FONDAMENTALES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {founderPrinciples.map((p) => (
              <div
                key={p.num}
                className="p-7 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <span className="text-xs font-mono text-[#C8102E] font-bold">{p.num} // PRINCIPLE</span>
                <div className="space-y-2">
                  <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 06. AFRICA VISION ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="p-8 sm:p-14 lg:p-16 rounded-[32px] bg-gradient-to-r from-[#140608] via-[#09080a] to-[#140608] border border-[#C8102E]/30 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                MANIFESTE POUR L'AFRIQUE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight leading-tight">
                UNE AFRIQUE QUI NE CONSOMME PAS SEULEMENT LA TECHNOLOGIE.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#C8102E] font-bold">01 // CONCEPTION</span>
                <h3 className="text-xl font-display font-black uppercase text-white">
                  QUI LA CONÃ‡OIT.
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  BÃ¢tir les algorithmes et protocoles adaptÃ©s Ã  nos rÃ©alitÃ©s endogÃ¨nes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#C8102E] font-bold">02 // MAÃŽTRISE</span>
                <h3 className="text-xl font-display font-black uppercase text-white">
                  QUI LA MAÃŽTRISE.
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Conserver le contrÃ´le absolu sur les donnÃ©es et infrastructures critiques.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#C8102E] font-bold">03 // EXPORTATION</span>
                <h3 className="text-xl font-display font-black uppercase text-white">
                  QUI L'EXPORTE.
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Proposer au monde entier des solutions robustes nÃ©es dans la complexitÃ©.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 07. KCG LE VÃ‰HICULE ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-4 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold block">
              BRAS ARMÃ‰ INDUSTRIEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              KCG EST LE VÃ‰HICULE.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
              Koffmann Capital Group transforme cette vision intellectuelle en infrastructures tangibles Ã  travers ses trois plateformes phares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[28px] bg-[#0c0809] border border-[#C8102E]/30 space-y-4">
              <span className="text-[10px] font-mono text-[#C8102E] font-bold tracking-widest uppercase block">
                01 // INTELLIGENCE ARTIFICIELLE
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white">
                KRYPTON AI
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                La plateforme d'intelligence business qui connecte donnÃ©es, clients et opÃ©rations pour automatiser l'exÃ©cution.
              </p>
              <a
                href="https://krypton-ia.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#C8102E] uppercase pt-2"
              >
                <span>EXPLORER LA PLATEFORME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-8 rounded-[28px] bg-[#0a0a0c] border border-white/10 space-y-4">
              <span className="text-[10px] font-mono text-neutral-400 font-bold tracking-widest uppercase block">
                02 // SERVICES ON DEMAND
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white">
                FIKO ONE
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Plateforme souveraine de mise en relation multiservice unifiant l'offre qualifiÃ©e et la demande quotidienne.
              </p>
              <a
                href="#nos-solutions"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 hover:text-white uppercase pt-2"
              >
                <span>DÃ‰COUVRIR LES SOLUTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-8 rounded-[28px] bg-[#080e0a] border border-[#25D366]/20 space-y-4">
              <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase block">
                03 // CONVERSATIONAL INFRASTRUCTURE
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white">
                FIKO CONNECT
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Couche d'orchestration conversationnelle reliant WhatsApp Business aux processus et opÃ©rations d'entreprise.
              </p>
              <a
                href="#nos-solutions"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 hover:text-white uppercase pt-2"
              >
                <span>DÃ‰COUVRIR LES SOLUTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= 08. FOUNDER'S DESK & FEATURED LETTER (CINEMATIC) ================= */}
        <section id="letters" className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
                  THE FOUNDER'S DESK // EDITORIAL CINEMA
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight leading-none">
                  FOUNDER'S LETTERS
                </h2>
                <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  UNE LETTRE. CHAQUE LUNDI.
                </p>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md leading-relaxed">
                Les rÃ©flexions du fondateur pour celles et ceux qui construisent les entreprises et infrastructures de demain.
              </p>
            </div>

            {/* Featured Letter of the Week (Monumental Cinematic Poster) */}
            <div
              onClick={() => handleOpenLetter(featuredLetter)}
              className="relative w-full aspect-[16/8] sm:aspect-[21/9] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-2xl cursor-pointer group select-none transition-all duration-500 hover:border-[#C8102E]/60"
            >
              {/* Full-bleed Background Image */}
              <img
                src={featuredLetter.image || boardroomImg}
                alt={featuredLetter.title}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Multi-stage Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />

              {/* Top Meta Bar */}
              <div className="absolute top-5 sm:top-8 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#C8102E] text-white font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                    LETTER OF THE WEEK
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    LET 00{featuredLetter.id} // {featuredLetter.date}
                  </span>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                  {featuredLetter.category}
                </span>
              </div>

              {/* Bottom Content & Play */}
              <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
                <div className="space-y-2 max-w-3xl">
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-black uppercase text-white tracking-tight leading-tight group-hover:text-neutral-100 transition-colors">
                    {featuredLetter.title}
                  </h3>
                  <p className="hidden md:block text-xs sm:text-sm text-neutral-300 font-light line-clamp-2 leading-relaxed max-w-2xl">
                    {featuredLetter.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => handleAudioClick(featuredLetter, e)}
                    className="py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-xl shadow-[#C8102E]/30 cursor-pointer"
                  >
                    {activeLetter?.id === featuredLetter.id && isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Ã‰COUTER ({featuredLetter.duration})</span>
                      </>
                    )}
                  </button>

                  <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 09. CINEMATIC LETTERS LIBRARY (GRID 2x2 / 3-4 COL) ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-8">
            {/* Header + Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                  BIBLIOTHÃˆQUE CINÃ‰MATIQUE
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
                  COLLECTION DES LETTRES
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par titre ou thÃ¨me..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0a0c] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>

            {/* Category Filter Pills (Single Line Horizontal Scroll) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-4 rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20'
                        : 'bg-[#0a0a0c] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Cinematic Full-Bleed Posters Grid (Desktop 3/4 cols - Responsive) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {filteredLetters.map((letter) => {
                const isCurrentActive = activeLetter?.id === letter.id;
                return (
                  <div
                    key={letter.id}
                    onClick={() => handleOpenLetter(letter)}
                    aria-label={`Lire la lettre 00${letter.id} - ${letter.title}`}
                    className="relative w-full aspect-[4/5] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/10 hover:border-[#C8102E]/60 bg-[#0c0c0f] shadow-xl group cursor-pointer select-none transition-all duration-300 active:scale-[0.985]"
                  >
                    {/* Full-Bleed Cover Image */}
                    <img
                      src={letter.image || boardroomImg}
                      alt={letter.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />

                    {/* Multi-layer Cinematic Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />

                    {/* Top Identity Tag */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#C8102E]/90 backdrop-blur-sm text-white font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest shadow-md">
                          LET 00{letter.id}
                        </span>
                        {letter.id === latestLetterId && (
                          <span className="px-1.5 py-0.5 rounded bg-[#C8102E] text-white font-mono text-[7.5px] font-black uppercase tracking-wider animate-pulse">
                            NOUVEAU
                          </span>
                        )}
                        {readerService.isLetterSaved(letter.id) && (
                          <span className="p-0.5 rounded bg-black/60 backdrop-blur-md">
                            <BookmarkCheck className="w-3 h-3 text-[#C8102E]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-mono text-white/70 uppercase tracking-wider backdrop-blur-sm px-1.5 py-0.5 rounded bg-black/40">
                        {letter.date}
                      </span>
                    </div>

                    {/* Bottom Title & Quick Audio */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex flex-col justify-end space-y-2">
                      <span className="text-[7.5px] sm:text-[8.5px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                        {letter.category}
                      </span>

                      <h3 className="text-xs sm:text-base font-display font-black uppercase text-white leading-tight tracking-tight line-clamp-3 group-hover:text-neutral-100 transition-colors">
                        {letter.title}
                      </h3>

                      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400">
                          {letter.duration}
                        </span>

                        <button
                          onClick={(e) => handleAudioClick(letter, e)}
                          aria-label={`Ã‰couter la lettre ${letter.title}`}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-[#C8102E] text-white flex items-center justify-center transition-all shadow-md active:scale-90"
                        >
                          {isCurrentActive && isPlaying ? (
                            <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          ) : (
                            <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white translate-x-0.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Follow-up / Subscription Banner */}
            <LetterSubscriptionBanner onOpenModal={() => setIsSubscriptionModalOpen(true)} />

            {/* KCG Executive Reader â€” Personal Strategic Intelligence */}
            <div id="executive-reader" className="p-6 sm:p-10 rounded-[32px] bg-[#0A0A0C] border border-white/10 shadow-2xl">
              <KCGExecutiveReader onOpenLetter={handleOpenLetter} />
            </div>
          </div>
        </section>

        {/* ================= 10. VISION & HORIZON 2030 ================= */}
        <section className="container mx-auto px-6 max-w-7xl">
          <div className="p-8 sm:p-14 lg:p-16 rounded-[32px] bg-gradient-to-b from-[#140608] to-[#08080a] border border-[#C8102E]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold block">
                KCG INSTITUTION // CAP STRATÃ‰GIQUE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                VISION & HORIZON 2030.
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Construire aujourd'hui les capacitÃ©s technologiques, industrielles et financiÃ¨res pour garantir l'indÃ©pendance de l'Afrique de demain.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#contact"
                className="py-4 px-8 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-[#C8102E]/30 cursor-pointer"
              >
                <span>CONTACTER LE FOUNDER'S OFFICE</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= 11. FINAL MANIFESTO ================= */}
        <section className="container mx-auto px-6 max-w-5xl text-center py-12">
          <div className="p-12 sm:p-20 rounded-[36px] bg-black border border-white/15 space-y-8 relative overflow-hidden shadow-2xl">
            <div className="space-y-4 max-w-3xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8102E] font-bold block">
                MANIFESTE DE CLÃ”TURE
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                L'AFRIQUE N'A PAS BESOIN DE PERMISSION POUR CONSTRUIRE SON FUTUR.
              </h2>

              <div className="w-16 h-1 bg-[#C8102E] mx-auto my-6" />

              <h3 className="text-xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-neutral-300 leading-tight">
                ELLE A BESOIN DE BÃ‚TISSEURS.
              </h3>

              <p className="text-lg sm:text-2xl font-display font-black uppercase tracking-widest text-[#C8102E] pt-2">
                KCG CONTINUE DE BÃ‚TIR.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Full-screen Letter Detail Modal */}
      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          isOpen={isLetterModalOpen}
          onClose={() => setIsLetterModalOpen(false)}
          onSelectLetter={(l) => setSelectedLetter(l)}
        />
      )}

      {/* Subscription Follow-up Sheet */}
      <LetterSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />

      {/* Dedicated Full-Screen Executive Reader Overlay */}
      {isExecutiveReaderOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="max-w-5xl mx-auto space-y-6 pt-4 pb-12">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  kcgSound.playTactileClick();
                  setIsExecutiveReaderOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#C8102E] text-white text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer"
              >
                âœ• FERMER L'ESPACE
              </button>
            </div>
            <KCGExecutiveReader
              onOpenLetter={(l) => {
                setIsExecutiveReaderOpen(false);
                handleOpenLetter(l);
              }}
              onClose={() => setIsExecutiveReaderOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
