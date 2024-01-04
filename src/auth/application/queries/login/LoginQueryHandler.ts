import { IRequestHandler, requestHandler } from "mediatr-ts";
import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";
import { IJWTProvider } from "../../../domain/JWTProvider";
import { UserRepository } from "../../../domain/UserRepository";
import { AuthErrors } from "../../../domain/errors/AuthErrors";
import { AuthenticationResponse } from "../../AuthenticationResponse";
import { LoginQuery } from "./LoginQuery";
import { inject, injectable } from "inversify";
import { constants } from "../../../../app/constants";

@requestHandler(LoginQuery)
@injectable()
export class LoginQueryHandler
  implements IRequestHandler<LoginQuery, ErrorOr<AuthenticationResponse>>
{
  constructor(
    @inject(constants.UserRepository)
    private userRepository: UserRepository,
    @inject(constants.IJWTProvider) private JWTProvider: IJWTProvider
  ) {}

  handle = async (
    query: LoginQuery
  ): Promise<ErrorOr<AuthenticationResponse>> => {
    const user = await this.userRepository.findByUsername(query.username);

    if (user == undefined || !user.passwordMatches(query.password)) {
      return ErrorOr.failure(AuthErrors.InvalidCredentials);
    }

    const token = this.JWTProvider.generate(user.toPrimitives());

    return ErrorOr.success(new AuthenticationResponse(query.username, token));
  };
}
