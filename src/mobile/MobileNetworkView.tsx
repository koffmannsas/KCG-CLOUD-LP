import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Sparkles } from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';

interface MapNode {
  id: string;
  name: string;
  country: string;
  status: 'HQ_OPEN' | 'FUTURE_OPENING';
  x: number;
  y: number;
  role: string;
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
    description: 'Ã‰picentre dÃ©cisionnel et technologique ouvert. Coordination des corridors industriels et de l\'intelligence macroÃ©conomique.'
  },
  {
    id: 'dakar',
    name: 'DAKAR',
    country: 'SÃ©nÃ©gal',
    status: 'FUTURE_OPENING',
    x: 22,
    y: 46,
    role: 'PASSAGE ATLANTIQUE & HUB DMS',
    description: 'Passerelle maritime et numÃ©rique reliant les data centers cÃ´tiers aux rÃ©seaux transatlantiques.'
  },
  {
    id: 'lagos',
    name: 'LAGOS',
    country: 'NigÃ©ria',
    status: 'FUTURE_OPENING',
    x: 48,
    y: 53,
    role: 'GATE FINTECH & LIQUIDITÃ‰',
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
    description: 'Relais technologique pour l\'interconnexion des corridors logistiques de l\'OcÃ©an Indien.'
  },
  {
    id: 'johannesburg',
    name: 'JOHANNESBOURG',
    country: 'Afrique du Sud',
    status: 'FUTURE_OPENING',
    x: 62,
    y: 84,
    role: 'MINERAIS & CAPITAUX AUSTRALS',
    description: 'Passerelle financiÃ¨re et logistique australe pour le raffinage des mÃ©taux de transition Ã©nergÃ©tique.'
  }
];

export default function MobileNetworkView() {
  const { selectedHubId, setSelectedHubId, setActiveTab } = useMobileOSStore();

  const selectedHub = STRATEGIC_HUBS.find((h) => h.id === selectedHubId) || STRATEGIC_HUBS[0];

  const handleSelectHub = (id: string) => {
    setSelectedHubId(id);
    kcgSound.playTactileClick();
    kcgSound.playSignalPing(520);
  };

  const handleAskAI = () => {
    kcgSound.playTactileClick();
    setActiveTab('ai');
  };

  return (
    <div className="w-full min-h-[88svh] bg-[#000000] text-white select-none px-5 pt-20 pb-32 flex flex-col justify-between overflow-x-hidden text-left relative space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#CF1A26]" />
            <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
              TOPOLOGIE AFRICAINE
            </span>
          </div>

          <span className="text-[7.5px] font-mono text-[#CF1A26] font-bold">
            â— 5 NÅ’UDS SYNCHRONISÃ‰S
          </span>
        </div>

        <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">
          RÃ©seau StratÃ©gique
        </h1>
      </div>

      {/* SVG Interactive Map Container */}
      <div className="relative w-full aspect-[4/3.7] my-2 rounded-2xl bg-[#111111] border border-white/[0.08] shadow-2xl p-2 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 overflow-visible"
        >
          {/* Continental Outline */}
          <path
            d="M 28,18
               Q 48,15 72,20
               Q 86,28 78,42
               Q 72,50 75,62
               Q 70,82 60,94
               Q 50,95 44,82
               Q 32,68 34,54
               Q 18,52 14,40
               Q 16,28 28,18 Z"
            fill="#0A0A0A"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
          />

          {/* Clean Corridor Lines */}
          <line x1="22" y1="46" x2="38" y2="54" stroke="#CF1A26" strokeWidth="0.8" strokeOpacity="0.8" />
          <line x1="38" y1="54" x2="48" y2="53" stroke="#CF1A26" strokeWidth="1.2" />
          <line x1="48" y1="53" x2="74" y2="58" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
          <line x1="38" y1="54" x2="62" y2="84" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" strokeDasharray="1.5,1.5" />

          {/* Hub Markers */}
          {STRATEGIC_HUBS.map((hub) => {
            const isSelected = selectedHubId === hub.id;
            const isAbidjan = hub.id === 'abidjan';

            return (
              <g
                key={hub.id}
                onClick={() => handleSelectHub(hub.id)}
                className="cursor-pointer"
              >
                {/* Abidjan HQ Active Wave */}
                {isAbidjan && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="5.5"
                    fill="none"
                    stroke="#CF1A26"
                    strokeWidth="0.4"
                    opacity="0.6"
                    className="animate-ping origin-center"
                  />
                )}

                {/* Selection Ring */}
                {isSelected && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="4"
                    fill="none"
                    stroke="#CF1A26"
                    strokeWidth="0.8"
                  />
                )}

                {/* Center Node */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isAbidjan ? 2.2 : 1.6}
                  fill={isSelected ? '#ffffff' : isAbidjan ? '#CF1A26' : '#71717a'}
                  stroke="#000000"
                  strokeWidth="0.4"
                />

                {/* City Label */}
                <text
                  x={hub.x}
                  y={hub.y - 3}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : isAbidjan ? '#CF1A26' : '#a1a1aa'}
                  fontSize="3"
                  fontFamily="monospace"
                  fontWeight={isSelected || isAbidjan ? 'bold' : 'normal'}
                >
                  {hub.id.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[7px] font-mono text-neutral-400">
          <span>ABIDJAN HQ // 5.36Â°N, 3.95Â°W</span>
          <span className="text-[#CF1A26] font-bold">LATENCE : 0.004 ms</span>
        </div>
      </div>

      {/* Selected Hub Detail Card */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedHub.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08] text-left space-y-1.5 shadow-md"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <span className="text-[7.5px] font-mono text-[#CF1A26] font-bold uppercase tracking-widest">
                {selectedHub.role}
              </span>
              <span className="text-[7.5px] font-mono text-neutral-400">{selectedHub.country}</span>
            </div>

            <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
              {selectedHub.name}
            </h3>

            <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {selectedHub.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Primary Contextual Action */}
        <button
          onClick={handleAskAI}
          className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#CF1A26]/40 text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CF1A26]" />
          <span>Explorer ce rÃ©seau avec KCG AI</span>
        </button>
      </div>
    </div>
  );
}
