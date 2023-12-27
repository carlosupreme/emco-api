export class ProblemDetails {
  private json: object;

  // follows the Problem Details for HTTP APIs -> https://datatracker.ietf.org/doc/html/rfc7807
  constructor(type: string, status: number, title: string, detail: string) {
    this.json = {
      type: type,
      status: status,
      title: title,
      detail: detail,
    };
  }

  addProperty(key: string, value: any): void {
    this.json = {
      ...this.json,
      [key]: value,
    };
  }

  getJson(): object {
    return this.json;
  }
}
