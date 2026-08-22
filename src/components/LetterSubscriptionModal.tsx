import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Bell, MessageCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { readerService, Reader } from '../services/readerService';
import { kcgSound } from '../mobile/soundEngine';

interface LetterSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: (reader: Reader) => void;
}

export default function LetterSubscriptionModal({
  isOpen,
  onClose,
  onSubscribed
}: LetterSubscriptionModalProps) {
  const existingProfile = readerService.getReaderProfile();
  const [firstName, setFirstName] = useState(existingProfile?.firstName || '');
  const [phone, setPhone] = useState(existingProfile?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim()) {
      setErrorMessage('Veuillez renseigner votre prÃ©nom et votre numÃ©ro WhatsApp.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    kcgSound.playTactileClick();

    try {
      const res = await readerService.subscribeToLetters(firstName, phone);
      setIsSubmitting(false);
      setIsSuccess(true);
      kcgSound.playSignalPing(600);

      if (onSubscribed) {
        onSubscribed(res.reader);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2400);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("Une erreur est survenue lors de l'enregistrement. Veuillez rÃ©essayer.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] flex flex-col justify-end sm:justify-center items-center select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal / Sheet Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full sm:max-w-lg bg-[#0A0A0C] border-t sm:border border-white/15 rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 text-left shadow-2xl overflow-hidden z-10"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 20px)' }}
          >
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8102E]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8102E]/10 border border-[#C8102E]/30 text-[8px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
                  <Bell className="w-2.5 h-2.5" />
                  <span>PROTOCOLE Ã‰DITORIAL SOUVERAIN</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
                  Recevoir les RÃ©flexions
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Fermer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4 relative z-10"
              >
                <div className="w-14 h-14 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/50 text-[#C8102E] mx-auto flex items-center justify-center shadow-lg">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-display font-black uppercase text-white tracking-tight">
                    VOUS ÃŠTES INFORMÃ‰
                  </h4>
                  <p className="text-xs text-neutral-300 font-sans max-w-sm mx-auto leading-relaxed">
                    Nous vous prÃ©viendrons sur WhatsApp lors de chaque nouvelle parution du Fondateur.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#C8102E] font-bold pt-2">
                  <Sparkles className="w-3 h-3" />
                  <span>UNE NOUVELLE LETTRE CHAQUE LUNDI</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                  Soyez informÃ© directement dÃ¨s la publication d'une nouvelle Founderâ€™s Letter. Une rÃ©flexion stratÃ©gique chaque lundi, transmise de faÃ§on sobre et confidentielle.
                </p>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-sans">
                    {errorMessage}
                  </div>
                )}

                {/* Input: First Name */}
                <div className="space-y-1.5">
                  <label className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                    Votre PrÃ©nom
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ex. Paul, Marc, Awa..."
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C8102E] font-sans"
                  />
                </div>

                {/* Input: WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                    NumÃ©ro WhatsApp (avec indicatif pays)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+225 07 00 00 00 00 / +33 6 00 00 00 00"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C8102E] font-mono"
                    />
                    <MessageCircle className="w-4 h-4 text-[#25D366] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-400 block pt-0.5">
                    Aucun message commercial agressif. DonnÃ©es protÃ©gÃ©es et confidentielles.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#C8102E]/30 active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'ENREGISTREMENT...' : 'RECEVOIR LES PROCHAINES LETTRES'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Institutional Subscription Callout Banner
 */
export function LetterSubscriptionBanner({ onOpenModal }: { onOpenModal: () => void }) {
  const isSubscribed = readerService.isSubscribed();

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120608] via-[#09090c] to-[#120608] border border-[#C8102E]/30 overflow-hidden shadow-2xl text-left my-8 select-none">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8102E]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-[8px] font-mono uppercase tracking-[0.3em] text-[#C8102E] font-bold">
            <Bell className="w-3 h-3" />
            <span>KCG INTELLIGENCE EDITORIAL NETWORK</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
            RECEVEZ LES PROCHAINES LETTRES DU FONDATEUR
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            Une nouvelle rÃ©flexion stratÃ©gique chaque lundi. AccÃ©dez aux analyses de Paul Koffmann pour anticiper les grandes transformations africaines.
          </p>
        </div>

        <div className="shrink-0">
          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-200 text-xs font-mono font-bold">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>VOUS ÃŠTES INFORMÃ‰</span>
            </div>
          ) : (
            <button
              onClick={() => {
                kcgSound.playTactileClick();
                onOpenModal();
              }}
              className="py-3 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-black text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-xl shadow-[#C8102E]/30 cursor-pointer active:scale-95"
            >
              <span>ÃŠTRE INFORMÃ‰</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
