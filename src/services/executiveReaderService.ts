import { LETTERS, Letter } from '../data/letters';
import { readerService, ReaderLetterRecord } from './readerService';
import { letterEngagementService } from './letterEngagementService';

export type StrategicTheme =
  | 'STRATÃ‰GIE'
  | 'TECHNOLOGIE'
  | 'INTELLIGENCE'
  | 'SOUVERAINETÃ‰'
  | 'LEADERSHIP'
  | 'Ã‰CONOMIE'
  | 'CAPITAL'
  | 'AFRIQUE';

export interface ExecutiveProfile {
  onboardingCompleted: boolean;
  selectedThemes: StrategicTheme[];
  briefFormat: 'read' | 'listen' | 'both';
  createdAt: number;
  lastBriefGeneratedAt?: number;
  totalListeningMinutes: number;
}

export interface StrategicTimelineItem {
  id: string;
  month: string;
  year: string;
  theme: StrategicTheme;
  letterTitle: string;
  letterId: number;
  timestamp: number;
}

export interface ExecutiveBrief {
  id: string;
  editionNumber: number;
  dateFormatted: string;
  coreIdea: string;
  whatChanges: string;
  keyTakeaway: string;
  strategicQuestion: string;
  recommendedLetterId: number;
  audioScript: string;
  audioDurationFormatted: string;
}

export interface LetterComparison {
  letterA: Letter;
  letterB: Letter;
  commonGround: string;
  keyDifference: string;
  evolutionOfThought: string;
  strategicQuestion: string;
}

export interface ThematicCluster {
  theme: StrategicTheme;
  description: string;
  letters: Letter[];
  centralInsight: string;
}

export interface SmartRecommendation {
  letter: Letter;
  reason: string;
}

const PROFILE_STORAGE_KEY = 'kcg_executive_profile_v1';

class ExecutiveReaderService {
  private profile: ExecutiveProfile;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.profile = this.loadProfile();
  }

  private loadProfile(): ExecutiveProfile {
    if (typeof window === 'undefined') {
      return this.getDefaultProfile();
    }
    try {
      const data = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Unable to load Executive Profile', e);
    }
    return this.getDefaultProfile();
  }

  private getDefaultProfile(): ExecutiveProfile {
    return {
      onboardingCompleted: false,
      selectedThemes: ['SOUVERAINETÃ‰', 'INTELLIGENCE', 'STRATÃ‰GIE', 'CAPITAL'],
      briefFormat: 'both',
      createdAt: Date.now(),
      totalListeningMinutes: 14,
    };
  }

  private saveProfile() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.warn('Unable to save Executive Profile', e);
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
    this.listeners.forEach((l) => {
      try {
        l();
      } catch (err) {
        console.error(err);
      }
    });
  }

  // ================= 1. ONBOARDING & PREFERENCES =================
  public getProfile(): ExecutiveProfile {
    return this.profile;
  }

  public saveOnboarding(themes: StrategicTheme[], format: 'read' | 'listen' | 'both') {
    this.profile.selectedThemes = themes.length > 0 ? themes : ['SOUVERAINETÃ‰', 'STRATÃ‰GIE'];
    this.profile.briefFormat = format;
    this.profile.onboardingCompleted = true;
    this.saveProfile();
  }

  public resetOnboarding() {
    this.profile.onboardingCompleted = false;
    this.saveProfile();
  }

  public updateThemes(themes: StrategicTheme[]) {
    this.profile.selectedThemes = themes;
    this.saveProfile();
  }

  public logListeningMinutes(minutes: number) {
    this.profile.totalListeningMinutes = (this.profile.totalListeningMinutes || 0) + Math.max(1, Math.round(minutes));
    this.saveProfile();
  }

  // ================= 2. PERSONAL METRICS & INDICATORS =================
  public getReadingStats() {
    const recent = readerService.getRecentLetters();
    const saved = readerService.getSavedLetters();
    const liked = readerService.getLikedLetters();

    const readCount = Math.max(recent.length, 1);
    const savedCount = saved.length;
    const likedCount = liked.length;
    const minutesListened = this.profile.totalListeningMinutes || 18;

    // Collect all distinct categories/themes read
    const themeSet = new Set<string>();
    recent.forEach((r) => themeSet.add(r.letter.category.toUpperCase()));
    this.profile.selectedThemes.forEach((t) => themeSet.add(t));

    return {
      readCount,
      savedCount,
      likedCount,
      minutesListened,
      themesExploredCount: Math.max(themeSet.size, 3),
    };
  }

  // ================= 3. STRATEGIC TIMELINE / THREAD =================
  public getStrategicTimeline(): StrategicTimelineItem[] {
    const recent = readerService.getRecentLetters();
    const timeline: StrategicTimelineItem[] = [];

    const monthNames = [
      'Janvier', 'FÃ©vrier', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'AoÃ»t', 'Septembre', 'Octobre', 'Novembre', 'DÃ©cembre'
    ];

    if (recent.length > 0) {
      recent.forEach((item, idx) => {
        const date = new Date(item.lastReadAt || Date.now() - idx * 86400000 * 5);
        timeline.push({
          id: `timeline-${item.letter.id}`,
          month: monthNames[date.getMonth()].toUpperCase(),
          year: date.getFullYear().toString(),
          theme: (item.letter.category.toUpperCase() as StrategicTheme) || 'STRATÃ‰GIE',
          letterTitle: item.letter.title,
          letterId: item.letter.id,
          timestamp: item.lastReadAt,
        });
      });
    } else {
      // Sovereign default timeline items
      timeline.push(
        {
          id: 'tl-1',
          month: 'AOÃ›T',
          year: '2026',
          theme: 'SOUVERAINETÃ‰',
          letterTitle: 'BÃ¢tir le SystÃ¨me Nerveux de lâ€™Afrique',
          letterId: 1,
          timestamp: Date.now() - 3600000 * 24,
        },
        {
          id: 'tl-2',
          month: 'JUILLET',
          year: '2026',
          theme: 'INTELLIGENCE',
          letterTitle: 'Lâ€™Ãˆre de lâ€™Organisation Algorithmique',
          letterId: 2,
          timestamp: Date.now() - 3600000 * 24 * 30,
        },
        {
          id: 'tl-3',
          month: 'JUIN',
          year: '2026',
          theme: 'LEADERSHIP',
          letterTitle: 'Gouverner Ã  lâ€™Ãˆre de la DÃ©cision InstantanÃ©e',
          letterId: 3,
          timestamp: Date.now() - 3600000 * 24 * 60,
        }
      );
    }

    return timeline;
  }

  // ================= 4. EXECUTIVE BRIEF GENERATOR =================
  public getExecutiveBrief(): ExecutiveBrief {
    return {
      id: 'brief-weekly-current',
      editionNumber: 34,
      dateFormatted: 'SEMAINE EN COURS Â· Ã‰DITION STRATÃ‰GIQUE',
      coreIdea:
        "L'infrastructure moderne n'est plus seulement une question de gÃ©nie civil : elle repose sur la souverainetÃ© des rails de paiement et la localisation physique des serveurs de donnÃ©es.",
      whatChanges:
        "Le basculement vers l'organisation algorithmique rend caduques les hiÃ©rarchies bureaucratiques lentes. Les champions Ã©mergents intÃ¨grent l'IA non comme un outil annexe, mais comme leur colonne vertÃ©brale dÃ©cisionnelle.",
      keyTakeaway:
        "Pour un conseil d'administration, chaque projet isolÃ© doit Ãªtre requalifiÃ© en un nÅ“ud d'un Ã©cosystÃ¨me interconnectÃ© et antifragile.",
      strategicQuestion:
        "Votre organisation dÃ©tient-elle la propriÃ©tÃ© de ses donnÃ©es critiques, ou opÃ¨re-t-elle sous la dÃ©pendance silencieuse de protocoles tiers ?",
      recommendedLetterId: 1,
      audioScript:
        "KCG Executive Briefing. Ã‰dition stratÃ©gique numÃ©ro 34. Le Fondateur rappelle que la puissance Ã©conomique dâ€™un continent se forge dÃ©sormais dans ses infrastructures invisibles. Deux impÃ©ratifs pour les dirigeants : dâ€™abord, sÃ©curiser la souverainetÃ© des flux de donnÃ©es et des rails de paiement. Ensuite, aplatir les processus de gouvernance pour exÃ©cuter Ã  la vitesse de lâ€™intelligence artificielle. RÃ©fÃ©rence recommandÃ©e : Lettre numÃ©ro 1, BÃ¢tir le SystÃ¨me Nerveux de l'Afrique.",
      audioDurationFormatted: '1:12',
    };
  }

  // ================= 5. SMART EXPLAINABLE RECOMMENDATIONS =================
  public getSmartRecommendations(): SmartRecommendation[] {
    const recent = readerService.getRecentLetters();
    const saved = readerService.getSavedLetters();
    const followedThemes = this.profile.selectedThemes;

    const recommendations: SmartRecommendation[] = [];

    // Rule 1: Based on most recently consulted letter
    if (recent.length > 0) {
      const last = recent[0].letter;
      const complementary = LETTERS.find((l) => l.id !== last.id && l.category === last.category) || LETTERS[1];
      recommendations.push({
        letter: complementary,
        reason: `Parce que vous avez consultÃ© Â« ${last.title} Â»`,
      });
    } else {
      recommendations.push({
        letter: LETTERS[0],
        reason: 'Fondation doctrinale recommandÃ©e pour dÃ©buter votre parcours',
      });
    }

    // Rule 2: Based on followed interest themes
    const themeLetter = LETTERS.find(
      (l) => followedThemes.includes(l.category.toUpperCase() as StrategicTheme) && !recommendations.some((r) => r.letter.id === l.id)
    ) || LETTERS[2];

    recommendations.push({
      letter: themeLetter,
      reason: `Correspond Ã  votre centre d'intÃ©rÃªt stratÃ©gique Â« ${themeLetter.category} Â»`,
    });

    // Rule 3: High impact letter on algorithmic governance
    const thirdLetter = LETTERS.find(
      (l) => !recommendations.some((r) => r.letter.id === l.id)
    ) || LETTERS[3];

    recommendations.push({
      letter: thirdLetter,
      reason: 'RecommandÃ© par KCG AI pour son Ã©clairage sur la rÃ©silience intergÃ©nÃ©rationnelle',
    });

    return recommendations.slice(0, 3);
  }

  // ================= 6. LETTER COMPARISON ENGINE =================
  public compareLetters(idA: number, idB: number): LetterComparison {
    const letterA = LETTERS.find((l) => l.id === idA) || LETTERS[0];
    const letterB = LETTERS.find((l) => l.id === idB) || LETTERS[1];

    if (idA === 1 && idB === 2) {
      return {
        letterA,
        letterB,
        commonGround:
          'Les deux lettres soutiennent que lâ€™indÃ©pendance africaine ne peut pas reposer sur lâ€™adoption passive de technologies Ã©trangÃ¨res et exigent une infrastructure endogÃ¨ne.',
        keyDifference:
          'La Lettre 01 traite de lâ€™infrastructure physique et des centres de donnÃ©es (le substrat matÃ©riel), tandis que la Lettre 02 approfondit la couche algorithmique et la mutation organisationnelle (le substrat logiciel).',
        evolutionOfThought:
          'On observe un passage du diagnostic dâ€™infrastructure matÃ©rielle vers lâ€™accÃ©lÃ©ration de la prise de dÃ©cision en temps rÃ©el par lâ€™intelligence artificielle.',
        strategicQuestion:
          'Comment intÃ©grer votre architecture de donnÃ©es matÃ©rielle avec vos modÃ¨les dÃ©cisionnels pour Ã©viter toute rupture opÃ©rationnelle ?',
      };
    }

    if (idA === 1 && idB === 4) {
      return {
        letterA,
        letterB,
        commonGround:
          'Une affirmation commune que la souverainetÃ© politique est vide de sens sans contrÃ´le absolu des vecteurs de communication et de sÃ©curitÃ©.',
        keyDifference:
          'La Lettre 01 aborde la connectivitÃ© et les flux de paiement, tandis que la Lettre 04 se focalise sur la cyberguerre, le chiffrement et la dÃ©fense des infrastructures critiques.',
        evolutionOfThought:
          'La doctrine passe de la construction commerciale unifiÃ©e Ã  la sÃ©curisation offensive et dÃ©fensive des actifs rÃ©galiens.',
        strategicQuestion:
          'Vos protocoles de communication rÃ©sisteraient-ils Ã  une rupture dâ€™accÃ¨s aux serveurs hÃ©bergÃ©s hors du continent ?',
      };
    }

    // Dynamic institutional comparison fallback
    return {
      letterA,
      letterB,
      commonGround: `Les deux textes partagent l'exigence d'une pensÃ©e souveraine et d'un refus du court-termisme dans le secteur Â« ${letterA.category} Â» et Â« ${letterB.category} Â».`,
      keyDifference: `La Lettre 00${letterA.id} met l'accent sur Â« ${letterA.title} Â», alors que la Lettre 00${letterB.id} se concentre sur Â« ${letterB.title} Â».`,
      evolutionOfThought: `La rÃ©flexion s'Ã©largit pour lier la rigueur opÃ©rationnelle Ã  l'impact continental intergÃ©nÃ©rationnel.`,
      strategicQuestion: `Comment faire converger les enseignements de ces deux perspectives pour renforcer la rÃ©silience de votre gouvernance ?`,
    };
  }

  // ================= 7. THEMATIC CLUSTERS ("EXPLORER UNE IDÃ‰E") =================
  public getThematicClusters(): ThematicCluster[] {
    return [
      {
        theme: 'SOUVERAINETÃ‰',
        description: 'Autonomie des donnÃ©es, serveurs locaux et protocoles sans dÃ©pendance extÃ©rieure.',
        letters: LETTERS.filter((l) => /souverain|systÃ¨me nerveux|cybersÃ©curitÃ©|infrastructure/i.test(l.title + l.category)),
        centralInsight: 'La souverainetÃ© ne se dÃ©crÃ¨te pas dans les discours : elle rÃ©side dans la maÃ®trise de nos serveurs.',
      },
      {
        theme: 'INTELLIGENCE',
        description: 'Organisation algorithmique, modÃ¨les prÃ©dictifs et accÃ©lÃ©ration de la dÃ©cision.',
        letters: LETTERS.filter((l) => /intelligence|algorithmique|invisible/i.test(l.title + l.category)),
        centralInsight: 'Lâ€™intelligence artificielle Ã©limine les organisations trop lentes pour dÃ©cider en temps rÃ©el.',
      },
      {
        theme: 'CAPITAL',
        description: 'Allocation intergÃ©nÃ©rationnelle, patience institutionnelle et bÃ¢tisseurs de cathÃ©drales.',
        letters: LETTERS.filter((l) => /capital|infrastructure|Ã©cosystÃ¨me|empire/i.test(l.title + l.category)),
        centralInsight: 'Le capital souverain construit pour les cent prochaines annÃ©es.',
      },
      {
        theme: 'LEADERSHIP',
        description: 'ResponsabilitÃ© morale, architecture de systÃ¨mes et sagesse du dirigeant.',
        letters: LETTERS.filter((l) => /leadership|gouverner|responsabilitÃ©|dÃ©cision/i.test(l.title + l.category)),
        centralInsight: 'Le leader nâ€™ordonne plus en dÃ©tail : il pose lâ€™architecture et le cap Ã©thique.',
      },
    ];
  }

  // ================= 8. ASK KCG AI READER (Across User Library) =================
  public async answerLibraryQuery(userQuery: string): Promise<{
    answer: string;
    referencedLetters: Letter[];
    sourceSnippets: string[];
  }> {
    const q = userQuery.toLowerCase().trim();
    await new Promise((resolve) => setTimeout(resolve, 280));

    if (q.includes('souverain') || q.includes('donnÃ©e') || q.includes('afrique')) {
      return {
        answer:
          "Ã€ travers les lettres consultÃ©es (notamment Lettre 01 et Lettre 04), le thÃ¨me de la souverainetÃ© est dÃ©fini non pas comme un repli, mais comme la propriÃ©tÃ© absolue de nos centres de donnÃ©es et de nos protocoles d'Ã©changes Ã©conomiques afin d'Ã©viter toute censure Ã©trangÃ¨re.",
        referencedLetters: [LETTERS[0], LETTERS[3] || LETTERS[0]],
        sourceSnippets: [
          "Sans souverainetÃ© sur nos donnÃ©es, l'indÃ©pendance politique n'est qu'une faÃ§ade.",
          "La vÃ©ritable guerre est celle des standards.",
        ],
      };
    }

    if (q.includes('ia') || q.includes('intelligence') || q.includes('algorithme') || q.includes('organisation')) {
      return {
        answer:
          "Dans la pensÃ©e du Fondateur (Lettre 02), l'IA reprÃ©sente le nouveau substrat d'organisation. Les structures pyramidales sont appelÃ©es Ã  disparaÃ®tre au profit de rÃ©seaux augmentÃ©s par des modÃ¨les dÃ©cisionnels en temps rÃ©el.",
        referencedLetters: [LETTERS[1]],
        sourceSnippets: [
          "L'intelligence artificielle n'est pas un outil que l'on ajoute Ã  une organisation existante. C'est le nouveau substrat.",
        ],
      };
    }

    if (q.includes('leader') || q.includes('dirigeant') || q.includes('conseil') || q.includes('gouvern')) {
      return {
        answer:
          "Le corpus des lettres met en avant un leadership d'architecture (Lettre 03) : le dirigeant moderne ne rivalise pas avec la vitesse de calcul des machines, il fixe les garde-fous Ã©thiques et la vision temporelle longue.",
        referencedLetters: [LETTERS[2]],
        sourceSnippets: [
          "Nous passons d'un leadership de commande Ã  un leadership de direction systÃ©mique.",
        ],
      };
    }

    // Default library overview answer
    return {
      answer:
        "Votre bibliothÃ¨que de lecture KCG s'articule autour de trois impÃ©ratifs majeurs : bÃ¢tir une infrastructure technologique souveraine, adopter l'organisation algorithmique et exercer un leadership intergÃ©nÃ©rationnel rigoureux.",
      referencedLetters: [LETTERS[0], LETTERS[1], LETTERS[2]],
      sourceSnippets: [
        "Nous construisons pour les cent prochaines annÃ©es.",
        "L'excellence est notre seule boussole.",
      ],
    };
  }
}

export const executiveReaderService = new ExecutiveReaderService();
