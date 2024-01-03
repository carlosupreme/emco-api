import { JWT } from "./value-objects/JWT";

export interface IJWTProvider {
  generate(payload: object): string;
  validate(token: string): JWT | undefined;
}
