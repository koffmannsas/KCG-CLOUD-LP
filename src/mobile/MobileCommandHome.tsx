import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Cpu, Smartphone, MessageSquare, Radio, Play, Pause, Sparkles, ShieldCheck, BookOpen } from 'lucide-react';
import KCGSovereignHeroSlider from './KCGSovereignHeroSlider';
import { useMobileOSStore } from './mobileOSStore';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
import { kcgSound } from './soundEngine';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';

export default function MobileCommandHome() {
  const { setActiveTab, setSelectedHubId, setSelectedNodeId, setIsRadioFullscreen } = useMobileOSStore();
  const { activeLetter, isPlaying, setIsPlaying, playLetter } = usePodcastStore();

  const handleNavigate = (tab: any) => {
    kcgSound.playTactileClick();
    setActiveTab(tab);
  };

  const handleOpenNode = (nodeId: string) => {
    kcgSound.playTactileClick();
    kcgSound.playSignalPing(500);
    if (nodeId === 'krypton-ai' || nodeId === 'krypton') {
      setSelectedNodeId(null);
      setActiveTab('ai');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (nodeId === 'fiko-one' || nodeId === 'fiko_one') {
      setSelectedNodeId(null);
      setActiveTab('fiko-one');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (nodeId === 'fiko-connect' || nodeId === 'fiko_connect') {
      setSelectedNodeId(null);
      setActiveTab('fiko-connect');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      setSelectedNodeId(nodeId);
      setActiveTab('core');
    }
  };

  const handleToggleRadio = (e: React.MouseEvent) => {
    e.stopPropagation();
    kcgSound.playTactileClick();
    if (!activeLetter) {
      playLetter(LETTERS[0]);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full min-h-[92svh] bg-[#000000] text-white select-none px-4 sm:px-5 pt-16 pb-32 flex flex-col justify-start overflow-x-hidden text-left relative space-y-6">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={kcgAfricaRising}
          alt="KCG Africa Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      {/* ================= 1. KCG SOVEREIGN HERO SLIDERâ„¢ ================= */}
      <div className="relative z-10 w-full pt-1">
        <KCGSovereignHeroSlider />
      </div>

      {/* ================= 2. SINGLE DYNAMIC LIVE SIGNAL ================= */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CF1A26] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CF1A26]" />
          </span>
          <div className="text-left">
            <span className="text-[7.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest block">
              SIGNAL SOUVERAIN
            </span>
            <span className="text-[10px] font-mono text-neutral-200 block font-medium">
              5 NÅ“uds Panafricains SynchronisÃ©s
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            kcgSound.playTactileClick();
            setSelectedHubId('abidjan');
            setActiveTab('network');
          }}
          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[8px] font-mono text-neutral-300 uppercase flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
        >
          <span>VOIR</span>
          <ArrowRight className="w-2.5 h-2.5 text-[#CF1A26]" />
        </button>
      </div>

      {/* ================= 3. Ã‰COSYSTÃˆME // 3 PRODUITS PHARES ================= */}
      <div className="relative z-10 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block">
            Ã‰COSYSTÃˆME // 3 PILIERS PHARES
          </span>
          <button
            onClick={() => handleNavigate('core')}
            className="text-[8px] font-mono text-[#CF1A26] uppercase font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>KCG CORE</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'krypton-ai', name: 'KRYPTON AI', category: 'COGNITION', icon: Cpu },
            { id: 'fiko-one', name: 'FIKO ONE', category: 'SUPER APP', icon: Smartphone },
            { id: 'fiko-connect', name: 'CONNECT', category: 'WHATSAPP IA', icon: MessageSquare },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleOpenNode(item.id)}
                className="p-3 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#CF1A26]/50 flex flex-col justify-between items-start text-left min-h-[90px] transition-all cursor-pointer shadow-md group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#CF1A26] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="mt-2">
                  <span className="text-[6.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest block">
                    {item.category}
                  </span>
                  <span className="text-xs font-display font-black uppercase text-white tracking-tight leading-none block mt-0.5">
                    {item.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ================= 4. KCG RADIO // LIVE INTELLIGENCE EMBED ================= */}
      <div className="relative z-10">
        <div
          onClick={() => {
            kcgSound.playTactileClick();
            setIsRadioFullscreen(true);
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#140608] via-[#0E0E12] to-[#140608] border border-[#CF1A26]/30 hover:border-[#CF1A26]/60 transition-all cursor-pointer flex items-center justify-between shadow-[0_6px_20px_rgba(207,26,38,0.12)]"
        >
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-9 h-9 rounded-xl bg-[#CF1A26] flex items-center justify-center text-white shrink-0 shadow-md">
              <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[7.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-wider">
                  KCG RADIO
                </span>
                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
              </div>
              <h4 className="text-xs font-display font-black uppercase text-white tracking-tight truncate">
                {activeLetter?.title || 'BÃ¢tir l\'Infrastructure du Futur'}
              </h4>
            </div>
          </div>

          <button
            onClick={handleToggleRadio}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-md cursor-pointer hover:bg-neutral-200"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-black" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* ================= 5. QUICK NAVIGATION CHANNELS ================= */}
      <div className="relative z-10 space-y-2">
        <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block">
          ACCÃˆS RAPIDE // CANAUX SOUVERAINS
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Action 1: Leadership du Fondateur */}
          <button
            onClick={() => handleNavigate('doctrine')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-[#160608] to-[#0d0d10] border border-[#CF1A26]/35 hover:border-[#CF1A26]/70 flex items-center gap-2.5 text-left group active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            <div className="w-7 h-7 rounded-lg bg-[#CF1A26]/20 border border-[#CF1A26]/40 flex items-center justify-center text-[#CF1A26] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-display font-bold uppercase text-white tracking-tight truncate group-hover:text-[#CF1A26] transition-colors">
                Doctrine Fondateur
              </h3>
              <span className="text-[7.5px] font-mono text-neutral-400 block truncate">
                Vision & Lettres Hebdo
              </span>
            </div>
          </button>

          {/* Action 2: RÃ©seau & Solutions */}
          <button
            onClick={() => handleNavigate('network')}
            className="p-3.5 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#CF1A26]/40 flex items-center gap-2.5 text-left group active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:text-[#CF1A26] shrink-0">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-display font-bold uppercase text-white tracking-tight truncate">
                Nos Solutions
              </h3>
              <span className="text-[7.5px] font-mono text-neutral-400 block truncate">
                Architecture & 5 Hubs
              </span>
            </div>
          </button>

          {/* Action 3: KCG AI */}
          <button
            onClick={() => handleNavigate('ai')}
            className="p-3.5 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#CF1A26]/40 flex items-center gap-2.5 text-left group active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            <div className="w-7 h-7 rounded-lg bg-[#CF1A26]/15 border border-[#CF1A26]/30 flex items-center justify-center text-[#CF1A26] shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-display font-bold uppercase text-white tracking-tight truncate">
                KCG AI
              </h3>
              <span className="text-[7.5px] font-mono text-neutral-400 block truncate">
                Cognition & Analyse
              </span>
            </div>
          </button>

          {/* Action 4: Ã‰cosystÃ¨me & Core */}
          <button
            onClick={() => handleNavigate('core')}
            className="p-3.5 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#CF1A26]/40 flex items-center gap-2.5 text-left group active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300 group-hover:text-[#CF1A26] shrink-0">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-display font-bold uppercase text-white tracking-tight truncate">
                KCG Core
              </h3>
              <span className="text-[7.5px] font-mono text-neutral-400 block truncate">
                Venture & Piliers
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
