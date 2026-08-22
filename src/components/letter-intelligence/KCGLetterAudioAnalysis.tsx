import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import { Letter } from '../../data/letters';
import { letterIntelligenceService, AudioAnalysisMeta } from '../../services/letterIntelligenceService';
import { kcgSound } from '../../mobile/soundEngine';

interface KCGLetterAudioAnalysisProps {
  letter: Letter;
}

export default function KCGLetterAudioAnalysis({ letter }: KCGLetterAudioAnalysisProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);
  const audioMeta = letterIntelligenceService.getAudioAnalysis(letter);

  const timerRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
    }

    return () => {
      stopAudio();
    };
  }, [letter]);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    kcgSound.playTactileClick();

    if (isPlaying) {
      stopAudio();
      return;
    }

    // Start playback
    setIsPlaying(true);
    setCurrentTime(0);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(audioMeta.script);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.96; // Calm, deliberate, institutional pace
      utterance.pitch = 0.92; // Slightly lower, authoritative executive timbre

      // Try to select French male voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(
        (v) => (v.lang.includes('fr') || v.lang.includes('FR')) && (v.name.includes('Thomas') || v.name.includes('Henri') || v.name.includes('Male') || v.name.includes('Paul'))
      ) || voices.find((v) => v.lang.includes('fr'));

      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onend = () => {
        stopAudio();
        setCurrentTime(audioMeta.durationSeconds);
      };

      utterance.onerror = () => {
        stopAudio();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    // Progress counter simulation
    const startTime = Date.now();
    const duration = audioMeta.durationSeconds;

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed >= duration) {
        stopAudio();
        setCurrentTime(duration);
      } else {
        setCurrentTime(elapsed);
      }
    }, 500);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = Math.min(100, (currentTime / audioMeta.durationSeconds) * 100);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d090a] to-[#0A0A0C] border border-[#C8102E]/30 space-y-3.5 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
            âœ¦ KCG AI Â· ANALYSE EXÃ‰CUTIVE AUDIO
          </span>
        </div>

        <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          SYNTHÃˆSE VOCALE SOUVERAINE
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Play/Stop Button */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-md shrink-0"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE ANALYSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Ã‰COUTER L'ANALYSE ({audioMeta.durationFormatted})</span>
            </>
          )}
        </button>

        {/* Waveform / Visualizer */}
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#C8102E] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-[9px] font-mono text-neutral-400 shrink-0">
            {formatSeconds(currentTime)} / {audioMeta.durationFormatted}
          </span>
        </div>
      </div>

      {/* Distinction Note */}
      <p className="text-[9px] font-mono text-neutral-400 leading-snug">
        Voix KCG AI certifiÃ©e Â· Ne remplace pas la narration officielle intÃ©grale du Fondateur.
      </p>
    </div>
  );
}
