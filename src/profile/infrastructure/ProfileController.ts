import { controller } from "inversify-express-utils";
import {
  ApiController,
  authorized,
} from "../../shared/infrastructure/ApiController";

@controller("/user")
export class ProfileController extends ApiController {
  @authorized("get", "/greet")
  public async greet() {
    const greet = `Hello, ${this.httpContext.user.details.username}`;

    return this.json({ greet }, 200);
  }
}
