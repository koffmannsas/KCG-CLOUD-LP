import { IService, ILogger, LogLevel } from '../types/base.types';

export class KCGLogger implements IService, ILogger {
  name: string = 'KCGLogger';
  version: string = '1.0.0';

  public async initialize(): Promise<void> {
    // Setup transports (Console, JSON, File, API)
  }

  public async shutdown(): Promise<void> {
    // Flush logs
  }

  public log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    // In enterprise, this routes to proper transports. Simple console for now.
    if (level === 'ERROR' || level === 'CRITICAL') {
      console.error(formattedMessage, context || '');
    } else if (level === 'WARNING') {
      console.warn(formattedMessage, context || '');
    } else {
      console.log(formattedMessage, context || '');
    }
  }

  public debug(message: string, context?: Record<string, any>): void {
    this.log('DEBUG', message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.log('INFO', message, context);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.log('WARNING', message, context);
  }

  public error(message: string, error?: Error, context?: Record<string, any>): void {
    const errorContext = { ...context, error: error?.message, stack: error?.stack };
    this.log('ERROR', message, errorContext);
  }
}
