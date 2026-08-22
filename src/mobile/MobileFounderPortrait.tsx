import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';
// @ts-ignore
import boardroomImg from '@/src/assets/images/kcg_boardroom_1780425890075.png';

export default function MobileFounderPortrait() {
  return (
    <section className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Background Deep Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
          <Compass className="w-3 h-3 text-[#C8102E]" />
          <span>VISION DU FONDATEUR // LEADERSHIP SOUVERAIN</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          La Doctrine <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            D'Ã‰lÃ©vation.
          </span>
        </h2>
      </div>

      {/* Founder Institutional Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#08080a] shadow-2xl p-6 space-y-6">
        {/* Subtle Map/Grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Top Status */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <span className="text-[7.5px] font-mono text-[#C8102E] uppercase tracking-widest font-black block">
              FONDATEUR & PRÃ‰SIDENT-DIRECTEUR GÃ‰NÃ‰RAL
            </span>
            <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
              Paul Koffmann
            </h3>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center text-[#C8102E]">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Cinematic Institutional Portrait Frame */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black">
          <img
            src={boardroomImg}
            alt="Paul Koffmann & Conseil d'Administration KCG"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95"
          />
          {/* Subtle Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[7.5px] font-mono text-neutral-300">
            <span className="font-bold text-white">KCG HOUSE // ABIDJAN HQ</span>
            <span className="text-[#C8102E] font-bold">LEADERSHIP SOUVERAIN</span>
          </div>
        </div>

        {/* Fundamental Declaration */}
        <div className="space-y-3 font-mono">
          <div className="p-4 rounded-2xl bg-white/[0.02] border-l-2 border-[#C8102E] pl-4">
            <p className="text-xs text-neutral-200 font-sans italic font-light leading-relaxed">
              "L'Afrique ne se dÃ©veloppera pas par des aides pÃ©riphÃ©riques ni par l'adoption passive de technologies Ã©trangÃ¨res. Notre devoir historique est d'Ã©riger nous-mÃªmes l'infrastructure industrielle, monÃ©taire et algorithmique qui garantira la libertÃ© de nos gÃ©nÃ©rations futures."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[7.5px] text-neutral-400">
            <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
              <span className="text-neutral-500 uppercase block">Ambition</span>
              <span className="text-white font-bold block mt-0.5">SouverainetÃ© Totale</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
              <span className="text-neutral-500 uppercase block">Horizon</span>
              <span className="text-white font-bold block mt-0.5">Horizon 2030</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
