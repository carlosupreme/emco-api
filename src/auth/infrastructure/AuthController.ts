import { Request, Response } from "express";
import { LoginUser } from "../application/queries/login/LoginUser";
import { RegisterUser } from "../application/commands/register/RegisterUser";
import { ApiController } from "../../shared/infrastructure/ApiController";
import { ErrorOr } from "../../shared/domain/errors/ErrorOr";
import { AuthenticationResponse } from "../application/AuthenticationResponse";

export class AuthController extends ApiController {
  private loginUser: LoginUser;
  private registerUser: RegisterUser;

  constructor(loginUser: LoginUser, registerUser: RegisterUser) {
    super();
    this.loginUser = loginUser;
    this.registerUser = registerUser;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    if (!username || !password)
      return res.send("Please provide username and password");

    const registerResult: ErrorOr<AuthenticationResponse> =
      await this.registerUser.register(username, password);

    if (registerResult.isError()) {
      return this.problem(registerResult.errors!, res);
    }

    return res.json({
      message: "You have been successfully registered.",
      ...registerResult,
    });
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res.send("Please provide username and password");

    const loginResult: ErrorOr<AuthenticationResponse> =
      await this.loginUser.login(username, password);

    if (loginResult.isError()) {
      return this.problem(loginResult.errors!, res);
    }

    return res.json({
      message: "Logged in successfully",
      ...loginResult,
    });
  };
}
