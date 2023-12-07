import { RequestHandler } from "express";
import User from "../Model/user";
import { userInfoType } from "../types/userType";

export const registerUserController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    let reqObj: userInfoType = req.body;
    let user = new User(reqObj);
    let result = await user.register();

    res.status(200).send(`registerUserController${result}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
