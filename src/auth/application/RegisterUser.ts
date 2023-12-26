import { User } from "../domain/User";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
import { UserRepository } from "../domain/UserRepository";
import { Profile } from "../../profile/domain/Profile";
import { ProfileRepository } from "../../profile/domain/ProfileRepository";
import { SchoolData } from "../../profile/domain/SchoolData";

export class RegisterUser {
  private userRepository: UserRepository;
  private profileRepository: ProfileRepository;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository
  ) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  register = async (
    user: User,
    profile: Profile,
    schoolData: SchoolData
  ): Promise<void> => {
    const usernameIsTaken = await this.userRepository.exists(user);

    if (usernameIsTaken) {
      throw new UserAlreadyExists(user.username.value);
    }

    this.userRepository.save(user);
    this.profileRepository.save(profile, schoolData);
  };
}
