import { AuthenticateError } from "../domain/exceptions/AuthenticateError";
import { JWTProvider } from "../domain/JWTProvider";
import { LoginResponse } from "../domain/LoginResponse";
import { UserRepository } from "../domain/UserRepository";

export class AuthenticateUser {
  private userRepository: UserRepository;
  private jsonWebTokenProvider: JWTProvider;

  constructor(userRepository: UserRepository, JWTProvider: JWTProvider) {
    this.userRepository = userRepository;
    this.jsonWebTokenProvider = JWTProvider;
  }

  login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    const user = await this.userRepository.findByUsername(username);

    if (user == undefined || !user.passwordMatches(password)) {
      throw new AuthenticateError();
    }

    const token = this.jsonWebTokenProvider.generate({ userId: user.id.value });

    return { user, token };
  };
}
