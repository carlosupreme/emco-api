import { AsyncValidator } from "fluentvalidation-ts";
import { RegisterCommand } from "./RegisterCommand";
import { injectable } from "inversify";

@injectable()
export class RegisterCommandValidator extends AsyncValidator<RegisterCommand> {
  constructor() {
    super();

    this.ruleFor("username")
      .notEmpty()
      .withMessage("Username is required")
      .length(3, 20)
      .withMessage("Username must be between 3 and 20 characters")
      .matches(/^[a-zA-Z0-9]{3,20}$/gm)
      .withMessage("Username must contain only letters and numbers");

    this.ruleFor("password")
      .notEmpty()
      .withMessage("Password is required")
      .minLength(8)
      .withMessage("Password must be at least 8 characters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
      .withMessage(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters"
      );
  }
}
