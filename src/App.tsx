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
// LAZY-LOADED COMPONENTS
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
  | 'about'
  | 'venture'
  | 'intelligence'
  | 'contact'
  | 'talents';

type PodcastIntention =
  | 'BUSINESS'
  | 'VISION'
  | 'IA'
  | 'TALENT';

interface ResolvedRoute {
  page: ActivePage;
  intention: PodcastIntention;
}

// ============================================================
// ROUTING CONFIGURATION
// ============================================================

const ROUTES: Record<
  string,
  ResolvedRoute
> = {
  '/': {
    page: 'home',
    intention: 'BUSINESS',
  },

  '/about': {
    page: 'about',
    intention: 'VISION',
  },

  '/venture': {
    page: 'venture',
    intention: 'BUSINESS',
  },

  '/intelligence': {
    page: 'intelligence',
    intention: 'IA',
  },

  '/contact': {
    page: 'contact',
    intention: 'BUSINESS',
  },

  '/talents-portal': {
    page: 'talents',
    intention: 'TALENT',
  },
};

const HASH_ROUTES: Record<
  string,
  ResolvedRoute
> = {
  '#about': ROUTES['/about'],
  '#venture': ROUTES['/venture'],
  '#intelligence': ROUTES['/intelligence'],
  '#contact': ROUTES['/contact'],
  '#talents-portal': ROUTES['/talents-portal'],
};

const DEFAULT_ROUTE = ROUTES['/'];

// ============================================================
// ROUTER
// ============================================================

function normalizePathname(
  pathname: string
): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const normalized = pathname
    .replace(/\/+$/, '')
    .trim();

  return normalized || '/';
}

function normalizeHash(
  hash: string
): string {
  if (!hash) {
    return '';
  }

  return hash
    .trim()
    .toLowerCase();
}

function resolveRoute(): ResolvedRoute {
  const pathname = normalizePathname(
    window.location.pathname
  );

  const hash = normalizeHash(
    window.location.hash
  );

  /*
   * Hash routes intentionally take priority.
   *
   * Supported:
   *   /#about
   *   /#venture
   *   /#intelligence
   *   /#contact
   *   /#talents-portal
   */
  if (hash && HASH_ROUTES[hash]) {
    return HASH_ROUTES[hash];
  }

  /*
   * Clean routes:
   *   /about
   *   /venture
   *   /intelligence
   *   /contact
   *   /talents-portal
   */
  return ROUTES[pathname] ?? DEFAULT_ROUTE;
}

// ============================================================
// COGNITIVE ENGINE
// ============================================================

function CognitiveEngine() {
  const setEmotion = usePodcastStore(
    (state) => state.setEmotion
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let clickCount = 0;

    // Browser-safe timer types.
    // Do NOT use NodeJS.Timeout here.
    let idleTimer: number | undefined;
    let ghostModeTimer: number | undefined;

    const CLICK_RESET_TIME = 2000;
    const IDLE_DELAY = 5000;
    const GHOST_MODE_DELAY = 10000;

    const clearTimers = () => {
      if (idleTimer !== undefined) {
        window.clearTimeout(idleTimer);
        idleTimer = undefined;
      }

      if (ghostModeTimer !== undefined) {
        window.clearTimeout(ghostModeTimer);
        ghostModeTimer = undefined;
      }
    };

    const determineEmotion = () => {
      const velocity = Math.abs(scrollVelocity);

      if (clickCount > 3 || velocity > 100) {
        setEmotion('RUSHED');
        return;
      }

      if (velocity > 10 && velocity < 40) {
        setEmotion('FASCINATED');
        return;
      }

      if (
        scrollVelocity === 0 &&
        clickCount === 0
      ) {
        setEmotion('CONTEMPLATIVE');
        return;
      }

      setEmotion('ACTIVE');
    };

    const scheduleIdleState = () => {
      clearTimers();

      idleTimer = window.setTimeout(() => {
        scrollVelocity = 0;
        determineEmotion();

        ghostModeTimer = window.setTimeout(() => {
          usePodcastStore
            .getState()
            .triggerGhostMode();
        }, GHOST_MODE_DELAY);
      }, IDLE_DELAY);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      scrollVelocity =
        currentScrollY - lastScrollY;

      lastScrollY = currentScrollY;

      determineEmotion();
      scheduleIdleState();
    };

    const handleClick = () => {
      clickCount += 1;

      determineEmotion();
      scheduleIdleState();

      window.setTimeout(() => {
        clickCount = Math.max(
          0,
          clickCount - 1
        );
      }, CLICK_RESET_TIME);
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

    scheduleIdleState();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'click',
        handleClick
      );

      clearTimers();
    };
  }, [setEmotion]);

  return null;
}

// ============================================================
// LOADING FALLBACK
// ============================================================

function PageLoadingFallback() {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
      role="status"
      aria-label="Loading Koffmann Capital Group"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border border-kcg-red/30 border-t-kcg-red"
        aria-hidden="true"
      />
    </div>
  );
}

// ============================================================
// CINEMATIC LOADER
// ============================================================

function CinematicLoader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-12 bg-black"
    >
      <div className="relative flex h-64 w-64 items-center justify-center">

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
          className="absolute inset-0 z-0 m-auto h-32 w-32 rounded-full bg-kcg-red blur-[40px]"
          aria-hidden="true"
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
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full"
            role="presentation"
          >
            <path
              id="kcg-loader-text-path"
              d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
              fill="none"
            />

            <text className="fill-white/80 font-display text-[13px] font-medium uppercase tracking-[0.16em]">
              <textPath
                href="#kcg-loader-text-path"
                startOffset="0%"
              >
                KOFFMANN CAPITAL GROUP â€¢ KOFFMANN CAPITAL GROUP â€¢
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* KCG Monogram */}
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-kcg-red/30 kcg-glass shadow-[0_0_30px_rgba(200,16,46,0.15)]">

          <div
            className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"
            aria-hidden="true"
          />

          <img
            src="https://firebasestorage.googleapis.com/v0/b/fgfs-ai.firebasestorage.app/o/Logo%20GCG%20500X500.png?alt=media&token=0d7c51f1-ae14-4826-9438-98688980178c"
            alt="KCG"
            className="relative z-10 h-16 w-16 object-contain"
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
          className="text-[10px] font-black uppercase tracking-[0.8em] text-kcg-red"
        >
          KCG SOVEREIGN PROXIED
        </motion.p>

        <div
          className="relative h-px w-64 overflow-hidden bg-white/5"
          aria-hidden="true"
        >
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-0 top-0 w-1/2 bg-gradient-to-r from-transparent via-kcg-red to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================

function HomePage() {
  return (
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
  );
}

// ============================================================
// APPLICATION PAGES
// ============================================================

function ApplicationPage({
  activePage,
}: {
  activePage: ActivePage;
}) {
  switch (activePage) {
    case 'home':
      return <HomePage />;

    case 'about':
      return <AboutPage />;

    case 'venture':
      return (
        <div className="relative bg-black text-white">
          <Navbar />
          <VenturePage />
          <Footer />
        </div>
      );

    case 'intelligence':
      return (
        <div className="relative bg-black text-white">
          <Navbar />
          <IntelligencePage />
          <Footer />
        </div>
      );

    case 'contact':
      return <ContactPage />;

    case 'talents':
      return (
        <>
          <TalentsPage />
          <Footer />
        </>
      );

    default:
      return <HomePage />;
  }
}

// ============================================================
// APPLICATION
// ============================================================

export default function App() {
  const [loading, setLoading] =
    useState(true);

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

    handleRouteChange();

    window.addEventListener(
      'hashchange',
      handleRouteChange
    );

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
  // CINEMATIC INITIAL LOADING
  // ----------------------------------------------------------

  useEffect(() => {
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

      {/*
       * IMPORTANT:
       * Suspense intentionally wraps AnimatePresence.
       * This prevents AnimatePresence from losing track
       * of lazy-loaded route children.
       */}
      <Suspense
        fallback={<PageLoadingFallback />}
      >
        <AnimatePresence mode="wait">

          {loading ? (
            <CinematicLoader />
          ) : (
            <motion.div
              key={activePage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ApplicationPage
                activePage={activePage}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </Suspense>

      {/* Global KCG systems */}
      <CognitiveEngine />

      <GlobalPodcastPlayer />

      {/* Cinematic grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[99] opacity-[0.03]"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
        aria-hidden="true"
      />
    </div>
  );
}