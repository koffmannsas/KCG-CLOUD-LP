import { IService } from '../types/base.types';

export class ConfigurationService implements IService {
  name: string = 'ConfigurationService';
  version: string = '1.0.0';

  private config: Map<string, any> = new Map();
  private environment: string = process.env.NODE_ENV || 'development';

  public async initialize(): Promise<void> {
    // In a real scenario, this would load configs dynamically based on environment
    this.config.set('env', this.environment);
  }

  public async shutdown(): Promise<void> {
    this.config.clear();
  }

  public get<T>(key: string, defaultValue?: T): T {
    if (this.config.has(key)) {
      return this.config.get(key) as T;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Configuration key ${key} not found and no default provided.`);
  }

  public set(key: string, value: any): void {
    this.config.set(key, value);
  }

  public getEnvironment(): string {
    return this.environment;
  }
}
