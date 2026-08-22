/**
 * Web Audio API synthesizer for KCG Sovereign Sound System
 * Generates pure, ultra-subtle ambient tones, sub-bass pulses and tactile clicks
 * No external audio files needed - runs natively at zero network cost.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    // Read mute preference from localStorage
    try {
      this.isMuted = localStorage.getItem('kcg_sound_muted') === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('kcg_sound_muted', String(this.isMuted));
    } catch {}
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Deep sub-bass pulse on genesis/intro
   */
  public playSubPulse() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);
    } catch {}
  }

  /**
   * Quantum signal ping when nodes gravitate
   */
  public playSignalPing(freq: number = 440) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch {}
  }

  /**
   * System Activation Chime on touch enter
   */
  public playActivationChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const frequencies = [220, 330, 440, 660];
      frequencies.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, this.ctx!.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.85);
      });
    } catch {}
  }

  /**
   * Confirmation chord for successful actions
   */
  public playConfirmation() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const chord = [523.25, 659.25, 783.99, 1046.5]; // C Major
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.035, this.ctx!.currentTime + idx * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + idx * 0.05 + 0.65);
      });
    } catch {}
  }

  /**
   * Tactile micro-haptic sound on node touch
   */
  public playTactileClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }
}

export const kcgSound = new SoundEngine();
