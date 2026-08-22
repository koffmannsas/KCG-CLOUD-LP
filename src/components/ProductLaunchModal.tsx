import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { submitLaunchInterest } from '../services/leadCaptureService';
import { kcgSound } from '../mobile/soundEngine';

export interface ProductLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: 'fiko-one' | 'fiko-connect';
  source?: 'kcg-mobile-os' | 'kcg-desktop';
}

export default function ProductLaunchModal({
  isOpen,
  onClose,
  product,
  source = 'kcg-mobile-os'
}: ProductLaunchModalProps) {
  const [firstName, setFirstName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [countryCode, setCountryCode] = useState('+225');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isFikoOne = product === 'fiko-one';
  const brandName = isFikoOne ? 'FIKO ONE' : 'FIKO CONNECT';
  const productDisplay = isFikoOne ? 'FIKO ONE' : 'FIKO Connect';

  // Reset states when opened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMessage(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedFirstName = firstName.trim();
    if (!trimmedFirstName) {
      setErrorMessage('Veuillez renseigner votre prÃ©nom.');
      return;
    }

    const trimmedPhone = whatsapp.trim();
    if (!trimmedPhone) {
      setErrorMessage('Veuillez saisir votre numÃ©ro WhatsApp.');
      return;
    }

    // Combine prefix if not already present
    let fullWhatsApp = trimmedPhone;
    if (!trimmedPhone.startsWith('+')) {
      fullWhatsApp = `${countryCode} ${trimmedPhone}`;
    }

    // Validation
    const digitsOnly = fullWhatsApp.replace(/\D/g, '');
    if (digitsOnly.length < 6) {
      setErrorMessage('Veuillez saisir un numÃ©ro WhatsApp valide.');
      return;
    }

    setIsSubmitting(true);
    kcgSound.playTactileClick();

    try {
      const res = await submitLaunchInterest({
        product,
        firstName: trimmedFirstName,
        whatsapp: fullWhatsApp,
        source
      });

      if (res.success) {
        kcgSound.playConfirmation();
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    kcgSound.playTactileClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-end md:items-center justify-center p-0 md:p-4 select-none">
          {/* Backdrop with smooth opacity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal / Bottom Sheet Container */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0c0c0f] border-t md:border border-white/15 rounded-t-[32px] md:rounded-[28px] text-white shadow-[0_-20px_50px_rgba(0,0,0,0.95)] max-h-[90dvh] md:max-h-[85vh] flex flex-col z-10 text-left overflow-hidden"
          >
            {/* Top Sheet Header */}
            <div className="pt-3 px-6 sm:px-8 pb-2 flex-shrink-0 relative">
              {/* Drag indicator on mobile */}
              <div className="w-12 h-1 bg-white/25 rounded-full mx-auto mb-3 md:hidden" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Sheet Body with dedicated bottom-nav safe area */}
            <div
              ref={contentRef}
              className="overflow-y-auto overscroll-contain px-6 sm:px-8 pb-4 flex-1 space-y-5"
              style={{
                paddingBottom: 'calc(96px + max(env(safe-area-inset-bottom, 0px), 16px))'
              }}
            >
              {!isSubmitted ? (
                <div className="space-y-5">
                  {/* Brand Tagline */}
                  <div className="space-y-1.5 pr-8">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
                      <span className="text-[9px] font-mono text-[#C8102E] uppercase tracking-[0.25em] font-bold">
                        {brandName}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
                      SOYEZ PARMI LES PREMIERS INFORMÃ‰S.
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pt-1">
                      Le lancement officiel de {productDisplay} approche. Laissez-nous vos coordonnÃ©es et nous vous informerons dÃ¨s son ouverture.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    {/* Field: PrÃ©nom */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
                        PRÃ‰NOM <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prÃ©nom"
                        className="w-full h-12 px-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] transition-all font-sans"
                      />
                    </div>

                    {/* Field: WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
                        NUMÃ‰RO WHATSAPP <span className="text-[#C8102E]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-12 px-3 rounded-xl bg-black/60 border border-white/15 text-neutral-200 text-xs font-mono focus:outline-none focus:border-[#C8102E] transition-all shrink-0 cursor-pointer"
                        >
                          <option value="+225">CI (+225)</option>
                          <option value="+33">FR (+33)</option>
                          <option value="+221">SN (+221)</option>
                          <option value="+237">CM (+237)</option>
                          <option value="+229">BJ (+229)</option>
                          <option value="+228">TG (+228)</option>
                          <option value="+243">CD (+243)</option>
                          <option value="+1">US/CA (+1)</option>
                          <option value="+44">UK (+44)</option>
                          <option value="+">Autre (+)</option>
                        </select>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="07 00 00 00 00"
                          className="w-full h-12 px-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-sans">
                        {errorMessage}
                      </div>
                    )}

                    {/* Consent text */}
                    <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                      En vous inscrivant, vous acceptez d'Ãªtre informÃ© du lancement officiel de {brandName}.
                    </p>

                    {/* Submit Button CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[56px] py-4 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#a60d26] text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>INSCRIPTION EN COURSâ€¦</span>
                          </>
                        ) : (
                          <>
                            <span>M'INFORMER DU LANCEMENT</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success Confirmation View */
                <div className="py-6 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.25em] font-bold block">
                      INSCRIPTION CONFIRMÃ‰E
                    </span>
                    <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white">
                      C'EST NOTÃ‰.
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-sm mx-auto leading-relaxed">
                      Nous vous informerons dÃ¨s le lancement officiel de {productDisplay}.
                    </p>
                  </div>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      onClick={handleClose}
                      className="w-full min-h-[52px] py-3 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      FERMER
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
