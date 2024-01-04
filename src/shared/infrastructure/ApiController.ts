import { Response } from "express";
import PDBuilder from "problem-details-http";
import { DomainError } from "../domain/errors/DomainError";
import { AsyncValidator } from "fluentvalidation-ts";
import {
  DomainErrorsToJson,
  JsonToValidationErrors,
} from "../../app/mappings/mapper";
import {
  BaseHttpController,
  HTTP_VERBS_ENUM,
  HandlerDecorator,
  httpMethod,
} from "inversify-express-utils";
import { authMiddlware } from "../../auth/infrastructure/AuthorizationMiddleware";

export const authorized = (
  method: keyof typeof HTTP_VERBS_ENUM,
  path: string
): HandlerDecorator => {
  return httpMethod(method, path, authMiddlware.middleware);
};

export class ApiController extends BaseHttpController {
  problem(errors: DomainError[], response: Response): Response {
    const responseErrors = DomainErrorsToJson(errors);
    const problemDetails = PDBuilder.fromDetail(
      "There is an error in your request."
    )
      .extensions({ errors: responseErrors })
      .build();

    return response
      .setHeader("Content-Type", "application/problem+json")
      .status(400)
      .json(problemDetails.toJson());
  }

  async validate<T>(
    validator: AsyncValidator<T>,
    command: T,
    res: Response
  ): Promise<Response | void> {
    const errors = await validator.validateAsync(command);

    if (Object.keys(errors).length > 0)
      return this.problem(JsonToValidationErrors(errors), res);
  }
}
