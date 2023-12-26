import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { MySQLConnection } from "../../shared/infrastructure/MySQLConnection";

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

  findByUsername = async (username: string): Promise<User | undefined> => {
    const [rows, _fields] = await this.connection.pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );
    const results = <UserPrimitive[]>rows;

    if (results.length === 0) {
      return undefined;
    }

    return User.fromPrimitives(results[0]);
  };

  exists = async (user: User): Promise<boolean> => {
    const [rows, _fields] = await this.connection.pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [user.username.value]
    );

    return (<UserPrimitive[]>rows).length > 0;
  };

  save = async (user: User): Promise<void> => {
    await this.connection.pool.query(
      "INSERT INTO users(id, username, password) VALUES(?, ?, ?)",
      Object.values(user.toPrimitives())
    );
  };
}
