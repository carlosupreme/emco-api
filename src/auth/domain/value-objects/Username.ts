import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";
import { InvalidUsername } from "../exceptions/InvalidUsername";

export class Username extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    Username.validate(value);
  }

  static validate(value: string): void {
    if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/i.test(value)) {
      throw new InvalidUsername();
    }
  }
}
