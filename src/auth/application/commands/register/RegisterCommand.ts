import { IRequest } from "mediatr-ts";
import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";
import { AuthenticationResponse } from "../../AuthenticationResponse";

export class RegisterCommand
  implements IRequest<ErrorOr<AuthenticationResponse>>
{
  constructor(readonly username: string, readonly password: string) {}
}
