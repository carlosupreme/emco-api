import { AuthenticateError } from "../../domain/AuthenticateError";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class RegisterUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<void> {
    const usernameIsTaken = await this.userRepository.exists(user);
    if (usernameIsTaken) {
      throw new AuthenticateError("User already exists. Try another username");
    }

    this.userRepository.save(user);
  }
}
