import { IService } from '../types/base.types';
import { CoreContainer } from '../providers/CoreContainer';

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, IService> = new Map();
  private container: CoreContainer;

  private constructor() {
    this.container = CoreContainer.getInstance();
  }

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public register(service: IService): void {
    if (this.services.has(service.name)) {
      throw new Error(`Service ${service.name} is already registered in the Registry.`);
    }
    this.services.set(service.name, service);
    this.container.registerSingleton(service.name, service);
  }

  public getService<T extends IService>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found in Registry.`);
    }
    return service as T;
  }

  public async initializeAll(): Promise<void> {
    for (const [name, service] of this.services.entries()) {
      try {
        await service.initialize();
      } catch (error) {
        throw new Error(`Failed to initialize service ${name}: ${error}`);
      }
    }
  }

  public async shutdownAll(): Promise<void> {
    for (const [name, service] of Array.from(this.services.entries()).reverse()) {
      try {
        await service.shutdown();
      } catch (error) {
        console.error(`Failed to shutdown service ${name}: ${error}`);
      }
    }
  }

  public getAllServices(): IService[] {
    return Array.from(this.services.values());
  }
}
