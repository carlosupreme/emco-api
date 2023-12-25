export class AuthenticateError extends Error {
  constructor() {
    super("Invalid username or password");
  }
}
