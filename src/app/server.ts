import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./ioc";

const server = new InversifyExpressServer(container, null, {
  rootPath: "/api",
});

export { server };
