import { motion } from 'motion/react';

export default function Vision() {
  return (
    <section id="vision" className="pb-32 pt-0 relative overflow-hidden z-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-kcg-red font-black italic">Notre Vision Souveraine</h2>
              <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight uppercase tracking-tighter">
                Architecturer une Nouvelle Ère <br /> pour le Continent.
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-lg text-white/50 font-light leading-relaxed italic border-l border-kcg-red/20 pl-8"
            >
              <p>
                L'Afrique n'est pas une terre de fragments, mais un paysage de synergies inexploitées. 
                Les systèmes actuels sont souvent isolés, inefficaces et dépendants d'infrastructures externes. 
                <span className="text-white font-black not-italic tracking-tighter">KOFFMANN CAPITAL GROUP</span> est né d'une ambition radicale : bâtir le système nerveux unifié du commerce et de la technologie africaine.
              </p>
              <p>
                Nous ne créons pas seulement des entreprises. Nous créons des nœuds interconnectés — où chaque 
                infrastructure nourrit la suivante. De la logistique pilotée par l'IA à la finance décentralisée, 
                nous posons les fondations d'un <span className="text-kcg-red font-black not-italic">Empire Numérique Souverain</span>.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-12 pt-8">
              {[
                { label: 'Portée du Marché', value: '14 Pays' },
                { label: 'Nœuds de l\'Écosystème', value: '12+ Plateformes' },
                { label: 'IA Opérationnelle', value: '24/7 Global' },
                { label: 'Innovation', value: 'Exponentielle' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2 border-b border-white/5 pb-4"
                >
                  <p className="text-4xl font-display font-medium text-white tracking-tighter font-mono">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-kcg-red font-black italic">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-br from-kcg-red/10 to-transparent rounded-full blur-[120px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full kcg-card border-white/5 flex items-center justify-center rotate-3 scale-90 opacity-20" />
              <div className="absolute inset-8 kcg-card border-white/10 flex flex-col items-center justify-center p-16 text-center space-y-8 bg-white/[0.01]">
                <div className="w-24 h-24 kcg-glass rounded-full flex items-center justify-center border border-kcg-red/20 shadow-[0_0_50px_rgba(200,16,46,0.1)]">
                  <div className="w-12 h-12 bg-kcg-red rounded-full animate-ping opacity-20" />
                  <div className="absolute w-6 h-6 bg-kcg-red rounded-full shadow-[0_0_30px_#C8102E]" />
                </div>
                <h4 className="text-3xl font-display font-medium uppercase tracking-tight text-white/90">Intelligence <br /> Unifiée</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light italic">
                  “Notre moteur centralise les flux de données à travers toutes nos plateformes, 
                  créant une boucle d'intelligence récursive qui accélère la croissance mondiale.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
