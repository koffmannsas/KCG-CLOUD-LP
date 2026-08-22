import React, { useState } from 'react';
import { BookOpen, Radio, ArrowRight, Clock, Lock, Bell, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';
import { LETTERS, Letter } from '../data/letters';
import { usePodcastStore } from '../store/podcastStore';
import { kcgSound } from './soundEngine';
import LetterModal from '../components/LetterModal';
import LetterSubscriptionModal, { LetterSubscriptionBanner } from '../components/LetterSubscriptionModal';
import { readerService } from '../services/readerService';

export default function MobileLetters() {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const { playLetter, activeLetter, isPlaying } = usePodcastStore();

  const handleOpenLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    kcgSound.playTactileClick();
  };

  const handlePlayAudio = (letter: Letter, e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playSignalPing(440);
    playLetter(letter);
  };

  const latestLetterId = Math.max(...LETTERS.map((l) => l.id));

  return (
    <section className="py-20 px-5 bg-black text-white select-none relative overflow-hidden text-left">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#C8102E]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-300 font-bold">
            <BookOpen className="w-3 h-3 text-[#C8102E]" />
            <span>ARCHIVES CONFIDENTIELLES & DOCTRINE</span>
          </div>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              setIsSubscriptionModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#C8102E] text-[8px] font-mono font-bold uppercase tracking-wider cursor-pointer"
          >
            <Bell className="w-2.5 h-2.5" />
            <span>ÃŠTRE INFORMÃ‰</span>
          </button>
        </div>

        <h2 className="text-3xl font-display font-medium tracking-tight uppercase leading-[1.05] text-white">
          Lettres <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8102E] font-black italic font-display">
            StratÃ©giques.
          </span>
        </h2>

        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          PensÃ©es fondamentales, analyses gÃ©opolitiques et orientations macro-Ã©conomiques de Paul Koffmann pour la renaissance du continent.
        </p>
      </div>

      {/* Horizontal Swipeable Letter Dossiers */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-5 px-5 snap-x snap-mandatory">
        {LETTERS.map((letter) => {
          const isCurrentAudio = activeLetter?.id === letter.id && isPlaying;
          const isLatest = letter.id === latestLetterId;
          const isSaved = readerService.isLetterSaved(letter.id);

          return (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="w-[280px] shrink-0 snap-center p-5 rounded-2xl bg-[#09090b] border border-white/10 flex flex-col justify-between min-h-[340px] relative overflow-hidden group active:scale-98 transition-transform cursor-pointer"
            >
              {/* Top Dossier Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5 text-[7.5px] font-mono text-[#C8102E] font-bold">
                    <Lock className="w-2.5 h-2.5" />
                    <span>DOSSIER #{letter.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLatest && (
                      <span className="px-1.5 py-0.5 rounded bg-[#C8102E] text-white font-mono text-[7px] font-black uppercase tracking-wider animate-pulse">
                        NOUVEAU
                      </span>
                    )}
                    {isSaved && (
                      <BookmarkCheck className="w-3 h-3 text-[#C8102E]" />
                    )}
                    <span className="text-[7.5px] font-mono text-neutral-500">{letter.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-display font-bold text-white uppercase leading-snug tracking-tight">
                  {letter.title}
                </h3>

                <p className="text-xs text-neutral-400 font-sans font-light line-clamp-3 leading-relaxed">
                  {letter.excerpt}
                </p>
              </div>

              {/* Bottom Metadata & Play Trigger */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {letter.duration}
                  </span>
                  <span className="uppercase text-[#C8102E]">{letter.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handlePlayAudio(letter, e)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-[8px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      isCurrentAudio
                        ? 'bg-[#C8102E] border-white/20 text-white font-bold animate-pulse'
                        : 'bg-white/[0.04] border-white/10 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <Radio className="w-3 h-3" />
                    <span>{isCurrentAudio ? 'En Lecture' : 'Ã‰couter Audio'}</span>
                  </button>

                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Follow-up Banner */}
      <div className="mt-8">
        <LetterSubscriptionBanner onOpenModal={() => setIsSubscriptionModalOpen(true)} />
      </div>

      {/* Unified LetterModal with Engagement & Reader Engine */}
      <LetterModal
        letter={selectedLetter}
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onSelectLetter={(l) => setSelectedLetter(l)}
      />

      <LetterSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </section>
  );
}
