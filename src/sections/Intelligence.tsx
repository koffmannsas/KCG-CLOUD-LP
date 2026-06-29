import { motion } from 'motion/react';
import { Zap, Activity, Database } from 'lucide-react';

export default function Intelligence() {
  return (
    <section id="intelligence" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative kcg-card p-1 items-center justify-center aspect-square overflow-hidden group border-white/5">
            {/* Animated Data Stream Simulation */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 grayscale brightness-50" />
            
            <div className="absolute inset-0">
               {Array.from({ length: 20 }).map((_, i) => (
                 <motion.div 
                    key={i}
                    className="absolute h-[1px] bg-kcg-red/40"
                    style={{ 
                      top: `${Math.random() * 100}%`,
                      left: i % 2 === 0 ? '-100%' : '100%',
                      width: '50%'
                    }}
                    animate={{ 
                      left: i % 2 === 0 ? '200%' : '-100%',
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 5
                    }}
                  />
               ))}
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-12 space-y-8">
              <div className="relative flex items-center justify-center w-64 h-64">
                {/* Fireball Halo */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 m-auto w-40 h-40 bg-kcg-red rounded-full blur-[50px] z-0"
                />
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 z-10"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path
                      id="intelligenceTextPath"
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                      fill="none"
                    />
                    <text className="text-[13px] uppercase tracking-[0.16em] font-display fill-white/80 font-medium">
                      <textPath href="#intelligenceTextPath" startOffset="0%">
                        KOFFMANN CAPITAL GROUP • KOFFMANN CAPITAL GROUP •&nbsp;
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                <div className="absolute w-28 h-28 rounded-full kcg-glass flex items-center justify-center border border-kcg-red/30 shadow-[0_0_30px_rgba(200,16,46,0.15)] relative overflow-hidden z-20">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0d7c51f1-ae14-4826-9438-98688980178c" 
                    alt="KCG Monogram"
                    className="w-16 h-16 object-contain relative z-10"
                  />
                </div>
              </div>
              <h4 className="text-3xl font-display font-medium uppercase tracking-[0.3em] font-black italic text-white/90">Moteur Krypton™</h4>
              <p className="text-kcg-red text-[10px] max-w-xs uppercase tracking-[0.4em] leading-loose font-black italic">
                Traitement : 1,2 Pétaoctets / Jour <br />
                Latence : 0,004ms <br />
                Nœuds Neuraux : 14 000+
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-kcg-red font-black italic">Le Cœur de l'Empire</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight uppercase tracking-tighter">
              L'Intelligence est la <br /> Nouvelle Infrastructure.
            </h3>
          </motion.div>

          <div className="grid gap-8">
            {[
              { 
                icon: Zap, 
                title: 'Croissance Prédictive', 
                desc: 'Nos modèles d\'IA analysent les données multi-plateformes pour prédire les changements de marché avant qu\'ils ne surviennent.' 
              },
              { 
                icon: Activity, 
                title: 'Logistique Autonome', 
                desc: 'Routage par deep-learning qui s\'adapte en temps réel aux contraintes d\'infrastructure.' 
              },
              { 
                icon: Database, 
                title: 'Souveraineté des Données', 
                desc: 'Modèles entraînés localement respectant le contexte africain et l\'intelligence culturelle.' 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-lg kcg-glass bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-kcg-red" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-display font-medium uppercase tracking-tight">{item.title}</h4>
                  <p className="text-white/40 font-light leading-relaxed italic">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
