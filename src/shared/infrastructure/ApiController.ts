import { Response } from "express";
import PDBuilder from "problem-details-http";
import { ErrorType } from "../domain/errors/ErrorType";
import { DomainError } from "../domain/errors/DomainError";

export class ApiController {
  problem = (errors: DomainError[], response: Response) => {
    const { statusCode, detail, title } = this.getSpecificError(errors);

    const problemDetails = PDBuilder.fromDetail(detail)
      .status(statusCode)
      .title(title)
      .extensions({ errors })
      .build();

    return response
      .setHeader("Content-Type", "application/problem+json")
      .status(statusCode)
      .json(problemDetails);
  };

  private getSpecificError(errors: DomainError[]) {
    const title = errors[0].description;
    const detail = errors[0].description;
    const httpStatusCodes = {
      [ErrorType.Conflict]: 409,
      [ErrorType.Validation]: 400,
      [ErrorType.NotFound]: 404,
      [ErrorType.Failure]: 500,
      [ErrorType.Unauthorized]: 401,
      [ErrorType.Unexpected]: 500,
    };
    const statusCode = httpStatusCodes[errors[0].type];

    return { statusCode, detail, title };
  }
}
