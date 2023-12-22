import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { MySQLConnection } from "../../shared/infrastructure/MySQLConnection";

export class MySQLUserRepository implements UserRepository {
  readonly connection: MySQLConnection;

  constructor(connection: MySQLConnection) {
    this.connection = connection;
  }

  async exists(user: User): Promise<boolean> {
    const [rows, _fields] = await this.connection.pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [user.username.value]
    );
    const results = <Object[]>rows;
    console.log("checking if exists");
    console.log(results);

    return results.length > 0;
  }

  async save(user: User): Promise<void> {
    await this.connection.pool.query(
      "INSERT INTO users(id, username, password) VALUES(?, ?, ?)",
      Object.values(user.toPrimitives())
    );
  }
}
