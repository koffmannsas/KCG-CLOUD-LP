import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageSquare,
  Eye,
  Share2,
  Check,
  Send,
  Sparkles,
  MessageCircle,
  Copy,
  Bookmark,
  BookmarkCheck,
  Play,
  Pause,
  ArrowRight,
  Clock,
  RotateCcw
} from 'lucide-react';
import { letterEngagementService, LetterStats, LetterComment } from '../services/letterEngagementService';
import { readerService } from '../services/readerService';
import { Letter } from '../data/letters';
import { cn } from '../lib/utils';
import { kcgSound } from '../mobile/soundEngine';
import { usePodcastStore } from '../store/podcastStore';

interface LetterEngagementBarProps {
  letter: Letter;
  onScrollToComments: () => void;
}

export function LetterEngagementBar({ letter, onScrollToComments }: LetterEngagementBarProps) {
  const [stats, setStats] = useState<LetterStats>(() =>
    letterEngagementService.getLetterStats(letter.id)
  );
  const [isSaved, setIsSaved] = useState<boolean>(() =>
    readerService.isLetterSaved(letter.id)
  );
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initial fetch
    setStats(letterEngagementService.getLetterStats(letter.id));
    setIsSaved(readerService.isLetterSaved(letter.id));

    // Subscribe to engagement stats updates
    const unsubscribeEngagement = letterEngagementService.subscribe(letter.id, () => {
      setStats(letterEngagementService.getLetterStats(letter.id));
    });

    // Subscribe to reader service updates
    const unsubscribeReader = readerService.subscribe(() => {
      setIsSaved(readerService.isLetterSaved(letter.id));
    });

    // Start view dwell session (5s minimum threshold)
    letterEngagementService.startViewSession(letter.id);

    return () => {
      unsubscribeEngagement();
      unsubscribeReader();
      letterEngagementService.cancelViewSession(letter.id);
    };
  }, [letter.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    setIsLiking(true);
    letterEngagementService.toggleLike(letter.id);
    setTimeout(() => setIsLiking(false), 200);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    setIsSaving(true);
    const newSaved = readerService.toggleSaveLetter(letter.id);
    setIsSaved(newSaved);
    if (newSaved) {
      kcgSound.playSignalPing(520);
    }
    setTimeout(() => setIsSaving(false), 200);
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();

    // Check if navigator.share exists (e.g., mobile)
    if (typeof navigator !== 'undefined' && (navigator as any).share && /Mobi|Android/i.test(navigator.userAgent)) {
      const res = await letterEngagementService.shareLetter(letter.id, letter.title);
      if (res.method === 'clipboard' && res.shared) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } else {
      setShowShareMenu((prev) => !prev);
    }
  };

  const handleCopyLink = async () => {
    const url = letterEngagementService.getShareUrl(letter.id);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleWhatsAppDirect = () => {
    const url = letterEngagementService.getShareUrl(letter.id);
    letterEngagementService.shareViaWhatsApp(letter.title, url);
    setShowShareMenu(false);
  };

  // Format view count for mobile / desktop
  const formattedViews = stats.viewCount > 999
    ? `${(stats.viewCount / 1000).toFixed(1).replace('.0', '')}K`
    : stats.viewCount.toString();

  return (
    <div className="relative my-4 select-none">
      <div className="w-full rounded-2xl bg-[#09090c] border border-white/10 px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-3 shadow-xl overflow-x-auto no-scrollbar">
        {/* 1. LIKE ACTION */}
        <button
          onClick={handleLike}
          aria-label={stats.userLiked ? "Je n'aime plus" : "J'aime cette lettre"}
          className={cn(
            "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl transition-all cursor-pointer group shrink-0",
            stats.userLiked
              ? "bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/40"
              : "hover:bg-white/5 text-neutral-300 hover:text-white"
          )}
        >
          <motion.div
            animate={isLiking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors",
                stats.userLiked ? "fill-[#C8102E] text-[#C8102E]" : "text-neutral-400 group-hover:text-white"
              )}
            />
          </motion.div>
          <span className="text-[11px] sm:text-xs font-mono font-bold">
            {stats.likeCount}
          </span>
          <span className="hidden lg:inline text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">
            {stats.likeCount <= 1 ? 'LIKE' : 'LIKES'}
          </span>
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/10 shrink-0" />

        {/* 2. COMMENTS JUMP */}
        <button
          onClick={onScrollToComments}
          aria-label="AccÃ©der aux rÃ©actions des lecteurs"
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl hover:bg-white/5 text-neutral-300 hover:text-white transition-all cursor-pointer group shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-white transition-colors" />
          <span className="text-[11px] sm:text-xs font-mono font-bold">
            {stats.commentCount}
          </span>
          <span className="hidden lg:inline text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">
            {stats.commentCount <= 1 ? 'RÃ‰ACTION' : 'RÃ‰ACTIONS'}
          </span>
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/10 shrink-0" />

        {/* 3. SAVE / BOOKMARK ACTION */}
        <button
          onClick={handleSave}
          aria-label={isSaved ? "Lettre sauvegardÃ©e" : "Sauvegarder cette lettre"}
          className={cn(
            "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl transition-all cursor-pointer group shrink-0",
            isSaved
              ? "bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/40"
              : "hover:bg-white/5 text-neutral-300 hover:text-white"
          )}
        >
          <motion.div
            animate={isSaving ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isSaved ? (
              <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8102E]" />
            ) : (
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-white" />
            )}
          </motion.div>
          <span className="text-[10px] sm:text-xs font-mono font-bold">
            {isSaved ? 'SauvegardÃ©e' : 'Sauvegarder'}
          </span>
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/10 shrink-0" />

        {/* 4. VIEWS COUNTER */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-neutral-400 shrink-0">
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-neutral-200">
            <span className="sm:hidden">{formattedViews}</span>
            <span className="hidden sm:inline">{stats.viewCount.toLocaleString('fr-FR')}</span>
          </span>
          <span className="hidden lg:inline text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">
            LECTURES
          </span>
        </div>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/10 shrink-0" />

        {/* 5. SHARE BUTTON */}
        <div className="relative shrink-0">
          <button
            onClick={handleShareClick}
            aria-label="Partager cette rÃ©flexion"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#C8102E] text-neutral-200 hover:text-white border border-white/10 transition-all cursor-pointer text-[10px] sm:text-xs font-mono uppercase font-bold tracking-wider"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">COPIÃ‰</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">PARTAGER</span>
              </>
            )}
          </button>

          {/* Desktop Share Menu Popup */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-[#0e0e12] border border-white/15 shadow-2xl z-50 space-y-2 text-left"
              >
                <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
                  TRANSMETTRE LA RÃ‰FLEXION
                </div>

                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 flex items-center gap-2.5 text-left text-xs font-sans text-white transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-white text-[11px]">Partager sur WhatsApp</span>
                    <span className="text-[9px] text-neutral-400 block truncate">Message officiel prÃ©-rÃ©digÃ©</span>
                  </div>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 text-left text-xs font-sans text-white transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-white text-[11px]">
                      {copied ? 'Lien copiÃ© dans le presse-papier' : 'Copier le lien direct'}
                    </span>
                    <span className="text-[9px] text-neutral-400 block truncate">URL pÃ©renne de la lettre</span>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * Reading Progress Banner ("REPRENDRE LA LECTURE")
 */
interface ReadingProgressBannerProps {
  progress: number;
  onResume: () => void;
}

export function ReadingProgressBanner({ progress, onResume }: ReadingProgressBannerProps) {
  if (progress <= 10 || progress >= 95) return null;

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-[#0e0e13] border border-white/10 flex items-center justify-between gap-3 shadow-lg select-none my-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <RotateCcw className="w-4 h-4 text-[#C8102E] shrink-0" />
        <div className="min-w-0">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block">
            LECTURE EN COURS Â· PROGRESSION ({progress}%)
          </span>
          <div className="w-32 sm:w-48 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-[#C8102E] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onResume}
        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#C8102E] text-white text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer shrink-0"
      >
        Reprendre
      </button>
    </div>
  );
}

/**
 * Recommendation Card ("Ã€ LIRE ENSUITE" / "LA PROCHAINE RÃ‰FLEXION")
 */
interface LetterRecommendationCardProps {
  currentLetterId: number;
  onSelectLetter: (letter: Letter) => void;
}

export function LetterRecommendationCard({
  currentLetterId,
  onSelectLetter
}: LetterRecommendationCardProps) {
  const recommended = readerService.getRecommendedLetter(currentLetterId);
  const { playLetter, activeLetter, isPlaying } = usePodcastStore();

  const isCurrentAudio = activeLetter?.id === recommended.id && isPlaying;

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playSignalPing(440);
    playLetter(recommended);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120608] via-[#09090c] to-[#0e0a0d] border border-white/15 space-y-4 text-left shadow-2xl my-8 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            Ã€ LIRE ENSUITE // LA PROCHAINE RÃ‰FLEXION
          </span>
        </div>
        <span className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">
          LET 00{recommended.id}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
            {recommended.category}
          </span>
          <h4 className="text-base sm:text-xl font-display font-black uppercase text-white tracking-tight leading-snug">
            {recommended.title}
          </h4>
          <p className="text-xs text-neutral-300 font-light line-clamp-2 leading-relaxed">
            {recommended.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleAudio}
            className={`flex-1 sm:flex-none py-2.5 px-4 rounded-xl border text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCurrentAudio
                ? 'bg-[#C8102E] border-[#C8102E] text-white font-bold animate-pulse'
                : 'bg-white/5 border-white/10 text-neutral-200 hover:bg-white/10'
            }`}
          >
            {isCurrentAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isCurrentAudio ? 'Ã‰coute' : recommended.duration}</span>
          </button>

          <button
            onClick={() => {
              kcgSound.playTactileClick();
              onSelectLetter(recommended);
            }}
            className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <span>LIRE LA LETTRE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface LetterCommentsSectionProps {
  letter: Letter;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}

export function LetterCommentsSection({ letter, sectionRef }: LetterCommentsSectionProps) {
  const [comments, setComments] = useState<LetterComment[]>(() =>
    letterEngagementService.getComments(letter.id)
  );
  const [visibleCount, setVisibleCount] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    setComments(letterEngagementService.getComments(letter.id));
    const unsubscribe = letterEngagementService.subscribe(letter.id, () => {
      setComments(letterEngagementService.getComments(letter.id));
    });
    return () => unsubscribe();
  }, [letter.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    kcgSound.playTactileClick();

    const created = letterEngagementService.addComment(
      letter.id,
      authorName.trim() || 'Lecteur KCG',
      authorRole.trim() || 'Dirigeant / DÃ©cideur',
      content.trim()
    );

    setIsSubmitting(false);

    if (created) {
      setContent('');
      kcgSound.playSignalPing(560);
      setFeedbackMsg('Votre rÃ©flexion a Ã©tÃ© soumise avec succÃ¨s.');
      setTimeout(() => setFeedbackMsg(null), 3500);
    } else {
      setFeedbackMsg('Impossible de publier ce message pour le moment.');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const handleLikeComment = (commentId: string) => {
    kcgSound.playTactileClick();
    letterEngagementService.toggleCommentLike(commentId);
  };

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div
      ref={sectionRef as any}
      className="pt-12 sm:pt-16 mt-12 border-t border-white/10 space-y-8 text-left select-none"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              LA PAROLE AUX LECTEURS // DIALOGUE INSTITUTIONNEL
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            VOS RÃ‰ACTIONS
          </h3>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-neutral-300">
          {comments.length} {comments.length <= 1 ? 'RÃ‰ACTION' : 'RÃ‰ACTIONS'}
        </span>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-7 rounded-3xl bg-[#09090c] border border-white/10 space-y-4 shadow-xl">
        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
          PARTAGEZ VOTRE RÃ‰FLEXION STRATÃ‰GIQUE
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Votre prÃ©nom ou nom *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8102E] font-sans"
          />

          <input
            type="text"
            placeholder="Votre titre ou institution (ex. CEO, Investisseur...)"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8102E] font-sans"
          />
        </div>

        <div className="space-y-1">
          <textarea
            required
            rows={3}
            maxLength={1000}
            placeholder="Partagez votre point de vue sur les orientations de cette lettre..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8102E] resize-none font-sans leading-relaxed"
          />
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 px-1">
            <span>ModÃ©ration a priori Â· Respect de la dÃ©ontologie Ã©ditoriale</span>
            <span>{content.length} / 1000</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          {feedbackMsg ? (
            <span className="text-xs font-mono text-emerald-400 font-bold">
              âœ“ {feedbackMsg}
            </span>
          ) : (
            <span className="text-[9px] font-mono text-neutral-400 hidden sm:inline">
              VisibilitÃ© publique auprÃ¨s de la communautÃ© des dÃ©cideurs
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#C8102E] hover:bg-[#a60d26] disabled:opacity-40 text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>PUBLIER LA RÃ‰ACTION</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {visibleComments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
            <MessageSquare className="w-6 h-6 text-neutral-400 mx-auto" />
            <p className="text-xs sm:text-sm text-neutral-300 font-sans">
              Soyez le premier Ã  partager votre rÃ©flexion.
            </p>
          </div>
        ) : (
          visibleComments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#09090c] border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-display font-black text-xs text-white">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-display font-black uppercase text-white">
                      {comment.authorName}
                    </h4>
                    {comment.authorRole && (
                      <span className="text-[9px] font-mono text-neutral-400 block">
                        {comment.authorRole}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[8.5px] font-mono text-neutral-400">
                    {comment.createdAt}
                  </span>

                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    aria-label="Aimer ce commentaire"
                    className={`flex items-center gap-1 text-[10px] font-mono transition-colors cursor-pointer py-1 px-1.5 rounded-lg hover:bg-white/5 ${
                      comment.userLiked ? 'text-[#C8102E]' : 'text-neutral-400 hover:text-[#C8102E]'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.userLiked ? 'fill-[#C8102E]' : ''}`} />
                    <span>{comment.likes || 0}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 font-sans font-light leading-relaxed">
                Â« {comment.content} Â»
              </p>
            </div>
          ))
        )}

        {/* Load More Trigger */}
        {comments.length > visibleCount && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-200 uppercase font-bold tracking-widest transition-all cursor-pointer"
            >
              VOIR PLUS DE RÃ‰ACTIONS ({comments.length - visibleCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
