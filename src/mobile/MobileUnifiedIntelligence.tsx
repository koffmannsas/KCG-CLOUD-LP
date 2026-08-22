import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Users, TrendingUp, Compass, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { kcgSound } from './soundEngine';

interface IntelligenceStream {
  id: string;
  num: string;
  title: string;
  type: string;
  desc: string;
  formula: string;
  metrics: { label: string; value: string };
  icon: any;
}

const INTELLIGENCE_STREAMS: IntelligenceStream[] = [
  {
    id: 'human',
    num: '01',
    title: 'INTELLIGENCE HUMAINE & TALENTS',
    type: 'HUMAN COGNITION',
    desc: 'L\'Ã©lite panafricaine des ingÃ©nieurs, mathÃ©maticiens et bÃ¢tisseurs d\'infrastructures formÃ©s par la Fondation KCG.',
    formula: 'DÃ©tection prÃ©coce des 0.01% de talents technologiques via Talentiumâ„¢.',
    metrics: { label: 'TALENTS SOUTENUS', value: '12 450+' },
    icon: Users
  },
  {
    id: 'artificial',
    num: '02',
    title: 'INTELLIGENCE ARTIFICIELLE ENDOGÃˆNE',
    type: 'ALGORITHMIC COGNITION',
    desc: 'RÃ©seaux neuronaux et modÃ¨les locaux (FIKO AI, KRYPTON) entraÃ®nÃ©s sur les spÃ©cificitÃ©s Ã©conomiques et gÃ©ographiques africaines.',
    formula: 'Suppression des biais des modÃ¨les importÃ©s pour un arbitrage exact.',
    metrics: { label: 'PRÃ‰CISION ARBITRAGE', value: '96.8%' },
    icon: Cpu
  },
  {
    id: 'capital',
    num: '03',
    title: 'INTELLIGENCE DU CAPITAL SOUVERAIN',
    type: 'FINANCIAL COGNITION',
    desc: 'MÃ©canismes d\'allocation de liquiditÃ©s, de compensation UEMOA (FIKO PAY) et de co-investissement transnational.',
    formula: 'RÃ©tention de la valeur ajoutÃ©e sur le sol africain.',
    metrics: { label: 'LIQUIDATION COMPENSÃ‰E', value: '90 Mrds FCFA' },
    icon: TrendingUp
  },
  {
    id: 'strategic',
    num: '04',
    title: 'INTELLIGENCE STRATÃ‰GIQUE & SOUVERAINETÃ‰',
    type: 'STRATEGIC ARCHITECTURE',
    desc: 'La vision stratÃ©gique Horizon 2030 de Paul Koffmann orchestrant la fusion des corridors de transport, de l\'Ã©nergie et des mÃ©taux critiques.',
    formula: 'IndÃ©pendance structurelle des infrastructures vitales.',
    metrics: { label: 'HORIZON TEMPOREL', value: 'Horizon 2030' },
    icon: Compass
  }
];

export default function MobileUnifiedIntelligence() {
  const [activeStreamId, setActiveStreamId] = useState<string>('artificial');
  const activeStream = INTELLIGENCE_STREAMS.find((s) => s.id === activeStreamId) || INTELLIGENCE_STREAMS[1];

  const handleSelect = (id: string) => {
    setActiveStreamId(id);
    kcgSound.playTactileClick();
  };

  return (
    <section className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Glow Center */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
          <Zap className="w-3 h-3 text-[#C8102E]" />
          <span>CONVERGENCE DES 4 FLUX COGNITIFS</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          Intelligence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            UnifiÃ©e.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          Quatre formes d'intelligence convergent vers le systÃ¨me nerveux central KCG pour former une matrice dÃ©cisionnelle autonome.
        </p>
      </div>

      {/* 4 Convergence Nodes Selector */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {INTELLIGENCE_STREAMS.map((st) => {
          const Icon = st.icon;
          const isSelected = activeStreamId === st.id;

          return (
            <button
              key={st.id}
              onClick={() => handleSelect(st.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-gradient-to-br from-[#C8102E]/20 via-black to-[#C8102E]/10 border-[#C8102E] shadow-[0_0_20px_rgba(200,16,46,0.25)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#C8102E] border-white/20 text-white'
                      : 'bg-black/60 border-white/10 text-neutral-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[7.5px] font-mono text-neutral-500 font-bold">
                  FLUX {st.num}
                </span>
              </div>

              <div className="mt-2">
                <span className="block text-[8px] font-mono text-[#C8102E] font-bold uppercase tracking-wider">
                  {st.type}
                </span>
                <span className="block text-xs font-display font-extrabold text-white uppercase tracking-tight truncate">
                  {st.title.split(' ')[0]} {st.title.split(' ')[1]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stream Deep Analysis Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStream.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-5 rounded-2xl bg-[#08080a] border border-white/10 space-y-4 font-mono"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div>
              <span className="text-[7.5px] text-[#C8102E] uppercase tracking-widest font-black block">
                FLUX {activeStream.num} // {activeStream.type}
              </span>
              <h3 className="text-sm font-display font-black text-white tracking-tight uppercase">
                {activeStream.title}
              </h3>
            </div>
            <span className="text-[7.5px] px-2 py-0.5 rounded bg-white/5 text-neutral-400">
              SYNCRONISÃ‰
            </span>
          </div>

          <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
            {activeStream.desc}
          </p>

          <div className="p-3 rounded-xl bg-[#C8102E]/[0.05] border-l-2 border-[#C8102E] pl-3">
            <span className="text-[7.5px] text-[#C8102E] uppercase tracking-widest font-black block mb-0.5">
              AXIOME OPÃ‰RATIONNEL :
            </span>
            <p className="text-[10px] text-neutral-200 font-sans italic font-light">
              "{activeStream.formula}"
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/70 border border-white/5 flex justify-between items-center text-[8px]">
            <span className="text-neutral-400 uppercase tracking-wider">
              {activeStream.metrics.label}
            </span>
            <span className="text-xs font-bold text-white tracking-wider">
              {activeStream.metrics.value}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
