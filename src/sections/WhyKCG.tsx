import { motion } from 'motion/react';

export default function WhyKCG() {
  const reasons = [
    {
      title: 'Ambition Continentale',
      desc: 'Nous ne résolvons pas des problèmes locaux. Nous architecturons des solutions continentales pour un impact mondial.'
    },
    {
      title: 'Infrastructure Profonde',
      desc: 'Nous contrôlons la stack entière. De la fibre à la finance, nos racines s\'enfoncent profondément dans le sol numérique africain.'
    },
    {
      title: 'Croissance Interconnectée',
      desc: 'Notre modèle "l\'infrastructure nourrissant l\'infrastructure" crée un effet d\'expansion exponentiel.'
    },
    {
      title: 'Exécution d\'Élite',
      desc: 'Haute vitesse, haute précision. Nous développons à la vitesse du futur.'
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-kcg-red font-black italic">Avantage Souverain</h2>
          <h3 className="text-4xl md:text-6xl font-display font-medium tracking-tighter uppercase leading-tight">
            L'Architecture d'un <br /> <span className="text-kcg-red">Système Unifié.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="kcg-card p-12 space-y-8 group bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-16 h-[1px] bg-kcg-red group-hover:w-24 transition-all duration-700" />
                <span className="text-[10px] font-mono text-kcg-red/40 italic">PROTOCOL_0{i + 1}</span>
              </div>
              <h4 className="text-2xl font-display font-medium uppercase tracking-tight text-white/90">{reason.title}</h4>
              <p className="text-white/40 text-lg font-light leading-relaxed italic">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
