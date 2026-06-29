import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Database, FileText, Radio, ShieldCheck, Terminal, Cpu, Network, ArrowUpRight, ArrowDownRight, Search, BarChart3, Lock, Eye } from 'lucide-react';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';

export default function IntelligencePage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 font-sans selection:bg-kcg-red selection:text-white">
      {/* Background terminal/data effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[5%] text-[8px] font-mono text-kcg-red/80 flex flex-col items-start gap-1">
          {Array.from({length: 30}).map((_, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 4, delay: i * 0.15, repeat: Infinity, ease: "linear" }}
             >
               {`[KCG-CORE] SYS_${Math.floor(Math.random() * 10000)} OK - ${Math.random().toFixed(4)}`}
             </motion.div>
          ))}
        </div>
      </div>

      <TerminalHero />
      <SovereignIndexes />
      <ResearchTerminal />
      <MediaEngine />
    </div>
  );
}

function TerminalHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-20 z-10 px-6">
      <div className="container mx-auto max-w-[90rem]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-2 bg-kcg-red animate-pulse" />
              <span className="text-kcg-red font-mono uppercase tracking-[0.4em] text-[10px]">Intelligence Unit</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1.05] mb-8">
              KCG <span className="italic font-serif text-white/50">Terminal.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed mb-12 max-w-2xl">
              L'infrastructure propriétaire de renseignement économique et souverain de Koffmann Capital Group. Une plateforme de fusion de données surveillant le flux logistique, financier et technologique ouest-africain.
            </p>

            <div className="grid grid-cols-2 gap-8 font-mono text-xs border-t border-white/10 pt-8">
              <div>
                <div className="text-white/40 mb-2 uppercase tracking-widest">Macro Points (24H)</div>
                <div className="text-2xl text-white">12.4M</div>
              </div>
              <div>
                <div className="text-white/40 mb-2 uppercase tracking-widest">Modèles Actifs</div>
                <div className="text-2xl text-kcg-red">14</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-kcg-red/5 blur-[100px] pointer-events-none" />
            <div className="kcg-glass bg-[#050505]/90 border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden backdrop-blur-2xl h-full min-h-[500px] flex flex-col font-mono">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="text-[10px] uppercase text-white/50 tracking-widest flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  KCG OS v2.4.1
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-kcg-red animate-pulse" />
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-hidden relative">
                <div className="text-[10px] text-green-500 uppercase tracking-widest mb-4">Live Monitoring</div>
                {[
                  { label: "UEMOA LOGISTICS PIPELINE", val: "ACTIVE", load: 88, alert: false },
                  { label: "CFA/EUR VOLATILITY IDX", val: "NOMINAL", load: 12, alert: false },
                  { label: "TECH TALENT ACQUISITION", val: "HIGH DEMAND", load: 94, alert: true },
                  { label: "AGRO-SUPPLY CHAIN (CI)", val: "ROUTING", load: 67, alert: false },
                ].map((syst, i) => (
                  <div key={i} className="flex flex-col gap-2 p-3 bg-black/50 border border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">{syst.label}</span>
                      <span className={syst.alert ? "text-kcg-red" : "text-white"}>{syst.val}</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/10 bg-black/50">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${syst.load}%` }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                        className={`h-full ${syst.alert ? 'bg-kcg-red animate-pulse' : 'bg-white/40'}`} 
                      />
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10 mt-auto bg-black border border-kcg-red/20 shadow-[0_0_20px_rgba(200,16,46,0.1)]">
                  <div className="text-[10px] text-kcg-red uppercase animate-pulse mb-1">Alert: Market Anomaly Detected</div>
                  <div className="text-xs text-white/80">Asymmetry potential in Fintech sub-sector (Senegal). Probability: 84%.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SovereignIndexes() {
  const indexes = [
    { name: "KCG Agri-Tech Yield", value: "1,240.50", change: "+14.2%", up: true, desc: "Rendement combiné des actifs agro-industriels modernisés par IA." },
    { name: "West Africa Infrastructure", value: "845.20", change: "+2.1%", up: true, desc: "Capacité logistique et énergétique régionale sous gestion." },
    { name: "Sovereign AI Adoption", value: "3,110.80", change: "-1.5%", up: false, desc: "Pénétration des modèles d'IA locaux vs importés." },
    { name: "Fintech Velocity (UEMOA)", value: "4,420.10", change: "+28.4%", up: true, desc: "Volume de transactions cross-border hors systèmes Swift." },
  ];

  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Algorithmic Tracking</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Sovereign <span className="italic font-serif text-white/50">Indexes.</span></h2>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest bg-black p-3 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Data Feed
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {indexes.map((idx, i) => (
            <div key={i} className="kcg-glass border border-white/10 p-8 hover:border-white/30 transition-colors bg-black flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-6">{idx.name}</div>
                <div className="text-4xl font-medium tracking-tighter mb-4 text-white flex items-end gap-3">
                  {idx.value}
                </div>
                <div className={`text-xs font-mono mb-8 flex items-center gap-2 ${idx.up ? 'text-green-500' : 'text-kcg-red'}`}>
                  {idx.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {idx.change} (YTD)
                </div>
              </div>
              
              <div className="text-xs text-white/30 leading-relaxed pt-6 border-t border-white/5">
                {idx.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchTerminal() {
  const reports = [
    { title: "La Nouvelle Architecture Logistique Africaine", category: "Macro-Infrastructure", date: "Sept 2026", locked: false },
    { title: "Deep-Dive: Anomalies de Valorisation UEMOA", category: "Private Equity", date: "Aug 2026", locked: true },
    { title: "L'Asymétrie des Paiements B2B", category: "Fintech Venture", date: "Jul 2026", locked: false },
    { title: "Souveraineté Énergétique et IA", category: "Strategic Foresight", date: "Jun 2026", locked: true },
  ];

  return (
    <section className="py-40 relative z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-screen" />
      <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
        <div className="max-w-3xl mb-20">
          <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Deep Knowledge</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">Research <span className="italic font-serif text-white/50">Papers.</span></h2>
          <p className="text-lg text-white/40 leading-relaxed font-light">
            Nos rapports de recherche ne documentent pas le passé, ils écrivent la thèse d'acquisition de demain. Accès public partiel, accès intégral réservé aux partenaires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reports.map((report, i) => (
            <div key={i} className="group relative border border-white/10 p-10 bg-[#050505] hover:bg-white/[0.02] transition-colors cursor-pointer flex flex-col justify-between min-h-[320px]">
              {report.locked && (
                <div className="absolute top-6 right-6">
                  <Lock className="w-4 h-4 text-white/20" />
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest uppercase mb-8">
                  <span className="text-kcg-red">{report.category}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-white/40">{report.date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-medium leading-tight group-hover:text-kcg-red transition-colors w-11/12">{report.title}</h3>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                  {report.locked ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  <span>{report.locked ? "Accès Restreint" : "Télécharger PDF"}</span>
                </div>
                {!report.locked && <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaEngine() {
  const { playLetter, isPlayerVisible } = usePodcastStore();

  return (
    <section className="py-40 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Media Infrastructure</div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              KCG <span className="italic font-serif text-white/50">Broadcasting.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-16">
              Le pouvoir institutionnel s'exerce aussi par la narration intellectuelle. Retrouvez les mémos stratégiques audio et les lettres aux investisseurs du CEO, Paul Koffmann.
            </p>

            <div className="space-y-4">
              {LETTERS.slice(0, 3).map((letter, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-6 bg-black border border-white/5 hover:border-white/20 transition-colors group cursor-pointer"
                  onClick={() => playLetter(letter)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#050505] group-hover:border-kcg-red/50 group-hover:bg-kcg-red/10 transition-colors">
                      <Radio className="w-4 h-4 text-white group-hover:text-kcg-red" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{letter.date}</div>
                      <div className="font-medium text-white group-hover:text-kcg-red transition-colors">{letter.title}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] hidden md:block">
                    Écouter 
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=3173&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale" />
            <div className="absolute inset-0 bg-kcg-red/5 mix-blend-screen" />
            
            <div className="relative z-10 w-full max-w-sm kcg-glass p-8 border border-white/10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Radio className="w-8 h-8 text-kcg-red animate-pulse" />
              </div>
              <h3 className="text-xl font-medium mb-4">Radio Stratégique KCG</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">Abonnez-vous aux flux audio pour recevoir en temps réel les analyses souveraines et les directives macro-économiques.</p>
              
              <button 
                onClick={() => {
                  if(!isPlayerVisible) playLetter(LETTERS[0]);
                  else usePodcastStore.getState().setIsExpanded(true);
                }}
                className="w-full py-4 bg-kcg-red text-white text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-colors"
               >
                Lancer le signal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
