import { DomainError as Error } from "../../../shared/domain/errors/DomainError";

export class AuthErrors {
  static InvalidCredentials: Error = Error.Conflict(
    "Auth.InvalidCredentials",
    "Invalid username or password"
  );
}
