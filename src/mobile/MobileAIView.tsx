import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Mic,
  MicOff,
  ArrowRight,
  ArrowUpRight,
  CornerDownLeft,
  RefreshCw,
  Lock,
  Brain,
  Zap,
  Compass,
  MessageSquare,
  TrendingUp,
  Layers,
  CheckCircle2,
  Database,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { kcgSound } from './soundEngine';
import { STRATEGIC_LOOP_STEPS, KRYPTON_FIVE_PILLARS, IntelligenceLoopStep } from '../sections/Intelligence';

interface QuickPrompt {
  label: string;
  query: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  { label: 'Que fait Krypton AI ?', query: 'Que fait Krypton AI ?' },
  { label: 'La Boucle StratÃ©gique', query: 'Comment fonctionne la boucle OBSERVE-APPREND ?' },
  { label: 'Quâ€™est-ce que Fiko ?', query: 'Quel est le rÃ´le de Fiko dans Krypton AI ?' },
  { label: 'Lien FIKO CONNECT', query: 'Quelle est la diffÃ©rence entre Krypton AI et FIKO CONNECT ?' },
];

export default function MobileAIView() {
  const { setActiveTab } = useMobileOSStore();
  const [selectedLoopStep, setSelectedLoopStep] = useState<IntelligenceLoopStep>('observe');
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(
    'Krypton AI est la plateforme dâ€™intelligence business de KCG. Elle connecte donnÃ©es, clients, Ã©quipes et opÃ©rations pour aider lâ€™entreprise Ã  comprendre, dÃ©cider et agir.'
  );
  const [actionButton, setActionButton] = useState<{ label: string; action: () => void } | null>({
    label: 'EXPLORER LA BOUCLE STRATÃ‰GIQUE',
    action: () => {
      setSelectedLoopStep('observe');
    }
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'fr-FR';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendQuery(transcript);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      kcgSound.playSignalPing(600);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    kcgSound.playTactileClick();
    kcgSound.playSignalPing(480);
    setInputText('');

    const lower = query.toLowerCase();

    if (lower.includes('que fait') || lower.includes('krypton') || lower.includes('plateforme') || lower.includes('quoi')) {
      setAiResponse(
        'Krypton AI est la plateforme dâ€™intelligence business de KCG. Elle connecte donnÃ©es, clients, Ã©quipes et opÃ©rations pour aider lâ€™entreprise Ã  comprendre, dÃ©cider et agir.'
      );
      setActionButton({
        label: 'DÃ‰COUVRIR LES 5 CAPACITÃ‰S',
        action: () => setActivePillarIdx(0)
      });
    } else if (lower.includes('boucle') || lower.includes('observe') || lower.includes('apprend') || lower.includes('fonctionne')) {
      setAiResponse(
        'La boucle stratÃ©gique OBSERVE â†’ COMPREND â†’ DÃ‰CIDE â†’ AGIT â†’ APPREND enrichit progressivement la comprÃ©hension de lâ€™entreprise Ã  chaque cycle dâ€™exÃ©cution.'
      );
      setActionButton({
        label: 'DÃ‰FILER LA BOUCLE',
        action: () => setSelectedLoopStep('comprend')
      });
    } else if (lower.includes('fiko') && !lower.includes('connect') && !lower.includes('one')) {
      setAiResponse(
        'Fiko est lâ€™entitÃ© et lâ€™interface dâ€™intelligence de Krypton AI. Une prÃ©sence business intelligente qui qualifie, conseille et orchestre sans Ãªtre un simple chatbot.'
      );
      setActionButton({
        label: 'VOIR LE MOAT & LA MÃ‰MOIRE',
        action: () => setActivePillarIdx(2)
      });
    } else if (lower.includes('connect') || lower.includes('whatsapp') || lower.includes('diffÃ©rence')) {
      setAiResponse(
        'Krypton AI fournit lâ€™intelligence business et dÃ©cisionnelle. FIKO CONNECT fournit lâ€™infrastructure WhatsApp Business API intelligente. Deux marques distinctes et complÃ©mentaires.'
      );
      setActionButton({
        label: 'EXPLORER Lâ€™Ã‰COSYSTÃˆME',
        action: () => setActiveTab('core')
      });
    } else {
      setAiResponse(
        'Krypton AI transforme les donnÃ©es, les interactions et les opÃ©rations en dÃ©cisions et actions concrÃ¨tes pour accÃ©lÃ©rer la croissance de lâ€™entreprise.'
      );
      setActionButton({
        label: 'EXPLORER LA BOUCLE',
        action: () => setSelectedLoopStep('observe')
      });
    }
  };

  const currentLoopData = STRATEGIC_LOOP_STEPS.find((s) => s.id === selectedLoopStep) || STRATEGIC_LOOP_STEPS[0];
  const currentPillar = KRYPTON_FIVE_PILLARS[activePillarIdx];

  return (
    <div id="krypton-mobile-container" className="w-full h-auto bg-black text-white px-4 sm:px-5 pt-20 flex flex-col text-left relative space-y-7">

      {/* ================= 1. IDENTITY & POSITIONING ================= */}
      <section data-krypton-section="hero" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              KRYPTON AI // INTELLIGENCE BUSINESS
            </span>
          </div>

          <span className="text-[7.5px] font-mono text-neutral-400 font-bold uppercase">
            FLAGSHIP KCG
          </span>
        </div>

        <h1 className="text-3xl font-display font-light uppercase tracking-tight text-white leading-none">
          L'INTELLIGENCE <br />
          <span className="font-extrabold text-[#C8102E]">OPÃ‰RATIONNELLE</span> <br />
          <span className="text-white font-light">DES ENTREPRISES.</span>
        </h1>

        <div className="space-y-2 pt-1">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
            POSITIONNEMENT
          </span>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            Krypton AI est une plateforme d'intelligence business qui connecte les donnÃ©es, les clients, les Ã©quipes et les opÃ©rations d'une entreprise afin d'automatiser l'exÃ©cution, amÃ©liorer les dÃ©cisions et accÃ©lÃ©rer la croissance.
          </p>
        </div>

        {/* Short value proposition banner */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between shadow-sm">
          <span className="text-[8.5px] font-mono text-[#C8102E] uppercase font-bold tracking-wider">Promesse</span>
          <span className="text-[10px] sm:text-xs font-display font-bold uppercase text-white tracking-tight">
            L'intelligence qui fait avancer votre entreprise.
          </span>
        </div>
      </section>

      {/* ================= 2. BOUCLE STRATÃ‰GIQUE: OBSERVE -> COMPREND -> DÃ‰CIDE -> AGIT -> APPREND ================= */}
      <section data-krypton-section="boucle" className="p-4 rounded-2xl bg-[#09090c] border border-white/[0.08] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-[#C8102E] font-bold uppercase tracking-widest">
            <RefreshCw className="w-3 h-3 animate-[spin_10s_linear_infinite]" />
            <span>BOUCLE STRATÃ‰GIQUE INFINIE</span>
          </div>
          <span className="text-[7.5px] font-mono text-neutral-400">TOUCHER UNE PHASE</span>
        </div>

        {/* 5 Step Pills (Horizontal touch targets) */}
        <div className="grid grid-cols-5 gap-1.5">
          {STRATEGIC_LOOP_STEPS.map((step) => {
            const isSelected = selectedLoopStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  kcgSound.playTactileClick();
                  setSelectedLoopStep(step.id);
                }}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center border ${
                  isSelected
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-[0_0_14px_rgba(200,16,46,0.5)]'
                    : 'bg-[#111115] border-white/5 text-neutral-400 active:scale-95'
                }`}
              >
                <span className="text-[7px] font-mono font-bold block opacity-75">{step.num}</span>
                <span className="text-[8.5px] font-display font-black uppercase tracking-tight block truncate w-full">
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Reveal Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLoopData.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1.5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-[#C8102E] font-bold uppercase tracking-wider">
                PHASE {currentLoopData.num} â€” {currentLoopData.name}
              </span>
              <span className="text-[7.5px] font-mono text-neutral-400 uppercase">
                {currentLoopData.focus}
              </span>
            </div>
            <p className="text-xs text-white font-sans font-medium leading-relaxed">
              {currentLoopData.shortDesc}
            </p>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-1 border-t border-white/5">
              {currentLoopData.fullDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================= 3. LES 5 CAPACITÃ‰S D'EXÃ‰CUTION ================= */}
      <section data-krypton-section="capacites" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            LES 5 CAPACITÃ‰S D'EXÃ‰CUTION
          </span>
          <span className="text-[7.5px] font-mono text-[#C8102E] font-bold">
            {activePillarIdx + 1} / 5
          </span>
        </div>

        {/* Capabilities Horizontal Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {KRYPTON_FIVE_PILLARS.map((pillar, idx) => {
            const isSelected = activePillarIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  kcgSound.playTactileClick();
                  setActivePillarIdx(idx);
                }}
                className={`py-2 px-3.5 rounded-xl whitespace-nowrap text-xs font-display font-bold uppercase tracking-tight transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-[#111114] border-white/5 text-neutral-400'
                }`}
              >
                {pillar.num} {pillar.title}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Card */}
        <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 space-y-2.5 text-left shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
              {currentPillar.num} â€” {currentPillar.title}
            </h3>
            <span className="text-[8px] font-mono text-[#C8102E] font-bold uppercase">CAPACITÃ‰ ACTIVE</span>
          </div>

          <p className="text-xs text-neutral-200 font-light leading-relaxed">
            {currentPillar.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5">
            {currentPillar.concepts.map((concept, cIdx) => (
              <span
                key={cIdx}
                className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/5 text-[9px] font-mono text-neutral-300"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. ARCHITECTURE VISUELLE ================= */}
      <section data-krypton-section="architecture" className="p-4 rounded-2xl bg-[#07070a] border border-white/10 space-y-3 text-left shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-[#C8102E] uppercase font-bold tracking-widest">
            ARCHITECTURE DU SYSTÃˆME
          </span>
          <span className="text-[7.5px] font-mono text-neutral-400">FLUX INTÃ‰GRÃ‰</span>
        </div>

        <div className="space-y-2 pt-1 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-neutral-300">
            <span className="text-[#C8102E] font-bold">01. DONNÃ‰ES</span>
            <span>DONNÃ‰ES â€¢ CLIENTS â€¢ Ã‰QUIPES</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1a0507] border border-[#C8102E]/30 flex items-center justify-between text-white font-bold">
            <span className="text-[#C8102E]">02. INTELLIGENCE</span>
            <span>KRYPTON AI (MOTEUR COGNITIF)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-neutral-300">
            <span className="text-[#C8102E] font-bold">03. DÃ‰CISION & ACTION</span>
            <span>ARBITRAGE â€¢ WORKFLOWS â€¢ CONSEIL</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white text-black font-display font-black text-center uppercase tracking-wider">
            CROISSANCE OPÃ‰RATIONNELLE
          </div>
        </div>
      </section>

      {/* ================= 5. BUSINESS MEMORY (LE MOAT) ================= */}
      <section data-krypton-section="business-memory" className="p-4 rounded-2xl bg-gradient-to-r from-[#180406] to-[#0a0a0d] border border-[#C8102E]/30 space-y-2 text-left shadow-lg">
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-[#C8102E]" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8102E] font-bold">
            BUSINESS MEMORY // LE MOAT
          </span>
        </div>
        <h4 className="text-xs font-display font-bold uppercase text-white">Une intelligence qui apprend en continu</h4>
        <p className="text-xs text-neutral-200 font-light leading-relaxed">
          Plus Krypton comprend l'entreprise, plus son intelligence devient pertinente et personnalisÃ©e dans la durÃ©e grÃ¢ce Ã  sa mÃ©moire contextuelle souveraine.
        </p>
      </section>

      {/* ================= 6. PRÃ‰SENCE COGNITIVE FIKO ================= */}
      <section data-krypton-section="fiko" className="p-4 rounded-2xl bg-[#0e0e12] border border-white/10 space-y-2 text-left">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-[#C8102E]" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
            FIKO // INTERFACE INTELLIGENTE
          </span>
        </div>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          Fiko est l'interface et l'entitÃ© d'intelligence de Krypton AI qui qualifie les demandes, conseille les gestionnaires et orchestre les flux sans jamais se rÃ©duire Ã  un simple chatbot.
        </p>
      </section>

      {/* ================= 7. KCG AI ASSISTANT INTERACTIF ================= */}
      <section data-krypton-section="assistant" className="p-4 rounded-2xl bg-[#111114] border border-white/[0.08] space-y-3 shadow-xl text-left">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-1.5 text-[8px] font-mono text-[#C8102E] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>KCG AI // ASSISTANT DIRECT</span>
          </div>
        </div>

        <p className="text-xs text-neutral-200 font-sans font-light leading-relaxed">
          {aiResponse}
        </p>

        {actionButton && (
          <button
            type="button"
            onClick={() => {
              kcgSound.playTactileClick();
              actionButton.action();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-between active:scale-[0.99] transition-transform cursor-pointer"
          >
            <span>{actionButton.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        )}
      </section>

      {/* ================= 8. QUESTIONS FRÃ‰QUENTES ================= */}
      <section data-krypton-section="questions" className="space-y-2 text-left">
        <span className="text-[7.5px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
          QUESTIONS FRÃ‰QUENTES
        </span>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendQuery(prompt.query)}
              className="p-3 rounded-xl bg-[#0F0F12] border border-white/[0.06] hover:border-[#C8102E]/40 text-left active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-between"
            >
              <span className="text-[10px] font-display font-bold text-white uppercase tracking-tight block">
                {prompt.label}
              </span>
              <span className="text-[7.5px] font-mono text-neutral-400 truncate block mt-0.5">
                {prompt.query}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= 9. BARRE DE COMMANDE VOCALE / TEXTE ================= */}
      <section data-krypton-section="command-bar" className="pt-1">
        <div className="p-1.5 rounded-2xl bg-[#111115] border border-white/[0.1] flex items-center gap-2 focus-within:border-[#C8102E] transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendQuery();
            }}
            placeholder="Poser une question sur Krypton AI..."
            className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none font-sans"
          />

          <button
            type="button"
            onClick={handleToggleVoice}
            aria-label={isListening ? 'ArrÃªter lâ€™Ã©coute' : 'Activer le micro'}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isListening ? 'bg-[#C8102E] text-white animate-pulse' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => handleSendQuery()}
            aria-label="Envoyer"
            className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ================= 10. FINAL PROMISE & PROMINENT CTA: VISITER KRYPTON AI â†— ================= */}
      <section data-krypton-section="cta" className="pt-4 space-y-4">
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#120507] to-black border border-[#C8102E]/40 text-center space-y-2 shadow-2xl">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block">
            KRYPTON AI // PLATEFORME OFFICIELLE
          </span>
          <h3 className="text-lg font-display font-black uppercase text-white tracking-tight leading-tight">
            L'INTELLIGENCE QUI FAIT AVANCER <br />
            <span className="text-[#C8102E]">VOTRE ENTREPRISE.</span>
          </h3>
          <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-xs mx-auto">
            DÃ©couvrez la plateforme d'intelligence opÃ©rationnelle, accÃ©dez Ã  la dÃ©monstration et intÃ©grez Krypton AI dans vos processus d'entreprise.
          </p>

          <div className="pt-3">
            <a
              id="KRYPTON_CTA_DEBUG"
              href="https://krypton-ia.tech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visiter Krypton AI"
              onClick={() => {
                kcgSound.playTactileClick();
                kcgSound.playSignalPing(550);
              }}
              className="w-full min-h-[56px] py-4 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#a50d26] text-white font-display font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] shadow-[0_0_24px_rgba(200,16,46,0.4)] border border-white/10"
            >
              <span>VISITER KRYPTON AI</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= 11. KRYPTON SCROLL END MARKER ================= */}
      <div
        id="krypton-scroll-end"
        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-500 font-mono text-[8px] text-center tracking-[0.25em] uppercase flex items-center justify-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
        <span>KRYPTON AI // COGNITIVE PROTOCOL SECURED</span>
      </div>

      {/* ================= 12. BOTTOM SAFE AREA BUFFER ================= */}
      {/* Ensures full visibility above the floating MobileOSBottomNav & Mini Player */}
      <div
        className="w-full pointer-events-none"
        style={{ height: 'calc(100px + max(env(safe-area-inset-bottom, 0px), 16px))' }}
        aria-hidden="true"
      />

    </div>
  );
}
