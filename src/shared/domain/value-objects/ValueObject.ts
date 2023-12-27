import { InvalidArgumentError } from "../errors/InvalidArgumentError";

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.ensureValueIsDefined(value);
    this.value = value;
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(`${this.constructor.name} must be defined`);
    }

    if ((value instanceof String || typeof value === "string") && value.trim().length === 0) {
      throw new InvalidArgumentError(`${this.constructor.name} cannot be empty`);
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }
}
