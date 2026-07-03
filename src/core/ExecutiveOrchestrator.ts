// Phase 4: Executive Orchestrator
import { EventBus } from './EventBus';
import { ExecutiveContext } from './ExecutiveContext';

export class ExecutiveOrchestrator {
  private bus = EventBus.getInstance();
  private context = ExecutiveContext.getInstance();

  public bootSystem(userId: string) {
    this.bus.publish('SystemBooted', { timestamp: Date.now() });

    this.context.update({ userId, digitalTwinLoaded: true, warRoomActive: true });
    this.bus.publish('ContextLoaded', { userId });

    this.processInitialSignals();
  }

  private processInitialSignals() {
    this.bus.publish('SignalDetected', { source: 'Global Markets' });
    this.bus.publish('OpportunityCreated', { score: 95 });
    this.bus.publish('RadioGenerated', { status: 'Ready for playback' });
    this.bus.publish('DashboardUpdated');
  }

  public triggerBoardroom() {
    this.context.update({ boardroomState: 'ACTIVE' });
    this.bus.publish('BoardroomRequested');
  }
}
