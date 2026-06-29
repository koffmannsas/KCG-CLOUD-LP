import { motion } from 'motion/react';
import { Twitter, Linkedin, Instagram, ArrowUpRight, Radio } from 'lucide-react';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isPlayerVisible, isPlaying, playLetter } = usePodcastStore();

  return (
    <footer className="pt-32 pb-32 md:pb-12 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
          <div className="col-span-2 space-y-10">
            <a href="#" className="flex items-center gap-4 group">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/logo%20KCG.png?alt=media&token=9561c060-cb6c-435b-a40b-ab2f5571e586" 
                alt="KCG Logo" 
                className="w-[90px] sm:w-[150px] lg:w-[200px] h-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
              />
            </a>
            <p className="text-white/30 max-w-xs text-[11px] leading-relaxed uppercase tracking-[0.3em] font-black italic">
              “Concevoir le socle technologique souverain d'un continent africain unifié.”
            </p>
            
            <button 
              onClick={() => {
                if (!isPlayerVisible) {
                  playLetter(LETTERS[0]);
                } else {
                  usePodcastStore.getState().setIsExpanded(true);
                }
              }}
              className="px-6 py-3 w-max bg-kcg-red/10 text-kcg-red hover:bg-kcg-red hover:text-white transition-all rounded-full flex items-center gap-3 text-xs uppercase font-bold tracking-widest relative overflow-hidden group border border-kcg-red/20 inline-flex"
            >
              <div className="absolute inset-0 bg-kcg-red translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Radio className="w-4 h-4 relative z-10 animate-pulse" />
              <span className="relative z-10">
                {isPlaying ? "Radio KCG" : "Radio Stratégique KCG"}
              </span>
            </button>

            <div className="flex gap-8">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-white/20 hover:text-kcg-red transition-all transform hover:scale-110">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-kcg-red italic">Écosystème</h4>
            <ul className="space-y-4">
              {['FIKO AI', 'FIKO PAY', 'FIKO CONNECT', 'AIRVOO', 'FGFS AI'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-kcg-red transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-kcg-red italic">Souveraineté</h4>
            <ul className="space-y-4">
              {['Vision', 'Manifeste', 'Programme Talents', 'Impact', 'Gouvernance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-kcg-red transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-kcg-red italic">Siège Global</h4>
            <div className="space-y-6 text-[11px] text-white/40 font-bold leading-loose uppercase tracking-[0.2em] italic">
              <p>Innovation Tower, 12ème Étage<br />International Business District<br />Abidjan, Côte d'Ivoire</p>
              <p className="text-white font-black not-italic border-b border-kcg-red/20 inline-block pb-1">contact@koffmanncapital.group</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
            © {currentYear} KOFFMANN CAPITAL GROUP. PRIVATE INSTITUTIONAL ENTITY.
          </p>
          <div className="flex gap-12">
            {['Confidentialité', 'Protocoles', 'Juridique'].map((item) => (
              <a key={item} href="#" className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-kcg-red transition-all font-black">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer background element */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-kcg-red/5 rounded-full blur-[150px] -z-10 translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}
