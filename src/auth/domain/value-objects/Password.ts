import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";
import { InvalidPassword } from "../errors/InvalidPassword";
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
      throw new InvalidPassword();
    }
  }

  matches(plainTextPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, this.value);
  }
}
