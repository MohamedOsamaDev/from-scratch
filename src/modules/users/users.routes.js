import express from "express";
import {
  ForgetPasswordVal,
  authResetPasswordVal,
  signinSchemaVal,
  signupschemaVal,
  updatePasswordVal,
  updateVal,
} from "./user.vailadtion.js";
import { checkEmailuser } from "../../middleware/authentication/checkUser.js";

import {
  FPsendEmail,
  ResetPassword,
  changepassword,
  deleteUser,
  logIn,
  logout,
  shareProfile,
  sighnUp,
  softdelete,
  tokenForgetPassword,
  unsubscribe,
  updateuser,
  verfiyEmail,
} from "./user.controller.js";
import { auth } from "../../middleware/authentication/auth.js";
import { comparePassword } from "../../middleware/authentication/comparePassword.js";
import { authToken } from "../../middleware/authentication/authToken.js";
import { PincodeCheck } from "../../middleware/authentication/PincodeCheck.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";

const authRouter = express.Router();
// start registration routes
const authRoute = "/auth";
authRouter.post(
  `${authRoute}/register`,
  vaildation(signupschemaVal),
  checkEmailuser,
  sighnUp
); //sign up
authRouter.post(`${authRoute}/log-in`, vaildation(signinSchemaVal), logIn); //log in
authRouter.post(`${authRoute}/logout`, auth, logout); // log out
authRouter.get("/verify/:token", verfiyEmail); // verfiy Email
authRouter.get(`${authRoute}/unsubscribe/:token`, unsubscribe); // unsubscribe => delete account
// end registration routes
authRouter.get(`${authRoute}/shareProfile`, auth, shareProfile); // share profile as QR code
authRouter.delete("/softdelete", auth, softdelete); // soft delete => account will be blocked (cant log in if  account blocked)
authRouter
  .route(`/${authRoute}/:id`)
  .put(vaildation(updateVal), auth, updateuser) // update user
  .delete(auth, deleteUser); // delete user
authRouter.put(
  `${authRoute}/resetPassword`,
  vaildation(updatePasswordVal),
  auth,
  comparePassword,
  changepassword
); // reset password
// start forget password routes
authRouter.post(
  `${authRoute}/forgetPassword`,
  vaildation(ForgetPasswordVal),
  FPsendEmail
); // send email for reset password
authRouter.get(
  `${authRoute}/forgetPassword/:token`,
  authToken,
  tokenForgetPassword
); // this optional endpoint  for front-end to loaders(react js || next js) to check token for handle layout
authRouter.post(
  `${authRoute}/resetPassword`,
  vaildation(authResetPasswordVal),
  authToken,
  PincodeCheck,
  ResetPassword
); // reset password if token vaild
//end forgot paswword routes
export { authRouter };
