import { IService, IPlugin } from '../types/base.types';
import { KCGKernel } from '../kernel/KCGKernel';

export class PluginManager implements IService {
  name: string = 'PluginManager';
  version: string = '1.0.0';

  private kernel: KCGKernel;

  constructor() {
    this.kernel = KCGKernel.getInstance();
  }

  public async initialize(): Promise<void> {}

  public async shutdown(): Promise<void> {}

  public async installPlugin(plugin: IPlugin): Promise<void> {
    await this.kernel.loadPlugin(plugin);
  }

  // Allow dynamic discovery and loading of future plugins
  public async discoverAndLoad(): Promise<void> {
    // Enterprise: Scan directory or registry for plugins, then install them
  }
}
