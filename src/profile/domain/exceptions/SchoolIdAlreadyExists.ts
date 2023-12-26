export class SchoolIdAlreadyExists extends Error {
  constructor(schoolId: string) {
    super(`The schoolId '${schoolId}' has already been registered`);
  }
}
