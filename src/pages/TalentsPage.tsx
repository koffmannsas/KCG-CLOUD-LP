import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Upload, 
  Brain, 
  Target, 
  TrendingUp, 
  Search, 
  Users,
  Filter, 
  LayoutDashboard, 
  UserCheck, 
  ShieldCheck, 
  BarChart3,
  Mail,
  Linkedin,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Navbar from '@/src/components/Navbar';

// --- Types ---
type ViewState = 'discovery' | 'vortex' | 'immersion' | 'identification' | 'activation' | 'simulation' | 'culture' | 'pressure' | 'ai_interview' | 'analysis' | 'results' | 'admin';

interface Candidate {
  id: string;
  name: string;
  score: number;
  tags: string[];
  department: string;
  status: 'Elite' | 'High' | 'Strategic' | 'Standard';
  detectedSignals: string[];
}

// --- Mock Data ---
const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Sarah Koffmann', score: 94, tags: ['Leadership', 'Strategy'], department: 'Infrastructure', status: 'Elite', detectedSignals: ['Visionary Thinking', 'Strong Execution'] },
  { id: '2', name: 'Paul Mensah', score: 91, tags: ['AI', 'Computing'], department: 'FIKO AI', status: 'High', detectedSignals: ['Deep Logic', 'Technical Mastery'] },
  { id: '3', name: 'Amina Diallo', score: 88, tags: ['Finance', 'Logistics'], department: 'FIKO PAY', status: 'Strategic', detectedSignals: ['Operational Agility', 'High EI'] },
  { id: '4', name: 'Jean-Paul Yao', score: 72, tags: ['Communication'], department: 'AIRVOO', status: 'Standard', detectedSignals: ['Creative Spark'] },
];

export default function TalentsPage() {
  const [view, setView] = useState<ViewState>('discovery');
  const [candidateData, setCandidateData] = useState({ name: '', missionId: '1' });
  
  return (
    <div className="h-[100dvh] bg-black text-kcg-white selection:bg-kcg-red selection:text-white font-sans flex flex-col overflow-hidden" data-lenis-prevent>
      <Navbar />
      
      <main className="flex-1 mt-[78px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'discovery' && (
            <DiscoveryView 
              onSelect={(id) => {
                setCandidateData(prev => ({ ...prev, missionId: id }));
                setView('vortex');
              }} 
              onAdmin={() => setView('admin')} 
            />
          )}
          {view === 'vortex' && <VortexScreen onComplete={() => setView('immersion')} />}
          {view === 'immersion' && <ImmersionScreen missionId={candidateData.missionId} onStart={() => setView('identification')} />}
          {view === 'identification' && (
            <IdentificationScreen 
              onComplete={(name) => {
                setCandidateData(prev => ({ ...prev, name }));
                setView('activation');
              }} 
            />
          )}
          {view === 'activation' && <CognitiveActivationScreen onComplete={() => setView('simulation')} />}
          {view === 'simulation' && <StrategicSimulationScreen missionId={candidateData.missionId} onComplete={() => setView('culture')} />}
          {view === 'culture' && <CultureScreen onComplete={() => setView('pressure')} />}
          {view === 'pressure' && <PressureScreen onComplete={() => setView('ai_interview')} />}
          {view === 'ai_interview' && <AIInterviewScreen onComplete={() => setView('analysis')} />}
          {view === 'analysis' && <AnalysisScreen onComplete={() => setView('results')} />}
          {view === 'results' && <ResultView onHome={() => setView('discovery')} candidateName={candidateData.name} missionId={candidateData.missionId} />}
          {view === 'admin' && <AdminDashboard onBack={() => setView('discovery')} />}
        </AnimatePresence>
      </main>

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
      </div>
    </div>
  );
}

// --- Views ---

const OPEN_MISSIONS = [
  {
    id: "ia_infra",
    title: "IA & INFRASTRUCTURE",
    desc: "Construire les systèmes cognitifs du futur africain.",
    match: 99,
    company: "KCG INFRA",
    location: "Souveraineté Systémique",
    intensity: "Cognitive Max",
    leadership: "Technical Executive",
    tag: "IA",
    division: "Infrastructure",
    signal: "Elite Match"
  },
  {
    id: "logistics",
    title: "LOGISTIQUE & OPÉRATIONS",
    desc: "Optimiser les réseaux d'exécution continentaux.",
    match: 94,
    company: "KCG LOGISTICS",
    location: "Expansion",
    intensity: "Operational Focus",
    leadership: "Field Commander",
    tag: "Logistique",
    division: "Opérations",
    signal: "Strategic Potential"
  },
  {
    id: "finance",
    title: "FINANCE & STRATÉGIE",
    desc: "Concevoir les moteurs de croissance souverains.",
    match: 96,
    company: "KCG FINANCE",
    location: "Systèmes",
    intensity: "Strategic Analysis",
    leadership: "Financial Architect",
    tag: "Finance",
    division: "Stratégie",
    signal: "High Logic"
  },
  {
    id: "marketing",
    title: "MARKETING & INFLUENCE",
    desc: "Déployer des narrations capables d'influencer des marchés.",
    match: 90,
    company: "KCG MEDIA",
    location: "Guerre Narrative",
    intensity: "Creative Control",
    leadership: "Narrative Director",
    tag: "Marketing",
    division: "Influence",
    signal: "System Thinker"
  },
  {
    id: "free",
    title: "CANDIDATURE LIBRE",
    desc: "Je souhaite être détecté pour mon potentiel global.",
    match: 100,
    company: "KCG TALENTS",
    location: "Indexation Complète",
    intensity: "Adaptive",
    leadership: "Pioneer",
    tag: "Potentiel",
    division: "Détection",
    signal: "Adaptive Scope"
  }
];

function ProgressTracker({ current }: { current: string }) {
  const steps = ['Immersion', 'Identification', 'Activation', 'Simulation', 'Culture', 'Pressure', 'Interview', 'Validation'];
  return (
    <div className="absolute top-8 left-0 right-0 flex justify-center z-10 opacity-70 px-4">
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-[7px] md:text-[9px] uppercase font-black tracking-[0.4em] text-white/20">
        {steps.map(s => (
          <span key={s} className={s === current ? "text-kcg-red" : ""}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function DiscoveryView({ onSelect, onAdmin }: { onSelect: (id: string) => void, onAdmin: () => void }) {
  const missions = OPEN_MISSIONS;

  const [selectedId, setSelectedId] = useState(missions[0].id);
  const selectedMission = missions.find(m => m.id === selectedId) || missions[0];
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [showMissions, setShowMissions] = useState(false);

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedId]);

  if (!showMissions) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col items-center justify-center relative p-6 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.05)_0%,transparent_50%)] pointer-events-none" />
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
           animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-[70rem] space-y-12 relative z-10"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-[0.95] mt-12 md:mt-20">
            Construisez les infrastructures <br className="hidden md:block"/>
            <span className="text-kcg-red">qui transformeront l’Afrique.</span>
          </h1>

          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black max-w-2xl mx-auto">
            Explorez les missions stratégiques du KOFFMANN CAPITAL GROUP.
          </p>

          <div className="pt-20 flex flex-col items-center gap-12">
            <button 
              onClick={() => setShowMissions(true)}
              className="px-12 md:px-16 py-6 bg-white text-black text-[10px] md:text-xs uppercase tracking-[0.5em] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              Explorer les offres
            </button>
            <button 
              onClick={onAdmin}
              className="text-[8px] uppercase tracking-[0.5em] text-white/10 hover:text-kcg-red transition-colors font-black"
            >
              Terminal Exécutif — Accès Restreint
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex lg:flex-row flex-col overflow-hidden"
    >
      {/* LEFT: Independent Feed (35% desktop, 40% height mobile) */}
      <div className="lg:w-[35%] w-full flex-[4] lg:flex-none lg:h-full flex flex-col bg-black relative transition-all border-r border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 space-y-6 shrink-0 relative z-30 bg-black">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input 
              placeholder="Rechercher une mission..." 
              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-3 pr-6 pl-10 text-[10px] uppercase tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-kcg-red/30 transition-all font-black h-11"
            />
          </div>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-kcg-red font-black italic underline decoration-kcg-red/20 underline-offset-8">Missions Ouvertes ({missions.length})</h2>
            <Filter className="w-3.5 h-3.5 text-white/20 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto scrollbar-hidden p-6 space-y-3 relative z-10"
          data-lenis-prevent
        >
          {missions.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedId(m.id)}
              className={cn(
                "p-6 rounded-2xl cursor-pointer transition-all border group relative overflow-hidden",
                selectedId === m.id 
                  ? "bg-kcg-red/5 border-kcg-red/40 shadow-[0_10px_30px_rgba(200,16,46,0.02)]" 
                  : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
              )}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-kcg-red font-black">{m.company}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[8px] uppercase tracking-widest text-emerald-500 font-bold">{m.match}% Match</span>
                  </div>
                </div>
                
                <h3 className={cn(
                  "text-sm font-display font-medium leading-snug transition-colors",
                  selectedId === m.id ? "text-white" : "text-white/60 group-hover:text-white"
                )}>{m.title}</h3>
                
                <div className="flex items-center gap-4 text-[8px] uppercase tracking-widest text-white/30 font-bold">
                  <span>{m.location}</span>
                  <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                  <span>{m.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="pt-12 pb-6 flex justify-center">
            <div className="text-[8px] uppercase tracking-[0.5em] text-white/5 font-black">
              Fin des missions
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Strategic Reader (65% desktop, 60% height mobile) */}
      <div 
        ref={rightPanelRef}
        className="flex-[6] lg:flex-1 bg-black overflow-y-auto scroll-smooth lg:h-full relative"
        data-lenis-prevent
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-full flex flex-col pt-4 lg:pt-8"
          >
            <div className="sticky top-4 lg:top-8 z-40 mx-4 lg:mx-12 bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between">
                <div className="space-y-1 overflow-hidden pr-4">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-kcg-red font-black block truncate">{selectedMission.company}</span>
                  <h4 className="text-sm font-display font-medium text-white uppercase tracking-tight truncate">{selectedMission.title}</h4>
                </div>
                
                <div className="flex items-center gap-6 shrink-0">
                  <button className="hidden sm:block text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors font-black">Enregistrer</button>
                  <button 
                    onClick={() => onSelect(selectedId)}
                    className="px-6 lg:px-8 py-3 bg-kcg-red text-white text-[9px] lg:text-[10px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_20px_40px_rgba(200,16,46,0.2)] flex items-center gap-2 lg:gap-3 shrink-0"
                  >
                    Postuler à cette offre ✨
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-[860px] mx-auto px-6 lg:px-12 py-16 pb-32 space-y-16">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-kcg-red/10 border border-kcg-red/20 rounded-full">
                    <span className="text-[9px] uppercase tracking-widest text-kcg-red font-black">{selectedMission.signal}</span>
                  </div>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{selectedMission.leadership}</span>
                  </div>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-display font-medium leading-[1] uppercase tracking-tighter text-white">
                  {selectedMission.title}
                </h1>
              </div>

              <div className="space-y-12">
                <div className="space-y-8">
                  <h5 className="text-[10px] uppercase tracking-[0.5em] text-kcg-red font-black">Introduction Stratégique</h5>
                  <p className="text-2xl text-white/70 font-light leading-[1.85] italic font-sans">
                    “{selectedMission.desc}”
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h5 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">Attentes Institutionnelles</h5>
                      <ul className="space-y-4">
                        {[
                          "Architectures Systèmes Hautes Performances",
                          "Décision Souveraine sous Ambiguïté",
                          "Leadership de Projet à Impact Continental",
                          "Agilité Cognitive d'Extraction"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <div className="w-1 h-1 rounded-full bg-kcg-red mt-1.5 shrink-0" />
                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">Souveraineté & Impact</h5>
                      <p className="text-xs text-white/30 font-light leading-relaxed">
                        Chaque décision prise au sein de cette division a un impact direct sur la résilience technologique de 400 millions de citoyens. Nous ne cherchons pas des employés, mais des bâtisseurs.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="p-10 kcg-card rounded-[32px] border-kcg-red/10 bg-kcg-red/[0.01] space-y-8">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }} 
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-kcg-red" 
                        />
                        <span className="text-[10px] uppercase tracking-widest text-kcg-red font-black">Talentium Match™</span>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <span className="text-4xl font-display font-medium text-white">{selectedMission.match}%</span>
                          <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Excellent Signal</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedMission.match}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-kcg-red" 
                          />
                        </div>
                        <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold leading-relaxed">
                          Votre empreinte cognitive correspond aux critères de sélection KCG de type exécutif.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 border border-white/5 rounded-3xl">
                      <Globe className="w-5 h-5 text-white/10" />
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-widest text-white/60 font-black italic">Perspective 2035</p>
                        <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Contribution Digitale Continentale</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h5 className="text-[10px] uppercase tracking-[0.5em] text-kcg-red font-black">Culture & Leadership</h5>
                  <p className="text-sm text-white/40 leading-[1.8] font-light max-w-2xl">
                    L'environnement KCG est défini par une méritocratie radicale et une agilité intellectuelle permanente. Nos leaders sont des pragmatiques visionnaires capables de naviguer dans l'incertitude avec une clarté totale.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h5 className="text-[10px] uppercase tracking-[0.5em] text-kcg-red font-black">Impact Stratégique</h5>
                  <p className="text-sm text-white/40 leading-[1.8] font-light max-w-2xl">
                    Le titulaire de cette mission participera à la définition des standards technologiques souverains pour la prochaine décennie. C'est une opportunité de laisser une empreinte civilisationnelle durable.
                  </p>
                </div>
              </div>

              <div className="pt-24 pb-12 border-t border-white/5 flex flex-col items-center gap-12 text-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-white">Prêt pour l'éveil stratégique ?</h3>
                  <p className="text-white/30 text-[9px] font-light max-w-xs uppercase tracking-[0.3em] leading-relaxed">L'activation lancera le protocole de détection AI Talentium.</p>
                </div>
                <button 
                  onClick={() => onSelect(selectedId)}
                  className="px-10 py-5 bg-white text-black font-black rounded-full hover:bg-kcg-red hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(255,255,255,0.05)] border border-white"
                >
                  Entrer dans le protocole ✨
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function VortexScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-kcg-red/5 animate-pulse" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kcg-red/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-kcg-red animate-spin mb-4" />
            <h2 className="text-xs uppercase tracking-[0.6em] text-kcg-red font-black">Protocole TALENTS KCG™</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tight">Initialisation du Vortex</h1>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Votre profil va entrer dans une expérience de détection cognitive conçue pour identifier les futurs architectes de l'écosystème.
          </p>
        </motion.div>

        <div className="pt-12 space-y-4">
          {[
            "Mission Alignment Protocol Initialized...",
            "Cognitive Signal Detection Starting...",
            "Strategic Evaluation Environment Loading..."
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (i * 0.5) }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ImmersionScreen({ missionId, onStart }: { missionId?: string, onStart: () => void }) {
  const mission = OPEN_MISSIONS.find(m => m.id === missionId) || OPEN_MISSIONS[0];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Force a 8 second cinematic progressive reveal
    if (phase < 2) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full flex flex-col justify-between overflow-hidden text-center"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 grayscale brightness-50"
        >
          <source 
            src="https://cdn.pixabay.com/video/2022/10/26/136423-764024240_large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-[#050816]/80 backdrop-blur-[2px]" />
      </div>

      <ProgressTracker current="Immersion" />

      <div className="container mx-auto px-6 relative z-10 space-y-12 max-w-5xl text-center flex-1 flex flex-col justify-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="space-y-4"
        >
          <h1 className="text-4xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-[1] text-white">
            Bienvenue dans <br className="md:hidden" /><span className="text-kcg-red">TALENTS KCG™</span>
          </h1>
          
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.p key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto italic mt-8">
                “Cette expérience intelligente a été conçue pour détecter le potentiel des futurs architectes du KOFFMANN CAPITAL GROUP.”
              </motion.p>
            )}
            {phase === 1 && (
              <motion.p key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto italic mt-8">
                “Nous déconstruisons les recrutements traditionnels. Préparez-vous à une immersion cognitive de 20 minutes.”
              </motion.p>
            )}
            {phase === 2 && (
              <motion.p key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto italic mt-8">
                “Focalisez votre attention. L'identification commence maintenant.”
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-12"
          >
            <button 
              onClick={onStart}
              className="px-12 md:px-16 py-6 md:py-8 bg-white text-[#050816] font-black rounded-full hover:scale-105 active:scale-95 transition-all group flex flex-col items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.5em] shadow-[0_0_40px_rgba(255,255,255,0.2)] mx-auto"
            >
              Lancer la Séquence
              <span className="text-[8px] opacity-50 font-bold tracking-widest text-[#050816]">Identity Detection Engine™</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function IdentificationScreen({ onComplete }: { onComplete: (name: string) => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    { q: "Identité de l'architecte", p: "Comment devons-nous vous appeler ?", key: 'name' },
    { q: "Qu'est-ce qui vous pousse réellement à vouloir construire quelque chose de grand ?", p: "Votre moteur intérieur...", key: 'ambition' },
    { q: "Parlez-nous d'une situation où vous avez continué malgré l'incertitude totale.", p: "Une preuve de résilience...", key: 'resilience' },
    { q: "Que choisissez-vous : la sécurité, ou l'impact ?", p: "Votre arbitrage fondamental...", key: 'impact' },
    { q: "Quelle est votre plus grande conviction qui est souvent contredite par les autres ?", p: "Votre singularité cognitive...", key: 'conviction' },
    { q: "Comment réagissez-vous quand vos compétences ne suffisent plus face au problème ?", p: "Votre réflexe d'apprentissage...", key: 'learning' }
  ];

  const signals = [
    "Identity Verified...",
    "Human Drive Analyzed...",
    "Resilience Vector Mapped...",
    "Risk Arbitrage Indexed...",
    "Cognitive Singularity Confirmed...",
    "Learning Agility Calibrated..."
  ];

  const handleNext = () => {
    if (isTransitioning) return;
    const currentKey = questions[step].key;
    if (!formData[currentKey]) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
        setIsTransitioning(false);
      } else {
        onComplete(formData['name'] || 'Architect');
      }
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black overflow-y-auto relative"
      data-lenis-prevent
    >
      <ProgressTracker current="Identification" />

      <div className="max-w-4xl w-full space-y-16">
        <div className="space-y-4">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-white/40 text-[10px] uppercase font-black tracking-[0.4em]"
          >
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            Identification — Phase {step + 1}/{questions.length}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <h2 className="text-3xl md:text-5xl font-display font-medium uppercase leading-tight tracking-tighter">
              {questions[step].q}
            </h2>

            <div className="relative">
              <input 
                autoFocus
                value={formData[questions[step].key] || ''}
                onChange={(e) => setFormData({ ...formData, [questions[step].key]: e.target.value })}
                placeholder={questions[step].p}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                disabled={isTransitioning}
                className="w-full bg-transparent border-b border-white/10 py-8 text-2xl md:text-4xl font-light focus:outline-none focus:border-kcg-red transition-all placeholder:text-white/10"
              />
              
              <div className="absolute right-0 bottom-10 flex items-center gap-6">
                {isTransitioning ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-kcg-red text-[10px] uppercase font-black"
                  >
                    <div className="w-2 h-2 bg-kcg-red rounded-full animate-ping" />
                    {signals[step]}
                  </motion.div>
                ) : (
                  formData[questions[step].key] && (
                    <button 
                      onClick={handleNext}
                      className="text-white/20 hover:text-white text-[10px] uppercase tracking-widest font-black transition-colors"
                    >
                      Valider (Enter)
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-px transition-all duration-500",
                i === step ? "w-12 bg-kcg-red" : "w-4 bg-white/10"
              )} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CognitiveActivationScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const tasks = [
    {
      title: "Ordonnancement Critique",
      desc: "Définissez la priorité absolue lors d'un déploiement continental sous contrainte financière.",
      options: ["Sécurité de l'Infrastructure", "Vitesse d'Acquisition", "Optimisation Fiscale", "Compliance Régionale"]
    },
    {
      title: "Matrice d'Allocation",
      desc: "Le Réseau Ouest-Africain sature à 98% de capacité. Le Réseau Central est hors-ligne. Décision de routage immédiate.",
      options: ["Isoler le Réseau Central", "Répartir l'excédent sur clusters secondaires", "Désactiver les services non-essentiels", "Forcer un cold reboot continental"]
    },
    {
      title: "Réflexe Exécutif",
      desc: "Un acteur étatique hostile tente de s'infiltrer dans la base de données souveraine. Action immédiate ?",
      options: ["Alerter le Board KCG", "Déployer les leurres quantiques", "Couper les câbles sous-marins", "Laisser pénétrer pour tracer la source"]
    },
    {
      title: "Arbitrage d'Innovation",
      desc: "Une nouvelle technologie promet +40% de rendement, mais viole la charte d'éthique régionale.",
      options: ["Implémentation silencieuse", "Lobbying agressif", "Ignorer l'innovation", "Développer une version conforme (-20% rendement)"]
    },
    {
      title: "Résilience Structurelle",
      desc: "Sacrifice inévitable. Quel département est coupé en premier en cas de crise systémique globale ?",
      options: ["R&D Analytique", "Déploiement Expérimental", "Support Local", "Acquisition de Talents"]
    },
    {
      title: "Détection de Contradiction",
      desc: "Les données indiquent une croissance exponentielle, le terrain signale une implosion imminente. Qui a raison ?",
      options: ["Les mathématiques pures", "L'intuition humaine", "Les deux sont faux", "Les données sont manipulées"]
    }
  ];

  const handleSelect = (idx: number) => {
    if (isProcessing) return;
    setSelected([...selected, idx]);
    setIsProcessing(true);

    setTimeout(() => {
      setSelected([]);
      setIsProcessing(false);
      if (step < tasks.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black overflow-y-auto relative"
    >
      <ProgressTracker current="Activation" />

      <div className="max-w-5xl w-full space-y-16">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1 border border-white/10 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-kcg-red rounded-full animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Cognitive Activation Phase {step + 1}/{tasks.length}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium uppercase leading-tight tracking-tighter">
            {tasks[step].title}
          </h2>
          <p className="text-white/40 text-lg font-light italic max-w-3xl mx-auto">
            "{tasks[step].desc}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isProcessing}
              className={cn(
                "p-8 border rounded-3xl transition-all duration-300 text-left relative overflow-hidden group",
                selected[0] === i 
                  ? "bg-white/5 border-kcg-red/40" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/20",
                isProcessing && selected[0] !== i && "opacity-20 pointer-events-none"
              )}
            >
              {selected[0] === i && (
                <motion.div layoutId="highlight-cog" className="absolute inset-0 bg-kcg-red/10 pointer-events-none" />
              )}
              <span className="relative z-10 text-white font-medium tracking-wide">{opt}</span>
              {selected[0] === i && isProcessing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-4 right-4 text-kcg-red text-[10px] uppercase font-black flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> Activation...
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StrategicSimulationScreen({ missionId, onComplete }: { missionId: string, onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getScenarios = (track: string) => {
    switch (track) {
      case 'ia_infra':
        return [
          {
            title: "Hallucination Critique",
            desc: "Un système stratégique génère des hallucinations critiques dans un environnement financier souverain, provoquant une panique locale. L'arrêt stoppe l'économie 4 heures.",
            options: [
              { title: "Arrêt d'urgence total", desc: "Couper le système, accepter la perte financière immédiate pour garantir l'intégrité à long terme." },
              { title: "Confinement ciblé (Risqué)", desc: "Maintenir en ligne en isolant les clusters infectés manuellement." }
            ]
          },
          {
            title: "Dilemme de Souveraineté",
            desc: "Un acteur étranger propose un composant qui accélère le modèle de 40%, mais KCG perd le contrôle exclusif du code source.",
            options: [
              { title: "Refus catégorique", desc: "La souveraineté n'est pas négociable, même au prix de la performance." },
              { title: "Accepter sous obfuscation", desc: "Intégrer le composant mais l'encapsuler pour limiter leur accès." }
            ]
          }
        ];
      case 'logistics':
        return [
          {
            title: "Rupture Multi-Hub",
            desc: "Une rupture d'approvisionnement touche 3 hubs simultanément à cause d'un conflit frontalier. 40 000 tonnes de matériel sont bloquées.",
            options: [
              { title: "Acheminement aérien (Gouffre financier)", desc: "Payer 10x le prix pour maintenir la promesse client." },
              { title: "Force majeure (Rupture contrat)", desc: "Assumer le retard et négocier politiquement la réouverture." }
            ]
          },
          {
            title: "Automatisation vs Emploi",
            desc: "Le déploiement de l'autonomie portuaire supprimera 5 000 emplois locaux, provoquant une grève imminente.",
            options: [
              { title: "Déploiement en force", desc: "Passer outre la grève pour garantir l'efficacité logistique future." },
              { title: "Plan de transition long", desc: "Ralentir l'automatisation pour former et absorber les travailleurs." }
            ]
          }
        ];
      case 'finance':
        return [
          {
            title: "Croissance vs Stabilité",
            desc: "Vous devez arbitrer entre une croissance agressive sur un nouveau marché ou la consolidation de vos liquidités pour traverser une tempête économique prévue.",
            options: [
              { title: "Expansion agressive", desc: "Profiter de la frilosité des concurrents pour prendre le monopole." },
              { title: "Sanctuarisation", desc: "Accumuler les réserves. Les survivants règnent après la crise." }
            ]
          },
          {
            title: "Attaque Spéculative",
            desc: "Un fonds vautour attaque votre monnaie d'échange interne, provoquant une décote de 30% en 2 heures.",
            options: [
              { title: "Rachat massif (Brûler le cash)", desc: "Soutenir le cours artificiellement pour rassurer." },
              { title: "Laisser chuter & Piéger", desc: "Laisser le marché paniquer, puis bloquer les retraits spéculatifs." }
            ]
          }
        ];
      case 'marketing':
        return [
          {
            title: "Viralité Négative",
            desc: "Une campagne KCG devient viralement négative suite à un deepfake généré par un concurrent, détruisant la confiance d'un gouvernement local.",
            options: [
              { title: "Contre-attaque Narrative", desc: "Exposer publiquement le concurrent avec des preuves, quitte à créer un scandale." },
              { title: "Silence & Renforcement", desc: "Ignorer le deepfake et inonder de preuves matérielles de succès locaux." }
            ]
          },
          {
            title: "Censure d'État",
            desc: "Un pays clé bloque notre application. Négocier nécessite de céder la liste des créateurs critiques envers l'état.",
            options: [
              { title: "Protection des Créateurs", desc: "Refuser et assumer la perte totale du marché." },
              { title: "Coopération partielle", desc: "Donner un accès limité et obfusqué pour gagner du temps." }
            ]
          }
        ];
      default:
        return [
          {
            title: "Le Chantage Gouvernemental",
            desc: "Un gouvernement menace d'exproprier l'infrastructure si KCG ne cède pas ses bases de données locales.",
            options: [
              { title: "Destruction des Données", desc: "Purge totale des serveurs avant l'expropriation." },
              { title: "Négociation Piégée", desc: "Fournir des données obfusquées pour gagner du temps." }
            ]
          },
          {
            title: "Conflit de Leadership Frontal",
            desc: "Le directeur technique local refuse de déployer l'architecture KCG, affirmant qu'elle ne correspond pas à la réalité locale.",
            options: [
              { title: "Remplacement Immédiat", desc: "Neutraliser le directeur et imposer." },
              { title: "Cooptation Psychologique", desc: "L'intégrer pour le transformer en allié." }
            ]
          }
        ];
    }
  };

  const scenarios = getScenarios(missionId);

  const handleDecision = (idx: number) => {
    setSelectedDecision(idx);
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedDecision(null);
      setIsProcessing(false);
      if (step < scenarios.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black overflow-y-auto relative"
    >
      <ProgressTracker current="Simulation" />

      <div className="max-w-5xl w-full space-y-16">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1 border border-white/10 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-kcg-red rounded-full animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-kcg-red">Mission Simulation Engine™ — {step + 1}/{scenarios.length}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium uppercase leading-tight tracking-tighter">
            {scenarios[step].title}
          </h2>
          <p className="text-white/40 text-lg font-light italic max-w-3xl mx-auto">
            "{scenarios[step].desc}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {scenarios[step].options.map((opt, i) => (
            <div 
              key={i}
              onClick={() => !isProcessing && handleDecision(i)}
              className={cn(
                "p-12 border rounded-[40px] cursor-pointer transition-all duration-500 overflow-hidden relative group",
                selectedDecision === i 
                  ? "bg-white/5 border-kcg-red/40" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/20",
                isProcessing && selectedDecision !== i && "opacity-20 pointer-events-none"
              )}
            >
              {selectedDecision === i && (
                <motion.div layoutId="highlight-sim" className="absolute inset-0 bg-gradient-to-br from-kcg-red/10 to-transparent pointer-events-none" />
              )}
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-display font-medium uppercase text-white">{opt.title}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{opt.desc}</p>
                
                {selectedDecision === i && isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-6 border-t border-white/5 flex items-center gap-4 text-[10px] text-kcg-red font-black uppercase tracking-[0.2em]"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calcul fractal des conséquences 4D...</span>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CultureScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const tasks = [
    {
      title: "Philosophie de l'Infrastructure",
      desc: "Pourquoi KCG s'acharne-t-il à construire des infrastructures lourdes (Datacenters, Ports, Câbles) plutôt que de simples logiciels SaaS ?",
      options: ["Parce que le matériel rapporte plus", "Le code sans l'infrastructure appartient à celui qui loge les serveurs", "Pour créer des emplois", "Par manque de compétences SaaS"]
    },
    {
      title: "La Souveraineté selon KCG",
      desc: "Que signifie pour vous 'construire un écosystème souverain' ?",
      options: ["Se couper du reste de l'économie mondiale", "Posséder toute la chaîne de valeur (de la mine d'or au cloud souverain)", "Négocier de meilleurs contrats avec l'Occident", "Remplacer les entreprises étrangères par des acteurs publics"]
    },
    {
      title: "Le Concept de 'Leapfrogging'",
      desc: "L'Afrique doit sauter les étapes technologiques obsolètes. Comment l'appliquer au secteur financier ?",
      options: ["Copier exactement le modèle bancaire européen de 2010", "Ignorer la banque de détail classique et passer directement au crypto/mobile-money souverain", "Attendre la régulation", "Baisser les taux d'intérêts"]
    },
    {
      title: "Croissance Démographique",
      desc: "Face à une population continentale qui doublera d'ici 2050, quelle est l'approche KCG ?",
      options: ["C'est une crise humanitaire à gérer par l'aide", "C'est l'hyper-marché de demain qui nécessite dès aujourd'hui l'infrastructure pour l'absorber", "La solution est l'exode rural", "Réduire la natalité technologiquement"]
    }
  ];

  const handleSelect = (idx: number) => {
    if (isProcessing) return;
    setSelected([...selected, idx]);
    setIsProcessing(true);

    setTimeout(() => {
      setSelected([]);
      setIsProcessing(false);
      if (step < tasks.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black overflow-y-auto relative"
    >
      <ProgressTracker current="Culture" />

      <div className="max-w-5xl w-full space-y-16">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1 border border-white/10 rounded-full mb-8">
             <div className="w-1.5 h-1.5 bg-kcg-red rounded-full animate-pulse" />
             <span className="text-[10px] uppercase font-black tracking-widest text-[#FFF]">KCG Culture & Vision™ {step + 1}/{tasks.length}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium uppercase leading-tight tracking-tighter">
            {tasks[step].title}
          </h2>
          <p className="text-white/40 text-lg font-light italic max-w-3xl mx-auto">
            "{tasks[step].desc}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks[step].options.map((opt, i) => (
             <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isProcessing}
                className={cn(
                  "p-8 border rounded-3xl transition-all duration-300 text-left relative overflow-hidden group",
                  selected[0] === i 
                    ? "bg-white/5 border-kcg-red/40" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/20",
                  isProcessing && selected[0] !== i && "opacity-20 pointer-events-none"
                )}
             >
                {selected[0] === i && (
                  <motion.div layoutId="highlight-culture" className="absolute inset-0 bg-kcg-red/10 pointer-events-none" />
                )}
                <span className="relative z-10 text-white font-medium tracking-wide">{opt}</span>
                {selected[0] === i && isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-4 right-4 text-kcg-red text-[10px] uppercase font-black flex items-center gap-2">
                     <Loader2 className="w-3 h-3 animate-spin" /> Analyse Vision...
                  </motion.div>
                )}
             </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PressureScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isDone, setIsDone] = useState(false);

  const pressureTasks = [
    {
      q: "Double injonction contradictoire détectée. \nVotre supérieur ordonne A. Les données exigent B.",
      a: "Exécuter A (Loyauté)",
      b: "Exécuter B (Vérité Mathématique)"
    },
    {
      q: "Incident Média. \nUne fuite accuse votre équipe d'incompétence. Le silence vous protège, mais détruit un employé innocent.",
      a: "Protéger le système",
      b: "Sauver l'employé"
    },
    {
      q: "Délai Critique. \nIl reste 10 secondes pour approuver un patch non testé qui sauvera le réseau, ou ne rien faire et perdre 3 villes.",
      a: "Accepter le risque massif",
      b: "Accepter la perte mineure"
    },
    {
      q: "Trahison. \nUn partenaire menace de couper 50% de vos liquidités ce matin si vous ne virez pas votre meilleur élément.",
      a: "Céder pour survivre",
      b: "Refuser et affronter le chaos"
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isDone) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isDone) {
      handleDecision();
    }
  }, [timeLeft, isDone]);

  const handleDecision = () => {
    setIsDone(true);
    setTimeout(() => {
      if (step < pressureTasks.length - 1) {
        setStep(step + 1);
        setTimeLeft(12);
        setIsDone(false);
      } else {
        onComplete();
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black overflow-y-auto relative"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
         <motion.div className="h-full bg-red-500" animate={{ width: `${(timeLeft / 12) * 100}%` }} transition={{ ease: "linear", duration: 1 }} />
      </div>

      <ProgressTracker current="Pressure" />

      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-4">
           <h2 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tighter text-red-500 animate-pulse">
             00:{timeLeft.toString().padStart(2, '0')}
           </h2>
           <p className="text-white/40 text-xs uppercase tracking-widest font-black">Cognitive Pressure Engine™ — Phase {step + 1}/{pressureTasks.length}</p>
        </div>

        <h3 className="text-2xl md:text-5xl font-display font-medium uppercase leading-tight whitespace-pre-line">
          {pressureTasks[step].q}
        </h3>

        <div className="grid md:grid-cols-2 gap-6 pt-8">
           <button onClick={handleDecision} disabled={isDone} className="p-8 border border-red-500/20 rounded-2xl hover:bg-red-500/10 text-white font-medium transition-all uppercase tracking-widest text-xs">{pressureTasks[step].a}</button>
           <button onClick={handleDecision} disabled={isDone} className="p-8 border border-white/20 rounded-2xl hover:bg-white/10 text-white font-medium transition-all uppercase tracking-widest text-xs">{pressureTasks[step].b}</button>
        </div>
        
        {isDone && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-kcg-red text-xs uppercase tracking-widest font-black pt-8">
              Résistance systémique enregistrée.
           </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function AIInterviewScreen({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: "L'analyse de vos réactions sous pression est terminée. Face à l'imprévu, vous privilégiez la protection de la structure au détriment de l'individu. N'est-ce pas une faiblesse à long terme ?" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const aiFollowUps = [
    "La rigidité morale est souvent un frein à l'innovation radicale. Comment tracez-vous la ligne entre pragmatisme et cynisme ?",
    "Vos résultats indiquent une tendance claire à imposer votre vision. Pensez-vous vraiment que la démocratie a sa place dans l'exécution d'une mission critique ?",
    "Très bien. Mais si le Conseil refuse votre plan malgré vos preuves, comment vous assurez-vous que votre vision se réalise tout de même ?",
    "L'alignement par la contrainte est efficace, mais crée de la friction. Avez-vous déjà dû sacrifier un allié pour préserver l'objectif ?",
    "C'est noté. Cette résilience brute sera nécessaire. Fin du protocole conversationnel. Nous finalisons votre indexation cognitive."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: inputVal }]);
    setInputVal("");
    setIsTyping(true);

    const newCount = interactionCount + 1;
    setInteractionCount(newCount);

    setTimeout(() => {
      if (newCount <= aiFollowUps.length) {
         setMessages(prev => [...prev, { sender: 'ai', text: aiFollowUps[newCount - 1] }]);
         setIsTyping(false);
         if (newCount === aiFollowUps.length) {
           setTimeout(() => {
             onComplete();
           }, 2500);
         }
      }
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center px-6 bg-black overflow-y-auto relative py-12"
    >
      <ProgressTracker current="Interview" />

      <div className="max-w-3xl w-full flex-1 flex flex-col justify-end pb-12 mt-20">
        <div className="space-y-12">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex max-w-[80%]",
                  m.sender === 'ai' ? "self-start" : "self-end ml-auto"
                )}
              >
                <div className={cn(
                  "p-8 rounded-[32px] text-lg font-light leading-relaxed",
                  m.sender === 'ai' ? "bg-white/[0.02] border border-white/5 text-white/70" : "bg-kcg-red/10 border border-kcg-red/20 text-white"
                )}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex max-w-[80%] self-start"
            >
              <div className="px-8 py-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-200" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <form onSubmit={handleSubmit} className="relative">
            <input 
              autoFocus
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Votre réponse..."
              disabled={isTyping}
              className="w-full bg-white/[0.03] border border-white/10 py-6 px-10 rounded-full text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all text-sm font-light"
            />
            <button 
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-white text-black text-[10px] uppercase font-black tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

function AnalysisScreen({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<string[]>([]);

  const scans = [
    "Corrélation des signaux exécutifs...",
    "Recherche d'ADN de Bâtisseur..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < scans.length) {
        setMessages(prev => [...prev, scans[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6 bg-black relative"
    >
      <div className="relative mb-12">
        <Loader2 className="w-16 h-16 text-kcg-red animate-spin" />
        <div className="absolute inset-0 blur-2xl bg-kcg-red/30 rounded-full" />
      </div>

      <div className="space-y-4 text-center max-w-lg h-32 relative">
         <AnimatePresence>
            {messages.map((m, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs uppercase tracking-[0.4em] font-black text-white/40 absolute w-full left-0 bottom-0"
                  style={{ bottom: `${(messages.length - 1 - i) * 24}px`, opacity: 1 - ((messages.length - 1 - i) * 0.3) }}
               >
                  {m}
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ResultView({ onHome, candidateName, missionId }: { onHome: () => void, candidateName: string, missionId: string }) {
  const mission = OPEN_MISSIONS.find(m => m.id === missionId) || OPEN_MISSIONS[OPEN_MISSIONS.length - 1];

  const scores = [
    { label: "Leadership", val: 94 },
    { label: "Strategic Thinking", val: 97 },
    { label: "Adaptability", val: 89 },
    { label: "Systems Thinking", val: 92 },
    { label: "Communication", val: 88 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full flex items-center justify-center px-6 overflow-y-auto py-24 bg-black relative"
      data-lenis-prevent
    >
      <ProgressTracker current="Validation" />

      <div className="max-w-5xl w-full space-y-20 mt-12">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-8 py-3 kcg-glass bg-emerald-500/10 border-emerald-500/20 rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase tracking-[0.6em] text-emerald-500 font-black italic">ANALYSE TERMINÉE</span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-none">
            Talentium Index™ <br />
            <span className="text-white/40">Généré pour {candidateName || "le candidat"}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-12">
            <div className="p-12 kcg-card border-kcg-red/10 bg-gradient-to-br from-kcg-red/5 to-transparent space-y-12 rounded-[48px]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-4 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <ShieldCheck className="w-4 h-4" />
                  KCG VERIFIED™
                </div>
                <p className="text-white text-xl font-light leading-relaxed italic">
                  “Vos résultats indiquent une forte capacité d’adaptation stratégique. Vous correspondez au profil {mission.leadership} pour l'initiative {mission.title}.”
                </p>
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
                     Ce passeport cognitif valide votre appartenance à l'échelon supérieur.
                   </p>
                   <p className="text-[10px] uppercase tracking-[0.2em] text-kcg-red font-bold">
                     Signal Détecté : {mission.signal}
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 kcg-card border-white/5 rounded-[48px] bg-white/[0.01] flex flex-col shadow-2xl">
            <h3 className="text-lg font-display font-medium uppercase tracking-tight mb-12">Empreinte Comportementale</h3>
            
            <div className="flex-1 grid gap-8">
              {scores.map((s, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black">
                    <span className="text-white/40">{s.label}</span>
                    <span className="text-white">{s.val}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.val}%` }}
                      transition={{ duration: 1.5, delay: 0.1 * i }}
                      className="h-full bg-white" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={onHome}
                className="px-12 py-5 border border-white/10 hover:border-white text-white font-black rounded-full hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-[0.4em]"
              >
                Retourner à la projection
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState('All');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto pt-32 px-6 pb-20 bg-black"
      data-lenis-prevent
    >
      <div className="container mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-kcg-red animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-kcg-red font-black">Sovereign Executive Terminal</span>
            </div>
            <h1 className="text-3xl font-display font-medium uppercase tracking-tight flex items-center gap-4">
              <LayoutDashboard className="text-kcg-red" />
              Talent Intelligence Command Center
            </h1>
          </div>
          <button 
            onClick={onBack}
            className="kcg-btn-outline rounded-full px-10 py-4 !border-kcg-red/20 !text-kcg-red hover:!text-white hover:!bg-kcg-red/20 transition-all font-black"
          >
            Terminal — Terminer la Session
          </button>
        </header>

        {/* Executive Signal Overview */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 kcg-card p-12 border-kcg-red/10 bg-gradient-to-br from-kcg-red/5 to-transparent space-y-12">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-medium uppercase tracking-tight">Synthesis Center</h2>
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Infrastructure de lecture du potentiel civilisationnel</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-kcg-red" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Leadership Rare", signal: "Détecté", action: "Priorité Critique", val: "6", icon: Target },
                { title: "Potentiel Exécutif", signal: "Élevé", action: "Executive Review", val: "12", icon: Brain },
                { title: "Stabilité Cognitive", signal: "Analyse", action: "Risque Modéré", val: "3", icon: BarChart3 }
              ].map((sig, idx) => (
                <div key={idx} className="p-8 rounded-[40px] bg-white/[0.01] border border-white/5 space-y-6 hover:border-kcg-red/20 transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-kcg-red/10 flex items-center justify-center text-kcg-red group-hover:scale-110 transition-transform">
                      <sig.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-kcg-red/20 text-kcg-red text-[8px] uppercase tracking-widest font-black">{sig.action}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <p className="text-4xl font-display font-medium">{sig.val}</p>
                      <p className="text-[10px] uppercase tracking-widest text-kcg-red font-black">{sig.signal}</p>
                    </div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold">{sig.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="kcg-card p-12 border-white/5 space-y-12 bg-black/40">
            <h3 className="text-xs uppercase tracking-widest text-white/40 font-black">Elite Selection Rate</h3>
            <div className="space-y-10">
              <div className="text-center">
                <p className="text-7xl font-display font-medium text-white">4.2%</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] uppercase tracking-widest font-black">
                  <Filter className="w-2.5 h-2.5" />
                  Sovereign Rarity System Active
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="space-y-6">
                {[
                  { label: "Bâtisseurs Élite", val: "4.2%", color: "bg-kcg-red" },
                  { label: "High Potential", val: "12.8%", color: "bg-white/40" },
                  { label: "Standard", val: "83.0%", color: "bg-white/10" }
                ].map((r, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold">
                      <span className="text-white/40">{r.label}</span>
                      <span className="text-white/60">{r.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full", r.color)} style={{ width: r.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="space-y-6">
          <div className="kcg-card overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-4">
                {['All', 'Elite', 'Strategy', 'Infrastructure'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all",
                      filter === f ? "bg-kcg-red text-white" : "kcg-glass border-white/5 text-white/30 hover:text-white"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  placeholder="Filtrer les bâtisseurs..."
                  className="w-full bg-white/[0.02] border border-white/5 py-4 pl-12 pr-6 rounded-full text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-kcg-red/20 transition-all font-black"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30 bg-black/20">
                    <th className="px-8 py-8 font-black">Identité & Signal</th>
                    <th className="px-8 py-8 font-black">Talentium™ Index</th>
                    <th className="px-8 py-8 font-black">Compatibilité Division</th>
                    <th className="px-8 py-8 font-black text-right">Dossier Exécutif</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CANDIDATES.map((c) => (
                    <tr key={c.id} className="border-b border-white/5 last:border-none group hover:bg-kcg-red/5 transition-all duration-300">
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-full bg-kcg-red/10 flex items-center justify-center font-display font-bold text-kcg-red border border-kcg-red/20 relative">
                            {c.name[0]}
                            {c.status === 'Elite' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-kcg-red rounded-full border-2 border-black flex items-center justify-center text-[8px] text-white"><ShieldCheck className="w-2.5 h-2.5" /></div>}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-wider">{c.name}</p>
                            <div className="flex gap-2 pt-1">
                              {c.detectedSignals.slice(0, 1).map((s, i) => (
                                <span key={i} className="text-[8px] uppercase tracking-widest text-kcg-red font-black">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-4">
                          <span className={cn("text-xl font-display font-medium", c.score > 90 ? "text-kcg-red" : "text-white")}>{c.score}</span>
                          <div className="h-0.5 w-16 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-kcg-red" style={{ width: `${c.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{c.department}</span>
                      </td>
                      <td className="px-8 py-8 text-right">
                        <button className="px-6 py-2 rounded-full border border-white/5 text-[9px] uppercase tracking-widest font-black transition-all hover:bg-white hover:text-black">
                          Consulter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Helpers ---

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="kcg-card p-10 border-white/5 flex flex-col gap-8 group hover:border-kcg-red/20 transition-all bg-white/[0.02]">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white/[0.03] group-hover:bg-kcg-red/10" 
        style={{ color: color }}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">{label}</p>
        <p className="text-4xl font-display font-medium tracking-tight">{value}</p>
      </div>
    </div>
  );
}
