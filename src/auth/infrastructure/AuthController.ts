import { Request, Response } from "express";
import { AuthenticateUser } from "../application/AuthenticateUser";
import { RegisterUser } from "../application/RegisterUser";
import { User } from "../domain/User";
import { Username } from "../domain/value-objects/Username";
import { Password } from "../domain/value-objects/Password";
import { UserId } from "../domain/value-objects/UserId";
import { InvalidPassword } from "../domain/exceptions/InvalidPassword";
import { InvalidUsername } from "../domain/exceptions/InvalidUsername";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
import { AuthenticateError } from "../domain/exceptions/AuthenticateError";

export class AuthController {
  private authenticateUser: AuthenticateUser;
  private registerUser: RegisterUser;

  constructor(authenticateUser: AuthenticateUser, registerUser: RegisterUser) {
    this.authenticateUser = authenticateUser;
    this.registerUser = registerUser;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const loginResponse = await this.authenticateUser.login(
        username,
        password
      );

      res.json({
        message: "Logged in successfully",
        user: loginResponse.user.toPrimitives(),
        token: loginResponse.token,
      });
    } catch (error) {
      if (error instanceof AuthenticateError)
        res.status(400).json({ message: error.message });
      else {
        res.status(500).json({ error: true, message: (<Error>error).message });
      }
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const user = new User(
        UserId.generate(),
        new Username(username),
        Password.hash(password)
      );

      await this.registerUser.register(user);

      res.json({
        message: "Registered successfully. Please log in",
        user: user.toPrimitives(),
      });
    } catch (error) {
      if (
        error instanceof InvalidPassword ||
        error instanceof InvalidUsername ||
        error instanceof UserAlreadyExists
      ) {
        res.status(400).json({ error: true, message: error.message });
      } else {
        res.status(500).json({ error: true, message: (<Error>error).message });
      }
    }
  };
}
