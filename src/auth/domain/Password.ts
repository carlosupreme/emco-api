import { ValueObject } from "../../shared/domain/value-objects/ValueObject";
import { InvalidPassword } from "./InvalidPassword";
import bcrypt from "bcrypt";

export class Password extends ValueObject<string> {
  constructor(password: string) {
    super(password);
  }

  static hash(plainTextPassword: string): Password {
    Password.validate(plainTextPassword);
    return new Password(
      bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync())
    );
  }

  static validate(value: string): void {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)) {
      throw new InvalidPassword(`
        The password
        - Must be at least 8 characters
        - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
        - Can contain special characters
      `);
    }
  }

  matches(plainTextPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, this.value);
  }
}
