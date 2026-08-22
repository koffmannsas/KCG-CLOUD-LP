import React from 'react';
import { motion } from 'motion/react';
import { Home, Layers, Sparkles, LayoutGrid, User } from 'lucide-react';
import { useMobileOSStore, MobileTab } from './mobileOSStore';
import { kcgSound } from './soundEngine';

export default function MobileOSBottomNav() {
  const { activeTab, setActiveTab } = useMobileOSStore();

  const navTabs: { id: MobileTab; label: string; icon: any }[] = [
    { id: 'home', label: 'ACCUEIL', icon: Home },
    { id: 'core', label: 'Ã‰COSYSTÃˆME', icon: Layers },
    { id: 'ai', label: 'KCG AI', icon: Sparkles },
    { id: 'network', label: 'NOS SOLUTIONS', icon: LayoutGrid },
    { id: 'more', label: 'PROFIL', icon: User },
  ];

  const handleSelectTab = (tab: MobileTab) => {
    kcgSound.playTactileClick();
    setActiveTab(tab);
  };

  const isTabActive = (tabId: MobileTab) => {
    if (tabId === 'core') {
      return activeTab === 'core' || activeTab === 'fiko-one' || activeTab === 'fiko-connect';
    }
    return activeTab === tabId;
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-[110] bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/[0.08] select-none pointer-events-auto shadow-[0_-10px_35px_rgba(0,0,0,0.85)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
      role="navigation"
      aria-label="KCG Mobile OS Navigation"
    >
      <div className="w-full max-w-lg mx-auto h-[68px] grid grid-cols-5 items-center px-0.5">
        {navTabs.map((item) => {
          const isActive = isTabActive(item.id);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className="relative flex flex-col items-center justify-center h-full w-full py-1.5 px-0.5 group focus:outline-none cursor-pointer select-none transition-all active:scale-95"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon Container with Subtle Glow when Active */}
              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 0.95,
                  y: isActive ? -1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-[#CF1A26] stroke-[2.4]' : 'text-[#8A8A8A] group-hover:text-white stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -inset-1 rounded-full bg-[#CF1A26]/20 blur-sm pointer-events-none" />
                )}
              </motion.div>

              {/* Label - Compact bold single line responsive typography */}
              <span
                className={`text-[8.5px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-display font-bold uppercase tracking-tight leading-none mt-1 transition-colors duration-200 whitespace-nowrap text-center ${
                  isActive ? 'text-white' : 'text-[#8A8A8A] group-hover:text-neutral-300'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator: Subtle KCG Red Dot */}
              <div className="h-1 flex items-center justify-center mt-1">
                {isActive ? (
                  <motion.span
                    layoutId="activeNavDotKCG"
                    className="w-1.5 h-1.5 rounded-full bg-[#CF1A26] shadow-[0_0_8px_#CF1A26]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 opacity-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
