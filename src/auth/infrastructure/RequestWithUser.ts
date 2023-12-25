import { Request } from "express";
import { UserId } from "../domain/value-objects/UserId";

export interface RequestWithUser extends Request {
  user?: { id: UserId; iat: number; exp: number };
}
