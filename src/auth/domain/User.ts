import { Password } from "./Password";
import { UserId } from "./UserId";
import { Username } from "./Username";

export class User {
  readonly id: UserId;
  readonly username: Username;
  readonly password: Password;

  constructor(id: UserId, username: Username, password: Password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  passwordMatches(passwordPlainText: string): boolean {
    return this.password.matches(passwordPlainText);
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      username: this.username.value,
      password: this.password.value,
    };
  }
}
