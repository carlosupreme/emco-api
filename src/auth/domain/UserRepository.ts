import { User } from "./User";

export interface UserRepository {
  findByUsername: (username: string) => Promise<User>;
  exists: (user: User) => Promise<boolean>;
  save: (user: User) => Promise<void>;
}
