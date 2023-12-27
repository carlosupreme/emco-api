import { InvalidArgumentError } from "../../../shared/domain/errors/InvalidArgumentError";

export class InvalidPassword extends InvalidArgumentError {
  constructor() {
    super(`The password
        - Must be at least 8 characters
        - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
        - Can contain special characters
      `);
  }
}
