import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Smartphone,
  MessageSquare,
  Shield,
  Radio,
  Play,
  Pause,
  ArrowRight,
  X,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Lock,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useMobileOSStore } from './mobileOSStore';
import { usePodcastStore } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
import { kcgSound } from './soundEngine';

export interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  categoryTag: string;
  icon: any;
  description: string;
  fullRole: string;
  impactNourishes: string;
  metric: string;
  status: 'active' | 'available';
  highlightColor: string;
  capabilities: string[];
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'krypton-ai',
    name: 'KRYPTON AI',
    category: 'INTELLIGENCE',
    categoryTag: 'Intelligence Business & OpÃ©rationnelle',
    icon: Cpu,
    description: 'L\'intelligence opÃ©rationnelle des entreprises.',
    fullRole: 'Plateforme d\'intelligence business qui connecte les donnÃ©es, les clients, les Ã©quipes et les opÃ©rations afin d\'automatiser l\'exÃ©cution, amÃ©liorer les dÃ©cisions et accÃ©lÃ©rer la croissance.',
    impactNourishes: 'Alimente l\'Ã©cosystÃ¨me en modÃ©lisation contextuelle (Customer 360, Business Memory) et orchestre les flux dÃ©cisionnels avec l\'entitÃ© cognitive Fiko.',
    metric: 'Architecture Multi-ModÃ¨les',
    status: 'active',
    highlightColor: '#CF1A26',
    capabilities: [
      'Boucle stratÃ©gique : Observe, Comprend, DÃ©cide, Agit, Apprend',
      '5 piliers : AcquÃ©rir, Converser, Comprendre, Agir, DÃ©cider',
      'Business Memory : contexte et apprentissage continu',
      'PrÃ©sence cognitive Fiko pour le conseil et l\'orchestration'
    ]
  },
  {
    id: 'fiko-one',
    name: 'FIKO ONE',
    category: 'SUPER APP',
    categoryTag: 'Super App Multiservices du Quotidien',
    icon: Smartphone,
    description: 'L\'application universelle unifiant les services essentiels du continent.',
    fullRole: 'Plateforme tout-en-un rÃ©unissant mobilitÃ©, livraisons, paiements instantanÃ©s et commerce de proximitÃ© dans une expÃ©rience fluide, ultra-rapide et intuitive.',
    impactNourishes: 'S\'appuie sur KCG Core pour la rÃ©silience infrastructurelle et sur Krypton AI pour l\'optimisation en temps rÃ©el des trajets, de l\'attribution et de la tarification.',
    metric: '99.99% DisponibilitÃ© SystÃ¨me',
    status: 'active',
    highlightColor: '#FFFFFF',
    capabilities: [
      'Hub multiservices tout-en-un (MobilitÃ©, Livraisons, Services)',
      'Portefeuille numÃ©rique instantanÃ© sans friction',
      'Interface intuitive adaptÃ©e aux rÃ©alitÃ©s locales',
      'Connexion directe avec les commerÃ§ants de proximitÃ©'
    ]
  },
  {
    id: 'fiko-connect',
    name: 'FIKO CONNECT',
    category: 'WHATSAPP IA',
    categoryTag: 'WhatsApp Business Intelligent & Orchestration WABA',
    icon: MessageSquare,
    description: 'Transformez WhatsApp en un canal de vente et de support automatisÃ©.',
    fullRole: 'Plateforme d\'orchestration WhatsApp Business API connectant les entreprises directement Ã  leurs clients grÃ¢ce Ã  des agents conversationnels alimentÃ©s par Krypton AI.',
    impactNourishes: 'BÃ©nÃ©ficie de la bande passante et de la sÃ©curitÃ© de KCG Core, tout en traduisant les flux transactionnels vers FIKO ONE.',
    metric: '8,400 msg/s DÃ©bit WABA',
    status: 'active',
    highlightColor: '#25D366',
    capabilities: [
      'IntÃ©gration officielle WhatsApp Cloud API (WABA)',
      'Agents de vente et support pilotÃ©s par Krypton AI',
      'Gestion multi-agents et routage conversationnel intelligent',
      'Paiements et confirmations de commande dans le chat'
    ]
  }
];

export default function MobileCoreView() {
  const { setActiveTab, selectedNodeId, setSelectedNodeId } = useMobileOSStore();
  const { activeLetter, isPlaying, setIsPlaying, playLetter } = usePodcastStore();
  const [selectedNode, setSelectedNode] = useState<EcosystemNode | null>(() => {
    if (selectedNodeId === 'krypton-ai' || selectedNodeId === 'fiko-one' || selectedNodeId === 'fiko-connect') return null;
    return ECOSYSTEM_NODES.find((n) => n.id === selectedNodeId) || null;
  });

  React.useEffect(() => {
    if (selectedNodeId === 'krypton-ai') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('ai');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (selectedNodeId === 'fiko-one') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('fiko-one');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (selectedNodeId === 'fiko-connect') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('fiko-connect');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [selectedNodeId, setActiveTab, setSelectedNodeId]);

  const handleOpenNode = (node: EcosystemNode) => {
    kcgSound.playTactileClick();
    kcgSound.playSignalPing(480);
    if (node.id === 'krypton-ai') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('ai');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    if (node.id === 'fiko-one') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('fiko-one');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    if (node.id === 'fiko-connect') {
      setSelectedNodeId(null);
      setSelectedNode(null);
      setActiveTab('fiko-connect');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    setSelectedNode(node);
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
    <div className="w-full min-h-[92svh] bg-[#000000] text-white select-none px-4 sm:px-5 pt-20 pb-36 flex flex-col justify-start overflow-x-hidden text-left relative space-y-7">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#CF1A26]/[0.07] rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= 1. IDENTITY & SYSTEM CONTEXT ================= */}
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CF1A26] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CF1A26]" />
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#CF1A26] uppercase font-bold">
              KCG SOVEREIGN CORE
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[8px] font-mono text-neutral-300 uppercase tracking-widest font-semibold">
            3 PILIERS PHARES
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight leading-none">
          KCG Core & Ã‰cosystÃ¨me
        </h1>
        <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed max-w-[95%]">
          KCG Core constitue l'infrastructure commune et le systÃ¨me nerveux partagÃ© qui alimente nos trois plateformes technologiques majeures.
        </p>
      </div>

      {/* ================= 2. COMMON INFRASTRUCTURE HUB CARD ================= */}
      <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#160608] via-[#0E0E12] to-[#0A0A0C] border border-[#CF1A26]/30 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#CF1A26] flex items-center justify-center text-white shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[7.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest block">
                INFRASTRUCTURE COMMUNE
              </span>
              <h3 className="text-sm font-display font-black uppercase text-white tracking-tight">
                KCG CORE NERVOUS SYSTEM
              </h3>
            </div>
          </div>

          <span className="text-[7.5px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
            AES-256 SOUVERAIN
          </span>
        </div>

        <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
          Socle unifiÃ© de serveurs privÃ©s, gouvernance cryptographique et bande passante locale interconnectant Krypton AI, FIKO ONE et FIKO CONNECT sans dÃ©pendance externe.
        </p>
      </div>

      {/* ================= 3. LES 3 NÅ’UDS PHARES ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white font-bold flex items-center gap-1.5">
            <span className="w-1 h-3 rounded-full bg-[#CF1A26]" />
            PLATEFORMES D'EXCELLENCE
          </span>
          <span className="text-[8px] font-mono text-[#8A8A8A] uppercase">3 PRODUITS</span>
        </div>

        <div className="space-y-3">
          {ECOSYSTEM_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenNode(node)}
                className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#CF1A26]/50 transition-all cursor-pointer shadow-md group relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#08080A] border border-white/[0.08] flex items-center justify-center text-white shrink-0 group-hover:text-[#CF1A26] transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[7.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest">
                          {node.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-600" />
                        <span className="text-[7.5px] font-mono text-neutral-400">
                          {node.metric}
                        </span>
                      </div>

                      <h3 className="text-sm font-display font-black uppercase text-white tracking-tight mt-0.5 truncate">
                        {node.name}
                      </h3>

                      <p className="text-[11px] text-[#8A8A8A] font-sans mt-1 line-clamp-2 leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white shrink-0 mt-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= 4. RADIO EMBED ================= */}
      <div className="pt-2">
        <div
          onClick={handleToggleRadio}
          className="p-3.5 rounded-2xl bg-[#0F0F13] border border-white/[0.08] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#CF1A26]/20 border border-[#CF1A26]/40 flex items-center justify-center text-[#CF1A26]">
              <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <span className="text-[7.5px] font-mono text-[#CF1A26] uppercase font-bold tracking-wider block">
                KCG RADIO STRATÃ‰GIQUE
              </span>
              <span className="text-xs font-display font-bold uppercase text-white tracking-tight block">
                {isPlaying ? 'Diffusion en cours' : 'Ã‰couter la Vision KCG'}
              </span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
            {isPlaying ? <Pause className="w-3 h-3 fill-black" /> : <Play className="w-3 h-3 fill-black ml-0.5" />}
          </div>
        </div>
      </div>

      {/* ================= 5. NODE DETAIL MODAL (LEVEL 2/3) ================= */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0E0E12] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 space-y-6 max-h-[85svh] overflow-y-auto no-scrollbar shadow-2xl z-10 text-left"
            >
              {/* Header Close */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CF1A26]">
                    <selectedNode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest block">
                      {selectedNode.categoryTag}
                    </span>
                    <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                      {selectedNode.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Strategic Role */}
              <div className="space-y-2">
                <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  RÃ”LE STRATÃ‰GIQUE
                </span>
                <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                  {selectedNode.fullRole}
                </p>
              </div>

              {/* Core Synergy */}
              <div className="p-3.5 rounded-xl bg-[#140608] border border-[#CF1A26]/30 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#CF1A26]" />
                  <span className="text-[8px] font-mono text-[#CF1A26] uppercase font-bold tracking-widest">
                    SYNERGIE AVEC KCG CORE
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                  {selectedNode.impactNourishes}
                </p>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-2.5">
                <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                  CAPACITÃ‰S PHARES
                </span>
                <ul className="space-y-2">
                  {selectedNode.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CF1A26] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const targetId = selectedNode.id;
                    setSelectedNode(null);
                    if (targetId === 'krypton-ai') {
                      setActiveTab('ai');
                    } else if (targetId === 'fiko-one') {
                      setActiveTab('fiko-one');
                    } else if (targetId === 'fiko-connect') {
                      setActiveTab('fiko-connect');
                    } else {
                      setActiveTab('home');
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg"
                >
                  <span>
                    {selectedNode.id === 'krypton-ai' ? 'Lancer Krypton AI' :
                     selectedNode.id === 'fiko-one' ? 'DÃ©couvrir FIKO ONE' :
                     selectedNode.id === 'fiko-connect' ? 'DÃ©couvrir FIKO Connect' : 'AccÃ©der au Portail'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
