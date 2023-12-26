import { UserId } from "../../auth/domain/value-objects/UserId";
import { Profile } from "./Profile";
import { SchoolData } from "./SchoolData";

export interface ProfileRepository {
  findByUserId: (userId: UserId) => Promise<Profile | undefined>;
  save: (profile: Profile, schoolData: SchoolData) => Promise<void>;
  keyExists: (key: string, value: any) => Promise<boolean>;
}
