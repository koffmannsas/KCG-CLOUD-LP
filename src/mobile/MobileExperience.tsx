import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import KCGSovereignIntro from './KCGSovereignIntro';
import MobileHeader from './MobileHeader';
import MobileOSBottomNav from './MobileOSBottomNav';
import MobileCommandHome from './MobileCommandHome';
import MobileSolutionsView from './MobileSolutionsView';
import MobileNetworkView from './MobileNetworkView';
import MobileCoreView from './MobileCoreView';
import MobileAIView from './MobileAIView';
import MobileFikoOneView from './MobileFikoOneView';
import MobileFikoConnectView from './MobileFikoConnectView';
import MobileDoctrineView from './MobileDoctrineView';
import MobileMoreView from './MobileMoreView';
import MobileReadingModal from './MobileReadingModal';
import MobileRadioModal from './MobileRadioModal';
import MobileMiniPlayer from './MobileMiniPlayer';
import { useMobileOSStore } from './mobileOSStore';

interface MobileExperienceProps {
  onNavigatePage?: (page: string) => void;
}

export default function MobileExperience({ onNavigatePage }: MobileExperienceProps) {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kcg_mobile_intro_viewed') !== 'true';
    } catch {
      return true;
    }
  });

  const { activeTab } = useMobileOSStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    // Lock viewport to app behavior
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#CF1A26] selection:text-white font-sans antialiased w-full relative">
      {/* ================= 1. KCG SOVEREIGN ORBITAL INTRO ================= */}
      {showIntro && (
        <KCGSovereignIntro
          onComplete={() => setShowIntro(false)}
          autoDurationMs={5000}
        />
      )}

      {/* ================= 2. SOVEREIGN MOBILE COMMAND HEADER (Z-150) ================= */}
      <MobileHeader onNavigate={onNavigatePage} />

      {/* ================= 3. ACTIVE VIEW TRANSITION CONTAINER (Z-10) ================= */}
      <main className="w-full relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileCommandHome />
            </motion.div>
          )}

          {activeTab === 'network' && (
            <motion.div
              key="view-solutions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileSolutionsView />
            </motion.div>
          )}

          {activeTab === 'core' && (
            <motion.div
              key="view-core"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileCoreView />
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="view-ai"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileAIView />
            </motion.div>
          )}

          {activeTab === 'fiko-one' && (
            <motion.div
              key="view-fiko-one"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileFikoOneView />
            </motion.div>
          )}

          {activeTab === 'fiko-connect' && (
            <motion.div
              key="view-fiko-connect"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileFikoConnectView />
            </motion.div>
          )}

          {activeTab === 'doctrine' && (
            <motion.div
              key="view-doctrine"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileDoctrineView />
            </motion.div>
          )}

          {activeTab === 'more' && (
            <motion.div
              key="view-more"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileMoreView onNavigateDesktopPage={onNavigatePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= 4. SLEEK COMPACT FLOATING MINI RADIO PLAYER (Z-100) ================= */}
      <MobileMiniPlayer />

      {/* ================= 5. PRIVATE READING ROOM FULLSCREEN MODAL (Z-250) ================= */}
      <MobileReadingModal />

      {/* ================= 6. FULLSCREEN RADIO COCKPIT MODAL (Z-260) ================= */}
      <MobileRadioModal />

      {/* ================= 7. FLOATING APPLICATION BOTTOM NAVIGATION (Z-110) ================= */}
      <MobileOSBottomNav />
    </div>
  );
}
