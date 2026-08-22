import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  Columns2,
  Compass,
  Bookmark,
  Heart,
  Clock,
  Volume2,
  Radio,
  Play,
  Check,
  ChevronRight,
  ArrowRight,
  Shield,
  Layers,
  HelpCircle,
  X
} from 'lucide-react';
import { Letter, LETTERS } from '../../data/letters';
import { executiveReaderService, ExecutiveProfile } from '../../services/executiveReaderService';
import { readerService } from '../../services/readerService';
import { kcgSound } from '../../mobile/soundEngine';
import ExecutiveBriefCard from './ExecutiveBriefCard';
import ExecutiveIndicators from './ExecutiveIndicators';
import ExecutiveRecommendations from './ExecutiveRecommendations';
import ExecutiveTimeline from './ExecutiveTimeline';
import ExecutiveCompareModal from './ExecutiveCompareModal';
import ExecutiveDiscovery from './ExecutiveDiscovery';
import ExecutiveAskModal from './ExecutiveAskModal';
import ExecutiveOnboardingModal from './ExecutiveOnboardingModal';

interface KCGExecutiveReaderProps {
  onOpenLetter: (letter: Letter) => void;
  onClose?: () => void;
}

type ExecutiveTab =
  | 'home'
  | 'briefing'
  | 'library'
  | 'timeline'
  | 'compare'
  | 'discovery'
  | 'ask';

export default function KCGExecutiveReader({
  onOpenLetter,
  onClose,
}: KCGExecutiveReaderProps) {
  const [profile, setProfile] = useState<ExecutiveProfile>(() => executiveReaderService.getProfile());
  const [activeTab, setActiveTab] = useState<ExecutiveTab>('home');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !profile.onboardingCompleted);

  // Sync profile changes
  useEffect(() => {
    const unsub = executiveReaderService.subscribe(() => {
      const p = executiveReaderService.getProfile();
      setProfile(p);
      if (!p.onboardingCompleted) {
        setIsOnboardingOpen(true);
      }
    });
    return () => unsub();
  }, []);

  const handleTabChange = (tab: ExecutiveTab) => {
    kcgSound.playTactileClick();
    setActiveTab(tab);
  };

  const recentLetters = readerService.getRecentLetters();
  const savedLetters = readerService.getSavedLetters();
  const likedLetters = readerService.getLikedLetters();

  return (
    <div className="w-full text-white select-none space-y-8">
      {/* Onboarding modal if not configured */}
      <ExecutiveOnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={() => setIsOnboardingOpen(false)}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* ================= HERO ZONE ================= */}
      <div className="rounded-3xl bg-gradient-to-b from-[#12080a] via-[#09090c] to-[#0A0A0C] border border-[#C8102E]/30 p-6 sm:p-10 text-left relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#C8102E] text-[9px] font-mono uppercase font-bold tracking-[0.25em]">
            <Shield className="w-3 h-3 text-[#C8102E]" />
            <span>KCG EXECUTIVE READERâ„¢ Â· ESPACE STRATÃ‰GIQUE PERSONNEL</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              LIRE. COMPRENDRE. ANTICIPER.
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl">
              Votre espace personnel pour suivre les idÃ©es et les doctrines qui faÃ§onnent la vision de Koffmann Capital Group.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleTabChange('briefing')}
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>OUVRIR MON BRIEFING</span>
            </button>

            <button
              onClick={() => handleTabChange('compare')}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white transition-all font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Columns2 className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>COMPARER DEUX LETTRES</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-all font-mono text-[10px] uppercase cursor-pointer"
              >
                Fermer l'espace
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= PERSONAL NON-COMPETITIVE INDICATORS ================= */}
      <ExecutiveIndicators />

      {/* ================= EXECUTIVE NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'home' as const, label: '01 â€” ACCUEIL', icon: Layers },
          { id: 'briefing' as const, label: '02 â€” BRIEFING HEBDO', icon: Volume2 },
          { id: 'library' as const, label: '03 â€” MES LECTURES', icon: Bookmark },
          { id: 'timeline' as const, label: '04 â€” PARCOURS', icon: Compass },
          { id: 'compare' as const, label: '05 â€” COMPARATEUR', icon: Columns2 },
          { id: 'discovery' as const, label: '06 â€” EXPLORER UNE IDÃ‰E', icon: Sparkles },
          { id: 'ask' as const, label: '07 â€” ASK KCG AI', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: EXECUTIVE HOME ================= */}
      {activeTab === 'home' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Executive Brief Card */}
          <ExecutiveBriefCard onOpenLetter={onOpenLetter} />

          {/* Continue Reading (if in progress) */}
          {recentLetters.length > 0 && (
            <div className="p-5 rounded-3xl bg-[#09090c] border border-white/10 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[#C8102E]" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                    CONTINUER LA LECTURE
                  </span>
                </div>
                <span className="text-[9px] font-mono text-neutral-400">
                  REPRISE IMMÃ‰DIATE
                </span>
              </div>

              <div
                onClick={() => {
                  kcgSound.playTactileClick();
                  onOpenLetter(recentLetters[0].letter);
                }}
                className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-[#C8102E]/60 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase">
                    Dossier #{recentLetters[0].letter.id} Â· {recentLetters[0].letter.category}
                  </span>
                  <h4 className="text-sm font-display font-bold uppercase text-white truncate">
                    {recentLetters[0].letter.title}
                  </h4>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-28 sm:w-44 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C8102E] rounded-full"
                        style={{ width: `${recentLetters[0].readProgress}%` }}
                      />
                    </div>
                    <span className="text-[8.5px] font-mono text-neutral-400">
                      Vous Ã©tiez Ã  {recentLetters[0].readProgress}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] font-mono text-neutral-300 hidden sm:inline uppercase">
                    Reprendre
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#C8102E] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Smart Recommendations */}
          <ExecutiveRecommendations onOpenLetter={onOpenLetter} />
        </div>
      )}

      {/* ================= TAB 2: BRIEFING HEBDO ================= */}
      {activeTab === 'briefing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <ExecutiveBriefCard onOpenLetter={onOpenLetter} />

          {/* Weekly edition meta note */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase text-[#C8102E] font-bold">
                KCG WEEKLY INTELLIGENCE Â· Ã‰DITION 34
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Ce briefing est gÃ©nÃ©rÃ© Ã  partir des thÃ©matiques sÃ©lectionnÃ©es lors de votre configuration et des derniÃ¨res parutions du Fondateur.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 3: MES LECTURES (LIBRARY) ================= */}
      {activeTab === 'library' && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-[#C8102E]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
                BIBLIOTHÃˆQUE EXÃ‰CUTIVE PERSONNELLE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
              Mes Lectures & Sauvegardes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Saved section */}
            <div className="p-5 rounded-3xl bg-[#09090c] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-3 h-3 text-[#C8102E]" />
                  LETTRES SAUVEGARDÃ‰ES ({savedLetters.length})
                </span>
              </div>

              {savedLetters.length === 0 ? (
                <p className="text-xs text-neutral-500 py-4 text-center">
                  Aucune lettre sauvegardÃ©e pour le moment.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {savedLetters.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => {
                        kcgSound.playTactileClick();
                        onOpenLetter(l);
                      }}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="text-[8px] font-mono text-[#C8102E] block">
                          DOSSIER #{l.id}
                        </span>
                        <h5 className="text-xs font-display font-bold uppercase text-white truncate">
                          {l.title}
                        </h5>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Liked section */}
            <div className="p-5 rounded-3xl bg-[#09090c] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                  <Heart className="w-3 h-3 text-[#C8102E]" />
                  LETTRES AIMÃ‰ES ({likedLetters.length})
                </span>
              </div>

              {likedLetters.length === 0 ? (
                <p className="text-xs text-neutral-500 py-4 text-center">
                  Vos rÃ©flexions favorites s'afficheront ici.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {likedLetters.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => {
                        kcgSound.playTactileClick();
                        onOpenLetter(l);
                      }}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="text-[8px] font-mono text-[#C8102E] block">
                          DOSSIER #{l.id}
                        </span>
                        <h5 className="text-xs font-display font-bold uppercase text-white truncate">
                          {l.title}
                        </h5>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PARCOURS TIMELINE ================= */}
      {activeTab === 'timeline' && (
        <div className="animate-in fade-in duration-200">
          <ExecutiveTimeline onOpenLetter={onOpenLetter} />
        </div>
      )}

      {/* ================= TAB 5: COMPARATEUR ================= */}
      {activeTab === 'compare' && (
        <div className="animate-in fade-in duration-200">
          <ExecutiveCompareModal onOpenLetter={onOpenLetter} />
        </div>
      )}

      {/* ================= TAB 6: EXPLORER UNE IDÃ‰E ================= */}
      {activeTab === 'discovery' && (
        <div className="animate-in fade-in duration-200">
          <ExecutiveDiscovery onOpenLetter={onOpenLetter} />
        </div>
      )}

      {/* ================= TAB 7: ASK KCG AI ================= */}
      {activeTab === 'ask' && (
        <div className="animate-in fade-in duration-200">
          <ExecutiveAskModal onOpenLetter={onOpenLetter} />
        </div>
      )}
    </div>
  );
}
