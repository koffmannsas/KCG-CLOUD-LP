import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Handshake,
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  DollarSign,
  HelpCircle,
  Upload,
  Clock,
  Sparkles,
  Zap,
  Briefcase,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface StrategicAlliancesDeskProps {
  onBack: () => void;
  onSelectOtherDesk?: (deskId: string) => void;
}

const ALLIANCE_PIPELINE = [
  {
    id: 'proj-01',
    name: 'West African Sovereign Cloud & AI Grid',
    sector: 'Infrastructures Clés & Data',
    region: 'UEMOA / CEDEAO',
    budget: '900 Milliards FCFA',
    lead: 'KCG Core + AfDB',
    stage: 'Financial Close',
    progress: 85,
    participants: 12,
    guarantee: 'Souveraine AAA',
    description: 'Réseau de 4 Datacenters Tier-IV interconnectés en fibre optique haute vitesse et fermes solaires dédiées pour l\'indépendance numérique régionale.'
  },
  {
    id: 'proj-02',
    name: 'AfCFTA Digital Trade & Clearing Corridor',
    sector: 'FinTech & Portuaire',
    region: 'Panafricain',
    budget: '550 Milliards FCFA',
    lead: 'KCG Ventures + PAPSS',
    stage: 'Consortium Assembly',
    progress: 60,
    participants: 18,
    guarantee: 'BCEAO / Multilattérale',
    description: 'Plateforme de règlement transfrontalier automatisé par contrats intelligents pour les échanges commerciaux intra-africains sans conversion dollar.'
  },
  {
    id: 'proj-03',
    name: 'Atlantic Green Energy & Hydrogen JV',
    sector: 'Énergie Propre & Transition',
    region: 'Côte d\'Ivoire - Maroc - UAE',
    budget: '1 400 Milliards FCFA',
    lead: 'KCG Energy & Masdar',
    stage: 'Feasibility Completed',
    progress: 40,
    participants: 8,
    guarantee: 'Garantie IFC / MIGA',
    description: 'Projet mixte hydrogène vert et parcs éoliens offshore avec interconnexion électrique sous-marine pour l\'exportation industrielle.'
  },
  {
    id: 'proj-04',
    name: 'Sovereign Port Logistics & Automated Hub',
    sector: 'Transport & Logistique',
    region: 'Golfe de Guinée',
    budget: '440 Milliards FCFA',
    lead: 'DP World + KCG Capital',
    stage: 'Execution Phase',
    progress: 92,
    participants: 6,
    guarantee: 'Souveraine État',
    description: 'Modernisation robotisée des terminaux à conteneurs avec douane autonome IA et intégration ferroviaire hinterland.'
  }
];

const CORRIDORS = [
  { name: "Abidjan - Paris - Genève", role: "Axe Financier & Multilatéral", volume: "2 700 Milliards FCFA", status: "Opérationnel" },
  { name: "Dubai - Abidjan - Singapour", role: "Hub Co-Investissement & Tech", volume: "3 900 Milliards FCFA", status: "En Expansion" },
  { name: "Washington - London - Riyadh", role: "Pôle Garanties Souveraines", volume: "2 400 Milliards FCFA", status: "Opérationnel" },
  { name: "Lagos - Nairobi - Johannesburg", role: "Corridor Digital & AfCFTA", volume: "1 800 Milliards FCFA", status: "Actif" }
];

export default function StrategicAlliancesDesk({ onBack, onSelectOtherDesk }: StrategicAlliancesDeskProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ppp' | 'pipeline' | 'criteria' | 'proposal'>('overview');
  const [selectedPipeline, setSelectedPipeline] = useState<string>('proj-01');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  // Proposal form state
  const [proposalData, setProposalData] = useState({
    orgName: '',
    orgType: 'Multilateral / Sovereign Wealth',
    country: '',
    sector: 'Infrastructures & Énergie',
    projectCapex: '50 M-FCFA - 300 M-FCFA',
    desiredRole: 'Co-Investisseur Équité',
    timeline: '6-12 Mois',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    executiveSummary: '',
    agreedTerms: false
  });

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `JV-KCG-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedCode(randomCode);
  };

  const filteredPipeline = sectorFilter === 'all'
    ? ALLIANCE_PIPELINE
    : ALLIANCE_PIPELINE.filter(p => p.sector.toLowerCase().includes(sectorFilter.toLowerCase()));

  const activeProject = ALLIANCE_PIPELINE.find(p => p.id === selectedPipeline) || ALLIANCE_PIPELINE[0];

  return (
    <div className="w-full bg-[#03060c] text-slate-100 min-h-screen relative overflow-hidden font-sans">
      {/* Background Glow Networks */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation Header bar */}
      <div className="sticky top-0 z-40 bg-[#03060c]/90 backdrop-blur-md border-b border-emerald-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider transition-colors border border-emerald-500/30 cursor-pointer"
          >
            ← Retour aux Desks
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold uppercase">
              DESK 05 // ALLIANCES STRATÉGIQUES & JOINT-VENTURES
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">CONSORTIA NETWORK: ONLINE</span>
          <span className="text-slate-600">|</span>
          <span>PIPELINE CAPEX: 9 500 Milliards FCFA</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-12">
        {/* HERO SECTION */}
        <div className="relative rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#070e18] to-cyan-950/30 border border-emerald-500/30 p-8 lg:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Handshake className="w-3.5 h-3.5" />
            Consortium Command Center & PPP Strategic Desk
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Structurez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Joint-Ventures Solares & Partenariats Public-Privé</span> à Échelle Internationale.
          </h1>

          <p className="mt-4 text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Pôle d&apos;ingénierie financière et juridique dédié aux banques multilatérales de développement, fonds souverains, géants industriels et gouvernements pour le co-investissement d&apos;infrastructures critiques.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Projets PPP en Pipeline</div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono mt-1">32 Projets</div>
              <div className="text-[10px] text-slate-500 mt-1">UEMOA, CEMAC & MENA</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-cyan-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">CapEx Moyen Structuré</div>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono mt-1">290 M-FCFA</div>
              <div className="text-[10px] text-slate-500 mt-1">Ticket 30M à 1 500 M-FCFA</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Partenaires Multilatéraux</div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400 font-mono mt-1">84 Inst.</div>
              <div className="text-[10px] text-slate-500 mt-1">AfDB, IFC, MIGA, WEF</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-teal-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Note de Risque Moyenne</div>
              <div className="text-2xl md:text-3xl font-bold text-teal-400 font-mono mt-1">AAA / AA+</div>
              <div className="text-[10px] text-slate-500 mt-1">Avec Garantie Souveraine</div>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              🌐 Réseau & Corridors
            </button>

            <button
              onClick={() => setActiveTab('ppp')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'ppp'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              🏛 Modèles de Joint-Venture
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              📊 Pipeline d&apos;Investissement
            </button>

            <button
              onClick={() => setActiveTab('criteria')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'criteria'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              ⚖️ Éligibilité & Protocole
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'proposal'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              📝 Soumettre un Projet JV
            </button>
          </div>
        </div>

        {/* SECTION 1: ANIMATED COOPERATION NETWORK & MAP CORRIDORS */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map & Corridor visualizer */}
              <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      Réseau Global de Coopération & Consortia Transfrontaliers
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Cartographie dynamique des flux de capital souverain et partenariats multilatéraux.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    LIVE NETWORK
                  </span>
                </div>

                {/* SVG Map Visualization */}
                <div className="relative w-full h-[320px] bg-[#020408] rounded-xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
                  {/* Subtle map lines background */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Animated Nodes & Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Connection lines */}
                    <path d="M 200 120 Q 350 80 500 140" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                    <path d="M 200 120 Q 280 200 380 220" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 6" />
                    <path d="M 500 140 Q 420 220 380 220" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <path d="M 380 220 Q 520 250 620 180" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
                  </svg>

                  {/* Hub Pins */}
                  <div className="absolute top-[35%] left-[25%] flex flex-col items-center">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/40 mt-1">
                      WASHINGTON / IFC (2 000 M-FCFA)
                    </span>
                  </div>

                  <div className="absolute top-[28%] left-[55%] flex flex-col items-center">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/40 mt-1">
                      GENÈVE / WEF (1 800 M-FCFA)
                    </span>
                  </div>

                  <div className="absolute top-[65%] left-[42%] flex flex-col items-center">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-400"></span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white bg-emerald-950/90 px-2.5 py-1 rounded border border-emerald-400 mt-1 shadow-lg shadow-emerald-500/30">
                      ABIDJAN HQ (KCG ALLIANCE)
                    </span>
                  </div>

                  <div className="absolute top-[50%] left-[72%] flex flex-col items-center">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/40 mt-1">
                      DUBAI / RIYADH (2 900 M-FCFA)
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Savoir-faire: Co-Ingénierie Juridique, MIGA Guarantees & Structuration Blended Finance</span>
                  <a href="#proposal" onClick={() => setActiveTab('proposal')} className="text-emerald-400 hover:underline flex items-center gap-1">
                    Déposer un Dossier <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Corridors List */}
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Corridors Stratégiques Actifs
                </h3>

                <div className="space-y-3">
                  {CORRIDORS.map((corridor, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">{corridor.name}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                          {corridor.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{corridor.role}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-500 font-mono">Volume Sous Gest.</span>
                        <span className="text-emerald-400 font-bold font-mono">{corridor.volume}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 2: MODÈLES DE JOINT-VENTURE & PPP */}
        {(activeTab === 'overview' || activeTab === 'ppp') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                  Structures d&apos;Alliance & Modèles de Co-Investissement
                </h2>
                <p className="text-sm text-slate-400">
                  Cadres contractuels standardisés pour l&apos;exécution rapide de projets d&apos;envergure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-6 flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Partenariat Public-Privé (PPP Souverain)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Accords de concession longue durée (BOT, BOOT, DBFO) soutenus par des garanties de l&apos;État et financements multilatéraux (MIGA, IFC).
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ticket min. 65 Milliards FCFA
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Garantie de risque politique
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gouvernance conjointe 25 ans+
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('proposal')}
                  className="mt-6 w-full py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                >
                  Proposer un dossier PPP →
                </button>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 p-6 flex flex-col justify-between relative group hover:border-cyan-400 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Joint-Venture Industrielle & Tech</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Création d&apos;entreprises conjointes dédiées à la souveraineté technologique, aux datacenters régionaux et à l&apos;énergie décarbonée.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Transfert de technologie garanti
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Partage de propriété intellectuelle
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Ancrage local & RH formé
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('proposal')}
                  className="mt-6 w-full py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                >
                  Créer une JV Tech →
                </button>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 p-6 flex flex-col justify-between relative group hover:border-amber-400 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Consortium de Co-Investissement Blended</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Syndication de fonds mixtes associant capital concessionnel, dette privée senior et equity souveraine pour limiter le coût du capital.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Subordination des tranches de risque
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Alignement ESG & taxonomie verte
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Sortie et refinancement structurés
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('proposal')}
                  className="mt-6 w-full py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                >
                  Rejoindre le Consortium →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 3: PIPELINE INTERACTIF & DETAILS */}
        {(activeTab === 'overview' || activeTab === 'pipeline') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Layers className="w-6 h-6 text-emerald-400" />
                  Pipeline des Projets d&apos;Alliance en Cours
                </h2>
                <p className="text-sm text-slate-400">
                  Sélection des transactions stratégiques en cours de syndication et d&apos;assemblage.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Filtrer par secteur:</span>
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">Tous les secteurs</option>
                  <option value="data">Data & Sovereign Cloud</option>
                  <option value="fintech">FinTech & Clearing</option>
                  <option value="énergie">Énergie Propre</option>
                  <option value="transport">Transport & Ports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pipeline List */}
              <div className="space-y-4">
                {filteredPipeline.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedPipeline(project.id)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      selectedPipeline === project.id
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {project.sector}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">{project.budget}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{project.name}</h4>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <span>{project.region}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-mono">{project.stage}</span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Avancement Consortium</span>
                        <span className="text-emerald-400">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Selected Project Focus */}
              <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        FICHE DE PROJET DISPONIBLE EN CO-INVESTISSEMENT
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">{activeProject.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-emerald-400">{activeProject.budget}</span>
                      <div className="text-[10px] text-slate-400 font-mono">CAPEX REQUIS</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                    {activeProject.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-500">RÉGION CIBLE</div>
                      <div className="text-xs font-bold text-white mt-0.5">{activeProject.region}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-500">SPONSOR PRINCIPAL</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">{activeProject.lead}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-500">GARANTIE ASSOCIÉE</div>
                      <div className="text-xs font-bold text-amber-400 mt-0.5">{activeProject.guarantee}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-500">PARTICIPANTS ACTIFS</div>
                      <div className="text-xs font-bold text-cyan-400 mt-0.5">{activeProject.participants} Entités</div>
                    </div>
                  </div>

                  {/* Execution Timeline */}
                  <div className="mt-8">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                      Feuille de Route d&apos;Exécution
                    </h5>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        1. Étude d&apos;Impact (OK)
                      </div>
                      <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        2. Assemblage JV (En cours)
                      </div>
                      <div className="p-2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        3. Clôture Financière
                      </div>
                      <div className="p-2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        4. Construction & BOT
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-mono">
                    Accès restreint aux mémorandums d&apos;information pour partenaires qualifiés.
                  </span>
                  <button
                    onClick={() => setActiveTab('proposal')}
                    className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    Demander le Prospectus Privé <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 4: ELIGIBILITY & VALIDATION STEPS */}
        {(activeTab === 'overview' || activeTab === 'criteria') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                Critères d&apos;Éligibilité & Protocole d&apos;Agrément Consortia
              </h2>
              <p className="text-sm text-slate-400">
                Processus d&apos;habilitation en 4 étapes pour l&apos;entrée dans un véhicule de co-investissement KCG.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-emerald-500/30 font-mono absolute top-4 right-4">01</div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-2">Phase 1</div>
                <h4 className="text-base font-bold text-white">Vérification Institutionnelle</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Audit KYC/AML renforcé, validation de la notation souveraine ou du bilan d&apos;entreprise (&gt;65 M-FCFA AUM).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-cyan-500/30 font-mono absolute top-4 right-4">02</div>
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">Phase 2</div>
                <h4 className="text-base font-bold text-white">Alignement Stratégique</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Analyse de la synergie technologique ou industrielle et signature de l&apos;accord de confidentialité (NDA).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-amber-500/30 font-mono absolute top-4 right-4">03</div>
                <div className="text-xs font-mono text-amber-400 font-bold uppercase mb-2">Phase 3</div>
                <h4 className="text-base font-bold text-white">Structuration Financière</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Modélisation des tranches de dette/équité et intégration des garanties multilatérales (MIGA / IFC).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-teal-500/30 font-mono absolute top-4 right-4">04</div>
                <div className="text-xs font-mono text-teal-400 font-bold uppercase mb-2">Phase 4</div>
                <h4 className="text-base font-bold text-white">Signature Charte JV</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Ratification du pacte d&apos;actionnaires, nomination au comité de gouvernance et déblocage des fonds.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 5: PROPOSAL WIZARD FORM */}
        <div id="proposal" className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#070e18] to-slate-900 border border-emerald-500/30 p-8 lg:p-12 shadow-2xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              PORTEFEUILLE PROPOSITIONS STRATÉGIQUES
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
              Déposer une Demande d&apos;Alliance ou de Joint-Venture
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Saisissez les paramètres majeurs de votre projet pour étude préalable par la Direction des Alliances Stratégiques.
            </p>
          </div>

          {submittedCode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">Dossier d&apos;Alliance Enregistré</h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Votre proposition de partenariat a été transmise au Comité des Alliances Stratégiques. Un chargé d&apos;affaires senior prendra contact sous 6h.
              </p>

              <div className="inline-block px-6 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-lg">
                CODE DOSSIER: {submittedCode}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSubmittedCode(null)}
                  className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono uppercase cursor-pointer"
                >
                  Soumettre un autre projet
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Nom de l&apos;Organisation / Gouvernement *
                  </label>
                  <input
                    type="text"
                    required
                    value={proposalData.orgName}
                    onChange={e => setProposalData({ ...proposalData, orgName: e.target.value })}
                    placeholder="ex: Banque Africaine de Développement / Masdar / État"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Type d&apos;Entité *
                  </label>
                  <select
                    value={proposalData.orgType}
                    onChange={e => setProposalData({ ...proposalData, orgType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Multilateral / Sovereign Wealth">Institution Multilatérale / Fonds Souverain</option>
                    <option value="Government Agency">Ministère / Agence Gouvernementale</option>
                    <option value="Global Industrial Conglomerate">Groupe Industriel Multinationale</option>
                    <option value="Infrastructure Fund">Fonds d&apos;Infrastructure Privé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Pays / Juridiction d&apos;Implantation *
                  </label>
                  <input
                    type="text"
                    required
                    value={proposalData.country}
                    onChange={e => setProposalData({ ...proposalData, country: e.target.value })}
                    placeholder="ex: Côte d'Ivoire, Émirats Arabes Unis, France..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Secteur du Projet *
                  </label>
                  <select
                    value={proposalData.sector}
                    onChange={e => setProposalData({ ...proposalData, sector: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Infrastructures & Énergie">Infrastructures & Énergie Propre</option>
                    <option value="Sovereign Cloud & IA">Sovereign Cloud, IA & Telecom</option>
                    <option value="Ports & Logistics">Ports, Ferroutage & Logistique</option>
                    <option value="Financial Systems">Systèmes Financiers & Clearing AfCFTA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Taille du CapEx Envisagé *
                  </label>
                  <select
                    value={proposalData.projectCapex}
                    onChange={e => setProposalData({ ...proposalData, projectCapex: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="5 Milliards - 30 Milliards FCFA">5 M-FCFA - 30 M-FCFA</option>
                    <option value="30 Milliards - 130 Milliards FCFA">30 M-FCFA - 130 M-FCFA</option>
                    <option value="130 Milliards - 650 Milliards FCFA">130 M-FCFA - 650 M-FCFA</option>
                    <option value="> 650 Milliards FCFA">&gt; 650 M-FCFA (Mega-Projet Souverain)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Rôle Souhaité de KCG Capital *
                  </label>
                  <select
                    value={proposalData.desiredRole}
                    onChange={e => setProposalData({ ...proposalData, desiredRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Co-Investisseur Équité">Sponsor / Co-Investisseur Équité</option>
                    <option value="Lead Arranger & Structuration">Lead Arranger & Structuration PPP</option>
                    <option value="Fournisseur Tech & Exploitant">Fournisseur Technologique & Operator</option>
                    <option value="Garantie & Syndication">Syndication de Dette & Garanties</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Nom du Mandataire / Contact Exécutif *
                  </label>
                  <input
                    type="text"
                    required
                    value={proposalData.contactName}
                    onChange={e => setProposalData({ ...proposalData, contactName: e.target.value })}
                    placeholder="Nom complet & Titre"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Adresse Email Officielle / Institutionnelle *
                  </label>
                  <input
                    type="email"
                    required
                    value={proposalData.contactEmail}
                    onChange={e => setProposalData({ ...proposalData, contactEmail: e.target.value })}
                    placeholder="nom@institution.org"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Résumé Exécutif & Note d&apos;Intention *
                </label>
                <textarea
                  rows={4}
                  required
                  value={proposalData.executiveSummary}
                  onChange={e => setProposalData({ ...proposalData, executiveSummary: e.target.value })}
                  placeholder="Décrivez brièvement les objectifs du partenariat, la structure envisagée et le calendrier visé..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Document upload dropzone preview */}
              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 transition-colors">
                <Upload className="w-6 h-6 text-emerald-400 mb-2" />
                <span className="text-xs font-mono text-slate-300">
                  Joindre la Note Conceptuelle ou le Prospectus (PDF, max 25MB)
                </span>
                <span className="text-[10px] text-slate-500 mt-1">
                  Document chiffré PGP de bout en bout
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="alliance-terms"
                  required
                  checked={proposalData.agreedTerms}
                  onChange={e => setProposalData({ ...proposalData, agreedTerms: e.target.checked })}
                  className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="alliance-terms" className="text-xs text-slate-400 cursor-pointer">
                  J&apos;atteste agir au nom d&apos;une entité légalement mandatée et accepte le protocole de confidentialité des Alliances Stratégiques KCG.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
              >
                Soumettre au Comité des Alliances Stratégiques →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
