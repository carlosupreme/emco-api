import { UserId } from "../../auth/domain/value-objects/UserId";
import { Email } from "./value-objects/Email";
import { Fullname } from "./value-objects/Fullname";
import { Phone } from "./value-objects/Phone";
import { Photo } from "./value-objects/Photo";
import { ProfileId } from "./value-objects/ProfileId";
import { RegisteredAt } from "./value-objects/RegisteredAt";
import { SocialMedia } from "./value-objects/SocialMedia";

export class Profile {
  readonly id: ProfileId;
  readonly userId: UserId;
  readonly fullname: Fullname;
  readonly email: Email;
  readonly phone: Phone;
  readonly photo: Photo;
  readonly socialMedia: SocialMedia;
  readonly registeredAt: RegisteredAt;

  constructor(
    id: ProfileId,
    userId: UserId,
    fullname: Fullname,
    email: Email,
    phone: Phone,
    photo: Photo,
    socialMedia: SocialMedia,
    registeredAt: RegisteredAt
  ) {
    this.id = id;
    this.userId = userId;
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
    this.socialMedia = socialMedia;
    this.registeredAt = registeredAt;
  }

  static fromPrimitives(props: any): Profile {
    return new Profile(
      new ProfileId(props.id),
      new UserId(props.userId),
      new Fullname(props.fullname),
      new Email(props.email),
      new Phone(props.phone),
      new Photo(props.photo),
      new SocialMedia(props.socialMedia),
      new RegisteredAt(props.registeredAt)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      userId: this.userId.value,
      fullname: this.fullname.value,
      email: this.email.value,
      phone: this.phone.value,
      photo: this.photo.value,
      socialMedia: this.socialMedia.socialMedia,
      registeredAt: this.registeredAt.value,
    };
  }
}
