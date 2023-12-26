export class EmailAlreadyExists extends Error {
  constructor(email: string) {
    super(`The email '${email}' has already been registered`);
  }
}
