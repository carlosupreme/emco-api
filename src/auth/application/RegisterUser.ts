import { UserRepository } from "../domain/UserRepository";
import { ErrorWrapper } from "../../shared/domain/errors/ErrorWrapper";
import { RegisterErrors } from "../domain/errors/RegisterErrors";
import { User } from "../domain/User";
import { UserId } from "../domain/value-objects/UserId";
import { Username } from "../domain/value-objects/Username";
import { Password } from "../domain/value-objects/Password";
import { AuthenticationResponse } from "./AuthenticationResponse";
import { JWTProvider } from "../domain/JWTProvider";

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
  ): Promise<AuthenticationResponse | ErrorWrapper> => {
    if (await this.userRepository.findByUsername(username)) {
      return ErrorWrapper.from(RegisterErrors.UserAlreadyExists);
    }

    const user = new User(
      UserId.generate(),
      new Username(username),
      Password.hash(password)
    );

    this.userRepository.save(user);

    const token = this.jsonWebTokenProvider.generate({ userId: user.id.value });

    return new AuthenticationResponse(username, token);
  };
}
