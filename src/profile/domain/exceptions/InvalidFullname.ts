import { InvalidArgumentError } from "../../../shared/domain/value-objects/InvalidArgumentError";

export class InvalidFullname extends InvalidArgumentError {
  constructor() {
    super(`The Fullname
        - At least 6 chars.
        - Can contain characters a-z, 0-9, underscores and periods. 
        - Cannot start with a period nor end with a period. 
        - It must also not have more than one period sequentially. 
        - Max length is 30 chars.
      `);
  }
}
