// Phase 2: Event Bus Unique

export type EventType =
  | 'SystemBooted'
  | 'ContextLoaded'
  | 'SignalDetected'
  | 'OpportunityCreated'
  | 'PredictionUpdated'
  | 'BoardroomRequested'
  | 'RadioGenerated'
  | 'LearningCompleted'
  | 'DashboardUpdated'
  | 'ExecutiveContextChanged';

type EventHandler = (payload: any) => void;

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<EventType, EventHandler[]> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe(event: EventType, handler: EventHandler) {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
  }

  public publish(event: EventType, payload?: any) {
    console.log(`[EVENT BUS] Dispatched: ${event}`);
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(h => h(payload));
    }
  }
}
