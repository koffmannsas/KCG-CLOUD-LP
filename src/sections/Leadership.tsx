import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="py-32 relative bg-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-[4/5] rounded-[48px] overflow-hidden kcg-card border-white/5 relative">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/WA_1776694304070.jpeg?alt=media&token=1111eb29-141f-4c1b-8fef-a6047d09e0f3" 
                alt="Paul Koffmann" 
                className="w-full h-full object-cover object-[center_10%] grayscale brightness-50 contrast-125 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 space-y-3">
                <p className="text-4xl font-display font-medium uppercase tracking-tighter text-white">Paul Koffmann</p>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-kcg-red shadow-[0_0_8px_#C8102E] animate-pulse" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-kcg-red font-black">Fondateur & Président Souverain</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center opacity-10 rotate-[-15deg]">
              <div className="w-40 h-40 border border-kcg-red/20 rounded-full" />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-kcg-red font-black italic">Le Visionnaire Architecte</h2>
              <div className="relative">
                <Quote className="absolute -top-12 -left-12 w-16 h-16 text-kcg-red/10" />
                <p className="text-2xl md:text-4xl font-display font-medium leading-snug uppercase tracking-tight text-white/90 italic">
                  "Le futur de l'Afrique ne sera pas importé. Il sera architecturé par ceux qui 
                  osent unifier des systèmes fragmentés en un seul empire intelligent de croissance."
                </p>
              </div>
            </motion.div>

            <div className="space-y-6 text-lg text-white/50 font-light leading-relaxed italic">
              <p>
                En tant qu'architecte d'écosystèmes d'affaires, Paul Koffmann a consacré sa 
                vie à démanteler les barrières qui freinent l'innovation africaine. 
                Son approche reflète une fusion entre une vision technologique profonde et 
                une expansion institutionnelle agressive.
              </p>
              <p>
                Sous sa direction, KOFFMANN CAPITAL GROUP est passé d'une série de 
                startups audacieuses à un moteur multisectoriel souverain, prouvant que lorsque 
                l'infrastructure rencontre l'intégrité, les résultats sont monumentaux.
              </p>
            </div>

            <a href="#about" className="kcg-btn-outline px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] inline-flex flex-col items-center gap-1 text-center">
              <span>CEO LETTER EXPERIENCE</span>
              <span className="font-sans normal-case text-white/50 tracking-widest text-[10px]">Lettres Stratégiques <br/> du Fondateur.</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
