import { DomainError } from "../../shared/domain/errors/DomainError";

export const JsonToValidationErrors = (errors: object) =>
  Object.entries(errors).map(([key, value]) =>
    DomainError.Validation(key, value as string)
  );

export const DomainErrorsToJson = (errors: DomainError[]) =>
  errors.reduce(
    (json, error) => ({ ...json, [error.code]: error.description }),
    {}
  );
