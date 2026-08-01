# KCG CORE - ARCHITECTURE GUIDE & DEPENDENCY GRAPH

## LAYER ARCHITECTURE
1. **Presentation (UI):** React components (strictly forbidden from importing DB/AI directly).
2. **Adapters (Port):** REST, GraphQL, SDK (mediates between UI and Domain).
3. **Application Layer:** CQRS Commands/Queries, Event Handlers.
4. **Domain Layer:** Entities, Value Objects, Domain Events.
5. **Infrastructure Layer:** Concrete ServiceRegistry, ILogger, IStorage, AIProvider.

## KERNEL BOOT FLOW
1. Boot -> `KCGKernel` initializes.
2. Registers Base Services (`ConfigurationService`, `KCGLogger`).
3. Loads Dependency Injection Container.
4. Discovers and installs `IPlugin` modules.
5. Emits `KernelState.RUNNING`.
