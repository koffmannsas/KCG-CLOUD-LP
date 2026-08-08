import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Radio,
  Video,
  Download,
  FileText,
  Search,
  Calendar,
  Clock,
  Send,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Share2,
  Play,
  Volume2,
  Award,
  Globe,
  Upload,
  Lock,
  Mail,
  Phone
} from 'lucide-react';

interface MediaDeskProps {
  onBack: () => void;
  onSelectOtherDesk?: (deskId: string) => void;
}

const PRESS_RELEASES = [
  {
    id: 'pr-01',
    date: '02 AOÛT 2026',
    time: '08:30 GMT',
    category: 'MÉGA-DEAL SOUVERAIN',
    title: 'Koffmann Capital Group Annonce la Clôture d\'un Fonds de 780 Milliards FCFA pour le Nuage Souverain Africain',
    lead: 'Ce véhicule d\'infrastructure financera le déploiement de 4 centres de données hautement sécurisés en Afrique de l\'Ouest et du Centre, alimentés à 100% par de l\'énergie renouvelable.',
    author: 'Bureau de Presse Officiel Abidjan',
    readTime: '4 min',
    tags: ['Sovereign Cloud', 'IA', 'UEMOA', 'ESG'],
    content: `ABIDJAN, CÔTE D'IVOIRE — Koffmann Capital Group (KCG) a confirmé aujourd'hui le succès de la levée de fonds de 780 milliards de FCFA destinée au déploiement de l'infrastructure 'Sovereign Cloud Africa'. Le consortium rassemble la Banque Africaine de Développement (BAD), plusieurs fonds souverains du Golfe ainsi que des investisseurs institutionnels européens. Les premières installations Tier-IV entreront en service au T1 2027 à Abidjan et Dakar.`
  },
  {
    id: 'pr-02',
    date: '28 JUILLET 2026',
    time: '14:15 GMT',
    category: 'INNOVATION & IA',
    title: 'Lancement Global du Moteur Décisionnel Krypton v4.2 au Sommet AI Governance de Genève',
    lead: 'La nouvelle version du moteur KCG Core intègre des mécanismes d\'explicabilité algorithmique de niveau bancaire et réduit la latence des transactions transfrontalières à moins de 8 millisecondes.',
    author: 'Desk Relations Publiques Genève',
    readTime: '3 min',
    tags: ['KCG CORE', 'FinTech', 'Genève', 'AI'],
    content: `GENÈVE, SUISSE — À l'occasion du Forum International sur la Gouvernance des Algorithmes, la division technologie de Koffmann Capital Group a fait la démonstration de Krypton v4.2. Capable d'analyser en temps réel les risques macroéconomiques sur 54 marchés émergents, le modèle offre une conformité totale avec le cadre AI Act et les réglementations prudentielles BCEAO/UEMOA.`
  },
  {
    id: 'pr-03',
    date: '15 JUILLET 2026',
    time: '11:00 GMT',
    category: 'PARTENARIAT STRATÉGIQUE',
    title: 'Signature d\'un Protocole d\'Accord avec le Ministère des Finances pour la Digitalisation des Douanes',
    lead: 'Le système FIKO PAY sera déployé dans les 12 principaux ports et corridors terrestres de la région pour automatiser la collecte fiscale et réduire les temps d\'attente aux frontières de 65%.',
    author: 'Service de Presse Abidjan',
    readTime: '5 min',
    tags: ['FIKO PAY', 'Gouvernement', 'Douanes', 'PPP'],
    content: `ABIDJAN — Le Ministère du Budget et du Portefeuille de l'État et Koffmann Capital Group ont signé un partenariat public-privé (PPP) historique. L'objectif est l'intégration du réseau monétique et de compensation FIKO PAY pour la digitalisation complète des flux douaniers et des recettes publiques.`
  },
  {
    id: 'pr-04',
    date: '02 JUIN 2026',
    time: '16:45 GMT',
    category: 'RESULTATS FINANCIERS',
    title: 'Publication du Rapport d\'Impact Socio-Économique & Résultats Annuels 2025-2026',
    lead: 'KCG enregistre une croissance de +34% des actifs sous gestion et le franchissement du cap des 5,000 emplois directs et indirects créés dans les secteurs clés de la transition.',
    author: 'Relations Investisseurs & Presse',
    readTime: '6 min',
    tags: ['Résultats', 'Rapport ESG', 'Finance'],
    content: `LONDRES & ABIDJAN — Koffmann Capital Group publie ses états financiers vérifiés. La solidité des bilans, renforcée par des notations de crédit AAA par les agences régionales, confirme la pertinence du modèle de capital d'investissement responsable.`
  }
];

const EXECUTIVE_INTERVIEWS = [
  {
    title: "Le rôle de l'IA Souveraine dans l'Industrialisation de l'Afrique",
    outlet: "Bloomberg TV Global",
    speaker: "Président-Directeur Général",
    duration: "18 min",
    videoThumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    summary: "Discussion exclusive sur l'autonomie technologique des nations émergentes et l'accélération des infrastructures d'IA."
  },
  {
    title: "Financer les Mégaprojets PPP en Période de Volatilité des Taux",
    outlet: "Financial Times Executive Forum",
    speaker: "Directeur Général des Investissements",
    duration: "24 min",
    videoThumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    summary: "Analyse des structures de dette syndiquée et du rôle des garanties multilatérales dans les projets d'énergie verte."
  },
  {
    title: "FIKO PAY & l'Intégration Monétaire de la Zone ZLECAF",
    outlet: "CNBC Africa Strategic Session",
    speaker: "Chief Technology Officer",
    duration: "15 min",
    videoThumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    summary: "Démo technique de la passerelle de règlement transcontinental et démonstration de souveraineté des données financières."
  }
];

const BRAND_ASSETS = [
  { name: "Pack Logos KCG Groupe & Filiales (EPS, SVG, PNG 4K)", size: "48 MB", format: "ZIP" },
  { name: "Charte Graphique & Normes Éditoriales 2026 (PDF HD)", size: "12 MB", format: "PDF" },
  { name: "Portraits Officiels des Dirigeants & C-Suite (300 DPI)", size: "120 MB", format: "ZIP" },
  { name: "B-Roll Vidéo HD & 4K (Datacenters, Ports, Siège)", size: "450 MB", format: "MP4/ZIP" },
  { name: "Fact Sheet Institutionnel & Chiffres Clés (Fr/En)", size: "4.5 MB", format: "PDF" }
];

export default function MediaDesk({ onBack, onSelectOtherDesk }: MediaDeskProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPR, setSelectedPR] = useState<typeof PRESS_RELEASES[0] | null>(null);

  // Accreditation form state
  const [mediaFormData, setMediaFormData] = useState({
    mediaOutlet: '',
    journalistName: '',
    pressCardId: '',
    email: '',
    phone: '',
    topic: 'Interview Exécutive',
    deadline: '',
    audienceReach: 'Global Tier 1 (Bloomberg, FT, Reuters...)',
    interviewFormat: 'Studio / Visio HD',
    requestDetails: '',
    agreedEmbargo: false
  });

  const [accreditationSubmitted, setAccreditationSubmitted] = useState<string | null>(null);

  const handleAccreditationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `PRESS-KCG-${Math.floor(100000 + Math.random() * 900000)}`;
    setAccreditationSubmitted(code);
  };

  const filteredReleases = PRESS_RELEASES.filter(pr => {
    const matchesCategory = activeCategory === 'all' || pr.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pr.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#080509] text-slate-100 min-h-screen relative overflow-hidden font-sans">
      {/* Background Newsroom Atmosphere Lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation Header bar */}
      <div className="sticky top-0 z-40 bg-[#080509]/90 backdrop-blur-md border-b border-rose-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-wider transition-colors border border-rose-500/30 cursor-pointer"
          >
            ← Retour aux Desks
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-rose-400 font-bold uppercase">
              DESK 06 // KCG GLOBAL NEWSROOM & PRESS DESK
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-rose-400 font-bold">PRESS DESK LIVE 24/7</span>
          <span className="text-slate-600">|</span>
          <span>SPOKESPERSON READY</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-12">
        {/* HERO SECTION - INSTITUTIONAL NEWSROOM */}
        <div className="relative rounded-2xl bg-gradient-to-br from-rose-950/40 via-[#0d070f] to-purple-950/30 border border-rose-500/30 p-8 lg:p-12 shadow-[0_0_50px_rgba(225,29,72,0.1)]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5" />
              Global Media & Communications Headquarters
            </div>

            {/* Live Ticker Status */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-1.5 rounded-full border border-rose-500/20 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-slate-300">WIRE FEED: ABIDJAN / LONDRES / NEW YORK</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Salle de Presse Internationale & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400">Espace Médias Exécutif</span>.
          </h1>

          <p className="mt-4 text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Accès direct aux communiqués officiels, kits média haute définition, déclarations de la Présidence et demandes d&apos;accréditation pour journalistes et agences de presse mondiales.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-rose-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Délai Réponse Médias</div>
              <div className="text-2xl font-bold text-rose-400 font-mono mt-1">&lt; 2 Heures</div>
              <div className="text-[10px] text-slate-500 mt-1">24/7 pour accrédités</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Porte-Paroles C-Suite</div>
              <div className="text-2xl font-bold text-purple-400 font-mono mt-1">6 Directeurs</div>
              <div className="text-[10px] text-slate-500 mt-1">FR / EN / AR / ES</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Kit Média Téléchargeable</div>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">Pack 4K HD</div>
              <div className="text-[10px] text-slate-500 mt-1">Logos, B-Roll, Photos</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase">Canal Sécurisé Tips/Leaks</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">Clé PGP</div>
              <div className="text-[10px] text-slate-500 mt-1">Chiffrement AES-256</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: LIVE WIRE PRESS RELEASES */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-rose-400" />
                Fil de Presse & Communiqués Officiels
              </h2>
              <p className="text-sm text-slate-400">
                Annonces institutionnelles, transactions majeures et publications stratégiques.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher un communiqué..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 w-60"
                />
              </div>

              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeCategory === 'all' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setActiveCategory('souverain')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeCategory === 'souverain' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Deals Souverains
                </button>
                <button
                  onClick={() => setActiveCategory('innovation')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeCategory === 'innovation' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  IA & Tech
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReleases.map((pr) => (
              <div
                key={pr.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-rose-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase font-bold">
                      {pr.category}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{pr.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pr.time}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    {pr.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {pr.lead}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {pr.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {pr.author}
                  </span>

                  <button
                    onClick={() => setSelectedPR(pr)}
                    className="flex items-center gap-1.5 text-xs font-mono text-rose-400 font-bold hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    Lire le Communiqué Complet <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL / EXPANDED VIEW FOR FULL PRESS RELEASE */}
        <AnimatePresence>
          {selectedPR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#0f0914] border border-rose-500/40 rounded-2xl max-w-3xl w-full p-8 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl relative"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="px-3 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold uppercase">
                    COMMUNIQUÉ OFFICIEL POUR DIFFUSION IMMÉDIATE
                  </span>
                  <button
                    onClick={() => setSelectedPR(null)}
                    className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer px-2 py-1 rounded bg-slate-800"
                  >
                    ✕ FERMER
                  </button>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    {selectedPR.date} — {selectedPR.time} | {selectedPR.author}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedPR.title}</h2>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border-l-4 border-rose-500 text-slate-200 text-sm italic font-serif">
                  &ldquo;{selectedPR.lead}&rdquo;
                </div>

                <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                  <p>{selectedPR.content}</p>
                  <p>
                    Pour toute demande d&apos;interview avec les porte-paroles du groupe ou pour obtenir les éléments multimédias en haute résolution, veuillez remplir le formulaire d&apos;accréditation médias ci-dessous ou contacter le desk au +225 07 98 76 77 63.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    CONTACTS PRESSE: <span className="text-rose-400">kcg@koffmann.group</span>
                  </div>
                  <button
                    onClick={() => {
                      alert('Téléchargement du communiqué officiel (Format PDF Officiel) démarré.');
                      setSelectedPR(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono font-bold text-xs uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Télécharger au format PDF HD
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 2: EXECUTIVE INTERVIEWS & VIDEO CENTER */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Video className="w-6 h-6 text-rose-400" />
                Centre d&apos;Interviews Exécutives & Vidéos
              </h2>
              <p className="text-sm text-slate-400">
                Prises de parole officielles des dirigeants de Koffmann Capital Group sur les grands médias internationaux.
              </p>
            </div>
            <span className="text-xs font-mono text-rose-400 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/30 hidden sm:inline-block">
              BROADCAST QUALITY 4K
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_INTERVIEWS.map((interview, idx) => (
              <div key={idx} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-rose-500/40 transition-colors">
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={interview.videoThumbnail}
                      alt={interview.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-slate-900/90 text-rose-400 font-mono text-[10px] border border-rose-500/30">
                      {interview.outlet}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-rose-400" /> {interview.duration}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-rose-500/80 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">{interview.speaker}</div>
                    <h4 className="text-sm font-bold text-white line-clamp-2">{interview.title}</h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {interview.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => alert(`Démarrage de la vidéo : ${interview.title}`)}
                    className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-800 cursor-pointer"
                  >
                    Visionner la Séquence <ExternalLink className="w-3 h-3 text-rose-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: BRAND ASSETS & PRESS KIT DOWNLOAD CENTER */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#120916] to-slate-900 border border-rose-500/30 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Download className="w-6 h-6 text-rose-400" />
                Press Kit & Brand Assets Téléchargeables
              </h2>
              <p className="text-sm text-slate-400">
                Téléchargement libre pour journalistes et partenaires autorisés.
              </p>
            </div>

            <button
              onClick={() => alert("Téléchargement du kit média complet (634 MB ZIP) initié.")}
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/20"
            >
              <Download className="w-4 h-4" /> Télécharger Tout le Press Kit (634 MB)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_ASSETS.map((asset, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-bold text-xs">
                    {asset.format}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">{asset.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">Taille: {asset.size}</div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Téléchargement de : ${asset.name}`)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-rose-400 cursor-pointer transition-colors"
                  title="Télécharger"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: MEDIA ACCREDITATION & INTERVIEW REQUEST FORM */}
        <div id="accreditation" className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#110713] to-slate-900 border border-rose-500/30 p-8 lg:p-12 shadow-2xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-widest">
              ACCRÉDITATION & DEMANDE D&apos;INTERVIEW
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
              Formulaire de Demande Média & Tournage
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Pour solliciter un entretien avec la Présidence ou obtenir une réaction officielle du Groupe sous embargo.
            </p>
          </div>

          {accreditationSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">Demande Média Transmise</h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Votre demande a été attribuée à notre bureau de presse senior. Vous recevrez une réponse sous 2 heures avec confirmation d&apos;embargo ou créneau d&apos;interview.
              </p>

              <div className="inline-block px-6 py-3 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-400 font-mono font-bold text-lg">
                RÉFÉRENCE TICKET PRESSE: {accreditationSubmitted}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setAccreditationSubmitted(null)}
                  className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono uppercase cursor-pointer"
                >
                  Déposer une autre demande
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleAccreditationSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Nom du Média / Agence de Presse *
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaFormData.mediaOutlet}
                    onChange={e => setMediaFormData({ ...mediaFormData, mediaOutlet: e.target.value })}
                    placeholder="ex: Financial Times, Reuters, Bloomberg, Jeune Afrique..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Nom du Journaliste / Rédacteur *
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaFormData.journalistName}
                    onChange={e => setMediaFormData({ ...mediaFormData, journalistName: e.target.value })}
                    placeholder="Nom complet & Titre"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    N° Carte de Presse / Inscription Professionnelle
                  </label>
                  <input
                    type="text"
                    value={mediaFormData.pressCardId}
                    onChange={e => setMediaFormData({ ...mediaFormData, pressCardId: e.target.value })}
                    placeholder="ex: PRESS-ID-88392"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Adresse Email Média / Officielle *
                  </label>
                  <input
                    type="email"
                    required
                    value={mediaFormData.email}
                    onChange={e => setMediaFormData({ ...mediaFormData, email: e.target.value })}
                    placeholder="journaliste@media.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Objet de la Demande *
                  </label>
                  <select
                    value={mediaFormData.topic}
                    onChange={e => setMediaFormData({ ...mediaFormData, topic: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Interview Exécutive">Interview Exécutive avec le CEO</option>
                    <option value="Demande de Déclaration">Demande de Déclaration Officielle</option>
                    <option value="Accréditation Événement">Accréditation Conférence / Sommet</option>
                    <option value="Tournage & B-Roll">Autorisation de Tournage Datacenter/Port</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Date Limite / Deadline de Bouclage *
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaFormData.deadline}
                    onChange={e => setMediaFormData({ ...mediaFormData, deadline: e.target.value })}
                    placeholder="ex: Aujourd'hui avant 18h GMT / Demain 12h"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Détails de la Requête & Questions Principales *
                </label>
                <textarea
                  rows={4}
                  required
                  value={mediaFormData.requestDetails}
                  onChange={e => setMediaFormData({ ...mediaFormData, requestDetails: e.target.value })}
                  placeholder="Précisez le contexte du papier, l'audience visée et les questions clés souhaitées..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Upload Press Card / Mandate */}
              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rose-500 transition-colors">
                <Upload className="w-6 h-6 text-rose-400 mb-2" />
                <span className="text-xs font-mono text-slate-300">
                  Joindre un Justificatif de Presse ou Mandat d&apos;Agréation (PDF, JPG, PNG)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="media-embargo"
                  required
                  checked={mediaFormData.agreedEmbargo}
                  onChange={e => setMediaFormData({ ...mediaFormData, agreedEmbargo: e.target.checked })}
                  className="rounded border-slate-800 text-rose-500 focus:ring-rose-500 cursor-pointer"
                />
                <label htmlFor="media-embargo" className="text-xs text-slate-400 cursor-pointer">
                  J&apos;atteste respecter les règles de déontologie journalistique et les protocoles d&apos;embargo fixés par le Bureau de Presse Koffmann Capital Group.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-slate-950 font-mono font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 cursor-pointer"
              >
                Transmettre au Bureau de Presse Officiel →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
