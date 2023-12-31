import { DomainError } from "./DomainError";

export class ErrorWrapper {
  errors: DomainError[] = [];
  readonly domain: string;

  constructor(type: string, errors: DomainError[]) {
    this.domain = type;
    this.errors = errors;
  }

  static from(error: DomainError): ErrorWrapper {
    return new ErrorWrapper(error.code, [error]);
  }

  addError(error: DomainError): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  first(): DomainError {
    return this.errors[0];
  }

  getErrors(): DomainError[] {
    return this.errors;
  }

  addErrors(errors: DomainError[]): void {
    this.errors = this.errors.concat(errors);
  }
}
