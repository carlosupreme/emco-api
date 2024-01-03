import { createPool, Pool } from "mysql2/promise";
import credentials from "./config/MySQLCredentials";
import { injectable } from "inversify";

@injectable()
export class MySQLConnection {
  readonly pool: Pool;

  constructor() {
    this.pool = createPool(credentials());
  }
}
