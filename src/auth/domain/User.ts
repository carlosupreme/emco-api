import { Password } from "./value-objects/Password";
import { UserId } from "./value-objects/UserId";
import { Username } from "./value-objects/Username";

export class User {
  readonly id: UserId;
  readonly username: Username;
  readonly password: Password;

  constructor(id: UserId, username: Username, password: Password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static fromPrimitives(props: any): User {
    return new User(
      new UserId(props.id),
      new Username(props.username),
      new Password(props.password)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      username: this.username.value,
      password: this.password.value,
    };
  }

  passwordMatches(passwordPlainText: string): boolean {
    return this.password.matches(passwordPlainText);
  }
}
