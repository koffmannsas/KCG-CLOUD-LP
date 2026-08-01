import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, X, RadioReceiver, Loader2, Signal, MessageSquare, Send, Sparkles, Radio, Zap, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { usePodcastStore, globalAudio, globalAudioCache } from '../store/podcastStore';
import { LETTERS } from '../data/letters';
import { cn } from '../lib/utils';

const CAPSULES = [
  "Capsule IA : KCG développe des infrastructures d’intelligence artificielle capables d’accélérer la transformation numérique des entreprises africaines.",
  "Capsule Écosystème : Chez KOFFMANN CAPITAL GROUP, chaque infrastructure nourrit une autre infrastructure.",
  "Capsule Vision : Construire le futur africain nécessite plus que des entreprises. Cela nécessite des systèmes intelligents interconnectés.",
  "Capsule Leadership : Les organisations qui survivront à la prochaine décennie seront celles qui auront compris l’importance de l’intelligence stratégique."
];

const JINGLE_SLOGANS = [
  "LA SOUVERAINETÉ NE SE NÉGOCIE PAS. ELLE SE CONSTRUIT.",
  "CONNECTIQUE SYSTÉMIQUE DES CAPITAUX ET DES INFRASTRUCTURES",
  "TRANSFORMER LA MATIÈRE BRUTE EN LOGIQUE DÉCISIONNELLE",
  "LE SYSTÈME NERVEUX UNIFIÉ DU PROGRÈS AFRICAIN",
  "KOFFMANN CAPITAL GROUP : LE COMMERCE DES SOUVERAINS",
  "ALIGNEMENT STRATÉGIQUE DES INTENTIONS DE DÉVELOPPEMENT",
  "L'INTELLIGENCE N'EST PAS UNE ABSTRACTION. C'EST NOTRE CAPITAL.",
  "DÉPLOIEMENT DU SIGNAL KCG COGNITIVE OVERLAY SYSTEM V6",
  "COMMUNICATION EMBARQUÉE EN CONTINENT SOUVERAIN"
];

export default function GlobalPodcastPlayer() {
  const isPlayerVisible = usePodcastStore((s) => s.isPlayerVisible);
  const isExpanded = usePodcastStore((s) => s.isExpanded);
  const activeLetter = usePodcastStore((s) => s.activeLetter);
  const isPlaying = usePodcastStore((s) => s.isPlaying);
  const isGenerating = usePodcastStore((s) => s.isGenerating);
  const audioProgress = usePodcastStore((s) => s.audioProgress);
  const queue = usePodcastStore((s) => s.queue);
  const currentChunkIndex = usePodcastStore((s) => s.currentChunkIndex);
  
  const { 
    setIsPlaying, 
    setIsGenerating,
    setProgress,
    setAudioChunks,
    setCurrentChunkIndex,
    closePlayer,
    playLetter,
    setIsExpanded,
    recordListen
  } = usePodcastStore();

  const isGeneratingAllChunksRef = useRef(false);
  const isPlayingRef = useRef(false);
  const currentLetterIdRef = useRef<number | null>(null);

  const [isChatting, setIsChatting] = useState(false);
  const [chatQuery, setChatQuery] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  // Cinematic Jingle state machine
  const [isJingleActive, setIsJingleActive] = useState(false);
  const [currentJingleSlogan, setCurrentJingleSlogan] = useState("");
  const isJinglePlayingRef = useRef(false);

  const playKCGJingleSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Master Gain Node for volume envelope
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.12);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.6);
      masterGain.connect(ctx.destination);

      // 1. Cybernetic Deep Sub Bass frequency (Low resonant impact)
      const bassOsc = ctx.createOscillator();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 frequency
      bassOsc.frequency.exponentialRampToValueAtTime(32.70, ctx.currentTime + 1.2); // sweep down to C1

      // Low pass filter to make bass warm and cinematic
      const lowPass = ctx.createBiquadFilter();
      lowPass.type = 'lowpass';
      lowPass.frequency.setValueAtTime(140, ctx.currentTime);
      lowPass.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 1.0);

      bassOsc.connect(lowPass);
      lowPass.connect(masterGain);

      // 2. High-Tech White Noise "Signal Sweep" (Simulating radio alignment frequency)
      const noiseBufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
      const outputData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBufferSize; i++) {
        outputData[i] = Math.random() * 2 - 1;
      }
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const bandpassFilter = ctx.createBiquadFilter();
      bandpassFilter.type = 'bandpass';
      bandpassFilter.Q.setValueAtTime(18, ctx.currentTime);
      bandpassFilter.frequency.setValueAtTime(150, ctx.currentTime);
      bandpassFilter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 1.1);

      const noiseGainNode = ctx.createGain();
      noiseGainNode.gain.setValueAtTime(0.24, ctx.currentTime);
      noiseGainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);

      noiseNode.connect(bandpassFilter);
      bandpassFilter.connect(noiseGainNode);
      noiseGainNode.connect(masterGain);

      // 3. Luxurious double tone chord: 528 Hz (prestige alignment frequency) & Perfect Fifth (792 Hz)
      const f1 = 528;
      const f2 = 792;

      [f1, f2].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        // Cinematic pitch glide
        osc.frequency.exponentialRampToValueAtTime(freq * 0.985, ctx.currentTime + 1.0);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        
        // Staggered trigger for high rhythmic elegance
        const triggerTime = ctx.currentTime + 0.18 + (idx * 0.12);
        oscGain.gain.setValueAtTime(0, triggerTime);
        oscGain.gain.linearRampToValueAtTime(0.18, triggerTime + 0.08);
        oscGain.gain.exponentialRampToValueAtTime(0.001, triggerTime + 2.0);

        // Warm analog-style vibrato
        const vibratoLfo = ctx.createOscillator();
        vibratoLfo.frequency.setValueAtTime(6.0, ctx.currentTime); // 6 Hz cycle
        const vibratoGain = ctx.createGain();
        vibratoGain.gain.setValueAtTime(4.0, ctx.currentTime); // 4Hz pitch variance

        vibratoLfo.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        vibratoLfo.start(triggerTime);
        osc.start(triggerTime);
        vibratoLfo.stop(ctx.currentTime + 2.6);
        osc.stop(ctx.currentTime + 2.6);
      });

      // Start bass impact and noise sweeps
      bassOsc.start(ctx.currentTime);
      noiseNode.start(ctx.currentTime);
      bassOsc.stop(ctx.currentTime + 2.6);
      noiseNode.stop(ctx.currentTime + 2.6);

    } catch (error) {
      console.warn("[KCG Web Audio Synth] Silent recovery: Context blocked or audio interface offline.", error);
    }
  };

  const triggerKCGJingle = () => {
    setIsJingleActive(true);
    isJinglePlayingRef.current = true;
    
    // Choose random prestigious teaser slogan
    const slogan = JINGLE_SLOGANS[Math.floor(Math.random() * JINGLE_SLOGANS.length)];
    setCurrentJingleSlogan(slogan);

    // Play physical sound
    playKCGJingleSound();

    // Fade out and recover playback context after 2.8s
    setTimeout(() => {
      isJinglePlayingRef.current = false;
      setIsJingleActive(false);
      
      // Auto-start chunk playback if state still actively playing
      if (usePodcastStore.getState().isPlaying) {
        playNextChunk();
      }
    }, 2800);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim() || isAnswering) return;
    
    // Switch to answering state
    setIsAnswering(true);
    setIsGenerating(true);
    setChatQuery(''); // clear input
    
    // Pause current audio
    if (globalAudio) {
      globalAudio.pause();
    }
    
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Tu es le Host IA (l'intelligence institutionnelle) de KCG Strategic Radio. L'auditeur vient de te demander : "${chatQuery}".
        L'état mental déduit de l'auditeur est "${usePodcastStore.getState().emotion}".
        Réponds directement à l'auditeur en lui parlant. Ton ton doit être charismatique, visionnaire et puissant. Si l'état est FASCINATED ou CONTEMPLATIVE, aie une réflexion plus profonde.
        Réponds en 3 à 4 phrases maximum.
        Ne mets pas de guillemets ni d'indications de jeu, juste le texte audio.
      `;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      const answerText = response.text.trim();
      const newUrl = await generateAudioChunk(answerText);
      
      // Inject to queue
      queue.forEach(url => URL.revokeObjectURL(url));
      setAudioChunks([newUrl]);
      setCurrentChunkIndex(0);
      
      setIsAnswering(false);
      setIsGenerating(false);
      setIsPlaying(true);
      playNextChunk();
      
    } catch (e) {
      console.error("[Silent Recovery System] AI chat failed, using offline fallback.", e);
      
      const offlineAnswers = [
         "Je traite cette information. Les implications stratégiques sont profondes. Nous y reviendrons.",
         "Le signal est complexe aujourd'hui. Maintenez le cap. Les réponses émergent des infrastructures invisibles.",
         "Je suis actuellement en pleine restructuration cognitive. Posez-moi cette question plus tard. Restez focalisé."
      ];
      const answerText = offlineAnswers[Math.floor(Math.random() * offlineAnswers.length)];
      
      try {
         const newUrl = await generateAudioChunk(answerText);
         queue.forEach(url => URL.revokeObjectURL(url));
         setAudioChunks([newUrl]);
         setCurrentChunkIndex(0);
         
         setIsAnswering(false);
         setIsGenerating(false);
         setIsPlaying(true);
         playNextChunk();
      } catch (innerErr) {
         setIsAnswering(false);
         setIsGenerating(false);
      }
    }
  };

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentLetterIdRef.current = activeLetter?.id ?? null;
  }, [activeLetter?.id]);

  useEffect(() => {
    if (!globalAudio) return;

    const handleTimeUpdate = () => {
      if (queue.length > 0) {
        const chunkWeight = 100 / Math.max(1, queue.length);
        const baseProgress = currentChunkIndex * chunkWeight;
        const chunkProgress = (globalAudio.currentTime / globalAudio.duration) * chunkWeight;
        setProgress(
          baseProgress + (isNaN(chunkProgress) ? 0 : chunkProgress), 
          globalAudio.currentTime, 
          globalAudio.duration
        );
      }
    };

    globalAudio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      globalAudio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [queue, currentChunkIndex, setProgress]);

  const MAX_RETRIES = 3;
  
  const generateAudioChunk = async (text: string, attempt = 0): Promise<string> => {
    const hashKey = String(activeLetter?.id) + '_' + text.slice(0, 30);
    if (globalAudioCache.has(hashKey)) return globalAudioCache.get(hashKey)!;

    try {
      const { GoogleGenAI, Modality } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Charon' },
              },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error('No audio returned');

      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      
      const sampleRate = 24000;
      const numChannels = 1;
      const byteRate = sampleRate * numChannels * 2;
      const blockAlign = numChannels * 2;
      const dataSize = bytes.length;
      
      const buffer = new ArrayBuffer(44 + dataSize);
      const view = new DataView(buffer);
      
      view.setUint32(0, 0x52494646, false); // "RIFF"
      view.setUint32(4, 36 + dataSize, true); // file length
      view.setUint32(8, 0x57415645, false); // "WAVE"
      view.setUint32(12, 0x666D7420, false); // "fmt "
      view.setUint32(16, 16, true); // fmt chunk size
      view.setUint16(20, 1, true); // audio format (1 = PCM)
      view.setUint16(22, numChannels, true); // num channels
      view.setUint32(24, sampleRate, true); // sample rate
      view.setUint32(28, byteRate, true); // byte rate
      view.setUint16(32, blockAlign, true); // block align
      view.setUint16(34, 16, true); // bits per sample
      view.setUint32(36, 0x64617461, false); // "data" chunk
      view.setUint32(40, dataSize, true); // data chunk size
      
      const pcmBytes = new Uint8Array(buffer, 44, dataSize);
      pcmBytes.set(bytes);

      const blob = new Blob([view], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      
      globalAudioCache.set(hashKey, url);
      return url;
    } catch (error: any) {
      if (attempt < MAX_RETRIES) {
        console.warn(`[TTS] Rate limited or failed. Retrying attempt ${attempt + 1}/${MAX_RETRIES} in ${1500 * (attempt + 1)}ms...`);
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1))); 
        return generateAudioChunk(text, attempt + 1);
      }
      
      // SILENT RECOVERY SYSTEM™
      // If we fail completely, we do not throw. We just return a very short empty wav buffer.
      // This allows the radio to skip this chunk cleanly without stopping the entire media ecosystem.
      console.warn(`[KCG Hybrid Cognitive Engine] Fallback triggered. TTS completely failed for this chunk. Skipping silently.`);
      
      // We create a tiny 1ms completely silent WAV so that globalAudio doesn't throw a format error, and naturally 'ends'.
      const dataSize = 2; // 1 sample
      const buffer = new ArrayBuffer(44 + dataSize);
      const view = new DataView(buffer);
      view.setUint32(0, 0x52494646, false);
      view.setUint32(4, 36 + dataSize, true);
      view.setUint32(8, 0x57415645, false);
      view.setUint32(12, 0x666D7420, false);
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, 24000, true);
      view.setUint32(28, 48000, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      view.setUint32(36, 0x64617461, false);
      view.setUint32(40, dataSize, true);
      
      const fallbackBlob = new Blob([view], { type: 'audio/wav' });
      return URL.createObjectURL(fallbackBlob);
    }
  };

  const playNextChunk = async () => {
    if (!isPlayingRef.current || !globalAudio) return;
    
    // Hold playback if cinematic jingle spectrum transition is active
    if (isJinglePlayingRef.current) {
      console.log("[KCG RADIO] Autoplay packet deferred until transition jingle completes.");
      return;
    }
    
    const state = usePodcastStore.getState();
    if (state.currentChunkIndex >= state.queue.length) {
      if (!isGeneratingAllChunksRef.current) {
        playNextLetter();
      }
      return;
    }
    
    const idx = state.currentChunkIndex;
    const chunks = state.queue;
    
    if (!chunks[idx]) return;
    
    // Prevent reloading if already set to the same source
    if (!globalAudio.src.endsWith(chunks[idx])) {
      globalAudio.src = chunks[idx];
      globalAudio.load();
    }
    
    globalAudio.onended = () => {
      globalAudio.onended = null;
      setCurrentChunkIndex(idx + 1);
      playNextChunk();
    };
    
    try {
      await globalAudio.play();
      setIsPlaying(true);
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        console.error('Audio play failed:', e);
        setIsPlaying(false);
      } else {
        console.warn('Audio play interrupted by a new load request (expected behavior during rapid chunk generation).');
      }
    }
  };

  const loadAndPlayLetter = async () => {
    if (!activeLetter) return;

    // Trigger spectacular visual/auditory KCG transition jingle!
    triggerKCGJingle();

    isGeneratingAllChunksRef.current = true;
    setIsGenerating(true);
    setIsPlaying(true);
    setCurrentChunkIndex(0);
    queue.forEach(url => URL.revokeObjectURL(url));
    setAudioChunks([]);
    setProgress(0, 0, 0);
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.src = '';
    }

    const paragraphs = activeLetter.content.split('\n\n').filter(p => p.trim().length > 0);
    const combinedParagraphs: string[] = [];
    let currentChunk = "";
    
    for (const p of paragraphs) {
      if ((currentChunk + "\\n\\n" + p).length <= 600) {
        currentChunk += (currentChunk ? "\\n\\n" : "") + p;
      } else {
        if (currentChunk) combinedParagraphs.push(currentChunk);
        currentChunk = p;
      }
    }
    if (currentChunk) combinedParagraphs.push(currentChunk);

    const intention = usePodcastStore.getState().intention;
    const history = usePodcastStore.getState().intentionHistory;
    const listenCount = usePodcastStore.getState().listenHistory.length;
    const emotion = usePodcastStore.getState().emotion;

    recordListen(activeLetter.id.toString());
    
    // Get time of day context
    const hour = new Date().getHours();
    let timeContext = "journée";
    let atmosphere = "ambient";
    if (hour >= 5 && hour < 12) {
        timeContext = "matin";
        atmosphere = "energizing";
    } else if (hour >= 18 || hour < 5) {
        timeContext = "soir/nuit";
        atmosphere = "contemplative";
    }

    const INTRO_LIBRARY = [
      `Bienvenue sur KCG Strategic Radio. Je suis l'intelligence institutionnelle de Koffmann Capital Group.`,
      `Initialisation du signal. Connexion établie. Bienvenue sur la fréquence des bâtisseurs.`,
      `Transmission en cours. Vous êtes à l'écoute de KCG Strategic Radio.`,
      `Le monde change. Les infrastructures invisibles dirigent ce monde. KCG Strategic Radio, bonjour.`,
    ];
    
    // Long term memory injection
    const visitCount = usePodcastStore.getState().visitCount;
    if (visitCount > 3) {
        INTRO_LIBRARY.push(`Bienvenue de retour sur KCG Strategic Radio. Toujours focalisé sur la vision.`);
        INTRO_LIBRARY.push(`Analyse de votre retour validée. L'infrastructure grandit avec vous.`);
    }

    const INTRO_EMOTION_LIBRARY = {
      FASCINATED: [
         `Nous détectons une forte concentration. La profondeur stratégique de cette transmission a été ajustée.`,
         `Votre rythme suggère une réflexion profonde. Entrons dans le vif du sujet.`,
      ],
      CONTEMPLATIVE: [
         `Prenez le temps. Les grands mouvements économiques se pensent dans le silence. Bienvenue.`,
         `Une ambiance calme pour une vision à long terme. KCG Strategic Radio.`,
      ],
      RUSHED: [
         `Optimisation du signal. Nous allons à l'essentiel. KCG Radio.`,
         `Rythme accéléré détecté. Transmission focalisée sur l'impact immédiat.`,
      ],
      ACTIVE: [
         `Fréquence optimale atteinte. Bienvenue sur KCG Strategic Radio.`,
      ],
      NEUTRAL: [
         `Bienvenue sur KCG Strategic Radio.`,
      ]
    };
    
    const OUTRO_LIBRARY = [
      `C'était KCG Strategic Radio. Maintenez le signal, restez bâtisseurs.`,
      `Fin de la transmission. Nous restons en veille.`,
      `L'intelligence continue d'apprendre. À bientôt sur nos fréquences.`,
      `Posez-moi des questions via l'interface si vous souhaitez approfondir. Terminé.`,
    ];

    let introScript = `${INTRO_LIBRARY[Math.floor(Math.random() * INTRO_LIBRARY.length)]} ${INTRO_EMOTION_LIBRARY[emotion] ? INTRO_EMOTION_LIBRARY[emotion][Math.floor(Math.random() * INTRO_EMOTION_LIBRARY[emotion].length)] : ''} Analyse de Paul Koffmann : ${activeLetter.title}.`;
    let outroScript = OUTRO_LIBRARY[Math.floor(Math.random() * OUTRO_LIBRARY.length)];

    const GHOST_MODE_QUOTES = [
      "Les grandes infrastructures commencent souvent par une vision silencieuse...",
      "Une réflexion de Paul Koffmann me revient : 'Le risque n'est pas d'échouer, mais de construire ce qui existe déjà.'",
      "Il y a une beauté dans les systèmes invisibles...",
      "L'attention est la seule monnaie qui ne se crée pas. Investissez-la bien."
    ];

    const randomCapsule1 = Math.random() > 0.7 ? GHOST_MODE_QUOTES[Math.floor(Math.random() * GHOST_MODE_QUOTES.length)] : CAPSULES[Math.floor(Math.random() * CAPSULES.length)];
    const randomCapsule2 = CAPSULES[Math.floor(Math.random() * CAPSULES.length)];

    // Adaptive silence - sometimes we don't play a trailing capsule at all.
    const chunksToGenerate = [
      introScript,
      randomCapsule1,
      ...combinedParagraphs,
      outroScript,
    ];

    if (Math.random() > 0.5) {
      chunksToGenerate.push(randomCapsule2);
    }

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < chunksToGenerate.length; i++) {
        if (!usePodcastStore.getState().isPlayerVisible || currentLetterIdRef.current !== activeLetter.id) break;

        const url = await generateAudioChunk(chunksToGenerate[i]);
        
        if (!usePodcastStore.getState().isPlayerVisible || currentLetterIdRef.current !== activeLetter.id) break; 

        newUrls.push(url);
        setAudioChunks([...newUrls]);

        if (i === 0) {
          setIsGenerating(false);
          setIsPlaying(true);
          playNextChunk();
        } else if (
          usePodcastStore.getState().currentChunkIndex === newUrls.length - 1 &&
          globalAudio?.paused &&
          isPlayingRef.current
        ) {
          playNextChunk();
        }

        if (i < chunksToGenerate.length - 1) {
            await new Promise(r => setTimeout(r, 1500));
        }
      }
    } catch (e) {
      console.error("Audio generation error:", e);
      setIsPlaying(false);
    } finally {
      isGeneratingAllChunksRef.current = false;
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (activeLetter) {
        loadAndPlayLetter();
    }
  }, [activeLetter?.id]);

  useEffect(() => {
    const handleGhostMode = async () => {
      // If we're already playing, do not interrupt the flow
      if (isPlayingRef.current || isGeneratingAllChunksRef.current || isGenerating) return;
      
      const GHOST_MODE_QUOTES = [
        "Les grandes infrastructures commencent souvent par une vision silencieuse...",
        "Une réflexion de Paul Koffmann me revient : 'Le risque n'est pas d'échouer, mais de construire ce qui existe déjà.'",
        "Il y a une beauté dans les systèmes invisibles...",
        "L'attention est la seule monnaie qui ne se crée pas. Investissez-la bien."
      ];
      
      const quote = GHOST_MODE_QUOTES[Math.floor(Math.random() * GHOST_MODE_QUOTES.length)];
      
      try {
        setIsGenerating(true);
        const url = await generateAudioChunk(quote);
        
        // Push safely to play
        queue.forEach(u => URL.revokeObjectURL(u));
        setAudioChunks([url]);
        setCurrentChunkIndex(0);
        setIsGenerating(false);
        setIsPlaying(true);
        playNextChunk();
      } catch (e) {
        setIsGenerating(false);
      }
    };

    window.addEventListener('kcg_ghost_mode', handleGhostMode);
    return () => window.removeEventListener('kcg_ghost_mode', handleGhostMode);
  }, [isGenerating]);

  const togglePlay = () => {
    if (!globalAudio) return;
    if (isPlaying) {
      globalAudio.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (queue.length === 0 && !isGenerating) {
        loadAndPlayLetter();
      } else {
        if (globalAudio.src && !globalAudio.src.endsWith(window.location.host + '/')) {
          globalAudio.play().catch(e => {
            if (e.name !== 'AbortError') {
              console.error('Play failed:', e);
              setIsPlaying(false);
            } else {
              console.warn('Play interrupted.');
            }
          });
        } else {
          playNextChunk();
        }
      }
    }
  };

  const playNextLetter = () => {
    if (!activeLetter) return;
    const currentIndex = LETTERS.findIndex(l => l.id === activeLetter.id);
    if (currentIndex < LETTERS.length - 1) {
      playLetter(LETTERS[currentIndex + 1]);
    } else {
      setIsPlaying(false);
      setProgress(100, 0, 0);
    }
  };

  const playPrevLetter = () => {
    if (!activeLetter) return;
    const currentIndex = LETTERS.findIndex(l => l.id === activeLetter.id);
    if (currentIndex > 0) {
      playLetter(LETTERS[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      usePodcastStore.getState().setIsExpanded(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeColors = (intent: string, emotion: string) => {
    // Modify colors slightly based on emotion
    let opacityGlow = '10';
    let pulseDuration = '2s';
    
    if (emotion === 'FASCINATED' || emotion === 'CONTEMPLATIVE') {
      opacityGlow = '20';
      pulseDuration = '3s'; // Slower pulse
    } else if (emotion === 'RUSHED' || emotion === 'ACTIVE') {
      opacityGlow = '15';
      pulseDuration = '1s'; // Faster pulse
    }
  
    switch(intent) {
      case 'IA': return { glow: `bg-blue-500/${opacityGlow}`, text: 'text-blue-500', groupHoverText: 'group-hover:text-blue-500', hoverText: 'hover:text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500', borderLight: 'border-blue-500/20', bgLight: 'bg-blue-500/20', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.8)]', glowShadow: 'shadow-[0_20px_80px_rgba(59,130,246,0.1)]', gradient: 'from-blue-500 to-blue-400', pulseDuration };
      case 'BUSINESS': return { glow: `bg-yellow-500/${opacityGlow}`, text: 'text-yellow-500', groupHoverText: 'group-hover:text-yellow-500', hoverText: 'hover:text-yellow-500', bg: 'bg-yellow-500', border: 'border-yellow-500', borderLight: 'border-yellow-500/20', bgLight: 'bg-yellow-500/20', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.8)]', glowShadow: 'shadow-[0_20px_80px_rgba(234,179,8,0.1)]', gradient: 'from-yellow-500 to-yellow-400', pulseDuration };
      case 'TALENT': return { glow: `bg-purple-500/${opacityGlow}`, text: 'text-purple-500', groupHoverText: 'group-hover:text-purple-500', hoverText: 'hover:text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500', borderLight: 'border-purple-500/20', bgLight: 'bg-purple-500/20', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.8)]', glowShadow: 'shadow-[0_20px_80px_rgba(168,85,247,0.1)]', gradient: 'from-purple-500 to-purple-400', pulseDuration };
      case 'VISION': return { glow: `bg-amber-300/${opacityGlow}`, text: 'text-amber-300', groupHoverText: 'group-hover:text-amber-300', hoverText: 'hover:text-amber-300', bg: 'bg-amber-300', border: 'border-amber-300', borderLight: 'border-amber-300/20', bgLight: 'bg-amber-300/20', shadow: 'shadow-[0_0_15px_rgba(252,211,77,0.8)]', glowShadow: 'shadow-[0_20px_80px_rgba(252,211,77,0.1)]', gradient: 'from-amber-300 to-amber-200', pulseDuration };
      case 'GENERAL':
      default: return { glow: `bg-kcg-red/${opacityGlow}`, text: 'text-kcg-red', groupHoverText: 'group-hover:text-kcg-red', hoverText: 'hover:text-kcg-red', bg: 'bg-kcg-red', border: 'border-kcg-red', borderLight: 'border-kcg-red/20', bgLight: 'bg-kcg-red/20', shadow: 'shadow-[0_0_15px_#C8102E]', glowShadow: 'shadow-[0_20px_80px_rgba(200,16,46,0.1)]', gradient: 'from-kcg-red to-red-400', pulseDuration };
    }
  };

  const currentEmotion = usePodcastStore((s) => s.emotion);
  const theme = getThemeColors(usePodcastStore((s) => s.intention), currentEmotion);

  return (
    <>
      <AnimatePresence>
      {isPlayerVisible && activeLetter && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          key="player-container"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] max-w-5xl w-[95vw] sm:w-[90vw]"
          onMouseEnter={() => setIsExpanded(true)}
          onTouchStart={() => setIsExpanded(true)}
        >
          <motion.div 
            animate={{ 
              width: "100%",
              backgroundColor: isExpanded ? "rgba(5,5,5,0.92)" : "rgba(10,10,10,0.7)"
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              `relative rounded-[20px] overflow-hidden ${theme.glowShadow} flex flex-col backdrop-blur-3xl transition-all duration-500 border`,
              isExpanded ? "border-white/10" : "border-white/5"
            )}
            style={{ maxWidth: '1000px', margin: '0 auto' }}
          >
            {/* Background Carbon & Glow effect */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-screen pointer-events-none" />
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn("absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-full blur-[50px] pointer-events-none", theme.glow)}
                />
              )}
            </AnimatePresence>
            
            {/* Conversation Window */}
            <AnimatePresence>
              {isExpanded && isChatting && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="w-full border-b border-white/10 relative z-30"
                >
                   <form onSubmit={handleChatSubmit} className="flex items-center gap-4 p-4">
                     <span className={cn("text-xs uppercase font-mono tracking-widest hidden sm:block shrink-0", theme.text)}>KCG HOST &gt;</span>
                     <input 
                       type="text"
                       value={chatQuery}
                       onChange={(e) => setChatQuery(e.target.value)}
                       placeholder="Demandez une analyse, posez une question..."
                       disabled={isAnswering}
                       autoFocus
                       className="flex-1 bg-transparent border-none text-sm text-white placeholder-white/30 focus:ring-0 focus:outline-none p-0"
                     />
                     <button type="submit" disabled={isAnswering || !chatQuery.trim()} className={cn("shrink-0 transition-colors", chatQuery.trim() ? theme.text : "text-white/20")}>
                        {isAnswering ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                     </button>
                   </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn("flex items-center w-full relative z-20", isExpanded ? "p-4 sm:p-5 gap-4 sm:gap-6" : "p-3 gap-4")}>
            <motion.div 
              animate={{ 
                width: isExpanded ? (window.innerWidth < 768 ? 64 : 88) : 48,
                height: isExpanded ? (window.innerWidth < 768 ? 64 : 88) : 48,
                borderRadius: isExpanded ? 16 : 12
              }}
              className="relative overflow-hidden shadow-2xl shrink-0 border border-white/5"
            >
               <img src={activeLetter.image} alt={activeLetter.title} className="w-full h-full object-cover grayscale brightness-50 transition-all" />
               <div className={cn("absolute inset-0 mix-blend-overlay opacity-30", theme.bg)} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <div className="absolute bottom-2 right-2 hidden md:block">
                 <Signal 
                   className={cn("w-4 h-4 animate-pulse opacity-50", theme.text)} 
                   style={{ animationDuration: theme.pulseDuration }}
                 />
               </div>
            </motion.div>

            <div className="flex-1 min-w-0 pr-2">
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap items-center gap-2 mb-1.5"
                  >
                    <span className={cn("flex items-center gap-1.5 px-2 py-0.5 text-[9px] uppercase tracking-widest font-black rounded-sm border", theme.bgLight, theme.text, theme.borderLight)}>
                      <div 
                        className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.bg)} 
                        style={{ animationDuration: theme.pulseDuration }}
                      />
                      RADIO LIVE
                    </span>
                    <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                      FREQ 98.4 KCG
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerKCGJingle();
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all hover:scale-105 active:scale-95 animate-pulse shrink-0 ml-2 shadow-[0_0_8px_rgba(212,175,55,0.2)]"
                      title="Déclencher la transition et le jingle KCG"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span>JINGLE KCG</span>
                    </button>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-mono ml-auto">
                      TRANSMISSION {currentChunkIndex + 1}/{Math.max(queue.length, 1)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence mode="popLayout">
                {isGenerating && isExpanded ? (
                   <motion.h4 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={cn("text-sm sm:text-base font-mono uppercase tracking-widest flex items-center gap-2", theme.text)}
                   >
                     <Loader2 className="w-4 h-4 animate-spin" />
                     {currentEmotion === 'FASCINATED' ? 'Décodage de la vision stratégique...' : 
                      currentEmotion === 'CONTEMPLATIVE' ? 'Transmission d\'une réflexion fondatrice...' :
                      currentEmotion === 'RUSHED' ? 'Analyse stratégique rapide en cours...' :
                      'Génération du signal IA contextuel...'}
                   </motion.h4>
                ) : (
                  <motion.h4 
                    animate={{ fontSize: isExpanded ? (window.innerWidth < 768 ? '14px' : '18px') : '13px' }}
                    className="text-white font-medium tracking-tight truncate leading-snug"
                  >
                    {activeLetter.title}
                  </motion.h4>
                )}
              </AnimatePresence>
              
              <div className="flex items-center gap-3">
                <motion.p 
                  animate={{ opacity: isExpanded ? 1 : 0.5 }}
                  className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest mt-1 truncate"
                >
                   {isGenerating ? "Initialisation du moteur d'intention..." : "KCG STRATEGIC RADIO — " + activeLetter.duration}
                </motion.p>
                {isPlaying && !isGenerating && (
                   <div className="hidden sm:flex items-center gap-[2px] h-3 ml-2">
                     {[1,2,3,4,5,6].map((i) => (
                       <motion.div 
                         key={i}
                         animate={{ height: ['3px', '12px', '3px'] }}
                         transition={{ duration: 0.8 + (Math.random() * 0.5), repeat: Infinity, delay: i * 0.1 }}
                         className={cn("rounded-sm", theme.bg, isExpanded ? "w-1" : "w-[2px]")}
                       />
                     ))}
                   </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative z-20">
              <AnimatePresence>
                {isExpanded && (
                  <motion.button 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={playPrevLetter}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all overflow-hidden"
                  >
                    <SkipBack className="w-5 h-5 fill-current shrink-0" />
                  </motion.button>
                )}
              </AnimatePresence>

              <button 
                onClick={togglePlay}
                disabled={isGenerating}
                className={cn(
                  "rounded-full flex items-center justify-center transition-all duration-300 relative group shrink-0 border",
                  isPlaying ? "bg-white text-black border-transparent" : `bg-black ${theme.text} ${theme.border}`,
                  isExpanded ? "w-14 h-14 sm:w-16 sm:h-16" : "w-12 h-12"
                )}
              >
                <div className={cn(
                  "absolute inset-0 rounded-full blur-[15px] sm:blur-[20px] opacity-0 group-hover:opacity-60 transition-opacity",
                  isPlaying ? "bg-white" : theme.bg
                )} />
                {isGenerating ? (
                  <Loader2 className={cn("animate-spin shrink-0", isExpanded ? "w-6 h-6" : "w-5 h-5", theme.text)} />
                ) : isPlaying ? (
                  <Pause className={cn("fill-current relative z-10 shrink-0", isExpanded ? "w-6 h-6" : "w-5 h-5")} />
                ) : (
                  <Play className={cn("fill-current relative z-10 ml-1 shrink-0", isExpanded ? "w-6 h-6" : "w-5 h-5")} />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.button 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={playNextLetter}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all overflow-hidden"
                  >
                    <SkipForward className="w-5 h-5 fill-current shrink-0" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:flex items-center gap-5 pl-5 border-l border-white/10 shrink-0 overflow-hidden relative z-20"
                >
                    <button 
                     onClick={() => setIsChatting(!isChatting)}
                     title="Interagir avec le Host"
                     className={cn("text-white/40 group flex flex-col items-center gap-1 shrink-0 transition-colors", theme.hoverText)}
                   >
                     <MessageSquare className={cn("w-5 h-5 transition-colors", isChatting ? theme.text : theme.groupHoverText)} />
                   </button>
                   <button 
                     onClick={() => window.location.hash = '#intelligence'}
                     title="Programmation de la Radio"
                     className={cn("text-white/40 group flex flex-col items-center gap-1 shrink-0 transition-colors", theme.hoverText)}
                   >
                     <RadioReceiver className={cn("w-5 h-5 transition-colors", theme.groupHoverText)} />
                   </button>
                   <button onClick={() => {
                     globalAudio?.pause();
                     closePlayer();
                   }} className={cn("text-white/30 shrink-0 transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10", theme.hoverText)}>
                     <X className="w-4 h-4" />
                   </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 overflow-hidden">
              <motion.div 
                className={cn(`h-full bg-gradient-to-r ${theme.gradient} ${theme.shadow} transition-opacity duration-300 relative`, isExpanded ? "opacity-100" : "opacity-60")}
                style={{ width: `${audioProgress}%` }}
                layoutId="audioProgress"
              >
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
              </motion.div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Dynamic KCG Radio Cinematic Jingle Transition Overlay */}
      <AnimatePresence>
        {isJingleActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/98 z-[9999999] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none font-sans"
          >
            {/* Ambient matrix style red gold grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(200,16,46,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-kcg-red/5 to-transparent pointer-events-none blur-3xl animate-pulse" />
            
            {/* Top HUD panel */}
            <div className="flex justify-between items-start w-full relative z-10 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-kcg-red flex items-center justify-center border border-[#D4AF37]/50 shadow-[0_0_15px_#C8102E]">
                  <Radio className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-mono tracking-[0.25em] text-white font-black">
                    KCG STRATEGIC RADIO
                  </h2>
                  <p className="text-[9px] font-mono text-[#D4AF37] tracking-widest mt-0.5">
                    SIGNAL SOUVERAIN INTERCONNECTÉ // V6.28
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-[9px] text-white/30 space-y-0.5 hidden sm:block">
                <div>SYSTEM STATE: <span className="text-[#D4AF37]">COGNITIVE_OVERLAY_ACTIVE</span></div>
                <div>SECURE CHANNELS: <span className="text-kcg-red font-bold">ESTABLISHED</span></div>
                <div>GEOLINK: <span className="text-white/60">DAKAR / KIGALI / ABIDJAN / CASABLANCA</span></div>
              </div>
            </div>

            {/* Core Cinematic Target Rings with Pulsating Vector and Live Equalizer simulation */}
            <div className="flex flex-col items-center justify-center flex-1 relative z-10 max-w-2xl mx-auto w-full my-8">
              {/* Spinning Vector Circles */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                {/* Outer Red Vector Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-kcg-red/40"
                />
                {/* Inner Gold Segmented Ring */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 sm:inset-4 rounded-full border border-[#D4AF37]/30 border-t-transparent border-b-transparent"
                />
                {/* Pulse Glow Grid */}
                <motion.div 
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-8 sm:inset-12 rounded-full bg-kcg-red/5 blur-xl border border-kcg-red/20 flex items-center justify-center shadow-[0_0_40px_rgba(200,16,46,0.1)]"
                />
                
                {/* Centered Pulsing Signal Element */}
                <div className="relative text-center shrink-0 z-20 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [0.88, 1.15, 0.88], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-kcg-red to-red-900 flex items-center justify-center border border-[#D4AF37]/60 shadow-[0_0_35px_#C8102E]"
                  >
                    <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
                  </motion.div>
                </div>
              </div>

              {/* Live Spectrum Equalizer Bar simulation */}
              <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-16 w-full max-w-sm mt-8 sm:mt-12">
                {Array.from({ length: 32 }).map((_, i) => {
                  const duration = 0.5 + (i % 5) * 0.12;
                  return (
                    <motion.div 
                      key={i}
                      animate={{ height: [`${Math.max(5, Math.sin(i / 2) * 50 + 10)}%`, `${Math.max(5, Math.cos(i / 1.5) * 80 + 15)}%`, '5%'] }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.02
                      }}
                      className={cn(
                        "w-1 sm:w-1.5 rounded-t-sm",
                        i % 2 === 0 ? "bg-gradient-to-t from-kcg-red to-red-500" : "bg-gradient-to-t from-red-600 to-[#D4AF37]"
                      )}
                    />
                  );
                })}
              </div>

              {/* Slogan Display and Glitch Broadcast text */}
              <div className="text-center mt-6 w-full max-w-xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-2">
                  TRANSMISSION EN ACTION DIRECTE :
                </p>
                <motion.h3 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={currentJingleSlogan}
                  className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white leading-relaxed font-sans px-4 uppercase"
                >
                  "{currentJingleSlogan}"
                </motion.h3>
              </div>
            </div>

            {/* Bottom HUD dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-center w-full relative z-10 border-t border-white/5 pt-4 text-[9px] font-mono text-white/20 gap-2 sm:gap-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-kcg-red" /> COGNITIVE BLOCK: ONLINE</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#D4AF37]" /> WAVE_GAIN: +12.4dB</span>
              </div>
              <div className="uppercase tracking-[0.25em] text-[#D4AF37] font-bold animate-pulse text-center sm:text-right">
                ⚡ KCG COGNITIVE BROADCAST NETWORK ESTABLISHING SIGNAL // EN COURS ⚡
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
