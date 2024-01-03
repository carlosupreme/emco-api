import { NextFunction, Response } from "express";
import { SessionRequest } from "./SessionRequest";
import { IJWTProvider } from "../domain/JWTProvider";
import { inject, injectable } from "inversify";
import { EMCO_INTERFACES } from "../../app/EMCO_INTERFACES";

@injectable()
export class SessionValidator {
  constructor(
    @inject(EMCO_INTERFACES.IJWTProvider) private readonly jwtProvider: IJWTProvider
  ) {}

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
