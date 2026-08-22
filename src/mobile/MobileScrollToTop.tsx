import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function MobileScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed z-40 w-11 h-11 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center text-white active:scale-90 transition-transform group"
          style={{
            right: '18px',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)'
          }}
        >
          {/* Subtle red dot signal */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
          <ArrowUp className="w-4 h-4 text-neutral-300 group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
