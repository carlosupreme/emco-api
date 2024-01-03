import { DomainError } from "./DomainError";
import { IErrorOr } from "./IErrorOr";

export class ErrorOr<T> implements IErrorOr<T> {
  readonly value?: T;
  readonly errors?: DomainError[];

  private constructor(value?: T, ...errors: DomainError[]) {
    this.value = value;
    this.errors = errors;
  }

  static success<T>(value: T): ErrorOr<T> {
    return new ErrorOr<T>(value);
  }

  static failure<T>(...errors: DomainError[]): IErrorOr<T> {
    return new ErrorOr<T>(undefined, ...errors);
  }

  getValue(): T {
    return this.value!;
  }

  isError(): boolean {
    return this.errors !== undefined && this.errors.length > 0;
  }
}
