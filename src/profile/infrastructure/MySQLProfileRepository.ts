import { MySQLConnection } from "../../shared/infrastructure/MySQLConnection";
import { RowDataPacket } from "mysql2";
import { ProfileRepository } from "../domain/ProfileRepository";
import { UserId } from "../../auth/domain/value-objects/UserId";
import { Profile } from "../domain/Profile";
import { SchoolData } from "../domain/SchoolData";

interface ProfilePrimitive extends RowDataPacket {
  id: string;
  userId: string;
  email: string;
  fullname: string;
  phone: string;
  photo: string;
  socialMedia: object;
  registeredAt: Date;
  schoolId: string;
  major: string;
  semester: number;
}

export class MySQLProfileRepository implements ProfileRepository {
  readonly connection: MySQLConnection;

  constructor(connection: MySQLConnection) {
    this.connection = connection;
  }

  save = async (profile: Profile, schoolData: SchoolData): Promise<void> => {
    const onlyStrings = Object.values(profile.toPrimitives()).filter(
      (i) => typeof i != "object"
    );

    await this.connection.pool.query(
      "INSERT INTO profiles(id,userId,fullname, email,phone,photo,socialMedia,registeredAt,schoolId,major,semester) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [
        ...onlyStrings,
        profile.socialMedia.toString(),
        profile.registeredAt.value,
        ...Object.values(schoolData.toPrimitives()),
      ]
    );
  };

  findByUserId = async (userId: UserId): Promise<Profile | undefined> => {
    const [row, _fields] = await this.connection.pool.query<ProfilePrimitive[]>(
      "SELECT * FROM profiles WHERE user_id = ? LIMIT 1",
      [userId.value]
    );

    if (row.length === 0) return undefined;

    return Profile.fromPrimitives(row[0]);
  };
}
