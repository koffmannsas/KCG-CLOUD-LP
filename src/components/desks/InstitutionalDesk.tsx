import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Globe,
  Building,
  FileText,
  CheckCircle2,
  Send,
  Clock,
  Award,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  Landmark
} from 'lucide-react';

interface InstitutionalDeskProps {
  onBack: () => void;
  onSelectOtherDesk: (deskId: string) => void;
}

export default function InstitutionalDesk({ onBack, onSelectOtherDesk }: InstitutionalDeskProps) {
  const [formData, setFormData] = useState({
    institutionName: '',
    country: '',
    delegateName: '',
    role: '',
    email: '',
    phone: '',
    programType: 'Projet d\'Infrastructure PPP',
    estimatedBudget: '30 M-FCFA - 130 M-FCFA',
    mouDetails: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#04060a] text-white pt-28 pb-24 relative overflow-hidden font-sans">
      {/* Blue Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-600/15 via-emerald-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">

        {/* Navigation Breadcrumb & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 font-mono text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-blue-400" />
            <span>← Retour aux Desks Unifiés</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] text-neutral-400 overflow-x-auto py-1">
            <span className="text-blue-400 font-bold uppercase tracking-widest">AFFAIRES PUBLIQUES :</span>
            <button onClick={() => onSelectOtherDesk('ceo')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">CEO Office</button>
            <button onClick={() => onSelectOtherDesk('partnerships')} className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Institutionnel</button>
            <button onClick={() => onSelectOtherDesk('investors')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Investisseurs</button>
            <button onClick={() => onSelectOtherDesk('core')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">KCG CORE</button>
            <button onClick={() => onSelectOtherDesk('media')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Presse</button>
            <button onClick={() => onSelectOtherDesk('careers')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Carrières</button>
            <button onClick={() => onSelectOtherDesk('support')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Support 24/7</button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <Landmark className="w-3.5 h-3.5 text-blue-400" />
              <span>DÉVELOPPEMENT MULTILATÉRAL & ORGANISMES SOUVERAINS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.05]">
              Partenariats <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-500">
                Institutionnels & Gouvernementaux
              </span>
            </h1>

            <p className="text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
              Interface officielle de Koffmann Capital Group auprès des Banques Multilatérales de Développement (BAD, Banque Mondiale, Boad), des Commissions Régionales (UEMOA, CEDEAO) et des Agences Nationales de Promotion des Investissements.
            </p>

            {/* SLA Badge */}
            <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4" />
                <span>INSTRUCTION PROTOCOLAIRE : SOUS 4H</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                <Shield className="w-4 h-4" />
                <span>CADRE CONTRACTUEL UNIFIÉ PPP</span>
              </div>
            </div>
          </div>

          {/* Multilateral Stats Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-900/20 via-neutral-900/80 to-black border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">AFFAIRES MULTILATÉRALES</span>
                <Globe className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
                  <span className="block text-2xl font-display font-bold text-white">1 800 M-FCFA</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Pipeline PPP UEMOA</span>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
                  <span className="block text-2xl font-display font-bold text-blue-400">14 État-Membres</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Partenariats Actifs</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-200/80 font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Accords MoU Soumis :</span>
                  <span className="font-bold text-white">84 Renseignés</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Projets Co-financés :</span>
                  <span className="font-bold text-emerald-400">12 Projets Majeurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INSTITUTIONAL COOPERATION PIPELINE */}
        <div className="mb-20 bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12">
          <h2 className="text-xl font-display font-bold uppercase text-white mb-8">
            DISPOSITIFS D'ACCOMPAGNEMENT INSTITUTIONNEL
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Montage de Projets PPP",
                desc: "Assistance technique et financière aux ministères pour la structuration de partenariats public-privé (Infrastructures, Énergie, Numérique)."
              },
              {
                title: "Accords de Coopération MoU",
                desc: "Élaboration de mémorandums d'entente cadre avec les agences régionales pour accélérer l'intégration économique."
              },
              {
                title: "Fonds Consortiaux Souverains",
                desc: "Création de véhicules de co-investissement associant capitaux publics multilatéraux et investisseurs privés qualifiés."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/40 transition-all space-y-3">
                <h3 className="text-base font-display font-bold text-blue-400 uppercase">{item.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOU REQUEST & FORM */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8 bg-[#060a12] border border-blue-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold block mb-1">
                  PROTOCOLE OFFICIEL
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white">
                  DEMANDE DE PARTENARIAT INSTITUTIONNEL OU MoU
                </h2>
              </div>
              <Landmark className="w-6 h-6 text-blue-400" />
            </div>

            {submitted ? (
              <div className="p-10 text-center rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">REQUÊTE PROTOCOLAIRE ENREGISTRÉE</h3>
                <p className="text-sm text-neutral-300 font-light max-w-md mx-auto">
                  La Direction des Partenariats Institutionnels examinera votre dossier et contactera votre délégation sous 4 heures.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-blue-500 text-white font-mono text-xs uppercase font-bold tracking-widest"
                >
                  Soumettre une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Nom de l'Institution / Organisme *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      placeholder="Ex: Banque Ouest Africaine de Développement (BOAD)"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Pays ou Région Souveraine *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Ex: Zone UEMOA / Côte d'Ivoire"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Représentant Mandaté *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.delegateName}
                      onChange={(e) => setFormData({ ...formData, delegateName: e.target.value })}
                      placeholder="Ex: Dr. Amadou Diallo"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Courriel Officiel Institutionnel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: partnership@boad.org"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                    Détails du Projet ou du Protocole d'Accord *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mouDetails}
                    onChange={(e) => setFormData({ ...formData, mouDetails: e.target.value })}
                    placeholder="Décrivez les axes stratégiques de collaboration, les financements recherchés ou les infrastructures visées..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-extrabold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.3)]"
                >
                  {submitting ? 'Transmetting...' : 'Soumettre aux Affaires Institutionnelles'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                CONTACT DIRECT DESK INSTITUTIONNEL
              </span>
              <p className="text-neutral-400 text-xs font-light">
                Pour les correspondances officielles d'ambassades ou d'organisations internationales :
              </p>
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
