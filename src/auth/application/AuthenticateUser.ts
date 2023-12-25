import { AuthenticateError } from "../domain/exceptions/AuthenticateError";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class AuthenticateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    if (!user.passwordMatches(password)) {
      throw new AuthenticateError();
    }

    return user;
  }
}
