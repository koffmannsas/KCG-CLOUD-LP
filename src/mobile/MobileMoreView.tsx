import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  Mail,
  X,
  Send,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import MyLettersSection from '../components/MyLettersSection';
import LetterModal from '../components/LetterModal';
import { Letter, LETTERS } from '../data/letters';

interface MobileMoreViewProps {
  onNavigateDesktopPage?: (page: string) => void;
}

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  items: { label: string; action: () => void }[];
}

export default function MobileMoreView({ onNavigateDesktopPage }: MobileMoreViewProps) {
  const {
    setActiveTab,
    setSelectedLetterId,
    setIsRadioFullscreen,
    isContactSheetOpen,
    setIsContactSheetOpen
  } = useMobileOSStore();

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [contactSubject, setContactSubject] = useState<'contact' | 'partnership' | 'investment' | 'talent'>('contact');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const toggleAccordion = (id: string) => {
    kcgSound.playTactileClick();
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleOpenLetter = (letter: Letter) => {
    setSelectedLetter(letter);
  };

  const ACCORDION_GROUPS: AccordionItem[] = [
    {
      id: 'kcg',
      number: '01',
      title: 'KCG INSTITUTION',
      items: [
        { label: 'Ã€ PROPOS DE KCG', action: () => { if (onNavigateDesktopPage) onNavigateDesktopPage('about'); } },
        { label: 'LEADERSHIP DU FONDATEUR (DOCTRINE & LETTRES)', action: () => setActiveTab('doctrine') },
        { label: 'VISION & HORIZON 2030', action: () => setActiveTab('doctrine') },
        { label: 'KCG HOUSE (ABIDJAN HQ)', action: () => setActiveTab('network') },
      ]
    },
    {
      id: 'ecosystem',
      number: '02',
      title: 'Ã‰COSYSTÃˆME & PILIERS',
      items: [
        { label: 'NOS SOLUTIONS (ARCHITECTURE & INFRASTRUCTURE)', action: () => setActiveTab('network') },
        { label: 'KRYPTON AI (INTELLIGENCE ARTIFICIELLE)', action: () => setActiveTab('ai') },
        { label: 'FIKO ONE (SERVICES ON DEMAND)', action: () => setActiveTab('fiko-one') },
        { label: 'FIKO CONNECT (INFRASTRUCTURE CONVERSATIONNELLE)', action: () => setActiveTab('fiko-connect') },
        { label: 'KCG CORE (INFRASTRUCTURE COMMUNE)', action: () => setActiveTab('core') },
      ]
    },
    {
      id: 'intelligence',
      number: '03',
      title: 'INTELLIGENCE & DOCTRINE',
      items: [
        { label: 'KCG AI COGNITIVE LAYER', action: () => setActiveTab('ai') },
        { label: 'KCG RADIO STRATÃ‰GIQUE', action: () => setIsRadioFullscreen(true) },
        { label: 'DOSSIERS DÃ‰CLASSIFIÃ‰S #1-6', action: () => setSelectedLetterId(1) },
        { label: 'NOTES STRATÃ‰GIQUES MACRO', action: () => setSelectedLetterId(3) },
      ]
    },
    {
      id: 'relations',
      number: '04',
      title: 'RELATIONS & INSTITUTIONS',
      items: [
        { label: 'INITIER UN CONTACT', action: () => { setContactSubject('contact'); setIsContactSheetOpen(true); } },
        { label: 'PARTENARIATS STRATÃ‰GIQUES', action: () => { setContactSubject('partnership'); setIsContactSheetOpen(true); } },
        { label: 'RELATIONS INVESTISSEURS', action: () => { setContactSubject('investment'); setIsContactSheetOpen(true); } },
        { label: 'REJOINDRE KCG (TALENTS)', action: () => { setContactSubject('talent'); setIsContactSheetOpen(true); } },
      ]
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    kcgSound.playSignalPing(580);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactSheetOpen(false);
      setContactMessage('');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-[96svh] bg-[#CF1A26] text-white select-none px-6 pt-20 pb-36 flex flex-col justify-between overflow-x-hidden text-left relative"
    >
      {/* ================= 1. KCG OFFICIAL BRAND SIGNATURE HEADER ================= */}
      <div className="space-y-6">
        {/* Official Logo & Institutional Crest */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/krypton-ai-490214.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0c252df9-95d7-4ef8-abb1-03d509a84403"
              alt="KCG Official"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[8px] font-mono tracking-[0.3em] text-white/80 uppercase font-bold block">
              PORTAIL INSTITUTIONNEL SOUVERAIN
            </span>
            <span className="text-xs font-display font-black tracking-widest text-white uppercase leading-none">
              KOFFMANN CAPITAL GROUP
            </span>
          </div>
        </div>

        {/* Monumental Wordmark & Official Slogan */}
        <div className="space-y-2 pt-2">
          <h1 className="text-5xl sm:text-6xl font-display font-black text-white tracking-tighter leading-none">
            KCG
          </h1>
          <p className="text-sm font-display font-bold text-white uppercase tracking-wider">
            KOFFMANN CAPITAL GROUP
          </p>
          <p className="text-xs font-mono font-bold text-white/90 uppercase tracking-[0.2em]">
            SOVEREIGN TECHNOLOGY. AFRICAN SCALE.
          </p>
        </div>
      </div>

      {/* ================= 2. MES LETTRES & ESPACE LECTEUR ================= */}
      <div className="my-8 p-5 sm:p-6 rounded-[28px] bg-[#0A0A0C] border border-white/15 text-white shadow-2xl">
        <MyLettersSection onOpenLetter={handleOpenLetter} />
      </div>

      {/* ================= 3. 4 MONUMENTAL ACCORDION MODULES ================= */}
      <div className="my-8 space-y-0 border-t border-b border-white/25">
        {ACCORDION_GROUPS.map((group) => {
          const isOpen = openAccordion === group.id;

          return (
            <div
              key={group.id}
              className="border-b border-white/25 last:border-b-0 transition-colors"
            >
              <button
                onClick={() => toggleAccordion(group.id)}
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-white/70">
                    {group.number}
                  </span>
                  <span className="text-sm font-display font-black uppercase tracking-wider text-white">
                    {group.title}
                  </span>
                </div>

                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/70" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="pb-4 pt-1 space-y-2 overflow-hidden"
                  >
                    {group.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          kcgSound.playTactileClick();
                          item.action();
                        }}
                        className="w-full py-2 flex items-center justify-between text-left text-white font-display font-bold text-xs uppercase tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ================= 3. MASTER PRIMARY ACTION: CONTACT KCG ================= */}
      <div className="space-y-6 pt-2">
        <button
          onClick={() => {
            kcgSound.playTactileClick();
            setIsContactSheetOpen(true);
          }}
          className="w-full h-14 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-2xl active:bg-black active:text-white transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>CONTACTER KCG</span>
        </button>

        {/* Minimal White Sovereign Seal */}
        <div className="flex items-center justify-center pt-2">
          <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10">
            <span className="text-[10px] font-display font-black text-white tracking-widest">
              KCG
            </span>
          </div>
        </div>
      </div>

      {/* ================= 4. QUIET MONUMENTAL LEGAL FOOTER ================= */}
      <div className="mt-10 pt-6 border-t border-white/20 space-y-3 text-center">
        {/* Legal Links */}
        <div className="flex items-center justify-center gap-4 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
          <span className="cursor-pointer hover:underline">CONFIDENTIALITÃ‰</span>
          <span className="text-white/40">Â·</span>
          <span className="cursor-pointer hover:underline">CONDITIONS</span>
          <span className="text-white/40">Â·</span>
          <span className="cursor-pointer hover:underline">MENTIONS LÃ‰GALES</span>
        </div>

        <p className="text-[8.5px] font-mono text-white/80 uppercase tracking-widest font-bold">
          Â© {new Date().getFullYear()} KOFFMANN CAPITAL GROUP. TOUS DROITS RÃ‰SERVÃ‰S.
        </p>

        <p className="text-[7.5px] font-mono text-white/60 uppercase tracking-[0.25em]">
          ABIDJAN HQ Â· CÃ”TE D'IVOIRE
        </p>
      </div>

      {/* ================= LEVEL 2 BOTTOM SHEET: CONTACT MODAL ================= */}
      <AnimatePresence>
        {isContactSheetOpen && (
          <div className="fixed inset-0 z-[200] flex flex-col justify-end select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactSheetOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Sheet Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full bg-[#0A0A0A] border-t border-white/15 rounded-t-3xl p-6 space-y-5 text-left max-h-[85vh] overflow-y-auto"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 20px)' }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[7.5px] font-mono text-[#CF1A26] font-bold uppercase tracking-widest block">
                    PROTOCOLE DE CONTACT SOUVERAIN
                  </span>
                  <h3 className="text-base font-display font-black uppercase text-white tracking-tight">
                    Initier un Ã‰change
                  </h3>
                </div>

                <button
                  onClick={() => setIsContactSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-display font-bold uppercase text-white">
                    Protocole Transmis
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    Votre message a Ã©tÃ© acheminÃ© vers le secrÃ©tariat exÃ©cutif de KCG HOUSE.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Category Pills */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'contact' as const, label: 'Contact GÃ©nÃ©ral' },
                      { id: 'partnership' as const, label: 'Partenariat' },
                      { id: 'investment' as const, label: 'Investissement' },
                      { id: 'talent' as const, label: 'Rejoindre KCG' },
                    ].map((pill) => (
                      <button
                        type="button"
                        key={pill.id}
                        onClick={() => setContactSubject(pill.id)}
                        className={`py-2.5 px-3 rounded-xl text-[8.5px] font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                          contactSubject === pill.id
                            ? 'bg-[#CF1A26] text-white'
                            : 'bg-white/5 text-neutral-400 border border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                      Votre Message / Projet
                    </label>
                    <textarea
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="DÃ©crivez l'objet de votre Ã©change avec le groupe KCG..."
                      rows={4}
                      className="w-full p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#CF1A26] resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.99] transition-transform shadow-lg cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmettre au SecrÃ©tariat ExÃ©cutif</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Letter Reader Modal for Saved / Liked letters */}
      <LetterModal
        letter={selectedLetter}
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onSelectLetter={(l) => setSelectedLetter(l)}
      />
    </motion.div>
  );
}
