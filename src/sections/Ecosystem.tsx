import { motion } from 'motion/react';
import { 
  Film, 
  TrendingUp, 
  Tv, 
  Layers, 
  Heart, 
  Activity, 
  Compass, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Building,
  Coins,
  Globe,
  Database
} from 'lucide-react';

interface Pillar {
  num: string;
  id: string;
  title: string;
  short: string;
  desc: string;
  mission: string;
  icon: any;
  brands: string[];
  metrics: { label: string; value: string };
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    id: "ddd",
    title: "DIVERTISSEMENT DIVERSIFIÉ",
    short: "DDD",
    desc: "Développer les activités de divertissement, médias et expériences d’immersion culturelle transnationale.",
    mission: "Saturer l'espace culturel panafricain d'audiovisuel d'élite et de récits souverains de rayonnement mondial.",
    icon: Film,
    brands: ["KCG Media™", "Hélix Prod", "Sovereign Wave"],
    metrics: { label: "IMPACT DES RÉCITS", value: "84M+ Spectateurs" }
  },
  {
    num: "02",
    id: "dpi",
    title: "PRODUITS D'INVESTISSEMENT",
    short: "DPI",
    desc: "Créer et coordonner les véhicules financiers transnationaux de co-investissement et de capital-risque.",
    mission: "Architecturer les véhicules financiers souverains de long terme pour catalyser la croissance industrielle.",
    icon: TrendingUp,
    brands: ["KCG Capital™", "Sovereign Yield™", "Bounty Assets"],
    metrics: { label: "CAPITAL COORDONNÉ", value: "3.84B $" }
  },
  {
    num: "03",
    id: "drn",
    title: "RESSOURCES NATURELLES",
    short: "DRN",
    desc: "Valoriser les ressources stratégiques nécessaires à la transformation économique durable du continent.",
    mission: "Exploiter, affiner et valoriser localement les métaux critiques de la transition technologique globale.",
    icon: Layers,
    brands: ["KCG Mining™", "Lithium Core Africa", "Hélix Energy"],
    metrics: { label: "REFINAGE LOCAL", value: "840K T/An" }
  },
  {
    num: "04",
    id: "dms",
    title: "MULTI SERVICES",
    short: "DMS",
    desc: "Fournir des services critiques et des corridors logistiques aux industries d’envergure continentale.",
    mission: "Bâtir les infrastructures d'acheminement, de conformité et de sécurité transactionnelle globale.",
    icon: Building,
    brands: ["Hélix Services™", "KCG Logistics", "Proxy Solutions"],
    metrics: { label: "EFFICACITÉ CORRIDOR", value: "99.87%" }
  },
  {
    num: "05",
    id: "dfc",
    title: "FONDATION DE CHARITÉ",
    short: "DFC",
    desc: "Développer l'impact social durable, l'éducation panafricaine d'excellence et l'accès à la santé.",
    mission: "Former l'élite de demain via des bourses d'excellence et pérenniser l'autodétermination communautaire.",
    icon: Heart,
    brands: ["KCG Foundation", "Sovereign Youth", "Élite Tech Africa"],
    metrics: { label: "BOURSES ATTRIBUÉES", value: "12,450 Récipiendaires" }
  }
];

export default function Ecosystem() {
  return (
    <section 
      id="ecosystem" 
      className="py-32 bg-[#020202] text-white overflow-hidden relative border-t border-b border-white/5 select-none font-sans"
    >
      {/* Carbon Ambient Layer */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[#000000] opacity-95 pointer-events-none" />
      
      {/* Super Subtle Micro-Grid Perspective Grid Lines for Premium Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Dynamic Red Linear Ambient Blur mimicking subtle high-end server backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-kcg-red/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-20 space-y-24">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-4xl space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-1 border border-white/10 rounded-full bg-white/[0.02]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-kcg-red animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 font-bold">
              KCG ECOSYSTEM ARCHITECTURE™
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-light text-white tracking-tighter uppercase leading-[0.95]"
          >
            Les fondations d'un <br />
            <span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-neutral-400">
              écosystème souverain.
            </span>
          </motion.h2>

          <div className="w-16 h-[2px] bg-kcg-red" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl"
          >
            Depuis sa création, KOFFMANN CAPITAL GROUP s'est structuré autour de cinq départements stratégiques. 
            Chaque département développe ses propres activités, ses propres marques et ses propres infrastructures 
            tout en participant à une vision commune : <strong className="text-white font-medium">Construire la souveraineté économique et industrielle de l'Afrique.</strong>
          </motion.p>
        </div>


        {/* ================= 5-COLUMN PILLARS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[560px] md:h-[620px] rounded-[24px] bg-[#050505] border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-kcg-red/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(200,16,46,0.08)]"
              >
                {/* Micro Red Radial Glow Backplate on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-kcg-red/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  {/* CARD INDICATIVE META (Index & Short name) */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-sm font-display font-extrabold text-kcg-red">
                      {pillar.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-bold group-hover:text-white transition-colors">
                      {pillar.short}
                    </span>
                  </div>

                  {/* HEADER CONTENT */}
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-xl border border-white/5 bg-[#0a0a0a] text-neutral-400 group-hover:text-kcg-red group-hover:border-kcg-red/25 transition-all duration-500">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-display font-bold uppercase tracking-tight text-white leading-tight">
                      {pillar.title}
                    </h4>
                  </div>

                  {/* PARAGRAPH DESCRIPTIONS */}
                  <div className="space-y-4">
                    <p className="text-neutral-400 text-xs font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                    <p className="text-[#a3a3a3] text-[11px] leading-relaxed italic border-l border-white/10 pl-3.5 font-light">
                      "{pillar.mission}"
                    </p>
                  </div>
                </div>

                {/* BOTTOM BRAND LISTING & METRICS AS ALADDIN TERMINAL */}
                <div className="space-y-6 relative z-10 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {pillar.brands.map((brand, bIdx) => (
                        <span 
                          key={bIdx} 
                          className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/[0.02] text-neutral-400 border border-white/[0.04]"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg">
                    <div className="text-left">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-wider">
                        {pillar.metrics.label}
                      </span>
                      <span className="block text-xs font-mono text-white font-extrabold mt-0.5">
                        {pillar.metrics.value}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-kcg-red transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* ================= HUGE INSTITUTIONAL LOWER BANNER ================= */}
        <div className="pt-12 border-t border-white/5 space-y-16">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Visual Title Left Pillar */}
            <div className="lg:col-span-4 space-y-2 select-none">
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white">
                Un Groupe.
              </h3>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white">
                Cinq départements.
              </h3>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-kcg-red italic">
                Une vision.
              </h3>
            </div>

            {/* Explanation Content Right Pillar */}
            <div className="lg:col-span-8">
              <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
                Nous ne construisons pas simplement des activités commerciales isolées. 
                Nous développons un <strong className="text-white font-medium">écosystème hautement intégré</strong> où le capital financier, les ressources minérales physiques stratégiques, les services, l'influence médiatique transnationale et l'impact sociologique direct convergent de manière symbiotique. C'est l'épine dorsale de notre expansion souveraine.
              </p>
            </div>
          </div>


          {/* ================= MASTER FINAL SIGN OFF ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-16 rounded-[28px] bg-gradient-to-b from-[#050505] to-[#010101] border border-white/5 overflow-hidden text-center"
          >
            {/* Glowing background halo of monumentality */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-kcg-red/5 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-4 px-6">
              <h4 className="text-3xl md:text-5xl font-display font-extrabold tracking-widest text-white leading-none uppercase">
                KOFFMANN CAPITAL GROUP
              </h4>
              <p className="text-xs uppercase tracking-[0.55em] text-kcg-red font-black">
                CONSTRUIRE AUJOURD'HUI LES INFRASTRUCTURES QUI FAÇONNERONT DEMAIN.
              </p>
              
              <div className="w-12 h-[1px] bg-white/20 mx-auto my-6" />

              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest leading-relaxed">
                KCG HOLDINGS LIMITED © 2026 • INSTITUTION SOUVERAINE TRATIONNALE
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
