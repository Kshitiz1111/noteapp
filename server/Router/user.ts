import express, { Request, Response, Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../Controller/user";

const userRouter: Router = express.Router();
// user register and login
userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(loginUserController);

export default userRouter;
