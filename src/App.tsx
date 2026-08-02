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
import { Routes, Route, useLocation } from 'react-router-dom';
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

// New Institutional Routes
const EcosystemPage = lazy(() => import('@/src/pages/EcosystemPage'));
const KcgCorePage = lazy(() => import('@/src/pages/KcgCorePage'));
const CloudPage = lazy(() => import('@/src/pages/CloudPage'));
const AiPage = lazy(() => import('@/src/pages/AiPage'));
const InvestmentsPage = lazy(() => import('@/src/pages/InvestmentsPage'));
const LeadershipPage = lazy(() => import('@/src/pages/LeadershipPage'));
const CareersPage = lazy(() => import('@/src/pages/CareersPage'));
const ContactPage = lazy(() => import('@/src/pages/ContactPage'));
const NewsroomPage = lazy(() => import('@/src/pages/NewsroomPage'));
const MediaPage = lazy(() => import('@/src/pages/MediaPage'));

// Auth & Admin
const AdminLoginPage = lazy(() => import('@/src/pages/AdminLoginPage'));
const DashboardPage = lazy(() => import('@/src/pages/DashboardPage'));
const EnterpriseLayout = lazy(() => import('@/src/components/layout/EnterpriseLayout'));
const ProtectedRoutes = lazy(() => import('@/src/core/auth/ProtectedRoutes'));

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
  useLenis();
  const location = useLocation();

  useEffect(() => {
    usePodcastStore.getState().incrementVisitCount();
  }, []);

  useEffect(() => {
    // Simulate loading of assets and heavy Three.js resources
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer);
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
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>

                {/* Home route remains distinct because of its immersive full-screen ThreeJS background */}
                <Route path="/" element={
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
                  </motion.div>
                } />

                {/* Institutional Routes wrapped in Enterprise Layout */}
                <Route element={<EnterpriseLayout />}>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/venture" element={<VenturePage />} />
                  <Route path="/intelligence" element={<IntelligencePage />} />
                  <Route path="/talents-portal" element={<TalentsPage />} />
                  <Route path="/ecosystem" element={<EcosystemPage />} />
                  <Route path="/kcg-core" element={<KcgCorePage />} />
                  <Route path="/cloud" element={<CloudPage />} />
                  <Route path="/ai" element={<AiPage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="/leadership" element={<LeadershipPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/newsroom" element={<NewsroomPage />} />
                  <Route path="/media" element={<MediaPage />} />
                </Route>

                {/* Admin / Auth Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/admin/dashboard" element={<DashboardPage />} />
                </Route>

                {/* Fallback 404 */}
                <Route path="*" element={
                  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-display font-bold">404</h1>
                    <p className="text-neutral-500 mt-2">RESOURCE NOT FOUND</p>
                  </div>
                } />

              </Routes>
            </AnimatePresence>
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

