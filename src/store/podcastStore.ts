import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Letter } from '../data/letters';

export const globalAudio = typeof window !== 'undefined' ? new Audio() : null;
export const globalAudioCache = new Map<string, string>();

export type UserIntention = 'IA' | 'BUSINESS' | 'TALENT' | 'VISION' | 'GENERAL';
export type EmotionalState = 'FASCINATED' | 'RUSHED' | 'CONTEMPLATIVE' | 'ACTIVE' | 'NEUTRAL';

interface PodcastState {
  isPlayerVisible: boolean;
  isExpanded: boolean;
  activeLetter: Letter | null;
  isPlaying: boolean;
  isGenerating: boolean;
  audioProgress: number;
  duration: number;
  currentTime: number;
  queue: string[];
  currentChunkIndex: number;
  intention: UserIntention;
  intentionHistory: Record<UserIntention, number>;
  listenHistory: string[];
  emotion: EmotionalState;
  visitCount: number;
  lastVisit: number | null;
  
  // Actions
  playLetter: (letter: Letter) => void;
  togglePlayPause: () => void;
  setIsPlaying: (playing: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setProgress: (progress: number, currentTime: number, duration: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  closePlayer: () => void;
  setAudioChunks: (chunks: string[]) => void;
  setCurrentChunkIndex: (index: number) => void;
  setIsExpanded: (expanded: boolean) => void;
  setIntention: (intention: UserIntention) => void;
  recordListen: (letterId: string) => void;
  setEmotion: (emotion: EmotionalState) => void;
  incrementVisitCount: () => void;
  triggerGhostMode: () => void;
}

export const usePodcastStore = create<PodcastState>()(
  persist(
    (set, get) => ({
      isPlayerVisible: false,
      isExpanded: false,
      activeLetter: null,
      isPlaying: false,
      isGenerating: false,
      audioProgress: 0,
      duration: 0,
      currentTime: 0,
      queue: [],
      currentChunkIndex: 0,
      intention: 'GENERAL',
      intentionHistory: { IA: 0, BUSINESS: 0, TALENT: 0, VISION: 0, GENERAL: 0 },
      listenHistory: [],
      emotion: 'NEUTRAL',
      visitCount: 0,
      lastVisit: null,

      playLetter: (letter) => set({ 
        activeLetter: letter, 
        isPlayerVisible: true,
        isExpanded: true,
        isPlaying: true, // We should probably set this true to auto-start if possible
        audioProgress: 0,
        currentTime: 0,
        duration: 0,
        queue: [],
        currentChunkIndex: 0
      }),
      
      togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
      
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      
      setProgress: (progress, currentTime, duration) => set({ 
        audioProgress: progress,
        currentTime,
        duration
      }),

      playNext: () => {
      },
      
      playPrevious: () => {
      },

      closePlayer: () => set({ 
        isPlayerVisible: false,
        isExpanded: false,
        activeLetter: null, 
        isPlaying: false,
        isGenerating: false,
        queue: [],
        currentChunkIndex: 0,
        audioProgress: 0
      }),

      setAudioChunks: (chunks) => set({ queue: chunks }),
      
      setCurrentChunkIndex: (index) => set({ currentChunkIndex: index }),

      setIsExpanded: (expanded: boolean) => set({ isExpanded: expanded }),

      setIntention: (intention: UserIntention) => {
        const history = { ...get().intentionHistory };
        history[intention] += 1;
        set({ intention, intentionHistory: history });
      },

      recordListen: (letterId: string) => {
        const currentTracker = new Set(get().listenHistory);
        currentTracker.add(letterId);
        set({ listenHistory: Array.from(currentTracker) });
      },

      setEmotion: (emotion: EmotionalState) => set({ emotion }),

      incrementVisitCount: () => {
        const now = Date.now();
        const { lastVisit, visitCount } = get();
        // If last visit was more than 2 hours ago, count as new visit
        if (!lastVisit || now - lastVisit > 2 * 60 * 60 * 1000) {
          set({ visitCount: visitCount + 1, lastVisit: now });
        }
      },

      triggerGhostMode: () => {
        // We'll emit a custom event that GlobalPodcastPlayer can listen to
        window.dispatchEvent(new CustomEvent('kcg_ghost_mode'));
      },
    }),
    {
      name: 'kcg-podcast-storage',
      partialize: (state) => ({ 
        activeLetter: state.activeLetter,
        isPlayerVisible: state.isPlayerVisible,
        audioProgress: state.audioProgress,
        currentTime: state.currentTime,
        duration: state.duration,
        intention: state.intention,
        intentionHistory: state.intentionHistory,
        listenHistory: state.listenHistory,
        emotion: state.emotion,
        visitCount: state.visitCount,
        lastVisit: state.lastVisit,
      })
    }
  )
);

