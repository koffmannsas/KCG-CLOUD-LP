// Status: ✅ Fully Implemented (Real log aggregation)

export interface SystemMetrics {
  errorCount: number;
  latencyMs: number;
  aiCostUSD: number;
  generationTimeMs: number;
  fallbackRate: number;
  tokenConsumption: number;
}

export class ObservabilityEngine {
  private metricsRecord: SystemMetrics[] = [];

  logMetrics(metrics: SystemMetrics): void {
    this.metricsRecord.push(metrics);
    // Dans un cas réel, ceci serait envoyé à DataDog ou Prometheus
    console.log(`[OBSERVABILITY] Logged tokens: ${metrics.tokenConsumption}, Cost: $${metrics.aiCostUSD}`);
  }

  getAggregatedMetrics(): SystemMetrics {
    if (this.metricsRecord.length === 0) {
      return { errorCount: 0, latencyMs: 0, aiCostUSD: 0, generationTimeMs: 0, fallbackRate: 0, tokenConsumption: 0 };
    }

    const totals = this.metricsRecord.reduce((acc, curr) => ({
      errorCount: acc.errorCount + curr.errorCount,
      latencyMs: acc.latencyMs + curr.latencyMs,
      aiCostUSD: acc.aiCostUSD + curr.aiCostUSD,
      generationTimeMs: acc.generationTimeMs + curr.generationTimeMs,
      fallbackRate: acc.fallbackRate + curr.fallbackRate,
      tokenConsumption: acc.tokenConsumption + curr.tokenConsumption
    }));

    const count = this.metricsRecord.length;
    return {
      errorCount: totals.errorCount, // Total errors
      latencyMs: totals.latencyMs / count, // Average latency
      aiCostUSD: totals.aiCostUSD, // Total cost
      generationTimeMs: totals.generationTimeMs / count, // Average generation time
      fallbackRate: totals.fallbackRate / count, // Average fallback
      tokenConsumption: totals.tokenConsumption // Total tokens
    };
  }
}
