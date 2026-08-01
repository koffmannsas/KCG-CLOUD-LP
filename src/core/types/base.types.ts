export interface IService {
  name: string;
  version: string;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface IPlugin {
  id: string;
  name: string;
  version: string;
  install(kernel: any): Promise<void>;
  uninstall(kernel: any): Promise<void>;
}

export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' | 'SECURITY' | 'AI' | 'AUDIT';

export interface ILogger {
  log(level: LogLevel, message: string, context?: Record<string, any>): void;
  debug(message: string, context?: Record<string, any>): void;
  info(message: string, context?: Record<string, any>): void;
  warn(message: string, context?: Record<string, any>): void;
  error(message: string, error?: Error, context?: Record<string, any>): void;
}
