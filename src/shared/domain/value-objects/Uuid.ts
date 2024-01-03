import { v4 as uuid } from "uuid";
import validate from "uuid-validate";
import { ValueObject } from "./ValueObject";
import { DomainError } from "../errors/DomainError";

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw DomainError.Validation(
        "InvalidUuid",
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }
}
