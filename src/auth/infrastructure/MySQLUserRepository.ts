import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { MySQLConnection } from "../../shared/infrastructure/MySQLConnection";
import { RowDataPacket } from "mysql2";

interface UserPrimitive extends RowDataPacket {
  id: string;
  username: string;
  password: string;
}

export class MySQLUserRepository implements UserRepository {
  readonly connection: MySQLConnection;

  constructor(connection: MySQLConnection) {
    this.connection = connection;
  }

  findByUsername = async (username: string): Promise<User | undefined> => {
    const [rows, _fields] = await this.connection.pool.query<UserPrimitive[]>(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length === 0) {
      return undefined;
    }

    return User.fromPrimitives(rows[0]);
  };

  exists = async (user: User): Promise<boolean> => {
    const [rows, _fields] = await this.connection.pool.query<UserPrimitive[]>(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [user.username.value]
    );

    return rows.length > 0;
  };

  save = async (user: User): Promise<void> => {
    await this.connection.pool.query(
      "INSERT INTO users(id, username, password) VALUES(?, ?, ?)",
      Object.values(user.toPrimitives())
    );
  };
}
