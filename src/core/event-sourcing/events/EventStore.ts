export interface IDomainEvent {
  id: string;
  aggregateId: string;
  version: number;
  timestamp: Date;
}

export interface IEventStore {
  saveEvents(aggregateId: string, events: IDomainEvent[], expectedVersion: number): Promise<void>;
  getEventsForAggregate(aggregateId: string): Promise<IDomainEvent[]>;
}
