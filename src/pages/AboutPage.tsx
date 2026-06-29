import { motion, AnimatePresence } from 'motion/react';
import { Quote, ArrowRight, Mail, Calendar, Clock, Globe, Cpu, Shield, Zap, MailOpen, GraduationCap, Briefcase, Play, TrendingUp, Heart, Sparkles, Activity, RefreshCw, Compass, Lightbulb, Users, Network, MapPin } from 'lucide-react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import Footer from '../sections/Footer';
import Navbar from '../components/Navbar';
import LetterModal from '../components/LetterModal';
import { LETTERS } from '../data/letters';
// @ts-ignore
import boardroomImg from '../assets/images/kcg_boardroom_1780425890075.png';

interface Department {
  id: string;
  name: string;
  color: string;
  desc: string;
  icon: any;
}

const DEPARTMENTS: Department[] = [
  { 
    id: 'ddd', 
    name: 'DIVERTISSEMENT DIVERSIFIÉ (DDD)', 
    color: '#3B82F6', 
    desc: "Développer les industries créatives, médiatiques et culturelles.",
    icon: Sparkles
  },
  { 
    id: 'dpi', 
    name: "PRODUITS D'INVESTISSEMENT (DPI)", 
    color: '#2DD4BF', 
    desc: "Structurer les mécanismes de financement du futur.",
    icon: TrendingUp
  },
  { 
    id: 'drn', 
    name: 'RESSOURCES NATURELLES (DRN)', 
    color: '#38BDF8', 
    desc: "Valoriser les ressources stratégiques nécessaires au développement durable.",
    icon: Globe
  },
  { 
    id: 'dms', 
    name: 'MULTI SERVICES (DMS)', 
    color: '#FB923C', 
    desc: "Créer des services innovants pour les entreprises et les particuliers.",
    icon: Cpu
  },
  { 
    id: 'dfc', 
    name: 'FONDATION DE CHARITÉ (DFC)', 
    color: '#C8102E', 
    desc: "Développer l'impact social, l'éducation et l'inclusion.",
    icon: Heart
  }
];

export default function AboutPage() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [activeLetterId, setActiveLetterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  // Mouse interactivity states for cinematic parallax, spotlights, and custom pointer followers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseRaw, setMouseRaw] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOutside, setIsOutside] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Dynamic detection of clickable / interactive targets
      const target = e.target as HTMLElement;
      const isClickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.closest('.kcg-card') ||
        target.closest('li') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
      setIsHovered(!!isClickable);

      // Normalized coordinates from -1 to 1 for lightweight spring animations
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      setMousePos({ x: normalizedX, y: normalizedY });
      setMouseRaw({ x: e.clientX, y: e.clientY });
      setIsOutside(false);
    };

    const handleMouseLeaveWindow = () => setIsOutside(true);
    const handleMouseEnterWindow = () => setIsOutside(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Typewriter effect state for cinematic "KOFFMANN CAPITAL GROUP" title
  const fullText = "KOFFMANN CAPITAL GROUP";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(130);

  useEffect(() => {
    let timer: any;
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setTypedText(fullText.slice(0, typedText.length + 1));
        setTypingSpeed(110); // Standard typing speed
        
        if (typedText === fullText) {
          // Pause when completely written
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 3000); // Wait 3 seconds at full text
          return;
        }
      } else {
        // Erasing characters
        setTypedText(fullText.slice(0, typedText.length - 1));
        setTypingSpeed(50); // Faster erasing speed
        
        if (typedText === "") {
          setIsDeleting(false);
          setTypingSpeed(150); // Delay restart speed slightly
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typingSpeed]);

  // Connection data for the cinematic Africa SVG overlay
  const connections = useMemo(() => [
    { city: 'Dakar', x: 23, y: 44, delay: 0.2 },
    { city: 'Lagos', x: 44, y: 53, delay: 0.5 },
    { city: 'Le Caire', x: 74, y: 22, delay: 0.8 },
    { city: 'Nairobi', x: 79, y: 56, delay: 1.1 },
    { city: 'Johannesburg', x: 63, y: 81, delay: 1.4 },
    { city: 'Kinshasa', x: 55, y: 62, delay: 1.7 },
  ], []);

  const activeLetter = useMemo(() => LETTERS.find(l => l.id === activeLetterId) || null, [activeLetterId]);

  const openLetter = (id: number) => {
    setActiveLetterId(id);
    setIsModalOpen(true);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-kcg-red selection:text-white select-text md:cursor-none">
      <Navbar />
      
      {/* ================= HERO SECTION CINÉMATIQUE (100vh) — KCG ABOUT HERO V6™: THE BOARDROOM OF THE FUTURE ================= */}
      <section className="relative h-screen min-h-[820px] w-full flex flex-col justify-between overflow-hidden bg-[#020202] z-10 select-text">
        
        {/* CINEMATIC WORKSPACE & PHOTOGRAPHIC LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Main Photorealistic Image with scale entry & active mouse-motion parallax tracking animation */}
          <motion.div
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ 
              scale: 1.05, 
              opacity: 1,
              x: mousePos.x * 20,
              y: mousePos.y * 15
            }}
            transition={{ 
              opacity: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
              x: { type: "spring", stiffness: 45, damping: 24, mass: 0.7 },
              y: { type: "spring", stiffness: 45, damping: 24, mass: 0.7 }
            }}
            className="absolute inset-x-[-25px] inset-y-[-25px] w-[calc(100%+50px)] h-[calc(100%+50px)] origin-center"
          >
            <img 
              src={boardroomImg} 
              alt="Koffmann Capital Group Boardroom of the Future" 
              className="w-full h-full object-cover object-center filter sepia-[5%] brightness-[0.75] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* PRESTIGE VIGNETTE & HIGH-END OVERLAYS */}
          {/* Top dark gradient for Navbar contrast */}
          <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black via-black/85 to-transparent z-[2]" />
          
          {/* Overall vignette to frame the corporate portrait and enhance focus on decision makers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_75%,rgba(0,0,0,0.95)_100%)] z-[2] pointer-events-none" />
          
          {/* Bottom deep gradient blending beautifully with the black background of Section 1 */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#000000] via-black/75 to-transparent z-[2]" />

          {/* DYNAMIC CINEMATIC MOUSE-TRACKING SPOTLIGHT (Illuminates boardroom underneath the cursor) */}
          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen overflow-hidden"
            animate={{
              background: `radial-gradient(circle 380px at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, rgba(212,175,55,0.12) 0%, rgba(200,16,46,0.04) 50%, transparent 100%)`
            }}
            transition={{ type: "spring", stiffness: 40, damping: 22 }}
          />

          {/* AMBIENT SUNBEAMS & GOLDEN GLOWS (Simulating late afternoon lighting, responding delicately to mouse) */}
          <motion.div 
            animate={{
              x: mousePos.x * -10,
              y: mousePos.y * -10
            }}
            transition={{ type: "spring", stiffness: 30, damping: 25 }}
            className="absolute top-[20%] left-[30%] w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] mix-blend-screen pointer-events-none blur-[60px]" 
          />
          <motion.div 
            animate={{
              x: mousePos.x * -15,
              y: mousePos.y * -15
            }}
            transition={{ type: "spring", stiffness: 30, damping: 25 }}
            className="absolute bottom-[13%] right-[15%] w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.04),transparent_75%)] mix-blend-screen pointer-events-none blur-[50px]" 
          />
        </div>

        {/* TOP ACCENT LINE - EXECUTIVE LUXURY */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none mt-20" />

        {/* HERO MAIN BODY: GIGANTIC, MONUMENTAL, EMBEDDED TYPOGRAPHY WITH CENTER EMPTY SPACE PATTERN */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-6 relative z-10 pointer-events-auto select-text">
          <div className="text-center max-w-5xl flex flex-col items-center justify-center">
            
            {/* Monumental, Minimalist Title - Perfectly Centered, with exact colors requested */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="text-xl sm:text-3xl md:text-5xl lg:text-[4.2rem] font-display uppercase text-white leading-tight filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.92)] text-center font-sans tracking-widest"
            >
              <span className="inline-flex items-center justify-center whitespace-nowrap select-text flex-row">
                {typedText.split("").map((char, index) => {
                  // "KOFFMANN " -> index 0 to 8
                  // "CAPITAL" -> index 9 to 15
                  // " GROUP" -> index 16 to 21
                  let charClass = "text-white font-extrabold tracking-[0.22em]";
                  if (index >= 9 && index <= 15) {
                    charClass = "text-kcg-red font-black italic tracking-[0.22em] drop-shadow-[0_0_15px_rgba(200,16,46,0.6)]";
                  } else {
                    charClass = "text-white font-extrabold tracking-[0.22em]";
                  }
                  return (
                    <span key={index} className={charClass}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
                {/* Cinematic Golden-Red glowing "pencil/writing" cursor */}
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-[3px] h-[0.8em] bg-[#D4AF37] ml-1 shadow-[0_0_12px_#D4AF37] self-center"
                />
              </span>
            </motion.h1>
          </div>
        </div>

        {/* BOTTOM METRICS BAR - FINANCIAL TIMES STYLE PANEL */}
        <div className="w-full z-10 bg-black/40 backdrop-blur-md border-t border-white/5 relative z-20 pointer-events-auto py-6 select-text sm:block hidden">
          <div className="container mx-auto px-6 w-full max-w-7xl grid grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] block uppercase">BOARD ADVISORY</span>
              <span className="text-xs font-medium text-white tracking-[0.15em] block">SOUVERAINETÉ ET EXCELLENCE</span>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-6">
              <span className="text-[8px] font-mono tracking-widest text-kcg-red block uppercase">FUNDS ALLOCATION</span>
              <span className="text-xs font-medium text-white tracking-[0.15em] block">INFRASTRUCTURES ET LOGISTIQUE</span>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-6">
              <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] block uppercase">IMPACT HORIZON</span>
              <span className="text-xs font-medium text-white tracking-[0.15em] block">ÉMANCIPATION ÉCONOMIQUE</span>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-6">
              <span className="text-[8px] font-mono tracking-widest text-white/50 block uppercase">INSTITUTIONAL GRADE</span>
              <span className="text-xs font-medium text-white tracking-[0.15em] block">CONFIANCE ET VISION GLOBALE</span>
            </div>
          </div>
        </div>

        {/* SCROLL TRIGGER: EXPLORER LE LEADERSHIP */}
        <div className="pb-10 flex flex-col items-center gap-3 cursor-pointer z-30 pointer-events-auto select-text mt-2 self-center"
          onClick={() => {
            document.getElementById('qui-sommes-nous')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40 font-bold hover:text-white transition-all duration-300">
            EXPLORER LE LEADERSHIP
          </span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-kcg-red shadow-[0_0_12px_#C8102E]"
          />
        </div>

      </section>

      {/* ================= SECTION 1 — QUI SOMMES-NOUS ? ================= */}
      <section id="qui-sommes-nous" className="py-40 bg-black relative overflow-hidden border-y border-white/5 z-20">
        <div className="container mx-auto px-6 w-full max-w-7xl relative z-10 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Decorative branding tag */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-500 font-bold block">01 // FONDATIONS</span>
            <div className="h-[2px] w-8 bg-kcg-red" />
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-[#B0B0B0] font-black italic">
              TRANSFORMATION AFRICAINE
            </h2>
          </div>

          {/* Right Core Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-12 text-left"
          >
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium leading-[1.05] uppercase tracking-tight text-white">
              Construire aujourd'hui les infrastructures qui façonneront demain.
            </h3>

            <div className="space-y-8 text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              <p>
                KOFFMANN CAPITAL GROUP (KCG) est un groupe d'investissement, d'innovation et de développement d'infrastructures stratégiques dont la mission est d'accélérer la transformation économique, technologique et sociale de l'Afrique.
              </p>
              <p>
                À travers ses départements, ses marques et ses initiatives, KCG développe des écosystèmes capables de connecter les talents, les capitaux, les ressources et les technologies au service d'un développement durable et souverain.
              </p>
              <p className="font-medium text-white/95 border-l-2 border-kcg-red/60 pl-6 py-1 italic text-lg sm:text-xl">
                 “Nous ne construisons pas simplement des entreprises. Nous développons les infrastructures qui permettront aux générations futures de prospérer.”
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= SECTION 2 — NOTRE VISION (FOND BLANC / TEXTE NOIR / RED ACCENTS) ================= */}
      <section className="py-44 bg-white text-black relative overflow-hidden font-sans z-20">
        
        {/* Contrast atmosphere container */}
        <div className="container mx-auto px-6 w-full max-w-5xl relative z-10 flex flex-col justify-between min-h-[500px]">
          
          <div className="space-y-4">
            <span className="text-[11px] font-mono tracking-[0.5em] text-kcg-red font-black block uppercase">02 // STRATÉGIE SOUVERAINE</span>
            <div className="h-[2px] w-12 bg-black" />
          </div>

          {/* Large Monumental Citation */}
          <div className="my-20">
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="text-4xl sm:text-6xl lg:text-[5.5rem] font-display font-bold leading-[0.95] uppercase tracking-tighter text-black"
            >
              "L'avenir de l'Afrique appartiendra à ceux qui construiront ses <span className="text-kcg-red italic">infrastructures stratégiques</span>."
            </motion.h2>
          </div>

          {/* Subtext description split columns */}
          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-black/10 items-start">
            <h3 className="text-xl sm:text-2xl font-display font-semibold uppercase leading-tight text-black">
              Nous croyons que la prochaine révolution africaine sera portée par les infrastructures numériques, financières, humaines et technologiques.
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
              Notre ambition est de faire de KOFFMANN CAPITAL GROUP une plateforme institutionnelle capable de soutenir durablement l'innovation, l'investissement et la transformation du continent.
            </p>
          </div>

        </div>

      </section>

      {/* ================= SECTION 3 — NOTRE MISSION (4 PILIERS PREMIUM) ================= */}
      <section className="py-40 bg-[#070707] relative overflow-hidden border-t border-white/5 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,15,15,0.8),transparent_60%)]" />
        
        <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
          
          <div className="max-w-3xl text-left space-y-6 mb-24">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-kcg-red font-bold block">03 // PILIERS DE CROISSANCE</span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tighter text-white leading-tight">
              Notre Mission d'Impact
            </h2>
            <div className="h-[2px] w-8 bg-kcg-red" />
          </div>

          {/* Grid representing the 4 premium pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "01",
                label: "POTENTIEL CAPITAL",
                title: "Investir dans les projets à fort potentiel.",
                desc: "Identifier, capitaliser et structurer des projets stratégiques capables de devenir des champions industriels régionaux."
              },
              {
                id: "02",
                label: "TECHNOLOGIE APPLIQUÉE",
                title: "Développer des infrastructures numériques intelligentes.",
                desc: "Renforcer l'autonomie africaine grâce à des réseaux décentralisés, l'automatisation avancée et l'intelligence artificielle."
              },
              {
                id: "03",
                label: "MACRO ÉCOSYSTÈMES",
                title: "Créer des écosystèmes économiques durables.",
                desc: "Construire des modèles d'affaires complets et unifiés, connectant directement les capitaux locaux et la logistique finale."
              },
              {
                id: "04",
                label: "CAPITAL COGNITIF",
                title: "Former les talents qui construiront l'Afrique de demain.",
                desc: "Développer l'ingénierie et l'expertise locale en dotant la jeunesse d'une excellence de niveau international."
              }
            ].map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="kcg-card bg-black/40 border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[300px] hover:border-kcg-red/30 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Hexagon/Monospace Number Slide style */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-kcg-red/70 tracking-tighter group-hover:text-kcg-red transition-colors">{p.id}</span>
                    <span className="font-mono text-[8px] tracking-widest text-[#B0B0B0] font-bold opacity-45">{p.label}</span>
                  </div>
                  <h4 className="text-lg font-display uppercase font-semibold tracking-tight text-white">
                    {p.title}
                  </h4>
                </div>
                <p className="text-xs text-[#B0B0B0] font-light leading-relaxed pt-6 border-t border-white/5 group-hover:text-white/90 transition-colors">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 4 — KCG ET LA CÔTE D'IVOIRE (ABIDJAN FUTURISTE) ================= */}
      <section className="py-40 bg-black relative overflow-hidden border-t border-white/5 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,16,46,0.025),transparent_75%)]" />
        
        <div className="container mx-auto px-6 w-full max-w-7xl relative z-10 grid lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-kcg-red font-black block">04 // ANCRAGE TERRITORIAL</span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tighter text-white leading-tight">
                KCG et la Côte d'Ivoire
              </h2>
              <div className="h-[2px] w-12 bg-kcg-red" />
            </div>

            <div className="space-y-6 text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              <p>
                La Côte d'Ivoire est aujourd'hui l'une des économies les plus dynamiques d'Afrique.
              </p>
              <p>
                KOFFMANN CAPITAL GROUP contribue à cette transformation en développant des infrastructures technologiques, des solutions d'intelligence artificielle, des plateformes numériques et des systèmes capables d'améliorer durablement la compétitivité des entreprises et des institutions.
              </p>
              <p className="font-semibold text-white/95 border-l-2 border-kcg-red/60 pl-6 italic">
                “Notre ambition est de participer à l'émergence de la Côte d'Ivoire comme hub technologique régional de référence.”
              </p>
            </div>
          </motion.div>

          {/* Abidjan Futuriste Visualizer Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative bg-white/[0.01] border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[400px]"
          >
            {/* Visual background simulation grid representing architectural towers / networks of Abidjan */}
            <div className="absolute inset-0 opacity-15 overflow-hidden rounded-3xl pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%]">
                <line x1="10" y1="90" x2="10" y2="20" stroke="#C8102E" strokeWidth="0.5" />
                <line x1="30" y1="90" x2="30" y2="40" stroke="#fff" strokeWidth="0.5" />
                <line x1="50" y1="90" x2="50" y2="10" stroke="#C8102E" strokeWidth="0.5" />
                <line x1="70" y1="90" x2="70" y2="35" stroke="#fff" strokeWidth="0.5" />
                <line x1="90" y1="90" x2="90" y2="50" stroke="#C8102E" strokeWidth="0.5" />
                <circle cx="50" cy="10" r="1.5" fill="#C8102E" />
                <circle cx="10" cy="20" r="1" fill="#fff" />
                <circle cx="90" cy="50" r="1" fill="#fff" />
                
                {/* Horizontal flow loops */}
                <path d="M 0 60 Q 50 40 100 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="3 3"/>
                <path d="M 0 75 Q 50 65 100 75" fill="none" stroke="#C8102E" strokeWidth="0.5"/>
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B0B0B0] font-bold">ABIDJAN HUB ACTIF // CI-01</span>
              </div>
              <h3 className="text-xl uppercase font-display font-medium tracking-tight text-white">L'Architecture de Demain</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Repensée sous l'angle du souverainisme technique, Abidjan abrite le cœur névralgique de notre logistique, de nos départements financiers et de notre centre de calculs de données.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5 relative z-10">
              {[
                { title: "Nœud Réseau", desc: "Corridor d'interconnexion", state: "99.98% STABLE" },
                { title: "Intelligence Artificielle", desc: "Digitalisation & Automatisation", state: "IMPACT SOUVERAIN" }
              ].map((sub, key) => (
                <div key={key} className="flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-semibold text-white uppercase tracking-tight text-[11px]">{sub.title}</h5>
                    <p className="text-[9px] text-[#B0B0B0] font-light">{sub.desc}</p>
                  </div>
                  <span className="font-mono text-[9px] text-kcg-red font-black tracking-wider">{sub.state}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 5 — NOS 5 DÉPARTEMENTS STRATÉGIQUES ================= */}
      <section className="py-40 bg-[#020202] relative overflow-hidden border-t border-white/5 z-20">
        <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-28">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-kcg-red font-bold block">05 // ARCHITECTURE GÉNÉRALE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-normal uppercase tracking-tighter text-white">
              Départements <strong className="font-extrabold text-kcg-red">Stratégiques</strong>
            </h2>
            <p className="text-sm font-light text-neutral-400 leading-relaxed">
               Un ensemble consolidé de divisions conçu pour couvrir l'intégralité du développement infrastructurel d'Afrique de l'Ouest.
            </p>
            <div className="h-[2px] w-8 bg-kcg-red mx-auto mt-6" />
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DEPARTMENTS.map((dept, i) => {
              const IconComp = dept.icon;
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredDept(dept.id)}
                  onMouseLeave={() => setHoveredDept(null)}
                  className="kcg-card group relative bg-neutral-900/10 border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[360px] overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: hoveredDept === dept.id ? `${dept.color}35` : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Subtle color spot in background on hover */}
                  <div 
                    className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: dept.color }}
                  />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                        <IconComp className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#B0B0B0] font-black">{dept.id.toUpperCase()}</span>
                    </div>

                    <h4 className="text-sm font-display uppercase tracking-wider font-extrabold text-white leading-tight group-hover:text-kcg-red transition-colors">
                      {dept.name}
                    </h4>
                  </div>

                  <p className="text-xs text-[#B0B0B0] font-light leading-relaxed pt-10 border-t border-white/5 group-hover:text-neutral-200 transition-colors">
                    {dept.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= PRESERVED SECTION — NOTRE FONDATEUR / CEO ================= */}
      <section className="py-40 bg-black relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,16,46,0.06),transparent_60%)]" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 space-y-12 text-left"
          >
            <div className="space-y-6">
              <h2 className="text-[10px] uppercase tracking-[0.8em] text-kcg-red font-black italic">Le Visionnaire Architecte</h2>
              <div className="space-y-2">
                <h3 className="text-5xl md:text-7xl font-display font-medium tracking-tighter uppercase leading-none text-white animate-pulse" style={{ animationDuration: '6s' }}>Paul Koffmann</h3>
                <p className="text-white/30 uppercase tracking-[0.4em] font-black italic text-sm">Fondateur • Président Directeur Général</p>
              </div>
            </div>

            <div className="relative">
              <Quote className="absolute -top-12 -left-12 w-16 h-16 text-kcg-red/10" />
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed italic pr-12">
                “L'infrastructure n'est pas qu'une question de béton et d'octets. C'est l'acte de bousculer le destin de tout un continent en créant les connexions qui n'existaient pas encore.”
              </p>
            </div>

            <div className="space-y-8 text-neutral-400 text-sm md:text-base leading-relaxed font-light italic">
              <p>
                Entrepreneur d’élite spécialisé dans les systèmes complexes, Paul Koffmann a consacré sa carrière à bâtir ce qu’il appelle le “Souverainisme Technologique Africain”. 
              </p>
              <p>
                Visionnaire de l’IA et grand architecte financier, il a transformé KOFFMANN CAPITAL GROUP en un instrument d’influence capable de rivaliser avec les plus grandes institutions mondiales tout en gardant un ancrage continental inaliénable.
              </p>
            </div>

            <div className="flex gap-12 pt-4">
              <div>
                <p className="text-3xl font-display font-medium tracking-tighter text-white">20+</p>
                <p className="text-[9px] uppercase tracking-widest text-[#B0B0B0] font-bold">Expansion Locale</p>
              </div>
              <div>
                <p className="text-3xl font-display font-medium tracking-tighter text-white">150M+</p>
                <p className="text-[9px] uppercase tracking-widest text-[#B0B0B0] font-bold">Impact Capital</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative aspect-[4/5] max-w-lg mx-auto w-full"
          >
            <div className="absolute inset-0 border border-white/5 rounded-[48px] -rotate-3 translate-x-4 translate-y-4" />
            <div className="relative w-full h-full rounded-[48px] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/WA_1776694304070.jpeg?alt=media&token=1111eb29-141f-4c1b-8fef-a6047d09e0f3" 
                alt="Paul Koffmann" 
                className="w-full h-full object-cover object-[center_10%] grayscale brightness-50 contrast-125 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              {/* Volumetric glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-kcg-red/20 blur-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PRESERVED SECTION — LETTRES DU FONDATEUR ================= */}
      <section className="py-40 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5 z-20">
        <div className="container mx-auto px-6 w-full max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-32 space-y-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[11px] uppercase tracking-[0.9em] text-kcg-red font-black italic"
            >
              CEO LETTER EXPERIENCE
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-medium uppercase tracking-tighter leading-none text-white"
            >
              Lettres Stratégiques <br /> <span className="text-white/40">du Fondateur.</span>
            </motion.h1>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-sm md:text-base text-neutral-400 leading-relaxed font-light italic max-w-3xl mx-auto space-y-6 pt-12 border-t border-white/5"
            >
              <p>Chaque empire traverse des périodes de mutation. Les marchés évoluent. Les technologies redéfinissent les règles. L’intelligence artificielle transforme les modèles économiques.</p>
              <p>Ces lettres ne sont pas destinées au grand public. Elles s’adressent aux bâtisseurs, aux dirigeants, aux investisseurs, à celles et ceux qui portent la responsabilité de créer des organisations dans un monde en transformation permanente.</p>
              <div className="pt-6">
                 <p className="text-kcg-red text-xs uppercase tracking-[0.4em] font-black not-italic">Bienvenue dans les Lettres Stratégiques de Paul Koffmann.</p>
              </div>
            </motion.div>
          </div>

          {/* GRID EDITORIALE PREMIUM — 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[11px]">
            {LETTERS.slice(0, visibleCount).map((letter, i) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLetter(letter.id)}
                className="group relative bg-white overflow-hidden cursor-pointer flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-320 hover:-translate-y-1"
              >
                {/* Image Immersive Area */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img 
                    src={letter.image} 
                    alt={letter.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  
                  {/* Category Badge Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[8px] font-black tracking-[0.3em] uppercase text-black italic">
                      {letter.category}
                    </span>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="p-8 md:p-10 flex flex-col flex-1 justify-between gap-10 text-left">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-[8px] font-mono tracking-[0.3em] uppercase text-black/40">
                      <span>{letter.level}</span>
                      <span>{letter.duration}</span>
                    </div>
                    
                    <h4 className="text-2xl font-display font-medium uppercase tracking-tight leading-tight text-black group-hover:text-kcg-red transition-colors duration-300 italic">
                      {letter.title}
                    </h4>
                    
                    <p className="text-[12px] text-black/40 line-clamp-4 font-serif italic leading-relaxed">
                      “{letter.excerpt}”
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 flex items-center justify-between group/btn">
                    <span className="text-[9px] font-mono tracking-widest text-black/30 font-bold uppercase">{letter.date}</span>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 italic">Lire la lettre</span>
                       <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-kcg-red group-hover:border-kcg-red transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 h-[3px] bg-kcg-red transition-all duration-500 w-0 group-hover:w-full" />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {visibleCount < LETTERS.length && (
            <div className="mt-40 flex justify-center">
              <button 
                onClick={loadMore}
                className="group relative px-20 py-10 overflow-hidden border border-white/10 hover:border-kcg-red/50 transition-all duration-500"
              >
                <div className="flex flex-col items-center gap-4 relative z-10">
                   <span className="text-[11px] font-black tracking-[0.8em] uppercase text-white/40 group-hover:text-white transition-colors italic">Charger plus de lettres</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-kcg-red animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-kcg-red translate-y-full group-hover:translate-y-[90%] transition-transform duration-700 opacity-20" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Fullscreen Immersive */}
        <LetterModal 
          isOpen={isModalOpen}
          letter={activeLetter}
          onClose={() => setIsModalOpen(false)}
        />
      </section>

      {/* ================= SECTION 6 — NOTRE AMBITION — MINIMALISTE TEXTE GÉANT ================= */}
      <section className="py-44 bg-black relative overflow-hidden border-t border-white/5 z-20">
        <div className="container mx-auto px-6 w-full max-w-5xl space-y-16 text-center">
          
          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-[0.6em] text-kcg-red font-black uppercase">06 // NOTRE AMBITION</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-kcg-red to-transparent mx-auto" />
          </div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium uppercase tracking-tighter leading-tight text-white italic max-w-4xl mx-auto"
          >
            "Nous ne construisons pas de plateformes. <br />
            Nous bâtissons <span className="text-kcg-red font-extrabold not-italic">l'économie de demain</span>."
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 text-left pt-16 border-t border-white/5 max-w-4xl mx-auto">
            <p className="text-lg text-neutral-300 font-light leading-relaxed">
              Notre ambition est de devenir un acteur majeur du développement d'infrastructures technologiques, économiques et humaines en Afrique.
            </p>
            <p className="text-sm text-[#B0B0B0] font-light leading-relaxed">
              Nous voulons créer un écosystème capable de transformer durablement les économies africaines et d'accélérer l'émergence d'une Afrique innovante, compétitive et souveraine.
            </p>
          </div>

        </div>
      </section>

      {/* ================= SECTION FINALE : MONUMENTAL LOGO ================= */}
      <section className="py-48 bg-black relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5 z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-kcg-red/10 rounded-full blur-[140px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
        
        <div className="text-center space-y-10 z-10 relative">
          {/* Monumental logo font tracking */}
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-[0.22em] text-white select-text"
          >
            KOFFMANN <span className="text-kcg-red">CAPITAL</span>
          </motion.h3>

          <p className="font-mono text-[10px] tracking-[0.4em] text-[#B0B0B0] font-black uppercase max-w-md mx-auto">
            CONSTRUIRE AUJOURD'HUI LES INFRASTRUCTURES QUI FAÇONNERONT DEMAIN.
          </p>
        </div>
      </section>

      <Footer />

      {/* Dynamic Custom Cinematic Cursor Follower */}
      <AnimatePresence>
        {!isOutside && (
          <>
            {/* Outer Ring Tracker with smooth delayed physics */}
            <motion.div
              className="fixed top-0 left-0 w-8 h-8 rounded-full border border-kcg-red/60 pointer-events-none z-50 mix-blend-difference hidden md:block"
              style={{ x: mouseRaw.x - 16, y: mouseRaw.y - 16 }}
              animate={{
                scale: isClicking ? 0.75 : isHovered ? 1.7 : 1,
                borderColor: isHovered ? "#C8102E" : "rgba(212, 175, 55, 0.45)",
                backgroundColor: isHovered ? "rgba(200, 16, 46, 0.15)" : "rgba(0, 0, 0, 0)",
              }}
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25, mass: 0.1 },
                y: { type: "spring", stiffness: 250, damping: 25, mass: 0.1 },
                scale: { type: "spring", stiffness: 220, damping: 18 },
                borderColor: { duration: 0.2 },
                backgroundColor: { duration: 0.2 },
              }}
            />
            {/* Inner Precision Gold/Red Micro Target */}
            <motion.div
              className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 hidden md:block"
              style={{ x: mouseRaw.x - 4, y: mouseRaw.y - 4 }}
              animate={{
                scale: isClicking ? 0.6 : isHovered ? 1.3 : 1,
                backgroundColor: isHovered ? "#C8102E" : "#D4AF37",
                boxShadow: isHovered 
                  ? "0 0 12px rgba(200, 16, 46, 0.82)" 
                  : "0 0 8px rgba(212, 175, 55, 0.62)",
              }}
              transition={{
                x: { type: "spring", stiffness: 850, damping: 40, mass: 0.05 },
                y: { type: "spring", stiffness: 850, damping: 40, mass: 0.05 },
                scale: { type: "spring", stiffness: 300, damping: 15 },
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
