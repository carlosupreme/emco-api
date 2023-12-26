import { Major } from "./value-objects/Major";
import { SchoolId } from "./value-objects/SchoolId";
import { Semester } from "./value-objects/Semester";

export class SchoolData {
  readonly id: SchoolId;
  readonly major: Major;
  readonly semester: Semester;

  constructor(id: SchoolId, major: Major, semester: Semester) {
    this.id = id;
    this.major = major;
    this.semester = semester;
  }

  static fromPrimitives(props: any): SchoolData {
    return new SchoolData(
      new SchoolId(props.id),
      new Major(props.major),
      new Semester(props.semester)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      major: this.major.value,
      semester: this.semester.value,
    };
  }
}
