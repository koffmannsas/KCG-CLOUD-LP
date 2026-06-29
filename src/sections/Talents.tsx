import { motion } from 'motion/react';
import { Users, Lightbulb, Ship, ArrowRight } from 'lucide-react';

export default function Talents() {
  const perks = [
    {
      icon: Lightbulb,
      title: "Impact Radical",
      desc: "Participez à des projets qui transforment concrètement les infrastructures d'un continent entier."
    },
    {
      icon: Users,
      title: "Écosystème d'Élite",
      desc: "Collaborez avec les meilleurs ingénieurs, designers et stratèges d'Afrique et du monde."
    },
    {
      icon: Ship,
      title: "Culture de l'Excellence",
      desc: "Une culture basée sur la performance, l'autonomie et l'innovation constante."
    }
  ];

  return (
    <section id="talents" className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-kcg-red font-black italic">TALENTIUM™ PROGRAM</h2>
              <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight uppercase tracking-tighter">
                Infrastructure <br />
                <span className="text-kcg-red">Humaine Souveraine.</span>
              </h3>
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-xl italic">
                “KOFFMANN CAPITAL GROUP ne recrute pas. Nous identifions les architectes capables de transformer l'ambition africaine en réalité infrastructurelle.”
              </p>
            </motion.div>

            <div className="grid gap-6">
              {perks.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-8 kcg-card border-white/5 hover:border-kcg-red/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl kcg-glass bg-white/[0.02] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-kcg-red/10 transition-all">
                    <perk.icon className="w-6 h-6 text-kcg-red" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-display font-medium uppercase tracking-tight">{perk.title}</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed italic">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <button 
                onClick={() => window.location.hash = '#talents-portal'}
                className="kcg-btn-primary px-12 py-6 rounded-full group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-black"
              >
                Accéder au Programme de Détection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <div className="relative">
            <div className="aspect-square kcg-card overflow-hidden relative group rounded-[48px] border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Working at KCG" 
                className="w-full h-full object-cover grayscale brightness-50 opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center p-12 space-y-4">
                    <div className="inline-block px-4 py-1 rounded-full kcg-glass border-white/10 text-[10px] uppercase tracking-widest text-kcg-red font-black mb-4">
                      Élite Technologique Souveraine
                    </div>
                    <h4 className="text-3xl font-display font-medium uppercase tracking-tight">Bâtissez le Futur.</h4>
                    <p className="text-white/40 text-sm max-w-xs mx-auto italic">
                      Notre environnement est conçu pour ceux qui exigent l'excellence d'eux-mêmes et de leurs pairs.
                    </p>
                 </div>
              </div>
            </div>

            {/* Backdrop Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-kcg-red/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
