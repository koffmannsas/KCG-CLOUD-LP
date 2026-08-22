import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { kcgSound } from './soundEngine';
import { useMobileOSStore } from './mobileOSStore';

interface MobileHeaderProps {
  onNavigate?: (path: string) => void;
}

export default function MobileHeader({ onNavigate }: MobileHeaderProps) {
  const [isMuted, setIsMuted] = useState(kcgSound.getIsMuted());
  const { setActiveTab } = useMobileOSStore();

  const handleToggleSound = () => {
    const muted = kcgSound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      kcgSound.playSignalPing(500);
    }
  };

  const handleLogoClick = () => {
    kcgSound.playTactileClick();
    setActiveTab('home');
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-[150] bg-black/95 backdrop-blur-2xl border-b border-white/[0.06] select-none"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      role="banner"
    >
      <div className="h-16 px-4 flex items-center justify-between relative">
        {/* Left Spacer to balance the right sound button and keep center logo mathematically centered */}
        <div className="w-9 h-9 flex items-center justify-start">
          <span className="w-2 h-2 rounded-full bg-[#CF1A26] animate-pulse" title="KCG Sovereign Network Online" />
        </div>

        {/* Center: Official KCG Logo & Sovereign Institutional Wordmark */}
        <button
          onClick={handleLogoClick}
          className="flex flex-col items-center justify-center gap-1 focus:outline-none cursor-pointer group active:scale-95 transition-transform"
          aria-label="Koffmann Capital Group - Accueil"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/krypton-ai-490214.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0c252df9-95d7-4ef8-abb1-03d509a84403"
              alt="Koffmann Capital Group Official Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(207,26,38,0.25)]"
            />
          </div>
          <span className="text-[8px] font-mono tracking-[0.28em] text-white/90 uppercase font-semibold leading-none">
            KOFFMANN CAPITAL GROUP
          </span>
        </button>

        {/* Right: Sound Control (Discreet System Icon, No Hamburger Menu) */}
        <div className="w-9 h-9 flex items-center justify-end">
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-neutral-400 hover:text-white active:scale-90 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#CF1A26]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
