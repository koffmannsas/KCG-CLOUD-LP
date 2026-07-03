import { ExecutiveOrchestrator } from './core/ExecutiveOrchestrator';
import { EventBus } from './core/EventBus';

// Phase 10: Final Demo Sequence

export function runDemoSequence() {
  const bus = EventBus.getInstance();
  const orchestrator = new ExecutiveOrchestrator();

  console.log("=== INITIATING SINGULARITY DEMO SEQUENCE ===");

  // Set up passive listeners to mock Observability Engine
  bus.subscribe('ContextLoaded', () => console.log("System: Reconnaît le Digital Twin de David."));
  bus.subscribe('SignalDetected', () => console.log("System: Détecte de nouveaux signaux et met à jour les opportunités."));
  bus.subscribe('BoardroomRequested', () => console.log("System: Lance le Boardroom stratégique."));
  bus.subscribe('RadioGenerated', () => console.log("System: Prépare la Radio Executive."));

  // Execute scenario
  console.log("-> David ouvre KCG.");
  orchestrator.bootSystem('CEO_DAVID_001');

  setTimeout(() => {
    orchestrator.triggerBoardroom();
    console.log("=== DEMO SEQUENCE COMPLETED ===");
  }, 1000);
}
