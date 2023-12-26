import { Request } from "express";
import { UserId } from "../domain/value-objects/UserId";

export interface SessionRequest extends Request {
  userId?: UserId;
}
