import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Clock,
  Compass,
  ShieldCheck,
  Search,
  CheckCircle2,
  Calendar,
  X,
  Volume2,
  BookmarkCheck,
  Bell
} from 'lucide-react';
import { LETTERS, Letter } from '../data/letters';
import { usePodcastStore } from '../store/podcastStore';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import LetterModal from '../components/LetterModal';
import LetterSubscriptionModal, { LetterSubscriptionBanner } from '../components/LetterSubscriptionModal';
import KCGExecutiveReader from '../components/executive-reader/KCGExecutiveReader';
import { readerService } from '../services/readerService';
// @ts-ignore
import boardroomImg from '@/src/assets/images/kcg_boardroom_1780425890075.png';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';

const CATEGORIES = ['TOUTES', 'SOUVERAINETÃ‰', 'INTELLIGENCE', 'CAPITAL', 'STRATÃ‰GIE', 'GÃ‰OPOLITIQUE'];

export default function MobileDoctrineView() {
  const { setActiveTab } = useMobileOSStore();
  const [selectedCategory, setSelectedCategory] = useState('TOUTES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isExecutiveReaderOpen, setIsExecutiveReaderOpen] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const latestLetterId = useMemo(() => Math.max(...LETTERS.map((l) => l.id)), []);

  // Deep link support (?letter=1 or #lettre-1)
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

  // ================= HERO SLIDER STATE =================
  const [slideIndex, setSlideIndex] = useState(0);
  const dragX = useMotionValue(0);

  const {
    activeLetter,
    isPlaying,
    playLetter,
    togglePlayPause
  } = usePodcastStore();

  const SLIDES = [
    {
      id: 'doctrine',
      tag: 'LEADERSHIP SOUVERAIN',
      title: (
        <>
          BÃ‚TIR <br />
          <span className="text-[#CF1A26]">L'AFRIQUE.</span>
        </>
      ),
      bgImage: boardroomImg,
      gradient: 'from-black/75 via-black/85 to-black'
    },
    {
      id: 'vision',
      tag: 'VISION DU FONDATEUR',
      title: (
        <>
          UNE AFRIQUE <br />
          <span className="text-white">TECHNOLOGIQUEMENT</span> <br />
          <span className="text-[#CF1A26]">PUISSANTE.</span>
        </>
      ),
      bgImage: kcgAfricaRising,
      gradient: 'from-black/80 via-black/90 to-black'
    },
    {
      id: 'letters',
      tag: 'DOCTRINE HEBDOMADAIRE',
      title: (
        <>
          CHAQUE LUNDI, <br />
          <span className="text-[#CF1A26]">UNE LETTRE.</span>
        </>
      ),
      bgImage: boardroomImg,
      gradient: 'from-black/75 via-black/85 to-black'
    },
    {
      id: 'future',
      tag: 'HORIZON 2030',
      title: (
        <>
          CONSTRUIRE <br />
          <span className="text-white">LE FUTUR.</span>
        </>
      ),
      bgImage: kcgAfricaRising,
      gradient: 'from-black/80 via-black/90 to-black'
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
        l.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenLetter = (letter: Letter) => {
    kcgSound.playTactileClick();
    setSelectedLetter(letter);
    setIsLetterModalOpen(true);
  };

  const handleAudioClick = (letter: Letter, e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    if (activeLetter?.id === letter.id) {
      togglePlayPause();
    } else {
      playLetter(letter);
    }
  };

  return (
    <div className="w-full bg-[#000000] text-white select-none px-4 pt-16 pb-36 flex flex-col justify-start overflow-x-hidden text-left relative space-y-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#CF1A26]/15 rounded-full blur-[140px]" />
      </div>

      {/* ================= 1. MOBILE HERO SLIDER (FOUNDER LEADERSHIP) ================= */}
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

              {/* Slide Monumental Title */}
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

      {/* ================= 2. FOUNDER OFFICIAL PORTRAIT CARD ================= */}
      <div className="relative z-10 p-5 rounded-[24px] bg-[#0c0c0f] border border-white/15 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[8px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest block">
              FONDATEUR & CEO // KCG
            </span>
            <h2 className="text-xl font-display font-black uppercase text-white">
              Paul Koffmann
            </h2>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#CF1A26]/20 border border-[#CF1A26]/40 flex items-center justify-center text-[#CF1A26]">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          Â« L'Afrique n'est pas un continent qui attend d'Ãªtre sauvÃ©. C'est un empire de talents et d'Ã©nergies qui attend d'Ãªtre architecturÃ©. Â»
        </p>

        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-[8.5px] font-mono uppercase text-neutral-400">
          <span>KCG HOUSE // ABIDJAN HQ</span>
          <span className="text-[#CF1A26] font-bold">HORIZON 2030</span>
        </div>
      </div>

      {/* ================= 3. FEATURED LETTER OF THE WEEK (CINEMATIC FULL-BLEED) ================= */}
      <div className="relative z-10 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold">
              LETTER OF THE WEEK
            </span>
          </div>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            UNE LETTRE. CHAQUE LUNDI.
          </h2>
        </div>

        {/* Cinematic Featured Poster Card */}
        <div
          onClick={() => handleOpenLetter(featuredLetter)}
          className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden border border-[#CF1A26]/40 bg-[#0a0a0c] shadow-2xl cursor-pointer active:scale-[0.985] transition-transform select-none"
        >
          {/* Background Image */}
          <img
            src={featuredLetter.image || boardroomImg}
            alt={featuredLetter.title}
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

          {/* Top Tag */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded-md bg-[#CF1A26] text-white font-mono text-[8px] font-black uppercase tracking-widest shadow-md">
              LET 00{featuredLetter.id} // SEMAINE
            </span>
            <span className="text-[8px] font-mono text-white/80 uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm">
              {featuredLetter.date}
            </span>
          </div>

          {/* Bottom Title & Audio Action */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 space-y-2">
            <span className="text-[7.5px] font-mono uppercase tracking-widest text-[#CF1A26] font-bold block">
              {featuredLetter.category}
            </span>

            <h3 className="text-sm font-display font-black uppercase text-white tracking-tight leading-tight line-clamp-2">
              {featuredLetter.title}
            </h3>

            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[8px] font-mono text-neutral-300">
                {featuredLetter.duration}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleAudioClick(featuredLetter, e)}
                  className="py-1.5 px-3 rounded-lg bg-[#CF1A26] text-white text-[9px] font-mono uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-md active:scale-90"
                >
                  {activeLetter?.id === featuredLetter.id && isPlaying ? (
                    <>
                      <Pause className="w-2.5 h-2.5" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>Ã‰COUTER</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. THE 5 PRINCIPLES ================= */}
      <div className="relative z-10 space-y-3">
        <div className="space-y-1">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block">
            02 // DOCTRINE & PRINCIPES
          </span>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            THE FOUNDER'S PRINCIPLES
          </h2>
        </div>

        <div className="space-y-2">
          {[
            { num: '01', title: 'TECHNOLOGY AS A LEVER', desc: 'L\'infrastructure fondamentale pour rÃ©Ã©crire les rÃ¨gles de prospÃ©ritÃ©.' },
            { num: '02', title: 'PATIENT CAPITAL', desc: 'Discipline financiÃ¨re impermÃ©able aux cycles spÃ©culatifs.' },
            { num: '03', title: 'RADICAL EXECUTION', desc: 'DÃ©livrer une supÃ©rioritÃ© opÃ©rationnelle tangible et souveraine.' },
            { num: '04', title: 'AFRICAN SOVEREIGNTY', desc: 'ContrÃ´le absolu sur nos donnÃ©es et protocoles financiers.' },
            { num: '05', title: 'HORIZON 2030', desc: 'BÃ¢tir des institutions et capacitÃ©s pÃ©rennes pour les dÃ©cennies.' }
          ].map((p) => (
            <div
              key={p.num}
              className="p-3.5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] flex items-start gap-3 text-left"
            >
              <span className="text-xs font-mono text-[#CF1A26] font-bold shrink-0 mt-0.5">{p.num}</span>
              <div className="space-y-0.5">
                <h3 className="text-[11.5px] font-display font-bold uppercase text-white">{p.title}</h3>
                <p className="text-[10.5px] text-neutral-400 font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 5. LETTERS CATALOG (STRICT 2x2 CINEMATIC GRID) ================= */}
      <div className="relative z-10 space-y-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#CF1A26] font-bold">
              03 // BIBLIOTHÃˆQUE CINÃ‰MATIQUE
            </span>
          </div>
          <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
            FOUNDER'S LETTERS
          </h2>
        </div>

        {/* Filter Pills (Single Line Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  kcgSound.playTactileClick();
                  setSelectedCategory(cat);
                }}
                className={`py-1 px-2.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#CF1A26] text-white shadow-md'
                    : 'bg-white/5 text-neutral-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Strict 2-Column Mobile Cinematic Posters Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredLetters.map((letter) => {
            const isCurrentActive = activeLetter?.id === letter.id;
            return (
              <div
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                aria-label={`Lire la lettre 00${letter.id} - ${letter.title}`}
                className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden border border-white/10 active:border-[#CF1A26]/80 bg-[#0d0d10] shadow-xl group cursor-pointer select-none active:scale-[0.985] transition-all"
              >
                {/* Full-Bleed Cover Image */}
                <img
                  src={letter.image || boardroomImg}
                  alt={letter.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
                />

                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#CF1A26] text-white font-mono text-[7.5px] font-bold uppercase tracking-widest shadow-md">
                      LET 00{letter.id}
                    </span>
                    {letter.id === latestLetterId && (
                      <span className="px-1 py-0.5 rounded bg-[#CF1A26] text-white font-mono text-[6.5px] font-black uppercase tracking-wider animate-pulse">
                        NOUVEAU
                      </span>
                    )}
                    {readerService.isLetterSaved(letter.id) && (
                      <span className="p-0.5 rounded bg-black/60">
                        <BookmarkCheck className="w-2.5 h-2.5 text-[#CF1A26]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[7.5px] font-mono text-white/80 uppercase px-1 py-0.5 rounded bg-black/50 backdrop-blur-xs">
                    {letter.date.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>

                {/* Bottom Content (Title & Audio Action) */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-col justify-end space-y-1.5">
                  <span className="text-[7px] font-mono uppercase tracking-widest text-[#CF1A26] font-bold truncate">
                    {letter.category}
                  </span>

                  <h3 className="text-[11px] font-display font-black uppercase text-white leading-tight tracking-tight line-clamp-3">
                    {letter.title}
                  </h3>

                  <div className="pt-1 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[7.5px] font-mono text-neutral-300">
                      {letter.duration}
                    </span>

                    <button
                      onClick={(e) => handleAudioClick(letter, e)}
                      aria-label={`Ã‰couter la lettre ${letter.title}`}
                      className="w-5 h-5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-[#CF1A26] text-white flex items-center justify-center transition-all shadow-md active:scale-90"
                    >
                      {isCurrentActive && isPlaying ? (
                        <Pause className="w-2 h-2" />
                      ) : (
                        <Play className="w-2 h-2 fill-white translate-x-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mon Espace StratÃ©gique Callout Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#19080b] to-[#0a0a0c] border border-[#CF1A26]/40 space-y-3 text-left shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#CF1A26]" />
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#CF1A26] font-bold">
                KCG EXECUTIVE READERâ„¢
              </span>
            </div>
            <span className="text-[7.5px] font-mono text-neutral-400">ESPACE PERSONNEL</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
              Mon Espace StratÃ©gique
            </h3>
            <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
              Suivez les idÃ©es qui faÃ§onnent notre vision, gÃ©nÃ©rez votre briefing exÃ©cutif et interrogez vos lectures avec KCG AI.
            </p>
          </div>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              setIsExecutiveReaderOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-white text-black font-mono text-[9.5px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
          >
            <span>OUVRIR MON ESPACE STRATÃ‰GIQUE</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Subscription Follow-up Banner */}
        <div className="pt-2">
          <LetterSubscriptionBanner onOpenModal={() => setIsSubscriptionModalOpen(true)} />
        </div>
      </div>

      {/* ================= 6. FINAL MANIFESTO ================= */}
      <div className="relative z-10 py-6 px-5 rounded-2xl bg-black border border-white/15 text-center space-y-4 shadow-xl">
        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#CF1A26] font-bold block">
          MANIFESTE DU FONDATEUR
        </span>
        <h2 className="text-lg font-display font-black uppercase text-white leading-tight">
          L'AFRIQUE N'A PAS BESOIN DE PERMISSION POUR CONSTRUIRE SON FUTUR.
        </h2>
        <div className="w-10 h-0.5 bg-[#CF1A26] mx-auto" />
        <h3 className="text-base font-display font-extrabold uppercase text-neutral-300 leading-tight">
          ELLE A BESOIN DE BÃ‚TISSEURS.
        </h3>
        <p className="text-sm font-display font-black uppercase tracking-wider text-[#CF1A26]">
          KCG CONTINUE DE BÃ‚TIR.
        </p>
      </div>

      {/* ================= 7. FOOTER ROUGE INSTITUTIONNEL ================= */}
      <div className="relative z-10 pt-4 -mx-4 px-5 py-8 bg-[#C8102E] text-white space-y-6">
        <div className="space-y-2 text-left">
          <div className="text-lg font-display font-black tracking-wider uppercase">
            KOFFMANN CAPITAL GROUP
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/90 font-medium">
            CAPITAL â€¢ TECHNOLOGIE â€¢ INTELLIGENCE â€¢ INFRASTRUCTURE
          </p>
        </div>

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
        </div>

        <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[8.5px] font-mono uppercase tracking-widest text-white/80">
          <span>Â© 2026 KOFFMANN CAPITAL GROUP</span>
          <span>ABIDJAN HQ</span>
        </div>
      </div>

      {/* Modal */}
      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          isOpen={isLetterModalOpen}
          onClose={() => setIsLetterModalOpen(false)}
          onSelectLetter={(letter) => setSelectedLetter(letter)}
        />
      )}

      {/* Subscription Follow-up Sheet */}
      <LetterSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />

      {/* Full-Screen Mobile Sovereign Strategic Space */}
      {isExecutiveReaderOpen && (
        <div className="fixed inset-0 z-50 bg-[#050507] overflow-y-auto p-4 pb-24 text-left animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 sticky top-0 bg-[#050507]/90 backdrop-blur-md z-30 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CF1A26]" />
              <span className="text-[9px] font-mono uppercase font-bold text-[#CF1A26] tracking-widest">
                KCG EXECUTIVE READERâ„¢
              </span>
            </div>
            <button
              onClick={() => {
                kcgSound.playTactileClick();
                setIsExecutiveReaderOpen(false);
              }}
              className="p-1.5 rounded-lg bg-white/10 text-white text-xs font-mono"
            >
              âœ• FERMER
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
      )}
    </div>
  );
}
