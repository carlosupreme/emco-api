import "reflect-metadata";
import { Container } from "inversify";
import { IResolver, Mediator, mediatorSettings } from "mediatr-ts";
import { MySQLConnection } from "../shared/infrastructure/MySQLConnection";
import { UserRepository } from "../auth/domain/UserRepository";
import { MySQLUserRepository } from "../auth/infrastructure/MySQLUserRepository";
import { JsonWebTokenProvider } from "../auth/infrastructure/JsonWebTokenProvider";
import { IJWTProvider } from "../auth/domain/JWTProvider";
import { constants } from "./constants";

const container = new Container({
  skipBaseClassChecks: true,
  autoBindInjectable: true,
});

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

container.bind(Mediator).toConstantValue(new Mediator());
container.bind(MySQLConnection).toConstantValue(new MySQLConnection());

container
  .bind<UserRepository>(constants.UserRepository)
  .to(MySQLUserRepository);

container
  .bind<IJWTProvider>(constants.IJWTProvider)
  .to(JsonWebTokenProvider);

export { container };
