import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film, 
  TrendingUp, 
  Layers, 
  Heart, 
  Building,
  ArrowUpRight,
  Cpu, 
  Network, 
  Coins, 
  Tv, 
  Zap, 
  Plane, 
  ArrowRight,
  Activity,
  Infinity as InfinityIcon
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  sector: string;
  category: 'core' | 'ai' | 'fintech' | 'logistics' | 'media' | 'resources';
  x: number; // grid coords on 1000x600 canvas
  y: number;
  icon: any;
  tag: string;
  role: string;
  nourishes: string;
  connections: string[]; // outputs to other node IDs
  metrics: { label: string; value: string }[];
}

const NETWORK_NODES: NetworkNode[] = [
  {
    id: 'kcg-core',
    name: 'KCG Core',
    sector: 'SOUVERAINETÉ GLOBALE',
    category: 'core',
    x: 500,
    y: 300,
    icon: Network,
    tag: 'Hub Central',
    role: 'Le noyau directeur et stratégique qui coordonne le déploiement du capital et de l\'intelligence technologique.',
    nourishes: 'Irrigue l\'ensemble de l\'écosystème en allouant les liquidités de KCG Capital et en orientant les priorités souveraines.',
    connections: ['fiko-ai', 'fiko-pay', 'fiko-connect', 'mavo', 'kcg-mining', 'helix-energy'],
    metrics: [
      { label: 'AUM COORDONNÉ', value: '1 500 Milliards FCFA' },
      { label: 'NŒUDS INTÉGRÉS', value: '100%' }
    ]
  },
  {
    id: 'fiko-ai',
    name: 'FIKO AI',
    sector: 'INTELLIGENCE ARTIFICIELLE',
    category: 'ai',
    x: 230,
    y: 160,
    icon: Cpu,
    tag: 'Système Cognitif',
    role: 'Moteur de deep-learning entraîné localement pour la prédiction financière et l\'optimisation de la chaîne logistique.',
    nourishes: 'Fournit des modèles prédictifs à FIKO PAY (arbitrage) et optimise les couloirs de fret aériens de AIRVOO.',
    connections: ['fiko-pay', 'airvoo', 'fgfs-ai'],
    metrics: [
      { label: 'MODÈLES ACTIFS', value: '14' },
      { label: 'PRÉCISION PRÉDICTIVE', value: '96.8%' }
    ]
  },
  {
    id: 'fiko-connect',
    name: 'FIKO CONNECT',
    sector: 'CORRIDORS LOGISTIQUES & INFRASTRUCTURES',
    category: 'logistics',
    x: 770,
    y: 160,
    icon: Network,
    tag: 'Réseau de Transmission',
    role: 'Squelette logistique et numérique ouest-africain englobant fibres optiques, data centers et couloirs de fret.',
    nourishes: 'Sert de canal d\'échange de données haute vitesse pour FIKO PAY et distribue les flux culturels de MAVO.',
    connections: ['mavo', 'fiko-pay', 'airvoo'],
    metrics: [
      { label: 'DATA CENTERS', value: '4 Tier III' },
      { label: 'LATENCE INTER-NODALE', value: '0.04ms' }
    ]
  },
  {
    id: 'fiko-pay',
    name: 'FIKO PAY',
    sector: 'FINANCE TECHNIQUE (UEMOA)',
    category: 'fintech',
    x: 150,
    y: 300,
    icon: Coins,
    tag: 'Système de Paiement',
    role: 'Protocole transactionnel autonome de compensation de liquidités et monnaie stable pour contourner les intermédiaires tiers.',
    nourishes: 'Garantit des transactions transfrontalières sans friction pour MAVO et KCG Mining, fluidifiant les flux financiers.',
    connections: ['kcg-core', 'mavo'],
    metrics: [
      { label: 'VOLUME MENSUEL', value: '90 Milliards FCFA+' },
      { label: 'SÉCURITÉ LEDGER', value: 'AES-256' }
    ]
  },
  {
    id: 'mavo',
    name: 'MAVO',
    sector: 'RÉCITS SOUVERAINS & MÉDIAS',
    category: 'media',
    x: 850,
    y: 300,
    icon: Tv,
    tag: 'Plateforme Culturelle',
    role: 'Plateforme panafricaine de streaming d\'élite et de diffusion culturelle contrecarrant l\'influence médiatique importée.',
    nourishes: 'Éduque et oriente les talents d\'Afrique vers les bourses d\'études de la Fondation KCG.',
    connections: ['kcg-core'],
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
    x: 280,
    y: 440,
    icon: Plane,
    tag: 'Fret Autonome',
    role: 'Réseau de corridors de fret aériens autonomes et de micro-hubs logistiques connectant les zones enclavées.',
    nourishes: 'Achemine de manière ultra-rapide les minerais critiques raffinés de KCG Mining vers les ports d\'exportation.',
    connections: ['kcg-mining'],
    metrics: [
      { label: 'MICRO-HUBS', value: '12' },
      { label: 'FLOTTE LOGISTIQUE', value: '28' }
    ]
  },
  {
    id: 'kcg-mining',
    name: 'KCG Mining',
    sector: 'RESSOURCES STRATÉGIQUES',
    category: 'resources',
    x: 720,
    y: 440,
    icon: Layers,
    tag: 'Raffinerie de Métaux',
    role: 'Extraction responsable et raffinage local de métaux de transition (Lithium, Cobalt) pour stopper l\'exportation de matière brute.',
    nourishes: 'Alimente Helix Energy en matières brutes purifiées nécessaires à la fabrication de batteries industrielles.',
    connections: ['helix-energy', 'kcg-core'],
    metrics: [
      { label: 'CAPACITÉ REFINAGE', value: '840K T/An' },
      { label: 'VALEUR AJOUTÉE LOCALE', value: '+400%' }
    ]
  },
  {
    id: 'helix-energy',
    name: 'Helix Energy',
    sector: 'MICRO-RÉSEAUX & ÉNERGIE',
    category: 'resources',
    x: 500,
    y: 100,
    icon: Zap,
    tag: 'Grille Énergétique',
    role: 'Micro-réseaux solaires et de stockage par batteries conçus pour alimenter de manière autonome les infrastructures industrielles.',
    nourishes: 'Sécurise l\'alimentation électrique continue des centres de calcul de FIKO CONNECT et des fonderies de KCG Mining.',
    connections: ['fiko-connect', 'kcg-mining'],
    metrics: [
      { label: 'PUISSANCE CRÊTE', value: '180 MW' },
      { label: 'AUTONOMIE GRILLE', value: '99.99%' }
    ]
  },
  {
    id: 'fgfs-ai',
    name: 'FGFS AI',
    sector: 'MACRO PRÉDICTION FINANCIÈRE',
    category: 'ai',
    x: 500,
    y: 500,
    icon: Activity,
    tag: 'Algorithme Quantique',
    role: 'Système global de prévision financière simulant les équilibres macro-économiques ouest-africains.',
    nourishes: 'Donne les impulsions de co-investissement et d\'arbitrage au KCG Core pour réinjecter le capital là où la productivité est maximale.',
    connections: ['kcg-core'],
    metrics: [
      { label: 'SIMULATIONS/SEC', value: '40,000+' },
      { label: 'CORRÉLATION DE MARCHÉ', value: '94.2%' }
    ]
  }
];

interface Pillar {
  num: string;
  id: string;
  title: string;
  short: string;
  desc: string;
  mission: string;
  icon: any;
  brands: string[];
  metrics: { label: string; value: string };
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    id: "ddd",
    title: "DIVERTISSEMENT DIVERSIFIÉ",
    short: "DDD",
    desc: "Développer les activités de divertissement, médias et expériences d’immersion culturelle transnationale.",
    mission: "Saturer l'espace culturel panafricain d'audiovisuel d'élite et de récits souverains de rayonnement mondial.",
    icon: Film,
    brands: ["KCG Media™", "MAVO", "Sovereign Wave"],
    metrics: { label: "IMPACT DES RÉCITS", value: "84M+ Spectateurs" }
  },
  {
    num: "02",
    id: "dpi",
    title: "PRODUITS D'INVESTISSEMENT",
    short: "DPI",
    desc: "Créer et coordonner les véhicules financiers transnationaux de co-investissement et de capital-risque.",
    mission: "Architecturer les véhicules financiers souverains de long terme pour catalyser la croissance industrielle.",
    icon: TrendingUp,
    brands: ["FIKO PAY", "Sovereign Yield™", "KCG Capital™"],
    metrics: { label: "CAPITAL COORDONNÉ", value: "2 400 Milliards FCFA" }
  },
  {
    num: "03",
    id: "drn",
    title: "RESSOURCES NATURELLES",
    short: "DRN",
    desc: "Valoriser les ressources stratégiques nécessaires à la transformation économique durable du continent.",
    mission: "Exploiter, affiner et valoriser localement les métaux critiques de la transition technologique globale.",
    icon: Layers,
    brands: ["KCG Mining™", "Lithium Core Africa", "Helix Energy"],
    metrics: { label: "REFINAGE LOCAL", value: "840K T/An" }
  },
  {
    num: "04",
    id: "dms",
    title: "MULTI SERVICES",
    short: "DMS",
    desc: "Fournir des services critiques et des corridors logistiques aux industries d’envergure continentale.",
    mission: "Bâtir les infrastructures d'acheminement, de conformité et de sécurité transactionnelle globale.",
    icon: Building,
    brands: ["FIKO CONNECT", "AIRVOO", "KCG Logistics"],
    metrics: { label: "EFFICACITÉ CORRIDOR", value: "99.87%" }
  },
  {
    num: "05",
    id: "dfc",
    title: "FONDATION DE CHARITÉ",
    short: "DFC",
    desc: "Développer l'impact social durable, l'éducation panafricaine d'excellence et l'accès à la santé.",
    mission: "Former l'élite de demain via des bourses d'excellence et pérenniser l'autodétermination communautaire.",
    icon: Heart,
    brands: ["KCG Foundation", "FIKO AI", "Élite Tech Africa"],
    metrics: { label: "BOURSES ATTRIBUÉES", value: "12,450 Récipiendaires" }
  }
];

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  // Connection check helper
  const isConnectionActive = (fromId: string, toId: string) => {
    if (!hoveredNode) return true; // all active by default
    if (hoveredNode.id === fromId && hoveredNode.connections.includes(toId)) return true;
    // reverse highlight can also be useful for showing who nourishes the hovered node
    const targetNode = NETWORK_NODES.find(n => n.id === toId);
    if (hoveredNode.id === toId && targetNode && NETWORK_NODES.find(n => n.id === fromId)?.connections.includes(toId)) return true;
    return false;
  };

  return (
    <section 
      id="ecosystem" 
      className="py-32 bg-[#020203] text-white overflow-hidden relative border-t border-b border-white/5 select-none font-sans"
    >
      {/* Carbon Ambient Layer */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[#020203] opacity-90 pointer-events-none" />
      
      {/* Fine grid perspective background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Cybernetic focal backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kcg-red/4 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-20 space-y-24">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-4xl space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full bg-white/[0.01]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-kcg-red animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 font-bold">
              KCG SYNERGETIC MAP v4.0
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tighter uppercase leading-[0.95]">
            Cartographie de l'écosystème <br />
            <span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-red-600">
              systémique et interconnecté.
            </span>
          </h2>

          <div className="w-16 h-[2.5px] bg-kcg-red" />

          <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-3xl">
            La souveraineté ne s’acquiert pas par des investissements isolés, mais par une <strong className="text-white font-medium">synergie symbiotique</strong> d'infrastructures. Découvrez notre carte de réseau interactive : chaque venture s’alimente et renforce les autres, consolidant l'indépendance de l'Afrique.
          </p>
        </div>


        {/* ================= INTERACTIVE NETWORK VISUALIZER ================= */}
        <div className="w-full relative kcg-glass bg-black/60 border border-white/5 rounded-[32px] p-6 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Constellation Canvas Container */}
          <div className="relative w-full aspect-[16/10] min-h-[450px] lg:min-h-[580px] bg-black/35 rounded-[24px] border border-white/[0.03] overflow-hidden">
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#111115_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70" />

            {/* SVG Connecting Vector Lines & Flows */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Draw Static Connection Paths with animated glow pulses */}
              {NETWORK_NODES.map((fromNode) => (
                fromNode.connections.map((toId) => {
                  const toNode = NETWORK_NODES.find(n => n.id === toId);
                  if (!toNode) return null;

                  const isActive = isConnectionActive(fromNode.id, toNode.id);
                  const isHoveredLine = hoveredNode && (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id);

                  // Quadratic Bezier curves for a premium technological flow look
                  const midX = (fromNode.x + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y) / 2 - 25; // bend curve upwards

                  const pathD = `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY}, ${toNode.x} ${toNode.y}`;

                  return (
                    <g key={`${fromNode.id}-${toId}`} className="transition-opacity duration-500">
                      
                      {/* Underlying Shadow Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isActive ? (isHoveredLine ? 'rgba(200,16,46,0.35)' : 'rgba(255,255,255,0.08)') : 'rgba(255,255,255,0.015)'}
                        strokeWidth={isHoveredLine ? 2.5 : 1.2}
                        className="transition-all duration-500"
                      />

                      {/* Animated Flowing Data Conveyer (Only on active links) */}
                      {isActive && (
                        <path
                          d={pathD}
                          fill="none"
                          stroke={isHoveredLine ? '#C8102E' : 'rgba(255,255,255,0.25)'}
                          strokeWidth={isHoveredLine ? 1.8 : 0.8}
                          strokeDasharray="6, 12"
                          className="data-flow-line transition-all duration-500"
                          style={{
                            animation: 'dash 1.5s linear infinite',
                            filter: isHoveredLine ? 'url(#glow)' : ''
                          }}
                        />
                      )}
                    </g>
                  );
                })
              ))}
            </svg>

            {/* Interactive HTML Nodes overlaying the SVG coordinates */}
            <div className="absolute inset-0">
              {NETWORK_NODES.map((node) => {
                const Icon = node.icon;
                const isCurrent = hoveredNode?.id === node.id;
                const isDimmed = hoveredNode && hoveredNode.id !== node.id;

                return (
                  <div
                    key={node.id}
                    className="absolute group/node -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${node.x / 10}%`,
                      top: `${node.y / 6}%`,
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    
                    {/* Node interactive trigger area with dynamic glow backplate */}
                    <div className="relative flex flex-col items-center cursor-pointer">
                      
                      {/* Outer pulsing scanning rings */}
                      <div className={`absolute -inset-4 rounded-full border border-dashed transition-all duration-700 scale-90 opacity-0 group-hover/node:opacity-100 group-hover/node:scale-105 ${node.category === 'core' ? 'border-kcg-red/30' : 'border-white/10'} ${isCurrent ? 'animate-[spin_20s_linear_infinite] opacity-100 scale-105' : ''}`} />

                      {/* Glowing backplate indicator */}
                      <div className={`absolute w-12 h-12 rounded-full blur-[15px] transition-all duration-500 opacity-0 group-hover/node:opacity-100 ${node.category === 'core' ? 'bg-kcg-red/20' : 'bg-white/10'} ${isCurrent ? 'opacity-100 scale-110' : ''}`} />

                      {/* Main Node bubble */}
                      <div 
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border transition-all duration-500 relative z-10 ${
                          node.category === 'core' 
                            ? 'bg-kcg-red border-kcg-red text-white shadow-[0_0_20px_#C8102E]' 
                            : isCurrent 
                              ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                              : 'bg-neutral-900 border-white/10 text-neutral-400 group-hover/node:border-white group-hover/node:text-white'
                        } ${isDimmed ? 'opacity-40 scale-90' : 'opacity-100 scale-100'}`}
                      >
                        <Icon className="w-4.5 h-4.5 lg:w-5.5 lg:h-5.5" />
                      </div>

                      {/* Small text labeling directly below the bubbles */}
                      <div className={`mt-2.5 px-2.5 py-1 rounded bg-black/80 border border-white/5 backdrop-blur-md transition-all duration-500 select-none ${isCurrent ? 'border-kcg-red/40 bg-[#0B0305]/95 shadow-[0_4px_12px_rgba(200,16,46,0.1)]' : ''} ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
                        <span className={`block text-[8px] lg:text-[9.5px] font-mono tracking-widest font-black uppercase text-center ${node.category === 'core' ? 'text-white' : isCurrent ? 'text-kcg-red' : 'text-neutral-300'}`}>
                          {node.name}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic floating HUD Side panel detailing the hovered node */}
            <AnimatePresence>
              {hoveredNode && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute left-6 bottom-6 w-80 lg:w-96 kcg-glass bg-black/95 border border-white/10 rounded-[20px] p-6 z-30 shadow-2xl space-y-5 font-mono text-xs select-none"
                >
                  {/* Category and tag headers */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-bold uppercase">
                      {hoveredNode.sector}
                    </span>
                    <span className="px-2 py-0.5 text-[8.5px] rounded bg-kcg-red/10 border border-kcg-red/20 text-kcg-red font-black uppercase tracking-widest">
                      {hoveredNode.tag}
                    </span>
                  </div>

                  {/* Name and active node signal */}
                  <div className="space-y-1">
                    <h4 className="text-xl font-display font-extrabold tracking-tight uppercase text-white">
                      {hoveredNode.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-light italic">
                      ID: {hoveredNode.id.toUpperCase()}_NODE // STATUS: STABLE
                    </p>
                  </div>

                  {/* Strategic role description */}
                  <div className="space-y-1 bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg">
                    <span className="text-[8px] text-neutral-500 font-black tracking-widest block uppercase">
                      Rôle Stratégique :
                    </span>
                    <p className="text-neutral-300 text-[10.5px] leading-relaxed font-sans">
                      {hoveredNode.role}
                    </p>
                  </div>

                  {/* Nourishment Formula emphasizing inter-infrastructure integration */}
                  <div className="space-y-1 border-l-2 border-kcg-red pl-3.5 bg-kcg-red/[0.01]">
                    <span className="text-[8px] text-kcg-red font-black tracking-widest block uppercase flex items-center gap-1.5">
                      <InfinityIcon className="w-3 h-3 text-kcg-red" />
                      Formule de Nourricerie :
                    </span>
                    <p className="text-neutral-300 text-[10.5px] leading-relaxed italic font-sans font-light">
                      {hoveredNode.nourishes}
                    </p>
                  </div>

                  {/* Live Telemetry metrics list */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 text-[9.5px]">
                    {hoveredNode.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded">
                        <span className="block text-neutral-500 text-[8px] tracking-wider uppercase">
                          {metric.label}
                        </span>
                        <span className="block text-white font-extrabold mt-0.5 tracking-wider">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Instruction tooltip when no node is hovered */}
            {!hoveredNode && (
              <div className="absolute right-6 bottom-6 flex items-center gap-3 px-4.5 py-2.5 rounded-xl border border-white/5 bg-black/60 backdrop-blur-md z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-kcg-red animate-ping" />
                <span className="text-[8.5px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                  Survolez les nœuds pour décoder le flux de nourricerie
                </span>
              </div>
            )}

          </div>
        </div>


        {/* ================= 5-COLUMN PILLARS GRID ================= */}
        <div className="pt-12 border-t border-white/5 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[9px] font-mono text-kcg-red uppercase tracking-widest font-black block mb-2">
                ORGANISATION INTERNE
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white leading-none">
                La structure par piliers d'excellence
              </h3>
            </div>
            <p className="text-sm text-neutral-500 font-light max-w-md">
              Chaque nœud de notre réseau de nourricerie s'insère dans l'une de nos cinq directions opérationnelles majeures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PILLARS.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-[530px] rounded-[24px] bg-[#050507] border border-white/5 p-7 flex flex-col justify-between overflow-hidden hover:border-kcg-red/30 transition-all duration-700"
                >
                  {/* Hover visual highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kcg-red/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    
                    {/* Index header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-xs font-display font-extrabold text-kcg-red">
                        {pillar.num}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-bold group-hover:text-white transition-colors">
                        {pillar.short}
                      </span>
                    </div>

                    {/* Header title */}
                    <div className="space-y-3">
                      <div className="inline-flex p-2.5 rounded-lg border border-white/5 bg-[#0a0a0c] text-neutral-400 group-hover:text-kcg-red group-hover:border-kcg-red/20 transition-all duration-500">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-display font-bold uppercase tracking-tight text-white leading-tight">
                        {pillar.title}
                      </h4>
                    </div>

                    {/* Desc and mission */}
                    <div className="space-y-3.5">
                      <p className="text-neutral-400 text-[11px] font-light leading-relaxed">
                        {pillar.desc}
                      </p>
                      <p className="text-neutral-500 text-[10px] leading-relaxed italic border-l border-white/10 pl-3 font-sans font-light">
                        "{pillar.mission}"
                      </p>
                    </div>

                  </div>

                  {/* Brand sub-nodes and KPIs */}
                  <div className="space-y-5 relative z-10 pt-4 border-t border-white/5 font-mono">
                    
                    <div className="flex flex-wrap gap-1">
                      {pillar.brands.map((brand, bIdx) => (
                        <span 
                          key={bIdx} 
                          className="px-2 py-0.5 text-[8.5px] rounded bg-white/[0.01] text-neutral-400 border border-white/[0.03]"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.01] border border-white/[0.02] p-2.5 rounded-lg">
                      <div className="text-left">
                        <span className="block text-[7.5px] text-neutral-500 uppercase tracking-wider">
                          {pillar.metrics.label}
                        </span>
                        <span className="block text-[11px] text-white font-extrabold mt-0.5">
                          {pillar.metrics.value}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-kcg-red transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-500" />
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>


        {/* ================= MASTER FINAL SIGN OFF ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative py-16 rounded-[28px] bg-gradient-to-b from-[#050507] to-[#010102] border border-white/5 overflow-hidden text-center"
        >
          {/* Glowing background halo of monumentality */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-kcg-red/4 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4 px-6">
            <h4 className="text-2xl md:text-4xl font-display font-extrabold tracking-widest text-white leading-none uppercase">
              KOFFMANN CAPITAL GROUP
            </h4>
            <p className="text-[10px] uppercase tracking-[0.55em] text-kcg-red font-black">
              CHAQUE INFRASTRUCTURE NOURRIT UNE AUTRE INFRASTRUCTURE.
            </p>
            
            <div className="w-12 h-[1px] bg-white/20 mx-auto my-6" />

            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-relaxed">
              KCG HOLDINGS LIMITED © 2026 • ARCHITECTURE DE SOUVERAINETÉ INDUSTRIELLE
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
