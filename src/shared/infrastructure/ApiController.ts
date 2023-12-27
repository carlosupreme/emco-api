import { Response } from "express";
import { ProblemDetails } from "./ProblemDetails";
import { ErrorWrapper } from "../domain/errors/ErrorWrapper";
import { ProblemDetailsDefaults } from "./ProblemDetailsDefaults";

export class ApiController {
  problem = (errorWrapper: ErrorWrapper, response: Response) => {
    let httpStatusCode: number = 500;
    let details: string = "";

    ({ httpStatusCode, details } = this.getSpecificError(errorWrapper, httpStatusCode, details));

    const typeAndTitle = ProblemDetailsDefaults.getTypeAndTitle(httpStatusCode);
    const problemDetails = new ProblemDetails(
      typeAndTitle.type,
      httpStatusCode,
      typeAndTitle.title,
      details
    );

    problemDetails.addProperty("errors", errorWrapper.errors);

    return response
      .setHeader("Content-Type", "application/problem+json")
      .status(httpStatusCode)
      .json(problemDetails.getJson());
  };

  private getSpecificError(errorWrapper: ErrorWrapper, httpStatusCode: number, details: string) {
    if (errorWrapper.domain === "Register") {
      httpStatusCode = 400;
      details =
        "The registration data already exists in our records. Try another values.";
    } else if (errorWrapper.domain === "Auth") {
      httpStatusCode = 400;
      details = "Invalid credentials. Try another values.";
    } else {
      details = "An unexpected error has occurred. Please try again later.";
    }
    return { httpStatusCode, details };
  }
}
