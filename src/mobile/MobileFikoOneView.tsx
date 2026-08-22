import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Smartphone,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Search,
  Users,
  Compass,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import ProductLaunchModal from '../components/ProductLaunchModal';

export default function MobileFikoOneView() {
  const { setActiveTab } = useMobileOSStore();
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);

  const handleBack = () => {
    kcgSound.playTactileClick();
    setActiveTab('core');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleOpenLaunchModal = () => {
    kcgSound.playTactileClick();
    setIsLaunchModalOpen(true);
  };

  return (
    <div id="fiko-one-mobile-container" className="w-full h-auto bg-black text-white px-4 sm:px-5 pt-20 flex flex-col text-left relative space-y-7 selection:bg-white selection:text-black">

      {/* ================= TOP PRODUCT NAVIGATION BAR ================= */}
      <div className="flex items-center justify-between py-1 border-b border-white/[0.08]">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 py-1.5 px-2.5 -ml-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-xs font-mono text-neutral-300 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-white" />
          <span className="tracking-wider uppercase text-[10px] font-bold">Ã‰COSYSTÃˆME</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[8px] font-mono text-neutral-200 tracking-widest uppercase font-bold">
            ON DEMAND PLATFORM
          </span>
        </div>
      </div>

      {/* ================= 1. HERO â€” MONUMENTAL, SOMBRE, MYSTÃ‰RIEUX ================= */}
      <section data-product-section="hero" className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em] font-bold">
            FIKO ONE // KCG ECOSYSTEM
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase leading-[0.95] text-white">
            LE SERVICE,<br />
            <span className="text-neutral-400">Ã€ LA DEMANDE.</span>
          </h1>
          <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm pt-1">
            Une nouvelle gÃ©nÃ©ration de plateformes qui connectent l'offre et la demande.
          </p>
        </div>

        {/* Visual Accent Surface */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-neutral-900/90 to-black border border-white/[0.12] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
            <span>POSITIONNEMENT MAÃŽTRE</span>
            <span>01 / 04</span>
          </div>
          <p className="text-sm sm:text-base font-display font-medium text-white tracking-tight leading-snug">
            "Connecter ceux qui demandent.<br />
            Ã€ ceux qui savent faire."
          </p>
        </div>
      </section>

      {/* ================= 2. NARRATION : 01 LE BESOIN ================= */}
      <section data-product-section="besoin" className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/[0.08] space-y-2 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            01 // LE BESOIN
          </span>
          <Search className="w-3.5 h-3.5 text-neutral-400" />
        </div>
        <h2 className="text-base font-display font-bold text-white uppercase tracking-tight">
          Quelqu'un cherche un service.
        </h2>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          Chaque jour, des milliers de besoins quotidiens ou spÃ©cialisÃ©s naissent instantanÃ©ment. La friction rÃ©side dans l'accÃ¨s immÃ©diat Ã  des compÃ©tences vÃ©rifiÃ©es et disponibles.
        </p>
      </section>

      {/* ================= 3. NARRATION : 02 LA CONNEXION ================= */}
      <section data-product-section="connexion" className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/[0.08] space-y-2 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            02 // LA CONNEXION
          </span>
          <Users className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-base font-display font-bold text-white uppercase tracking-tight">
          Le rapprochement immÃ©diat.
        </h2>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          FIKO ONE rapproche la demande des prestataires capables d'y rÃ©pondre, en supprimant les intermÃ©diaires superflus et les dÃ©lais d'attente.
        </p>
      </section>

      {/* ================= 4. NARRATION : 03 L'EXPÃ‰RIENCE ================= */}
      <section data-product-section="experience" className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/[0.08] space-y-2 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            03 // L'EXPÃ‰RIENCE
          </span>
          <Zap className="w-3.5 h-3.5 text-neutral-200" />
        </div>
        <h2 className="text-base font-display font-bold text-white uppercase tracking-tight">
          Fluide, rapide, accessible.
        </h2>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          Une plateforme pensÃ©e pour rendre la mise en relation simple, sÃ©curisÃ©e et instantanÃ©e, calibrÃ©e pour les rÃ©alitÃ©s du terrain et les exigences de fiabilitÃ©.
        </p>
      </section>

      {/* ================= 5. NARRATION : 04 LA VISION ================= */}
      <section data-product-section="vision" className="p-5 rounded-2xl bg-gradient-to-b from-[#141416] to-[#08080a] border border-white/[0.14] space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-white uppercase tracking-widest font-bold">
            04 // LA VISION
          </span>
          <Compass className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-lg font-display font-bold text-white uppercase tracking-tight leading-snug">
          Une nouvelle gÃ©nÃ©ration de marketplaces on demand.
        </h2>
        <div className="py-2 border-y border-white/[0.08] space-y-1">
          <div className="text-xs font-mono text-white font-bold tracking-wider">
            â€¢ UNE PLATEFORME.
          </div>
          <div className="text-xs font-mono text-white font-bold tracking-wider">
            â€¢ DES SERVICES.
          </div>
          <div className="text-xs font-mono text-white font-bold tracking-wider">
            â€¢ UNE CONNEXION.
          </div>
        </div>
        <p className="text-xs text-neutral-300 font-light italic">
          DÃ©couvrez ce qui arrive.
        </p>
      </section>

      {/* ================= 6. PROMINENT LAUNCH CTA ================= */}
      <section data-product-section="cta" className="pt-2 space-y-3">
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#120608] to-[#08080a] border border-[#C8102E]/30 text-center space-y-3 shadow-2xl">
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block">
            FIKO ONE // LANCEMENT OFFICIEL EN PRÃ‰PARATION
          </span>
          <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
            ACCÃ‰DER AUX PREMIÃˆRES INFORMATIONS
          </h3>
          <p className="text-[11px] text-neutral-300 max-w-xs mx-auto leading-relaxed">
            Le lancement officiel approche. Soyez parmi les premiers prÃ©venus dÃ¨s l'ouverture de la plateforme.
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenLaunchModal}
              className="w-full min-h-[56px] py-4 px-4 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-extrabold text-[12px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all cursor-pointer leading-snug"
            >
              <span>SOYEZ INFORMÃ‰ DU LANCEMENT OFFICIEL DE FIKO ONE</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 7. FIKO ONE SCROLL END MARKER ================= */}
      <div
        id="fiko-one-scroll-end"
        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-500 font-mono text-[8px] text-center tracking-[0.25em] uppercase flex items-center justify-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span>FIKO ONE // ON DEMAND PROTOCOL SECURED</span>
      </div>

      {/* ================= 8. PRODUCT LAUNCH NOTIFICATION MODAL ================= */}
      <ProductLaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        product="fiko-one"
        source="kcg-mobile-os"
      />

      {/* ================= 9. BOTTOM SAFE AREA BUFFER ================= */}
      <div
        className="w-full pointer-events-none"
        style={{ height: 'calc(100px + max(env(safe-area-inset-bottom, 0px), 16px))' }}
        aria-hidden="true"
      />
    </div>
  );
}
