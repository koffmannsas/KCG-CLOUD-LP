import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Film, TrendingUp, Layers, Building, Heart, ChevronDown, ShieldCheck } from 'lucide-react';
import { kcgSound } from './soundEngine';

interface PillarItem {
  num: string;
  layer: string;
  code: string;
  title: string;
  desc: string;
  mission: string;
  icon: any;
  brands: string[];
  metrics: { label: string; value: string };
}

const PILLARS: PillarItem[] = [
  {
    num: '01',
    layer: 'COUCHE 01 // DIRECTION CULTURELLE',
    code: 'DDD',
    title: 'DIVERTISSEMENT DIVERSIFIÃ‰ & RÃ‰CITS',
    desc: 'Saturer l\'espace culturel panafricain d\'audiovisuel d\'Ã©lite et de rÃ©cits souverains contrecarrant l\'hÃ©gÃ©monie importÃ©e.',
    mission: 'CrÃ©er la mÃ©moire et l\'imaginaire souverain de la Renaissance Africaine.',
    icon: Film,
    brands: ['KCG Mediaâ„¢', 'MAVO', 'Sovereign Wave'],
    metrics: { label: 'IMPACT RÃ‰CITS', value: '84M+ Spectateurs' }
  },
  {
    num: '02',
    layer: 'COUCHE 02 // VÃ‰HICULES DE CAPITAL',
    code: 'DPI',
    title: "PRODUITS D'INVESTISSEMENT & FINTECH",
    desc: 'CrÃ©er et coordonner les vÃ©hicules financiers transnationaux de co-investissement, de compensation UEMOA et de capital-risque.',
    mission: 'Architecturer les vÃ©hicules financiers souverains pour catalyser la croissance industrielle.',
    icon: TrendingUp,
    brands: ['FIKO PAY', 'Sovereign Yieldâ„¢', 'KCG Capitalâ„¢'],
    metrics: { label: 'CAPITAL COORDONNÃ‰', value: '2 400 Mrds FCFA' }
  },
  {
    num: '03',
    layer: 'COUCHE 03 // MATIÃˆRES STRATÃ‰GIQUES',
    code: 'DRN',
    title: 'RESSOURCES NATURELLES & Ã‰NERGIE',
    desc: 'Valoriser les ressources stratÃ©giques nÃ©cessaires Ã  la transformation Ã©conomique durable (Lithium, Cobalt, Micro-rÃ©seaux solaires).',
    mission: 'Stopper l\'exportation de matiÃ¨re brute non raffinÃ©e hors du continent.',
    icon: Layers,
    brands: ['KCG Miningâ„¢', 'Lithium Core', 'Helix Energy'],
    metrics: { label: 'RAFFINAGE LOCAL', value: '840K T/An' }
  },
  {
    num: '04',
    layer: 'COUCHE 04 // CORRIDORS LOGISTIQUES',
    code: 'DMS',
    title: 'MULTI SERVICES & INFRASTRUCTURES',
    desc: 'Fournir les services critiques et les corridors de transmission (fibres optiques, data centers, fret autonome).',
    mission: 'BÃ¢tir le squelette d\'acheminement et de sÃ©curitÃ© transactionnelle globale.',
    icon: Building,
    brands: ['FIKO CONNECT', 'AIRVOO', 'KCG Logistics'],
    metrics: { label: 'EFFICACITÃ‰ CORRIDOR', value: '99.87%' }
  },
  {
    num: '05',
    layer: 'COUCHE 05 // EXÃ‰CUTION & TALENTS',
    code: 'DFC',
    title: 'FONDATION DE CHARITÃ‰ & DÃ‰TECTION',
    desc: 'DÃ©velopper l\'impact social durable, l\'Ã©ducation panafricaine d\'excellence et l\'accÃ¨s aux bourses technologiques d\'Ã©lite.',
    mission: 'Former les 10 000 ingÃ©nieurs et architectes qui administreront les infrastructures de demain.',
    icon: Heart,
    brands: ['KCG Foundation', 'FIKO AI', 'Ã‰lite Tech Africa'],
    metrics: { label: 'BOURSES ATTRIBUÃ‰ES', value: '12,450 RÃ©cipiendaires' }
  }
];

export default function MobileOrganizationPillars() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
    kcgSound.playTactileClick();
  };

  return (
    <section className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8102E]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
          <ShieldCheck className="w-3 h-3 text-[#C8102E]" />
          <span>KCG ARCHITECTURE // LES 5 COUCHES SOUVERAINES</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          La Structure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            Par Laquelle Nous Agissons.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          Chaque direction opÃ©rationnelle fonctionne comme un pilier souverain garantissant l'indÃ©pendance de notre Ã©cosystÃ¨me.
        </p>
      </div>

      {/* Vertical Pillars Accordion / Card List */}
      <div className="space-y-3.5">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={pillar.code}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-[#09090b] border-[#C8102E]/50 shadow-[0_0_20px_rgba(200,16,46,0.15)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              {/* Header Button */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full p-4 flex items-center justify-between text-left select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                      isExpanded
                        ? 'bg-[#C8102E] border-white/20 text-white shadow-[0_0_10px_#C8102E]'
                        : 'bg-black/70 border-white/10 text-neutral-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <span className="text-[7.5px] font-mono font-bold text-[#C8102E] uppercase block">
                      {pillar.layer}
                    </span>
                    <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 transition-transform duration-300 shrink-0 ${
                    isExpanded ? 'rotate-180 bg-[#C8102E]/20 text-[#C8102E]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-5 pt-1 space-y-4 border-t border-white/5 text-left"
                >
                  <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.01] border-l-2 border-[#C8102E] pl-3">
                    <p className="text-[10px] text-neutral-400 font-sans italic font-light">
                      "{pillar.mission}"
                    </p>
                  </div>

                  {/* Sub-brands */}
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.brands.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[8px] font-mono text-neutral-300 border border-white/5"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* KPI Metric */}
                  <div className="p-3 rounded-xl bg-black/80 border border-white/5 flex justify-between items-center font-mono">
                    <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider">
                      {pillar.metrics.label}
                    </span>
                    <span className="text-xs font-bold text-white tracking-wider">
                      {pillar.metrics.value}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
