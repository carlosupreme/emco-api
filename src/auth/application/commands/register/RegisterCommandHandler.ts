import { UserRepository } from "../../../domain/UserRepository";
import { RegisterErrors } from "../../../domain/errors/RegisterErrors";
import { User } from "../../../domain/User";
import { UserId } from "../../../domain/value-objects/UserId";
import { Username } from "../../../domain/value-objects/Username";
import { Password } from "../../../domain/value-objects/Password";
import { AuthenticationResponse } from "../../AuthenticationResponse";
import { IJWTProvider } from "../../../domain/JWTProvider";
import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";
import { RegisterCommand } from "./RegisterCommand";
import { IRequestHandler, requestHandler } from "mediatr-ts";
import { inject, injectable } from "inversify";
import { EMCO_INTERFACES } from "../../../../app/EMCO_INTERFACES";

@requestHandler(RegisterCommand)
@injectable()
export class RegisterCommandHandler
  implements IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResponse>>
{
  constructor(
    @inject(EMCO_INTERFACES.UserRepository)
    private userRepository: UserRepository,
    @inject(EMCO_INTERFACES.IJWTProvider) private JWTProvider: IJWTProvider
  ) {}

  handle = async (
    command: RegisterCommand
  ): Promise<ErrorOr<AuthenticationResponse>> => {
    if (await this.userRepository.findByUsername(command.username)) {
      return ErrorOr.failure(RegisterErrors.UserAlreadyExists);
    }

   const user = new User(
      UserId.generate(),
      new Username(command.username),
      Password.hash(command.password)
    ); 

    this.userRepository.save(user);

    const token = this.JWTProvider.generate({ userId: user.id.value });

    return ErrorOr.success(new AuthenticationResponse(command.username, token));
  };
}
