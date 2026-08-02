import React from 'react';
import { Link } from 'react-router-dom';

export default function MegaNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold tracking-widest text-white uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-kcg-red"></span>
          KCG
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <Link to="/about" className="hover:text-white transition-colors">Holding</Link>
          <Link to="/ecosystem" className="hover:text-white transition-colors">Solutions</Link>
          <Link to="/kcg-core" className="hover:text-white transition-colors">Technologies</Link>
          <Link to="/investments" className="hover:text-white transition-colors">Investissements</Link>
          <Link to="/talents-portal" className="hover:text-white transition-colors">Talents</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
