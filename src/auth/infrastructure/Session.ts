import { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { RequestWithUser } from "./RequestWithUser";
import { UserId } from "../domain/value-objects/UserId";

interface JWT {
  id: UserId;
  iat: number;
  exp: number;
}

const Session = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = "";
  const authorization = req.headers.authorization;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  try {
    const verified = jwt.verify(token, `${process.env.SECRET_ACCESS_TOKEN}`);

    if (!verified) {
      res.status(401).send("Forbidden");
    }

    req.user = <JWT>verified;

    next();
  } catch (e) {
    if (e instanceof TokenExpiredError)
      res.status(401).json({ error: true, message: e.message });
    else if (e instanceof JsonWebTokenError)
      res.status(401).json({ error: true, message: e.message });
    else {
      res.status(400).json({ error: true, message: "Invalid token" });
    }
  }
};

export default Session;
