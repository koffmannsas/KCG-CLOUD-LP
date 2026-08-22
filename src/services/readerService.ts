import { LETTERS, Letter } from '../data/letters';
import { letterEngagementService } from './letterEngagementService';

export interface Reader {
  id: string;
  firstName: string;
  phone: string;
  createdAt: number;
  notificationsEnabled: boolean;
  channel: 'whatsapp' | 'email' | 'sms';
}

export interface ReaderLetterRecord {
  letterId: number;
  liked: boolean;
  saved: boolean;
  savedAt?: number;
  lastReadAt: number;
  readProgress: number; // 0 to 100
}

export interface ReaderState {
  reader: Reader | null;
  letterRecords: Record<number, ReaderLetterRecord>;
}

const STORAGE_KEY = 'kcg_reader_state_v1';

class ReaderService {
  private state: ReaderState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): ReaderState {
    if (typeof window === 'undefined') {
      return { reader: null, letterRecords: {} };
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Unable to load KCG Reader State from storage', e);
    }
    return {
      reader: null,
      letterRecords: {
        // Pre-seed letter 1 as recently read for immediate polished UX
        1: {
          letterId: 1,
          liked: false,
          saved: true,
          savedAt: Date.now() - 3600000 * 24,
          lastReadAt: Date.now() - 3600000 * 12,
          readProgress: 65,
        }
      }
    };
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Unable to persist KCG Reader State', e);
    }
    this.notifyListeners();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in readerService listener', err);
      }
    });
  }

  // ================= 1. BOOKMARK / SAVE ACTIONS =================
  public isLetterSaved(letterId: number): boolean {
    return !!this.state.letterRecords[letterId]?.saved;
  }

  public saveLetter(letterId: number): boolean {
    if (!this.state.letterRecords[letterId]) {
      this.state.letterRecords[letterId] = {
        letterId,
        liked: false,
        saved: true,
        savedAt: Date.now(),
        lastReadAt: Date.now(),
        readProgress: 0,
      };
    } else {
      this.state.letterRecords[letterId].saved = true;
      this.state.letterRecords[letterId].savedAt = Date.now();
    }
    this.saveState();
    return true;
  }

  public unsaveLetter(letterId: number): boolean {
    if (this.state.letterRecords[letterId]) {
      this.state.letterRecords[letterId].saved = false;
      this.state.letterRecords[letterId].savedAt = undefined;
      this.saveState();
    }
    return false;
  }

  public toggleSaveLetter(letterId: number): boolean {
    const isCurrentlySaved = this.isLetterSaved(letterId);
    if (isCurrentlySaved) {
      return this.unsaveLetter(letterId);
    } else {
      return this.saveLetter(letterId);
    }
  }

  public getSavedLetters(): Letter[] {
    const savedIds = Object.values(this.state.letterRecords)
      .filter((r) => r.saved)
      .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
      .map((r) => r.letterId);

    return savedIds
      .map((id) => LETTERS.find((l) => l.id === id))
      .filter((l): l is Letter => !!l);
  }

  // ================= 2. LIKED LETTERS =================
  public getLikedLetters(): Letter[] {
    // Check both local engagement service and reader records
    return LETTERS.filter((l) => {
      const stats = letterEngagementService.getLetterStats(l.id);
      const isRecordLiked = this.state.letterRecords[l.id]?.liked;
      return stats.userLiked || isRecordLiked;
    });
  }

  // ================= 3. RECENTLY READ & PROGRESS =================
  public recordLetterOpen(letterId: number, progress?: number) {
    if (!this.state.letterRecords[letterId]) {
      this.state.letterRecords[letterId] = {
        letterId,
        liked: false,
        saved: false,
        lastReadAt: Date.now(),
        readProgress: progress || 5,
      };
    } else {
      this.state.letterRecords[letterId].lastReadAt = Date.now();
      if (typeof progress === 'number') {
        this.state.letterRecords[letterId].readProgress = Math.max(
          this.state.letterRecords[letterId].readProgress,
          progress
        );
      }
    }
    this.saveState();
  }

  public saveReadingProgress(letterId: number, progress: number) {
    if (!this.state.letterRecords[letterId]) {
      this.state.letterRecords[letterId] = {
        letterId,
        liked: false,
        saved: false,
        lastReadAt: Date.now(),
        readProgress: Math.min(100, Math.max(0, Math.round(progress))),
      };
    } else {
      this.state.letterRecords[letterId].readProgress = Math.min(
        100,
        Math.max(0, Math.round(progress))
      );
      this.state.letterRecords[letterId].lastReadAt = Date.now();
    }
    this.saveState();
  }

  public getReadingProgress(letterId: number): number {
    return this.state.letterRecords[letterId]?.readProgress || 0;
  }

  public getRecentLetters(): { letter: Letter; readProgress: number; lastReadAt: number }[] {
    const recentRecords = Object.values(this.state.letterRecords)
      .filter((r) => r.lastReadAt && r.lastReadAt > 0)
      .sort((a, b) => b.lastReadAt - a.lastReadAt)
      .slice(0, 5);

    return recentRecords
      .map((r) => {
        const letter = LETTERS.find((l) => l.id === r.letterId);
        if (!letter) return null;
        return {
          letter,
          readProgress: r.readProgress,
          lastReadAt: r.lastReadAt,
        };
      })
      .filter((item): item is { letter: Letter; readProgress: number; lastReadAt: number } => !!item);
  }

  // ================= 4. INTELLIGENT SUBSCRIPTION / NOTIFICATION =================
  public getReaderProfile(): Reader | null {
    return this.state.reader;
  }

  public isSubscribed(): boolean {
    return !!this.state.reader?.notificationsEnabled;
  }

  public async subscribeToLetters(firstName: string, phone: string): Promise<{ success: boolean; reader: Reader }> {
    const cleanName = firstName.trim() || 'Lecteur KCG';
    const cleanPhone = phone.trim().replace(/\s+/g, ' ');

    const newReader: Reader = {
      id: `kcg_reader_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      firstName: cleanName,
      phone: cleanPhone,
      createdAt: Date.now(),
      notificationsEnabled: true,
      channel: 'whatsapp',
    };

    this.state.reader = newReader;
    this.saveState();

    // Prepare institutional event tracking
    if (typeof window !== 'undefined' && (window as any).kcgAnalytics) {
      (window as any).kcgAnalytics.track('reader_subscribed', {
        readerId: newReader.id,
        channel: 'whatsapp',
      });
    }

    return { success: true, reader: newReader };
  }

  public async unsubscribeFromLetters(): Promise<{ success: boolean }> {
    if (this.state.reader) {
      this.state.reader.notificationsEnabled = false;
      this.saveState();
    }
    return { success: true };
  }

  // Abstraction for future server-side dispatch
  public async notifyNewLetter(readerId: string, letterId: number): Promise<{ success: boolean; method: string }> {
    const targetLetter = LETTERS.find((l) => l.id === letterId);
    if (!targetLetter) return { success: false, method: 'none' };

    const message = `KOFFMANN CAPITAL GROUP // FOUNDER'S LETTER\n\nUne nouvelle lettre du Fondateur est disponible :\nÂ« ${targetLetter.title} Â»\n\nÃ‰couter ou lire :\n${letterEngagementService.getShareUrl(letterId)}\n\nKoffmann Capital Group`;

    console.info(`[KCG Reader Notification Dispatched] to reader=${readerId} on WhatsApp message:`, message);

    return { success: true, method: 'whatsapp' };
  }

  // ================= 5. RECOMMENDATION ENGINE =================
  public getRecommendedLetter(currentLetterId: number): Letter {
    const all = LETTERS;
    const currentIndex = all.findIndex((l) => l.id === currentLetterId);
    const current = all[currentIndex];

    // 1. Next chronological letter
    if (currentIndex < all.length - 1) {
      return all[currentIndex + 1];
    }

    // 2. Same category (different ID)
    if (current) {
      const sameCat = all.find((l) => l.category === current.category && l.id !== currentLetterId);
      if (sameCat) return sameCat;
    }

    // 3. Most popular or first letter
    const fallback = all.find((l) => l.id !== currentLetterId) || all[0];
    return fallback;
  }
}

export const readerService = new ReaderService();
