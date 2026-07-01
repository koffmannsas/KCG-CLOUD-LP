export type AIModel = 'DeepSeek' | 'Gemini Flash' | 'Gemini Pro' | 'Claude' | 'GPT' | 'Boardroom Multi-Agent';

export class CostOptimizer {
  routeRequest(complexity: number, urgency: number): AIModel {
    if (complexity > 90) return 'Boardroom Multi-Agent';
    if (urgency > 80) return 'Gemini Flash';
    return 'Claude';
  }

  calculateCost(model: AIModel, tokens: number): number {
    return tokens * 0.0001; // Mock cost calculation
  }
}
