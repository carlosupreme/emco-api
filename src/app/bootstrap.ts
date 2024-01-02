import "reflect-metadata";
import { Container } from "inversify";
import { IResolver, Mediator, mediatorSettings } from "mediatr-ts";
import { MySQLConnection } from "../shared/infrastructure/MySQLConnection";
import { UserRepository } from "../auth/domain/UserRepository";
import { MySQLUserRepository } from "../auth/infrastructure/MySQLUserRepository";
import { JsonWebTokenProvider } from "../auth/infrastructure/JsonWebTokenProvider";
import { IJWTProvider } from "../auth/domain/JWTProvider";
import { EMCO_INTERFACES } from "./EMCO_INTERFACES";
import SessionValidator from "../auth/infrastructure/Session";

const container = new Container();

class Resolver implements IResolver {
  resolve<T>(name: string): T {
    return container.get<T>(name);
  }

  add(name: string, instance: Function): void {
    container.bind(name).to(instance as any);
  }

  remove(name: string): void {
    container.unbind(name);
  }

  clear(): void {
    container.unbindAll();
  }
}

mediatorSettings.resolver = new Resolver();

export default function (): Container {
  container.bind(Mediator).toConstantValue(new Mediator());
  container.bind(MySQLConnection).toSelf();

  container
    .bind<UserRepository>(EMCO_INTERFACES.UserRepository)
    .to(MySQLUserRepository);

  container
    .bind<IJWTProvider>(EMCO_INTERFACES.IJWTProvider)
    .to(JsonWebTokenProvider);

  container.bind(SessionValidator).toSelf();

  return container;
}
