import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone, MapPin, Globe, Shield, Sparkles } from 'lucide-react';
import { kcgSound } from './soundEngine';

interface MobileFinalCTAProps {
  onContactClick?: () => void;
}

export default function MobileFinalCTA({ onContactClick }: MobileFinalCTAProps) {
  const handleAction = () => {
    kcgSound.playTactileClick();
    if (onContactClick) {
      onContactClick();
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section className="py-24 px-5 bg-black text-white select-none relative overflow-hidden text-center">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-sm mx-auto">
        {/* ================= 1. SYSTEM CONVERGENCE SILENCE ================= */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.35em] text-neutral-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-ping" />
          <span>KCG // CONVERGENCE FINALE</span>
        </div>

        {/* ================= 2. MONUMENTAL CLOSING DECLARATION ================= */}
        <div className="space-y-3">
          <h2
            className="font-display font-medium uppercase tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(2.2rem, 9.5vw, 3.8rem)' }}
          >
            <span className="block font-light text-neutral-300">BÃ¢tissons</span>
            <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E]">
              L'Afrique
            </span>
            <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] via-red-400 to-white italic">
              De Demain,
            </span>
            <span className="block font-light text-white text-2xl tracking-widest mt-1">
              ENSEMBLE.
            </span>
          </h2>

          <p className="text-xs text-neutral-400 font-light leading-relaxed px-2">
            Rejoignez l'infrastructure de commandement. Engagez le dialogue avec la direction exÃ©cutive pour vos partenariats institutionnels ou co-investissements.
          </p>
        </div>

        {/* ================= 3. PRIMARY ACTION TRIGGER ================= */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleAction}
            className="w-full py-4 px-6 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 active:scale-95 transition-all shadow-[0_10px_30px_rgba(200,16,46,0.3)] border border-white"
          >
            <span className="whitespace-nowrap">Initier un Protocole de Contact</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <a
            href="mailto:contact@koffmanncapitalgroup.com"
            className="block py-3 px-6 rounded-full bg-white/[0.03] border border-white/10 text-white font-mono text-[9px] uppercase tracking-widest active:scale-95 transition-all hover:bg-white/5"
          >
            contact@koffmanncapitalgroup.com
          </a>
        </div>

        {/* ================= 4. ETERNAL KCG SOVEREIGN SEAL ================= */}
        <div className="pt-12 flex flex-col items-center space-y-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Orbital Ring Around Calm KCG */}
            <svg viewBox="0 0 280 280" className="w-full h-full animate-[spin_40s_linear_infinite] pointer-events-none">
              <defs>
                <path
                  id="finalSealCirclePath"
                  d="M 140, 140 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                  fill="none"
                />
              </defs>
              <circle
                cx="140"
                cy="140"
                r="100"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <text className="text-[12px] uppercase tracking-[0.24em] font-sans fill-white/80 font-medium">
                <textPath href="#finalSealCirclePath" startOffset="0%">
                  KOFFMANN CAPITAL GROUP â€¢ KOFFMANN CAPITAL GROUP â€¢&nbsp;
                </textPath>
              </text>
            </svg>

            {/* Quiet Center Monogram */}
            <div className="absolute w-16 h-16 rounded-full bg-black/90 border border-white/20 flex items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0d7c51f1-ae14-4826-9438-98688980178c"
                alt="KCG Seal"
                className="w-9 h-9 object-contain"
              />
            </div>
          </div>

          <div className="space-y-1 font-mono text-[7.5px] text-neutral-500">
            <span className="block font-bold text-neutral-400">
              KCG HOUSE // SIÃˆGE MONDIAL CERTIFIÃ‰
            </span>
            <span className="block">
              ABIDJAN, CÃ”TE D'IVOIRE â€¢ 5.361243Â° N, 3.957746Â° W
            </span>
            <span className="block text-[#C8102E] mt-1">
              Â© {new Date().getFullYear()} KOFFMANN CAPITAL GROUP S.A.S. TOUS DROITS RÃ‰SERVÃ‰S.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
