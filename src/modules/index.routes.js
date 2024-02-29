import { dbConnection } from "../../database/dbconnection.js";
import { AppError } from "../utils/AppError.js";
import { authRouter } from "./users/users.routes.js";

export const bootstrap = (app, express) => {
  const mainroute = "/api/v1"; // main route
  app.use(express.json());
  app.use(`${mainroute}/users`, authRouter);
  dbConnection();
  app.use("*", (req, res, next) => {
    // handle UnException routes
    return next(new AppError(`not found endPoint: ${req.originalUrl}`, 404));
  });
};
