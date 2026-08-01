import { IService } from '../types/base.types';
import { ServiceRegistry } from '../registry/ServiceRegistry';

export class HealthService implements IService {
  name: string = 'HealthService';
  version: string = '1.0.0';

  public async initialize(): Promise<void> {}
  public async shutdown(): Promise<void> {}

  public async checkHealth(): Promise<{ status: string; services: any[] }> {
    const registry = ServiceRegistry.getInstance();
    const services = registry.getAllServices();

    return {
      status: 'UP',
      services: services.map(s => ({ name: s.name, version: s.version, status: 'UP' }))
    };
  }
}
