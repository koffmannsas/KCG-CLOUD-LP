import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, TrendingUp, Target, Building2, MapPin, ShieldCheck, FileText, Play, Radio, ArrowUpRight, BarChart3, Fingerprint, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';

export default function VenturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative overflow-hidden pt-24 font-sans selection:bg-kcg-red selection:text-white">
      {/* Structural Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-kcg-red/5 rounded-full blur-[200px] translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[100vw] h-[100vw] bg-white/[0.02] rounded-full blur-[250px] -translate-x-1/2 translate-y-1/3" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      </div>

      <HeroSection />
      <WhatWeBelieveSection />
      <OriginStorySection />
      <LiveEconomicSystem />
      <BarbellStrategySection />
      <PocketsSection />
      <ExecutionEngineSection />
      <AfricaMapSection />
      <DataIntelligenceSection />
      <InstitutionalTrustSection />
      <PortfolioSection />
      <Africa2035Section />
      <CeoLettersSection />
      <ResearchReportsSection />
      <StatsSection />
      <ManifestoSection />
      <PrivateAccessSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 z-10 px-6">
      {/* Background terminal/data effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20" style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent)' }}>
        <div className="absolute top-[20%] right-[10%] text-[8px] font-mono text-kcg-red/80 flex flex-col items-end gap-1">
          {Array.from({length: 20}).map((_, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: [0, 1, 0], x: [20, 0, -20] }}
               transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
             >
               {`0x${Math.random().toString(16).slice(2, 10).toUpperCase()} : VOL_${Math.floor(Math.random() * 1000)}M`}
             </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-[90rem] relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] w-16 bg-kcg-red origin-left" 
            />
            <span className="text-kcg-red font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">Koffmann Venture</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-medium tracking-tighter leading-[1.05] mb-8">
            NOUS RESTRUCTURONS LE PRÉSENT.<br />
            <span className="text-white/30 italic font-serif">NOUS FINANÇONS LE FUTUR.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-12">
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
              Koffmann Venture fusionne l'ingénierie financière du Private Equity et la vélocité du Venture Capital pour construire la prochaine génération d'infrastructures économiques africaines.
            </p>
            <div className="flex flex-col gap-4 font-mono text-xs text-white/40 border-l border-white/10 pl-6">
              <div className="flex justify-between">
                <span>FOCUS ZONE</span>
                <span className="text-white">AFRIQUE DE L'OUEST (UEMOA)</span>
              </div>
              <div className="flex justify-between">
                <span>AUM ESTIMÉ (2026)</span>
                <span className="text-kcg-red">€2.4B</span>
              </div>
              <div className="flex justify-between">
                <span>SECTEURS</span>
                <span className="text-white text-right">AGRO / INFRA / AI / FINTECH</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-8">
            <button className="kcg-btn group px-10 py-5 bg-white text-black hover:bg-white/90">
              <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-xs">Entrer dans l'Écosystème</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="text-white/50 hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold transition-all flex items-center gap-3 group relative overflow-hidden">
              <span className="relative z-10">Investor Relations</span>
              <Lock className="w-3 h-3 relative z-10 group-hover:text-kcg-red transition-colors" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-kcg-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        </motion.div>

        {/* Massive Data Widgets - Desktop Only */}
        <div className="absolute right-0 top-[20%] hidden xl:flex flex-col gap-8 w-[320px]">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="kcg-glass p-8 border border-white/5 relative overflow-hidden backdrop-blur-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-kcg-red/10 blur-[40px]" />
            <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] mb-4">Capital Déployé</div>
            <div className="text-5xl font-medium tracking-tighter text-white mb-2">€840<span className="text-2xl text-white/40">M</span></div>
            <div className="flex items-center gap-2 text-green-500/80 text-[10px] uppercase font-mono tracking-widest mt-4">
              <TrendingUp className="w-3 h-3" />
              <span>Target Q4 2026: €1.2B</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="kcg-glass p-8 border border-white/5 backdrop-blur-2xl"
          >
            <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] mb-4">Rendement Interne (IRR)</div>
            <div className="text-4xl font-mono text-white mb-1">24.8%</div>
            <div className="w-full h-[2px] bg-white/10 mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-kcg-red"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatWeBelieveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="py-40 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
             <div className="sticky top-40">
               <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Investment Thesis</div>
               <h2 className="text-4xl font-medium tracking-tight">What We<br /><span className="text-white/40 italic font-serif">Believe.</span></h2>
             </div>
          </div>
          <div className="md:w-2/3 space-y-32">
            {[
               {
                 title: "L'Afrique ne manque pas de talents. Elle manque d'infrastructures financières.",
                 desc: "L'innovation sans capital structurel est stérile. Nous construisons les pipelines financiers qui transforment l'ingéniosité brute en domination de marché."
               },
               {
                 title: "Le risque moyen est une illusion dangereuse.",
                 desc: "Nous rejetons la médiocrité des rendements moyens. Nous cherchons l'asymétrie totale : la sécurité absolue des actifs tangibles, et le risque exponentiel de la disruption technologique."
               },
               {
                 title: "La souveraineté technologique est le nouveau patriotisme.",
                 desc: "Posséder nos données, nos intelligences artificielles et nos infrastructures logistiques n'est plus une option de croissance, c'est un impératif de survie régionale."
               }
            ].map((belief, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: i * 0.3 }}
                className="max-w-2xl"
              >
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-tight mb-6">{belief.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">{belief.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveEconomicSystem() {
  return (
    <section className="py-40 relative z-10 bg-black overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-screen" />
      
      <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
        <div className="text-center mb-32">
          <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Moteur Économique</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Le Système de<br /><span className="text-white/40 italic font-serif">Recyclage du Capital.</span></h2>
        </div>

        {/* Animated System Flow */}
        <div className="relative max-w-5xl mx-auto h-[600px] hidden md:block">
          {/* Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
             {/* Background Path */}
             <path d="M 200,100 L 800,100 L 800,300 L 500,300 L 500,500 L 200,500 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
             
             {/* Glowing Data/Power Cable */}
             <motion.path 
                d="M 200,100 L 800,100 L 800,300 L 500,300 L 500,500 L 200,500 Z" 
                fill="none" 
                stroke="#C8102E" 
                strokeWidth="2" 
                strokeDasharray="4 8" 
                animate={{ strokeDashoffset: [120, 0] }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
             />
             
             {/* Pulse overlay to look like current */}
             <motion.path 
                d="M 200,100 L 800,100 L 800,300 L 500,300 L 500,500 L 200,500 Z" 
                fill="none" 
                stroke="#C8102E" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="20 400" 
                animate={{ strokeDashoffset: [420, 0] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                style={{ filter: "drop-shadow(0 0 8px #C8102E)" }}
             />

             {/* Inner connection lines */}
             <path d="M 200,500 L 200,300 L 500,300 L 500,100 L 800,100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
             <motion.path 
                d="M 200,500 L 200,300 L 500,300 L 500,100 L 800,100" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1" 
                strokeDasharray="2 6" 
                animate={{ strokeDashoffset: [80, 0] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
             />
             
             {/* Nodes dots */}
             <circle cx="200" cy="100" r="4" fill="#fff" />
             <circle cx="800" cy="100" r="4" fill="#fff" />
             <circle cx="800" cy="300" r="4" fill="#fff" />
             <circle cx="500" cy="500" r="4" fill="#fff" />
             <circle cx="200" cy="500" r="4" fill="#fff" />
             
             {/* Glowing hot spots at nodes */}
             <motion.circle cx="200" cy="100" r="8" fill="none" stroke="#C8102E" animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
             <motion.circle cx="800" cy="100" r="8" fill="none" stroke="#C8102E" animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} />
             <motion.circle cx="800" cy="300" r="8" fill="none" stroke="#C8102E" animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, delay: 0.8, repeat: Infinity }} />
             <motion.circle cx="500" cy="500" r="8" fill="none" stroke="#C8102E" animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, delay: 1.2, repeat: Infinity }} />
             <motion.circle cx="200" cy="500" r="8" fill="none" stroke="#C8102E" animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, delay: 1.6, repeat: Infinity }} />
          </svg>

          {/* Nodes */}
          <div className="absolute top-[100px] left-[200px] -translate-x-1/2 -translate-y-1/2 kcg-glass p-6 w-64 border border-white/10 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Poche PE</div>
            <div className="text-xl font-medium">Cash-Flow Sécurisé</div>
            <div className="mt-4 text-[10px] font-mono text-green-400">+ €45M IRR ANNUEL</div>
          </div>

          <div className="absolute top-[100px] left-[800px] -translate-x-1/2 -translate-y-1/2 kcg-glass p-6 w-64 border border-kcg-red/30 bg-kcg-red/5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-kcg-red mb-2">Poche VC</div>
            <div className="text-xl font-medium">Financement Innovation</div>
            <div className="mt-4 text-[10px] font-mono text-white/40">RISQUE FINANCÉ PAR LE PE</div>
          </div>

          <div className="absolute top-[300px] left-[800px] -translate-x-1/2 -translate-y-1/2 kcg-glass p-6 w-64 border border-white/10 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Marché</div>
            <div className="text-xl font-medium">Domination Régionale</div>
            <div className="mt-4 text-[10px] font-mono text-white/40">MONOPOLES TECHNOLOGIQUES</div>
          </div>

          <div className="absolute top-[500px] left-[500px] -translate-x-1/2 -translate-y-1/2 kcg-glass p-6 w-64 border border-white/10 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Holding</div>
            <div className="text-xl font-medium">Augmentation Actifs</div>
            <div className="mt-4 text-[10px] font-mono text-white/40">VALORISATION GROUPE</div>
          </div>

          <div className="absolute top-[500px] left-[200px] -translate-x-1/2 -translate-y-1/2 kcg-glass p-6 w-64 border border-white/10 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Trésorerie</div>
            <div className="text-xl font-medium">Recyclage Capital</div>
            <div className="mt-4 text-[10px] font-mono text-kcg-red">NOUVELLES ACQUISITIONS</div>
          </div>
        </div>

        {/* Mobile fallback for flow */}
        <div className="md:hidden space-y-4">
          {["Cash-Flow Sécurisé (PE)", "Financement Innovation (VC)", "Domination Régionale", "Augmentation Actifs", "Recyclage Capital"].map((step, i) => (
             <div key={i} className="kcg-glass p-6 border border-white/10">
               <div className="text-kcg-red font-mono text-xs mb-2">0{i+1}</div>
               <div className="font-medium text-lg">{step}</div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BarbellStrategySection() {
  return (
    <section className="py-40 relative z-10">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[700px] border border-white/10 bg-black/40">
          
          <div className="flex-1 p-12 lg:p-24 relative flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 font-bold">Concept Central</div>
            <h2 className="text-5xl lg:text-[4rem] font-medium leading-[1.1] tracking-tighter mb-8">Stratégie<br /><span className="italic font-serif text-white/50">Barbell.</span></h2>
            <p className="text-white/40 leading-relaxed max-w-md mb-16 text-lg">
              Nous fuyons le centre. 80% de notre capital est scellé dans des actifs extrêmement sécurisés. 20% est déployé dans des paris technologiques à potentiel de rendement infini.
            </p>

            <div className="space-y-10 max-w-md">
              <div>
                <div className="flex justify-between font-mono text-xs text-white mb-4">
                  <span>Protection du Capital (PE)</span>
                  <span>80%</span>
                </div>
                <div className="h-[2px] bg-white/5 w-full overflow-hidden">
                  <div className="h-full bg-white/30 w-[80%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-xs text-kcg-red mb-4">
                  <span>Performance Agressive (VC)</span>
                  <span>20%</span>
                </div>
                <div className="h-[2px] bg-white/5 w-full overflow-hidden">
                  <div className="h-full bg-kcg-red w-[20%] shadow-[0_0_10px_#C8102E]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative bg-[#050505] overflow-hidden flex items-center justify-center p-12">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
             
             {/* Abstract Barbell Graphic */}
             <div className="relative z-10 w-full max-w-lg aspect-square border border-white/5 flex items-center justify-center rounded-full p-12">
               <div className="w-full h-full rounded-full border border-kcg-red/20 flex items-center justify-center animate-[spin_120s_linear_infinite] relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex flex-col items-center justify-center transform -rotate-0">
                    <Building2 className="w-6 h-6 text-white/50 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/50">Base</span>
                 </div>
                 
                 <div className="w-2 h-full bg-gradient-to-b from-white/10 via-kcg-red/20 to-kcg-red/50" />

                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 bg-kcg-red/10 backdrop-blur-xl border border-kcg-red/30 rounded-full flex flex-col items-center justify-center transform -rotate-0">
                    <Target className="w-6 h-6 text-kcg-red mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-kcg-red">Alpha</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PocketsSection() {
  return (
    <section className="py-40 relative z-10">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="group">
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Moteur de Cash-Flow</div>
            <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">
              Poche <span className="italic font-serif">Renaissance.</span>
            </h2>
            <div className="kcg-glass p-12 lg:p-16 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 bg-[#050505]">
              <p className="text-white/50 mb-12 leading-relaxed text-lg">
                Acquérir des actifs décotés ou mal gérés. Injecter des processus de management brutaux et efficients. Restaurer la rentabilité en 24 mois. Générer un cash-flow massif pour financer l'innovation.
              </p>
              
              <div className="space-y-6 font-mono text-xs border-t border-white/10 pt-8 mt-8">
                <div className="flex justify-between text-white/40">
                  <span>CLASSE D'ACTIFS</span>
                  <span className="text-white">PRIVATE EQUITY (LBO, MBO)</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>SECTEURS</span>
                  <span className="text-white">AGRO / BTP / LOGISTIQUE</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>HORIZON</span>
                  <span className="text-white">5 À 7 ANS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group mt-20 md:mt-0">
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Moteur d'Alpha</div>
            <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">
              Poche <span className="italic font-serif text-kcg-red">Horizon.</span>
            </h2>
            <div className="kcg-glass p-12 lg:p-16 border border-kcg-red/20 hover:border-kcg-red/40 transition-all duration-500 hover:-translate-y-2 bg-kcg-red/[0.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-kcg-red/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <p className="text-white/60 mb-12 leading-relaxed text-lg">
                  Identifier les anomalies technologiques. Financer les équipes capables de construire des monopoles régionaux. Accepter le risque d'échec pour obtenir des asymétries de x10 à x100.
                </p>
                
                <div className="space-y-6 font-mono text-xs border-t border-kcg-red/20 pt-8 mt-8">
                  <div className="flex justify-between text-white/40">
                    <span>CLASSE D'ACTIFS</span>
                    <span className="text-kcg-red">VENTURE CAPITAL (SEED, SERIES A)</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>SECTEURS</span>
                    <span className="text-white">FINTECH / AI / SAAS B2B</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>TRI CIBLE</span>
                    <span className="text-white">&gt; 35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AfricaMapSection() {
  return (
    <section className="py-40 relative z-10 border-y border-white/5 bg-black overflow-hidden">
       {/* Background Map Graphic */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[60vw] h-[100vh] opacity-20 pointer-events-none flex items-center">
          <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-white/20 fill-none" strokeWidth="1">
             {/* Extremely abstract complex map contours */}
             <path d="M 200,400 Q 300,200 600,300 T 800,600 Q 700,800 400,700 T 200,400 Z" strokeWidth="0.5" />
             <path d="M 300,500 Q 400,400 600,450 T 700,600 Q 500,650 300,500 Z" stroke="rgba(200,16,46,0.3)" />
             
             {/* Interactive Corridors */}
             <path d="M 350,450 Q 500,400 650,550" stroke="#C8102E" strokeWidth="2" strokeDasharray="5 5" className="animate-[dash_10s_linear_infinite]" />
             <path d="M 400,600 Q 500,500 700,500" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3 3" />
             
             {/* Hubs */}
             <circle cx="350" cy="450" r="8" fill="#C8102E" className="animate-pulse" />
             <circle cx="650" cy="550" r="6" fill="#fff" />
             <circle cx="400" cy="600" r="5" fill="#fff" />
             <circle cx="700" cy="500" r="4" fill="#C8102E" />
          </svg>
       </div>

       <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
         <div className="max-w-2xl">
           <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">West African Theater</div>
           <h2 className="text-5xl md:text-7xl font-medium mb-12 tracking-tighter">
             Focus<br />
             <span className="italic font-serif text-white/50">Régional.</span>
           </h2>
           <p className="text-white/50 text-xl leading-relaxed mb-16 font-light">
             Nous opérons là où la croissance démographique rencontre la fracture d'infrastructure. La zone UEMOA et le Nigéria représentent notre théâtre d'opérations principal : 400 millions de consommateurs, une monnaie commune (CFA), et le marché tech le plus agressif du continent.
           </p>

           <div className="grid grid-cols-2 gap-12 font-mono text-sm border-t border-white/10 pt-12">
             <div>
               <div className="text-4xl lg:text-5xl text-white mb-4">15+</div>
               <div className="text-white/40 uppercase tracking-widest text-[10px]">Pays cibles (Focus CFA)</div>
             </div>
             <div>
               <div className="text-4xl lg:text-5xl text-kcg-red mb-4">400M</div>
               <div className="text-white/40 uppercase tracking-widest text-[10px]">Marché adressable</div>
             </div>
           </div>
         </div>
       </div>
    </section>
  );
}

function InstitutionalTrustSection() {
  return (
    <section className="py-40 relative z-10">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Institutional Grade</div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">Gouvernance & <span className="italic font-serif text-white/50">Discipline.</span></h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Nous gérons le capital avec la rigueur d'un fonds souverain et l'agilité d'un family office de premier plan. L'atténuation du risque prime sur la promesse de rendement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Investment Committee", desc: "Décisions collégiales avec veto unanime requis. Séparation stricte entre les équipes d'origination et le comité de risque." },
            { icon: Fingerprint, title: "Due Diligence Extrême", desc: "Audit forensique, évaluation ESG, et stress test des business models avant tout déploiement de capitaux." },
            { icon: BarChart3, title: "Reporting Transparent", desc: "Reporting trimestriel selon les standards internationaux. Valorisation indépendante de nos actifs liquides et illiquides." }
          ].map((item, i) => (
            <div key={i} className="p-10 border border-white/5 bg-[#050505] hover:bg-white/[0.02] transition-colors">
              <item.icon className="w-8 h-8 text-kcg-red mb-8" strokeWidth={1} />
              <h3 className="text-xl font-medium mb-4">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const portfolio = [
    { name: 'AfriLogis', sector: 'Infrastructures', type: 'PE', val: '€120M', arr: '€45M', ebitda: '+18%', status: 'Restructuré' },
    { name: 'PayCFA', sector: 'Fintech / Pay', type: 'VC', val: '€18M', arr: '€2.4M', ebitda: 'N/A', status: 'Scale' },
    { name: 'AgroWest Holdings', sector: 'Agro-Industrie', type: 'PE', val: '€450M', arr: '€95M', ebitda: '+12%', status: 'Cash-Cow' },
    { name: 'DataCenter CI', sector: 'Infrastructure Tech', type: 'VC', val: '€45M', arr: '€8.5M', ebitda: '+25%', status: 'Expansion' },
    { name: 'Koffmann Energy', sector: 'Énergie', type: 'PE', val: 'Undisc.', arr: '-', ebitda: '-', status: 'Acquisition' },
  ];

  return (
    <section className="py-40 relative z-10 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Live Assets</div>
            <h2 className="text-4xl md:text-5xl font-medium">Extraits du <span className="italic font-serif text-white/50">Portfolio.</span></h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] font-mono border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-colors">
            Accéder à l'Investor Room
          </button>
        </div>

        <div className="overflow-x-auto pb-8 scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[9px] uppercase tracking-[0.2em] text-white/30 border-b border-white/10">
                <th className="pb-6 font-mono px-4">Entité</th>
                <th className="pb-6 font-mono px-4">Secteur</th>
                <th className="pb-6 font-mono px-4">Stratégie</th>
                <th className="pb-6 font-mono px-4 text-right">Valorisation</th>
                <th className="pb-6 font-mono px-4 text-right">Chiffre d'Affaires</th>
                <th className="pb-6 font-mono px-4 text-right">Marge / EBITDA</th>
                <th className="pb-6 font-mono px-4 text-right">Statut</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="py-8 px-4 font-medium text-lg flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", item.type === 'PE' ? "bg-white/40" : "bg-kcg-red")} />
                    {item.name}
                  </td>
                  <td className="py-8 px-4 text-white/50 text-sm">{item.sector}</td>
                  <td className="py-8 px-4">
                    <span className={cn(
                      "px-3 py-1 text-[9px] uppercase tracking-widest font-mono rounded-full border",
                      item.type === 'PE' ? "border-white/10 text-white/70" : "border-kcg-red/30 text-kcg-red bg-kcg-red/5"
                    )}>
                      {item.type === 'PE' ? 'BUYOUT (PE)' : 'GROWTH (VC)'}
                    </span>
                  </td>
                  <td className="py-8 px-4 text-right font-mono text-sm">{item.val}</td>
                  <td className="py-8 px-4 text-right font-mono text-sm text-white/60">{item.arr}</td>
                  <td className="py-8 px-4 text-right font-mono text-sm text-green-500/80">{item.ebitda}</td>
                  <td className="py-8 px-4 text-right">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CeoLettersSection() {
  const { playLetter, isPlayerVisible } = usePodcastStore();
  const latestLetter = LETTERS[0]; // Assuming letter 0 is the most recent

  return (
    <section className="py-40 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
             <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Strategic Intelligence</div>
             <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
               Les Lettres aux<br />
               <span className="italic font-serif text-white/50">Investisseurs.</span>
             </h2>
             <p className="text-white/40 text-lg leading-relaxed mb-12">
               La pensée précède l'action. Régulièrement, Paul Koffmann publie des mémos stratégiques détaillant nos analyses macro-économiques, nos thèses d'investissement et notre vision de l'architecture financière africaine.
             </p>
             
             <button 
               onClick={() => {
                 if (!isPlayerVisible) {
                   playLetter(latestLetter);
                 } else {
                   usePodcastStore.getState().setIsExpanded(true);
                 }
               }}
               className="group flex items-center gap-6 p-6 border border-white/10 bg-black hover:border-kcg-red/30 hover:bg-kcg-red/5 transition-all w-full max-w-md"
             >
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:border-kcg-red/30 transition-colors">
                 <Radio className="w-6 h-6 text-white group-hover:text-kcg-red transition-colors animate-pulse" />
               </div>
               <div className="text-left">
                 <div className="text-white/50 text-[10px] uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                   <span>Écouter le dernier mémo</span>
                   <div className="w-1 h-1 bg-kcg-red rounded-full animate-ping" />
                 </div>
                 <div className="font-medium text-white group-hover:text-kcg-red transition-colors truncate w-full">
                   {latestLetter.title}
                 </div>
               </div>
             </button>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-kcg-red/10 blur-[100px] z-0" />
             <div className="relative z-10 kcg-glass p-12 border border-white/10 aspect-[4/5] flex flex-col justify-between">
                <div>
                   <FileText className="w-8 h-8 text-white/20 mb-8" />
                   <h3 className="text-2xl font-serif italic text-white/80 mb-6">"{latestLetter.content.substring(0, 150)}..."</h3>
                </div>
                <div>
                   <div className="w-12 h-[1px] bg-white/20 mb-6" />
                   <div className="text-xs font-mono uppercase tracking-widest text-white/50">Extrait — Lettre {latestLetter.date}</div>
                   <div className="mt-2 text-[10px] font-mono text-kcg-red uppercase tracking-[0.2em] flex items-center gap-2">
                     Lire le script complet <ArrowRight className="w-3 h-3" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-32 relative z-10 border-y border-white/5 bg-kcg-red overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-multiply" />
      <div className="container mx-auto px-6 max-w-[90rem] relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center divide-x divide-white/20">
        {[
          { label: "Assets Under Management", val: "€2.4B", sub: "Estimation 2026" },
          { label: "Rendement VC (IRR)", val: "38%", sub: "Top Quartile" },
          { label: "Entreprises PE", val: "14", sub: "Cash-flow positif" },
          { label: "Talents Déployés", val: "+12K", sub: "Emplois directs" }
        ].map((stat, i) => (
          <div key={i} className="pl-8 first:pl-0 border-white/20 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-widest text-white/60 mb-4 font-mono">{stat.label}</div>
            <div className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-2">{stat.val}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-52 relative z-10 text-center px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium leading-[1.1] tracking-tighter mb-16">
          "Le risque n'est pas de construire.<br />
          <span className="text-white/40 italic font-serif">Le risque est de regarder les autres construire l'infrastructure de l'Afrique à notre place."</span>
        </h2>
        
        <div className="w-[1px] h-24 bg-kcg-red mx-auto mb-16" />
        <p className="text-white font-mono text-sm tracking-[0.2em] uppercase mb-2">Paul Koffmann</p>
        <p className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase">Chairman & CEO, Koffmann Capital Group</p>
      </div>
    </section>
  );
}

function OriginStorySection() {
  return (
    <section className="py-40 relative z-10 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="max-w-4xl">
          <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Genesis</div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">
            Pourquoi Koffmann<br /><span className="italic font-serif text-white/50">Existe.</span>
          </h2>
          
          <div className="space-y-8 text-lg text-white/50 leading-relaxed font-light">
            <p>
              Le modèle classique d'investissement et de développement en Afrique a atteint ses limites. Pendant des décennies, le continent a été structuré par des logiques d'extraction asymétrique ou d'aides inefficaces. Le résultat ? Une industrialisation fragmentée, de rares monopoles technologiques créateurs de valeur locale, et une dépendance endémique aux infrastructures importées.
            </p>
            <p>
              Koffmann Venture est né d'une rationalité mathématique impitoyable : la démographie africaine exige une <span className="text-white">vélocité d'industrialisation</span> que les marchés traditionnels ne peuvent plus financer à la marge. Il manquait un pont institutionnel. Un acteur hybride capable de restructurer froidement l'industrie lourde existante (Private Equity) tout en paramétrant le risque pour financer des asymétries technologiques radicales (Venture Capital).
            </p>
            <p className="text-white border-l-2 border-kcg-red pl-6 italic">
              "Nous ne sommes pas un fonds d'investissement conventionnel. Nous sommes des architectes de la souveraineté économique africaine."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExecutionEngineSection() {
  return (
    <section className="py-40 relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Operating Engine</div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">Comment Nous <span className="italic font-serif text-white/50">Opérons.</span></h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Nous ne concevons pas l'investissement comme une allocation passive. Nous déployons des unités opérationnelles propriétaires pour restructurer la cible, intégrer l'intelligence artificielle et systématiser la croissance régionale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          <div className="bg-[#050505] p-12 border border-white/5 hover:border-kcg-red/20 transition-all group">
            <Building2 className="w-8 h-8 text-kcg-red mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-medium mb-4">Transformation Teams</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">Des commandos opérationnels composés d'anciens dirigeants de l'industrie, déployés dans les 48h suivant toute acquisition pour prendre le contrôle exclusif des KPIs critiques et redéfinir la structure de coûts.</p>
            <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Restructuration PE</div>
          </div>
          <div className="bg-[#050505] p-12 border border-white/5 hover:border-kcg-red/20 transition-all group">
            <Target className="w-8 h-8 text-kcg-red mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-medium mb-4">Tech & AI Systems</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">Une unité d'ingénierie logicielle dédiée à l'injection de data pipelines et d'intelligence artificielle dans nos actifs legacy, créant des asymétries de processus impossibles à répliquer par la concurrence conventionnelle.</p>
            <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Digitalisation & IA</div>
          </div>
          <div className="bg-[#050505] p-12 border border-white/5 hover:border-kcg-red/20 transition-all group">
            <TrendingUp className="w-8 h-8 text-kcg-red mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-medium mb-4">Talent Networks</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">Un accès institutionnel permanent au Top 1% intellectuel et exécutif de la diaspora et des talents intra-africains, capablent de diriger nos thèses d'expansion régionales les plus agressives.</p>
            <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Human Capital</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataIntelligenceSection() {
  return (
    <section className="py-32 relative z-10 border-y border-white/5 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Signal Processing</div>
            <h2 className="text-3xl font-medium mb-6">Data Intelligence <span className="italic font-serif text-white/50">Unit.</span></h2>
            <p className="text-white/40 text-sm leading-relaxed">
              La conviction sans data n'est qu'une opinion. Nous exploitons des infrastructures de monitoring continu, scannant périodiquement des millions de points de données macro-économiques (corridors douaniers fluviaux, signaux satellitaires agricoles, flux télécoms de niveau 1) pour déceler les anomalies de valorisation avant que le marché institutionnel ne les qualifie.
            </p>
          </div>
          
          <div className="lg:w-2/3 w-full flex gap-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] shrink-0 border border-white/10 p-8 bg-black relative overflow-hidden group">
                <div className="absolute top-0 right-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <div className="absolute top-0 right-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                
                <div className="text-[9px] text-white/30 font-mono uppercase tracking-widest mb-6">Sys. Monitor 0{i}</div>
                <div className="text-xl font-mono text-white mb-2">{['WA-AGRI-IDX', 'CFA-TECH-FLOW', 'LOGISTICS-VOL'][i-1]}</div>
                <div className="text-green-500 text-xs font-mono mb-8 flex items-center gap-2">
                  <ArrowUpRight className="w-3 h-3" />
                  {['+4.2% (7D)', '+12.8% (MOM)', '+1.1% (24H)'][i-1]}
                </div>
                
                <div className="w-full h-16 flex items-end gap-[2px]">
                  {Array.from({length: 24}).map((_, j) => {
                    const h = 20 + Math.random() * 80;
                    return (
                      <div key={j} className="flex-1 bg-white/5" style={{ height: '100%' }}>
                        <div className="w-full bg-white/20 transition-all duration-1000 group-hover:bg-kcg-red/60" style={{ height: `${h}%` }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Africa2035Section() {
  return (
    <section className="py-52 relative z-10 bg-black text-center overflow-hidden">
      {/* Background massive coordinates grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mb-8">Temporal Dominance</div>
        <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter mb-12">
          Africa <span className="text-kcg-red italic font-serif">2035.</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light mb-16">
          Nous n'opérons pas à l'échelle du prochain trimestre boursier. Nous planifions et déployons le capital institutionnel en assumant l'architecture géopolitique et technologique du continent pour les 20 prochaines années.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
           <span className="px-5 py-3 border border-white/10 rounded-full hover:border-kcg-red transition-colors">Souveraineté Énergétique</span>
           <span className="px-5 py-3 border border-white/10 rounded-full hover:border-kcg-red transition-colors">SaaS Monopoles</span>
           <span className="px-5 py-3 border border-white/10 rounded-full hover:border-kcg-red transition-colors">Sécurité Alimentaire IA</span>
           <span className="px-5 py-3 border border-white/10 rounded-full hover:border-kcg-red transition-colors">Méga-Corridors Logistiques</span>
        </div>
      </div>
    </section>
  );
}

function ResearchReportsSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="text-kcg-red font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Macro & Micro Perspectives</div>
            <h2 className="text-3xl md:text-4xl font-medium">Research & <span className="italic font-serif text-white/50">Insights.</span></h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            Voir Toute La Recherche →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Transformation Systemique des Chaînes de Valeur Agricoles (UEMOA)", type: "PE Thesis", date: "Q3 2026" },
            { title: "L'Aube de l'Intelligence Artificielle Souveraine en Afrique de l'Ouest", type: "VC Thesis", date: "Q2 2026" },
            { title: "Koffmann Capital : Annual Macro-Economic Review & Projections", type: "Macro Report", date: "FY 2025" }
          ].map((report, i) => (
            <div key={i} className="group cursor-pointer border border-white/10 p-8 hover:bg-white/[0.03] transition-colors flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex justify-between items-start mb-8 text-[9px] font-mono tracking-[0.2em] uppercase">
                  <span className="text-kcg-red">{report.type}</span>
                  <span className="text-white/30">{report.date}</span>
                </div>
                <h3 className="text-xl font-medium leading-relaxed group-hover:text-kcg-red transition-colors pr-4">{report.title}</h3>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
                <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Download PDF</span>
                </div>
                <Lock className="w-3 h-3 text-white/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivateAccessSection() {
  return (
    <section className="py-40 relative z-10 border-t border-white/5 bg-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/[0.02] border border-white/10 rounded-full mb-8">
             <Lock className="w-6 h-6 text-white/40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">Private <span className="italic font-serif text-white/50">Access.</span></h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            L'Investor Room est une infrastructure strictly restreinte aux Limited Partners existants, aux institutions de régulation et aux fondateurs du portefeuille Tiers-1.
          </p>
        </div>

        <form className="space-y-8 p-12 md:p-16 border border-white/10 bg-[#050505] relative shadow-2xl">
          {/* Subtle light effect inside the form */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-kcg-red/5 blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Classification Requise</label>
                <select className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:border-kcg-red outline-none transition-colors appearance-none font-medium">
                  <option className="bg-black">Limited Partner (LP)</option>
                  <option className="bg-black">Institutional Sovereign Fund</option>
                  <option className="bg-black">Fondateur VC (Série A+)</option>
                  <option className="bg-black">Global Media & Intelligence</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Entité / Organisation</label>
                <input type="text" placeholder="Ex: BlackRock, Y Combinator..." className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/10 focus:border-kcg-red outline-none transition-colors font-medium" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Lead Executive Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:border-kcg-red outline-none transition-colors font-medium" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Official Corporate Email</label>
                <input type="email" placeholder="name@institution.com" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/10 focus:border-kcg-red outline-none transition-colors font-medium" />
              </div>
            </div>

            <div className="space-y-4 pt-6 mb-16">
              <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Abstract / Note Stratégique Confidentielle</label>
              <textarea rows={3} placeholder="Détaillez rigoureusement la nature de votre approche institutionnelle..." className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/10 focus:border-kcg-red outline-none transition-colors resize-none font-medium" />
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 text-white/20 text-[9px] font-mono uppercase tracking-[0.2em]">
                 <ShieldCheck className="w-5 h-5" />
                 <span>Canal 256-bit chiffré.<br />Audité périodiquement.</span>
              </div>
              <button type="button" className="kcg-btn py-5 px-10 border border-white bg-white text-black hover:bg-black hover:text-white transition-all w-full md:w-auto flex items-center justify-center gap-4 group">
                <span className="relative z-10 tracking-[0.2em] uppercase font-bold text-[10px]">Demander l'Accrédition</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
