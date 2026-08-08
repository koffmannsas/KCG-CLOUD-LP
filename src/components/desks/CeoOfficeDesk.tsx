import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Crown, 
  FileText, 
  Calendar, 
  ChevronRight, 
  Award, 
  Briefcase, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  UserCheck
} from 'lucide-react';

interface CeoOfficeDeskProps {
  onBack: () => void;
  onSelectOtherDesk: (deskId: string) => void;
}

export default function CeoOfficeDesk({ onBack, onSelectOtherDesk }: CeoOfficeDeskProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    entity: '',
    email: '',
    phone: '',
    entityType: 'Government',
    dealSize: '> 150 M-FCFA',
    priority: 'Urgence Souveraine',
    protocolNDA: true,
    directiveSubject: '',
    directiveDetails: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAgendaSlot, setSelectedAgendaSlot] = useState('Abidjan HQ - Audience Privée');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-24 relative overflow-hidden font-sans">
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-amber-500/10 via-kcg-red/10 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-amber-600/5 blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Navigation Breadcrumb & Desk Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 font-mono text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-kcg-red" />
            <span>← Retour aux Desks Unifiés</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] text-neutral-400 overflow-x-auto py-1">
            <span className="text-amber-400 font-bold uppercase tracking-widest">SITUATION ROOM :</span>
            <button onClick={() => onSelectOtherDesk('ceo')} className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">CEO Office</button>
            <button onClick={() => onSelectOtherDesk('partnerships')} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Institutionnel</button>
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
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>COMMANDEMENT EXÉCUTIF ET SOUVERAIN</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.05]">
              Cabinet du <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-500">
                Président-Directeur Général
              </span>
            </h1>

            <p className="text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
              Dédié exclusivement aux Chefs d'État, Ministres régaliens, dirigeants de multinationales et Fonds Souverains. Ce bureau instruit directement les mandats de haute stratégie, les arbitrages géopolitiques et les allocations de capital souverain.
            </p>

            {/* SLA Badge */}
            <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4" />
                <span>SLA AUDIENCE : RÉPONSE GARANTIE SOUS 2H</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span>PROTOCOLE CONFIDENTIEL HAUT SÉCURITÉ</span>
              </div>
            </div>
          </div>

          {/* Situation Room Status Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-amber-500/10 via-neutral-900/60 to-black border border-amber-500/30 rounded-3xl p-8 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
            <div className="absolute top-0 right-0 p-6 text-amber-500/20 font-mono text-6xl font-extrabold select-none">
              CEO
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">LIGNE DIRECTE PRÉSIDENCE</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-mono">Secrétariat Particulier :</span>
                  <span className="text-xs text-white font-mono font-bold">+225 07 98 76 77 63</span>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-mono">Courriel Confidentiel :</span>
                  <span className="text-xs text-amber-300 font-mono font-bold">kcg@koffmann.group</span>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-mono">Canal Chiffré Signal / PGP :</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">VERIFIED KEY #0x8F21</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200/80 font-light leading-relaxed">
                "Chaque audience accordée par la Présidence s'inscrit dans la vision d'un leadership souverain et d'un impact macroéconomique durable sur le continent africain."
              </div>
            </div>
          </div>
        </div>

        {/* DECISION WORKFLOW TIMELINE */}
        <div className="mb-20 bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.4em] font-bold block mb-2">
              GOUVERNANCE & PROTOCOLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
              PROTOCOLE D'AUDIENCE EXÉCUTIVE
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Instruction Préalable', desc: 'Analyse confidentielle de la note de cadrage et vérification d\'accréditation sous 2 heures.' },
              { step: '02', title: 'Cadrage Stratégique', desc: 'Échange préparatoire avec le Chef de Cabinet pour fixer l\'ordre du jour souverain.' },
              { step: '03', title: 'Audience Exécutive', desc: 'Session de travail directe en présentiel (KCG HOUSE Abidjan) ou visio sécurisée.' },
              { step: '04', title: 'Feuille de Route', desc: 'Délivrance d\'un mémorandum exécutif d\'engagement et nomination d\'un Directeur de Mission.' }
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/10 relative group hover:border-amber-500/50 transition-all">
                <span className="text-3xl font-display font-bold text-amber-500/40 block mb-3 group-hover:text-amber-400 transition-colors">{st.step}</span>
                <h3 className="text-sm font-display font-bold text-white uppercase mb-2">{st.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC FORM & DIRECT AUDIENCE SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Form Side */}
          <div className="lg:col-span-8 bg-[#08080f] border border-amber-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block mb-1">
                  DISPENSATEUR D'AUDIENCE
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white">
                  FORMULAIRE DE HAUTE DIRECTIVE SOUVERAINE
                </h2>
              </div>
              <Lock className="w-6 h-6 text-amber-400" />
            </div>

            {submitted ? (
              <div className="p-10 text-center rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">AUDIENCE ACCORDÉE / INSTRUCTION EN COURS</h3>
                <p className="text-sm text-neutral-300 font-light max-w-md mx-auto">
                  Votre directive d'audience a été transmise avec succès au Cabinet du PDG. Le Chef de Cabinet vous contactera directement sous 2 heures.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-black font-mono text-xs uppercase font-bold tracking-widest"
                >
                  Soumettre une autre directive
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Nom, Prénom & Rang *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex: S.E. Ministre / Directeur Général"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Entité / Gouvernement / Organisation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.entity}
                      onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                      placeholder="Ex: République de Côte d'Ivoire / Sovereign Wealth Fund"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Courriel Officiel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: cabinet@presidence.gouv.ci"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Ligne Directe / Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +225 07 98 76 77 63"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Nature du Demandeur
                    </label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                      className="w-full bg-[#12121e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Government">Gouvernement / Ministère Régalien</option>
                      <option value="Sovereign Fund">Fonds Souverain / Bank Central</option>
                      <option value="Multinational">Multinationale / Groupe Industriel</option>
                      <option value="Family Office">Family Office Ultra High Net Worth</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                      Volume Financier / Deal Size
                    </label>
                    <select
                      value={formData.dealSize}
                      onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                      className="w-full bg-[#12121e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="5 M-FCFA - 30 M-FCFA">5 M-FCFA à 30 M-FCFA</option>
                      <option value="30 M-FCFA - 150 M-FCFA">30 M-FCFA à 150 M-FCFA</option>
                      <option value="> 150 M-FCFA">&gt; 150 M-FCFA (Niveau Souverain)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                    Objet de l'Audience ou du Mandat *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.directiveSubject}
                    onChange={(e) => setFormData({ ...formData, directiveSubject: e.target.value })}
                    placeholder="Ex: Mandat de Conseil pour Émission d'Obligations Souveraines"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold mb-2">
                    Note Synthétique de Cadrage *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.directiveDetails}
                    onChange={(e) => setFormData({ ...formData, directiveDetails: e.target.value })}
                    placeholder="Résumez les enjeux stratégiques, l'urgence et les parties prenantes du dossier..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={formData.protocolNDA}
                    onChange={(e) => setFormData({ ...formData, protocolNDA: e.target.checked })}
                    className="accent-amber-400 w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="nda" className="text-xs text-amber-200 font-mono cursor-pointer select-none">
                    Activer le protocole automatique d'accord de confidentialité (NDA) tacite de haut niveau.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-extrabold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                >
                  {submitting ? 'Instruction en cours...' : 'Transmettre au Cabinet du PDG'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Agenda & Quick Booking Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>AGENDA DES AUDIENCES EXÉCUTIVES</span>
              </div>

              <p className="text-xs text-neutral-400 font-light">
                Sélectionnez le format d'audience souhaité pour l'instruction préalable par le Cabinet :
              </p>

              <div className="space-y-3 font-mono text-xs">
                {[
                  'Abidjan HQ - Audience Privée Présidence',
                  'Visioconférence Hautement Chiffrée (KCG Cloud)',
                  'Déplacement Spécial - Mission d\'État',
                  'Audience lors des Sommets Internationaux (BAD/BCEAO)'
                ].map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAgendaSlot(slot)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      selectedAgendaSlot === slot
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : 'bg-black/30 border-white/5 text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px]">{slot}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cabinet Contacts */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4 font-mono text-xs">
              <span className="text-neutral-400 uppercase tracking-widest block font-bold text-[10px] text-amber-400">
                MEMBRES DU CABINET DU PDG
              </span>
              <div className="space-y-3 text-neutral-300 text-[11px]">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-bold text-white">Chef de Cabinet & Affaires Politiques</span>
                  <span className="text-neutral-500">kcg@koffmann.group</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-bold text-white">Conseiller Spécial Transactions Souveraines</span>
                  <span className="text-neutral-500">kcg@koffmann.group</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
