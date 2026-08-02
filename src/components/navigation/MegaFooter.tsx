import React from 'react';
import { Link } from 'react-router-dom';

export default function MegaFooter() {
  return (
    <footer className="w-full bg-[#020203] border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-widest">Institutionnel</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="hover:text-kcg-red transition-colors">Notre Vision</Link>
            <Link to="/leadership" className="hover:text-kcg-red transition-colors">Gouvernance</Link>
            <Link to="/investments" className="hover:text-kcg-red transition-colors">Relations Investisseurs</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-widest">Plateformes</h4>
          <div className="flex flex-col gap-2">
            <Link to="/cloud" className="hover:text-kcg-red transition-colors">KCG Cloud</Link>
            <Link to="/ai" className="hover:text-kcg-red transition-colors">AI Gateway</Link>
            <Link to="/intelligence" className="hover:text-kcg-red transition-colors">Executive Intelligence</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-widest">Ressources</h4>
          <div className="flex flex-col gap-2">
            <Link to="/newsroom" className="hover:text-kcg-red transition-colors">Newsroom</Link>
            <Link to="/media" className="hover:text-kcg-red transition-colors">Media Kit</Link>
            <Link to="/contact" className="hover:text-kcg-red transition-colors">Contact</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-widest">Global</h4>
          <p className="text-neutral-600 normal-case tracking-normal">
            Koffmann Capital Group opère à l'échelle mondiale pour structurer les actifs critiques de demain.
          </p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-neutral-600">
        <p>© {new Date().getFullYear()} KOFFMANN CAPITAL GROUP. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white">Confidentialité</Link>
          <Link to="/terms" className="hover:text-white">Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
