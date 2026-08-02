import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 right-6 z-[100] p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Sidebar overlay and panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-xl md:hidden flex flex-col justify-center items-center">
          <nav className="flex flex-col items-center gap-8 text-sm font-mono tracking-[0.3em] uppercase text-neutral-300">
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-white">Holding</Link>
            <Link to="/ecosystem" onClick={() => setIsOpen(false)} className="hover:text-white">Solutions</Link>
            <Link to="/kcg-core" onClick={() => setIsOpen(false)} className="hover:text-white">Technologies</Link>
            <Link to="/investments" onClick={() => setIsOpen(false)} className="hover:text-white">Investissements</Link>
            <Link to="/talents-portal" onClick={() => setIsOpen(false)} className="hover:text-white">Talents</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-white">Contact</Link>
          </nav>
        </div>
      )}
    </>
  );
}
