import { IService } from '../types/base.types';

type ServiceConstructor<T> = new (...args: any[]) => T;

export class CoreContainer {
  private static instance: CoreContainer;
  private singletons: Map<string, any> = new Map();
  private transientFactories: Map<string, () => any> = new Map();

  private constructor() {}

  public static getInstance(): CoreContainer {
    if (!CoreContainer.instance) {
      CoreContainer.instance = new CoreContainer();
    }
    return CoreContainer.instance;
  }

  public registerSingleton<T>(key: string, instance: T): void {
    if (this.singletons.has(key)) {
      throw new Error(`Service ${key} is already registered as a Singleton.`);
    }
    this.singletons.set(key, instance);
  }

  public registerTransient<T>(key: string, factory: () => T): void {
    if (this.transientFactories.has(key)) {
      throw new Error(`Service ${key} is already registered as Transient.`);
    }
    this.transientFactories.set(key, factory);
  }

  public resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }
    if (this.transientFactories.has(key)) {
      const factory = this.transientFactories.get(key);
      return factory!() as T;
    }
    throw new Error(`Service ${key} not found in container.`);
  }

  public clear(): void {
    this.singletons.clear();
    this.transientFactories.clear();
  }
}
