import { IService } from '../types/base.types';

export interface FeatureFlag {
  id: string;
  isEnabled: boolean;
  rules?: any; // Conditions for activation
}

export class FeatureManager implements IService {
  name: string = 'FeatureManager';
  version: string = '1.0.0';

  private flags: Map<string, FeatureFlag> = new Map();

  public async initialize(): Promise<void> {
    // Load flags from DB or Config
  }

  public async shutdown(): Promise<void> {
    this.flags.clear();
  }

  public isFeatureEnabled(featureId: string, context?: any): boolean {
    const flag = this.flags.get(featureId);
    if (!flag) return false;

    // Enterprise: Add rule evaluation logic (by user, role, env)
    return flag.isEnabled;
  }

  public setFeature(flag: FeatureFlag): void {
    this.flags.set(flag.id, flag);
  }
}
