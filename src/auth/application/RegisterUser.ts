import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { Profile } from "../../profile/domain/Profile";
import { ProfileRepository } from "../../profile/domain/ProfileRepository";
import { SchoolData } from "../../profile/domain/SchoolData";
import { ErrorWrapper } from "../../shared/domain/errors/ErrorWrapper";
import { RegisterError } from "../domain/errors/RegisterError";

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
  ): Promise<void | ErrorWrapper> => {
    const errorWrapper = new ErrorWrapper("Register");
    await this.validate(errorWrapper, user, profile, schoolData);

    if (errorWrapper.hasErrors()) {
      return errorWrapper;
    }

    this.userRepository.save(user);
    this.profileRepository.save(profile, schoolData);
  };

  private validate = async (
    errorWrapper: ErrorWrapper,
    user: User,
    profile: Profile,
    schoolData: SchoolData
  ): Promise<void> => {
    if (await this.userRepository.exists(user)) {
      errorWrapper.addError(RegisterError.UserAlreadyExists);
    }

    if (await this.profileRepository.keyExists("email", profile.email.value)) {
      errorWrapper.addError(RegisterError.EmailAlreadyExists);
    }

    if (await this.profileRepository.keyExists("phone", profile.phone.value)) {
      errorWrapper.addError(RegisterError.PhoneAlreadyExists);
    }

    if (
      await this.profileRepository.keyExists("schoolId", schoolData.id.value)
    ) {
      errorWrapper.addError(RegisterError.SchoolIdAlreadyExists);
    }
  };
}
