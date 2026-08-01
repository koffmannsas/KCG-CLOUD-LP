import { IService } from '../types/base.types';

export interface KCGEvent<T = any> {
  id: string;
  type: string;
  timestamp: Date;
  payload: T;
  source: string;
}

export type EventHandler<T = any> = (event: KCGEvent<T>) => Promise<void> | void;

export class KCGEventBus implements IService {
  name: string = 'KCGEventBus';
  version: string = '1.0.0';

  private handlers: Map<string, EventHandler[]> = new Map();

  public async initialize(): Promise<void> {}

  public async shutdown(): Promise<void> {
    this.handlers.clear();
  }

  public subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  public unsubscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) return;

    const currentHandlers = this.handlers.get(eventType)!;
    this.handlers.set(
      eventType,
      currentHandlers.filter(h => h !== handler)
    );
  }

  public async publish<T>(event: KCGEvent<T>): Promise<void> {
    if (!this.handlers.has(event.type)) return;

    const handlers = this.handlers.get(event.type)!;

    // Enterprise: This would include dead-letter queues, retry, and priority.
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Error processing event ${event.type} [${event.id}]:`, error);
      }
    }
  }
}
