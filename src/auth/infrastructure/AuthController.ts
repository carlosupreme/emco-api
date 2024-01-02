import { Request, Response } from "express";
import { ApiController } from "../../shared/infrastructure/ApiController";
import { ErrorOr } from "../../shared/domain/errors/ErrorOr";
import { AuthenticationResponse } from "../application/AuthenticationResponse";
import { Mediator } from "mediatr-ts";
import { RegisterCommand } from "../application/commands/register/RegisterCommand";
import { LoginQuery } from "../application/queries/login/LoginQuery";
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";

@controller("/auth")
export class AuthController extends ApiController {
  private mediator: Mediator;

  constructor(mediator: Mediator) {
    super();
    this.mediator = mediator;
  }

  @httpGet("/test")
  async test(@request() _req: Request, @response() res: Response) {
    return res.json({
      message: "You are authenticated",
    });
  }

  @httpPost("/register")
  async register(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.send("Please provide username and password");

    const command = new RegisterCommand(username, password);

    const registerResult = await this.mediator.send<
      ErrorOr<AuthenticationResponse>
    >(command);

    if (registerResult.isError()) {
      return this.problem(registerResult.errors!, res);
    }

    return res.json({
      message: "You have been successfully registered.",
      ...registerResult,
    });
  }

  @httpPost("/login")
  async login(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.send("Please provide username and password");

    const loginQuery = new LoginQuery(username, password);

    const loginResult = await this.mediator.send<
      ErrorOr<AuthenticationResponse>
    >(loginQuery);

    if (loginResult.isError()) {
      return this.problem(loginResult.errors!, res);
    }

    return res.json({
      message: "Logged in successfully",
      ...loginResult,
    });
  }
}
