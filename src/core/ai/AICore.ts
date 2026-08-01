import { IService } from '../types/base.types';

export interface AIProvider {
  id: string;
  generate(prompt: string, context?: any): Promise<string>;
}

export class AICore implements IService {
  name: string = 'AICore';
  version: string = '1.0.0';

  private provider: AIProvider | null = null;

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public setProvider(provider: AIProvider): void {
    this.provider = provider;
  }

  public async generate(prompt: string, context?: any): Promise<string> {
    if (!this.provider) {
      throw new Error('No AI provider registered with AICore.');
    }
    return this.provider.generate(prompt, context);
  }
}
