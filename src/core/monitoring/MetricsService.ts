import { IService } from '../types/base.types';

export class MetricsService implements IService {
  name: string = 'MetricsService';
  version: string = '1.0.0';

  private metrics: Map<string, number[]> = new Map();

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public recordMetric(key: string, value: number): void {
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }
    this.metrics.get(key)!.push(value);
  }

  public getAverage(key: string): number {
    const data = this.metrics.get(key);
    if (!data || data.length === 0) return 0;
    return data.reduce((a, b) => a + b, 0) / data.length;
  }
}
