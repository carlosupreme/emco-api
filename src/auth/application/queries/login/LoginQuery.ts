import { ErrorOr } from "../../../../shared/domain/errors/ErrorOr";
import { AuthenticationResponse } from "../../AuthenticationResponse";
import { IQuery } from "../../../../shared/application/queries/IQuery";

export class LoginQuery implements IQuery<ErrorOr<AuthenticationResponse>> {
  constructor(readonly username: string, readonly password: string) {}
}
