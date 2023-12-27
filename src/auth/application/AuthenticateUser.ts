import { ErrorWrapper } from "../../shared/domain/errors/ErrorWrapper";
import { JWTProvider } from "../domain/JWTProvider";
import { LoginResponse } from "../domain/LoginResponse";
import { UserRepository } from "../domain/UserRepository";
import { AuthenticateError } from "../domain/errors/AuthenticateError";

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
  ): Promise<LoginResponse | ErrorWrapper> => {
    const user = await this.userRepository.findByUsername(username);

    if (user == undefined || !user.passwordMatches(password)) {
      return new ErrorWrapper("Auth", AuthenticateError.InvalidCredentials);
    }

    const token = this.jsonWebTokenProvider.generate({ userId: user.id.value });

    return new LoginResponse(user, token);
  };
}
