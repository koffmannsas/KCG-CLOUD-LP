import { IService } from './IService';

export interface IPlugin {
  id: string;
  name: string;
  version: string;
  install(kernel: IKernel): Promise<void>;
  uninstall(kernel: IKernel): Promise<void>;
}

export enum KernelState {
  BOOTING,
  INITIALIZING,
  RUNNING,
  SHUTTING_DOWN,
  TERMINATED,
  ERROR
}

export interface IKernel {
  boot(): Promise<void>;
  shutdown(): Promise<void>;
  registerService(service: IService): void;
  loadPlugin(plugin: IPlugin): Promise<void>;
  getStatus(): { state: KernelState; version: string; services: number; plugins: number };
}
