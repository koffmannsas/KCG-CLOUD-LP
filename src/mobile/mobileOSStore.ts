import { create } from 'zustand';

export type MobileTab = 'home' | 'network' | 'core' | 'ai' | 'doctrine' | 'more' | 'fiko-one' | 'fiko-connect';

export interface MobileOSState {
  // Navigation
  activeTab: MobileTab;
  setActiveTab: (tab: MobileTab) => void;

  // Selected Objects
  selectedHubId: string | null;
  setSelectedHubId: (id: string | null) => void;

  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;

  selectedLetterId: number | null;
  setSelectedLetterId: (id: number | null) => void;

  // Fullscreen Modals (Level 3)
  isRadioFullscreen: boolean;
  setIsRadioFullscreen: (open: boolean) => void;

  // Radio Visibility
  isRadioVisible: boolean;
  setIsRadioVisible: (visible: boolean) => void;

  // Bottom Sheets (Level 2)
  isContactSheetOpen: boolean;
  setIsContactSheetOpen: (open: boolean) => void;

  isNodeSheetOpen: boolean;
  setIsNodeSheetOpen: (open: boolean) => void;

  // Sound Mute preference
  isSoundMuted: boolean;
  toggleSound: () => void;

  // AI Direct Actions
  triggerAIAction: (action: { type: 'navigate' | 'select_hub' | 'select_node' | 'open_letter' | 'open_radio' | 'open_contact'; payload: any }) => void;
}

export const useMobileOSStore = create<MobileOSState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    if (tab === 'ai' || tab === 'fiko-one' || tab === 'fiko-connect') {
      set({ selectedNodeId: null, isNodeSheetOpen: false });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  },

  selectedHubId: 'abidjan',
  setSelectedHubId: (id) => set({ selectedHubId: id }),

  selectedNodeId: null,
  setSelectedNodeId: (id) => {
    if (id === 'krypton-ai' || id === 'krypton') {
      set({ activeTab: 'ai', selectedNodeId: null, isNodeSheetOpen: false });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }
    if (id === 'fiko-one' || id === 'fiko_one') {
      set({ activeTab: 'fiko-one', selectedNodeId: null, isNodeSheetOpen: false });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }
    if (id === 'fiko-connect' || id === 'fiko_connect') {
      set({ activeTab: 'fiko-connect', selectedNodeId: null, isNodeSheetOpen: false });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }
    set({ selectedNodeId: id, isNodeSheetOpen: !!id });
  },

  selectedLetterId: null,
  setSelectedLetterId: (id) => set({ selectedLetterId: id }),

  isRadioFullscreen: false,
  setIsRadioFullscreen: (open) => set({ isRadioFullscreen: open, isRadioVisible: true }),

  isRadioVisible: true,
  setIsRadioVisible: (visible) => set({ isRadioVisible: visible }),

  isContactSheetOpen: false,
  setIsContactSheetOpen: (open) => set({ isContactSheetOpen: open }),

  isNodeSheetOpen: false,
  setIsNodeSheetOpen: (open) => set({ isNodeSheetOpen: open }),

  isSoundMuted: false,
  toggleSound: () => set((state) => ({ isSoundMuted: !state.isSoundMuted })),

  triggerAIAction: (action) => {
    if (action.type === 'navigate') {
      set({ activeTab: action.payload });
      if (action.payload === 'ai' || action.payload === 'fiko-one' || action.payload === 'fiko-connect') {
        set({ selectedNodeId: null, isNodeSheetOpen: false });
      }
    } else if (action.type === 'select_hub') {
      set({ activeTab: 'network', selectedHubId: action.payload });
    } else if (action.type === 'select_node') {
      if (action.payload === 'krypton-ai' || action.payload === 'krypton') {
        set({ activeTab: 'ai', selectedNodeId: null, isNodeSheetOpen: false });
      } else if (action.payload === 'fiko-one' || action.payload === 'fiko_one') {
        set({ activeTab: 'fiko-one', selectedNodeId: null, isNodeSheetOpen: false });
      } else if (action.payload === 'fiko-connect' || action.payload === 'fiko_connect') {
        set({ activeTab: 'fiko-connect', selectedNodeId: null, isNodeSheetOpen: false });
      } else {
        set({ activeTab: 'core', selectedNodeId: action.payload, isNodeSheetOpen: true });
      }
    } else if (action.type === 'open_letter') {
      set({ selectedLetterId: action.payload });
    } else if (action.type === 'open_radio') {
      set({ isRadioFullscreen: true });
    } else if (action.type === 'open_contact') {
      set({ isContactSheetOpen: true });
    }
  }
}));
