export enum ErrorCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  AI_PROVIDER_ERROR = 'AI_PROVIDER_ERROR'
}

export class KCGException extends Error {
  public readonly code: ErrorCode;
  public readonly context?: Record<string, any>;
  public readonly isRecoverable: boolean;

  constructor(message: string, code: ErrorCode = ErrorCode.INTERNAL_ERROR, context?: Record<string, any>, isRecoverable: boolean = true) {
    super(message);
    this.name = 'KCGException';
    this.code = code;
    this.context = context;
    this.isRecoverable = isRecoverable;

    Object.setPrototypeOf(this, KCGException.prototype);
  }
}
