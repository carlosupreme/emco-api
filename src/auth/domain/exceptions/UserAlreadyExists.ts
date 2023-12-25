export class UserAlreadyExists extends Error {
  constructor(username: string) {
    super(`The username '${username}' has already been registered`);
  }
}
