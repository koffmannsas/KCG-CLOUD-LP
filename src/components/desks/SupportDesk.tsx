import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  ShieldAlert,
  Activity,
  Server,
  Zap,
  Cpu,
  Lock,
  PhoneCall,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  FileCode,
  HelpCircle,
  Upload,
  ArrowRight,
  RefreshCw,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface SupportDeskProps {
  onBack: () => void;
  onSelectOtherDesk?: (deskId: string) => void;
}

const SYSTEM_NODES = [
  { id: 'node-01', name: 'KCG CORE — Krypton Engine v4.2', region: 'Abidjan Primary (DC-01)', status: 'OPERATIONAL', latency: '6.2 ms', uptime: '99.999%', load: '42%' },
  { id: 'node-02', name: 'FIKO PAY — Settlement Gateway', region: 'Dakar Cluster (DC-02)', status: 'OPERATIONAL', latency: '8.4 ms', uptime: '99.998%', load: '58%' },
  { id: 'node-03', name: 'Sovereign Cloud — Storage Pod A', region: 'Yamoussoukro Backup', status: 'OPERATIONAL', latency: '12.1 ms', uptime: '100.00%', load: '31%' },
  { id: 'node-04', name: 'PGP Security & HSM Vaults', region: 'Geneva Air-Gapped', status: 'OPERATIONAL', latency: '15.0 ms', uptime: '100.00%', load: '18%' }
];

const KNOWLEDGE_ARTICLES = [
  { id: 'kb-01', title: 'Procédure de Rotation des Clés PGP & Certificats TLS 1.3', category: 'Sécurité & Chiffrement', readTime: '5 min' },
  { id: 'kb-02', title: 'Guide d\'Intégration Webhooks FIKO PAY en Environnement de Sandbox', category: 'Développeurs & API', readTime: '8 min' },
  { id: 'kb-03', title: 'Plan de Continuité d\'Activité (PCA) & Basculement Automatique', category: 'Infrastructure & Cloud', readTime: '6 min' },
  { id: 'kb-04', title: 'Configuration des Nœuds Privés KCG Core pour les Banques Centrales', category: 'Réseaux Souverains', readTime: '12 min' }
];

export default function SupportDesk({ onBack, onSelectOtherDesk }: SupportDeskProps) {
  const [ticketPriority, setTicketPriority] = useState<'P1' | 'P2' | 'P3' | 'P4'>('P2');
  const [selectedNode, setSelectedNode] = useState<string>('all');
  
  // Form state
  const [ticketFormData, setTicketFormData] = useState({
    orgName: '',
    accountId: '',
    contactName: '',
    email: '',
    phone: '',
    component: 'KCG CORE Engine',
    priority: 'P2 - Élevée (Performance Dégradée)',
    description: '',
    agreedEmergencySla: false
  });

  const [createdTicketCode, setCreatedTicketCode] = useState<string | null>(null);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `INC-KCG-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedTicketCode(code);
  };

  return (
    <div className="w-full bg-[#04060a] text-slate-100 min-h-screen relative overflow-hidden font-mono">
      {/* Futuristic Grid & Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Console Bar */}
      <div className="sticky top-0 z-40 bg-[#04060a]/90 backdrop-blur-md border-b border-red-500/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider transition-colors border border-red-500/30 cursor-pointer"
          >
            ← Retour aux Desks
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-red-400 font-bold uppercase">
              DESK 08 // KCG ENTERPRISE MISSION CONTROL & NOC/SOC 24/7
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">ALL SYSTEMS NOMINAL</span>
          <span className="text-slate-700">|</span>
          <span>AVG LATENCY: 6.2ms</span>
          <span className="text-slate-700">|</span>
          <span>SOC STATUS: SHIELD ACTIVE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-10">
        {/* HERO MISSION CONTROL BANNER */}
        <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-[#0a0f1d] to-cyan-950/40 border border-red-500/40 p-8 lg:p-10 shadow-[0_0_50px_rgba(239,68,68,0.12)]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              NOC / SOC Operational Center & Cyber Incident Response
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded border border-slate-800 text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">TELEMETRY REFRESH: REALTIME</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Supervision Critique 24/7 & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400">Centre d&apos;Urgence Infrastructure</span>.
          </h1>

          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Guichet unique d&apos;assistance opérationnelle pour les gouvernements, banques centrales et entreprises déployant KCG Core, FIKO Pay et les conteneurs Sovereign Cloud.
          </p>

          {/* Realtime System Telemetry Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30">
              <div className="text-[10px] text-slate-400 uppercase">Disponibilité Globale (SLA)</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">99.999%</div>
              <div className="text-[10px] text-slate-500 mt-1">Objectif 5 Neufs</div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30">
              <div className="text-[10px] text-slate-400 uppercase">Débit Transactions FIKO</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">14,200 TPS</div>
              <div className="text-[10px] text-slate-500 mt-1">Temps Réponse 8ms</div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-red-500/30">
              <div className="text-[10px] text-slate-400 uppercase">Temps de Réponse P1 (Urgence)</div>
              <div className="text-2xl font-bold text-red-400 font-mono mt-1">&lt; 15 Mins</div>
              <div className="text-[10px] text-slate-500 mt-1">Rappel Téléphonique Direct</div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30">
              <div className="text-[10px] text-slate-400 uppercase">Clé PGP Urgence Incident</div>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">PGP 4096-bit</div>
              <div className="text-[10px] text-slate-500 mt-1">Prêt pour Chiffrement</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: LIVE SYSTEM TOPOLOGY DASHBOARD */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                Statut de la Topologie Système & Nœuds Régionaux
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                Aperçu en direct de l&apos;état de santé de l&apos;infrastructure KCG.
              </p>
            </div>

            <button
              onClick={() => alert('Actualisation de la télémétrie réseau effectuée.')}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              Actualiser Télémétrie
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYSTEM_NODES.map((node) => (
              <div key={node.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{node.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    ● {node.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400">{node.region}</div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Latence:</span>
                    <span className="text-cyan-400 font-bold">{node.latency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Uptime:</span>
                    <span className="text-emerald-400 font-bold">{node.uptime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Charge CPU:</span>
                    <span className="text-amber-400 font-bold">{node.load}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: EMERGENCY INCIDENT TICKET WIZARD */}
        <div id="incident-form" className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#0b0507] to-slate-950 border border-red-500/40 p-8 lg:p-10 shadow-2xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-widest">
              GÉNÉRATEUR DE TICKET D&apos;INCIDENT CRITIQUE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
              Déclarer un Incident Opérationnel 24/7
            </h2>
            <p className="text-xs text-slate-300 mt-1 font-sans">
              Renseignez ce formulaire pour solliciter une intervention prioritaire de nos équipes d&apos;astreinte NOC/SOC.
            </p>
          </div>

          {createdTicketCode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 rounded-2xl bg-red-950/40 border border-red-500/50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">Ticket d&apos;Urgence Généré & Routé</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto font-sans">
                L&apos;équipe NOC/SOC d&apos;astreinte a reçu l&apos;alerte. Un ingénieur senior déclenche le protocole de rappel d&apos;urgence sur le numéro indiqué.
              </p>

              <div className="inline-block px-6 py-3 rounded-xl bg-slate-950 border border-red-500/50 text-red-400 font-mono font-bold text-lg">
                TICKET NO: {createdTicketCode}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setCreatedTicketCode(null)}
                  className="px-6 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono uppercase cursor-pointer"
                >
                  Ouvrir un autre ticket
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="mt-8 space-y-6">
              {/* Priority Selector Tabs */}
              <div>
                <label className="block text-xs text-slate-300 uppercase mb-2">
                  Niveau de Priorité d&apos;Incident *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketPriority('P1')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
                      ticketPriority === 'P1'
                        ? 'bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    P1 — CRITIQUE (Interruption Totale &lt;15m)
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketPriority('P2')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
                      ticketPriority === 'P2'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    P2 — ÉLEVÉE (Performance Dégradée &lt;1h)
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketPriority('P3')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
                      ticketPriority === 'P3'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    P3 — MOYENNE (Question Config &lt;4h)
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketPriority('P4')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
                      ticketPriority === 'P4'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    P4 — MINEURE (Inquiry / Info &lt;24h)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-300 uppercase mb-2">
                    Nom de l&apos;Organisation / Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketFormData.orgName}
                    onChange={e => setTicketFormData({ ...ticketFormData, orgName: e.target.value })}
                    placeholder="Nom officiel"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 uppercase mb-2">
                    Identifiant Compte / Account ID KCG
                  </label>
                  <input
                    type="text"
                    value={ticketFormData.accountId}
                    onChange={e => setTicketFormData({ ...ticketFormData, accountId: e.target.value })}
                    placeholder="ex: KCG-ACC-88291"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 uppercase mb-2">
                    Composant / Service Impacté *
                  </label>
                  <select
                    value={ticketFormData.component}
                    onChange={e => setTicketFormData({ ...ticketFormData, component: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="KCG CORE Engine">KCG CORE Engine & Moteur Krypton</option>
                    <option value="FIKO PAY Clearing">FIKO PAY Clearing & Gateway Monétique</option>
                    <option value="Sovereign Cloud Pods">Sovereign Cloud Data Pods (Tier-IV)</option>
                    <option value="API & Webhooks">API Rest / Webhooks / SSL Certificates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 uppercase mb-2">
                    Téléphone d&apos;Urgence pour Rappel Direct *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ticketFormData.phone}
                    onChange={e => setTicketFormData({ ...ticketFormData, phone: e.target.value })}
                    placeholder="+225 07 98 76 77 63"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 uppercase mb-2">
                  Description Technique de l&apos;Incident & Logs *
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketFormData.description}
                  onChange={e => setTicketFormData({ ...ticketFormData, description: e.target.value })}
                  placeholder="Décrivez les symptômes, messages d'erreur et heures constatées..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono text-xs"
                />
              </div>

              {/* Upload Dropzone */}
              <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500 transition-colors">
                <Upload className="w-5 h-5 text-red-400 mb-2" />
                <span className="text-xs text-slate-300">
                  Attacher Captures d&apos;Écran ou Fichiers de Logs (ZIP, TXT, LOG)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="support-terms"
                  required
                  checked={ticketFormData.agreedEmergencySla}
                  onChange={e => setTicketFormData({ ...ticketFormData, agreedEmergencySla: e.target.checked })}
                  className="rounded border-slate-800 text-red-500 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="support-terms" className="text-xs text-slate-400 cursor-pointer font-sans">
                  J&apos;atteste que cet incident affecte un environnement de production sous contrat de maintenance KCG.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 cursor-pointer"
              >
                Transmettre au Desk de Garde NOC/SOC 24/7 →
              </button>
            </form>
          )}
        </div>

        {/* SECTION 3: KNOWLEDGE BASE & SECURITY BULLETINS */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            Base de Connaissances & Bulletins de Sécurité
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KNOWLEDGE_ARTICLES.map((article) => (
              <div key={article.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-mono">{article.category}</span>
                  <h4 className="text-xs font-bold text-white mt-1">{article.title}</h4>
                </div>

                <button
                  onClick={() => alert(`Ouverture de la documentation : ${article.title}`)}
                  className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
