import { Claims } from "./value-objects/Claims";

export interface IJWTProvider {
  generate(payload: Claims): string;
  validate(token: string): Claims | undefined;
}
