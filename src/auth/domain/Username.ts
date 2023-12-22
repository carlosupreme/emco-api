import { ValueObject } from "../../shared/domain/value-objects/ValueObject";
import { InvalidUsername } from "./InvalidUsername";

export class Username extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    Username.validate(value);
  }

  static validate(value: string): void {
    if (value.trim().length === 0) {
      throw new InvalidUsername("The username is required");
    }

    if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/i.test(value)) {
      throw new InvalidUsername(`
        The username
        - At least 6 chars.
        - Can contain characters a-z, 0-9, underscores and periods. 
        - Cannot start with a period nor end with a period. 
        - It must also not have more than one period sequentially. 
        - Max length is 30 chars.
      `);
    }
  }
}
