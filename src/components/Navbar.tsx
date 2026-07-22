import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Menu, X, ArrowRight, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { isPlayerVisible, isPlaying, playLetter } = usePodcastStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À Propos', href: '#about' },
    { name: 'Écosystème', href: '#ecosystem' },
    { name: 'Venture', href: '#venture' },
    { name: 'Intelligence', href: '#intelligence' },
    { name: 'Talents', href: '#talents-portal' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 flex items-center bg-black/90 backdrop-blur-3xl border-b border-white/5 transition-all duration-500"
    >
      <div className="w-full px-12 flex items-center justify-between mx-auto">
        <a href="/" aria-label="Accueil Koffmann Capital Group" className="flex items-center gap-6 group">
          <img 
            src="/assets/logo.png"
            alt="KCG Logo" 
            width={64}
            height={64}
            className="w-[90px] sm:w-[150px] lg:w-[200px] h-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold text-white/30 hover:text-kcg-red transition-colors tracking-[0.3em] uppercase"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={() => {
              if (!isPlayerVisible) {
                // play the first or latest letter
                playLetter(LETTERS[0]);
              } else {
                usePodcastStore.getState().setIsExpanded(true);
              }
            }}
            className="px-4 py-2 bg-kcg-red/10 text-kcg-red hover:bg-kcg-red hover:text-white transition-all rounded-full flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest relative overflow-hidden group border border-kcg-red/20"
          >
            <div className="absolute inset-0 bg-kcg-red translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <Radio className="w-3 h-3 relative z-10 animate-pulse" />
            <span className="relative z-10 hidden xl:inline">
              {isPlaying ? "Radio KCG" : "Radio Stratégique"}
            </span>
          </button>
          
          <button className="kcg-btn-outline !py-2.5 !px-6 rounded-full group flex items-center gap-3">
            Contact
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 py-8 px-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white/70 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              if (!isPlayerVisible) {
                playLetter(LETTERS[0]);
              } else {
                usePodcastStore.getState().setIsExpanded(true);
              }
              setIsOpen(false);
            }}
            className="bg-kcg-red/10 border border-kcg-red/30 text-kcg-red py-4 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            Radio Stratégique
          </button>
          <button className="bg-primary text-white py-4 rounded-xl font-bold">
            Nous Contacter
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
