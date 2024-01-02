import { IJWTProvider } from "../domain/JWTProvider";
import { JWT } from "../domain/value-objects/JWT";
import jwt from "jsonwebtoken";
import JWTSettings from "./config/JWTSettings";
import { injectable } from "inversify";

@injectable()  
export class JsonWebTokenProvider implements IJWTProvider {
  generate(payload: object): string {
    try {
      return jwt.sign(payload, JWTSettings.SECRET_KEY, {
        expiresIn: JWTSettings.EXPIRES_IN,
      });
    } catch (e) {
      return "";
    }
  }

  validate(token: string): JWT | undefined {
    try {
      const verified = jwt.verify(token, JWTSettings.SECRET_KEY);
      return <JWT>verified;
    } catch (e) {
      console.log("error", e);
      return undefined;
    }
  }
}
