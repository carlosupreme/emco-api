import { Request, Response } from "express";
import {
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { Mediator } from "mediatr-ts";
import { ErrorOr } from "../../shared/domain/errors/ErrorOr";
import { ApiController } from "../../shared/infrastructure/ApiController";
import { AuthenticationResponse } from "../application/AuthenticationResponse";
import { RegisterCommand } from "../application/commands/register/RegisterCommand";
import { LoginQuery } from "../application/queries/login/LoginQuery";
import { RegisterCommandValidator } from "../application/commands/register/RegisterCommandValidator";
import { LoginQueryValidator } from "../application/queries/login/LoginQueryValidator";

type ApiResult = ErrorOr<AuthenticationResponse>;
@controller("/auth")
export class AuthController extends ApiController {
  constructor(private mediator: Mediator) {
    super();
  }

  @httpPost("/register")
  async register(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    const command = new RegisterCommand(username, password);
    const errors = await this.validate(
      new RegisterCommandValidator(),
      command,
      res
    );
    if (errors) return errors;

    const registerResult = await this.mediator.send<ApiResult>(command);

    if (registerResult.isError()) {
      return this.problem(registerResult.errors!, res);
    }

    return res.json({
      message: "You have been successfully registered.",
      ...registerResult.getValue(),
    });
  }

  @httpPost("/login")
  async login(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    const loginQuery = new LoginQuery(username, password);
    const errors = await this.validate(
      new LoginQueryValidator(),
      loginQuery,
      res
    );
    if (errors) return errors;

    const loginResult = await this.mediator.send<ApiResult>(loginQuery);

    if (loginResult.isError()) {
      return this.problem(loginResult.errors!, res);
    }

    return res.json({
      message: "Logged in successfully",
      ...loginResult.getValue(),
    });
  }
}
