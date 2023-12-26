import { JWT } from "./value-objects/JWT";

export interface JWTProvider {
  generate(payload: object): string;
  validate(token: string): JWT | undefined;
}
