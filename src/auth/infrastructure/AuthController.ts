import { Request, Response } from "express";
import { AuthenticateUser } from "../application/AuthenticateUser";
import { RegisterUser } from "../application/RegisterUser";
import { Uuid } from "../../shared/domain/value-objects/Uuid";
import { User } from "../domain/User";
import { Username } from "../domain/value-objects/Username";
import { Password } from "../domain/value-objects/Password";
import { UserId } from "../domain/value-objects/UserId";
import { InvalidPassword } from "../domain/exceptions/InvalidPassword";
import { InvalidUsername } from "../domain/exceptions/InvalidUsername";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { AuthenticateError } from "../domain/exceptions/AuthenticateError";

config();

export class AuthController {
  private authenticateUser: AuthenticateUser;
  private registerUser: RegisterUser;

  constructor(authenticateUser: AuthenticateUser, registerUser: RegisterUser) {
    this.authenticateUser = authenticateUser;
    this.registerUser = registerUser;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const user = await this.authenticateUser.login(username, password);

      const payload = { id: user.id.value };
      const token = jwt.sign(payload, `${process.env.SECRET_ACCESS_TOKEN}`, {
        expiresIn: 60 * 60 * 7, // 7 days
      });

      res.json({
        message: "Logged in successfully",
        user: user.toPrimitives(),
        token,
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
      const id = Uuid.random().value;
      const user = new User(
        new UserId(id),
        new Username(username),
        Password.hash(password)
      );

      await this.registerUser.register(user);
      const token = "";

      res.json({
        message: "Registered successfully. Please log in",
        user: user.toPrimitives(),
        token,
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
