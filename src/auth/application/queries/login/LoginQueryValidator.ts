import { AsyncValidator } from "fluentvalidation-ts";
import { injectable } from "inversify";
import { LoginQuery } from "./LoginQuery";

@injectable()
export class LoginQueryValidator extends AsyncValidator<LoginQuery> {
  constructor() {
    super();

    this.ruleFor("username").notEmpty().withMessage("Username is required");
    this.ruleFor("password").notEmpty().withMessage("Password is required");
  }
}
