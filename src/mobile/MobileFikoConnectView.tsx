import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Bot,
  Layers,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Workflow
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import ProductLaunchModal from '../components/ProductLaunchModal';

export default function MobileFikoConnectView() {
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
    <div id="fiko-connect-mobile-container" className="w-full h-auto bg-black text-white px-4 sm:px-5 pt-20 flex flex-col text-left relative space-y-7 selection:bg-[#25D366] selection:text-black">

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
          <span className="px-2 py-0.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[8px] font-mono text-[#25D366] tracking-widest uppercase font-bold">
            CONVERSATIONAL INFRASTRUCTURE
          </span>
        </div>
      </div>

      {/* ================= 1. HERO â€” CLARTÃ‰, CONVERSATION & CONVERSION ================= */}
      <section data-product-section="hero" className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em] font-bold">
            FIKO CONNECT // KCG ECOSYSTEM
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase leading-[0.95] text-white">
            VOS CONVERSATIONS<br />
            <span className="text-[#25D366]">DEVIENNENT INTELLIGENTES.</span>
          </h1>
          <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-sm pt-1">
            Connectez votre entreprise Ã  vos clients et transformez chaque conversation en opportunitÃ©.
          </p>
        </div>
      </section>

      {/* ================= 2. MÃ‰TAPHORE VISUELLE DU FLUX ================= */}
      <section data-product-section="metaphore" className="p-4 rounded-2xl bg-[#090b0a] border border-[#25D366]/30 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <span className="text-[8px] font-mono text-[#25D366] uppercase font-bold tracking-widest">
            MÃ‰TAPHORE D'EXÃ‰CUTION
          </span>
          <Workflow className="w-3.5 h-3.5 text-[#25D366]" />
        </div>

        {/* Dynamic Connected Pipeline */}
        <div className="flex flex-col space-y-1.5 text-xs font-mono">
          {[
            { label: 'ENTREPRISE', sub: 'Canaux Officiels & WhatsApp Business API', color: 'text-white' },
            { label: 'FIKO CONNECT', sub: 'Infrastructure d\'interconnexion temps rÃ©el', color: 'text-[#25D366]' },
            { label: 'CONVERSATIONS', sub: 'Flux de messages et requÃªtes clients 24/7', color: 'text-white' },
            { label: 'FIKO INTELLIGENCE', sub: 'Qualification contextuelle et mÃ©moire souveraine', color: 'text-[#CF1A26]' },
            { label: 'ACTION & CONVERSION', sub: 'Vente, commande validÃ©e, routage opÃ©rationnel', color: 'text-[#25D366]' },
          ].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="p-2 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-bold block ${step.color}`}>{step.label}</span>
                  <span className="text-[8px] text-neutral-400 font-sans block">{step.sub}</span>
                </div>
                <span className="text-[8px] text-neutral-500 font-mono">0{idx + 1}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex justify-center -my-0.5">
                  <span className="text-neutral-600 text-[10px]">â†“</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ================= 3. LES 5 FONCTIONS CLÃ‰S ================= */}
      <section data-product-section="fonctions" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            LES 5 FONCTIONS CLÃ‰S
          </span>
          <span className="text-[8px] font-mono text-[#25D366] uppercase">5 PILIERS</span>
        </div>

        <div className="space-y-2">
          {[
            {
              num: '01',
              title: 'CONNECT',
              sub: 'Connecter l\'entreprise Ã  ses clients.',
              desc: 'Vos canaux officiels (notamment WhatsApp Business) deviennent directement accessibles Ã  une infrastructure intelligente.'
            },
            {
              num: '02',
              title: 'UNDERSTAND',
              sub: 'Comprendre le contexte des conversations.',
              desc: 'Chaque conversation est analysÃ©e en temps rÃ©el avec comprÃ©hension des besoins, de l\'historique et des intentions.'
            },
            {
              num: '03',
              title: 'ENGAGE',
              sub: 'Interagir intelligemment.',
              desc: 'RÃ©ponses instantanÃ©es, personnalisÃ©es et pertinentes sans interruption de service.'
            },
            {
              num: '04',
              title: 'CONVERT',
              sub: 'Transformer les conversations en opportunitÃ©s.',
              desc: 'Qualification commerciale, prise de commande, encaissement direct et prise de rendez-vous dans le fil de discussion.'
            },
            {
              num: '05',
              title: 'ORCHESTRATE',
              sub: 'Permettre Ã  l\'intelligence d\'agir.',
              desc: 'DÃ©clenchement automatisÃ© des processus internes : stocks, logistique, CRM et escalade humaine transparente.'
            }
          ].map((fn) => (
            <div key={fn.num} className="p-3.5 rounded-2xl bg-[#0e0e11] border border-white/[0.08] space-y-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-black text-white uppercase tracking-tight">
                  {fn.num} â€” {fn.title}
                </span>
                <span className="text-[7.5px] font-mono text-[#25D366] font-bold uppercase">ACTIF</span>
              </div>
              <p className="text-[11px] font-medium text-[#25D366]">
                {fn.sub}
              </p>
              <p className="text-[11px] text-neutral-300 font-light leading-relaxed pt-0.5">
                {fn.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. PROMINENT LAUNCH CTA ================= */}
      <section data-product-section="cta" className="pt-2 space-y-3">
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#120608] to-[#08080a] border border-[#C8102E]/30 text-center space-y-3 shadow-2xl">
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block">
            FIKO CONNECT // LANCEMENT OFFICIEL EN PRÃ‰PARATION
          </span>
          <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
            ACCÃ‰DER AUX PREMIÃˆRES INFORMATIONS
          </h3>
          <p className="text-[11px] text-neutral-300 max-w-xs mx-auto leading-relaxed">
            Le lancement officiel approche. Soyez parmi les premiers prÃ©venus dÃ¨s l'ouverture de l'infrastructure.
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenLaunchModal}
              className="w-full min-h-[56px] py-4 px-4 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-extrabold text-[12px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all cursor-pointer leading-snug"
            >
              <span>SOYEZ INFORMÃ‰ DU LANCEMENT OFFICIEL DE FIKO CONNECT</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 5. FIKO CONNECT SCROLL END MARKER ================= */}
      <div
        id="fiko-connect-scroll-end"
        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-500 font-mono text-[8px] text-center tracking-[0.25em] uppercase flex items-center justify-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
        <span>FIKO CONNECT // CONVERSATIONAL PROTOCOL SECURED</span>
      </div>

      {/* ================= 6. PRODUCT LAUNCH NOTIFICATION MODAL ================= */}
      <ProductLaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        product="fiko-connect"
        source="kcg-mobile-os"
      />

      {/* ================= 7. BOTTOM SAFE AREA BUFFER ================= */}
      <div
        className="w-full pointer-events-none"
        style={{ height: 'calc(100px + max(env(safe-area-inset-bottom, 0px), 16px))' }}
        aria-hidden="true"
      />
    </div>
  );
}
