import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Sparkles, BookOpen, Volume2, Eye } from 'lucide-react';
import { StrategicTheme, executiveReaderService } from '../../services/executiveReaderService';
import { kcgSound } from '../../mobile/soundEngine';

interface ExecutiveOnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

const AVAILABLE_THEMES: StrategicTheme[] = [
  'STRATÃ‰GIE',
  'TECHNOLOGIE',
  'INTELLIGENCE',
  'SOUVERAINETÃ‰',
  'LEADERSHIP',
  'Ã‰CONOMIE',
];

export default function ExecutiveOnboardingModal({
  isOpen,
  onComplete,
  onClose,
}: ExecutiveOnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedThemes, setSelectedThemes] = useState<StrategicTheme[]>([
    'SOUVERAINETÃ‰',
    'INTELLIGENCE',
    'STRATÃ‰GIE',
  ]);
  const [selectedFormat, setSelectedFormat] = useState<'read' | 'listen' | 'both'>('both');

  if (!isOpen) return null;

  const toggleTheme = (t: StrategicTheme) => {
    kcgSound.playTactileClick();
    if (selectedThemes.includes(t)) {
      if (selectedThemes.length > 1) {
        setSelectedThemes(selectedThemes.filter((item) => item !== t));
      }
    } else {
      setSelectedThemes([...selectedThemes, t]);
    }
  };

  const handleFinish = () => {
    kcgSound.playTactileClick();
    executiveReaderService.saveOnboarding(selectedThemes, selectedFormat);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 select-none">
      <div className="w-full max-w-lg rounded-3xl bg-[#09090c] border border-white/15 p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              KCG EXECUTIVE READERâ„¢ Â· CONFIGURATION
            </span>
          </div>
          <span className="text-[9px] font-mono text-neutral-500">
            Ã‰TAPE 0{step} / 03
          </span>
        </div>

        {/* ================= STEP 1: THEMES SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-white">
                Que souhaitez-vous suivre ?
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                SÃ©lectionnez les piliers doctrinaux prioritaires pour votre veille exÃ©cutive.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {AVAILABLE_THEMES.map((theme) => {
                const isSelected = selectedThemes.includes(theme);
                return (
                  <button
                    key={theme}
                    onClick={() => toggleTheme(theme)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {theme}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C8102E]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  kcgSound.playTactileClick();
                  setStep(2);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C8102E] text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:bg-[#a50d26] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>SUIVANT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: FORMAT PREFERENCE ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-white">
                Comment prÃ©fÃ©rez-vous recevoir votre briefing ?
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Adaptez le rythme de restitution Ã  vos contraintes de dirigeant.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'read' as const,
                  label: 'LIRE',
                  desc: 'SynthÃ¨ses textuelles concises en moins de 90 secondes.',
                  icon: BookOpen,
                },
                {
                  id: 'listen' as const,
                  label: 'Ã‰COUTER',
                  desc: 'Analyses audio immersives (60 Ã  120 secondes).',
                  icon: Volume2,
                },
                {
                  id: 'both' as const,
                  label: 'LES DEUX',
                  desc: 'Lecture et Ã©coute synchronisÃ©es selon vos moments de disponibilitÃ©.',
                  icon: Sparkles,
                },
              ].map((opt) => {
                const isSelected = selectedFormat === opt.id;
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      kcgSound.playTactileClick();
                      setSelectedFormat(opt.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-white/10 border-[#C8102E] shadow-md'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#C8102E] border-[#C8102E] text-white'
                          : 'bg-white/5 border-white/10 text-neutral-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                          {opt.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C8102E]" />}
                      </div>
                      <p className="text-[11px] text-neutral-400 font-light">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  kcgSound.playTactileClick();
                  setStep(1);
                }}
                className="text-[9px] font-mono text-neutral-500 hover:text-white uppercase cursor-pointer"
              >
                Retour
              </button>

              <button
                onClick={() => {
                  kcgSound.playTactileClick();
                  setStep(3);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C8102E] text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:bg-[#a50d26] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>SUIVANT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: FINAL ACCESS ================= */}
        {step === 3 && (
          <div className="space-y-6 text-center py-2 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center mx-auto text-[#C8102E]">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                Votre Espace est PrÃªt
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Vos thÃ©matiques et prÃ©fÃ©rences de briefing sont enregistrÃ©es en toute souverainetÃ© sur votre terminal.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xl active:scale-98"
            >
              ENTRER DANS MON ESPACE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
