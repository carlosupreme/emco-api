import { ErrorType } from "./ErrorType";

export class DomainError {
  readonly code: string;
  readonly description: string;
  readonly type: ErrorType;

  private constructor(code: string, description: string, type: ErrorType) {
    this.code = code;
    this.description = description;
    this.type = type;
  }

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
