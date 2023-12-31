import { UserRepository } from "../../../domain/UserRepository";
import { RegisterErrors } from "../../../domain/errors/RegisterErrors";
import { User } from "../../../domain/User";
import { UserId } from "../../../domain/value-objects/UserId";
import { Username } from "../../../domain/value-objects/Username";
import { Password } from "../../../domain/value-objects/Password";
import { AuthenticationResponse } from "../../AuthenticationResponse";
import { JWTProvider } from "../../../domain/JWTProvider";
import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";

export class RegisterUser {
  private userRepository: UserRepository;
  private jsonWebTokenProvider: JWTProvider;

  constructor(userRepository: UserRepository, JWTProvider: JWTProvider) {
    this.userRepository = userRepository;
    this.jsonWebTokenProvider = JWTProvider;
  }

  register = async (
    username: string,
    password: string
  ): Promise<ErrorOr<AuthenticationResponse>> => {
    if (await this.userRepository.findByUsername(username)) {
      return ErrorOr.failure(RegisterErrors.UserAlreadyExists);
    }

    const user = new User(
      UserId.generate(),
      new Username(username),
      Password.hash(password)
    );

    this.userRepository.save(user);

    const token = this.jsonWebTokenProvider.generate({ userId: user.id.value });

    return ErrorOr.success(new AuthenticationResponse(username, token));
  };
}
