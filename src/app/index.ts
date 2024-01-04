import "reflect-metadata";
import "./loader";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { server } from "./server";
import createHttpError, { HttpError } from "http-errors";

server
  .setConfig((app: express.Application) => {
    app.set("env", "development");
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((_app) => {
    // catch 404 and forward to error handler
    _app.use(
      (
        _req: express.Request,
        _res: express.Response,
        next: express.NextFunction
      ) => {
        next(createHttpError(404));
      }
    );

    // error handlers
    // development error handler
    // will print stacktrace
    if (_app.get("env") === "development") {
      _app.use(
        (
          err: HttpError,
          _req: express.Request,
          res: express.Response,
          _next: express.NextFunction
        ): void => {
          res.status(err.status || 500);
          res.json({
            error: err,
            message: err.message,
          });
        }
      );
    }

    // production error handler
    // no stacktraces leaked to user
    _app.use(
      (
        err: HttpError,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        res.status(err.status || 500);
        res.json({
          error: {},
          message: err.message,
        });
      }
    );
  });

const app = server.build();
app.listen(3000, () => {
  console.log("Server is running at http://127.0.0.1:3000");
});
