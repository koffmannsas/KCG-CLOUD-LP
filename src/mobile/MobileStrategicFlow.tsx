import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  LineChart,
  Cpu,
  MapPin,
  ArrowDown,
  CornerDownRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { kcgSound } from './soundEngine';

interface StrategicNode {
  city: string;
  country: string;
  role: string;
  tag: string;
  status: string;
  metrics: { label: string; value: string };
  desc: string;
}

const STRATEGIC_NODES: StrategicNode[] = [
  {
    city: 'DAKAR',
    country: 'SÃ©nÃ©gal',
    role: 'DMS Hub & Centre TÃ©lÃ©coms',
    tag: 'NÅ’UD 01',
    status: 'OPTIMAL (99.9%)',
    metrics: { label: 'DÃ‰BIT TRANSACTIONNEL', value: '14.2K tx/s' },
    desc: 'Passerelle stratÃ©gique atlantique assurant l\'interconnexion des cÃ¢bles sous-marins et les nÅ“uds de calcul primaire.'
  },
  {
    city: 'ABIDJAN',
    country: "CÃ´te d'Ivoire",
    role: 'Port Transit & KCG HOUSE (HQ)',
    tag: 'NÅ’UD 02 (SIÃˆGE OUVERT)',
    status: 'COMMANDEMENT HQ',
    metrics: { label: 'LATENCE INTER-NODALE', value: '0.004 ms' },
    desc: 'Ã‰picentre souverain de KCG, supervisant l\'arbitrage macroÃ©conomique, la logistique de fret et les fonds stratÃ©giques.'
  },
  {
    city: 'LAGOS',
    country: 'NigÃ©ria',
    role: 'Fintech Gate & LiquiditÃ©s',
    tag: 'NÅ’UD 03',
    status: 'ACTIF (LIQUIDITY)',
    metrics: { label: 'COMPENSATION MENSUELLE', value: '90 Mrds FCFA' },
    desc: 'Corridor d\'expansion monÃ©taire reliant les Ã©cosystÃ¨mes anglophones et francophones de la CEDEAO.'
  }
];

export default function MobileStrategicFlow() {
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(1); // Default Abidjan HQ
  const [activeTab, setActiveTab] = useState<'logistics' | 'finance' | 'agriculture'>('logistics');
  const [simulationLog, setSimulationLog] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulate = (command: string, desc: string, result: string) => {
    if (isSimulating) return;
    setIsSimulating(true);
    kcgSound.playTactileClick();
    setSimulationLog(`> ExÃ©cution : ${desc}...`);

    setTimeout(() => {
      setSimulationLog(`[SUCCÃˆS] ${result}`);
      setIsSimulating(false);
      kcgSound.playSignalPing(580);
    }, 1100);
  };

  const handleSelectNode = (idx: number) => {
    setActiveNodeIdx(idx);
    kcgSound.playTactileClick();
  };

  const handleTabChange = (tab: 'logistics' | 'finance' | 'agriculture') => {
    setActiveTab(tab);
    kcgSound.playTactileClick();
  };

  const activeNode = STRATEGIC_NODES[activeNodeIdx];

  return (
    <section id="mobile-strategic-flow" className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8102E]/10 border border-[#C8102E]/20 text-[8px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-black">
          <Activity className="w-3 h-3" />
          <span>SOUVERAINETÃ‰ DES MODÃˆLES LOCAUX</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          Le Corridor <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            StratÃ©gique Autonome.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          Nous connectons les nÅ“uds nÃ©vralgiques de l'Afrique de l'Ouest par une ligne d'Ã©nergie cybernÃ©tique continue, supprimant les latences humaines et physiques.
        </p>
      </div>

      {/* ================= VERTICAL STRATEGIC CORRIDOR ================= */}
      <div className="space-y-3 my-8">
        <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-3">
          SÃ‰LECTIONNER UN NÅ’UD POUR DÃ‰CODER LA TÃ‰LÃ‰MÃ‰TRIE :
        </span>

        <div className="relative pl-6 space-y-4">
          {/* Continuous Red Glowing Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C8102E] via-white/40 to-[#C8102E] shadow-[0_0_8px_#C8102E]" />

          {STRATEGIC_NODES.map((node, idx) => {
            const isSelected = activeNodeIdx === idx;
            return (
              <div key={node.city} className="relative">
                {/* Node Dot / Indicator */}
                <button
                  onClick={() => handleSelectNode(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#C8102E]/15 to-transparent border-[#C8102E]/60 shadow-[0_0_20px_rgba(200,16,46,0.2)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Circle on the line */}
                  <div
                    className={`absolute -left-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#C8102E] border-white scale-125 shadow-[0_0_12px_#C8102E]'
                        : 'bg-black border-white/40'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-neutral-500'}`} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-display font-extrabold tracking-tight uppercase text-white">
                          {node.city}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400">({node.country})</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-sans font-light block mt-0.5">
                        {node.role}
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span
                        className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                          isSelected
                            ? 'bg-[#C8102E] text-white'
                            : 'bg-white/5 text-neutral-400'
                        }`}
                      >
                        {node.tag}
                      </span>
                      <span className="block text-[8px] text-green-400 mt-1">{node.status}</span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Micro Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.city}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono"
          >
            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-2">
              <span className="text-neutral-400">NÅ’UD ACTIF : {activeNode.city}</span>
              <span className="text-[#C8102E] font-bold">{activeNode.status}</span>
            </div>

            <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {activeNode.desc}
            </p>

            <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 flex justify-between items-center">
              <span className="text-[8px] text-neutral-400 uppercase tracking-wider">
                {activeNode.metrics.label}
              </span>
              <span className="text-xs font-bold text-white tracking-wider">
                {activeNode.metrics.value}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= DATA CINEMA 2.0 : MONUMENTAL FIGURES ================= */}
      <div className="mt-12 space-y-6">
        <div className="space-y-1">
          <span className="text-[8px] font-mono text-[#C8102E] uppercase tracking-[0.3em] font-black block">
            DATA CINEMA 2.0 // EVENTS OPÃ‰RATIONNELS
          </span>
          <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white">
            MÃ©triques d'Impact en Temps RÃ©el
          </h3>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.02] rounded-xl border border-white/5">
          {[
            { id: 'logistics', label: 'LOGISTIQUE', icon: Activity },
            { id: 'finance', label: 'FINANCE', icon: LineChart },
            { id: 'agriculture', label: 'AGRO', icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 font-mono text-[8px] uppercase font-bold tracking-wider transition-all ${
                  isSelected
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Data Events */}
        <AnimatePresence mode="wait">
          {activeTab === 'logistics' && (
            <motion.div
              key="tab-logistics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-[#08080a] border border-white/10 space-y-4 font-mono"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[8.5px] text-[#C8102E] font-bold uppercase tracking-widest">
                  CORRIDOR ACTIF // DELTA-7
                </span>
                <span className="text-[8px] text-green-400">OPTIMISÃ‰ PAR IA</span>
              </div>

              {/* Monumental Impact Figure */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/5 text-center space-y-1">
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">
                  GAIN DE TRANSIT CARGO (ABIDJAN-DAKAR)
                </span>
                <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] block">
                  -4.2 HEURES
                </span>
                <span className="text-[8px] text-neutral-400 block font-sans font-light">
                  Suppression des temps de blocage portuaires par routing intelligent.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Alerte Embouteillage</span>
                  <span className="block text-xs font-bold text-white mt-0.5">0.1% Friction</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Fret Drone AIRVOO</span>
                  <span className="block text-xs font-bold text-green-400 mt-0.5">Actif (Corridor N-2)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div
              key="tab-finance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-[#08080a] border border-white/10 space-y-4 font-mono"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[8.5px] text-[#C8102E] font-bold uppercase tracking-widest">
                  COMPENSATION UEMOA // FIKO PAY
                </span>
                <span className="text-[8px] text-green-400">LEDGER 99.999%</span>
              </div>

              {/* Monumental Impact Figure */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/5 text-center space-y-1">
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">
                  VOLUME MENSUEL COMPENSÃ‰
                </span>
                <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] block">
                  90 MRDS FCFA
                </span>
                <span className="text-[8px] text-neutral-400 block font-sans font-light">
                  RÃ¨glement instantanÃ© inter-fiat sans passer par les banques correspondantes tierces.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Latence Inter-fiat</span>
                  <span className="block text-xs font-bold text-white mt-0.5">0.004 ms</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Chiffrement</span>
                  <span className="block text-xs font-bold text-white mt-0.5">Multi-sig AES-256</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'agriculture' && (
            <motion.div
              key="tab-agriculture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-[#08080a] border border-white/10 space-y-4 font-mono"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[8.5px] text-[#C8102E] font-bold uppercase tracking-widest">
                  BIOCLIMATIQUE // CÃ”TE D'IVOIRE & GHANA
                </span>
                <span className="text-[8px] text-green-400">RÃ‰COLTE OPTIMALE</span>
              </div>

              {/* Monumental Impact Figure */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/5 text-center space-y-1">
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">
                  GAIN DE RENDEMENT AGRO-INDUSTRIEL
                </span>
                <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] block">
                  +28.4%
                </span>
                <span className="text-[8px] text-neutral-400 block font-sans font-light">
                  PrÃ©cision hygromÃ©trique pilotÃ©e par capteurs IoT et IA KRYPTON.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Risque SÃ©cheresse</span>
                  <span className="block text-xs font-bold text-white mt-0.5">1.4% (ContrÃ´lÃ©)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                  <span className="block text-[7.5px] text-neutral-500 uppercase">Micro-irrigation</span>
                  <span className="block text-xs font-bold text-green-400 mt-0.5">Automatique</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cognitive Simulation Directives */}
        <div className="p-4.5 rounded-2xl bg-black/90 border border-white/10 space-y-3 font-mono">
          <span className="text-[8px] text-neutral-400 uppercase tracking-widest block font-bold">
            TESTER LE NOYAU COGNITIF (SIMULATION DIRECTE) :
          </span>

          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                handleSimulate(
                  '/run_drought_simulation',
                  'Simulation SÃ©cheresse Cacao',
                  'Corridor Delta-3 ajustÃ© vers Abidjan. Gain transit : -4.2h.'
                )
              }
              disabled={isSimulating}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-[8.5px] text-neutral-300 flex items-center gap-2 active:scale-98 transition-all"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Simuler SÃ©cheresse (Agro)</span>
            </button>

            <button
              onClick={() =>
                handleSimulate(
                  '/optimize_liquidity_settlement',
                  'Compensation LiquiditÃ© XOF',
                  'Throughput augmentÃ© (+34.1%). Latence : 0.004ms.'
                )
              }
              disabled={isSimulating}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-[8.5px] text-neutral-300 flex items-center gap-2 active:scale-98 transition-all"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Compacter LiquiditÃ©s (Fintech)</span>
            </button>

            <button
              onClick={() =>
                handleSimulate(
                  '/trigger_air_cargo_shuttle',
                  'Fret Drone AIRVOO',
                  'Flotte AIRVOO Drone-08 calÃ©e sur corridor Lithium.'
                )
              }
              disabled={isSimulating}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-[8.5px] text-neutral-300 flex items-center gap-2 active:scale-98 transition-all"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Activer Fret Drone AIRVOO</span>
            </button>
          </div>

          {simulationLog && (
            <div className="p-2.5 rounded-lg bg-black border border-[#C8102E]/30 text-[8.5px] text-[#C8102E] animate-pulse">
              {simulationLog}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
