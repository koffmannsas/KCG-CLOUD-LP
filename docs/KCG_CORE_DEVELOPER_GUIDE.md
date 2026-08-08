# KCG CORE - DEVELOPER GUIDE

## 1. INVERSION OF CONTROL (IoC)
Developers must not instantiate core services using `new`. You must request them from the CoreContainer via the SDK or ServiceRegistry. Depend exclusively on the interfaces defined in `src/core/contracts/`.

## 2. CQRS PIPELINE
For complex transactions, decouple reads from writes:
- Place mutations in `src/core/cqrs/commands/`
- Place data fetches in `src/core/cqrs/queries/`

## 3. DOMAIN EVENTS
Domain events must be published by the `AggregateRoot` (see `src/core/domain/Entity.ts`) and committed via the `IEventStore`. No direct database row manipulation is allowed for event-sourced entities.

## 4. TELEMETRY
Always wrap external IO calls (HTTP, DB, AI) within an `ISpan` using the `ITelemetryService` to ensure request correlation across microservices.
