import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Users,
  TrendingUp,
  Briefcase,
  ShieldAlert,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  ChevronDown,
  UploadCloud,
  Lock,
  FileText,
  HelpCircle,
  MessageSquare,
  Zap,
  Award,
  ExternalLink,
  Headphones,
  Video,
  AlertTriangle,
  Check,
  X,
  Share2,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import KcgHouseMap from '../components/KcgHouseMap';

import CeoOfficeDesk from '../components/desks/CeoOfficeDesk';
import InstitutionalDesk from '../components/desks/InstitutionalDesk';
import InvestorRelationsDesk from '../components/desks/InvestorRelationsDesk';
import KcgCoreDesk from '../components/desks/KcgCoreDesk';
import StrategicAlliancesDesk from '../components/desks/StrategicAlliancesDesk';
import MediaDesk from '../components/desks/MediaDesk';
import CareersDesk from '../components/desks/CareersDesk';
import SupportDesk from '../components/desks/SupportDesk';

// ================= TYPES & CONSTANTS =================
interface ExecutiveCard {
  id: string;
  title: string;
  department: string;
  description: string;
  email: string;
  phone: string;
  icon: any;
  badge: string;
  sla: string;
}

const EXECUTIVE_CARDS: ExecutiveCard[] = [
  {
    id: 'ceo',
    title: 'Cabinet du Président-Directeur Général',
    department: 'CEO Office',
    description: 'Directement dédié aux chefs d\'État, ministres, dirigeants de multinationales et transactions souveraines majeures.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: Building2,
    badge: 'ACCÈS DIRECT C-SUITE',
    sla: 'Réponse sous 2h'
  },
  {
    id: 'partnerships',
    title: 'Partenariats Institutionnels & Gouvernementaux',
    department: 'Institutional Partnerships',
    description: 'Relations avec les banques de développement, agences multilatérales (BAD, Banque Mondiale) et entités souveraines.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: Users,
    badge: 'AFFAIRES PUBLIQUES',
    sla: 'Réponse sous 4h'
  },
  {
    id: 'investors',
    title: 'Relations Investisseurs & Capital LP',
    department: 'Investors Relations',
    description: 'Accompagnement dédié des LPs, fonds souverains, Family Offices et investisseurs institutionnels qualifiés.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: TrendingUp,
    badge: 'ALLOCATION CAPITAL',
    sla: 'Réponse sous 2h'
  },
  {
    id: 'sales',
    title: 'Ventes Entreprises & Solutions KCG CORE',
    department: 'Enterprise Sales',
    description: 'Déploiement de notre plateforme d\'intelligence IA, solutions Sovereign Cloud et infrastructure de compensation FIKO.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: Cpu,
    badge: 'TRANSFORMATION IA',
    sla: 'Réponse sous 1h'
  },
  {
    id: 'alliances',
    title: 'Alliances Stratégiques & Joint-Ventures',
    department: 'Strategic Alliances',
    description: 'Création de consortia industriels, co-investissements technologiques et projets d\'infrastructure PPP.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: ShieldCheck,
    badge: 'CONSORTIA & PPP',
    sla: 'Réponse sous 6h'
  },
  {
    id: 'press',
    title: 'Presse, Médias & Communication Groupe',
    department: 'Press & Media',
    description: 'Agréments médias, interviews exécutives, communiqués officiels et rapports d\'impact socio-économique.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: MessageSquare,
    badge: 'MÉDIAS OFFICIELS',
    sla: 'Réponse sous 2h'
  },
  {
    id: 'careers',
    title: 'Carrières, Talents & Haute Direction',
    department: 'Careers & Talents',
    description: 'Recrutement d\'élite pour nos pôle Venture, IA, Infra et Finance. Programmes Fellows & Executive Leadership.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: Briefcase,
    badge: 'Ressources Humaines',
    sla: 'Réponse sous 24h'
  },
  {
    id: 'support',
    title: 'Support Opérationnel & Sécurité 24/7',
    department: 'Support & Operations',
    description: 'Assistance technique continue pour les clients KCG CORE, opérations monétiques et supervision réseau.',
    email: 'kcg@koffmann.group',
    phone: '+225 07 98 76 77 63',
    icon: Headphones,
    badge: 'DESK CRITIQUE 24/7',
    sla: 'Réponse Immédiate'
  }
];

interface GlobalHub {
  id: string;
  city: string;
  country: string;
  role: string;
  address: string;
  timezone: string;
  utcOffset: number;
  phone: string;
  email: string;
  coords: { x: number; y: number }; // Percentage relative to map container
  status: 'OUVERT (HQ)' | 'FUTURE OUVERTURE';
}

const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'abidjan',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    role: 'Siège Social Mondial & Commandement Souverain (Hub Ouvert)',
    address: 'KCG HOUSE, 101-43 Rue Gnoumaya, Palmeraie, Abidjan, Côte d\'Ivoire',
    timezone: 'GMT (UTC+0)',
    utcOffset: 0,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 48, y: 55 },
    status: 'OUVERT (HQ)'
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    role: 'Bureau Europe & Finance Internationale',
    address: '52 Avenue des Champs-Élysées, 75008 Paris',
    timezone: 'CET (UTC+1)',
    utcOffset: 1,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 49, y: 30 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'dubai',
    city: 'Dubaï',
    country: 'Émirats Arabes Unis',
    role: 'Desk Moyen-Orient & Fonds Souverains',
    address: 'DIFC Gate Precinct 4, Level 7, Dubai',
    timezone: 'GST (UTC+4)',
    utcOffset: 4,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 62, y: 42 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'london',
    city: 'Londres',
    country: 'Royaume-Uni',
    role: 'Desk Marchés de Capitaux & Légal',
    address: '1 Canada Square, Canary Wharf, London E14 5AA',
    timezone: 'BST (UTC+1)',
    utcOffset: 1,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 47, y: 26 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'États-Unis',
    role: 'Relations Amériques & Wall Street',
    address: '250 Vesey Street, 34th Floor, New York, NY 10281',
    timezone: 'EST (UTC-5)',
    utcOffset: -5,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 26, y: 35 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'singapore',
    city: 'Singapour',
    country: 'Singapour',
    role: 'Hub Asie-Pacifique & R&D IA',
    address: '1 Marina Boulevard, #28-00, Singapore 018989',
    timezone: 'SGT (UTC+8)',
    utcOffset: 8,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 80, y: 60 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'lagos',
    city: 'Lagos',
    country: 'Nigéria',
    role: 'Desk FinTech & Marchés Anglophones',
    address: 'Victoria Island, Commercial Avenue 12, Lagos',
    timezone: 'WAT (UTC+1)',
    utcOffset: 1,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 50, y: 56 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    role: 'Desk Afrique de l\'Est & Infra Télécom',
    address: 'Upper Hill Financial District, Nairobi',
    timezone: 'EAT (UTC+3)',
    utcOffset: 3,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 58, y: 62 },
    status: 'FUTURE OUVERTURE'
  },
  {
    id: 'johannesburg',
    city: 'Johannesbourg',
    country: 'Afrique du Sud',
    role: 'Desk Afrique Australe & M&A',
    address: 'Sandton City Executive Tower, Johannesburg',
    timezone: 'SAST (UTC+2)',
    utcOffset: 2,
    phone: '+225 07 98 76 77 63',
    email: 'kcg@koffmann.group',
    coords: { x: 54, y: 78 },
    status: 'FUTURE OUVERTURE'
  }
];

interface BookingSession {
  id: string;
  title: string;
  audience: string;
  duration: string;
  description: string;
  icon: any;
  tag: string;
}

const BOOKING_SESSIONS: BookingSession[] = [
  {
    id: 'strategy',
    title: 'Session Stratégique Exécutive',
    audience: 'Chefs d\'État, Ministres & Directeurs C-Suite',
    duration: '60 minutes',
    description: 'Discussion de haut niveau sur les enjeux d\'infrastructure souveraine, la transformation IA stratégique et la gouvernance macroéconomique.',
    icon: Building2,
    tag: 'SOUVERAINETÉ'
  },
  {
    id: 'investment',
    title: 'Revue d\'Investissement & Co-Capital',
    audience: 'Fonds Souverains, LPs & Family Offices',
    duration: '45 minutes',
    description: 'Présentation des opportunités de dealflow, structuration des véhicules de co-investissement et allocation dans les fonds KCG Venture.',
    icon: TrendingUp,
    tag: 'CAPITAL'
  },
  {
    id: 'partnership',
    title: 'Partenariat Écosystème & PPP',
    audience: 'Consortia Industriels & Groupes Privés',
    duration: '45 minutes',
    description: 'Définition des synergies opérationnelles, des projets de partenariat public-privé (PPP) et du déploiement multi-pays.',
    icon: Users,
    tag: 'CONSORTIUM'
  },
  {
    id: 'demo',
    title: 'Démonstration Privée KCG CORE & IA',
    audience: 'CTOs, CIOs & Directeurs de l\'Innovation',
    duration: '30 minutes',
    description: 'Présentation technique en direct de la plateforme KCG CORE, du moteur de décision Krypton et de la passerelle IA sécurisée.',
    icon: Cpu,
    tag: 'DÉMO DÉDIÉE'
  },
  {
    id: 'ai-consulting',
    title: 'Consultation Transformation IA Nationale',
    audience: 'Agences Numériques & Ministères de la Technologie',
    duration: '45 minutes',
    description: 'Cadrage des projets de LLM souverain, de digitalisation des services publics et d\'indépendance technologique continentale.',
    icon: Sparkles,
    tag: 'SOUVERAINETÉ IA'
  }
];

const EMERGENCY_CONTACTS = [
  {
    title: 'Support Entreprise Critical 24/7',
    description: 'Ligne d\'urgence pour interruptions de service KCG CORE, nœuds FIKO PAY ou pannes d\'infrastructure.',
    contact: '+225 07 98 76 77 63',
    type: 'PHONE',
    badge: 'DISPONIBILITÉ 99.999%',
    color: 'border-kcg-red/40 bg-kcg-red/10 text-kcg-red'
  },
  {
    title: 'Desk Incidents Cybersécurité',
    description: 'Signalement d\'anomalie réseau, tentative d\'intrusion ou besoin d\'isolation d\'urgence PGP.',
    contact: 'kcg@koffmann.group',
    type: 'EMAIL',
    badge: 'RÉPONSE SOUS 15 MIN',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-400'
  },
  {
    title: 'Desk Urgence Investisseurs LPs',
    description: 'Assistance prioritaire pour requêtes de liquidité, mouvements de fonds critiques et arbitrages de crise.',
    contact: 'kcg@koffmann.group',
    type: 'EMAIL',
    badge: 'ACCÈS DÉDIÉ LPs',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-400'
  },
  {
    title: 'Hotline Gestion de Crise & Médias',
    description: 'Prise de parole institutionnelle d\'urgence, déclarations officielles et porte-parole du Groupe.',
    contact: 'kcg@koffmann.group',
    type: 'EMAIL',
    badge: 'AFFAIRES PUBLIQUES',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
  }
];

const FAQ_ITEMS = [
  {
    q: "Comment devenir un partenaire stratégique de Koffmann Capital Group ?",
    a: "Vous pouvez soumettre une demande formelle via notre formulaire exécutif en sélectionnant la catégorie 'Partenariat Institutionnel'. Notre Cabinet du Président et notre direction des Alliances examineront votre profil et conviendront d'une première séance de travail en présentiel ou en visio-conférence sécurisée."
  },
  {
    q: "Quelles sont les conditions requises pour investir dans les véhicules KCG ?",
    a: "Les investissements au sein de nos fonds et véhicules d'infrastructures sont réservés aux investisseurs institutionnels qualifiés, fonds souverains, Family Offices et entreprises stratégiques respectant les exigences de conformité KYC/AML internationales et régionales UEMOA/CEMAC."
  },
  {
    q: "Comment postuler pour rejoindre les équipes de direction ou de recherche ?",
    a: "Consultez notre rubrique Carrières ou sélectionnez 'Carrières & Talents' dans le formulaire ci-dessus. Nous étudions en continu les candidatures d'ingénieurs en IA, économistes, directeurs de projets d'infrastructure et experts financiers de premier plan."
  },
  {
    q: "Comment solliciter une démonstration privée de KCG CORE & IA Gateway ?",
    a: "Sélectionnez l'option 'Démonstration Privée KCG CORE' dans notre module de réservation en ligne ou contactez notre département Ventes Entreprises. Un environnement de démonstration personnalisé sera préparé pour votre comité de direction."
  },
  {
    q: "Comment programmer un entretien de haut niveau avec le Cabinet du Président ?",
    a: "Les rendez-vous avec la Présidence Exécutive sont soumis à un protocole d'instruction préalable. Veuillez renseigner le formulaire avec la mention de priorité 'Urgence Souveraine' et joindre la note d'intention officielle de votre organisation."
  },
  {
    q: "Comment KCG CORE garantit-il la souveraineté des données et la conformité RGPD ?",
    a: "La suite technologique KCG CORE repose sur un modèle d'hébergement hybride et souverain au sein de datacenters certifiés Tier IV sur le continent africain. Toutes les requêtes IA sont chiffrées de bout en bout (AES-256) et ne sont jamais transmises à des serveurs tiers non agréés."
  }
];

const TRUST_PARTNERS = [
  { name: "UEMOA", category: "Régulation Financière" },
  { name: "BCEAO", category: "Banque Centrale" },
  { name: "BAD / AfDB", category: "Développement Africain" },
  { name: "IFC", category: "Groupe Banque Mondiale" },
  { name: "PROPARCO", category: "Coopération Internationale" },
  { name: "SILICON VALLEY LABS", category: "Partenaire R&D IA" },
  { name: "SOVEREIGN WEALTH DESKS", category: "Capital Institutionnel" }
];

export default function ContactPage() {
  // Executive Desk Portal State
  const [activeDesk, setActiveDesk] = useState<string>('overview');

  // State for form
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    organization: '',
    country: '',
    email: '',
    phone: '',
    subject: '',
    department: 'CEO Office',
    priority: 'Standard',
    investmentRange: '500M FCFA - 5 Milliards FCFA',
    collaborationType: 'Equity Investment',
    language: 'Français',
    message: '',
    gdprAccepted: false
  });

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State for active global hub
  const [selectedHub, setSelectedHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);

  // State for booking modal
  const [selectedBookingSession, setSelectedBookingSession] = useState<BookingSession | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('2026-08-10');
  const [bookingTime, setBookingTime] = useState<string>('10:00 GMT');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // State for active FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Live time calculator for selected hub
  const [hubLiveTime, setHubLiveTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const hubTime = new Date(utc + (3600000 * selectedHub.utcOffset));
      setHubLiveTime(hubTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedHub]);

  // Sub-desk portal rendering
  if (activeDesk === 'ceo') {
    return (
      <div className="bg-[#030305] min-h-screen text-white">
        <Navbar />
        <CeoOfficeDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'partnerships') {
    return (
      <div className="bg-[#04060a] min-h-screen text-white">
        <Navbar />
        <InstitutionalDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'alliances') {
    return (
      <div className="bg-[#03060c] min-h-screen text-white">
        <Navbar />
        <StrategicAlliancesDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'investors') {
    return (
      <div className="bg-[#040806] min-h-screen text-white">
        <Navbar />
        <InvestorRelationsDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'sales' || activeDesk === 'core') {
    return (
      <div className="bg-[#02040a] min-h-screen text-white">
        <Navbar />
        <KcgCoreDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'press' || activeDesk === 'media') {
    return (
      <div className="bg-[#080406] min-h-screen text-white">
        <Navbar />
        <MediaDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'careers') {
    return (
      <div className="bg-[#07040a] min-h-screen text-white">
        <Navbar />
        <CareersDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }
  if (activeDesk === 'support') {
    return (
      <div className="bg-[#060503] min-h-screen text-white">
        <Navbar />
        <SupportDesk onBack={() => setActiveDesk('overview')} onSelectOtherDesk={(d) => setActiveDesk(d)} />
        <Footer />
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprAccepted) {
      alert("Veuillez accepter la politique de confidentialité pour transmettre votre directive.");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setBookingSubmitted(false);
        setSelectedBookingSession(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-kcg-red selection:text-white font-sans relative overflow-x-hidden">

      {/* Background Ambient Glows & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-kcg-red/10 via-kcg-red/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/5 blur-[160px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-kcg-red/5 blur-[160px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-36 pb-24">

        {/* ================= HEADER / HERO ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 text-center mb-24 relative">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-kcg-red font-mono text-[10px] uppercase tracking-[0.4em] font-extrabold mb-8 shadow-[0_0_20px_rgba(200,16,46,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-kcg-red animate-ping" />
            CONSEIL SOUVERAIN & RELATIONS INSTITUTIONNELLES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.05] uppercase mb-8"
          >
            BÂTISSONS L'AFRIQUE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-kcg-red">
              DE DEMAIN, ENSEMBLE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-12"
          >
            Que vous soyez un investisseur institutionnel, un gouvernement, un leader d'écosystème, une startup technologique ou un talent d'exception, nos équipes exécutives sont prêtes à structurer la prochaine génération d'infrastructures souveraines.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl kcg-glass border border-white/10 backdrop-blur-2xl"
          >
            <div className="p-4 text-center border-r border-white/5 last:border-r-0">
              <span className="block text-2xl font-display font-bold text-white">15 Min</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">SLA Urgence</span>
            </div>
            <div className="p-4 text-center border-r border-white/5 last:border-r-0">
              <span className="block text-2xl font-display font-bold text-kcg-red">8 Hubs</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Présence Globale</span>
            </div>
            <div className="p-4 text-center border-r border-white/5 last:border-r-0">
              <span className="block text-2xl font-display font-bold text-white">24/7</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Desk Opérationnel</span>
            </div>
            <div className="p-4 text-center">
              <span className="block text-2xl font-display font-bold text-white">100%</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Confidentialité AES</span>
            </div>
          </motion.div>

        </section>


        {/* ================= SECTION 1: EXECUTIVE CONTACT CARDS ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block mb-2">
                ORIENTATION DIRECTE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                DESKS D'INSTRUCTION EXÉCUTIVE
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-md">
              Chaque direction répond à des protocoles d'instruction stricts pour garantir une prise en charge immédiate par les décideurs concernés.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXECUTIVE_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative kcg-glass bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 hover:border-kcg-red/40 p-6 rounded-2xl transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(200,16,46,0.15)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-kcg-red group-hover:scale-110 group-hover:bg-kcg-red/10 group-hover:border-kcg-red transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[8.5px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white uppercase tracking-tight mb-3 group-hover:text-kcg-red transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>ENGAGEMENT :</span>
                      <span className="text-white font-bold">{card.sla}</span>
                    </div>

                    <button
                      onClick={() => setActiveDesk(card.id)}
                      className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-kcg-red text-white text-[10px] font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(200,16,46,0.4)] cursor-pointer"
                    >
                      Accéder au Desk Dedié
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* ================= SECTION 2: INTERACTIVE CONTACT FORM ================= */}
        <section id="form-section" className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32 scroll-mt-32">

          <div className="relative rounded-3xl kcg-glass bg-[#08080c]/90 border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kcg-red/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-12 items-start">

              {/* Form Intro Column */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block mb-3">
                    CANAL TRANSMISSION SÉCURISÉ
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight leading-none mb-6">
                    DEMANDE D'AUDIENCE ET DIRECTIVE
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    Veuillez renseigner les éléments requis ci-contre. Votre transmission est automatiquement chiffrée puis transmise au secrétariat exécutif du département sélectionné.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    PROTOCOLE DE SÉCURITÉ ACTIF
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Chiffrement hybride PGP / AES-256. Aucune donnée n'est cédée à des tiers. Les directives souveraines font l'objet d'un accord de confidentialité (NDA) tacite dès réception.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3 text-neutral-400">
                    <Mail className="w-4 h-4 text-kcg-red" />
                    <span>kcg@koffmann.group</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <Phone className="w-4 h-4 text-kcg-red" />
                    <span>+225 07 98 76 77 63 (Standard HQ)</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <MapPin className="w-4 h-4 text-kcg-red" />
                    <span>KCG HOUSE, 101-43 Rue Gnoumaya, Palmeraie, Abidjan</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-8">

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 text-center rounded-2xl bg-white/[0.02] border border-emerald-500/30 space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                        TRANSMISSION ENREGISTRÉE AVEC SUCCÈS
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        RÉFÉRENCE : KCG-DIRECTIVE-2026-{(Math.random() * 100000).toFixed(0)}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
                      Votre directive a été transmise au département <span className="text-kcg-red font-bold">{formData.department}</span>. Notre secrétariat exécutif prendra contact avec vos services sous le délai SLA garanti.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all"
                    >
                      Transmettre une autre directive
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">

                    {/* Grid Inputs */}
                    <div className="grid sm:grid-cols-2 gap-6">

                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Nom & Prénom Executif *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ex: S.E. Jean-Marc Koffi"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Société / Institution / Ministère *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Ex: Ministère de l'Économie"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Courriel Professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Ex: jm.koffi@gouv.ci"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Ligne Directe / Téléphone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Ex: +225 07 98 76 77 63"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans"
                        />
                      </div>

                      {/* Department Selector */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Département Destinataire *
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-kcg-red transition-all font-sans"
                        >
                          {EXECUTIVE_CARDS.map((c) => (
                            <option key={c.id} value={c.department}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Priority Selector */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Niveau de Priorité / Urgence
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-kcg-red transition-all font-sans"
                        >
                          <option value="Standard">Standard (Traitement sous 24h)</option>
                          <option value="Haute">Haute Priorité (Traitement sous 4h)</option>
                          <option value="Urgence Souveraine">Urgence Souveraine C-Suite (SLA 15 min)</option>
                        </select>
                      </div>

                      {/* Investment Range */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Envergure du Projet / Deal Size
                        </label>
                        <select
                          value={formData.investmentRange}
                          onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                          className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-kcg-red transition-all font-sans"
                        >
                          <option value="< 500M FCFA">&lt; 500.000.000 FCFA</option>
                          <option value="500M FCFA - 5 Milliards FCFA">500.000.000 FCFA à 5.000.000.000 FCFA</option>
                          <option value="5 Milliards FCFA - 30 Milliards FCFA">5.000.000.000 FCFA à 30.000.000.000 FCFA</option>
                          <option value="30 Milliards FCFA - 150 Milliards FCFA">30.000.000.000 FCFA à 150.000.000.000 FCFA</option>
                          <option value="> 150 Milliards FCFA">&gt; 150.000.000.000 FCFA (Niveau Souverain)</option>
                        </select>
                      </div>

                      {/* Collaboration type */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                          Nature de la Collaboration
                        </label>
                        <select
                          value={formData.collaborationType}
                          onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                          className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-kcg-red transition-all font-sans"
                        >
                          <option value="Equity Investment">Investissement / Prise de Participation</option>
                          <option value="Sovereign Infrastructure">Projet d'Infrastructure Souveraine (PPP)</option>
                          <option value="AI Integration">Déploiement KCG CORE & Intelligence Artificielle</option>
                          <option value="Joint Venture">Joint-Venture Industrielle ou Financière</option>
                          <option value="Institutional Advisory">Conseil Stratégique & Mandat</option>
                        </select>
                      </div>

                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                        Objet de la Directive / Titre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Ex: Projet de Datacenter Souverain et Déploiement FIKO PAY"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                        Détails de la Directive ou de la Demande *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Précisez les objectifs stratégiques, le calendrier envisagé et les parties prenantes impliquées..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-kcg-red transition-all font-sans resize-none"
                      />
                    </div>

                    {/* File Attachment Drag & Drop */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                        Pièce Jointe Officielle / Note de Cadrage (Optionnel)
                      </label>
                      <div className="border border-dashed border-white/15 rounded-xl p-6 bg-white/[0.01] hover:border-kcg-red/50 transition-all text-center relative cursor-pointer group">
                        <input
                          type="file"
                          onChange={(e) => setAttachedFile(e.target.files ? e.target.files[0] : null)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud className="w-8 h-8 text-neutral-500 group-hover:text-kcg-red mx-auto mb-2 transition-colors" />
                        <span className="text-xs text-neutral-300 block font-sans">
                          {attachedFile ? attachedFile.name : "Glissez un fichier PDF / DOCX sécurisé ou cliquez pour sélectionner"}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 block mt-1">
                          Taille max : 25 Mo • Chiffrement automatique à l'envoi
                        </span>
                      </div>
                    </div>

                    {/* GDPR Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="gdpr"
                        required
                        checked={formData.gdprAccepted}
                        onChange={(e) => setFormData({ ...formData, gdprAccepted: e.target.checked })}
                        className="mt-1 accent-kcg-red w-4 h-4 rounded border-white/20 bg-black cursor-pointer"
                      />
                      <label htmlFor="gdpr" className="text-xs text-neutral-400 font-light cursor-pointer select-none">
                        J'autorise Koffmann Capital Group à traiter ces données confidentielles aux fins d'instruction de la demande, conformément à notre protocole strict de gouvernance des données.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-5 rounded-2xl bg-kcg-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.25em] font-extrabold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(200,16,46,0.4)] disabled:opacity-50 cursor-pointer"
                    >
                      {formSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>TRANSMISSION CHIFFRÉE EN COURS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMETTRE LA DIRECTIVE STRATÉGIQUE</span>
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>

        </section>


        {/* ================= SECTION 3: GLOBAL HEADQUARTERS & HUBS ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block mb-2">
                RÉSEAU SOUVERAIN
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                DESKS INTERNATIONAUX & SIÈGE SOCIAL
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-md">
              Depuis notre épicentre institutionnel d'Abidjan, KCG rayonne sur les plus grandes places financières et technologiques mondiales.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Interactive Map Visualizer Panel */}
            <div className="lg:col-span-8 kcg-glass bg-[#050508]/90 border border-white/10 rounded-3xl p-8 relative min-h-[480px] flex flex-col justify-between overflow-hidden shadow-2xl">

              {/* Map Header Overlay */}
              <div className="flex justify-between items-center relative z-20 font-mono text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SATELLITE LINK ACTIVE // GRID: 8 HUBS</span>
                </div>
                <span>ABIDJAN HQ COORDINATES: 5.361243° N, 3.957746° W</span>
              </div>

              {/* Stylized World Map Container */}
              <div className="relative w-full h-[340px] my-4 flex items-center justify-center">

                {/* World map outline background graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

                {/* Map Hub Pins */}
                {GLOBAL_HUBS.map((hub) => {
                  const isSelected = selectedHub.id === hub.id;
                  const isHQ = hub.id === 'abidjan';

                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 focus:outline-none"
                    >
                      {/* Pulse rings for HQ */}
                      {isHQ && (
                        <span className="absolute -inset-3 rounded-full bg-kcg-red/40 animate-ping" />
                      )}

                      {/* Pin Button */}
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isSelected
                          ? 'bg-kcg-red border-white scale-125 shadow-[0_0_20px_rgba(200,16,46,0.8)]'
                          : isHQ
                          ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                          : 'bg-amber-500/30 border-amber-400/50 hover:bg-amber-400 hover:scale-110'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isHQ ? 'bg-white' : 'bg-amber-200'}`} />
                      </div>

                      {/* Floating Label */}
                      <span className={`absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-wider font-bold whitespace-nowrap px-2 py-0.5 rounded transition-all ${
                        isSelected
                          ? 'bg-kcg-red text-white'
                          : isHQ
                          ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                          : 'bg-black/80 text-amber-300/80 border border-amber-500/20 group-hover:text-amber-200'
                      }`}>
                        {hub.city} {isHQ ? "(OUVERT)" : "(FUTUR)"}
                      </span>
                    </button>
                  );
                })}

                {/* Animated Connection Lines towards Abidjan HQ */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-kcg-red/20 fill-none">
                  {GLOBAL_HUBS.filter(h => h.id !== 'abidjan').map((h, i) => (
                    <line
                      key={i}
                      x1="48%"
                      y1="55%"
                      x2={`${h.coords.x}%`}
                      y2={`${h.coords.y}%`}
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  ))}
                </svg>

              </div>

              {/* Footer status bar */}
              <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 border-t border-white/5 pt-4 relative z-20">
                <span>RELAIS CHIFFRÉ TELEMETRY</span>
                <span className="text-emerald-400 font-bold">STATUS: HUB ABIDJAN EXCLUSIVEMENT OUVERT // 8 HUBS EN FUTURE OUVERTURE</span>
              </div>

            </div>

            {/* Selected Hub Details Panel */}
            <div className="lg:col-span-4 flex">
              <div className="w-full kcg-glass bg-[#08080c]/90 border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold border ${
                      selectedHub.id === 'abidjan'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    }`}>
                      {selectedHub.status}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>{hubLiveTime}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-1">
                    {selectedHub.city}
                  </h3>
                  <p className="text-xs text-kcg-red font-mono uppercase tracking-widest font-bold mb-6">
                    {selectedHub.country}
                  </p>

                  <div className="space-y-4 text-xs font-light text-neutral-300 border-t border-b border-white/5 py-6 mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold mb-1">Statut d'Ouverture :</span>
                      <p className={`font-mono text-xs font-bold ${selectedHub.id === 'abidjan' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {selectedHub.id === 'abidjan' ? '✓ SIÈGE SOCIAL MONDIAL OUVERT ET ACCESSIBLE' : '⚡ FUTURE OUVERTURE PROCHAINE — PROJET DE DÉVELOPPEMENT'}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold mb-1">Rôle Institutionnel :</span>
                      <p className="font-sans text-neutral-200">{selectedHub.role}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold mb-1">Adresse :</span>
                      <p className="font-sans text-neutral-300 leading-relaxed">{selectedHub.address}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold mb-1">Fuseau Horaires :</span>
                      <p className="font-mono text-neutral-300">{selectedHub.timezone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <a
                    href={`tel:${selectedHub.phone}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-kcg-red transition-all"
                  >
                    <span className="text-neutral-400">LIGNE :</span>
                    <span className="text-white font-bold">{selectedHub.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedHub.email}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-kcg-red transition-all"
                  >
                    <span className="text-neutral-400">EMAIL :</span>
                    <span className="text-white font-bold truncate max-w-[180px]">{selectedHub.email}</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* Dedicated KCG HOUSE Interactive Map Component */}
          <div className="mt-12">
            <KcgHouseMap />
          </div>

        </section>


        {/* ================= SECTION 4: EXECUTIVE MEETING BOOKING ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block mb-2">
                SESSIONS STRATÉGIQUES
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                RÉSERVATION D'AUDIENCE EXÉCUTIVE
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-md">
              Planifiez une séance de travail privée avec nos directeurs d'investissement, experts en IA ou la Présidence Exécutive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {BOOKING_SESSIONS.map((session) => {
              const Icon = session.icon;
              return (
                <div
                  key={session.id}
                  className="kcg-glass bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 hover:border-kcg-red/40 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(200,16,46,0.15)] group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-kcg-red/10 border border-kcg-red/30 text-kcg-red flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[8px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-bold">
                        {session.tag}
                      </span>
                    </div>

                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-tight mb-2 group-hover:text-kcg-red transition-colors">
                      {session.title}
                    </h3>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 mb-4">
                      <Clock className="w-3 h-3 text-kcg-red" />
                      <span>{session.duration}</span>
                    </div>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      {session.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBookingSession(session)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-kcg-red text-white font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-[0_0_15px_rgba(200,16,46,0.3)]"
                  >
                    Réserver
                    <Calendar className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

        </section>


        {/* ================= SECTION 5: EMERGENCY CONTACTS ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32">

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/30 via-black to-neutral-950 border border-kcg-red/30 relative overflow-hidden shadow-2xl">

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-kcg-red/20 border border-kcg-red text-kcg-red flex items-center justify-center animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.3em] font-bold block">
                    PROTOCOLE D'INSTRUCTION SPÉCIALE
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                    LIGNES D'URGENCE ET HOTLINES INSTITUTIONNELLES
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                SURVEILLANCE CONTINUE 24H/24 & 7J/7
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EMERGENCY_CONTACTS.map((emerg, eIdx) => (
                <div
                  key={eIdx}
                  className={`p-6 rounded-2xl border ${emerg.color} space-y-4 flex flex-col justify-between backdrop-blur-xl`}
                >
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10 inline-block mb-3">
                      {emerg.badge}
                    </span>
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-tight mb-2">
                      {emerg.title}
                    </h4>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {emerg.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[9px] font-mono text-neutral-400 block font-bold mb-1">
                      CONTACT DIRECT :
                    </span>
                    <a
                      href={emerg.type === 'PHONE' ? `tel:${emerg.contact}` : `mailto:${emerg.contact}`}
                      className="text-xs font-mono text-white font-extrabold hover:underline block truncate"
                    >
                      {emerg.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>


        {/* ================= SECTION 6: CANAUX DE COMMUNICATION ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32">

          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block">
              CANAUX OFFICIELS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              RÉSEAUX ET CANAUX DE TRANSMISSION
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

            <a
              href="mailto:kcg@koffmann.group"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-kcg-red transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-kcg-red flex items-center justify-center group-hover:scale-110 group-hover:bg-kcg-red group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">Courriel</span>
              <span className="text-[10px] font-mono text-neutral-500 truncate w-full">kcg@koffmann.group</span>
            </a>

            <a
              href="https://wa.me/2250700000000"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-emerald-500 transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">WhatsApp</span>
              <span className="text-[10px] font-mono text-neutral-500">Ligne Entreprise</span>
            </a>

            <a
              href="https://koffmann.group"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-blue-500 transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">LinkedIn</span>
              <span className="text-[10px] font-mono text-neutral-500">Koffmann Capital Group</span>
            </a>

            <a
              href="https://koffmann.group"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-white transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">X (Twitter)</span>
              <span className="text-[10px] font-mono text-neutral-500">@KoffmannGroup</span>
            </a>

            <a
              href="https://koffmann.group"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-red-600 transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-red-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">YouTube</span>
              <span className="text-[10px] font-mono text-neutral-500">Canal Stratégique</span>
            </a>

            <a
              href="tel:+2250798767763"
              className="p-6 rounded-2xl kcg-glass border border-white/10 hover:border-kcg-red transition-all text-center group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-kcg-red flex items-center justify-center group-hover:scale-110 group-hover:bg-kcg-red group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-display font-bold text-white uppercase">Téléphone</span>
              <span className="text-[10px] font-mono text-neutral-500">+225 07 98 76 77 63</span>
            </a>

          </div>

        </section>


        {/* ================= SECTION 7: FAQ ================= */}
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 mb-32">

          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-mono text-kcg-red uppercase tracking-[0.4em] font-bold block">
              FOIRE AUX QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              FOIRE AUX QUESTIONS INSTITUTIONNELLE
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl kcg-glass border border-white/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white hover:text-kcg-red transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-kcg-red shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-kcg-red' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>


        {/* ================= SECTION 8: TRUST PARTNERS ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-32 text-center">

          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] font-bold block mb-8">
            ÉCOSYSTÈME DE CONFIANCE & INSTITUTIONS RÉGLEMENTAIRES
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {TRUST_PARTNERS.map((partner, pIdx) => (
              <div
                key={pIdx}
                className="px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-kcg-red/30 transition-all duration-300 group cursor-default"
              >
                <span className="block text-sm font-display font-extrabold text-neutral-400 group-hover:text-white uppercase tracking-wider transition-colors">
                  {partner.name}
                </span>
                <span className="block text-[9px] font-mono text-neutral-600 group-hover:text-kcg-red transition-colors mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>

        </section>


        {/* ================= SECTION 9: LARGE CTA ================= */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-16">

          <div className="relative rounded-3xl bg-gradient-to-r from-red-950 via-black to-neutral-950 border border-kcg-red/40 p-12 sm:p-20 text-center overflow-hidden shadow-[0_0_80px_rgba(200,16,46,0.25)]">

            {/* Ambient Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(200,16,46,0.2),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">

              <span className="px-4 py-1.5 rounded-full bg-kcg-red/20 border border-kcg-red/40 text-kcg-red text-[10px] font-mono uppercase tracking-[0.4em] font-black inline-block">
                AMBITION CONTINENTALE
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white uppercase tracking-tight leading-none">
                PRÊT À BÂTIR L'AVENIR DE L'AFRIQUE ?
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Consultez nos directions exécutives ou engagez immédiatement le dialogue pour vos projets d'investissement, de partenariat ou de déploiement technologique.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                <a
                  href="#form-section"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-kcg-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.2em] font-extrabold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(200,16,46,0.5)]"
                >
                  <Calendar className="w-4 h-4" />
                  Saisir la Présidence Exécutive
                </a>

                <a
                  href="#form-section"
                  onClick={() => setFormData({ ...formData, department: 'Institutional Partnerships' })}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.2em] font-extrabold flex items-center justify-center gap-3 transition-all"
                >
                  Devenir Partenaire Stratégique
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ================= BOOKING MODAL ================= */}
      <AnimatePresence>
        {selectedBookingSession && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg kcg-glass bg-[#0a0a0f] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6"
            >

              <button
                onClick={() => setSelectedBookingSession(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="text-[9px] font-mono text-kcg-red uppercase tracking-widest font-extrabold px-2.5 py-1 rounded bg-kcg-red/10 border border-kcg-red/20 inline-block">
                  RÉSERVATION PRIVÉE
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                  {selectedBookingSession.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Target : {selectedBookingSession.audience} ({selectedBookingSession.duration})
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-display font-bold text-white uppercase">SESSION CONFIRMÉE</h4>
                  <p className="text-xs text-neutral-300 font-light">
                    Un lien de confirmation sécurisé et une invitation calendrier ont été transmis à votre adresse.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                      Date Souhaitée
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-kcg-red"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                      Créneau Horaire (GMT Abidjan)
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-kcg-red"
                    >
                      <option value="09:00 GMT">09:00 GMT (Matinée)</option>
                      <option value="11:00 GMT">11:00 GMT (Matinée)</option>
                      <option value="14:30 GMT">14:30 GMT (Après-midi)</option>
                      <option value="16:00 GMT">16:00 GMT (Fin d'après-midi)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                      Votre Email Officiel
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.nom@organisation.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-kcg-red"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-kcg-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    CONFIRMER LA SÉANCE D'AUDIENCE
                  </button>
                </form>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      <Footer />

    </div>
  );
}
