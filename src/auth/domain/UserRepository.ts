import { User } from "./User";

export interface UserRepository {
  exists: (user: User) => Promise<boolean>;
  save: (user: User) => Promise<void>;
}
