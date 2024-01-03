import { DomainError } from "./DomainError";

export interface IErrorOr<T> {
  readonly errors?: DomainError[];
  isError(): boolean;
  getValue(): T;
}
