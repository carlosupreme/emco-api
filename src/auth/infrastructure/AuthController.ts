import { Request, Response } from "express";
import { AuthenticateUser } from "../application/AuthenticateUser";
import { RegisterUser } from "../application/RegisterUser";
import { User } from "../domain/User";
import { Username } from "../domain/value-objects/Username";
import { Password } from "../domain/value-objects/Password";
import { UserId } from "../domain/value-objects/UserId";
import { InvalidPassword } from "../domain/exceptions/InvalidPassword";
import { InvalidUsername } from "../domain/exceptions/InvalidUsername";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
import { AuthenticateError } from "../domain/exceptions/AuthenticateError";
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

export class AuthController {
  private authenticateUser: AuthenticateUser;
  private registerUser: RegisterUser;

  constructor(authenticateUser: AuthenticateUser, registerUser: RegisterUser) {
    this.authenticateUser = authenticateUser;
    this.registerUser = registerUser;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const loginResponse = await this.authenticateUser.login(
        username,
        password
      );

      res.json({
        message: "Logged in successfully",
        user: loginResponse.user.toPrimitives(),
        token: loginResponse.token,
      });
    } catch (error) {
      if (error instanceof AuthenticateError)
        res.status(400).json({ message: error.message });
      else {
        res.status(500).json({ error: true, message: (<Error>error).message });
      }
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const { fullname, email, phone, photo, socialMedia } = req.body;
    const { schoolId, major, semester } = req.body;

    try {
      const userId = UserId.generate();
      const user = new User(
        userId,
        new Username(username),
        Password.hash(password)
      );

      const profile = new Profile(
        ProfileId.generate(),
        userId,
        new Fullname(fullname),
        new Email(email),
        new Phone(phone),
        new Photo(photo),
        new SocialMedia(socialMedia),
        new RegisteredAt(new Date())
      );

      const schoolData = new SchoolData(
        new SchoolId(schoolId),
        new Major(major),
        new Semester(semester)
      );

      await this.registerUser.register(user, profile, schoolData);

      res.json({
        message: "You have been successfully registered. Please log in",
        user: {
          user: user.toPrimitives(),
          profile: profile.toPrimitives(),
          schoolData: schoolData.toPrimitives(),
        },
      });
    } catch (error) {
      if (
        error instanceof InvalidPassword ||
        error instanceof InvalidUsername ||
        error instanceof UserAlreadyExists
      ) {
        res.status(400).json({ error: true, message: error.message });
      } else {
        console.log(error);
        
        res.status(500).json({ error: true, message: (<Error>error).message });
      }
    }
  };
}
