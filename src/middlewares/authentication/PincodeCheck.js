import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";


export const PincodeCheck = AsyncHandler(async (req, res, next) => {
  if (res.locals.user.Pincode !== req.body.pincode)
    return next(new AppError("pin code is incorrect", 401));
  next();
});
