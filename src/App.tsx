/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from '@/src/hooks/use-lenis';
import { useIsMobile } from '@/src/hooks/useIsMobile';

import Navbar from '@/src/components/Navbar';
import ThreeBackground from '@/src/components/ThreeBackground';
import Hero from '@/src/sections/Hero';
import Vision from '@/src/sections/Vision';
import Ecosystem from '@/src/sections/Ecosystem';
import Intelligence from '@/src/sections/Intelligence';
import WhyKCG from '@/src/sections/WhyKCG';
import Leadership from '@/src/sections/Leadership';
import Talents from '@/src/sections/Talents';
import Newsletter from '@/src/sections/Newsletter';
import Footer from '@/src/sections/Footer';
import TalentsPage from '@/src/pages/TalentsPage';
import AboutPage from '@/src/pages/AboutPage';
import GlobalPodcastPlayer from '@/src/components/GlobalPodcastPlayer';

import VenturePage from '@/src/pages/VenturePage';
import IntelligencePage from '@/src/pages/IntelligencePage';
import SolutionsPage from '@/src/pages/SolutionsPage';
import DoctrinePage from '@/src/pages/DoctrinePage';
import ContactPage from '@/src/pages/ContactPage';
import MobileExperience from '@/src/mobile/MobileExperience';

import { usePodcastStore } from '@/src/store/podcastStore';

function CognitiveEngine() {
  const setEmotion = usePodcastStore((s) => s.setEmotion);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let idleTimer: NodeJS.Timeout;
    let clickCount = 0;
    const clickResetTime = 2000;
    let ghostModeTimer: NodeJS.Timeout;

    const determineEmotion = () => {
      if (clickCount > 3 || Math.abs(scrollVelocity) > 100) {
        setEmotion('RUSHED');
      } else if (Math.abs(scrollVelocity) > 10 && Math.abs(scrollVelocity) < 40) {
        setEmotion('FASCINATED');
      } else if (scrollVelocity === 0 && clickCount === 0) {
        setEmotion('CONTEMPLATIVE');
      } else {
        setEmotion('ACTIVE');
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      determineEmotion();

      clearTimeout(idleTimer);
      clearTimeout(ghostModeTimer);
      idleTimer = setTimeout(() => {
        scrollVelocity = 0;
        determineEmotion();

        // After extended silence (15s total), trigger ghost mode
        ghostModeTimer = setTimeout(() => {
           usePodcastStore.getState().triggerGhostMode();
        }, 10000);
      }, 5000); // 5 seconds of no scrolling -> contemplative
    };

    const handleClick = () => {
      clickCount++;
      determineEmotion();
      setTimeout(() => {
         clickCount = Math.max(0, clickCount - 1);
      }, clickResetTime);

      clearTimeout(idleTimer);
      clearTimeout(ghostModeTimer);
      idleTimer = setTimeout(() => {
        scrollVelocity = 0;
        determineEmotion();

        ghostModeTimer = setTimeout(() => {
           usePodcastStore.getState().triggerGhostMode();
        }, 10000);
      }, 5000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      clearTimeout(idleTimer);
      clearTimeout(ghostModeTimer);
    };
  }, [setEmotion]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'talents' | 'about' | 'venture' | 'intelligence' | 'solutions' | 'doctrine' | 'contact'>('home');
  useLenis();

  const isMobile = useIsMobile();

  useEffect(() => {
    usePodcastStore.getState().incrementVisitCount();
  }, []);

  useEffect(() => {
    // Basic router logic
    const handleHash = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const setIntention = usePodcastStore.getState().setIntention;
      if (hash === '#talents-portal') {
        setActivePage('talents');
        setIntention('TALENT');
        document.title = "KCG â€” Programme Talents | Koffmann Capital Group";
      } else if (hash === '#about') {
        setActivePage('about');
        setIntention('VISION');
        document.title = "KCG â€” Ã€ Propos & Vision 2030 | Koffmann Capital Group";
      } else if (hash === '#venture') {
        setActivePage('venture');
        setIntention('BUSINESS');
        document.title = "KCG â€” Venture Capital | Koffmann Capital Group";
      } else if (hash === '#intelligence') {
        setActivePage('intelligence');
        setIntention('IA');
        document.title = "KCG â€” Krypton AI | Koffmann Capital Group";
      } else if (hash === '#nos-solutions' || hash === '#solutions' || pathname === '/nos-solutions' || pathname === '/solutions') {
        setActivePage('solutions');
        setIntention('BUSINESS');
        document.title = "KCG â€” Nos Solutions | Koffmann Capital Group";
      } else if (
        hash === '#doctrine' ||
        hash === '#leadership-fondateur' ||
        hash === '#leadership' ||
        pathname === '/doctrine' ||
        pathname === '/leadership-fondateur' ||
        pathname === '/leadership'
      ) {
        setActivePage('doctrine');
        setIntention('VISION');
        document.title = "Leadership du Fondateur | Koffmann Capital Group";
      } else if (hash === '#contact') {
        setActivePage('contact');
        setIntention('BUSINESS');
        document.title = "KCG â€” Contact & SiÃ¨ge Global | Koffmann Capital Group";
      } else {
        setActivePage('home');
        setIntention('BUSINESS');
        document.title = "Koffmann Capital Group | Sovereign Technology & Capital";
      }
    };

    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ page: string }>;
      const page = customEvent.detail?.page;
      if (page === 'krypton' || page === 'intelligence') {
        window.location.hash = '#intelligence';
      } else if (page === 'solutions' || page === 'ecosystem') {
        window.location.hash = '#solutions';
      } else if (page === 'doctrine') {
        window.location.hash = '#doctrine';
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    window.addEventListener('kcg-navigate', handleCustomNavigate);
    handleHash();

    // Simulate loading of assets and heavy Three.js resources
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('kcg-navigate', handleCustomNavigate);
    };
  }, []);

  return (
    <div className="relative text-white selection:bg-kcg-red selection:text-white">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-12"
          >
            <div className="relative flex items-center justify-center w-64 h-64">
              {/* Fireball Halo */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 m-auto w-32 h-32 bg-kcg-red rounded-full blur-[40px] z-0"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-10"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <path
                    id="textPath"
                    d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    fill="none"
                  />
                  <text className="text-[13px] uppercase tracking-[0.16em] font-display fill-white/80 font-medium">
                    <textPath href="#textPath" startOffset="0%">
                      KOFFMANN CAPITAL GROUP â€¢ KOFFMANN CAPITAL GROUP â€¢&nbsp;
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="absolute w-28 h-28 rounded-full kcg-glass flex items-center justify-center border border-kcg-red/30 shadow-[0_0_30px_rgba(200,16,46,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0d7c51f1-ae14-4826-9438-98688980178c"
                  alt="KCG Monogram"
                  className="w-16 h-16 object-contain relative z-10"
                />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.8em] text-kcg-red font-black"
              >
                KCG SOVEREIGN PROXIED
              </motion.p>
              <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-kcg-red to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}

        {!loading && (
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activePage === 'home' ? (
              isMobile ? (
                <MobileExperience
                  onNavigatePage={(page) => {
                    setActivePage(page as any);
                  }}
                />
              ) : (
                <>
                  <ThreeBackground />
                  <Navbar />
                  <main>
                    <Hero />
                    <Vision />
                    <Ecosystem />
                    <Intelligence />
                    <WhyKCG />
                    <Leadership />
                    <Talents />
                    <Newsletter />
                  </main>
                  <Footer />
                </>
              )
            ) : activePage === 'about' ? (
              <>
                <AboutPage />
              </>
            ) : activePage === 'venture' ? (
              <div className="bg-black text-white relative">
                <Navbar />
                <VenturePage />
                <Footer />
              </div>
            ) : activePage === 'intelligence' ? (
              <div className="bg-black text-white relative">
                <Navbar />
                <IntelligencePage />
                <Footer />
              </div>
            ) : activePage === 'solutions' ? (
              <div className="bg-black text-white relative">
                <Navbar />
                <SolutionsPage />
                <Footer />
              </div>
            ) : activePage === 'doctrine' ? (
              <div className="bg-black text-white relative">
                <Navbar />
                <DoctrinePage />
                <Footer />
              </div>
            ) : activePage === 'contact' ? (
              <ContactPage />
            ) : (
              <>
                <TalentsPage />
                <Footer />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CognitiveEngine />
      {!isMobile && <GlobalPodcastPlayer />}

      {/* Grain Overlay for Cinematic Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}
