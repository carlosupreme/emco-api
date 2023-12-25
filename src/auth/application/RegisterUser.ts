import { User } from "../domain/User";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
import { UserRepository } from "../domain/UserRepository";

export class RegisterUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<void> {
    const usernameIsTaken = await this.userRepository.exists(user);
    
    if (usernameIsTaken) {
      throw new UserAlreadyExists(user.username.value);
    }

    this.userRepository.save(user);
  }
}
