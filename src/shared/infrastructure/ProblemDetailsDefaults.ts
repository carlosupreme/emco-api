export class ProblemDetailsDefaults {
  static getTypeAndTitle(status: number): { type: string; title: string } {
    const defaults: { [status: number]: { type: string; title: string } } = {
      400: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
        title: "Bad Request",
      },
      403: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3",
        title: "Forbidden",
      },
      404: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4",
        title: "Not Found",
      },
      405: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5",
        title: "Method Not Allowed",
      },
      409: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8",
        title: "Conflict",
      },
      415: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13",
        title: "Unsupported Media Type",
      },
      500: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
        title: "Internal Server Error",
      },
      501: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.2",
        title: "Not Implemented",
      },
      503: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4",
        title: "Service Unavailable",
      },
      504: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.5",
        title: "Gateway Timeout",
      },
      505: {
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.6",
        title: "HTTP Version Not Supported",
      },
    };

    return defaults[status] ?? defaults[400];
  }
}
