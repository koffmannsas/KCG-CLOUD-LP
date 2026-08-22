import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Activity, Zap, Shield, ChevronRight, CornerDownRight } from 'lucide-react';
import { kcgSound } from './soundEngine';

interface MapNode {
  id: string;
  name: string;
  country: string;
  status: 'HQ_OPEN' | 'FUTURE_OPENING';
  x: number; // Percent on SVG map (0-100)
  y: number; // Percent on SVG map (0-100)
  role: string;
  bandwidth: string;
  description: string;
}

const STRATEGIC_HUBS: MapNode[] = [
  {
    id: 'abidjan',
    name: 'ABIDJAN (KCG HOUSE)',
    country: "CÃ´te d'Ivoire",
    status: 'HQ_OPEN',
    x: 38,
    y: 54,
    role: 'SIÃˆGE MONDIAL & CÅ’UR OPÃ‰RATIONNEL',
    bandwidth: 'LATENCE : 0.004 ms',
    description: 'Ã‰picentre dÃ©cisionnel et technologique ouvert. Supervision de l\'intelligence macroÃ©conomique et coordination des corridors industriels.'
  },
  {
    id: 'dakar',
    name: 'DAKAR',
    country: 'SÃ©nÃ©gal',
    status: 'FUTURE_OPENING',
    x: 22,
    y: 46,
    role: 'HUB DMS & PASSAGE ATLANTIQUE',
    bandwidth: 'CÃ‚BLES SOUS-MARINS',
    description: 'Passerelle stratÃ©gique atlantique connectant les data centers de transit aux rÃ©seaux intercontinentaux.'
  },
  {
    id: 'lagos',
    name: 'LAGOS',
    country: 'NigÃ©ria',
    status: 'FUTURE_OPENING',
    x: 48,
    y: 53,
    role: 'FINTECH GATE & LIQUIDITÃ‰S',
    bandwidth: 'CLEARING UEMOA-CEDEAO',
    description: 'Corridor d\'expansion monÃ©taire reliant les flux francophones et anglophones sous protocole cryptographique.'
  },
  {
    id: 'nairobi',
    name: 'NAIROBI',
    country: 'Kenya',
    status: 'FUTURE_OPENING',
    x: 74,
    y: 58,
    role: 'CORRIDOR AFRIQUE DE L\'EST',
    bandwidth: 'AI EDGE COMPUTING',
    description: 'Relais technologique d\'Afrique de l\'Est pour l\'interconnexion des corridors logistiques de l\'OcÃ©an Indien.'
  },
  {
    id: 'johannesburg',
    name: 'JOHANNESBOURG',
    country: 'Afrique du Sud',
    status: 'FUTURE_OPENING',
    x: 62,
    y: 84,
    role: 'HUB MINIER & CAPITAUX AUSTRALS',
    bandwidth: 'ARBITRAGE DES MÃ‰TAUX',
    description: 'Passerelle financiÃ¨re et logistique australe pour le raffinage des minerais de transition Ã©nergÃ©tique.'
  }
];

export default function MobileAfricaNetwork() {
  const [selectedHubId, setSelectedHubId] = useState<string>('abidjan');
  const selectedHub = STRATEGIC_HUBS.find((h) => h.id === selectedHubId) || STRATEGIC_HUBS[0];

  const handleSelectHub = (id: string) => {
    setSelectedHubId(id);
    kcgSound.playTactileClick();
  };

  return (
    <section id="africa-network" className="py-20 px-5 bg-black text-white select-none relative overflow-hidden">
      {/* Deep Red Cosmic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
          <Globe className="w-3 h-3 text-[#C8102E]" />
          <span>AFRICAN STRATEGIC NETWORK // TOPOLOGY</span>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          L'Ã‰pine Dorsale <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            Du Continent.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          KCG n'est pas un observateur pÃ©riphÃ©rique. Nous bÃ¢tissons depuis Abidjan les corridors souverains qui maillent l'Afrique.
        </p>
      </div>

      {/* ================= VECTOR AFRICAN TOPOLOGY MAP ================= */}
      <div className="relative w-full aspect-[4/3.8] bg-[#050507] border border-white/10 rounded-3xl overflow-hidden p-4 shadow-2xl">
        {/* Subtle Map Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Top Status */}
        <div className="absolute top-3 left-4 right-4 flex justify-between items-center text-[7.5px] font-mono text-neutral-500 z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-ping" />
            <span className="text-neutral-300 font-bold">EPICENTRE : ABIDJAN (HQ OUVERT)</span>
          </div>
          <span>GPS: 5.361243Â° N, 3.957746Â° W</span>
        </div>

        {/* SVG African Map Silhouette & Strategic Arcs */}
        <svg viewBox="0 0 400 360" className="w-full h-full relative z-0">
          <defs>
            {/* Gradient for Connection Lines */}
            <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8102E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Minimal African Continental Outline */}
          <path
            d="M 90,60 Q 130,40 200,50 Q 280,60 300,100 Q 330,150 310,210 Q 290,260 250,300 Q 230,330 210,340 Q 190,300 160,250 Q 140,210 130,170 Q 110,130 90,110 Z"
            fill="rgba(255,255,255,0.015)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Strategic Interconnection Lines from Abidjan */}
          {/* Abidjan to Dakar */}
          <path
            d="M 152,194 Q 120,175 88,165"
            fill="none"
            stroke="url(#corridorGrad)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Abidjan to Lagos */}
          <path
            d="M 152,194 Q 172,192 192,190"
            fill="none"
            stroke="url(#corridorGrad)"
            strokeWidth="2"
          />
          {/* Abidjan to Nairobi */}
          <path
            d="M 152,194 Q 220,200 296,208"
            fill="none"
            stroke="url(#corridorGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Abidjan to Johannesburg */}
          <path
            d="M 152,194 Q 200,250 248,302"
            fill="none"
            stroke="url(#corridorGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Interactive Node Buttons Placed Exactly on Coordinates */}
        {STRATEGIC_HUBS.map((hub) => {
          const isSelected = selectedHubId === hub.id;
          const isHQ = hub.id === 'abidjan';

          return (
            <button
              key={hub.id}
              onClick={() => handleSelectHub(hub.id)}
              style={{
                left: `${hub.x}%`,
                top: `${hub.y}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
            >
              {/* Concentric Pulse for Abidjan HQ */}
              {isHQ && (
                <div className="absolute inset-0 -m-3 rounded-full border border-[#C8102E]/60 animate-ping pointer-events-none" />
              )}

              {/* Outer Glow */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#C8102E] shadow-[0_0_15px_#C8102E] scale-125'
                    : isHQ
                    ? 'bg-[#C8102E]/80 border border-white/40'
                    : 'bg-black/90 border border-white/20 hover:border-white/60'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : isHQ ? 'bg-white' : 'bg-neutral-400'
                  }`}
                />
              </div>

              {/* Node Label */}
              <span
                className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7.5px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded transition-all ${
                  isSelected
                    ? 'bg-white text-black font-extrabold shadow-lg'
                    : isHQ
                    ? 'bg-[#C8102E]/30 text-white font-bold border border-[#C8102E]/40'
                    : 'bg-black/60 text-neutral-400 border border-white/5'
                }`}
              >
                {hub.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= ACTIVE NODE DECODER CARD ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedHub.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-4 p-4.5 rounded-2xl bg-[#09090b] border border-white/10 space-y-3 text-left font-mono"
        >
          {/* Header Status Line */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div>
              <span className="text-[7.5px] text-neutral-500 uppercase tracking-widest block">
                NÅ’UD STRATÃ‰GIQUE SÃ‰LECTIONNÃ‰
              </span>
              <h3 className="text-base font-display font-extrabold text-white tracking-tight uppercase">
                {selectedHub.name}
              </h3>
            </div>

            <span
              className={`text-[7.5px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                selectedHub.status === 'HQ_OPEN'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-neutral-400 border border-white/10'
              }`}
            >
              {selectedHub.status === 'HQ_OPEN' ? 'OUVERT (HQ MONDIAL)' : 'FUTURE OUVERTURE'}
            </span>
          </div>

          <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
            {selectedHub.description}
          </p>

          <div className="p-2.5 rounded-xl bg-black/80 border border-white/5 flex justify-between items-center text-[8px]">
            <span className="text-neutral-400 uppercase tracking-wider">
              {selectedHub.role}
            </span>
            <span className="text-[#C8102E] font-bold tracking-widest">
              {selectedHub.bandwidth}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
