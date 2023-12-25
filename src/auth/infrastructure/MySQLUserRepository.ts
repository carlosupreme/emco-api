import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { MySQLConnection } from "../../shared/infrastructure/MySQLConnection";
import { AuthenticateError } from "../domain/exceptions/AuthenticateError";

type UserPrimitive = {
  id: string;
  username: string;
  password: string;
};

export class MySQLUserRepository implements UserRepository {
  readonly connection: MySQLConnection;

  constructor(connection: MySQLConnection) {
    this.connection = connection;
  }

  async findByUsername(username: string): Promise<User> {
    const [rows, _fields] = await this.connection.pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );
    const results = <UserPrimitive[]>rows;

    if (results.length === 0) {
      throw new AuthenticateError();
    }

    return User.fromPrimitives(results[0]);
  }

  async exists(user: User): Promise<boolean> {
    const [rows, _fields] = await this.connection.pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [user.username.value]
    );

    return (<UserPrimitive[]>rows).length > 0;
  }

  async save(user: User): Promise<void> {
    await this.connection.pool.query(
      "INSERT INTO users(id, username, password) VALUES(?, ?, ?)",
      Object.values(user.toPrimitives())
    );
  }
}
