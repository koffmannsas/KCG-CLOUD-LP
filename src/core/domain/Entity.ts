export abstract class Entity<T> {
  public readonly id: T;

  protected constructor(id: T) {
    this.id = id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!(object instanceof Entity)) {
      return false;
    }
    return this.id === object.id;
  }
}

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: any[] = [];

  get domainEvents(): any[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: any): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
