import { ServiceRegistry } from '../registry/ServiceRegistry';
import { IPlugin, IService } from '../types/base.types';

export enum KernelState {
  BOOTING,
  INITIALIZING,
  RUNNING,
  SHUTTING_DOWN,
  TERMINATED,
  ERROR
}

export class KCGKernel {
  private static instance: KCGKernel;
  private state: KernelState = KernelState.BOOTING;
  private version: string = '1.0.0-omega';
  private registry: ServiceRegistry;
  private plugins: Map<string, IPlugin> = new Map();

  private constructor() {
    this.registry = ServiceRegistry.getInstance();
  }

  public static getInstance(): KCGKernel {
    if (!KCGKernel.instance) {
      KCGKernel.instance = new KCGKernel();
    }
    return KCGKernel.instance;
  }

  public async boot(): Promise<void> {
    try {
      this.state = KernelState.INITIALIZING;

      // Initialize core services
      await this.registry.initializeAll();

      this.state = KernelState.RUNNING;
    } catch (error) {
      this.state = KernelState.ERROR;
      throw new Error(`Kernel failed to boot: ${error}`);
    }
  }

  public async shutdown(): Promise<void> {
    this.state = KernelState.SHUTTING_DOWN;

    // Uninstall plugins
    for (const plugin of this.plugins.values()) {
      try {
        await plugin.uninstall(this);
      } catch (error) {
        console.error(`Failed to uninstall plugin ${plugin.name}:`, error);
      }
    }

    // Shutdown core services
    await this.registry.shutdownAll();

    this.state = KernelState.TERMINATED;
  }

  public registerService(service: IService): void {
    if (this.state !== KernelState.BOOTING && this.state !== KernelState.INITIALIZING) {
      throw new Error('Services can only be registered during kernel boot/initialization.');
    }
    this.registry.register(service);
  }

  public async loadPlugin(plugin: IPlugin): Promise<void> {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} is already loaded.`);
    }

    try {
      await plugin.install(this);
      this.plugins.set(plugin.id, plugin);
    } catch (error) {
      throw new Error(`Failed to load plugin ${plugin.id}: ${error}`);
    }
  }

  public getStatus(): { state: KernelState; version: string; services: number; plugins: number } {
    return {
      state: this.state,
      version: this.version,
      services: this.registry.getAllServices().length,
      plugins: this.plugins.size
    };
  }
}
