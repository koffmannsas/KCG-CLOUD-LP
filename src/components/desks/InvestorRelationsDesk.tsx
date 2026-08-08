import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Download,
  Lock,
  CheckCircle2,
  Send,
  Clock,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Layers,
  FileText
} from 'lucide-react';

interface InvestorRelationsDeskProps {
  onBack: () => void;
  onSelectOtherDesk: (deskId: string) => void;
}

export default function InvestorRelationsDesk({ onBack, onSelectOtherDesk }: InvestorRelationsDeskProps) {
  const [formData, setFormData] = useState({
    lpName: '',
    fundType: 'Family Office',
    email: '',
    phone: '',
    allocationBudget: '5 M-FCFA - 30 M-FCFA',
    targetVehicles: ['KCG Sovereign Infra Fund I', 'KCG Venture Tech II'],
    accreditedInvestor: true,
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadRequested, setDownloadRequested] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  const handleDownloadDeck = () => {
    setDownloadRequested(true);
    setTimeout(() => {
      setDownloadRequested(false);
      alert("Votre demande d'accès au Memorandum & Investment Deck KCG 2026 a été transmise. Un lien de téléchargement sécurisé vous sera envoyé sous 30 min après vérification de votre accréditation LP.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#040806] text-white pt-28 pb-24 relative overflow-hidden font-sans">
      {/* Emerald Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-emerald-600/15 via-teal-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">

        {/* Navigation Breadcrumb & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 font-mono text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-emerald-400" />
            <span>← Retour aux Desks Unifiés</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] text-neutral-400 overflow-x-auto py-1">
            <span className="text-emerald-400 font-bold uppercase tracking-widest">RELATIONS LP :</span>
            <button onClick={() => onSelectOtherDesk('ceo')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">CEO Office</button>
            <button onClick={() => onSelectOtherDesk('partnerships')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Institutionnel</button>
            <button onClick={() => onSelectOtherDesk('investors')} className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Investisseurs</button>
            <button onClick={() => onSelectOtherDesk('core')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">KCG CORE</button>
            <button onClick={() => onSelectOtherDesk('media')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Presse</button>
            <button onClick={() => onSelectOtherDesk('careers')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Carrières</button>
            <button onClick={() => onSelectOtherDesk('support')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Support 24/7</button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>GESTION D'ACTIFS & CAPITAL QUALIFIÉ (LP PORTAL)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.05]">
              Relations <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-500">
                Investisseurs & Capital LP
              </span>
            </h1>

            <p className="text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
              Espace dédié aux Limited Partners (LPs), Fonds Souverains, Family Offices, Fonds de Pension et Investisseurs Institutionnels souhaitant co-investir dans les infrastructures stratégiques et champions technologiques africains.
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleDownloadDeck}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>{downloadRequested ? 'Vérification...' : 'Recevoir le Memorandum 2026 (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Investment Stats Board */}
          <div className="lg:col-span-5 bg-gradient-to-b from-emerald-950/30 via-neutral-900/80 to-black border border-emerald-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">METRICS FONDS KCG</span>
                <PieChart className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
                  <span className="block text-2xl font-display font-bold text-white">24.8%</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Cible IRR Net</span>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
                  <span className="block text-2xl font-display font-bold text-emerald-400">780 M-FCFA</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Sous Gestion (AUM)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono space-y-2 text-neutral-300">
                <div className="flex justify-between">
                  <span>KCG Sovereign Infra I :</span>
                  <span className="text-emerald-400 font-bold">Fermeture T4 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>KCG Venture Tech II :</span>
                  <span className="text-white font-bold">Ouvert aux LPs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM & ONBOARDING */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8 bg-[#050c08] border border-emerald-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                  ACCRÉDITATION LP
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white">
                  DEMANDE DE PLACEMENT PRIVÉ OU ACCÈS LP PORTAL
                </h2>
              </div>
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>

            {submitted ? (
              <div className="p-10 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">DOSSIER TRANSMIS A L'EQUIPE LP</h3>
                <p className="text-sm text-neutral-300 font-light max-w-md mx-auto">
                  Notre département Investor Relations validera votre statut d'investisseur qualifié sous 2 heures et vous fournira vos accès au portal de data room.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-mono text-xs uppercase font-bold tracking-widest"
                >
                  Soumettre un autre dossier
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Nom du Fonds / Family Office *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lpName}
                      onChange={(e) => setFormData({ ...formData, lpName: e.target.value })}
                      placeholder="Ex: West Africa Capital Partners"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Catégorie d'Investisseur *
                    </label>
                    <select
                      value={formData.fundType}
                      onChange={(e) => setFormData({ ...formData, fundType: e.target.value })}
                      className="w-full bg-[#0a1810] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Family Office">Family Office Single / Multi</option>
                      <option value="Sovereign Fund">Fonds Souverain / Public Wealth</option>
                      <option value="Pension Fund">Fonds de Pension / Assureur</option>
                      <option value="HNWI">HNWI Accrédité / Private Capital</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Courriel Professionnel LP *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: ir@wacapital.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Tranche d'Allocation Envisagée
                    </label>
                    <select
                      value={formData.allocationBudget}
                      onChange={(e) => setFormData({ ...formData, allocationBudget: e.target.value })}
                      className="w-full bg-[#0a1810] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="1 M-FCFA - 5 M-FCFA">1 M-FCFA à 5 M-FCFA</option>
                      <option value="5 M-FCFA - 30 M-FCFA">5 M-FCFA à 30 M-FCFA</option>
                      <option value="> 30 M-FCFA">&gt; 30 M-FCFA (Ancrage LP)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                    Remarques ou Stratégie d'Allocation
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre horizon de liquidité, vos exigences ESG et votre ciblage géographique..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="accredited"
                    checked={formData.accreditedInvestor}
                    onChange={(e) => setFormData({ ...formData, accreditedInvestor: e.target.checked })}
                    className="accent-emerald-400 w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="accredited" className="text-xs text-neutral-300 font-mono cursor-pointer">
                    Je confirme être un investisseur qualifié ou institutionnel accrédité.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-extrabold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                >
                  {submitting ? 'Traitement en cours...' : 'Demander l\'accès à la Data Room LP'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
                CONTACT INVESTOR RELATIONS
              </span>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-white">
                <span>Directeur des Relations LP : kcg@koffmann.group</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-white">
                <span>Desk Abidjan / Panafricain : +225 07 98 76 77 63</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
