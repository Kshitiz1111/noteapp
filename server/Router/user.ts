import express, { Request, Response, Router } from "express";
import {
  loginUserController,
  registerUserController,
  getUsers,
  refreshTokenController,
  logoutUserController,
} from "../Controller/user";
import { verifyJWT } from "../Middleware/verifyJWT";

const userRouter: Router = express.Router();
// user register and login
userRouter.route("/register").post(registerUserController);
userRouter.route("/refreshtkn").get(refreshTokenController);
userRouter.route("/logout").get(logoutUserController);

userRouter.route("/login").post(loginUserController).get(verifyJWT, getUsers);

export default userRouter;
