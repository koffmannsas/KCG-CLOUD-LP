import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Users,
  Award,
  GraduationCap,
  Sparkles,
  Search,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Upload,
  Globe,
  Star,
  ChevronRight,
  Heart,
  TrendingUp,
  Shield,
  Clock,
  BookOpen,
  FileText
} from 'lucide-react';

interface CareersDeskProps {
  onBack: () => void;
  onSelectOtherDesk?: (deskId: string) => void;
}

const OPEN_POSITIONS = [
  {
    id: 'job-01',
    title: 'Senior Managing Director — Sovereign Debt & M&A',
    department: 'Investment Banking & Capital Markets',
    location: 'Abidjan / Londres',
    type: 'Temps Plein',
    experience: '12+ ans d\'expérience',
    tags: ['Restructuration', 'Banque d\'Affaires', 'UEMOA'],
    summary: 'Mener la structuration des opérations de capital sovereign et d\'émission obligataire syndiquée pour les gouvernements régionaux.'
  },
  {
    id: 'job-02',
    title: 'Principal AI Architect — KCG CORE Engine',
    department: 'Technologie & R&D IA',
    location: 'Abidjan / Singapour',
    type: 'Temps Plein',
    experience: '8+ ans en LLM & Distributed Systems',
    tags: ['PyTorch', 'Rust', 'GPU Clusters', 'Krypton'],
    summary: 'Concevoir et déployer les réseaux neuronaux à ultra-faible latence pour notre moteur de décision financière et souveraine.'
  },
  {
    id: 'job-03',
    title: 'Executive Fellow 2026-2027 (Leadership Program)',
    department: 'Cabinet du Président / Executive Office',
    location: 'Rotation Multi-Hubs (Abidjan, Paris, Dubai)',
    type: 'Programme Immorsif 12 Mois',
    experience: 'Diplômés Grandes Écoles / Ivy League',
    tags: ['Rotation C-Suite', 'Stratégie', 'Gouvernance'],
    summary: 'Programme d\'élite accompagnant directement le CEO et les Managing Partners sur les dossiers de négociations stratégiques.'
  },
  {
    id: 'job-04',
    title: 'Director of Renewable Infrastructure & PPPs',
    department: 'Infrastructures & Énergie Propre',
    location: 'Abidjan / Dubai',
    type: 'Temps Plein',
    experience: '10+ ans en Projets BOT / BOOT',
    tags: ['Énergie Solaire', 'Garanties IFC', 'Blended Finance'],
    summary: 'Piloter l\'assemblage des consortia internationaux pour la construction de centrales solaires et parcs éoliens de &gt;200MW.'
  },
  {
    id: 'job-05',
    title: 'Head of Legal & Public Affairs',
    department: 'Affaires Juridiques & Souveraineté',
    location: 'Abidjan / Paris',
    type: 'Temps Plein',
    experience: '10+ ans Droit International',
    tags: ['PPP', 'Droit des Affaires OHADA', 'Régulation'],
    summary: 'Superviser la rédaction des traités de concession, contrats de joint-venture et conformité réglementaire internationale.'
  }
];

const FELLOWSHIP_STAGES = [
  { step: "01", title: "Immersion C-Suite", desc: "4 mois aux côtés du Cabinet du Président sur la structuration des deals souverains." },
  { step: "02", title: "R&D & Deep Tech", desc: "4 mois au sein du Lab KCG Core à travailler sur les algorithmes de risque monétaire." },
  { step: "03", title: "Projet Terrain PPP", desc: "4 mois en déploiement opérationnel sur l'un de nos grands chantiers d'infrastructure." }
];

export default function CareersDesk({ onBack, onSelectOtherDesk }: CareersDeskProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<typeof OPEN_POSITIONS[0] | null>(null);

  // Application form state
  const [appFormData, setAppFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    githubPortfolio: '',
    highestDegree: 'Master / MBA / Doctorat',
    yearsExp: '5-10 ans',
    targetDept: 'Investment Banking & Capital Markets',
    motivationNote: '',
    agreedDataConsent: false
  });

  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TALENT-KCG-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppliedCode(code);
  };

  const filteredJobs = departmentFilter === 'all'
    ? OPEN_POSITIONS
    : OPEN_POSITIONS.filter(j => j.department.toLowerCase().includes(departmentFilter.toLowerCase()));

  return (
    <div className="w-full bg-[#07040a] text-slate-100 min-h-screen relative overflow-hidden font-sans">
      {/* Warm Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation Header bar */}
      <div className="sticky top-0 z-40 bg-[#07040a]/90 backdrop-blur-md border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider transition-colors border border-amber-500/30 cursor-pointer"
          >
            ← Retour aux Desks
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">
              DESK 07 // EXECUTIVE TALENT & LEADERSHIP CENTER
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-amber-400 font-bold">RECRUITMENT DESK: OPEN</span>
          <span className="text-slate-600">|</span>
          <span>FELLOWS PROGRAM 2026</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-12">
        {/* HERO SECTION - WARM LUXURY CAMPUS */}
        <div className="relative rounded-2xl bg-gradient-to-br from-amber-950/30 via-[#0d0714] to-purple-950/20 border border-amber-500/30 p-8 lg:p-12 shadow-[0_0_50px_rgba(245,158,11,0.08)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            Human Capital & Executive Talent Ecosystem
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Rejoignez l&apos;Élite qui Bâtit la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">Souveraineté Économique & Technologique</span> de Demain.
          </h1>

          <p className="mt-4 text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Koffmann Capital Group rassemble des ingénieurs en IA d&apos;exception, des banquiers d&apos;affaires chevronnés et des juristes de haut niveau unis par une vision d&apos;impact continental durable.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Nationalités Représentées</div>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">18 Pays</div>
              <div className="text-[10px] text-slate-500 mt-1">Abidjan, Paris, Dubai, SG</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-yellow-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Executive Fellows / An</div>
              <div className="text-2xl font-bold text-yellow-400 font-mono mt-1">12 Places</div>
              <div className="text-[10px] text-slate-500 mt-1">Sélectivité &lt; 1%</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Budget Formation R&D</div>
              <div className="text-2xl font-bold text-purple-400 font-mono mt-1">10 000 000 FCFA / Cadre</div>
              <div className="text-[10px] text-slate-500 mt-1">Certifications & Labs</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Rétention des Talents</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">96.4%</div>
              <div className="text-[10px] text-slate-500 mt-1">Culture d&apos;excellence</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE FELLOWSHIP & ACADEMY */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              PROGRAMMES D&apos;EXCELLENCE
            </span>
            <h2 className="text-2xl font-bold text-white mt-3 flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              KCG Executive Fellows Program & Leadership Academy
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Un parcours d&apos;accélération immersive de 12 mois dédié aux hauts potentiels pour devenir les futurs associés et dirigeants du groupe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FELLOWSHIP_STAGES.map((s, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
                <div className="text-4xl font-extrabold text-amber-500/20 font-mono absolute top-4 right-4">
                  {s.step}
                </div>
                <div className="text-xs font-mono text-amber-400 font-bold uppercase mb-2">
                  Module {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{s.title}</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: OPEN POSITIONS FILTERABLE GRID */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-amber-400" />
                Opportunités de Carrière & Postes Ouverts
              </h2>
              <p className="text-sm text-slate-400">
                Postulez directement pour rejoindre nos pôles d&apos;excellence.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Département:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">Tous les départements</option>
                <option value="banking">Investment Banking</option>
                <option value="technologie">Technologie & IA</option>
                <option value="cabinet">Cabinet du Président</option>
                <option value="infrastructures">Infrastructures & PPP</option>
                <option value="juridique">Affaires Juridiques</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-bold">
                      {job.department}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" /> {job.location}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-cyan-400">{job.experience}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setAppFormData({ ...appFormData, targetDept: job.department });
                      const el = document.getElementById('application-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap"
                  >
                    Postuler à ce Poste →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: APPLICATION WIZARD FORM */}
        <div id="application-form" className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#130b18] to-slate-900 border border-amber-500/30 p-8 lg:p-12 shadow-2xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              CANDIDATURE SPONTANÉE OU DÉDIÉE
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
              Déposer votre Dossier de Candidature Exécutive
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Transmission sécurisée au Bureau du Capital Humain & Talent Acquisition KCG.
            </p>
          </div>

          {appliedCode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">Candidature Enregistrée</h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Votre dossier a été transmis à la Direction des Ressources Humaines. Un chargé de recrutement senior vous contactera sous 24h.
              </p>

              <div className="inline-block px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-mono font-bold text-lg">
                CODE SUIVI CANDIDAT: {appliedCode}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setAppliedCode(null)}
                  className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono uppercase cursor-pointer"
                >
                  Soumettre un autre dossier
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleAppSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Nom & Prénom Complètement *
                  </label>
                  <input
                    type="text"
                    required
                    value={appFormData.fullName}
                    onChange={e => setAppFormData({ ...appFormData, fullName: e.target.value })}
                    placeholder="Nom complet"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={appFormData.email}
                    onChange={e => setAppFormData({ ...appFormData, email: e.target.value })}
                    placeholder="candidat@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Profil LinkedIn / CV Web
                  </label>
                  <input
                    type="url"
                    value={appFormData.linkedIn}
                    onChange={e => setAppFormData({ ...appFormData, linkedIn: e.target.value })}
                    placeholder="https://linkedin.com/in/profil"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    GitHub / Portfolio Tech (si applicable)
                  </label>
                  <input
                    type="url"
                    value={appFormData.githubPortfolio}
                    onChange={e => setAppFormData({ ...appFormData, githubPortfolio: e.target.value })}
                    placeholder="https://github.com/votre-compte"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Plus Haut Niveau d&apos;Études *
                  </label>
                  <select
                    value={appFormData.highestDegree}
                    onChange={e => setAppFormData({ ...appFormData, highestDegree: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Master / MBA / Doctorat">Master / MBA / Doctorat / PhD</option>
                    <option value="Grande École Ingénieur / Commerce">Grande École d&apos;Ingénieur ou de Commerce</option>
                    <option value="Licence / Bachelor Senior">Licence / Bachelor avec forte expérience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Années d&apos;Expérience Pertinentes *
                  </label>
                  <select
                    value={appFormData.yearsExp}
                    onChange={e => setAppFormData({ ...appFormData, yearsExp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Junior (0-3 ans)">Junior (0-3 ans / Executive Fellow)</option>
                    <option value="Mid-Senior (4-8 ans)">Mid-Senior (4-8 ans)</option>
                    <option value="Senior / Director (9-15 ans)">Senior / Director (9-15 ans)</option>
                    <option value="Executive Partner (15+ ans)">Executive Partner / C-Suite (15+ ans)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Lettre de Motivation & Note de Contribution Strategique *
                </label>
                <textarea
                  rows={4}
                  required
                  value={appFormData.motivationNote}
                  onChange={e => setAppFormData({ ...appFormData, motivationNote: e.target.value })}
                  placeholder="Expliquez en quelques lignes votre vision de l'impact de KCG et votre valeur ajoutée..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Upload Dropzone */}
              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500 transition-colors">
                <Upload className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-xs font-mono text-slate-300">
                  Déposer votre CV / Curriculum Vitae (PDF, max 10MB)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="career-data"
                  required
                  checked={appFormData.agreedDataConsent}
                  onChange={e => setAppFormData({ ...appFormData, agreedDataConsent: e.target.checked })}
                  className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="career-data" className="text-xs text-slate-400 cursor-pointer">
                  J&apos;autorise le traitement confidentiel de mes données par le Bureau du Capital Humain de Koffmann Capital Group.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-mono font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                Transmettre ma Candidature au Bureau du Capital Humain →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
