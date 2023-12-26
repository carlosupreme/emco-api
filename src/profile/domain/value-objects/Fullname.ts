import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class Fullname extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
