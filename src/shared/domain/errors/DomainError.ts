import { ErrorType } from "./ErrorType";

export class DomainError {
  constructor(
    public readonly code: string,
    public readonly description: string,
    public readonly type: ErrorType
  ) {}

  static Conflict(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.Conflict);
  }

  static Failure(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.Failure);
  }

  static Unexpected(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.Unexpected);
  }

  static Validation(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.Validation);
  }

  static NotFound(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.NotFound);
  }

  static Unauthorized(code: string, description: string): DomainError {
    return new DomainError(code, description, ErrorType.Unauthorized);
  }
}
