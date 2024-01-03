import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";
import bcrypt from "bcrypt";

export class Password extends ValueObject<string> {
  constructor(password: string) {
    super(password);
  }

  static hash(plainTextPassword: string): Password {
    return new Password(
      bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync())
    );
  }

  matches(plainTextPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, this.value);
  }
}
