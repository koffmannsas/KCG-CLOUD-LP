import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-40 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,16,46,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto kcg-card p-12 md:p-24 text-center space-y-12 border-white/5 bg-white/[0.01]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-kcg-red font-black italic">Le Signal Stratégique</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter uppercase leading-[1.1]">
              Rejoindre l'Avant-Garde <br /> de l'Infrastructure.
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
              “Recevez nos mises à jour souveraines, nos analyses économiques et notre vision sur 
              la prochaine vague d'infrastructures intelligentes africaines.”
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-kcg-red/40" />
                <input 
                  type="email" 
                  placeholder="stratège@domaine.kcg"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-full py-5 pl-14 pr-8 text-white placeholder:text-white/20 focus:outline-none focus:border-kcg-red/40 transition-all font-black text-xs uppercase tracking-widest"
                />
              </div>
              <button className="kcg-btn-primary px-10 py-5 rounded-full group flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
                S'abonner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-[10px] text-white/20 mt-6 uppercase tracking-[0.3em] font-bold">
              KCG PRIVACY PROTOCOL — Vos données sont souveraines.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
