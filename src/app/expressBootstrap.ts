import "reflect-metadata";
import bootstrap from "./bootstrap";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "../auth/infrastructure/AuthController";
import "../auth/application/commands/register/RegisterCommandHandler";
import "../auth/application/queries/login/LoginQueryHandler";
import { InversifyExpressServer } from "inversify-express-utils";

const container = bootstrap();

export function expressBootstrap() {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  });

  const app = server.build();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
