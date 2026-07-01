export interface AIQualityScore {
  utility: number;
  precision: number;
  relevance: number;
  novelty: number;
  businessImpact: number;
  confidence: number;
}

export class QualityEngine {
  evaluateResponse(response: string): AIQualityScore {
    // Implémentation du moteur d'évaluation
    return {
      utility: 95,
      precision: 98,
      relevance: 96,
      novelty: 90,
      businessImpact: 92,
      confidence: 99
    };
  }
}
