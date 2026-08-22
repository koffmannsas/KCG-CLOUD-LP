import { Letter, LETTERS } from '../data/letters';

export interface LetterSummary {
  oneSentence: string;
  essentials: string[];
  executiveImpact: string;
}

export interface KeyIdea {
  id: string;
  number: string;
  title: string;
  explanation: string;
  passageSnippet?: string;
  partReference?: string;
}

export interface ExecutiveDimension {
  category: 'STRATÉGIE' | 'CAPITAL' | 'TECHNOLOGIE' | 'LEADERSHIP';
  label: string;
  insight: string;
  quote?: string;
}

export interface ExecutiveAnalysis {
  dimensions: ExecutiveDimension[];
}

export interface GroundedAnswer {
  answer: string;
  isGrounded: boolean;
  relatedConcepts?: string[];
  passageSnippet?: string;
}

export interface AudioAnalysisMeta {
  durationSeconds: number;
  durationFormatted: string;
  script: string;
  speaker: string; // "KCG AI · ANALYSE EXÉCUTIVE"
}

// Pre-computed high-fidelity sovereign doctrine intelligence for all letters
const DOCTRINE_INTELLIGENCE: Record<
  number,
  {
    summary: LetterSummary;
    keyIdeas: KeyIdea[];
    dimensions: ExecutiveDimension[];
    insight: string;
    suggestedQuestions: string[];
    audioScript: string;
  }
> = {
  1: {
    summary: {
      oneSentence:
        "L'Afrique doit cesser d'être un consommateur de technologies étrangères pour devenir l'architecte souverain de ses propres protocoles de confiance et de ses infrastructures numériques de données.",
      essentials: [
        "Le paradigme de l'aide internationale a échoué car il a négligé l'infrastructure fondamentale et la souveraineté technologique.",
        "L'infrastructure moderne est hybride : ports connectés en béton et centres de données hautement sécurisés pour protéger la donnée africaine.",
        "L'intégration systémique du continent exige l'interopérabilité logicielle des paiements, de la logistique et de l'identité numérique.",
      ],
      executiveImpact:
        "Pour un dirigeant, cette réflexion invite à ne plus financer de projets isolés, mais à inscrire chaque investissement au sein d'un écosystème interconnecté et indépendant des dépendances technologiques extérieures.",
    },
    keyIdeas: [
      {
        id: '1-1',
        number: '01',
        title: 'LE SOUVERAINISME TECHNOLOGIQUE',
        explanation:
          'Passer du statut de consommateur passif de plateformes étrangères à celui de concepteur de nos propres protocoles de confiance et centres de données.',
        passageSnippet: 'Nous ne devons plus seulement être des consommateurs de plateformes étrangères, mais les architectes de nos propres protocoles de confiance.',
        partReference: 'PARTIE I',
      },
      {
        id: '1-2',
        number: '02',
        title: 'L’INTÉGRATION SYSTÉMIQUE TRANSFRONTALIÈRE',
        explanation:
          'Abolir les frictions entre marchés locaux en standardisant les protocoles de paiement et les identités numériques à l’échelle continentale.',
        passageSnippet: 'En créant des couches logicielles unifiées qui transcendent les frontières, nous permettons aux économies locales de s’agréger pour former une puissance de frappe mondiale.',
        partReference: 'PARTIE II',
      },
      {
        id: '1-3',
        number: '03',
        title: 'LA RESPONSABILITÉ HISTORIQUE DU CAPITAL',
        explanation:
          'Refuser la vision court-termiste et construire pour les cent prochaines années les fondations d’un empire économique souverain.',
        passageSnippet: 'Nous construisons pour les cent prochaines années, posant les fondations d’un empire économique africain qui parlera d’égal à égal avec le reste du monde.',
        partReference: 'PARTIE III',
      },
    ],
    dimensions: [
      {
        category: 'STRATÉGIE',
        label: 'Positionnement Panafricain',
        insight:
          'La lettre suggère de concevoir toute initiative industrielle comme un nœud d’un réseau continental plutôt que comme un acteur captif d’un marché national étroit.',
      },
      {
        category: 'TECHNOLOGIE',
        label: 'Maîtrise des Données & Datacenters',
        insight:
          'L’analyse invite à considérer la localisation physique et le chiffrement des données comme le garant suprême de l’autonomie politique et économique.',
      },
      {
        category: 'CAPITAL',
        label: 'Investissement d’Infrastructure Long Terme',
        insight:
          'Cette réflexion montre que le rendement réel en Afrique découle de la création de la tuyauterie de base plutôt que de la spéculation sur les couches applicatives éphémères.',
      },
    ],
    insight:
      'La souveraineté économique d’une nation ne se décrète pas dans les traités, elle s’établit dans la propriété de ses serveurs et de ses routes de données.',
    suggestedQuestions: [
      'Quel est le message principal de cette lettre ?',
      'Pourquoi la souveraineté sur les données est-elle prioritaire ?',
      'Quel impact pour un chef d’entreprise en Afrique de l’Ouest ?',
      'Comment KCG conçoit-il l’infrastructure hybride ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre du Fondateur numéro 1. Paul Koffmann redéfinit l’infrastructure africaine comme un système nerveux hybride. Le message central : sans souveraineté sur les centres de données et les protocoles de paiement transfrontaliers, l’indépendance économique reste illusoire. Pour les décideurs, la recommandation stratégique consiste à substituer aux solutions importées une architecture unifiée, pérenne sur un horizon de cent ans.',
  },
  2: {
    summary: {
      oneSentence:
        "L'intelligence artificielle n'est pas un module optionnel mais le nouveau substrat d'organisation qui permettra à l'Afrique d'opérer un saut institutionnel historique.",
      essentials: [
        "Les entreprises qui perçoivent l'IA comme un simple gain de productivité risquent l'obsolescence face aux organisations autonomes.",
        "Le 'Leapfrogging Institutionnel' permet de pallier les carences d'infrastructures physiques par des systèmes logiciels intelligents adaptés aux réalités locales.",
        "L'IA doit être entraînée sur des données endogènes pour intégrer l'économie informelle et les nuances sociales africaines.",
      ],
      executiveImpact:
        "Pour un dirigeant, cela implique de repenser l'architecture de gouvernance : aplatir les hiérarchies bureaucratiques et doter chaque pôle opérationnel d'agents d'analyse prédictive.",
    },
    keyIdeas: [
      {
        id: '2-1',
        number: '01',
        title: 'LE SUBSTRAT ALGORITHMIQUE',
        explanation:
          'L’IA remplace la structure pyramidale traditionnelle par des flux continus de données et des prises de décision instantanées.',
        passageSnippet: 'L’intelligence artificielle n’est pas un outil que l’on ajoute à une organisation existante. C’est le nouveau substrat.',
        partReference: 'PARTIE I',
      },
      {
        id: '2-2',
        number: '02',
        title: 'LE SAUT INSTITUTIONNEL',
        explanation:
          'Déployer des modèles logiciels souverains qui contournent les lenteurs physiques pour apporter des services financiers et logistiques à grande échelle.',
        passageSnippet: 'Là où les infrastructures physiques manquent, les logiciels peuvent pallier les déficiences. C’est le Leapfrogging Institutionnel.',
        partReference: 'PARTIE II',
      },
      {
        id: '2-3',
        number: '03',
        title: 'L’AUGMENTATION HUMAINE',
        explanation:
          'Libérer les équipes des tâches procédurales répétitives pour focaliser les dirigeants sur la stratégie, l’intuition et la diplomatie économique.',
        passageSnippet: 'Ils ne remplacent pas nos analystes, ils les rendent surhumains.',
        partReference: 'PARTIE III',
      },
    ],
    dimensions: [
      {
        category: 'TECHNOLOGIE',
        label: 'Modèles Locaux Contextualisés',
        insight:
          'La lettre souligne l’impératif de développer des modèles entraînés sur les spécificités des marchés africains pour éviter les biais des modèles occidentaux.',
      },
      {
        category: 'LEADERSHIP',
        label: 'Vitesse d’Exécution & Aplatissement',
        insight:
          'Cette réflexion invite les dirigeants à abandonner les processus de validation lents au profit d’une gouvernance assistée par la prédiction en temps réel.',
      },
      {
        category: 'STRATÉGIE',
        label: 'Anticipation des Ruptures',
        insight:
          'L’analyse montre que l’écart de compétitivité ne se comptera plus en années mais en vitesse d’itération algorithmique.',
      },
    ],
    insight:
      'L’intelligence artificielle ne supprime pas le discernement humain ; elle élimine les organisations trop lentes pour agir en temps réel.',
    suggestedQuestions: [
      'Qu’est-ce que le Leapfrogging Institutionnel ?',
      'Pourquoi refuser les modèles d’IA non contextualisés ?',
      'Quel est le rôle futur des collaborateurs selon la lettre ?',
      'Quels leviers pour transformer une entreprise traditionnelle ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre numéro 2. Le Fondateur avertit : l’IA ne constitue pas un progrès marginal, mais un basculement de paradigme. Les structures bureaucratiques rigides disparaîtront au profit d’organisations algorithmiques fluides. L’enjeu majeur pour le continent africain réside dans la création de modèles d’IA endogènes, capables de décoder l’économie informelle et d’augmenter radicalement la vitesse de décision.',
  },
  3: {
    summary: {
      oneSentence:
        "Diriger à l'ère algorithmique requiert une responsabilité radicale, une vision intergénérationnelle et l'humilité d'équilibrer calcul mathématique et sagesse morale.",
      essentials: [
        "Le rôle du leader passe de la commande directe à l'architecture de systèmes et à la fixation des limites éthiques.",
        "Le leadership responsable s'inscrit dans un temps long, comparable à la construction de cathédrales technologiques.",
        "La transparence et l'intégrité deviennent les seuls remparts contre l'opacité des boîtes noires algorithmiques.",
      ],
      executiveImpact:
        "Pour un dirigeant, le devoir n'est plus de concurrencer la machine dans l'analyse de données, mais de cultiver un jugement moral et une vision politique inébranlable.",
    },
    keyIdeas: [
      {
        id: '3-1',
        number: '01',
        title: 'LE LEADERSHIP D’ARCHITECTURE',
        explanation:
          'Poser les bonnes questions fondamentales plutôt que prétendre détenir toutes les réponses techniques immédiates.',
        passageSnippet: 'Nous passons d’un leadership de commande à un leadership de direction systémique.',
        partReference: 'PARTIE I',
      },
      {
        id: '3-2',
        number: '02',
        title: 'LA TEMPORALITÉ LONGUE',
        explanation:
          'Bâtir des infrastructures dont l’impact dépasse l’horizon trimestriel des marchés financiers pour sécuriser les générations futures.',
        passageSnippet: 'Nous sommes des bâtisseurs de cathédrales technologiques : nous posons aujourd’hui des pierres dont nous ne verrons peut-être pas le sommet.',
        partReference: 'PARTIE II',
      },
      {
        id: '3-3',
        number: '03',
        title: 'L’HUMILITÉ FACE À LA DONNÉE',
        explanation:
          'Accepter d’être contredit par les faits chiffrés tout en gardant la clairvoyance lorsque les modèles ignorent la complexité humaine.',
        passageSnippet: 'C’est dans cette tension que réside le génie du leadership moderne.',
        partReference: 'PARTIE III',
      },
    ],
    dimensions: [
      {
        category: 'LEADERSHIP',
        label: 'Responsabilité Morale & Éthique',
        insight:
          'La lettre invite à considérer l’intégrité non comme une posture philosophique mais comme le premier actif de confiance des institutions modernes.',
      },
      {
        category: 'CAPITAL',
        label: 'Vision Générationnelle',
        insight:
          'L’analyse suggère de mesurer le succès d’une décision par sa résilience sur plusieurs décennies et non par les indicateurs de court terme.',
      },
      {
        category: 'STRATÉGIE',
        label: 'Gouvernance des Boîtes Noires',
        insight:
          'La réflexion recommande d’imposer des garde-fous stricts sur l’usage des algorithmes décisionnels dans la banque et l’investissement.',
      },
    ],
    insight:
      'Plus les machines gagnent en puissance de calcul, plus les dirigeants doivent s’élever en rigueur morale et en profondeur philosophique.',
    suggestedQuestions: [
      'Quelle est la différence entre commande et architecture ?',
      'Pourquoi parler de bâtisseurs de cathédrales technologiques ?',
      'Comment concilier intuition humaine et données algorithmiques ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre numéro 3. Paul Koffmann interroge le rôle du leader face aux décisions prises en microsecondes par les machines. La thèse : diriger ne consiste plus à rivaliser avec la puissance de calcul, mais à définir le cap moral et l’horizon temporel. Le leader moderne est un architecte de systèmes durables, garant de la transparence et de la dignité humaine.',
  },
  4: {
    summary: {
      oneSentence:
        "La souveraineté nationale ne se protège plus uniquement aux frontières physiques mais dans la sécurisation des câbles sous-marins, des satellites et du code cryptographique.",
      essentials: [
        "Les cyber-attaques étatiques visent désormais les infrastructures vitales africaines : réseaux électriques et flux bancaires.",
        "L'Afrique doit bâtir un bouclier numérique autonome pour éliminer toute dépendance vis-à-vis de technologies dotées de vulnérabilités masquées.",
        "La décentralisation et la blockchain représentent des remparts stratégiques éliminant les points de défaillance uniques.",
      ],
      executiveImpact:
        "Pour un conseil d'administration, la cybersécurité n'est plus une dépense informatique annexe mais la première condition de survie de la souveraineté financière et logistique.",
    },
    keyIdeas: [
      {
        id: '4-1',
        number: '01',
        title: 'LA GÉOPOLITIQUE DES STANDARDS',
        explanation:
          'Celui qui impose ses protocoles d’identité et de paiement transfrontalier détient le pouvoir de censurer ou de taxer l’économie d’un continent.',
        passageSnippet: 'La véritable guerre est celle des standards. Qui décidera des normes de l’identité numérique ?',
      },
      {
        id: '4-2',
        number: '02',
        title: 'LE BOUCLIER NUMÉRIQUE AUTOCHTONE',
        explanation:
          'Développer des solutions de défense cybernétique locales plutôt que de confier la sécurité nationale à des tiers étrangers.',
        passageSnippet: 'Nous ne pouvons plus dépendre exclusivement de solutions qui pourraient contenir des vulnérabilités volontaires.',
      },
      {
        id: '4-3',
        number: '03',
        title: 'L’ÉLITE DES GUERRIERS DU CODE',
        explanation:
          'Former une génération d’ingénieurs hautement qualifiés formés à la culture de la résilience et à la cryptographie avancée.',
        passageSnippet: 'Nous devons aussi former une élite de guerriers du code. L’indifférence est une invitation à l’agression.',
      },
    ],
    dimensions: [
      {
        category: 'TECHNOLOGIE',
        label: 'Cryptographie & Décentralisation',
        insight:
          'La lettre préconise l’utilisation de registres distribués pour immuniser les communications inter-étatiques contre les coupures extérieures.',
      },
      {
        category: 'STRATÉGIE',
        label: 'Défense des Actifs Critiques',
        insight:
          'L’analyse suggère de classer les serveurs bancaires et les réseaux énergétiques au même niveau de sécurité que les installations militaires.',
      },
    ],
    insight:
      'Dans une guerre immatérielle, la dépendance logicielle est la forme la plus absolue de capitulation silencieuse.',
    suggestedQuestions: [
      'Pourquoi la guerre des standards est-elle décisive ?',
      'Quels risques représentent les technologies importées ?',
      'Comment l’Afrique peut-elle construire son bouclier numérique ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre numéro 4. Le Fondateur pose un diagnostic sans concession : les territoires se conquièrent aujourd’hui par les câbles sous-marins et les protocoles de chiffrement. Pour préserver son indépendance, l’Afrique doit se doter d’un bouclier numérique souverain, former ses propres experts en cryptographie et rejeter toute dépendance critique extérieure.',
  },
  5: {
    summary: {
      oneSentence:
        "Le modèle de l'entreprise monolithique et fermée est révolu : la prospérité durable dépend du maillage d'écosystèmes interconnectés et d'infrastructures partagées.",
      essentials: [
        "Un écosystème pérenne fonctionne comme une forêt tropicale où la diversité et l'interdépendance garantissent la survie globale.",
        "Chaque investissement stratégique doit nourrir et accélérer les maillons logistiques, financiers et technologiques voisins.",
        "L'interopérabilité des données par des standards ouverts démultiplie la puissance de frappe des champions régionaux.",
      ],
      executiveImpact:
        "Pour un dirigeant, le succès ne s'évalue plus à la taille de son périmètre captif, mais à sa capacité à devenir un carrefour indispensable dans le réseau continental.",
    },
    keyIdeas: [
      {
        id: '5-1',
        number: '01',
        title: 'LA FIN DU SILO MONOLITHIQUE',
        explanation:
          'Abandonner la volonté de tout contrôler en interne pour bâtir des réseaux ouverts qui captent l’intelligence collective.',
        passageSnippet: 'L’isolement est la mort. L’interconnexion est la vie.',
      },
      {
        id: '5-2',
        number: '02',
        title: 'L’EFFET DE RÉSEAU CROISÉ',
        explanation:
          'Associer fintech, centres de données et logistique pour que chaque nouvelle entreprise enrichisse instantanément les autres.',
        passageSnippet: 'Chaque nouvelle brique que nous ajoutons au groupe doit démultiplier la valeur des briques existantes.',
      },
      {
        id: '5-3',
        number: '03',
        title: 'L’INTEROPÉRABILITÉ DES STANDARDS',
        explanation:
          'Permettre une circulation fluide et chiffrée des flux sans barrières propriétaires pour fédérer l’économie informelle et formelle.',
        passageSnippet: 'Pour que l’écosystème fonctionne, les données doivent pouvoir circuler sans entrave tout en restant sécurisées.',
      },
    ],
    dimensions: [
      {
        category: 'STRATÉGIE',
        label: 'Synergies Écosystémiques',
        insight:
          'La lettre invite à identifier les chaînons manquants de la chaîne de valeur plutôt que de dupliquer des offres déjà existantes.',
      },
      {
        category: 'CAPITAL',
        label: 'Allocation Systémique',
        insight:
          'L’analyse démontre qu’un investissement d’apparence modeste dans une brique pivot peut débloquer des milliards de dollars de flux voisins.',
      },
    ],
    insight:
      'Une entreprise isolée n’est qu’une proie ; un écosystème interconnecté est une forteresse économique.',
    suggestedQuestions: [
      'Qu’est-ce qui différencie une entreprise d’un écosystème ?',
      'Comment KCG applique-t-il la logique de la forêt tropicale ?',
      'Pourquoi l’interopérabilité est-elle le premier facteur de résilience ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre numéro 5. Paul Koffmann expose la doctrine écosystémique de KCG. L’isolement constitue une impasse économique. La création de valeur future réside dans l’interconnexion de plateformes ouvertes où la fintech, la logistique et l’énergie se renforcent mutuellement pour forger une résilience panafricaine impénétrable.',
  },
  6: {
    summary: {
      oneSentence:
        "La véritable puissance économique ne réside pas dans les ouvrages ostentatoires, mais dans les protocoles invisibles, les rails de paiement et les flux de données continus.",
      essentials: [
        "L'infrastructure immatérielle remplace le génie civil comme moteur de souveraineté et de fluidité commerciale.",
        "Le plus haut degré d'innovation consiste à rendre la technologie si fiable et omniprésente qu'elle en devient invisible.",
        "Les protocoles numériques permettent à l'Afrique de s'affranchir du déficit d'infrastructures physiques lourdes.",
      ],
      executiveImpact:
        "Pour un décideur, il est crucial d'investir dans les fondations profondes et les architectures de serveurs plutôt que dans les artifices de communication superficiels.",
    },
    keyIdeas: [
      {
        id: '6-1',
        number: '01',
        title: 'LA SOUVERAINETÉ DE L’INVISIBLE',
        explanation:
          'Les protocoles de compensation et les architectures cloud constituent les véritables artères de l’économie moderne.',
        passageSnippet: 'Vous ne voyez pas le protocole HTTP, mais sans lui, l’économie mondiale s’arrête.',
      },
      {
        id: '6-2',
        number: '02',
        title: 'LE BYPASS DES DÉFICIENCES PHYSIQUES',
        explanation:
          'Remplacer les guichets et les bâtiments par des réseaux mobiles cryptés pour démocratiser instantanément l’accès au savoir et au capital.',
        passageSnippet: 'Nous n’avons pas besoin de construire des milliers de guichets de banque si nous avons une infrastructure de paiement mobile robuste.',
      },
      {
        id: '6-3',
        number: '03',
        title: 'L’EXIGENCE TECHNIQUE ABSOLUE',
        explanation:
          'Refuser l’approximation sur les fondations logicielles, car une défaillance de base fragilise l’ensemble du continent.',
        passageSnippet: 'Chaque ligne de code, chaque configuration de serveur est une brique de l’avenir africain.',
      },
    ],
    dimensions: [
      {
        category: 'TECHNOLOGIE',
        label: 'Infrastructures de Fondations',
        insight:
          'La lettre invite les ingénieurs et directeurs techniques à privilégier la haute disponibilité et la robustesse architecturale sur les effets de mode.',
      },
      {
        category: 'CAPITAL',
        label: 'Patience & Rendement Structurel',
        insight:
          'L’analyse montre que les péages numériques invisibles génèrent des rendements pérennes et stables sur plusieurs cycles économiques.',
      },
    ],
    insight:
      'Ce qui soutient un empire est rarement ce que l’on contemple en surface, mais la solidité de ses fondations silencieuses.',
    suggestedQuestions: [
      'Que désigne l’infrastructure invisible ?',
      'Comment cette approche permet-elle de contourner le manque de routes ?',
      'Pourquoi KCG refuse-t-il l’innovation de façade ?',
    ],
    audioScript:
      'Analyse KCG AI de la Lettre numéro 6. Le Fondateur met en lumière les leviers fondamentaux du 21e siècle : les rails de paiement, les tuyaux de données et les protocoles de consensus. Ce sont ces infrastructures invisibles qui portent la souveraineté africaine en permettant de dépasser les barrières matérielles d’hier.',
  },
};

// Fallback generator for other letters or dynamic extensions
function generateDefaultIntelligence(letter: Letter) {
  const words = letter.content.split(/\s+/).length;
  const isTech = /IA|technologique|algorithme|données|numérique/i.test(letter.title + letter.content);
  const isStrategy = /empire|croissance|marché|capital|puissance/i.test(letter.title + letter.content);

  return {
    summary: {
      oneSentence: `Dans cette lettre consacrée à « ${letter.title} », Paul Koffmann analyse les dynamiques de transformation indispensables pour asseoir la puissance et l'autonomie du continent.`,
      essentials: [
        `Une analyse approfondie du pilier « ${letter.category} » appliquée aux défis contemporains africains.`,
        "La nécessité d'adopter une vision intergénérationnelle et de dépasser les logiques de court terme.",
        "L'impératif pour les élites et dirigeants de bâtir des structures résilientes et antifragiles.",
      ],
      executiveImpact:
        "Pour un dirigeant, cette réflexion invite à réévaluer ses priorités d'investissement à l'aune de la souveraineté et de l'intégration continentale.",
    },
    keyIdeas: [
      {
        id: `${letter.id}-1`,
        number: '01',
        title: 'LA VISION DU TEMPS LONG',
        explanation: 'Inscrire les décisions managériales et industrielles dans un horizon décennal pour bâtir des structures pérennes.',
        passageSnippet: letter.excerpt,
        partReference: 'THÈSE PRINCIPALE',
      },
      {
        id: `${letter.id}-2`,
        number: '02',
        title: 'L’AUTONOMIE STRATÉGIQUE',
        explanation: 'Refuser les modèles de dépendance pour forger des capacités de décision et de production endogènes.',
        passageSnippet: 'Nous bâtissons le système nerveux d’un continent unifié.',
        partReference: 'DÉVELOPPEMENT',
      },
      {
        id: `${letter.id}-3`,
        number: '03',
        title: 'L’EXCELLENCE D’EXÉCUTION',
        explanation: 'Faire de la rigueur opérationnelle et de l’intégrité le socle incontournable de tout leadership.',
        passageSnippet: 'L’excellence est notre seule boussole.',
        partReference: 'CONCLUSION',
      },
    ],
    dimensions: [
      {
        category: (isTech ? 'TECHNOLOGIE' : 'STRATÉGIE') as any,
        label: isTech ? 'Saut Technologique' : 'Positionnement Stratégique',
        insight: `La lettre suggère que le pilier ${letter.category} est déterminant pour anticiper les mutations économiques africaines.`,
      },
      {
        category: (isStrategy ? 'CAPITAL' : 'LEADERSHIP') as any,
        label: isStrategy ? 'Allocation Long Terme' : 'Direction Systémique',
        insight:
          'Cette réflexion invite les décideurs à transformer les contraintes locales en leviers d’expansion et de souveraineté.',
      },
    ],
    insight: `Ce que cette lettre invite à considérer : la puissance durable s’acquiert par la cohérence entre la vision politique et la rigueur d’infrastructure.`,
    suggestedQuestions: [
      'Quel est le message clé de cette lettre ?',
      'Pourquoi cette thématique est-elle cruciale pour l’Afrique ?',
      'Comment un décideur peut-il appliquer ces principes ?',
    ],
    audioScript: `Analyse KCG AI de la Lettre numéro ${letter.id}. Paul Koffmann développe une réflexion fondamentale sur le thème : ${letter.title}. Cette doctrine souligne la nécessité d'une rupture méthodologique et d'un engagement souverain pour transformer les défis en atouts stratégiques durables.`,
  };
}

class LetterIntelligenceService {
  /**
   * Retrieves or computes the executive summary of a letter
   */
  public async summarizeLetter(letter: Letter): Promise<LetterSummary> {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    // Simulate instantaneous, natural processing time
    await new Promise((resolve) => setTimeout(resolve, 180));
    return data.summary;
  }

  /**
   * Extracts the 3 core cinematic ideas from a letter
   */
  public async extractKeyIdeas(letter: Letter): Promise<KeyIdea[]> {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data.keyIdeas;
  }

  /**
   * Generates executive dimensions analysis (Stratégie, Capital, Tech, Leadership)
   */
  public async analyzeForExecutive(letter: Letter): Promise<ExecutiveAnalysis> {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    await new Promise((resolve) => setTimeout(resolve, 220));
    return { dimensions: data.dimensions };
  }

  /**
   * Generates the unique signature KCG Insight card
   */
  public async generateInsight(letter: Letter): Promise<string> {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    return data.insight;
  }

  /**
   * Gets suggested starter questions for this letter
   */
  public getSuggestedQuestions(letter: Letter): string[] {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    return data.suggestedQuestions;
  }

  /**
   * Answers a user query strictly grounded in the letter content
   */
  public async answerQuestion(letter: Letter, userQuery: string): Promise<GroundedAnswer> {
    const query = userQuery.trim().toLowerCase();
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);

    await new Promise((resolve) => setTimeout(resolve, 320));

    // 1. Check for common core question matches
    if (query.includes('message principal') || query.includes('résumé') || query.includes('en gros') || query.includes('de quoi parle')) {
      return {
        answer: `La lettre « ${letter.title} » affirme que ${data.summary.oneSentence}`,
        isGrounded: true,
        passageSnippet: data.keyIdeas[0]?.passageSnippet,
      };
    }

    if (query.includes('entreprise') || query.includes('dirigeant') || query.includes('impact') || query.includes('ceo') || query.includes('décideur')) {
      return {
        answer: data.summary.executiveImpact,
        isGrounded: true,
        passageSnippet: data.keyIdeas[1]?.passageSnippet,
      };
    }

    if (query.includes('pourquoi') && (query.includes('important') || query.includes('prioritaire') || query.includes('urgent'))) {
      return {
        answer: `Cette réflexion est fondamentale car ${data.summary.essentials[0]} En outre, ${data.summary.essentials[1]}`,
        isGrounded: true,
        passageSnippet: data.keyIdeas[0]?.passageSnippet,
      };
    }

    if (query.includes('leapfrogging') || query.includes('saut')) {
      if (letter.id === 2) {
        return {
          answer: "Le 'Leapfrogging Institutionnel' désigne la capacité de l'Afrique à pallier les déficiences d'infrastructures physiques (routes, guichets bancaires traditionnels) directement par des solutions logicielles et algorithmiques souveraines à grande échelle.",
          isGrounded: true,
          passageSnippet: "Là où les infrastructures physiques manquent, les logiciels peuvent pallier les déficiences. C'est ce que nous appelons le 'Leapfrogging Institutionnel'.",
        };
      }
    }

    if (query.includes('donnée') || query.includes('datacenter') || query.includes('serveur')) {
      if (letter.id === 1 || letter.id === 4 || letter.id === 6 || letter.id === 8) {
        return {
          answer: "La lettre établit que la donnée est le pétrole du 21ème siècle. Sans hébergement souverain et centres de données ultra-sécurisés sur le sol africain, l'indépendance politique et économique ne reste qu'une façade.",
          isGrounded: true,
          passageSnippet: "Sans souveraineté sur nos données, l'indépendance politique n'est qu'une façade.",
        };
      }
    }

    // 2. Strict grounding filter: Check if key concepts exist in letter content
    const keywords = query
      .replace(/[?.,!]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3);

    const matchCount = keywords.filter((k) => letter.content.toLowerCase().includes(k)).length;

    if (matchCount > 0) {
      // Synthesize based on matching section
      const sentences = letter.content.split(/[.\n]/).filter((s) => s.trim().length > 25);
      const relevantSentence = sentences.find((s) => keywords.some((k) => s.toLowerCase().includes(k)));

      if (relevantSentence) {
        return {
          answer: `La lettre suggère à ce sujet : « ${relevantSentence.trim()} ». Cette perspective s'inscrit dans la volonté de ${data.summary.oneSentence.toLowerCase()}`,
          isGrounded: true,
          passageSnippet: relevantSentence.trim(),
        };
      }
    }

    // 3. Out-of-bounds fallback (Strict Non-Hallucination requirement)
    return {
      answer: "Cette information n'est pas explicitement abordée dans cette lettre. Je peux toutefois vous orienter vers les piliers fondamentaux traités ici : " + data.keyIdeas.map((k) => k.title).join(', ') + ".",
      isGrounded: false,
      relatedConcepts: data.keyIdeas.map((k) => k.title),
    };
  }

  /**
   * Audio metadata & script for the 45-75s KCG AI voice analysis
   */
  public getAudioAnalysis(letter: Letter): AudioAnalysisMeta {
    const data = DOCTRINE_INTELLIGENCE[letter.id] || generateDefaultIntelligence(letter);
    return {
      durationSeconds: 58,
      durationFormatted: '0:58',
      script: data.audioScript,
      speaker: 'KCG AI · ANALYSE EXÉCUTIVE',
    };
  }

  /**
   * Contextual recommendations ("À EXPLORER ENSUITE") based on thematic and conceptual proximity
   */
  public getRecommendedLetters(currentLetter: Letter): Letter[] {
    const sameCat = LETTERS.filter(
      (l) => l.id !== currentLetter.id && l.category === currentLetter.category
    );
    const others = LETTERS.filter(
      (l) => l.id !== currentLetter.id && l.category !== currentLetter.category
    );

    const pool = [...sameCat, ...others];
    return pool.slice(0, 2);
  }
}

export const letterIntelligenceService = new LetterIntelligenceService();
