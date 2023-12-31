import { Response } from "express";
import { ErrorWrapper } from "../domain/errors/ErrorWrapper";
import PDBuilder from "problem-details-http";
import { ErrorType } from "../domain/errors/ErrorType";

export class ApiController {
  problem = (errorWrapper: ErrorWrapper, response: Response) => {
    const { statusCode, detail, title } = this.getSpecificError(errorWrapper);

    const problemDetails = PDBuilder.fromDetail(detail)
      .status(statusCode)
      .title(title)
      .extensions({ errors: errorWrapper.errors })
      .build();

    return response
      .setHeader("Content-Type", "application/problem+json")
      .status(statusCode)
      .json(problemDetails);
  };

  private getSpecificError(errorWrapper: ErrorWrapper) {
    const title = errorWrapper.domain;
    const detail = errorWrapper.first().description;
    const httpStatusCodes = {
      [ErrorType.Conflict]: 409,
      [ErrorType.Validation]: 400,
      [ErrorType.NotFound]: 404,
      [ErrorType.Failure]: 500,
      [ErrorType.Unauthorized]: 401,
      [ErrorType.Unexpected]: 500,
    };
    const statusCode = httpStatusCodes[errorWrapper.first().type];

    return { statusCode, detail, title };
  }
}
