import { IJWTProvider } from "../domain/JWTProvider";
import { Claims } from "../domain/value-objects/Claims";
import jwt from "jsonwebtoken";
import JWTSettings from "./config/JWTSettings";
import { injectable } from "inversify";

@injectable()
export class JsonWebTokenProvider implements IJWTProvider {
  generate(payload: Claims): string {
    try {
      return jwt.sign(payload, JWTSettings.SECRET_KEY, {
        expiresIn: JWTSettings.EXPIRES_IN,
      });
    } catch (e) {
      return "";
    }
  }

  validate(token: string): Claims | undefined {
    try {
      const verified = jwt.verify(token, JWTSettings.SECRET_KEY);
      return <Claims>verified;
    } catch (e) {
      return undefined;
    }
  }
}
