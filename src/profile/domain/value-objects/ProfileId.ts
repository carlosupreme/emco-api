import { Uuid } from "../../../shared/domain/value-objects/Uuid";

export class ProfileId extends Uuid {
  static generate(): ProfileId {
    return new ProfileId(Uuid.random().value);
  }
}
