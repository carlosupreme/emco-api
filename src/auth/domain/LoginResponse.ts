import { User } from "./User";

export class LoginResponse {
  readonly user: User;
  readonly token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}
