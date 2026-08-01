export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface IValidator<T> {
  validate(target: T): ValidationResult;
}
