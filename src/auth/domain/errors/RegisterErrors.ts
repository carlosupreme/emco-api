import { DomainError } from "../../../shared/domain/errors/DomainError";

export class RegisterErrors {
  static InvalidPassword: DomainError = DomainError.Validation(
    "Register.InvalidPassword",
    "Invalid password"
  );

  static InvalidUsername: DomainError = DomainError.Validation(
    "Register.InvalidUsername",
    "Invalid username"
  );

  static UserAlreadyExists: DomainError = DomainError.Conflict(
    "Register.UserAlreadyExists",
    "User already exists"
  );

  static EmailAlreadyExists: DomainError = DomainError.Conflict(
    "Register.EmailAlreadyExists",
    "Email already exists"
  );

  static PhoneAlreadyExists: DomainError = DomainError.Conflict(
    "Register.PhoneAlreadyExists",
    "Phone already exists"
  );

  static SchoolIdAlreadyExists: DomainError = DomainError.Conflict(
    "Register.SchoolIdAlreadyExists",
    "School ID already exists"
  );
}
