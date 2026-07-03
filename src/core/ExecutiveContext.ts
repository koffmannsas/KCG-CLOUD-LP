// Phase 3: Executive Context Unique

export class ExecutiveContext {
  private static instance: ExecutiveContext;

  public state = {
    userId: null as string | null,
    digitalTwinLoaded: false,
    warRoomActive: false,
    boardroomState: 'IDLE',
    radioQueueLength: 0,
    predictionsActive: 0
  };

  private constructor() {}

  public static getInstance(): ExecutiveContext {
    if (!ExecutiveContext.instance) {
      ExecutiveContext.instance = new ExecutiveContext();
    }
    return ExecutiveContext.instance;
  }

  public update(partialState: Partial<typeof ExecutiveContext.instance.state>) {
    this.state = { ...this.state, ...partialState };
  }
}
