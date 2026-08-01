export interface ISpan {
  id: string;
  name: string;
  startTime: number;
  endTime?: number;
  end(): void;
}

export interface ITelemetryService {
  startSpan(name: string, context?: any): ISpan;
  recordException(error: Error, span?: ISpan): void;
}
