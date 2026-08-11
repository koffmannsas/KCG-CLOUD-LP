/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useLenis } from '@/src/hooks/use-lenis';
import Navbar from '@/src/components/Navbar';
import GlobalPodcastPlayer from '@/src/components/GlobalPodcastPlayer';
import { usePodcastStore } from '@/src/store/podcastStore';

// ============================================================
// LAZY-LOADED APPLICATION MODULES
// ============================================================

const ThreeBackground = lazy(
  () => import('@/src/components/ThreeBackground')
);

const Hero = lazy(
  () => import('@/src/sections/Hero')
);

const Vision = lazy(
  () => import('@/src/sections/Vision')
);

const Ecosystem = lazy(
  () => import('@/src/sections/Ecosystem')
);

const Intelligence = lazy(
  () => import('@/src/sections/Intelligence')
);

const WhyKCG = lazy(
  () => import('@/src/sections/WhyKCG')
);

const Leadership = lazy(
  () => import('@/src/sections/Leadership')
);

const Talents = lazy(
  () => import('@/src/sections/Talents')
);

const Newsletter = lazy(
  () => import('@/src/sections/Newsletter')
);

const Footer = lazy(
  () => import('@/src/sections/Footer')
);

// ============================================================
// LAZY-LOADED PAGES
// ============================================================

const TalentsPage = lazy(
  () => import('@/src/pages/TalentsPage')
);

const AboutPage = lazy(
  () => import('@/src/pages/AboutPage')
);

const VenturePage = lazy(
  () => import('@/src/pages/VenturePage')
);

const IntelligencePage = lazy(
  () => import('@/src/pages/IntelligencePage')
);

const ContactPage = lazy(
  () => import('@/src/pages/ContactPage')
);

// ============================================================
// TYPES
// ============================================================

type ActivePage =
  | 'home'
  | 'talents'
  | 'about'
  | 'venture'
  | 'intelligence'
  | 'contact';

// ============================================================
// COGNITIVE ENGINE
// ============================================================

function CognitiveEngine() {
  const setEmotion = usePodcastStore((state) => state.setEmotion);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let ghostModeTimer: ReturnType<typeof setTimeout> | undefined;

    let clickCount = 0;

    const clickResetTime = 2000;

    const determineEmotion = () => {
      if (clickCount > 3 || Math.abs(scrollVelocity) > 100) {
        setEmotion('RUSHED');
      } else if (
        Math.abs(scrollVelocity) > 10 &&
        Math.abs(scrollVelocity) < 40
      ) {
        setEmotion('FASCINATED');
      } else if (
        scrollVelocity === 0 &&
        clickCount === 0
      ) {
        setEmotion('CONTEMPLATIVE');
      } else {
        setEmotion('ACTIVE');
      }
    };

    const scheduleIdleState = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }

      if (ghostModeTimer) {
        clearTimeout(ghostModeTimer);
      }

      idleTimer = setTimeout(() => {
        scrollVelocity = 0;
        determineEmotion();

        // After extended silence, trigger ghost mode.
        ghostModeTimer = setTimeout(() => {
          usePodcastStore
            .getState()
            .triggerGhostMode();
        }, 10000);
      }, 5000);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      determineEmotion();
      scheduleIdleState();
    };

    const handleClick = () => {
      clickCount += 1;

      determineEmotion();

      window.setTimeout(() => {
        clickCount = Math.max(
          0,
          clickCount - 1
        );
      }, clickResetTime);

      scheduleIdleState();
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'click',
      handleClick
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'click',
        handleClick
      );

      if (idleTimer) {
        clearTimeout(idleTimer);
      }

      if (ghostModeTimer) {
        clearTimeout(ghostModeTimer);
      }
    };
  }, [setEmotion]);

  return null;
}

// ============================================================
// ROUTER
// ============================================================

function resolveRoute(): {
  page: ActivePage;
  intention:
    | 'BUSINESS'
    | 'VISION'
    | 'IA'
    | 'TALENT';
} {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  /*
   * Hash routes take priority when present.
   *
   * Supported:
   *   /#about
   *   /#venture
   *   /#intelligence
   *   /#contact
   *   /#talents-portal
   *
   * Clean URLs are also supported:
   *   /about
   *   /venture
   *   /intelligence
   *   /contact
   *   /talents-portal
   */

  if (
    hash === '#talents-portal' ||
    pathname === '/talents-portal'
  ) {
    return {
      page: 'talents',
      intention: 'TALENT',
    };
  }

  if (
    hash === '#about' ||
    pathname === '/about'
  ) {
    return {
      page: 'about',
      intention: 'VISION',
    };
  }

  if (
    hash === '#venture' ||
    pathname === '/venture'
  ) {
    return {
      page: 'venture',
      intention: 'BUSINESS',
    };
  }

  if (
    hash === '#intelligence' ||
    pathname === '/intelligence'
  ) {
    return {
      page: 'intelligence',
      intention: 'IA',
    };
  }

  if (
    hash === '#contact' ||
    pathname === '/contact'
  ) {
    return {
      page: 'contact',
      intention: 'BUSINESS',
    };
  }

  return {
    page: 'home',
    intention: 'BUSINESS',
  };
}

// ============================================================
// LOADING FALLBACK
// ============================================================

function PageLoadingFallback() {
  return (
    <div className="fixed inset-0 z-[90] bg-black flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-kcg-red/30 border-t-kcg-red animate-spin" />
    </div>
  );
}

// ============================================================
// APPLICATION
// ============================================================

export default function App() {
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] =
    useState<ActivePage>('home');

  useLenis();

  // ----------------------------------------------------------
  // VISIT TRACKING
  // ----------------------------------------------------------

  useEffect(() => {
    usePodcastStore
      .getState()
      .incrementVisitCount();
  }, []);

  // ----------------------------------------------------------
  // ROUTING
  // ----------------------------------------------------------

  useEffect(() => {
    const handleRouteChange = () => {
      const route = resolveRoute();

      setActivePage(route.page);

      usePodcastStore
        .getState()
        .setIntention(route.intention);
    };

    /*
     * Resolve immediately on first load.
     * This is what makes /contact work correctly.
     */
    handleRouteChange();

    window.addEventListener(
      'hashchange',
      handleRouteChange
    );

    /*
     * popstate supports browser navigation
     * such as Back / Forward.
     */
    window.addEventListener(
      'popstate',
      handleRouteChange
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        handleRouteChange
      );

      window.removeEventListener(
        'popstate',
        handleRouteChange
      );
    };
  }, []);

  // ----------------------------------------------------------
  // INITIAL APPLICATION LOADING
  // ----------------------------------------------------------

  useEffect(() => {
    /*
     * Preserve the existing KCG cinematic loading experience.
     */
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <div className="relative text-white selection:bg-kcg-red selection:text-white">

      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoadingFallback />}>
          {/* ==================================================
              KCG CINEMATIC LOADER
              ================================================== */}

          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 m-auto w-32 h-32 bg-kcg-red rounded-full blur-[40px] z-0"
                />

                {/* Rotating KCG Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 z-10"
                >
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                  >
                    <path
                      id="textPath"
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                      fill="none"
                    />

                    <text className="text-[13px] uppercase tracking-[0.16em] font-display fill-white/80 font-medium">
                      <textPath
                        href="#textPath"
                        startOffset="0%"
                      >
                        KOFFMANN CAPITAL GROUP • KOFFMANN CAPITAL GROUP •&nbsp;
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* KCG Monogram */}
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
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="text-[10px] uppercase tracking-[0.8em] text-kcg-red font-black"
                >
                  KCG SOVEREIGN PROXIED
                </motion.p>

                <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{
                      left: '-100%',
                    }}
                    animate={{
                      left: '100%',
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-kcg-red to-transparent"
                  />
                </div>

              </div>
            </motion.div>
          )}

          {/* ==================================================
              APPLICATION PAGES
              ================================================== */}

          {!loading && (
            <motion.div
              key={activePage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >

              {/* ================= HOME ================= */}

              {activePage === 'home' && (
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
              )}

              {/* ================= ABOUT ================= */}

              {activePage === 'about' && (
                <AboutPage />
              )}

              {/* ================= VENTURE ================= */}

              {activePage === 'venture' && (
                <div className="bg-black text-white relative">
                  <Navbar />
                  <VenturePage />
                  <Footer />
                </div>
              )}

              {/* ================= INTELLIGENCE ================= */}

              {activePage === 'intelligence' && (
                <div className="bg-black text-white relative">
                  <Navbar />
                  <IntelligencePage />
                  <Footer />
                </div>
              )}

              {/* ================= CONTACT ================= */}

              {activePage === 'contact' && (
                <ContactPage />
              )}

              {/* ================= TALENTS ================= */}

              {activePage === 'talents' && (
                <>
                  <TalentsPage />
                  <Footer />
                </>
              )}

            </motion.div>
          )}

        </Suspense>
      </AnimatePresence>

      {/* ======================================================
          GLOBAL KCG SYSTEMS
          ====================================================== */}

      <CognitiveEngine />

      <GlobalPodcastPlayer />

      {/* ======================================================
          CINEMATIC GRAIN OVERLAY
          ====================================================== */}

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99]"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

    </div>
  );
}