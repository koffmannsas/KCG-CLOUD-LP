import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Server, 
  Lock, 
  CheckCircle2, 
  Send, 
  Clock, 
  ArrowRight,
  Activity,
  Layers,
  Database,
  Sparkles,
  Sliders
} from 'lucide-react';

interface KcgCoreDeskProps {
  onBack: () => void;
  onSelectOtherDesk: (deskId: string) => void;
}

export default function KcgCoreDesk({ onBack, onSelectOtherDesk }: KcgCoreDeskProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    sector: 'Banking & Financial Infrastructure',
    ctoName: '',
    email: '',
    phone: '',
    deploymentModel: 'Air-Gapped Sovereign On-Premise',
    llmRequirement: 'Modèle Souverain Francophone & Langues Locales',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ROI Calculator State
  const [userCount, setUserCount] = useState<number>(500);
  const [transactionsPerDay, setTransactionsPerDay] = useState<number>(100000);

  const calculateROI = () => {
    const annualSavings = (userCount * 450) + (transactionsPerDay * 0.02 * 365);
    return Math.round(annualSavings).toLocaleString('fr-FR');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-28 pb-24 relative overflow-hidden font-sans">
      {/* Cyan Cyber Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Navigation Breadcrumb & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 font-mono text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-cyan-400" />
            <span>← Retour aux Desks Unifiés</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] text-neutral-400 overflow-x-auto py-1">
            <span className="text-cyan-400 font-bold uppercase tracking-widest">IA & SOLUTIONS :</span>
            <button onClick={() => onSelectOtherDesk('ceo')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">CEO Office</button>
            <button onClick={() => onSelectOtherDesk('partnerships')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Institutionnel</button>
            <button onClick={() => onSelectOtherDesk('investors')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Investisseurs</button>
            <button onClick={() => onSelectOtherDesk('core')} className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">KCG CORE</button>
            <button onClick={() => onSelectOtherDesk('media')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Presse</button>
            <button onClick={() => onSelectOtherDesk('careers')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Carrières</button>
            <button onClick={() => onSelectOtherDesk('support')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Support 24/7</button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>CENTRE DE COMMANDEMENT TECHNOLOGIQUE ET IA</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.05]">
              Ventes Entreprises & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-500">
                Platforme KCG CORE & IA
              </span>
            </h1>

            <p className="text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
              Déploiement souverain de la suite d'Intelligence Artificielle KCG CORE, du moteur de décision analytique Krypton, des hubs de compensation monétique FIKO PAY et des infrastructures Sovereign Cloud pour banques, gouvernements et grandes entreprises.
            </p>

            {/* SLA Badge */}
            <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4" />
                <span>SLA ENTREPRISE : RÉPONSE SOUS 1H</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span>CERTIFICATION HÉBERGEMENT TIER IV AFRIQUE</span>
              </div>
            </div>
          </div>

          {/* Live System Graph Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-cyan-950/30 via-neutral-900/80 to-black border border-cyan-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                <span className="text-cyan-400 font-bold uppercase tracking-widest">KCG CORE NODE SYSTEM</span>
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs text-neutral-300">
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between">
                  <span>Moteur de Décision Krypton :</span>
                  <span className="text-cyan-400 font-bold">ONLINE (0.4ms)</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between">
                  <span>Passerelle LLM Souverain :</span>
                  <span className="text-emerald-400 font-bold">ENCLAVE ACTICE</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between">
                  <span>Hub Monétique FIKO PAY :</span>
                  <span className="text-cyan-400 font-bold">99.999% Uptime</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] font-mono text-cyan-200">
                "KCG CORE est configuré pour résister aux attaques cybernétiques de niveau étatique tout en garantissant une étanchéité totale des données institutionnelles."
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE ENTERPRISE ROI CALCULATOR */}
        <div className="mb-20 bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em] font-bold block mb-2">
              SIMULATEUR DE VALEUR AJOUTÉE
            </span>
            <h2 className="text-2xl font-display font-bold uppercase text-white">
              CALCULATEUR D'IMPACT ET RENTABILITÉ KCG CORE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-mono text-xs text-neutral-400 mb-2">
                  <span>Nombre de Collaborateurs / Utilisateurs IA :</span>
                  <span className="text-cyan-400 font-bold">{userCount} utilisateurs</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={userCount}
                  onChange={(e) => setUserCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-neutral-400 mb-2">
                  <span>Volume Quotidien de Transactions Traitées :</span>
                  <span className="text-cyan-400 font-bold">{transactionsPerDay.toLocaleString()} tx/jour</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={transactionsPerDay}
                  onChange={(e) => setTransactionsPerDay(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-center space-y-3">
              <span className="text-xs font-mono text-neutral-400 uppercase">Gains d'Efficacité Estimés / An :</span>
              <span className="block text-4xl sm:text-5xl font-display font-bold text-cyan-400">
                {calculateROI()} FCFA
              </span>
              <span className="text-[10px] font-mono text-emerald-400 block">
                ★ Réduction globale des coûts opérationnels de 35% à 50%
              </span>
            </div>
          </div>
        </div>

        {/* DEMO REQUEST FORM */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8 bg-[#040810] border border-cyan-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                  DEMO PRIVÉE C-SUITE
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white">
                  SOLLICITER UNE DÉMONSTRATION SUR MESURE KCG CORE
                </h2>
              </div>
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>

            {submitted ? (
              <div className="p-10 text-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">SESSIONS DE DEMO PROGRAMMÉE</h3>
                <p className="text-sm text-neutral-300 font-light max-w-md mx-auto">
                  Un Ingénieur Solutions KCG prépare votre bac à sable personnalisé et prendra contact avec vos équipes techniques sous 1 heure.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-mono text-xs uppercase font-bold tracking-widest"
                >
                  Programmer une autre session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Nom de la Société / Banques *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Ex: Société Générale Côte d'Ivoire"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Directeur Technique / CIO / CTO *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ctoName}
                      onChange={(e) => setFormData({ ...formData, ctoName: e.target.value })}
                      placeholder="Ex: Marc Bamba, CIO"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Courriel Professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: m.bamba@sgci.ci"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Modèle de Déploiement Souhaité
                    </label>
                    <select
                      value={formData.deploymentModel}
                      onChange={(e) => setFormData({ ...formData, deploymentModel: e.target.value })}
                      className="w-full bg-[#081220] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Air-Gapped Sovereign On-Premise">Air-Gapped Sovereign On-Premise (Datacenter Client)</option>
                      <option value="Hybrid Sovereign Cloud">Hybrid Sovereign Cloud KCG (Tier IV Abidjan)</option>
                      <option value="SaaS Private Enclave">SaaS Private Enclave (Multi-Tenancy Isolé)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                    Besoins Métiers & Cas d'Usage
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez vos objectifs d'automatisation, de lutte anti-fraude, de compensation ou d'intelligence décisionnelle..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-extrabold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                >
                  {submitting ? 'Traitement...' : 'Commander la Démo Dédiée'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                DESK VENTES KCG CORE
              </span>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-white">
                <span>Courriel : kcg@koffmann.group</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-white">
                <span>Téléphone : +225 07 98 76 77 63</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
