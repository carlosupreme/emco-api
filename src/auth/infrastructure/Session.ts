import { NextFunction, Response } from "express";
import { SessionRequest } from "./SessionRequest";
import { JWTProvider } from "../domain/JWTProvider";

export class SessionValidator {
  private readonly jwtProvider: JWTProvider;

  constructor(jwtProvider: JWTProvider) {
    this.jwtProvider = jwtProvider;
  }

  middleware = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let token = "";
      const authorization = req.headers.authorization;

      if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
      }

      const verified = this.jwtProvider.validate(token);

      if (verified == undefined) {
        res.status(401).send("Forbidden");
        return;
      }

      req.userId = verified.userId;

      next();
    } catch (error) {
      res.send(400).json({ message: "error in your session" });
    }
  };
}
export default SessionValidator;
