import { Request, Response } from "express";
import { AuthenticateUser } from "../application/AuthenticateUser";
import { RegisterUser } from "../application/RegisterUser";
import { User } from "../domain/User";
import { Username } from "../domain/value-objects/Username";
import { Password } from "../domain/value-objects/Password";
import { UserId } from "../domain/value-objects/UserId";
import { Profile } from "../../profile/domain/Profile";
import { ProfileId } from "../../profile/domain/value-objects/ProfileId";
import { SchoolId } from "../../profile/domain/value-objects/SchoolId";
import { Email } from "../../profile/domain/value-objects/Email";
import { Fullname } from "../../profile/domain/value-objects/Fullname";
import { Phone } from "../../profile/domain/value-objects/Phone";
import { Photo } from "../../profile/domain/value-objects/Photo";
import { RegisteredAt } from "../../profile/domain/value-objects/RegisteredAt";
import { SchoolData } from "../../profile/domain/SchoolData";
import { Major } from "../../profile/domain/value-objects/Major";
import { SocialMedia } from "../../profile/domain/value-objects/SocialMedia";
import { Semester } from "../../profile/domain/value-objects/Semester";
import { ApiController } from "../../shared/infrastructure/ApiController";
import { ErrorWrapper } from "../../shared/domain/errors/ErrorWrapper";

export class AuthController extends ApiController {
  private loginUser: AuthenticateUser;
  private registerUser: RegisterUser;

  constructor(loginUser: AuthenticateUser, registerUser: RegisterUser) {
    super();
    this.loginUser = loginUser;
    this.registerUser = registerUser;
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const loginResponseOrError = await this.loginUser.login(username, password);

    if (loginResponseOrError instanceof ErrorWrapper) {
      return this.problem(loginResponseOrError, res);
    }

    return res.json({
      message: "Logged in successfully",
      user: loginResponseOrError.user.toPrimitives(),
      token: loginResponseOrError.token,
    });
  };

  register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { fullname, email, phone, photo, socialMedia } = req.body;
    const { schoolId, major, semester } = req.body;

    // TODO: Handle errors thrown by value objects

    const user = this.createUser(username, password);

    const profile = this.createProfile(
      user,
      fullname,
      email,
      phone,
      photo,
      socialMedia
    );

    const schoolData = this.createSchoolData(schoolId, major, semester);

    const errors = await this.registerUser.register(user, profile, schoolData);

    if (errors instanceof ErrorWrapper) {
      return this.problem(errors, res);
    }

    return res.json({
      message: "You have been successfully registered. Please log in",
      user: {
        user: user.toPrimitives(),
        profile: profile.toPrimitives(),
        schoolData: schoolData.toPrimitives(),
      },
    });
  };

  private createSchoolData(schoolId: any, major: any, semester: any) {
    return new SchoolData(
      new SchoolId(schoolId),
      new Major(major),
      new Semester(semester)
    );
  }

  private createProfile(
    user: User,
    fullname: any,
    email: any,
    phone: any,
    photo: any,
    socialMedia: any
  ) {
    return new Profile(
      ProfileId.generate(),
      user.id,
      new Fullname(fullname),
      new Email(email),
      new Phone(phone),
      new Photo(photo),
      new SocialMedia(socialMedia),
      new RegisteredAt(new Date())
    );
  }

  private createUser(username: any, password: any) {
    const userId = UserId.generate();
    const usernameVO = new Username(username);
    const passwordVO = Password.hash(password);

    const user = new User(userId, usernameVO, passwordVO);
    return user;
  }
}
