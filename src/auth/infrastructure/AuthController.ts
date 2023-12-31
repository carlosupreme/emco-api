import { Request, Response } from "express";
import { LoginUser } from "../application/LoginUser";
import { RegisterUser } from "../application/RegisterUser";
import { ApiController } from "../../shared/infrastructure/ApiController";
import { ErrorWrapper } from "../../shared/domain/errors/ErrorWrapper";

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

    const registerResult = await this.registerUser.register(
      username,
      password
    );

    if (registerResult instanceof ErrorWrapper) {
      return this.problem(registerResult, res);
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

    const responseOrError = await this.loginUser.login(username, password);

    if (responseOrError instanceof ErrorWrapper) {
      return this.problem(responseOrError, res);
    }

    return res.json({
      message: "Logged in successfully",
      ...responseOrError,
    });
  };
}
