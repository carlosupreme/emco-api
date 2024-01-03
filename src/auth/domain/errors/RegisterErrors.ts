import { DomainError } from "../../../shared/domain/errors/DomainError";

export class RegisterErrors {
  static InvalidPassword: DomainError = DomainError.Validation(
    "InvalidPassword",
    "Must be at least 8 characters. Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters"
  );

  static InvalidUsername: DomainError = DomainError.Validation(
    "InvalidUsername",
    "The username must be between 3 and 20 characters long and can only contain letters and numbers"
  );

  static UserAlreadyExists: DomainError = DomainError.Conflict(
    "UserAlreadyExists",
    "User already exists"
  );

  static EmailAlreadyExists: DomainError = DomainError.Conflict(
    "EmailAlreadyExists",
    "Email already exists"
  );

  static PhoneAlreadyExists: DomainError = DomainError.Conflict(
    "PhoneAlreadyExists",
    "Phone already exists"
  );

  static SchoolIdAlreadyExists: DomainError = DomainError.Conflict(
    "SchoolIdAlreadyExists",
    "School ID already exists"
  );
}
