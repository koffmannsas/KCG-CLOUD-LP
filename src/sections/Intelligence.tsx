import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Activity, 
  Terminal as TerminalIcon, 
  LineChart, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  CornerDownRight, 
  ShieldAlert, 
  Database,
  ArrowRight,
  Eye,
  Video,
  Globe,
  Map
} from 'lucide-react';

type IntelligenceTab = 'logistics' | 'finance' | 'agriculture';

interface CinematicScene {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  ambiance: string;
  rendering: string;
  flowSpeed: string;
  telemetry: { label: string; value: string; status?: 'optimal' | 'warning' | 'nominal' }[];
  visualEffect: string;
  projectionLabel: string;
}

const CINEMATIC_SCENES: CinematicScene[] = [
  {
    id: 'transactional-tree',
    title: 'L\'Arbre de Vie Transactionnel',
    subtitle: 'RÉSEAU DE LIQUIDITÉS ET COMPENSATION SOUVERAINE',
    icon: Globe,
    ambiance: 'Projections holographiques d\'or liquide circulant le long de méridiens cryptographiques à travers l\'Afrique de l\'Ouest.',
    rendering: 'Modélisation volumétrique 3D où des impulsions lumineuses rouges KCG tracent en temps réel les cycles de compensation monétaire de FIKO PAY entre Dakar, Abidjan et Bamako, contournant de manière autonome les goulots d\'étranglement traditionnels de l\'UEMOA.',
    flowSpeed: '4.8 TB/s',
    telemetry: [
      { label: 'Stabilité du Ledger', value: '99.999%', status: 'optimal' },
      { label: 'Compensation Node', value: 'Active (Dakar Hub)', status: 'nominal' },
      { label: 'Latence Inter-fiat', value: '0.004 ms', status: 'optimal' }
    ],
    visualEffect: 'pulsing-nodes',
    projectionLabel: 'HOLO_TRANS_PROJ_982'
  },
  {
    id: 'corridor-shuttle',
    title: 'Le Corridor de Fer Autonome',
    subtitle: 'CARTOGRAPHIE PRÉDICTIVE ET LOGISTIQUE MULTIMODALE',
    icon: Map,
    ambiance: 'Maillage vectoriel topographique en fil de fer vert émeraude et rouge vermillon représentant les routes de transit.',
    rendering: 'Une carte d\'altitude tridimensionnelle projetée, montrant la flotte de fret autonome AIRVOO. Le modèle d\'IA KRYPTON anticipe les perturbations météorologiques régionales pour recalculer les trajectoires d\'approvisionnement en métaux critiques de KCG Mining.',
    flowSpeed: '940 MS/s',
    telemetry: [
      { label: 'Calcul Trajectoire', value: 'Optimisé (Delta-3)', status: 'optimal' },
      { label: 'Résilience Climat', value: '98.4%', status: 'optimal' },
      { label: 'Alerte Trafic', value: 'Friction: 0.1%', status: 'nominal' }
    ],
    visualEffect: 'vector-terrain',
    projectionLabel: 'CORRIDOR_VECT_MAP_04'
  },
  {
    id: 'nexus-krypton',
    title: 'Le Nexus Souverain Krypton',
    subtitle: 'NUCLEUS DÉCISIONNEL DE L\'ÉCOSYSTÈME KCG',
    icon: Cpu,
    ambiance: 'Interface circulaire de commandement en rotation cybernétique lente destinée au comité de gouvernance.',
    rendering: 'Structure concentrique d\'anneaux de données affichant les indicateurs d\'arbitrage macroéconomique et l\'allocation de capital-risque en temps réel. Des flux de télémétrie descendent en cascade pour valider la conformité cryptographique de l\'empire de co-investissement.',
    flowSpeed: '12.4 GLOPs',
    telemetry: [
      { label: 'Allocation Active', value: 'Automatisée', status: 'optimal' },
      { label: 'Garantie Sécurité', value: 'AES-256 Multi-Sig', status: 'optimal' },
      { label: 'Flux d\'Arbitrage', value: 'Simulé à 94.2%', status: 'nominal' }
    ],
    visualEffect: 'spinning-rings',
    projectionLabel: 'NEXUS_GOV_CORE_88'
  },
  {
    id: 'crop-pulse',
    title: 'La Pulsation des Récoltes Connectées',
    subtitle: 'MODÉLISATION BIOCLIMATIQUE ET RENDEMENT OPTIMISÉ',
    icon: Sparkles,
    ambiance: 'Grille matricielle de capteurs agricoles projetant des ondes d\'hydratation et d\'évaluation du sol.',
    rendering: 'Visualisation thermique des zones de culture de cacao et de céréales de Côte d\'Ivoire et du Ghana. L\'IA interprète en temps réel les indices d\'humidité et déclenche des alertes bioclimatiques de sécheresse pour ajuster la micro-irrigation connectée.',
    flowSpeed: '280 KS/s',
    telemetry: [
      { label: 'Score d\'Hydratation', value: '68% (Optimal)', status: 'optimal' },
      { label: 'Menace Sécheresse', value: '1.4% (Négligeable)', status: 'nominal' },
      { label: 'Gain de Rendement', value: '+28.4% (Est.)', status: 'optimal' }
    ],
    visualEffect: 'biometric-waves',
    projectionLabel: 'AGRO_CROP_GRID_221'
  }
];

export default function Intelligence() {
  const [activeTab, setActiveTab] = useState<IntelligenceTab>('logistics');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "KRYPTON_OS v2.4.1 initialized.",
    "System security clearance level: STRATEGIC_CORE.",
    "Data fusion node active: monitoring UEMOA flows...",
    "All cognitive models: ONLINE."
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<string>(CINEMATIC_SCENES[0].id);

  // Auto-scrolling logs
  const [liveLog, setLiveLog] = useState<string>("[KCG-AI] Monitoring currency stability index (XOF)");

  useEffect(() => {
    const liveLogItems = [
      "[FIKO-AI] Optimizing supply routing for Côte d'Ivoire cocoa corridor",
      "[FGFS] Simulated CFA transaction settlement throughput: 14,240 tx/s",
      "[SYS-DIAG] Security mesh verification: 100% integrity",
      "[KRYPTON] Recalculating cargo shuttle flight lines for AIRVOO",
      "[FIKO-PAY] Compensation event triggered - liquidity balanced"
    ];
    const logInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * liveLogItems.length);
      setLiveLog(liveLogItems[idx]);
    }, 5000);
    return () => clearInterval(logInterval);
  }, []);

  // Handler for terminal commands
  const handleCommandExecute = (command: string, desc: string) => {
    if (isProcessing) return;
    setTerminalInput(command);
    setIsProcessing(true);

    const newLogs = [...terminalLogs, `> ${command}`, `Executing: ${desc}...`];
    setTerminalLogs(newLogs);

    setTimeout(() => {
      let result = "";
      if (command.includes('drought')) {
        result = "SUCCESS: Dry season indices analyzed. Outflow route updated to Abidjan Corridor Delta-3. Food security reserves secured. Transit time impact: -4.2 Hours.";
      } else if (command.includes('liquidity')) {
        result = "SUCCESS: Real-time transactional liquidity compulser active. Settlement delay reduced to 0.004ms. Dakar data node throughput maximized (+34.1%).";
      } else if (command.includes('shuttle')) {
        result = "SUCCESS: Automated air cargo route generated for Lithium Core. Coordinates locked for AIRVOO Drone-08. Payload status: READY.";
      }

      setTerminalLogs(prev => [...prev, "[KRYPTON_BRAIN] Analyzing feedback matrices...", result, "System ready."]);
      setIsProcessing(false);
    }, 1800);
  };

  const selectedScene = CINEMATIC_SCENES.find(s => s.id === activeScene) || CINEMATIC_SCENES[0];
  const SceneIcon = selectedScene.icon;

  return (
    <section id="intelligence" className="py-32 bg-black relative overflow-hidden select-none font-sans">
      
      {/* Top thin line accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Immersive Background Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-kcg-red/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* ================= LEFT SIDE: EXPLAINER COPY ================= */}
        <div className="lg:col-span-5 space-y-10">
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-kcg-red/25 rounded-full bg-kcg-red/[0.02]"
            >
              <Cpu className="w-3.5 h-3.5 text-kcg-red" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-kcg-red font-black">
                KCG COGNITIVE SUITE v2.4
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight uppercase tracking-tighter text-white">
              L'INTELLIGENCE EST LA NOUVELLE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] via-red-500 to-white font-bold italic font-display">INFRASTRUCTURE.</span>
            </h2>
          </div>

          <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            Nous ne concevons pas l'IA comme un simple outil de productivité, mais comme le <strong className="text-white font-medium">système d'exploitation autonome</strong> de notre empire technologique. Les modèles de KOFFMANN CAPITAL GROUP orchestrent la fusion de données physiques et financières pour anticiper les fluctuations et automatiser les décisions critiques.
          </p>

          <div className="grid gap-6">
            {[
              {
                icon: Zap,
                title: 'Décision Algorithmique Autonome',
                desc: 'Des boucles de rétroaction cybernétiques qui éliminent les latences humaines et optimisent les rendements de nos activités physiques.'
              },
              {
                icon: Database,
                title: 'Souveraineté des Modèles Locaux',
                desc: 'Des agents intelligents entraînés sur des données endogènes africaines, capturant les nuances géopolitiques et culturelles ouest-africaines.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4.5 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#09090c] border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
                  <item.icon className="w-4 h-4 text-kcg-red" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-display font-bold uppercase tracking-tight text-white">{item.title}</h4>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>


        {/* ================= RIGHT SIDE: JARVIS HOLOGRAPHIC TERMINAL ================= */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Integrated Interface card */}
          <div className="kcg-glass bg-black/75 border border-white/10 rounded-[28px] p-6 lg:p-8 shadow-2xl relative overflow-hidden backdrop-blur-3xl space-y-6">
            
            {/* Header / Operating system status line */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-kcg-red animate-pulse" />
                </div>
                <span className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest">
                  KRYPTON INTEGRATED OS v2.4.1 // LIVE_STATUS: {isProcessing ? 'PROCESSSING...' : 'IDLE'}
                </span>
              </div>

              {/* Live fluctuating ticker */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/[0.01] border border-white/5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span className="text-[8.5px] font-mono text-green-500 uppercase tracking-widest font-black">
                  {liveLog}
                </span>
              </div>
            </div>

            {/* Dashboard Tabs Selectors */}
            <div className="flex border-b border-white/5 p-1 bg-white/[0.01] rounded-xl">
              {[
                { id: 'logistics', label: 'LOGISTIQUE PRÉDICTIVE', icon: Activity },
                { id: 'finance', label: 'FLUX TRANSACTIONNELS', icon: LineChart },
                { id: 'agriculture', label: 'AGRICULTURE CONNECTÉE', icon: Cpu }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as IntelligenceTab)}
                    className={`cursor-pointer flex-1 py-3.5 px-4 rounded-lg flex items-center justify-center gap-2.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white text-black font-extrabold shadow-md' 
                        : 'text-neutral-500 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Tab Contents */}
            <div className="min-h-[260px] relative">
              <AnimatePresence mode="wait">
                
                {/* 1. PREDICTIVE LOGISTICS CORRIDOR */}
                {activeTab === 'logistics' && (
                  <motion.div
                    key="logistics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Visual Router Node Map simulation */}
                    <div className="h-28 bg-[#050507] border border-white/5 rounded-2xl relative p-4 flex justify-between items-center overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:1rem] opacity-60" />
                      
                      {/* Interactive Route Nodes */}
                      <div className="relative flex justify-between w-full px-6 z-10">
                        {[
                          { city: "Dakar", cap: "DMS Hub", state: "OPTIMAL" },
                          { city: "Abidjan", cap: "Port Transit", state: "FLOWING", active: true },
                          { city: "Lagos", cap: "Fintech Gate", state: "NOMINAL" }
                        ].map((node, nIdx) => (
                          <div key={nIdx} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[9.5px] font-bold ${node.active ? 'bg-[#C8102E]/20 border-kcg-red text-kcg-red shadow-[0_0_15px_#C8102E]' : 'bg-[#0a0a0c] border-white/10 text-neutral-400'}`}>
                              0{nIdx + 1}
                            </div>
                            <span className="text-[10px] text-white font-extrabold mt-1.5 tracking-wide uppercase">{node.city}</span>
                            <span className="text-[7.5px] text-neutral-500 font-mono uppercase tracking-widest mt-0.5">{node.cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Animated connecting flow rays between nodes */}
                      <div className="absolute inset-x-12 top-1/3 h-[1px] bg-gradient-to-r from-neutral-800 via-kcg-red to-neutral-800 z-0">
                        <motion.div 
                          className="w-16 h-full bg-white blur-[2px]"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          style={{ position: 'absolute' }}
                        />
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="grid grid-cols-3 gap-4 text-left font-mono">
                      {[
                        { label: "Corridor Actif", val: "DELTA-7", text: "Optimal route auto-selected" },
                        { label: "Transit Cargo Gain", val: "-4.2 Heures", text: "Predictive routing gain" },
                        { label: "Alerte Embouteillage", val: "1.2% Risk", text: "Probability: Negligible" }
                      ].map((card, cIdx) => (
                        <div key={cIdx} className="bg-[#050507] border border-white/5 p-4 rounded-xl">
                          <span className="block text-[7.5px] text-neutral-500 uppercase tracking-widest">{card.label}</span>
                          <span className="block text-sm lg:text-base text-white font-extrabold mt-1 uppercase tracking-wider">{card.val}</span>
                          <span className="block text-[7.5px] text-neutral-400 font-light mt-1 font-sans italic">{card.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. TRANSACTIONAL COMPENSATION FLOW */}
                {activeTab === 'finance' && (
                  <motion.div
                    key="finance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 font-mono"
                  >
                    {/* Live simulated arbitrage logs */}
                    <div className="bg-[#050507] border border-white/5 rounded-2xl p-5 text-[9px] space-y-2.5 h-28 overflow-y-auto no-scrollbar relative">
                      <div className="text-green-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span>[ARBITRAGE_ENGINE] COMPENSATING LEDGER IN REAL-TIME</span>
                      </div>
                      <div className="text-neutral-400 flex justify-between">
                        <span>XOF COMPULSION ROUTE TO DAKAR NODE</span>
                        <span className="text-white">90 000 000 FCFA COMPENSATION EXEC: SUCCESS</span>
                      </div>
                      <div className="text-neutral-400 flex justify-between">
                        <span>LIQUIDITY MITIGATION IN PROGRESS (ABIDJAN-LAGOS LINK)</span>
                        <span className="text-kcg-red">LATENCY CAP: 0.004ms</span>
                      </div>
                      <div className="text-neutral-500">
                        {`[${new Date().toLocaleTimeString()}] COMPLIANCE PROTOCOL LOCKED - AES-256 SYNCED`}
                      </div>
                    </div>

                    {/* Arbitrage KPIs */}
                    <div className="grid grid-cols-3 gap-4 text-left">
                      {[
                        { label: "Compensation Ratio", val: "99.87%", text: "Autonomously settled" },
                        { label: "Fintech Velocity", val: "14.2K tx/s", text: "Throughput UEMOA" },
                        { label: "Arbitrage Gain (24H)", val: "+1.84%", text: "Direct margin accrued" }
                      ].map((card, cIdx) => (
                        <div key={cIdx} className="bg-[#050507] border border-white/5 p-4 rounded-xl">
                          <span className="block text-[7.5px] text-neutral-500 uppercase tracking-widest">{card.label}</span>
                          <span className="block text-sm lg:text-base text-white font-extrabold mt-1 tracking-wider">{card.val}</span>
                          <span className="block text-[7.5px] text-neutral-400 font-light mt-1 font-sans italic">{card.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. CONNECTED CROP OPTIMIZATION */}
                {activeTab === 'agriculture' && (
                  <motion.div
                    key="agriculture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Farming crop sensor telemetry visual */}
                    <div className="h-28 bg-[#050507] border border-white/5 rounded-2xl p-5 flex justify-between items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(200,16,46,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-80" />
                      
                      <div className="relative z-10 w-full grid grid-cols-3 gap-6 text-center">
                        {[
                          { title: "Humidité Sol", value: "68%", sub: "NOMINAL RANGE" },
                          { title: "Drought Risk", value: "1.4%", sub: "OPTIMAL HEALTH" },
                          { title: "Prév. Récolte", value: "+28.4%", sub: "AI BOOSTED YIELD" }
                        ].map((stat, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <span className="block text-[7.5px] text-neutral-500 font-mono uppercase tracking-widest">{stat.title}</span>
                            <span className="block text-xl font-display font-black text-white">{stat.value}</span>
                            <span className="block text-[7px] text-green-500 font-mono font-bold uppercase tracking-widest">{stat.sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Agriculture metrics */}
                    <div className="grid grid-cols-3 gap-4 text-left font-mono">
                      {[
                        { label: "Corridor Agro", val: "COCOA-WEST", text: "Integrated distribution loop" },
                        { label: "Water Optimization", val: "94.2% Efficiency", text: "Smart drip automated feed" },
                        { label: "Regional Yield Predict", val: "1.2M T/Q4", text: "Consolidated forecast CI/GH" }
                      ].map((card, cIdx) => (
                        <div key={cIdx} className="bg-[#050507] border border-white/5 p-4 rounded-xl">
                          <span className="block text-[7.5px] text-neutral-500 uppercase tracking-widest">{card.label}</span>
                          <span className="block text-sm lg:text-base text-white font-extrabold mt-1 tracking-wider">{card.val}</span>
                          <span className="block text-[7.5px] text-neutral-400 font-light mt-1 font-sans italic">{card.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>


            {/* ================= JARVIS LIVE OPERATIONAL DIRECTIVES SIMULATOR ================= */}
            <div className="border-t border-white/5 pt-6 space-y-4">
              <span className="text-[8.5px] font-mono text-neutral-500 uppercase tracking-[0.25em] block">
                DIRECTIVES OPÉRATIONNELLES D'IA (SIMULATEUR DE NOYAU COGNITIF)
              </span>

              {/* Action buttons triggers */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { cmd: "/run_drought_simulation", label: "Simuler Sécheresse (Agro)", desc: "Simulate regional dry season cocoa impact and auto-route fleet." },
                  { cmd: "/optimize_liquidity_settlement", label: "Optimiser Liquidités (Fintech)", desc: "Trigger transactional compaction of financial ledger across nodes." },
                  { cmd: "/trigger_air_cargo_shuttle", label: "Activer Fret Drone (Logistique)", desc: "Synthesize shipping routes of high-value Lithium core via AIRVOO." }
                ].map((btn, bIdx) => (
                  <button
                    key={bIdx}
                    onClick={() => handleCommandExecute(btn.cmd, btn.desc)}
                    disabled={isProcessing}
                    className="cursor-pointer text-left px-3.5 py-2.5 rounded-xl border border-white/5 hover:border-kcg-red/25 bg-[#050507] text-[9px] font-mono text-neutral-300 hover:text-white flex items-center gap-2 transition-all duration-300 group disabled:opacity-40 select-none"
                  >
                    <CornerDownRight className="w-3 h-3 text-kcg-red group-hover:translate-x-0.5 transition-transform" />
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic live terminal logs outputs */}
              <div className="bg-[#040406] border border-white/[0.04] p-4.5 rounded-xl font-mono text-[9px] text-neutral-400 space-y-1.5 max-h-36 overflow-y-auto no-scrollbar relative border border-kcg-red/10 shadow-[0_0_15px_rgba(200,16,46,0.03)]">
                {terminalLogs.slice(-4).map((log, lIdx) => (
                  <div key={lIdx} className={log.startsWith('>') ? "text-white font-extrabold" : log.startsWith('SUCCESS') ? "text-green-500 font-bold" : "text-neutral-400"}>
                    {log}
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-kcg-red flex items-center gap-2 animate-pulse font-black uppercase">
                    <span>⚡ COGNITIVE RECALIBRATION ENGINE RUNNING...</span>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= INTERACTIVE CINEMATIC HOLOGRAPHIC SCENES SHOWCASE ================= */}
      <div className="max-w-[1440px] mx-auto px-6 mt-32 relative z-20">
        
        <div className="border-t border-white/10 pt-16 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <span className="text-[9.5px] font-mono text-kcg-red uppercase tracking-[0.35em] font-black block">
              STUDIO DE PROJECTION VOLUMÉTRIQUE
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white leading-none">
              SCÉNOGRAPHIES ET SIMULATIONS HOLO-SOUVERAINES
            </h3>
          </div>
          <p className="text-neutral-500 text-xs font-light max-w-md font-sans leading-relaxed">
            Consultez les modélisations tridimensionnelles de notre suite d'intelligence. Activez chaque scène cinématique pour décoder son architecture de rendu et ses flux analytiques.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* List of scenes (Selectors) */}
          <div className="lg:col-span-5 space-y-4">
            {CINEMATIC_SCENES.map((scene) => {
              const Icon = scene.icon;
              const isSelected = activeScene === scene.id;
              
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene.id)}
                  className={`cursor-pointer w-full text-left p-6 rounded-[20px] border transition-all duration-500 flex items-start gap-4 select-none relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-gradient-to-r from-kcg-red/[0.04] to-transparent border-kcg-red/30 shadow-[0_0_20px_rgba(200,16,46,0.05)]' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Left edge indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 ${
                    isSelected ? 'bg-kcg-red' : 'bg-transparent'
                  }`} />

                  {/* Icon wrap with high-tech look */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0 ${
                    isSelected 
                      ? 'bg-kcg-red/10 border-kcg-red text-kcg-red shadow-[0_0_15px_rgba(200,16,46,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 text-neutral-400 group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="block text-[8px] font-mono text-neutral-500 tracking-widest uppercase">
                      {scene.projectionLabel}
                    </span>
                    <h4 className="text-sm font-display font-extrabold text-white uppercase tracking-tight truncate">
                      {scene.title}
                    </h4>
                    <p className="text-[10.5px] text-neutral-400 font-sans font-light line-clamp-2 leading-relaxed">
                      {scene.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active scene detail visualization (Jarvis / Sci-fi holographic projector look) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full kcg-glass bg-[#030305]/85 border border-white/10 rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              {/* Scanlines visual effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

              {/* Glowing projector halo */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-kcg-red/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Holographic grid visual animation panel */}
              <div className="h-48 bg-[#050507] border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-between p-5 mb-8">
                
                {/* Tech background matrix details */}
                <div className="absolute inset-0 bg-[radial-gradient(#111115_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-60" />
                <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8.5px] text-neutral-500">
                  <span className="w-1.5 h-1.5 bg-kcg-red rounded-full animate-ping" />
                  <span>TRANSMISSION_ACTIVE // BANDWIDTH: {selectedScene.flowSpeed}</span>
                </div>

                {/* Animated content matching the specific visualEffect type */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedScene.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {/* Interactive Visual FX representations */}
                      {selectedScene.visualEffect === 'pulsing-nodes' && (
                        <div className="relative w-full h-full flex items-center justify-center gap-8">
                          <span className="absolute inset-x-8 top-1/2 h-[1px] bg-dashed border-b border-white/10 animate-pulse" />
                          <div className="w-8 h-8 rounded-full bg-kcg-red/20 border border-kcg-red flex items-center justify-center text-[9.5px] font-mono text-kcg-red shadow-[0_0_15px_rgba(200,16,46,0.3)] font-extrabold animate-bounce">DK</div>
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[9.5px] font-mono text-white font-extrabold animate-pulse">AB</div>
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[9.5px] font-mono text-white font-extrabold animate-bounce">BM</div>
                        </div>
                      )}

                      {selectedScene.visualEffect === 'vector-terrain' && (
                        <div className="w-full h-full flex items-center justify-center relative">
                          {/* Simulated vector mountain meshes */}
                          <div className="w-3/4 h-3/4 border-b border-x border-white/5 rounded-lg flex items-end justify-between p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(200,16,46,0.05)_25%,transparent_25%),linear-gradient(-45deg,rgba(200,16,46,0.05)_25%,transparent_25%)] bg-[size:20px_20px]" />
                            <div className="w-1/4 h-12 bg-white/5 border-t border-white/20" />
                            <div className="w-1/3 h-16 bg-kcg-red/10 border-t border-kcg-red/40" />
                            <div className="w-1/5 h-8 bg-white/5 border-t border-white/20" />
                            <span className="absolute top-1/3 left-1/3 w-3 h-3 bg-kcg-red rounded-full animate-ping" />
                          </div>
                        </div>
                      )}

                      {selectedScene.visualEffect === 'spinning-rings' && (
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          <motion.div 
                            className="absolute inset-0 rounded-full border border-dashed border-kcg-red/40"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                          />
                          <motion.div 
                            className="absolute inset-3 rounded-full border border-double border-white/10"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          />
                          <SceneIcon className="w-6 h-6 text-kcg-red animate-pulse" />
                        </div>
                      )}

                      {selectedScene.visualEffect === 'biometric-waves' && (
                        <div className="w-full h-full flex items-center justify-center gap-1.5">
                          {[30, 60, 45, 90, 75, 40, 85, 50, 70].map((h, i) => (
                            <motion.div 
                              key={i} 
                              className="w-1 bg-gradient-to-t from-kcg-red to-white rounded-full" 
                              animate={{ height: [`${h}%`, `${Math.min(h + 20, 100)}%`, `${Math.max(h - 20, 10)}%`, `${h}%`] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subtitle projection path bar */}
                <div className="flex justify-between items-center text-[8.5px] font-mono text-neutral-500 pt-3 border-t border-white/[0.03]">
                  <span>HOLO_FEED_ONLINE // COGNITIVE_CALIBRATION: 100%</span>
                  <span>SYS_KRYPTON_SECURE</span>
                </div>
              </div>

              {/* Dynamic Descriptions */}
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 text-[8.5px] rounded bg-kcg-red/10 border border-kcg-red/20 text-kcg-red font-black uppercase tracking-widest font-mono inline-block">
                      {selectedScene.projectionLabel}
                    </span>
                    <h4 className="text-xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                      {selectedScene.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono tracking-wide uppercase italic">
                      {selectedScene.subtitle}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-mono text-neutral-500 tracking-widest uppercase font-black">
                        AMBIANCE CINÉMATIQUE
                      </span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed font-sans font-light">
                        {selectedScene.ambiance}
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-white/[0.03] pt-3">
                      <span className="block text-[8px] font-mono text-neutral-500 tracking-widest uppercase font-black">
                        RENDU TECHNIQUE & SCÉNARIO D'IA
                      </span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed font-sans font-light">
                        {selectedScene.rendering}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live telemetry details below */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono">
                  {selectedScene.telemetry.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-white/[0.01] border border-white/5 p-3 rounded-lg text-left">
                      <span className="block text-[7.5px] text-neutral-500 uppercase tracking-widest">
                        {metric.label}
                      </span>
                      <span className="block text-xs text-white font-extrabold mt-0.5 tracking-wider uppercase">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

