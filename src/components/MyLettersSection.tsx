import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bookmark,
  Heart,
  Clock,
  BookOpen,
  ArrowRight,
  Bell,
  Check,
  RotateCcw,
  Sparkles,
  Radio,
  Play
} from 'lucide-react';
import { readerService } from '../services/readerService';
import { Letter, LETTERS } from '../data/letters';
import { kcgSound } from '../mobile/soundEngine';
import { usePodcastStore } from '../store/podcastStore';
import LetterSubscriptionModal from './LetterSubscriptionModal';

interface MyLettersSectionProps {
  onOpenLetter: (letter: Letter) => void;
}

type TabType = 'saved' | 'liked' | 'recent';

export default function MyLettersSection({ onOpenLetter }: MyLettersSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [savedLetters, setSavedLetters] = useState<Letter[]>(() => readerService.getSavedLetters());
  const [likedLetters, setLikedLetters] = useState<Letter[]>(() => readerService.getLikedLetters());
  const [recentLetters, setRecentLetters] = useState<
    { letter: Letter; readProgress: number; lastReadAt: number }[]
  >(() => readerService.getRecentLetters());
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => readerService.isSubscribed());

  const { playLetter, activeLetter, isPlaying } = usePodcastStore();

  const syncData = () => {
    setSavedLetters(readerService.getSavedLetters());
    setLikedLetters(readerService.getLikedLetters());
    setRecentLetters(readerService.getRecentLetters());
    setIsSubscribed(readerService.isSubscribed());
  };

  useEffect(() => {
    syncData();
    const unsubscribe = readerService.subscribe(() => {
      syncData();
    });
    return () => unsubscribe();
  }, []);

  const tabCounts = {
    saved: savedLetters.length,
    liked: likedLetters.length,
    recent: recentLetters.length,
  };

  const handlePlayAudio = (letter: Letter, e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playSignalPing(440);
    playLetter(letter);
  };

  return (
    <div className="space-y-6 text-left select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[8px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            <BookOpen className="w-3 h-3 text-[#C8102E]" />
            <span>ESPACE LECTEUR INSTITUTIONNEL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
            MES LETTRES & DOCTRINE
          </h2>
        </div>

        {/* Alerts Badge */}
        <div>
          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono font-bold">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>INFORMÃ‰ DES PROCHAINES LETTRES</span>
            </div>
          ) : (
            <button
              onClick={() => {
                kcgSound.playTactileClick();
                setIsSubscriptionModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C8102E] border border-white/10 text-white text-[9px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer"
            >
              <Bell className="w-3 h-3 text-[#C8102E]" />
              <span>ÃŠTRE INFORMÃ‰ (LUNDI)</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'saved' as const, label: '01 â€” SAUVEGARDÃ‰ES', icon: Bookmark, count: tabCounts.saved },
          { id: 'liked' as const, label: '02 â€” AIMÃ‰ES', icon: Heart, count: tabCounts.liked },
          { id: 'recent' as const, label: '03 â€” RÃ‰CEMMENT LUES', icon: Clock, count: tabCounts.recent },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                kcgSound.playTactileClick();
                setActiveTab(tab.id);
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[8.5px] font-mono ${
                  isActive ? 'bg-black text-white' : 'bg-white/10 text-neutral-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="space-y-3">
        {/* TAB 1: SAVED */}
        {activeTab === 'saved' && (
          <div>
            {savedLetters.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
                <Bookmark className="w-8 h-8 text-neutral-500 mx-auto" />
                <h4 className="text-xs font-display font-bold uppercase text-white">
                  Aucune lettre sauvegardÃ©e
                </h4>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Cliquez sur Â« Sauvegarder Â» lors de votre lecture pour retrouver vos rÃ©flexions favorites ici.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedLetters.map((letter) => {
                  const isCurrentAudio = activeLetter?.id === letter.id && isPlaying;
                  return (
                    <div
                      key={letter.id}
                      onClick={() => {
                        kcgSound.playTactileClick();
                        onOpenLetter(letter);
                      }}
                      className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/10 hover:border-[#C8102E]/60 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                            DOSSIER #{letter.id} Â· {letter.category}
                          </span>
                          <span className="text-[8px] font-mono text-neutral-400">{letter.date}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-display font-bold uppercase text-white line-clamp-2 group-hover:text-neutral-200">
                          {letter.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-light line-clamp-2">
                          {letter.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[8px] font-mono text-neutral-500 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {letter.duration}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handlePlayAudio(letter, e)}
                            className={`p-1.5 rounded-lg border text-[8px] font-mono transition-all ${
                              isCurrentAudio
                                ? 'bg-[#C8102E] border-[#C8102E] text-white'
                                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                            }`}
                          >
                            <Radio className="w-3 h-3" />
                          </button>
                          <div className="p-1.5 rounded-lg bg-white/5 text-white">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIKED */}
        {activeTab === 'liked' && (
          <div>
            {likedLetters.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
                <Heart className="w-8 h-8 text-neutral-500 mx-auto" />
                <h4 className="text-xs font-display font-bold uppercase text-white">
                  Aucune lettre aimÃ©e
                </h4>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Exprimez votre intÃ©rÃªt sur une rÃ©flexion pour la retrouver dans cette sÃ©lection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {likedLetters.map((letter) => (
                  <div
                    key={letter.id}
                    onClick={() => {
                      kcgSound.playTactileClick();
                      onOpenLetter(letter);
                    }}
                    className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/10 hover:border-[#C8102E]/60 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                          DOSSIER #{letter.id} Â· {letter.category}
                        </span>
                        <span className="text-[8px] font-mono text-neutral-400">{letter.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-display font-bold uppercase text-white line-clamp-2">
                        {letter.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-light line-clamp-2">
                        {letter.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[8px] font-mono text-neutral-500 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {letter.duration}
                      </span>
                      <div className="p-1.5 rounded-lg bg-white/5 text-white">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RECENTLY READ */}
        {activeTab === 'recent' && (
          <div>
            {recentLetters.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
                <Clock className="w-8 h-8 text-neutral-500 mx-auto" />
                <h4 className="text-xs font-display font-bold uppercase text-white">
                  Aucun historique de lecture
                </h4>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Consultez les Founder's Letters pour reprendre facilement votre lecture lÃ  oÃ¹ vous vous Ã©tiez arrÃªtÃ©.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentLetters.map(({ letter, readProgress }) => (
                  <div
                    key={letter.id}
                    onClick={() => {
                      kcgSound.playTactileClick();
                      onOpenLetter(letter);
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#0a0a0d] border border-white/10 hover:border-[#C8102E]/60 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono uppercase text-[#C8102E] font-bold">
                          DOSSIER #{letter.id}
                        </span>
                        <span className="text-[8px] font-mono text-neutral-500">
                          {letter.category}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-display font-bold uppercase text-white truncate">
                        {letter.title}
                      </h4>
                      {readProgress > 0 && (
                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-24 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#C8102E] rounded-full"
                              style={{ width: `${readProgress}%` }}
                            />
                          </div>
                          <span className="text-[8px] font-mono text-neutral-400">
                            {readProgress}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-mono text-neutral-400 hidden sm:inline">
                        Reprendre
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#C8102E] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <LetterSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
}
