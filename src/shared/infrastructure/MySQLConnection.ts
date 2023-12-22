import { createPool, Pool } from "mysql2/promise";
import credentials from "./MySQLCredentials";

export class MySQLConnection {
  private static instance: MySQLConnection;
  readonly pool: Pool;

  private constructor() {
    this.pool = createPool(credentials());
  }

  static getInstance(): MySQLConnection {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = new MySQLConnection();
    }

    return MySQLConnection.instance;
  }
}
