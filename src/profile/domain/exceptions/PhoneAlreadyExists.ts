export class PhoneAlreadyExists extends Error {
  constructor(phone: string) {
    super(`The phone '${phone}' has already been registered`);
  }
}
