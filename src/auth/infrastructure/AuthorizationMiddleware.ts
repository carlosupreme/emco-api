import { NextFunction, Request, Response } from "express";
import { IJWTProvider } from "../domain/JWTProvider";
import { Container } from "inversify";
import { constants } from "../../app/constants";
import PDBuilder from "problem-details-http";
import { container } from "../../app/ioc";
import { interfaces } from "inversify-express-utils";

class Principal implements interfaces.Principal {
  constructor(public details: any) {}

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(true);
  }
  isResourceOwner(_resourceId: any): Promise<boolean> {
    return Promise.resolve(true);
  }
  isInRole(_role: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

class AuthorizationMiddleware {
  readonly jwtProvider: IJWTProvider;

  constructor(container: Container) {
    this.jwtProvider = container.get<IJWTProvider>(constants.IJWTProvider);
  }

  middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let token = "";
      const authorization = req.headers.authorization;

      const httpContext: interfaces.HttpContext = Reflect.getMetadata(
        "inversify-express-utils:httpcontext",
        req
      );

      if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
      }

      const claims = this.jwtProvider.validate(token);

      if (claims == undefined) throw {};

      httpContext.user = new Principal(claims);

      next();
    } catch (error) {
      const pb = PDBuilder.fromDetail(
        "You cannot use this resource. Please authenticate first."
      )
        .status(401)
        .build();
      res.status(pb.status).json(pb);
    }
  };
}

export const authMiddlware = new AuthorizationMiddleware(container);
