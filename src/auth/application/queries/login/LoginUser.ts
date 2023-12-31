import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";
import { JWTProvider } from "../../../domain/JWTProvider";
import { UserRepository } from "../../../domain/UserRepository";
import { AuthErrors } from "../../../domain/errors/AuthErrors";
import { AuthenticationResponse } from "../../AuthenticationResponse";

export class LoginUser {
  private userRepository: UserRepository;
  private jsonWebTokenProvider: JWTProvider;

  constructor(userRepository: UserRepository, JWTProvider: JWTProvider) {
    this.userRepository = userRepository;
    this.jsonWebTokenProvider = JWTProvider;
  }

  login = async (
    username: string,
    password: string
  ): Promise<ErrorOr<AuthenticationResponse>> => {
    const user = await this.userRepository.findByUsername(username);

    if (user == undefined || !user.passwordMatches(password)) {
      return ErrorOr.failure(AuthErrors.InvalidCredentials);
    }

    const token = this.jsonWebTokenProvider.generate({ userId: user.id.value });

    return ErrorOr.success(new AuthenticationResponse(username, token));
  };
}
