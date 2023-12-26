export class SocialMedia {
  readonly socialMedia: object;

  constructor(socialMedia: object) {
    this.socialMedia = socialMedia;
  }

  toString() {
    return JSON.stringify(this.socialMedia);
  }
}
