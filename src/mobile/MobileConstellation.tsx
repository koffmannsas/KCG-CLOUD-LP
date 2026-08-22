import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network,
  Cpu,
  Coins,
  Tv,
  Plane,
  Layers,
  Zap,
  Activity,
  Infinity as InfinityIcon,
  X,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { kcgSound } from './soundEngine';

interface ConstellationNode {
  id: string;
  name: string;
  sector: string;
  category: 'core' | 'ai' | 'fintech' | 'logistics' | 'media' | 'resources';
  tag: string;
  icon: any;
  role: string;
  nourishes: string;
  metrics: { label: string; value: string }[];
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'kcg-core',
    name: 'KCG CORE',
    sector: 'SOUVERAINETÃ‰ GLOBALE',
    category: 'core',
    tag: 'Hub Central',
    icon: Network,
    role: 'Le noyau directeur et stratÃ©gique qui coordonne le dÃ©ploiement du capital et de l\'intelligence technologique.',
    nourishes: 'Irrigue l\'ensemble de l\'Ã©cosystÃ¨me en allouant les liquiditÃ©s de KCG Capital et en orientant les prioritÃ©s souveraines.',
    metrics: [
      { label: 'AUM COORDONNÃ‰', value: '1 500 Mrds FCFA' },
      { label: 'NÅ’UDS INTÃ‰GRÃ‰S', value: '100%' }
    ]
  },
  {
    id: 'fiko-ai',
    name: 'FIKO AI',
    sector: 'INTELLIGENCE ARTIFICIELLE',
    category: 'ai',
    tag: 'SystÃ¨me Cognitif',
    icon: Cpu,
    role: 'Moteur de deep-learning entraÃ®nÃ© localement pour la prÃ©diction financiÃ¨re et l\'optimisation de la chaÃ®ne logistique.',
    nourishes: 'Fournit des modÃ¨les prÃ©dictifs Ã  FIKO PAY (arbitrage) et optimise les couloirs de fret de AIRVOO.',
    metrics: [
      { label: 'MODÃˆLES ACTIFS', value: '14' },
      { label: 'PRÃ‰CISION PRÃ‰DICTIVE', value: '96.8%' }
    ]
  },
  {
    id: 'fiko-pay',
    name: 'FIKO PAY',
    sector: 'FINANCE TECHNIQUE (UEMOA)',
    category: 'fintech',
    tag: 'SystÃ¨me de Paiement',
    icon: Coins,
    role: 'Protocole transactionnel autonome de compensation de liquiditÃ©s et monnaie stable pour contourner les intermÃ©diaires tiers.',
    nourishes: 'Garantit des transactions transfrontaliÃ¨res sans friction pour MAVO et KCG Mining, fluidifiant les flux financiers.',
    metrics: [
      { label: 'VOLUME MENSUEL', value: '90 Mrds FCFA+' },
      { label: 'SÃ‰CURITÃ‰ LEDGER', value: 'AES-256' }
    ]
  },
  {
    id: 'fiko-connect',
    name: 'FIKO CONNECT',
    sector: 'CORRIDORS LOGISTIQUES',
    category: 'logistics',
    tag: 'RÃ©seau de Transmission',
    icon: Network,
    role: 'Squelette logistique et numÃ©rique ouest-africain englobant fibres optiques, data centers et couloirs de fret.',
    nourishes: 'Canal d\'Ã©change haute vitesse pour FIKO PAY et distribution des flux culturels de MAVO.',
    metrics: [
      { label: 'DATA CENTERS', value: '4 Tier III' },
      { label: 'LATENCE', value: '0.04 ms' }
    ]
  },
  {
    id: 'mavo',
    name: 'MAVO',
    sector: 'RÃ‰CITS SOUVERAINS & MÃ‰DIAS',
    category: 'media',
    tag: 'Plateforme Culturelle',
    icon: Tv,
    role: 'Plateforme panafricaine de streaming d\'Ã©lite et de diffusion culturelle contrecarrant l\'influence mÃ©diatique importÃ©e.',
    nourishes: 'Ã‰duque et oriente les talents d\'Afrique vers les bourses d\'Ã©tudes de la Fondation KCG.',
    metrics: [
      { label: 'AUDIENCE MENSUELLE', value: '4.2M' },
      { label: 'CONTENU PROPRE', value: '85%' }
    ]
  },
  {
    id: 'airvoo',
    name: 'AIRVOO',
    sector: 'LOGISTIQUE TRANSNATIONALE',
    category: 'logistics',
    tag: 'Fret Autonome',
    icon: Plane,
    role: 'RÃ©seau de corridors de fret aÃ©riens autonomes et de micro-hubs logistiques connectant les zones enclavÃ©es.',
    nourishes: 'Achemine les minerais critiques raffinÃ©s de KCG Mining vers les hubs portuaires d\'exportation.',
    metrics: [
      { label: 'MICRO-HUBS', value: '12' },
      { label: 'FLOTTE LOGISTIQUE', value: '28' }
    ]
  },
  {
    id: 'kcg-mining',
    name: 'KCG MINING',
    sector: 'RESSOURCES STRATÃ‰GIQUES',
    category: 'resources',
    tag: 'Raffinerie de MÃ©taux',
    icon: Layers,
    role: 'Extraction responsable et raffinage local de mÃ©taux de transition (Lithium, Cobalt) pour stopper l\'exportation de matiÃ¨re brute.',
    nourishes: 'Alimente Helix Energy en matiÃ¨res brutes purifiÃ©es nÃ©cessaires aux batteries industrielles.',
    metrics: [
      { label: 'CAPACITÃ‰ RAFFINAGE', value: '840K T/An' },
      { label: 'VALEUR AJOUTÃ‰E', value: '+400%' }
    ]
  },
  {
    id: 'helix-energy',
    name: 'HELIX ENERGY',
    sector: 'MICRO-RÃ‰SEAUX & Ã‰NERGIE',
    category: 'resources',
    tag: 'Grille Ã‰nergÃ©tique',
    icon: Zap,
    role: 'Micro-rÃ©seaux solaires et stockage par batteries conÃ§us pour alimenter de maniÃ¨re autonome les infrastructures industrielles.',
    nourishes: 'SÃ©curise l\'alimentation Ã©lectrique continue des centres de calcul et des fonderies.',
    metrics: [
      { label: 'PUISSANCE CRÃŠTE', value: '180 MW' },
      { label: 'AUTONOMIE GRILLE', value: '99.99%' }
    ]
  },
  {
    id: 'fgfs-ai',
    name: 'FGFS AI',
    sector: 'MACRO PRÃ‰DICTION FINANCIÃˆRE',
    category: 'ai',
    tag: 'Algorithme Quantique',
    icon: Activity,
    role: 'SystÃ¨me global de prÃ©vision financiÃ¨re simulant les Ã©quilibres macro-Ã©conomiques ouest-africains.',
    nourishes: 'Donne les impulsions de co-investissement au KCG Core pour allouer le capital lÃ  oÃ¹ la productivitÃ© est maximale.',
    metrics: [
      { label: 'SIMULATIONS/SEC', value: '40,000+' },
      { label: 'CORRÃ‰LATION MARCHÃ‰', value: '94.2%' }
    ]
  }
];

export default function MobileConstellation() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [energyPulseActive, setEnergyPulseActive] = useState<boolean>(false);

  const selectedNode = CONSTELLATION_NODES.find((n) => n.id === selectedNodeId);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setEnergyPulseActive(true);
    kcgSound.playTactileClick();

    setTimeout(() => {
      setEnergyPulseActive(false);
    }, 600);
  };

  const filteredNodes = CONSTELLATION_NODES.filter((n) => {
    if (categoryFilter === 'all') return true;
    return n.category === categoryFilter;
  });

  const categories = [
    { id: 'all', label: 'TOUS' },
    { id: 'ai', label: 'IA' },
    { id: 'fintech', label: 'FINTECH' },
    { id: 'logistics', label: 'LOGISTIQUE' },
    { id: 'resources', label: 'RESSOURCES' },
    { id: 'media', label: 'MÃ‰DIAS' }
  ];

  return (
    <section id="mobile-ecosystem" className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Central Radiating Energy Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
          <Network className="w-3 h-3 text-[#C8102E]" />
          <span>KCG CORE // NERVOUS SYSTEM 2.0</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          Le SystÃ¨me Nerveux <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            Des Synergies.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          Chaque plateforme est un nÅ“ud alimentÃ© par le KCG Core. Touchez un nÅ“ud pour dÃ©clencher l'impulsion Ã©nergÃ©tique et rÃ©vÃ©ler son diagnostic.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 mb-6 -mx-5 px-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setCategoryFilter(cat.id);
              kcgSound.playTactileClick();
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-mono text-[8px] uppercase font-bold tracking-wider transition-all shrink-0 ${
              categoryFilter === cat.id
                ? 'bg-white text-black shadow-md'
                : 'bg-white/[0.03] border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Nervous System Nodes */}
      <div className="grid grid-cols-2 gap-3">
        {filteredNodes.map((node) => {
          const Icon = node.icon;
          const isSelected = selectedNodeId === node.id;
          const isCore = node.category === 'core';

          return (
            <motion.button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              whileTap={{ scale: 0.96 }}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[145px] ${
                isCore
                  ? 'col-span-2 bg-gradient-to-r from-[#C8102E]/25 via-[#050505] to-[#C8102E]/15 border-[#C8102E] shadow-[0_0_30px_rgba(200,16,46,0.25)]'
                  : isSelected
                  ? 'bg-white/[0.08] border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              {/* Dynamic Energy Line on selection */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#C8102E]/10 to-transparent pointer-events-none" />
              )}

              {/* Corner Badge */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                    isCore
                      ? 'bg-[#C8102E] border-white/20 text-white shadow-[0_0_12px_#C8102E]'
                      : isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-black/70 border-white/10 text-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest">
                  {node.tag}
                </span>
              </div>

              {/* Title & Sector */}
              <div className="space-y-0.5 mt-3">
                <h4
                  className={`text-sm font-display font-extrabold uppercase tracking-tight ${
                    isCore ? 'text-white text-base' : 'text-white'
                  }`}
                >
                  {node.name}
                </h4>
                <span className="block text-[8px] font-mono text-[#C8102E] font-bold uppercase tracking-wider truncate">
                  {node.sector}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ================= SLIDE-UP BOTTOM DIAGNOSTIC SHEET ================= */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNodeId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-h-[85svh] overflow-y-auto bg-[#09090b] border-t border-white/15 rounded-t-[28px] p-6 space-y-5 shadow-2xl text-left"
              style={{
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)'
              }}
            >
              {/* Grab Handle */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[8px] font-mono text-[#C8102E] uppercase tracking-widest font-black block">
                    {selectedNode.sector}
                  </span>
                  <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                    {selectedNode.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Strategic Mission */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  RÃ”LE STRATÃ‰GIQUE :
                </span>
                <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
                  {selectedNode.role}
                </p>
              </div>

              {/* Formula of Nourishment */}
              <div className="p-3.5 rounded-xl bg-[#C8102E]/[0.06] border border-[#C8102E]/25 space-y-1">
                <span className="text-[8px] font-mono text-[#C8102E] uppercase tracking-widest font-black flex items-center gap-1.5">
                  <InfinityIcon className="w-3 h-3 text-[#C8102E]" />
                  FORMULE DE NOURRICERIE :
                </span>
                <p className="text-xs text-neutral-200 font-sans italic font-light leading-relaxed">
                  "{selectedNode.nourishes}"
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                {selectedNode.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/60 border border-white/5">
                    <span className="block text-[7.5px] text-neutral-500 uppercase">{m.label}</span>
                    <span className="block text-sm font-extrabold text-white mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedNodeId(null)}
                className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <span>Fermer le diagnostic</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
