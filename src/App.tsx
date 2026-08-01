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

import { Suspense, lazy } from 'react';
import Navbar from '@/src/components/Navbar';
import GlobalPodcastPlayer from '@/src/components/GlobalPodcastPlayer';
import Footer from '@/src/sections/Footer';

// Lazy loaded heavy components
const ThreeBackground = lazy(() => import('@/src/components/ThreeBackground'));
const Hero = lazy(() => import('@/src/sections/Hero'));
const Vision = lazy(() => import('@/src/sections/Vision'));
const Ecosystem = lazy(() => import('@/src/sections/Ecosystem'));
const Intelligence = lazy(() => import('@/src/sections/Intelligence'));
const WhyKCG = lazy(() => import('@/src/sections/WhyKCG'));
const Leadership = lazy(() => import('@/src/sections/Leadership'));
const Talents = lazy(() => import('@/src/sections/Talents'));
const Newsletter = lazy(() => import('@/src/sections/Newsletter'));

// Lazy loaded routes
const TalentsPage = lazy(() => import('@/src/pages/TalentsPage'));
const AboutPage = lazy(() => import('@/src/pages/AboutPage'));
const VenturePage = lazy(() => import('@/src/pages/VenturePage'));
const IntelligencePage = lazy(() => import('@/src/pages/IntelligencePage'));
// Note: If AdminPage or other routes exist in this branch they will be handled dynamically.

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
  const [activePage, setActivePage] = useState<'home' | 'talents' | 'about' | 'venture' | 'intelligence'>('home');
  useLenis();

  useEffect(() => {
    usePodcastStore.getState().incrementVisitCount();
  }, []);

  useEffect(() => {
    // Basic router logic
    const handleHash = () => {
      const hash = window.location.hash;
      const setIntention = usePodcastStore.getState().setIntention;
      if (hash === '#talents-portal') {
        setActivePage('talents');
        setIntention('TALENT');
      } else if (hash === '#about') {
        setActivePage('about');
        setIntention('VISION');
      } else if (hash === '#venture') {
        setActivePage('venture');
        setIntention('BUSINESS');
      } else if (hash === '#intelligence') {
        setActivePage('intelligence');
        setIntention('IA');
      } else {
        setActivePage('home');
        setIntention('BUSINESS');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Simulate loading of assets and heavy Three.js resources
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHash);
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
                      KOFFMANN CAPITAL GROUP • KOFFMANN CAPITAL GROUP •&nbsp;
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
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-kcg-red border-t-transparent animate-spin" /></div>}>
            <motion.div
              key={activePage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activePage === 'home' ? (
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
              ) : (
                <>
                  <TalentsPage />
                  <Footer />
                </>
              )}
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>

      <CognitiveEngine />
      <GlobalPodcastPlayer />

      {/* Grain Overlay for Cinematic Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}

