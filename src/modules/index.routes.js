import { dbConnection } from "../../database/dbconnection.js";
import { AppError } from "../utils/AppError.js";

export const bootstrap = (app, express) => {
  app.use(express.json());
  dbConnection();

  app.use("*", (req, res, next) => {
    // handle UnException routes
    return next(new AppError(`not found endPoint: ${req.originalUrl}`, 404));
  });
};
