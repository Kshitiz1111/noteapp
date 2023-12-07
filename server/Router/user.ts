import express, { Request, Response, Router } from "express";
import { registerUserController } from "../Controller/user";

const userRouter: Router = express.Router();
// @route Get and Post - /register/
userRouter.route("/register").post(registerUserController);

export default userRouter;
