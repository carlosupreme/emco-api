import { DomainError } from "../../../shared/domain/errors/DomainError";

export class AuthenticateError {
  static InvalidCredentials: DomainError = DomainError.Conflict(
    "Auth.InvalidCredentials",
    "Invalid username or password"
  );
}
