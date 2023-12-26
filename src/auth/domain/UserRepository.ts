import { User } from "./User";

export interface UserRepository {
  findByUsername: (username: string) => Promise<User | undefined>;
  exists: (user: User) => Promise<boolean>;
  save: (user: User) => Promise<void>;
}
